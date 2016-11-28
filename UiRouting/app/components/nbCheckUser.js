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
