var ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
var z = new ZeedhiAPIConstructor(browser, protractor);
var j = require('../../../../../json/leitorJson.po.js');
var h = require('../../../../../page-objects/helper.po.js');
var moment = require('moment');

var fecharCaixa = function () {
    
    var self = this;
    var today = moment().format('DD/MM/YYYY');
    var lastYear = moment(today, 'DD/MM/YYYY').subtract(1, "y").format('DD/MM/YYYY');
    
    this.fechaCaixa = async function () {
        z.field.selectNative.click('TIPORELATORIO', 'Controle');
        // z.field.fieldFunctions.click('CDFILIAL');
        $$('#CDFILIAL').click();
        // z.widget.grid.click('NMFILIAL',j.getValor('filial'), '9999', true);
        z.component.footer.clickRightActionByLabel('Ok');
        z.field.fieldFunctions.click('CDLOJA');
        z.widget.grid.click('NMLOJA',j.getValor('loja'), '9999', true);
        z.component.footer.clickRightActionByLabel('Ok');
        z.field.calendar.selectIntervalDate('DTENTRVENDA', lastYear, today, 'pt_br');
        z.component.footer.clickRightActionByLabel('Relatório');
    };      
};
module.exports = new fecharCaixa();