/*
   eventhandler.js

   Simple event handler. Supports attaching events to callbacks and triggering
   events.

   TODO:
   Add a method for removing events.
*/


var EventHandler = function(handlers) {
    this.handlers = {};
    for (event in handlers)
        this.on(event, handlers[event]);
};

EventHandler.prototype.on = function(events, handler, context) {
    if (typeof events === 'string')
        events = events.split(' ');
    if (context) {
        var _handler = handler;  // To avoid infinite recursion.
        handler = function() {_handler.apply(context, arguments)};
    }
    for (var i=0; i < events.length; i++) {
        var event = events[i];
        if (event in this.handlers)
            this.handlers[event].push(handler);
        else
            this.handlers[event] = [handler];
    }
};

EventHandler.prototype.emit = function(event, args) {
    var handlers = this.handlers[event];
    if (handlers)
        for (var i=0; i < handlers.length; i++)
            handlers[i].apply(null, Array.prototype.slice.call(arguments, 1));
};

module.exports = EventHandler;
