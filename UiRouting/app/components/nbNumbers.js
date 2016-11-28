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
