//@author jakubvacek
'use strict';
App.service('$timeService', [function () {
        return {
            setDateTime: function (date, time) {
                date.setHours(time.substring(0, time.indexOf(":")));
                date.setMinutes(time.substring(time.indexOf(":") + 1, time.length));
                date.setSeconds("00");
                return date;
            }
        };
    }]);


