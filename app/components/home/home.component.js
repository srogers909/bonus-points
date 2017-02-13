(function() {
    let componentDefinition = {
        bindings: {

        },
        controller: Controller,
        templateUrl: 'components/home/home.component.tpl.html'
    };

    function Controller() {
        let vm = this;

        vm.greetings = 'hello world';
    }

    angular
        .module('bonusPoints')
        .component('homeComponent', componentDefinition);
}());