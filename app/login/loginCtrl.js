angular.module("login")
    .controller("loginCtrl", ["$scope","authenticateSvc", function ($scope,authenticateSvc) {

        $scope.user = {};
        $scope.isValidUser=true;
        $scope.loginUser = function () {
            var status= authenticateSvc.login($scope.user);
             $scope.isValidUser = status.isLoggedIn;
        };

        
}]);
