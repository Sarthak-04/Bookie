// Create a new YUI instance and populate it with the required modules.
YUI({
    logInclude: { TestRunner: true},
    filter: 'raw'
}).use('console', 'test', 'bookie-api', function (Y) {
    //initialize the console
    var yconsole = new Y.Console({
        newestOnTop: false
    });
    yconsole.render('#log');

    gen_fakeio = function (test_function) {
        return function (url, cfg) {
            test_function(url, cfg);
        };
    };

    var api_test = new Y.Test.Case({
        name: "API Tests",

        setUp: function () {
        },

        testApiExists: function () {
            Y.Assert.isObject(Y.bookie.Api,
                              "Should find an objcet for Api module");
        },

        testPublicBmarkList: function () {
            var that = this,
                hit = false,
                test_func = function (url, cfg) {
                    Y.Assert.areEqual('GET', cfg.method);
                    Y.Assert.areEqual('http://127.0.0.1:6543/api/v1/bmarks/',
                        url);
                    Y.ObjectAssert.areEqual({
                        count: 10,
                        page: 0,
                        resource: undefined,
                        username: "",
                        with_content: false
                    }, cfg.data);
                    hit = true;
                },
                API_CFG = {
                    url: 'http://127.0.0.1:6543/api/v1'
                },
                api = new Y.bookie.Api.route.BmarksAll(API_CFG);

            Y.io = gen_fakeio(test_func);
            api.call({});
            Y.Assert.isTrue(hit);
        },

        testPublicSearch: function () {
            var that = this,
                hit = false,
                test_func = function (url, cfg) {
                    Y.Assert.areEqual('GET', cfg.method);
                    Y.Assert.areEqual(
                        'http://127.0.0.1:6543/api/v1/bmarks/search/',
                        url);
                    Y.ObjectAssert.areEqual({
                        count: 10,
                        page: 0,
                        resource: undefined,
                        username: "",
                        with_content: true
                    }, cfg.data);
                    hit = true;
                },
                API_CFG = {
                    url: 'http://127.0.0.1:6543/api/v1'
                },
                api = new Y.bookie.Api.route.Search(API_CFG);

            Y.io = gen_fakeio(test_func);
            api.call({});
            Y.Assert.isTrue(hit);
        },

        testPublicSearchTerms: function () {
            var that = this,
                hit = false,
                test_func = function (url, cfg) {
                    Y.Assert.areEqual('GET', cfg.method);
                    Y.Assert.areEqual(
                        'http://127.0.0.1:6543/api/v1/bmarks/search/books',
                        url);
                    Y.ObjectAssert.areEqual({
                        count: 10,
                        page: 0,
                        resource: undefined,
                        username: "",
                        with_content: true
                    }, cfg.data);
                    hit = true;
                },
                API_CFG = {
                    url: 'http://127.0.0.1:6543/api/v1'
                },
                api = new Y.bookie.Api.route.Search(Y.merge(API_CFG, {
                    phrase: ['books']
                }));

            Y.io = gen_fakeio(test_func);
            api.call({});
            Y.Assert.isTrue(hit);
        },

        testUserPublicSearchTerms: function () {
            var that = this,
                hit = false,
                test_func = function (url, cfg) {
                    Y.Assert.areEqual('GET', cfg.method);
                    Y.Assert.areEqual(
                        'http://127.0.0.1:6543/api/v1/admin/bmarks/search/books',
                        url);
                    Y.ObjectAssert.areEqual({
                        count: 10,
                        page: 0,
                        resource: undefined,
                        username: "admin",
                        with_content: true
                    }, cfg.data);
                    hit = true;
                },
                API_CFG = {
                    url: 'http://127.0.0.1:6543/api/v1'
                },
                api = new Y.bookie.Api.route.UserSearch(Y.merge(API_CFG, {
                    phrase: ['books'],
                    username: 'admin'
                }));

            Y.io = gen_fakeio(test_func);
            api.call({});
            Y.Assert.isTrue(hit);
        },

        testFilteredPublicBmarkList: function () {
            var that = this,
                hit = false,
                test_func = function (url, cfg) {
                    Y.Assert.areEqual('GET', cfg.method);
                    Y.Assert.areEqual(
                        'http://127.0.0.1:6543/api/v1/bmarks/books',
                        url);
                    Y.ObjectAssert.areEqual(cfg.data, {
                        count: 10,
                        page: 0,
                        resource: undefined,
                        username: "",
                        with_content: false
                    });
                    hit = true;
                },
                API_CFG = {
                    url: 'http://127.0.0.1:6543/api/v1',
                    tags: ['books']
                },
                api = new Y.bookie.Api.route.BmarksAll(API_CFG);

            Y.io = gen_fakeio(test_func);
            api.call({});
            Y.Assert.isTrue(hit);
        },

        testUserBmarkList: function () {
            var that = this,
                hit = false,
                test_func = function (url, cfg) {
                    Y.Assert.areEqual('GET', cfg.method);
                    Y.Assert.areEqual(
                        'http://127.0.0.1:6543/api/v1/admin/bmarks',
                        url);
                    Y.ObjectAssert.areEqual(cfg.data, {
                        api_key: '2dcf75460cb5',
                        resource: "admin",
                        username: "admin"
                    });
                    hit = true;
                },
                API_CFG = {
                    url: 'http://127.0.0.1:6543/api/v1',
                    username: 'admin',
                    resource: 'admin',
                    api_key: '2dcf75460cb5'
                },
                api = new Y.bookie.Api.route.UserBmarksAll(API_CFG);

            Y.io = gen_fakeio(test_func);
            api.call({});
            Y.Assert.isTrue(hit);
        },

        testTagComplete: function () {
            var that = this,
                hit = false,
                test_func = function (url, cfg) {
                    Y.Assert.areEqual('GET', cfg.method);
                    Y.Assert.areEqual(
                        'http://127.0.0.1:6543/api/v1/admin/tags/complete',
                        url);
                    Y.ObjectAssert.areEqual(cfg.data, {
                        api_key: '2dcf75460cb5',
                        current: '',
                        resource: undefined,
                        tag: 'boo',
                        username: "admin"
                    });
                    hit = true;
                },
                API_CFG = {
                    url: 'http://127.0.0.1:6543/api/v1',
                    username: 'admin',
                    api_key: '2dcf75460cb5'
                },
                api = new Y.bookie.Api.route.TagComplete(API_CFG);

            Y.io = gen_fakeio(test_func);
            api.call({}, 'boo', '');
            Y.Assert.isTrue(hit);
        },

        testGetUserBmark: function () {
            var that = this,
                hit = false,
                test_func = function (url, cfg) {
                    Y.Assert.areEqual('GET', cfg.method);
                    Y.Assert.areEqual(
                        'http://127.0.0.1:6543/api/v1/admin/bmark/b1210b874f52a1',
                        url);
                    Y.ObjectAssert.areEqual(cfg.data, {
                        api_key: '2dcf75460cb5',
                        hash_id: 'b1210b874f52a1',
                        last_bmark: false,
                        username: "admin"
                    });
                    hit = true;
                },
                API_CFG = {
                    url: 'http://127.0.0.1:6543/api/v1',
                    hash_id: 'b1210b874f52a1',
                    username: 'admin'
                },
                api = new Y.bookie.Api.route.Bmark(API_CFG);

            Y.io = gen_fakeio(test_func);
            api.call({}, 'boo', '');
            Y.Assert.isTrue(hit);
        },

        testApiKey: function () {
            var that = this,
                hit = false,
                test_func = function (url, cfg) {
                    Y.Assert.areEqual('GET', cfg.method);
                    Y.Assert.areEqual(
                        'http://127.0.0.1:6543/api/v1/admin/api_key',
                        url);
                    Y.ObjectAssert.areEqual({
                        username: "admin"
                    }, cfg.data);
                    hit = true;
                },
                API_CFG = {
                    url: 'http://127.0.0.1:6543/api/v1',
                    username: 'admin',
                    api_key: '7745ac02c6dc'
                },
                api = new Y.bookie.Api.route.UserApiKey(API_CFG);

            Y.io = gen_fakeio(test_func);
            api.call({});
            Y.Assert.isTrue(hit);
        },

        testApiPing: function () {
            var that = this,
                hit = false,
                test_func = function (url, cfg) {
                    Y.Assert.areEqual('GET', cfg.method);
                    Y.Assert.areEqual(
                        'http://127.0.0.1:6543/api/v1/admin/ping',
                        url);
                    Y.ObjectAssert.areEqual({
                        username: "admin"
                    }, cfg.data);
                    hit = true;
                },
                API_CFG = {
                    url: 'http://127.0.0.1:6543/api/v1',
                    username: 'admin',
                    api_key: '7745ac02c6dc'
                },
                api = new Y.bookie.Api.route.Ping(API_CFG);

            Y.io = gen_fakeio(test_func);
            api.call({});
            Y.Assert.isTrue(hit);
        },

        testDeleteBmark: function () {
            var that = this,
                hit = false,
                test_func = function (url, cfg) {
                    Y.Assert.areEqual('DELETE', cfg.method);
                    Y.Assert.areEqual(
                        'http://127.0.0.1:6543/api/v1/admin/bmark/6c4370829d7ebc',
                        url);
                    Y.ObjectAssert.areEqual({
                        username: "admin"
                    }, cfg.data);
                    hit = true;
                },
                API_CFG = {
                    url: 'http://127.0.0.1:6543/api/v1',
                    username: 'admin',
                    api_key: '2dcf75460cb5',
                    hash_id: '6c4370829d7ebc'
                },
                api = new Y.bookie.Api.route.UserBmarkDelete(API_CFG);

            Y.io = gen_fakeio(test_func);
            api.call({});
            Y.Assert.isTrue(hit);
        },

        testUnSuspendUser: function () {
            var that = this,
                hit = false,
                test_func = function (url, cfg) {
                    Y.Assert.areEqual('DELETE', cfg.method);
                    Y.Assert.areEqual(
                        'http://127.0.0.1:6543/api/v1/suspend',
                        url);
                    Y.ObjectAssert.areEqual({
                        username: 'admin',
                        password: 'test',
                        code: '123456'
                    }, cfg.data);
                    hit = true;
                },
                API_CFG = {
                    url: 'http://127.0.0.1:6543/api/v1',
                    username: 'admin',
                    code: '123456',
                    password: 'test'
                },
                api = new Y.bookie.Api.route.UnSuspendUser(API_CFG);

            Y.io = gen_fakeio(test_func);
            api.call({});
            Y.Assert.isTrue(hit);
        },

        testInviteUser: function () {
            var that = this,
                hit = false,
                test_func = function (url, cfg) {
                    debugger;
                    Y.Assert.areEqual('POST', cfg.method);
                    Y.Assert.areEqual(
                        'http://127.0.0.1:6543/api/v1/admin/invite',
                        url);
                    // in post requests, the data is json-stringified so we
                    // have to compare strings
                    Y.Assert.areEqual(
                        Y.JSON.stringify({
                        email: 'testing@me.com',
                        username: 'admin'
                    }), cfg.data);
                    hit = true;
                },
                API_CFG = {
                    url: 'http://127.0.0.1:6543/api/v1',
                    username: 'admin',
                    email: 'testing@me.com'
                },
                api = new Y.bookie.Api.route.Invite(API_CFG);

            Y.io = gen_fakeio(test_func);
            api.call({});
            Y.Assert.isTrue(hit);
        }

    });

    Y.Test.Runner.add(api_test);
    Y.Test.Runner.run();
});
