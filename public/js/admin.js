var app = angular.module('ecom', ['ya.treeview', 'ya.treeview.breadcrumbs']);
app.controller('listCtrl', function($scope, $http) {

    $http.get('/getCategories').then(function(obj) {
        var data = obj.data;
        console.log(data);
    }, function(e) {
        console.log(e);
    });

    $scope.context = {
        selectedNodes: []
    };
    $scope.add = function() {
        $('#CategoryForm').show();
        var selected = $scope.context.selectedNodes;
        var len = selected.length;
        if (selected.length) {
            x = angular.toJson(selected[0].$model.parent);            
            console.log('sub category');
            $('#parent').val(x);
        } else {
            console.log('root category');
            $('#parent').val('null');
        }
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
        label: 'MEN',
        parent: "null",
        children: [{
            label: 'SHOES',
            parent: "540843b8492c371817dccdb7"
        }]
    }];

    /*
    $scope.model = [{
        label: 'parent1',
        children: [{
            label: 'child'
        }]
    }, {
        label: 'parent2',
        children: [{
            label: 'child',
            children: [{
                label: 'innerChild'
            }]
        }]
    }, {
        label: 'parent3'
    }];
    */
});