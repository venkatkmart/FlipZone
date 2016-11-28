angular.module("main")
    .controller("mainCtrl", ["$scope", "authenticateSvc", "$rootScope", "$state", "productSvc", "$translate", function ($scope, authenticateSvc, $rootScope, $state, productSvc, $translate) {
        $scope.userDetails = authenticateSvc.getUserDetails();
        $scope.itemCount = 0;
        $scope.selectedLanguage={};

        $rootScope.$on("USER_LOGGEDIN", function (event, args) {
            $scope.userDetails = authenticateSvc.getUserDetails();
        });

        $rootScope.$on("PRODUCT_ADDED", function (event, args) {
            $scope.itemCount = productSvc.getProductsForCheckout().length;
        });


        $scope.countries = [{
                "countryName": "India",
                "code": "en"
        },
            {
                "countryName": "German",
                "code": "de"
        }
                          ];
        
         $scope.changeLanguage = function (key) {
    $translate.use(key);
             
  };
        $scope.logout = function () {
            $scope.userDetails = authenticateSvc.logout();
            $state.go("login");

        };
        
        $scope.companyLogo="/images/volks.jpg";

}]);
