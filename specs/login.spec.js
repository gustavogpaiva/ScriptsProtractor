/*Este spec de login é utilizado nos testes das telas com a ferramenta zhBuilderTest.*/
var ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
/** @name {ZeedhiFunctionalTestApi} z */
var z = new ZeedhiAPIConstructor(browser, protractor);
var decache = require('decache');

decache("../config/configParams.js");
var configParams = require("../config/configParams.js");


describe("#/", function () {
    var USER = configParams.user;
    var PASSWORD = configParams.password;

    beforeEach(function () {
        z.application.openOnContainer('#/');
    });

    it('Login', function () {
        browser.sleep(2000);
        z.field.checkbox.click('KEEP_CONNECTED');
        z.field.fieldFunctions.fill('USER', USER, true);
        z.field.fieldFunctions.fill('PASSWORD', PASSWORD, true);
        z.field.button.clickOnEdit('SUBMIT');
        z.application.waitZhLoading();
    });
});