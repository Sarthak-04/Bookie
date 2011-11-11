YUI.add('bookie-model', function (Y) {
    var _ = Y.Lang.substitute;

    Y.namespace('bookie');

    Y.bookie.Bmark = Y.Base.create('bookie-bmark',
        Y.Model,
        [],
        {




        },
        {
            ATTRS: {
                'bid': {},
                'hash_id': {},
                'description': {},
                'extended': {},
                'stored': {
                    // we need to turn a string from json into a Date object
                    setter: function (val, name) {
                        return new Date(val);
                    }
                },
                'updated': {
                    // we need to turn a string from json into a Date object
                    setter: function (val, name) {
                        return new Date(val);
                    }
                },

                // clean date for the bmark in month/date
                'dateinfo': {
                    // we want to return a formatted version of stored
                    getter: function (val) {
                        var val = this.get('stored');
                        return (val.getMonth() + 1) + "/" + val.getDate();
                    }
                },

                // clean date in 3/13/2011 15:45
                'prettystored': {
                    // we want to return a formatted version of stored
                    getter: function (val) {
                        var val = this.get('stored');
                        return _("{month}/{date}/{year} {hours}:{minutes}", {
                                 'month': val.getMonth() + 1,
                                 'date': val.getDate(),
                                 'year': val.getFullYear(),
                                 'hours': val.getHours(),
                                 'minutes': val.getMinutes()
                        });
                    }
                },
           }
        });


}, '0.1.0' /* module version */, {
    requires: ['base', 'model']
});
