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

    $scope.delTarget = function (event) {
        var arr = $data.items;
        var key = event.item.title;

        var result = DataService.popArray(arr, "title", key);

        // if (confirm("Вы уверены что хотите удалить? " + result)) {
        //         $data.items.splice(result, 1);
        //    }

        ons.notification.confirm({
            message: 'Вы уверены что хотите удалить цель?',
            // or messageHTML: '<div>Message in HTML</div>',
            title: 'Внимание!',
            buttonLabels: ['Да', 'Нет'],
            animation: 'default', // or 'none'
            primaryButtonIndex: 1,
            cancelable: true,
            callback: function (index) {
                if (index) {
                    console.log("No");
                } else {
                    console.log("Yes");
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
        console.log($data);
        $scope.navi.pushPage('detail.html', {
            title: selectedItem.title
        });
    };
})

.controller('MyController', function ($scope, $localStorage) {
    'use strict';

    $scope.addTarget = function () {
        var img = document.getElementById("result");
        var dataimg = img.lastChild.toDataURL("image/jpeg", 0.5);

        $scope.newImage = dataimg;

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
        // console.log($localStorage.data);
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
                maxWidth: 200,
                canvas: true
            } // Options
        );
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