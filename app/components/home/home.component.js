{
    'use strict';

    let definition = {
        bindings: {},
        controller: 'controller',
        templateUrl: 'app/components/home/home.component.tpl.html'
    };

    let controller = () => {

    };

    angular
        .module('bonusPoints')
        .component('homeComponent', definition);
}