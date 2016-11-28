angular.module("flipzone")
    .controller("mainCtrl", ["$scope", function ($scope,) {
        var template = "app/templates/";
        $scope.headerUrl = "app/templates/header.html";
        $scope.loadContent = function (type) {
            if (type == "login") {
                $scope.contentUrl = "app/templates/login.html";
            }
            if (type == "register") {
                $scope.contentUrl = "app/templates/register.html";
            }
            if (type == "home") {
                $scope.contentUrl = "app/templates/home.html";
            }
            if (type == "products") {
                $scope.contentUrl = "app/templates/products.html";
            }
             if (type == "cart") {
                $scope.contentUrl = "app/templates/cart.html";
            }
        };
        
        

}]);
