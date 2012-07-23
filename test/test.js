define(['guts/util', 'guts/proto'], function(util, proto) {

    var log     = util.log,
        inspect = util.inspect,
        Proto   = proto.Proto,
        Model   = proto.Model;

    var test = function() {

        var Dog = Proto.extend({
            _boot: function() {
                // console.log('DOG: ', arguments);
            },
            _init: function(a, b) {
                this.a = a;
                this.b = b;
            },
            talk: function() {
                console.log('woof');
            },
        });

        var d =  Dog.new('arg-1', 'arg-2');
        // inspect(d, 'DOG-a');
        var d =  new Dog('arg-a', 'arg-b');
        // inspect(d, 'DOG-b');

        var Cat = Dog.extend({
            _boot: function() {
                console.log('CAT: ', arguments);
            },
            _init: function(a, b) {
                if (this._super)
                    this._super(a, b);
                this.cat = 'cat';
            },
            talk: function() {
                log('meow');
            }
        });

        // var c = Cat.new('cat-a', 'cat-b');
        // var cc = new Cat('cat-a', 'cat-b');
        // log(c);
        // inspect(c, 'CAT');
        // c.talk();
        // c._boot();

        // Cat.extend({
        //     _boot: function() {
        //         console.log('MOUSE: ', arguments);
        //         // this._super('super-1');
        //     }
        // }).new('super-1', 'super-2', 'super-3');

    };

    var test_model = function() {
        var m  = new Model();
        m.on('create', function() {
            log(arguments);
        });
        m.emit.apply(m, ['create', 1, 2, 3]);
    };

    return {test: test, test_model: test_model};
});
