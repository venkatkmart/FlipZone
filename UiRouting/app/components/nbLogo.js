angular.module("components")
.directive("nbLogo",[function(){
    return{
        templateUrl:"app/templates/logo.html",
        scope:{
            logo:"@"//oneway binding to directive
        }
    }
    
}]);