angular.module("components")
.directive("nbRegister",[function(){
    return{
        templateUrl:"app/templates/registerDir.html",
        //controller:'registerCtrl',
        transclude:true
    }
}])