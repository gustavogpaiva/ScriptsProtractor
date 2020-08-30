const ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
const z = new ZeedhiAPIConstructor(browser, protractor);
const j = require('../../../../../json/leitorJson.po.js');
const h = require('../../../../../page-objects/helper.po.js');
const moment = require('moment');

class resumoCaixa {
       
    async emitirRelatorio(tipo) {

        const tipoRel = {
            caixaRMC        : 'Resumo da Movimentação do Caixa (RMC)',
            caixaRFC        : 'Comparativo Fechamento Caixa (RFC)',
            caixaRfcNFCSAT  : 'Comparativo Fechamento Caixa (RFC - NFC-e/SAT)',
            caixaRmcNFCESAT : 'Resumo da Movimentação do Caixa (RMC - NFCe/SAT)'
        };

        let arrayDatas = j.getValor('periodoComVenda').split(' - ');

        z.field.selectNative.click('__report_name', tipoRel[tipo]);
        // unidade
        h.selectMultipleClick('CDFILIAL', 'NMFILIAL', [j.getValor('filial')]);
        // loja
        h.selectMultipleClick('CDLOJA', 'NMLOJA', [j.getValor('nomeAlteracaoCadLoja')]);
        // Seleciona um caixa no filtro
        h.selectMultipleClick('CDCAIXA', 'NMCAIXA', [j.getValor('nmcaixa')]);
        // data
        h.selectIntervalDate('DTENTRVENDA', arrayDatas[0], arrayDatas[1]);
        z.component.footer.clickRightActionByLabel('OK');

        z.component.footer.clickRightActionByLabel('Gerar Relatório');
        return await h.relBirtTest(); 
    };
        
};
module.exports = new resumoCaixa();