/*
  util.js
*/


define(['underscore'], function(_) {

    function fmt(s) {
        var args = Array.prototype.slice.call(arguments, 1);
        return s.replace(/{(\d+)}/g, function(match, number) {
            return typeof args[number] != 'undefined' ? args[number] : match;
        });
    }

    return {


        /*
          Inspection functions
        */


        log: function() {
            console.log.apply(console, arguments);
        },

        dir: function(obj) {
            for (var k in obj) {
                if (obj.__proto__ && !obj.hasOwnProperty(k))
                    continue;
                console.log(fmt('{0}: {1}', k, obj[k]));
            }
        },

        inspect: function(obj, name) {
            function str(x) {return typeof x === 'function' ? '[function]' : x}
            if (name)
                console.log('*' + name + '*\n')
            console.log('Prototype members:');
            for (var k in obj.__proto__)
                console.log('  ' + k + ': ' + str(obj.__proto__[k]));
            console.log('\nInstance members:');
            for (var k in obj) {
                if (obj.hasOwnProperty(k))
                    console.log('  ' + k + ': ' + str(obj[k]));
            }
            console.log('\n');
        },


        /*
          misc
        */


        even: function(n) {
            return n % 2 == 0;
        },

        odd: function(n) {
            return n % 2 == 1;
        },

        assert: function(cond, error) {
            if (!cond) throw error;
        },

        assert_many: function(conds, error) {
            for (var i=0; i < conds.length; i++)
                if (!conds[i]) throw error;
        },

        assert_false: function(cond, error) {
            if (cond) throw error;
        },


        /*
          Collection functions
        */


        slice: function(arr) {
            return Array.prototype.slice.apply(arr, _.rest(arguments));
        },


        /*
          String functions
         */


        fmt: fmt,

        is_lower: function(s) {
            return s == s.toLowerCase();
        },

        is_upper: function(s) {
            return s == s.toUpperCase();
        }

    }

});
