angular.module('myApp.services', [])

.factory('$data', ['$http', '$localStorage', function ($http, $localStorage) {
    'use strict';
    if ($localStorage.data) {
        console.log("True, base object insert");

    } else {
        console.log("False, creat object base");
        $localStorage.data = {
            items: []
        };

    }
    return $localStorage.data;
    }])


.factory('DataService', ['$http', '$localStorage', function ($http, $localStorage) {
    'use strict';

    var pub = {}

    pub.popArray = function (arraytosearch, key, valuetosearch) {

        for (var i = 0; i < arraytosearch.length; i++) {

            if (arraytosearch[i][key] == valuetosearch) {
                return i;
            }
        }
        return null;
    };

    return pub;

}]);