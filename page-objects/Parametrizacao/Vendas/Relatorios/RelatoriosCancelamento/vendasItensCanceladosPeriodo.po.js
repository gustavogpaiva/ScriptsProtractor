const ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
const z  = new ZeedhiAPIConstructor(browser, protractor);
const j  = require('../../../../../json/leitorJson.po.js');
const h  = require('../../../../../page-objects/helper.po.js');

class itensCancelados {

    async emitirRelatorio() {
        let arrayDatas = j.getValor('periodoComVenda').split(' - ');

        //$('#CDFILIAL > div > span > span').click();
        //seleciona unidade no filtro
        h.selectMultipleClick('CDFILIAL', 'NMFILIAL', [j.getValor('filial')]);
        //Seleciona uma loja no filtro
        h.selectMultipleClick('NMLOJA_V', 'NMLOJA', [j.getValor('nomeAlteracaoCadLoja')]);
        //Seleciona um caixa no filtro
        h.selectMultipleClick('CDCAIXA', 'NMCAIXA', [j.getValor('nmcaixa')]);
        //Seleciona um caixa no filtro
        h.selectMultipleClick('CDCLIENTE', 'NMRAZSOCCLIE', [j.getValor('cliente')]);
   
        h.selectIntervalDate('DTENTRVENDA', arrayDatas[0], arrayDatas[1]);
        z.component.footer.clickRightActionByLabel('OK');

        z.component.footer.clickRightActionByLabel('Gerar Relatório');
        return await h.relBirtTest(); 
    };
};
module.exports = new itensCancelados();