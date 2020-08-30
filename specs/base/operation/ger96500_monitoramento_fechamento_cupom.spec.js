/* Warning! This file will always be generated. */
var ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
/** @name {ZeedhiFunctionalTestApi} z */
var z = new ZeedhiAPIConstructor(browser, protractor);


describe("#man#/operation/ger96500_monitoramento_fechamento_cupom", function(){
    beforeEach(function(){
        z.application.openOnContainer('#man#/operation/ger96500_monitoramento_fechamento_cupom');
    });

    it('Default test to check nofitication errors.', function(){
        expect(z.component.notification.count('error')).toBe(0);
    });

});