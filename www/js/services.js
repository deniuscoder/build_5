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

}])

.factory('FileReader', function ($q, $window) {

    if (!$window.FileReader) {
        throw new Error('Browser does not support FileReader');
    }

    function readAsDataUrl(file) {
        var deferred = $q.defer(),
            reader = new $window.FileReader();

        reader.onload = function () {
            deferred.resolve(reader.result);
        };

        reader.onerror = function () {
            deferred.reject(reader.error);
        };

        reader.readAsDataURL(file);

        return deferred.promise;
    }

    return {
        readAsDataUrl: readAsDataUrl
    };
});