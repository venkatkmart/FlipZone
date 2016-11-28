angular.module("authenticate",[]);
angular.module("authenticate")
.service("authenticateSvc",[function(){
    
    var usersList
    =[{"username":"kiran",
                 "password":"kiran",
                   "firstName":"Kiran",
                "lastName":"PVS",
                "role":"Admin"},
               {"username":"Aishwarya",
                 "password":"Aishwarya",
                   "firstName":"Aishwarya",
                "lastName":"B",
                "role":"consumer"},
                  {"username":"chiranjeevi",
                 "password":"chiranjeevi",
                   "firstName":"chiranjeevi",
                "lastName":"K",
                "role":"Seller"},
               ];
    //login
    //logout
    //registration.
    var userDetails={
        isLoggedIn:false,
        firstName:"",
        lastName:"",
        role:""
    };
    var resetUser=function(){
                 userDetails.isLoggedIn=false;
                userDetails.firstName = "";
                userDetails.lastName="";
                userDetails.role="";
    };
    
    var validateUser=function(user){
        
        var data = _.find(usersList,user);
            if(data){
                userDetails.isLoggedIn=true;
                userDetails.firstName = data.firstName;
                userDetails.lastName=data.lastName;
                userDetails.role=data.role;
            }
        else{
            resetUser();  
        }
        
    };
    
    this.login= function(user){
        validateUser(user);
        return userDetails;
    };
    
    this.logout=function(){
     resetUser();
        return userDetails;
    };
    
    this.getUserDetails= function(){
        return userDetails;
    };
    this.register= function(data){
        
    };
    
    this.checkUserExists = function(username){
       return _.find(usersList,{username:username});
    };
}]);
angular.module("components",[]);
angular.module("components")
    .directive("nbAlphabets", [function () {
        return {

            restrict: "A",
            link: function (scope, element, attrs) {
                /*console.log(scope);
                console.log(element);
                console.log(attrs);*/
                element.bind("keypress", function (evt) {
                    if ((evt.keyCode >= 65 && evt.keyCode <= 90) || (evt.keyCode >= 97 && evt.keyCode <= 122)) {

                    } else {
                        evt.preventDefault();
                    }
                });
            }
        };

}]);

angular.module("components")
    .directive("nbCheckUser", ["authenticateSvc", function (authenticateSvc) {
        return {
            restrict: "A",
            require:"ngModel",
          
            link: function (scope, element, attrs, ctrl) {
                    var control =ctrl;

                element.bind("blur", function checkDetails(evt,ctrl) {
                    var userExists = authenticateSvc.checkUserExists(this.value);
                    if (userExists) {
                        control.$setValidity('nbCheckUser', false);
                    }
                    else{
                      control.$setValidity('nbCheckUser', true);  
                    }
                    scope.$apply();
                    return undefined;
                });
                 return undefined;
            }
        }
}])

angular.module("components")
.directive("nbDatePicker",[function(){
    return{
        restrict:"A",
        link:function(scope,element,attrs){
            var config={};
            if(attrs["mindate"]){
                config.minDate=attrs["mindate"];
            }
            if(attrs["maxdate"]){
                 config.maxDate=attrs["maxdate"];
            }
            element.datepicker(config);
        }
    }
}]);
angular.module("components")
.directive("nbHeaderProperty",[function(){
    return {
        //template:"<h1>Hello Guys</h1>",
        templateUrl:"app/templates/header.html",
        restrict:"ACE",
        compile:function(element,attrs){
            console.log(element);
            return{
                pre:function(scope,element,attrs){
                    
                },
                post:function(scope,element,attrs){
                    
                }
            }
        }
    };
    
}]);
angular.module("components")
.directive("nbLogo",[function(){
    return{
        templateUrl:"app/templates/logo.html",
        scope:{
            logo:"@"//oneway binding to directive
        }
    }
    
}]);
angular.module("components")
    .directive("nbNumbers", [function () {
        return {

            restrict: "A",
            link: function (scope, element, attrs) {
                /*console.log(scope);
                console.log(element);
                console.log(attrs);*/
                element.bind("keypress", function (evt) {
                    if (evt.keyCode >= 48 && evt.keyCode <= 57) {

                    } else {
                        evt.preventDefault();
                    }
                });
            }
        };

}]);

angular.module("components")
.directive("nbRegister",[function(){
    return{
        templateUrl:"app/templates/registerDir.html",
        //controller:'registerCtrl',
        transclude:true
    }
}])
angular.module("components")
.directive("nbTwoWay",[function(){
    return{
        templateUrl:"app/templates/twoway.html",
        scope:{
            headerName:"@",
          
        }
    }
    
}]);
angular.module("login",[]);
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
angular.module("main",[]);
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

angular.module("register", []);


angular.module("register")
    .config(function() {
        console.log("Hey I am the register Module");
    });
