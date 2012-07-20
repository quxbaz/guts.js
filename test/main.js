require.config({
    paths: {
        guts: '../'
    }
});

require(['test'], function(test) {
    test.test();
    // test.test_model();
});
