/* Warning! This file will always be generated. */
var ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
/** @name {ZeedhiFunctionalTestApi} z */
var z = new ZeedhiAPIConstructor(browser, protractor);


describe("#man#/reports/vnd55020_relProdModTipocons", function(){
    beforeEach(function(){
        z.application.openOnContainer('#man#/reports/vnd55020_relProdModTipocons');
    });

    it('Default test to check nofitication errors.', function(){
        expect(z.component.notification.count('error')).toBe(0);
    });

});