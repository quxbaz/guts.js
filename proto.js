/*
  proto.js

  Allows classical-style inheritance.

  Inspired by John Resig's "Simple Javascript Inheritance" function.
  - Source: http://ejohn.org/blog/simple-javascript-inheritance/

  Usage:
  _boot is a constructor function called before init. All parents _boot
  functions are called as well.
*/


define(['guts/eventhandler'], function(EventHandler) {

    function isfunc(x) {return typeof x === 'function'};

    /*
      If a function's text can be inspected, check if it calls ._super()
      internally.
    */
    var fntest = /xyz/.test(function(){xyz}) ? /\b_super\b/ : /.*/;

    var Proto = function() {};

    Proto.extend = function(props) {

        // Not necessary ATM, but could be in the future.
        var props = props || {};

        var base = this.prototype;

        // The new prototype with values overwritten by props.
        var proto = {};

        // Inherit the parent's prototype members.
        for (var k in base)
            proto[k] = base[k];

        // Set the new properties and overwrite any base properties if necessary.
        for (var k in props) {
            var prop = props[k];
            if (isfunc(prop) && isfunc(base[k]) && fntest.test(prop) || k == '_boot') {
                /*
                  If this property is a method and overwrites a base property,
                  give it the ability to call this._super() within that method.
                */
                prop = (function(name, f, base_prop) {
                    return function() {
                        // Set the base method temporarily.
                        var tmp = this._super;
                        this._super = base_prop;
                        if (name == '_boot')
                            this._super.apply(this, arguments);
                        f.apply(this, arguments);
                        if (typeof tmp === 'undefined')
                            delete this._super;
                        else
                            this._super = tmp;
                    }
                })(k, prop, base[k]);
            }
            proto[k] = prop;
        }

        var called_by_method = false;

        // All construction is done in the _init and _boot methods.
        var Ret = function(args) {
            if (called_by_method)
                var arguments = args;
            if (this._boot)
                this._boot.apply(this, arguments);
            if (this._init)
                this._init.apply(this, arguments);
        };

        /*
          Allows an object to be instantiated like this:
          > var obj = Proto.new();
        */
        this.new = function() {
            called_by_method = true;
            var ret = new Ret(arguments);
            called_by_method = false;
            return ret;
        };

        Ret.prototype = proto;
        Ret.constructor = Ret;
        Ret.new = this.new;
        Ret.extend = this.extend;

        return Ret;
    };

    Proto.prototype._boot = function(){};

    var Responder = Proto.extend({

        _boot: function() {
            this.events = new EventHandler();
        },

        on: function(events, handler, context) {
            /*
              Wrapper function for EventHandler.on() with the context binded to
              this model by default.
            */
            var context = context || this;
            this.events.on(events, handler, context);
        },

        emit: function() {
            // Wrapper function for EventHandler.trigger()
            this.events.emit.apply(this.events, arguments);
        }

    });

    var Model = Responder.extend();

    var View = Responder.extend({

        template: undefined,

        _boot: function(opts) {
            var opts = opts || {};
            this.model = opts.model;
        },

        render: function(){}

    });

    return {Proto: Proto, Model: Model, View: View};
});
