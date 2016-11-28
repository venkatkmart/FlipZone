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