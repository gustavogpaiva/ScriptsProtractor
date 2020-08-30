const ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
const z = new ZeedhiAPIConstructor(browser, protractor);
const h  = require('../../../../../page-objects/helper.po.js');

class relfechamentoCaixa {
        
    selecionarUnidade(...unidade) {
        let fieldName = 'CDFILIAL';
        let columnName = 'NMFILIAL';
        $('#CDFILIAL > div > span > span').click();
        z.field.selectMultiple.click(fieldName, columnName, unidade);
    };
    
    selecionarLoja(...loja) {
        let fieldName = 'CDLOJA';
        let columnName = 'NMLOJA';
       
        z.field.selectMultiple.click(fieldName, columnName, loja);
    };  

    selecionarCaixa(...caixa) {
        let fieldName = 'CDCAIXA';
        let columnName = 'NMCAIXA';

        z.field.selectMultiple.click(fieldName, columnName, caixa);
    };    
    
    selecionarPeriodo(periodo) {
        let arrayDatas = periodo.split(' - ');

        h.selectIntervalDate('DTENTRVENDA', arrayDatas[0], arrayDatas[1]);
        z.component.footer.clickRightActionByLabel('OK');
    };        

    selecionarTipoRelatorio(tipoRelatorio = 'Controle') {
        z.field.selectNative.click('TIPORELATORIO', tipoRelatorio);
    };

    emitirRelatorio() {
        z.component.footer.clickRightActionByLabel('Gerar Relatório');
        return h.relBirtTest();
    };      
};

module.exports = new relfechamentoCaixa();