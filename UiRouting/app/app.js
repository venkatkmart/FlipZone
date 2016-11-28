angular.module("flipzone", ["ui.router",
                            "login",
                            "authenticate",
                            "main",
                            "products",
                            "register",
                            "ui.bootstrap", "pascalprecht.translate",
                            "components"]);



angular.module("flipzone")
    .config(function (
        $stateProvider, $urlRouterProvider, $translateProvider) {
        var homeObj = {
            templateUrl: "app/templates/home.html",
            url: "home"
        };
        var loginObj = {
            templateUrl: "app/templates/login.html",
            url: "login",
            controller: "loginCtrl"
        };
        var registerObj = {
            templateUrl: "app/templates/register.html",
            url: "register"
        };
        var productsObj = {
            templateUrl: "app/templates/products.html",
            url: "products",
            controller: "productCtrl"
        };
        $stateProvider.state("home", homeObj);
        $stateProvider.state("login", loginObj);
        $stateProvider.state("register", registerObj);
        $stateProvider.state("products", productsObj);


        $translateProvider.translations('en', {
            TITLE: 'Hello',
            FOO: 'This is a paragraph.',
            BUTTON_LANG_EN: 'english',
            BUTTON_LANG_DE: 'german',
            LOGIN: "Login",
            LOGOUT: "Logout",
            REGISTER: "Register"
        });
        $translateProvider.translations('de', {
            TITLE: 'Hallo',
            FOO: 'Dies ist ein Paragraph.',
            BUTTON_LANG_EN: 'englisch',
            BUTTON_LANG_DE: 'deutsch',
            LOGOUT: "Ausloggen",
            LOGIN: "Anmeldung",
            REGISTER: "Neu registrieren"
        });
        $translateProvider.preferredLanguage('en');

    });
