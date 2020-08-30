var ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
var z = new ZeedhiAPIConstructor(browser, protractor);
var j = require('../../../../../json/leitorJson.po.js');
var h = require('../../../../../page-objects/helper.po.js');
var moment = require('moment');

var resumoCaixa = function () {
    
    var self = this;
    var today = moment().format('DD/MM/YYYY');
    var past2months = moment(today, 'DD/MM/YYYY').subtract(2, "m").format('DD/MM/YYYY');
    
    this.resCaixaRMC = function () {
        z.field.selectNative.click('__report_name', 'Resumo da Movimentação do Caixa (RMC)');
        //    unidade setada automaticamente
        z.field.fieldFunctions.click('CDLOJA');
        // loja
        z.widget.grid.click('NMLOJA', j.getValor('loja'), '9999', true);
        z.component.footer.clickRightActionByLabel('Ok'); 
        // caixa
        z.field.fieldFunctions.click('CDCAIXA');
        z.widget.grid.click('NMCAIXA', j.getValor('nmcaixa'), '9999',true);
        z.component.footer.clickRightActionByLabel('Ok');
        // data
        z.field.calendar.selectIntervalDate('DTENTRVENDA', past2months, today, 'pt_br');
        // possui abertura de caixa após a data mas não é campo obrigatório
        z.component.footer.clickRightActionByLabel('Relatório'); 
    };

    this.resCaixaRFC = function () {
        z.field.selectNative.click('__report_name', 'Comparativo Fechamento Caixa (RFC)');
        //    unidade setada automaticamente
        z.field.fieldFunctions.click('CDLOJA');
        // loja
        z.widget.grid.click('NMLOJA', j.getValor('loja'), '9999', true);
        z.component.footer.clickRightActionByLabel('Ok'); 
        // caixa
        z.field.fieldFunctions.click('CDCAIXA');
        z.widget.grid.click('NMCAIXA', j.getValor('nmcaixa'), '9999',true);
        z.component.footer.clickRightActionByLabel('Ok');
        // data
        z.field.calendar.selectIntervalDate('DTENTRVENDA', past2months, today, 'pt_br');
        // possui abertura de caixa após a data mas não é campo obrigatório
        z.component.footer.clickRightActionByLabel('Relatório'); 
    };

    this.resCaixaRfcNFCSAT = function () {
        z.field.selectNative.click('__report_name', 'Comparativo Fechamento Caixa (RFC - NFC-e/SAT)');
        //    unidade setada automaticamente
        z.field.fieldFunctions.click('CDLOJA');
        // loja
        z.widget.grid.click('NMLOJA', j.getValor('loja'), '9999', true);
        z.component.footer.clickRightActionByLabel('Ok'); 
        // caixa
        z.field.fieldFunctions.click('CDCAIXA');
        z.widget.grid.click('NMCAIXA', j.getValor('nmcaixa'), '9999',true);
        z.component.footer.clickRightActionByLabel('Ok');
        // data
        z.field.calendar.selectIntervalDate('DTENTRVENDA', past2months, today, 'pt_br');
        // possui abertura de caixa após a data mas não é campo obrigatório
        z.component.footer.clickRightActionByLabel('Relatório'); 
    };

    this.resCaixaRmcNFCESAT = function () {
        z.field.selectNative.click('__report_name', 'Resumo da Movimentação do Caixa (RMC - NFCe/SAT)');
        //    unidade setada automaticamente
        z.field.fieldFunctions.click('CDLOJA');
        // loja
        z.widget.grid.click('NMLOJA', j.getValor('loja'), '9999', true);
        z.component.footer.clickRightActionByLabel('Ok'); 
        // caixa
        z.field.fieldFunctions.click('CDCAIXA');
        z.widget.grid.click('NMCAIXA', j.getValor('nmcaixa'), '9999',true);
        z.component.footer.clickRightActionByLabel('Ok');
        // data
        z.field.calendar.selectIntervalDate('DTENTRVENDA', past2months, today, 'pt_br');
        // possui abertura de caixa após a data mas não é campo obrigatório
        z.component.footer.clickRightActionByLabel('Relatório'); 
    };   
};
module.exports = new resumoCaixa();