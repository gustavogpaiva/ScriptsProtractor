var ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
var z = new ZeedhiAPIConstructor(browser, protractor);
var h = require('../../../../page-objects/helper.po.js');
var j = require('../../../../json/leitorJson.po.js');

var cadConsumidorFidelidadeDoacao = function () {
    
    var self = this;
    
    this.cadFidelidade = function () {
        z.component.footer.clickRightActionByLabel('Filtro');
        z.widget.grid.click('DSCAMPANHA', j.getValor('campanha'), '19131011349975358653059');
        h.navegar('Cartões Disponíveis para Doação');
        z.component.footer.clickCenterActionByLabel('Adicionar');
        z.field.fieldFunctions.click('NMPRODUTO');
        z.widget.grid.click('NMPRODUTO', j.getValor('produto'), '0');//não está retornando produtos aqui
        z.field.fieldFunctions.fill('CARTAOINI', '1');
        z.field.fieldFunctions.fill('CARTAOFIM', '20');
        z.component.footer.clickRightActionByLabel('Salvar');
        h.navegar('Cartões Doados');        
       // esta suite só retornou informações utilizavéis no teste até aqui (26/09/2018)
    };   
};
module.exports = new cadConsumidorFidelidadeDoacao();