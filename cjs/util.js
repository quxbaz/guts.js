var util = {
    
    log: function() {
        console.log.apply(console, arguments);
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
    }

};

module.exports = util;
