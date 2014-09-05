var app = angular.module('ecom', ['ya.treeview', 'ya.treeview.breadcrumbs']);
app.controller('categoryCtrl', function($scope, $http) {
    /*
    $http.get('/getCategories').then(function(obj) {
        var data = obj.data;
        //console.log(data);
    }, function(e) {
        console.log(e);
    });
    */
    $scope.context = {
        selectedNodes: []
    };
    $scope.options = {
        onSelect: function($event, node, context) {
            if ($event.ctrlKey) {
                var idx = context.selectedNodes.indexOf(node);
                if (context.selectedNodes.indexOf(node) === -1) {
                    context.selectedNodes.push(node);
                } else {
                    context.selectedNodes.splice(idx, 1);
                }
            } else {
                context.selectedNodes = [node];
            }
        }
    };

    $scope.model = [{
        _id: "5409ac5ac35f73dc17b98c88",
        name: "MEN",
        isActive: "1",
        description: "MEN",
        pageTitle: "MEN",
        metaKeywords: "MEN",
        metaDescription: "MEN",
        includeInMenu: "1",
        parent: "null",
        children: [{
            _id: "5409ae4fb7a6515019c17176",
            name: "SHOES",
            isActive: "1",
            description: "SHOES",
            pageTitle: "SHOES",
            metaKeywords: "SHOES",
            metaDescription: "SHOES",
            includeInMenu: "1",
            parent: "5409ac5ac35f73dc17b98c88"
        }]
    }];
    $scope.addCategory = function() {
        console.log('$scope.addCategory = function() {');
        $('#CategoryForm').show();
        var selected = $scope.context.selectedNodes;
        console.log(selected);
        var len = selected.length;
        if (len) {
            console.log('sub category');
            var id = selected[0].$model._id;
            console.log(id);
            $('#parent').val(id);
            $scope.category.parent = id;
        } else {
            console.log('root category');
            $('#parent').val('null');
            $scope.category.parent = null;
        }
    };

    window.y = $scope.category = {
        name: "SHOES",
        isActive: 1,
        description: "SHOES",
        pageTitle: "SHOES",
        metaKeywords: "SHOES",
        metaDescription: "SHOES",
        includeInMenu: 1,
        parent: null
    };


    $scope.saveCategory = function() {
        console.log(angular.toJson($scope.category));
        $http({
            method: 'POST',
            url: "/saveCategory",
            headers: {
                'Content-Type': undefined
            },
            transformRequest: function(data) {
                var formData = new FormData();

                angular.forEach(data, function(v, k) {
                    formData.append(k, v);
                });

                var thumbnail = document.getElementById("thumbnail").files[0];
                var image = document.getElementById("image").files[0];

                formData.append("thumbnail", thumbnail);
                formData.append("image", image);
                return formData;
            },
            data: $scope.category
        }).
        success(function(data, status, headers, config) {
            console.log("success!");
            $scope.model[0].children.push(data);
        }).
        error(function(data, status, headers, config) {
            alert("failed!");
        });
    };
});