angular.module("register")
    .controller("registerCtrl", ["$scope", function ($scope) {
        $scope.registerUser = {};
        $scope.register = function () {
            if ($scope.selectedCountry) {
                $scope.registerUser.country = $scope.selectedCountry.code;
            }
            console.log($scope.registerUser);
        };
        $scope.countries = [{
                "name": "India",
                "code": "IN",
                "phonecode": "+91"
        },
            {
                "name": "United States",
                "code": "US",
                "phonecode": "+1"
                          }];

        var states = [{
                "stateName": "Telangana",
                "stateCode": "TG",
                "countryCode": "IN"
            },

            {
                "stateName": "New York",
                "stateCode": "NY",
                "countryCode": "US"
            },
            {
                "stateName": "Andhra Pradesh",
                "stateCode": "AP",
                "countryCode": "IN"
            },

            {
                "stateName": "Las Vegas",
                "stateCode": "LS",
                "countryCode": "US"
            }
                     ];
        $scope.phonePattern = "/^\d+$/";
        $scope.loadStates = function () {
            if ($scope.selectedCountry.code == "US") {
                $scope.phonePattern = "^(\([0-9]{3}\) |[0-9]{3}-)[0-9]{3}-[0-9]{4}$"
            } else {
                $scope.phonePattern = "/^\d+$/"
            }

            $scope.states = [];
            angular.forEach(states, function (item) {
                if (item.countryCode == $scope.selectedCountry.code) {
                    $scope.states.push(item);
                }
            });
        };
        $scope.groupedStates = states;



        $scope.checkFields = function () {
            if ($scope.registerUser.firstName && $scope.registerUser.lastName && $scope.registerUser.age && $scope.registerUser.gender && $scope.registerUser.terms) {
                $scope.enableButton = true;
            } else {
                $scope.enableButton = false;
            }
        };
        
        $scope.config ={
            maxDate:0
        };
    }]);

angular.module("products", []);

angular.module("products")
    .controller("productCtrl", ["$scope", "productSvc", "$rootScope",
                                function ($scope, productSvc, $rootScope) {

            // var promises = productSvc.getProducts();
            $scope.pager = {
                currentPage:1,
                showBoundaryLinks:true,
                totalItems:30,
                numberOfPages:3,
                maxSize:3
                
            };
            $scope.sortCriteria = "description";
            productSvc.getProducts()
                .then(function (response) {
                    $scope.totalProducts = response;
                $scope.products= angular.copy(response);
                $scope.pager.totalItems=$scope.totalProducts.length;
                    
                    $scope.pageChanged();
                })
                .catch(function (response) {
                    $scope.error = response;
                })
                .finally(function (response) {
                    console.log("I am executed finally");
                });


            $scope.selectProduct = function (item) {
                productSvc.addProductForCheckOut(item);
                $rootScope.$broadcast("PRODUCT_ADDED", {
                    product: item
                });
            };

            $scope.changeCriteria = function () {

                if ($scope.sortCriteria == "description") {
                    $scope.sortCriteria = "-description";
                } else {
                    $scope.sortCriteria = "description";
                }

            };




            $scope.setPage = function (pageNo) {
                $scope.currentPage = pageNo;
            };
            $scope.pageChanged = function () {
                var currentPageNumber= $scope.pager.currentPage;
                
                var startIndex = (currentPageNumber-1)*10+1;
                var endIndex = currentPageNumber*10;
                $scope.products= $scope.totalProducts.slice(startIndex,endIndex);               
            };

}]);

angular.module("products")
    .service("productSvc", ["$q", "$http",
                            function ($q, $http) {
            var products = [];

            this.getProducts = function () {

                var dfd = $q.defer();
                if (products.length>0) {
                    dfd.resolve(products);
                } else {
                    $http.get("app/data/products.json")
                        .then(function (response) {
                            products = response.data.products;
                            dfd.resolve(products);

                        }).catch(function (response) {
                            dfd.reject('Error Occured');
                        });
                }

                return dfd.promise;
            };

            this.getProductsForCheckout = function () {
                return products;
            };

            this.addProductForCheckOut = function (product) {
                if (!_.contains(products, product)) {
                    products.push(product);
                }
            };

}]);

angular.module("flipzone", ["ui.router",
                            "login",
                            "authenticate",
                            "main",
                            "products",
                            "register",
                            "ui.bootstrap", "pascalprecht.translate",
                            "components"]);



angular.module("flipzone")
    .config(function (
        $stateProvider, $urlRouterProvider, $translateProvider) {
        var homeObj = {
            templateUrl: "app/templates/home.html",
            url: "home"
        };
        var loginObj = {
            templateUrl: "app/templates/login.html",
            url: "login",
            controller: "loginCtrl"
        };
        var registerObj = {
            templateUrl: "app/templates/register.html",
            url: "register"
        };
        var productsObj = {
            templateUrl: "app/templates/products.html",
            url: "products",
            controller: "productCtrl"
        };
        $stateProvider.state("home", homeObj);
        $stateProvider.state("login", loginObj);
        $stateProvider.state("register", registerObj);
        $stateProvider.state("products", productsObj);


        $translateProvider.translations('en', {
            TITLE: 'Hello',
            FOO: 'This is a paragraph.',
            BUTTON_LANG_EN: 'english',
            BUTTON_LANG_DE: 'german',
            LOGIN: "Login",
            LOGOUT: "Logout",
            REGISTER: "Register"
        });
        $translateProvider.translations('de', {
            TITLE: 'Hallo',
            FOO: 'Dies ist ein Paragraph.',
            BUTTON_LANG_EN: 'englisch',
            BUTTON_LANG_DE: 'deutsch',
            LOGOUT: "Ausloggen",
            LOGIN: "Anmeldung",
            REGISTER: "Neu registrieren"
        });
        $translateProvider.preferredLanguage('en');

    });
