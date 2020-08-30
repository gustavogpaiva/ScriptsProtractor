const ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
const z = new ZeedhiAPIConstructor(browser, protractor);
const h = require('../../../../../page-objects/helper.po.js');

class MapResuECF {

    selecionarUnidade(...unidade) {
        let fieldName = 'CDFILIAL';
        let columnName = 'NMFILIAL';
        $('#CDFILIAL > div > span > span').click();
        h.selectMultipleClick(fieldName, columnName, unidade);
    };
    
    selecionarLoja(...loja) {
        let fieldName = 'CDLOJA';
        let columnName = 'NMLOJA';
       
        h.selectMultipleClick(fieldName, columnName, loja);
    };  

    selecionarCaixa(...caixa) {
        let fieldName = 'CDCAIXA';
        let columnName = 'NMCAIXA';

        h.selectMultipleClick(fieldName, columnName, caixa);
    };    
    
    selecionarPeriodo(periodo) {
        let arrayDatas = periodo.split(' - ');

        h.selectIntervalDate('DTENTRVENDA', arrayDatas[0], arrayDatas[1]);
        z.component.footer.clickRightActionByLabel('OK');
    };        

    selecionarTipoRelatorio(tipoRelatorio = 'São Paulo') {
        z.field.selectNative.click('TIPORELATORIO', tipoRelatorio);
    };

    selecionarRegiao(...regiao) {
        let fieldName = 'CDREGIAO';
        let columnName = 'NMREGIAO';

        h.selectMultipleClick(fieldName, columnName, regiao);   
    };

    emitirRelatorio() {
        z.component.footer.clickRightActionByLabel('Gerar Relatório');
        return h.alertaDeErro().then(function(alertaVisivel){
            if(alertaVisivel)
                return alertaVisivel;
            else
                return h.relBirtTest();
        });
    };
};
module.exports = new MapResuECF();