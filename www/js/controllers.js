angular.module('myApp.controllers', [])

.controller('AppController', function ($scope, $data) {
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
})

.controller('DetailController', function ($scope, $data, DataService) {
    $scope.item = $data.selectedItem;
    // console.log($scope.item.discription);
    $scope.html = $scope.item.discription;

    $scope.delTarget = function (event) {
        var arr = $data.items;
        var key = event.item.title;

        var result = DataService.popArray(arr, "title", key);

        ons.notification.confirm({
            message: 'Вы уверены что хотите удалить цель?',
            // or messageHTML: '<div>Message in HTML</div>',
            title: 'Внимание!',
            buttonLabels: ['Да', 'Нет'],
            animation: 'default', // or 'none'
            primaryButtonIndex: 1,
            cancelable: true,
            callback: function (index) {
                if (index) {} else {
                    $data.items.splice(result, 1);
                    modal.show();
                }
            }
        });
    };
})

.controller('MasterController', function ($scope, $data) {
    $scope.items = $data.items;

    $scope.showDetail = function (index) {
        var selectedItem = $data.items[index];
        $data.selectedItem = selectedItem;
        console.log(index);
        $scope.navi.pushPage('detail.html', {
            title: selectedItem.title
        });
    };
})

.controller('GroupController', function ($scope, $data, DataService) {
    $scope.items = $data.items;
    $scope.showDetail = function (index) {
        var arr = $data.items;
        var key = index.item.title;
        var result = DataService.popArray(arr, "title", key);
        var selectedItem = $data.items[result];
        $data.selectedItem = selectedItem;
        $scope.navi.pushPage('detail.html', {
            title: selectedItem.title
        });
    };
})

.controller('MyController', function ($scope, $localStorage) {
    'use strict';

    $scope.addTarget = function () {
        var img = document.getElementById("result");
        var dataimg = img.lastChild.toDataURL("image/jpeg", 1.0);

        $scope.newImage = dataimg;

        var setDate = toDate.valueAsDate;
        if (setDate && $scope.check) $scope.stop = setDate.toLocaleDateString();


        $localStorage.data.items.push({
            title: $scope.title,
            img: $scope.newImage,
            discription: $scope.discription.replace(/\r?\n/g, '<br />'),
            motivation: $scope.motivation,
            group: $scope.group,
            start: $scope.start,
            stop: $scope.stop
        });
        console.log($localStorage.data);
        //  alert("Цель сохранена!");
        modalsave.show();
        setTimeout('navi.popPage()', 2000);

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

    document.getElementById('file-input').onchange = function (e) {
        loadImage(
            e.target.files[0],
            function (img) {
                result.appendChild(img);
            }, {
                maxWidth: 250,
                canvas: true
            } // Options
        );
    };


    $scope.date = function (obj) {
        var d = new Date();

        switch (obj.path[1].id) {

        case 'Day':
            $scope.group = obj.srcElement.value;
            $scope.start = d.toLocaleDateString();
            d.setDate(d.getDate() + 1);
            $scope.stop = d.toLocaleDateString();
            $scope.check = false;
            $scope.checkday = true;
            break;
        case 'Week':
            $scope.group = obj.srcElement.value;
            $scope.start = d.toLocaleDateString();
            d.setDate(d.getDate() + 7);
            $scope.stop = d.toLocaleDateString();
            $scope.check = false;
            break;
        case 'Month':
            $scope.group = obj.srcElement.value;
            $scope.start = d.toLocaleDateString();
            d.setDate(d.getDate() + 30);
            $scope.stop = d.toLocaleDateString();
            $scope.check = false;
            break;
        case 'Quarter':
            $scope.group = obj.srcElement.value;
            $scope.start = d.toLocaleDateString();
            d.setMonth(d.getMonth() + 4);
            $scope.stop = d.toLocaleDateString();
            $scope.check = false;
            break;
        case 'Year':
            $scope.group = obj.srcElement.value;
            $scope.start = d.toLocaleDateString();
            d.setFullYear(d.getFullYear() + 1);
            $scope.stop = d.toLocaleDateString();
            $scope.check = false;
            break;
        case 'Date':
            $scope.group = obj.srcElement.value;
            $scope.check = true;
            break;
        default:
            console.log(obj);
        }


    };


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

});