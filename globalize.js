/*
  globalize.js

  Injects objects into the global context.
*/


define(['underscore', 'guts/util'], function(_, util) {

    var that = this;
    var globals = _.extend({}, util);

    var globalize = function() {
        /*
          Pollutes the global namespace.
        */
        _.each(arguments, function(v, k) {
            _.extend(globals, v);
            _.extend(that, v);
        });
    };

    return {globals: globals, globalize: globalize};
});
