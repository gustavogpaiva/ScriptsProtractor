/* Warning! This file will always be generated. */
var ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
/** @name {ZeedhiFunctionalTestApi} z */
var z = new ZeedhiAPIConstructor(browser, protractor);


describe("#man#/register/vnd42300_cadcaixa", function(){
    beforeEach(function(){
        z.application.openOnContainer('#man#/register/vnd42300_cadcaixa');
    });

    it('Default test to check nofitication errors.', function(){
        expect(z.component.notification.count('error')).toBe(0);
    });

});