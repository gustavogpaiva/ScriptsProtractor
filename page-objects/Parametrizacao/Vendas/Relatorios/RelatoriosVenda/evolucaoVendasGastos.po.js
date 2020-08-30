const ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
const z  = new ZeedhiAPIConstructor(browser, protractor);
const j  = require('../../../../../json/leitorJson.po.js');
const h  = require('../../../../../page-objects/helper.po.js');

class evolucaoVendasGastos {

    /**
     * Seleciona uma unidade no filtro.
     * 
     * @example 
     *   selecionarUnidade('TEKNISA CURITIBA');
     * 
     * @param {String} unidade - Nome da unidade a ser selecionada.    
     */
    selecionarUnidade(unidade) {
        let fieldName = 'NMFILIAL';
        let columnName = 'NMFILIAL';

        z.field.select.clickOnSelectGrid(fieldName, columnName, unidade); 
    };

    selecionarData(value) {
        h.selecionarMesAno('DATAINI', value, 'numeros');
    };

    emitirRelatorio() {
        z.component.footer.clickRightActionByLabel('Gerar Relatório');
    };

};
module.exports = new evolucaoVendasGastos();