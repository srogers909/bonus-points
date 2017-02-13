(function() {
    angular
        .module('bonusPoints', ['ui.router'])
        .config([
            '$stateProvider', '$urlRouterProvider', ($stateProvider, $urlRouterProvider) => {
                $stateProvider
                    .state('home', {
                        url: '/',
                        template: '<home-component></home-component>'
                    })
                    .state('finances', {
                        url: '/finances',
                        template: '<finance-component></finance-component>'
                    });

                $urlRouterProvider.otherwise('/');
            }]);
}());