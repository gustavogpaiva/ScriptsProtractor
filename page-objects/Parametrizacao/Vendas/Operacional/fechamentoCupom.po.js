var ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
var z = new ZeedhiAPIConstructor(browser, protractor);
var moment = require('moment');
var h = require('../../../../page-objects/helper.po.js');

var fecharCupom = function () {
    
    var self = this;
    
    //função para sempre pegar o dia atual da execução do teste e um dia após
    var past2years = moment().format('DD/MM/YYYY');
    var tomorrow = moment(past2years, 'DD/MM/YYYY').subtract(2, "years").format('DD/MM/YYYY');
    
    this.cupom = function () {
        
        z.field.calendar.selectIntervalDate('DTREDUCAOZ',past2years , tomorrow, 'pt_br');
        // filial
        z.field.fieldFunctions.click('CDFILIAL');
        z.widget.grid.checkAllRows('9999');
        z.component.footer.clickRightActionByLabel('Ok');
        z.field.fieldFunctions.click('CDCAIXAFILI');
        z.widget.grid.checkAllRows('9999');
        z.component.footer.clickRightActionByLabel('Ok');
        z.field.fieldFunctions.click('IDSTATUS');
        z.widget.grid.checkAllRows('9999');
        z.component.footer.clickRightActionByLabel('Ok');
        z.field.fieldFunctions.click('IDORIGEMREDZ');
        z.widget.grid.checkAllRows('9999');
        z.component.footer.clickRightActionByLabel('Ok');
        z.component.footer.clickRightActionByLabel('Filtro');
    };
    //na base do SAAS ainda não existe registro de cupons
    this.visualizaCupom = function () {
        z.widget.grid.clickColumn('5338086944003091545642', 0, 0, true);
        h.navegar('Imposto');
        z.widget.grid.clickColumn('5338086941466967270643', 0, 0);
        z.component.footer.clickLeftActionByLabel('Voltar');
        h.navegar('Venda');
        z.widget.grid.clickColumn('5338086943979267505653', 0, 0);
        z.component.footer.clickLeftActionByLabel('Voltar');
        h.navegar('Recebimento');
        z.widget.grid.clickColumn('5338086943869647388675', 0, 0);
        z.component.footer.clickLeftActionByLabel('Voltar');
        z.component.footer.clickLeftActionByLabel('Voltar');
    };
};
module.exports = new fecharCupom();