var ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
var z = new ZeedhiAPIConstructor(browser, protractor);
var moment = require('moment');

var operador = function () {

    var self = this;
    var today = moment().format('DD/MM/YYYY');
    var lastYear = moment(today, 'DD/MM/YYYY').subtract(1, "y").format('DD/MM/YYYY');

    this.operArrecadar= function () {
        z.field.fieldFunctions.click('NMOPERADOR_V');
        z.widget.grid.checkAllRows('9999');
        z.component.alert.clickButton('Sim');
        z.component.footer.clickRightActionByLabel('Ok');
        z.field.calendar.selectIntervalDate('DTMOVIMCAIXA', lastYear, today, 'pt_br');
        z.component.footer.clickRightActionByLabel('Filtrar');
        browser.sleep('7000');
    };
};
module.exports = new operador();