var ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
var z = new ZeedhiAPIConstructor(browser, protractor);
var j = require('../../../../../json/leitorJson.po.js');


var compProdIndexada = function () {

    var self = this;

    this.composicaoNivel = function () {
        z.field.selectNative.click('CDCOMPOSICAO', 'Padrão');
        z.field.fieldFunctions.click('NMFILIAL');
        z.widget.grid.click('NMFILIAL', j.getValor('filial'), '0');
        z.field.fieldFunctions.click('NMLOJA');
        z.widget.grid.click('NMLOJA', j.getValor('loja'), '0');
        z.field.fieldFunctions.click('NMTIPOCUSTO');
        z.widget.grid.click('NMTIPOCUSTO', 'Custo Médio Líquido Atual', '0');
        z.field.fieldFunctions.click('PRODINI');
        z.widget.grid.click('NMPRODUTO', j.getValor('produto2'), '0');
        z.component.footer.clickRightActionByLabel('Filtro');
        browser.sleep(7000);
    };
};
module.exports = new compProdIndexada();