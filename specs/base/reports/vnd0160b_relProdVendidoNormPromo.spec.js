/* Warning! This file will always be generated. */
var ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
/** @name {ZeedhiFunctionalTestApi} z */
var z = new ZeedhiAPIConstructor(browser, protractor);


describe("#man#/reports/vnd0160b_relProdVendidoNormPromo", function(){
    beforeEach(function(){
        z.application.openOnContainer('#man#/reports/vnd0160b_relProdVendidoNormPromo');
    });

    it('Default test to check nofitication errors.', function(){
        expect(z.component.notification.count('error')).toBe(0);
    });

});