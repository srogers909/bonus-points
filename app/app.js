{
    'use strict';

    angular
        .module('bonusPoints', ['ui.router'])
        .config([
            '$stateProvider', ($stateProvider) => {
                $stateProvider
                    .state({
                        url: '/',
                        component: 'homeComponent'
                    });
            }]);
}