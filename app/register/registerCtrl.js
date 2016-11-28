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
    }]);
