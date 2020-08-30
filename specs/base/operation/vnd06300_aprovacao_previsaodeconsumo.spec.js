/* Warning! This file will always be generated. */
var ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
/** @name {ZeedhiFunctionalTestApi} z */
var z = new ZeedhiAPIConstructor(browser, protractor);


describe("#man#/operation/vnd06300_aprovacao_previsaodeconsumo", function(){
    beforeEach(function(){
        z.application.openOnContainer('#man#/operation/vnd06300_aprovacao_previsaodeconsumo');
    });

    it('Default test to check nofitication errors.', function(){
        expect(z.component.notification.count('error')).toBe(0);
    });

});