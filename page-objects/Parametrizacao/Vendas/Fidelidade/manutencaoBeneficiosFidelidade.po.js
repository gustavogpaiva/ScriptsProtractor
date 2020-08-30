var ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
var z = new ZeedhiAPIConstructor(browser, protractor);
var h = require('../../../../page-objects/helper.po.js');
var j = require('../../../../json/leitorJson.po.js');
var manutencaoBeneficiosFidelidade = function () {

    var self = this;

    this.manutencao = function () {
        z.field.fieldFunctions.click('NMRAZSOCCLIE');
        z.widget.grid.click('NMRAZSOCCLIE', j.getValor('cliente'), '0');
        z.field.fieldFunctions.click('NMCONSUMIDOR');
        z.widget.grid.click('NMCONSUMIDOR', j.getValor('nomeConsumidor'), '0');
        z.component.footer.clickRightActionByLabel('Filtro');
        z.widget.grid.click('NMCONSUMIDOR', j.getValor('nomeConsumidor'), '4162660492882674643628');
        h.navegar('Campanha');
        browser.sleep(2000);
        z.component.footer.clickLeftActionByLabel('Voltar');
    };
};

module.exports = new manutencaoBeneficiosFidelidade();
//future corrections, please change the expect validation if its possible