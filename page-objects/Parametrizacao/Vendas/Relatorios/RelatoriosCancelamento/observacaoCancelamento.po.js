var ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
var z = new ZeedhiAPIConstructor(browser, protractor);


var observacaoCancelamento = function () {

    var self = this;

    this.obsCancelamento = function () {
        z.field.fieldFunctions.click('CDFILIAL');
        //z.widget.grid.click('NMFILIAL', 'TEKNISA FOOD HOUSE', '9999');
        z.component.footer.clickRightActionByLabel('Ok');

        z.field.fieldFunctions.click('CDLOJA');
        z.widget.grid.checkAllRows('9999');        
        z.component.footer.clickRightActionByLabel('Ok');        

        z.field.calendar.selectIntervalDate('DTENTRVENDA', '17/12/2017', '17/07/2018', 'pt_br');

        z.component.footer.clickRightActionByLabel('Filtrar');
        browser.sleep(7000);
    };
};
module.exports = new observacaoCancelamento();