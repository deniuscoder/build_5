(function () {
    'use strict';
    var module = angular.module('app', ['onsen', 'ngCordova', 'ngStorage']);

    module.controller('AppController', function ($scope, $data) {
        ons.ready(function () {
            // Init code here

        });


        $scope.doSomething = function () {
            setTimeout(function () {
                ons.notification.alert({
                    message: 'tapped',
                    title: 'Внимание!'
                });
            }, 100);
        };
    });

    module.controller('DetailController', function ($scope, $data, DataService) {
        $scope.item = $data.selectedItem;

        $scope.delTarget = function (event) {
            var arr = $data.items;
            var key = event.item.title;

            var result = DataService.popArray(arr, "title", key);

            if (confirm("Вы уверены что хотите удалить? " + result)) {
                $data.items.splice(result, 1);
            }

        };

    });

    module.controller('MasterController', function ($scope, $data) {
        $scope.items = $data.items;

        $scope.showDetail = function (index) {
            var selectedItem = $data.items[index];
            $data.selectedItem = selectedItem;
            console.log($data);
            $scope.navi.pushPage('detail.html', {
                title: selectedItem.title
            });
        };
    });





    module.controller('MyController', function ($scope, $localStorage) {
        'use strict';

        $scope.addTarget = function () {
            var img = document.getElementById("image");
            $scope.newImage = img.src;

            var setDate = toDate.valueAsDate;
            if (setDate && $scope.check) $scope.rdate = setDate.toLocaleDateString();


            //console.log($scope.newImage);
            //$localStorage.base.data.base.push

            $localStorage.data.items.push({
                title: $scope.title,
                img: $scope.newImage,
                discription: $scope.discription,
                motivation: $scope.motivation,
                range: {
                    title: $scope.range,
                    date: $scope.rdate
                }
            });
            console.log($localStorage.data);
            alert("Цель сохранена!");
        };



        $scope.takePicture = function () {
            var options = {
                quality: 50,
                destinationType: Camera.DestinationType.DATA_URL,
                sourceType: Camera.PictureSourceType.CAMERA
            };

            // udpate camera image directive
            $cordovaCamera.getPicture(options).then(function (imageData) {
                $scope.cameraimage = "data:image/jpeg;base64," + imageData;
            }, function (err) {
                console.log('Failed because: ');
                console.log(err);
            });
        };



        $scope.creatFile = function () {

            $cordovaFile.createFile(cordova.file.dataDirectory, "new_file.txt", true)
                .then(function (success) {
                    // success
                    alert("Create");

                }, function (error) {
                    // error
                    alert("Error Create");
                });


        };


        //   var list = document.getElementById('list');
        /*    list.onclick = function(event) {
           var target = event.target; // где был клик?
            console.log(target);
            if (target.className !== 'item-inner') return; // не на TD? тогда не интересует

           // console.log(target); // подсветить TD
        }; */
        /*
        document.onclick = function(event) {
            if (!event.target.hasAttribute('data-click')) return;

            var counter = event.target;

            console.log(counter);
          };
            */


        $scope.date = function (obj) {
            var d = new Date();

            switch (obj.path[1].id) {

            case 'Day':
                $scope.range = obj.srcElement.value;
                d.setDate(d.getDate() + 1);
                $scope.rdate = d.toLocaleDateString();

                console.log(d);
                $scope.check = false;
                break;
            case 'Week':
                //    alert('Week');
                $scope.range = obj.srcElement.value;
                d.setDate(d.getDate() + 7);
                $scope.rdate = d.toLocaleDateString();
                $scope.check = false;
                break;
            case 'Month':
                //   alert('Month');
                $scope.range = obj.srcElement.value;
                d.setDate(d.getDate() + 30);
                $scope.rdate = d.toLocaleDateString();
                $scope.check = false;
                break;
            case 'Quarter':
                //   alert('Quarter');
                $scope.range = obj.srcElement.value;
                d.setMonth(d.getMonth() + 4);
                $scope.rdate = d.toLocaleDateString();
                $scope.check = false;
                break;
            case 'Year':
                //   alert('Year');
                $scope.range = obj.srcElement.value;
                d.setFullYear(d.getFullYear() + 1);
                $scope.rdate = d.toLocaleDateString();
                $scope.check = false;
                break;
            case 'Date':
                $scope.range = obj.srcElement.value;
                $scope.check = true;
                break;
            default:
                console.log(obj);
            }

            /*
            if (obj.srcElement.firstElementChild.parentNode.previousElementSibling.value == "Date") {
                //console.log(obj);
                $scope.range = obj.srcElement.firstElementChild.innerHTML;
                $scope.check = true;

            } else {

                $scope.range = obj.srcElement.firstElementChild.innerHTML;
                $scope.rdate = dateNow.toLocaleDateString();

                //console.log(dateNow.toLocaleDateString());
                $scope.check = false;
            } */

        };

        /*     $scope.getDate = function (obj) {
            var year = obj.srcElement.parentElement.attributes[0].value;
            var month = obj.srcElement.parentElement.attributes[1].value;
            var day = obj.srcElement.parentElement.attributes[2].value;
            month++;
            var dateResult = day + "-" + month + "-" + year;
            console.log(dateResult);
            // console.dir(obj.srcElement.parentElement);
            $scope.rdate = dateResult;

        };
*/

        $scope.clock = {
            now: new Date()
        };
        var updateClock = function () {
            $scope.clock.now = new Date();
        };
        setInterval(function () {
            $scope.$apply(updateClock);
        }, 1000);
        updateClock();

    }).directive('fileChanged', function () {
        return {
            restrict: 'A',
            require: '?ngModel',
            link: function ($scope, element, attrs, ngModel) {
                if (!ngModel) {
                    return;
                }

                ngModel.$render = angular.noop;

                element.bind('change', function (event) {
                    ngModel.$setViewValue(event.target.files[0]);
                    $scope.$apply();
                });
            }
        };
    })
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
    })
    .directive('filePreview', function (FileReader) {
        return {
            restrict: 'A',
            scope: {
                filePreview: '='
            },
            link: function (scope, element, attrs) {
                scope.$watch('filePreview', function (filePreview) {
                    if (filePreview && filePreview.name) {
                        FileReader.readAsDataUrl(filePreview).then(function (result) {
                            element.attr('src', result);
                        });
                    }
                });
            }
        };
    });


    // ************* End Controllers *************** //



    module.factory('$data', ['$http', '$localStorage', function ($http, $localStorage) {
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
    }]);


    module.factory('DataService', ['$http', '$localStorage', function ($http, $localStorage) {
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

    // ***** Service Factory ***** //


    // ***** End script ***** //
})();