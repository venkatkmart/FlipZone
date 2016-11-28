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