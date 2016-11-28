angular.module("login")
    .controller("loginCtrl", ["$scope","authenticateSvc","$state","$rootScope", function ($scope,authenticateSvc,$state,$rootScope) {

        $scope.user = {};
        $scope.isValidUser=true;
        $scope.loginUser = function () {
            var status= authenticateSvc.login($scope.user);
             $scope.isValidUser = status.isLoggedIn;
            if($scope.isValidUser){
                $rootScope.$broadcast("USER_LOGGEDIN")
                $state.go("home");
            }
        };

        
}]);