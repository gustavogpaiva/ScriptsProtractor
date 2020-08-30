var ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
var z = new ZeedhiAPIConstructor(browser, protractor);
var h = require('../../../../../page-objects/helper.po.js');
var j = require('../../../../../json/leitorJson.po.js');

var moment = require('moment');

var manutencaoConta = function () {
    
    var self = this;
    var today = moment().format('DD/MM/YYYY');
    
    this.contaManutencao = function () {
        z.field.fieldFunctions.click('NMRAZSOCCLIE');
        z.externalComponent.selectAutocomplete.waitDropdown('NMRAZSOCCLIE');
        z.externalComponent.selectAutocomplete.selectOption('NMRAZSOCCLIE', '00001 | CLIENTE PADRÃO');
        /*
        z.widget.grid.click('NMRAZSOCCLIE', j.getValor('cliente'), '0'); usar quando tirar o autocomplete da tela
        */
        
        z.field.fieldFunctions.click('NMCONSUMIDOR');
        z.externalComponent.selectAutocomplete.waitDropdown('NMCONSUMIDOR');
        z.externalComponent.selectAutocomplete.selectOption('NMCONSUMIDOR', '011 | Teste');
        /*
        z.widget.grid.click('NMCONSUMIDOR', j.getValor('nomeConsumidor'), '0'); usar quando tirar o autocomplete da tela
        */
        
        z.field.fieldFunctions.click('DTMOVCLI');
        z.field.calendar.clickDate(today, 'pt_br');
        z.component.footer.clickRightActionByLabel('Filtro');
        z.component.footer.clickCenterActionByLabel('Adicionar');
        z.field.selectNative.click('IDTIPMOCVLI', 'Crédito');
        z.field.fieldFunctions.fill('VRMOVCLI', '2000');
        z.component.footer.clickRightActionByLabel('Salvar');
        z.component.footer.clickCenterActionByLabel('Adicionar');
        z.field.selectNative.click('IDTIPMOCVLI', 'Débito');
        z.field.fieldFunctions.fill('VRMOVCLI', '2000');
        z.component.footer.clickRightActionByLabel('Salvar');
        return h.notificacao();
    };
};
module.exports = new manutencaoConta();