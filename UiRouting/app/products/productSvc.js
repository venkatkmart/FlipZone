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
