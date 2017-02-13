(function() {
    describe('Home Component Unit Tests', () => {
        let $componentController, $httpBackend, $scope, ctrl;

        beforeEach(inject((
            _$rootScope_,
            _$httpBackend_,
            _$componentController_
        ) => {
            $scope = _$rootScope_.$new();
            $httpBackend = _$httpBackend_;
            $componentController = _$componentController_;

            ctrl = $componentController('homeComponent', null, {});
        }));

        describe('What happens when it first loads?', () => {
            it('should say hello world', () => {
                expect(ctrl.greetings).toBe('hello world');
            });
        });
    });
}());