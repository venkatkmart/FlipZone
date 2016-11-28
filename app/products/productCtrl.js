angular.module("products")
    .controller("productCtrl", ["$scope","productSvc", function ($scope,productSvc) {

        $scope.products =productSvc.getProducts();
        $scope.selectProduct =function(item){
            productSvc.addProductForCheckOut(item);
        }
}]);
