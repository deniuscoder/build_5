angular.module('myApp.directives', [])

.directive('fileChanged', function () {
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