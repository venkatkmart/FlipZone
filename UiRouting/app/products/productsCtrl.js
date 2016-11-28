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
