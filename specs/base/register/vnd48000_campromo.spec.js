/* Warning! This file will always be generated. */
var ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
/** @name {ZeedhiFunctionalTestApi} z */
var z = new ZeedhiAPIConstructor(browser, protractor);


describe("#man#/register/vnd48000_campromo", function(){
    beforeEach(function(){
        z.application.openOnContainer('#man#/register/vnd48000_campromo');
    });

    it('Default test to check nofitication errors.', function(){
        expect(z.component.notification.count('error')).toBe(0);
    });

});