angular.module("components")
.directive("nbTwoWay",[function(){
    return{
        templateUrl:"app/templates/twoway.html",
        scope:{
            headerName:"@",
          
        }
    }
    
}]);