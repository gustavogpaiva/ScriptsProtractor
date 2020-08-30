var ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
var z = new ZeedhiAPIConstructor(browser, protractor);
var j = require('../../../../../json/leitorJson.po.js');
var h = require('../../../../../page-objects/helper.po.js');

var cancelamentoCupom = function () {
    
    var self = this;   
    
    this.cancelaCupom = async function () {
        
        z.field.fieldFunctions.click('CDFILIAL');
        //z.widget.grid.click('NMFILIAL', 'TEKNISA FOOD HOUSE', '9999');
        z.component.footer.clickRightActionByLabel('Ok');
        
        z.field.fieldFunctions.click('CDFILICAIXA');
        z.widget.grid.checkAllRows('9999');
        //z.component.alert.clickButton('Sim');
        z.component.footer.clickRightActionByLabel('Ok');
        
        z.field.calendar.selectIntervalDate('DTENTRVENDA','01/01/2018','30/06/2018', 'pt_br');//data fixa
        
        z.component.footer.clickRightActionByLabel('Filtrar');
        //var linha = await h.getTotalizador('Total (Unidade: 0001 - TEKNISA FOOD HOUSE - Loja: 001 - LOJA teste)');
        //var coluna = await h.getPosColuna('Valor');
        //var total = element(by.css('#grid-1058827152339227309348 > div.body > div > div:nth-child('+ await (linha + 1) +') > div:nth-child('+ await (coluna + 2) +') > span')).getText();
        //dessa maneira funfou :)
        var total = element(by.css('#grid-1058827152339227309348 > div.body > div > div.tr.cell1.group-footer > div.td.grid-group-footer.zh-standard-column.grid-align-right.grid-group-summary > span')).getText();
        console.log('total = '+await total);
        return await total;
    };
};
module.exports = new cancelamentoCupom();