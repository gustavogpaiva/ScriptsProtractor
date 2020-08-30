var ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
var z = new ZeedhiAPIConstructor(browser, protractor);
var j = require('../../../../../json/leitorJson.po.js');
var h = require('../../../../../page-objects/helper.po.js');
var moment = require('moment');

var MapResuECF = function () {

    var self = this;
    var today = moment().format('DD/MM/YYYY');
    var past2months = moment(today, 'DD/MM/YYYY').subtract(2, "m").format('DD/MM/YYYY');

    this.resumoECF = function () {
        
        z.field.selectNative.click('TIPORELATORIO', 'Minas Gerais');
        z.field.fieldFunctions.click('CDLOJA');
        z.widget.grid.click('NMLOJA', j.getValor('loja'), '9999', true);
        z.component.footer.clickRightActionByLabel('Ok');

        z.field.fieldFunctions.click('CDCAIXA');
        z.widget.grid.click('NMCAIXA', j.getValor('nmcaixa'), '9999', true);
        z.component.footer.clickRightActionByLabel('Ok');

        z.field.calendar.selectIntervalDate('DTENTRVENDA', past2months, today, 'pt_br');
        z.component.footer.clickRightActionByLabel('Relatório');
        // esse if é usado para quando não tem relatórios a serem gerados
        z.component.alert.isVisible().then(function (alerta) {
            if (alerta) {
                z.component.alert.clickMessageOk();
            }
        });
    };
};
module.exports = new MapResuECF();