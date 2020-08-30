var ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
var z = new ZeedhiAPIConstructor(browser, protractor);
var j = require('../../../../json/leitorJson.po.js');

var monitoramentoFechamentoCumpom = function () {

    var self = this;

    this.monitoramento = function () {
        //colocar unidade que está faltando na tela
        z.field.calendar.selectIntervalDate('DTREDUCAOZ','01/01/2018','25/07/2018','pt_br');
        z.component.footer.clickRightActionByLabel('Filtro');
    };   

};
module.exports = new monitoramentoFechamentoCumpom();