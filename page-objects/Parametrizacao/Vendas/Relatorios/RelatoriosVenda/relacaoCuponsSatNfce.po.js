const ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
const z  = new ZeedhiAPIConstructor(browser, protractor);
const j  = require('../../../../../json/leitorJson.po.js');
const h  = require('../../../../../page-objects/helper.po.js');

class relacaoCupons {

    abrirFiltro() {
        z.component.floatingControl.open();
        z.component.floatingControl.selectAction('search');
        z.component.floatingControl.selectAction('filter');
    };    
    /**
     * Apaga os dados nos campos do filtro.
     */
    limparFiltro() {
        z.component.footer.clickCenterActionByIcon('close-x');
    };

    /**
     * Seleciona uma ou mais unidades no filtro.
     * 
     * @example 
     *   selecionarUnidade('TEKNISA SÃO PAULO', 'ALIVITA REFEICOES COLETIVAS'); 
     *   selecionarUnidade('TEKNISA CURITIBA');
     * 
     * @param {String} unidade - Nome das unidades a serem selecionadas.    
     */
    selecionarUnidade(...unidade) {
        let fieldName = 'CDFILIAL';
        let columnName = 'NMFILIAL';

        z.field.selectMultiple.click(fieldName, columnName, unidade); 
    };

    /**
     * Seleciona um ou mais caixas no filtro.
     * 
     * @example 
     *   selecionarCaixa('CAIXA RÁPIDO', 'CAIXA NFCE'); 
     *   selecionarCaixa('CAIXA 009');
     * 
     * @param {String} caixa - Nome dos caixas a serem selecionados.    
     */
    selecionarCaixa(...caixa) {
        let fieldName = 'CDFILICAIXA';
        let columnName = 'NMCAIXA';

        z.field.selectMultiple.click(fieldName, columnName, caixa);
    };

    /**
     * Seleciona uma data de movimento no filtro.
     * 
     * @example 
     *   selecionarDataMovimento('01/01/2018 - 30/12/2018'); 
     * 
     * @param {String} periodo - Intervalo de datas a serem selecionadas.   
     */
    selecionarDataMovimento(periodo) {
        let arrayDatas = periodo.split(' - ');
        
        h.selectIntervalDate('DTVENDA', arrayDatas[0], arrayDatas[1]);
        z.component.footer.clickRightActionByLabel('OK');
    };

    /**
     * Seleciona uma ou mais situações de nota no filtro.
     * 
     * @example 
     *   selecionarSituacaoNota('Transmitida', 'Aceita'); 
     *   selecionarSituacaoNota('Uso Denegado');
     * 
     * @param {String} situacaoNota - Descrição das situações de nota a serem selecionados.    
     */
    selecionarSituacaoNota(...situacaoNota) {
        let fieldName = 'IDSTATUSNFCE';
        let columnName = 'DESCSTATUSNFCE';

        z.field.selectMultiple.click(fieldName, columnName, situacaoNota);
    };

    /**
     * Seleciona um ambiente no filtro.
     * 
     * @example 
     *   selecionarAmbiente('Homologação');
     * 
     * @param {String} ambiente - Nome do ambiente a ser selecionado.    
     */
    selecionarAmbiente(ambiente) {
        z.field.selectNative.click('IDTPAMBNFCE', ambiente);
    };

    /**
     * Seleciona um ou mais modo de operação da nota no filtro.
     * 
     * @example 
     *   selecionarModoOperacaoNota('Emissão Normal', 'Emissão Contigência Offline'); 
     *   selecionarModoOperacaoNota('Emissão Normal');
     * 
     * @param {String} modoOperacaoNota - Descrição dos modo de operação da nota a serem selecionados.    
     */
    selecionarModoOperacaoNota(...modoOperacaoNota) {
        let fieldName = 'IDMODOPERACNFCE';
        let columnName = 'DESCSMODOPERANFCE';

        z.field.selectMultiple.click(fieldName, columnName, modoOperacaoNota);
    };

    /**
     * Seleciona uma ou mais situações de venda no filtro.
     * 
     * @example 
     *   selecionarSituacaoVenda('Venda Concluída', 'Venda Cancelada'); 
     *   selecionarSituacaoVenda('Venda Concluída');
     * 
     * @param {String} situacaoVenda - Descrição das situações de venda a serem selecionados.    
     */
    selecionarSituacaoVenda(...situacaoVenda) {
        let fieldName = 'IDSITUVENDA';
        let columnName = 'DESCSITVENDA';

        z.field.selectMultiple.click(fieldName, columnName, situacaoVenda);
    };

    /**
     * Seleciona uma ou mais situações de venda no filtro.
     * 
     * @example 
     *   selecionarSituacaoVenda('Venda Concluída', 'Venda Cancelada'); 
     *   selecionarSituacaoVenda('Venda Concluída');
     * 
     * @param {String} situacaoVenda - Descrição das situações de venda a serem selecionados.    
     */
    selecionarSituacaoVenda(...situacaoVenda) {
        let fieldName = 'IDSITUVENDA';
        let columnName = 'DESCSITVENDA';

        z.field.selectMultiple.click(fieldName, columnName, situacaoVenda);
    };

    emitirRelatorio() {
        z.component.footer.clickRightActionByLabel('Filtrar');
    };

    async gridPossuiRegistros() {
        //verifica se o grid está sem registros ou se foi preenchido com informações
        browser.sleep(5000);
        return (!await h.gridSemRegistros(await h.getIdGrid()));
    };
     
    gerarRelatorioPDF(){
        let reportURL;
        let screenURL;
        
        //gera o pdf se houver registros no grid, senão retorna a mensagem de que grid está sem registros
        return this.gridPossuiRegistros().then(function(temRegistros){
            if(temRegistros){    
                screenURL = browser.getCurrentUrl();
                
                browser.ignoreSynchronization = true;

                z.externalComponent.report.openPdfReport();
                reportURL = z.externalComponent.report.getPdfReportUrl();
                z.externalComponent.report.closePdfReport();
                
                browser.ignoreSynchronization = false;
                
                return !(screenURL === reportURL);        
            }
            else
                return h.mensagemGrid();
        }); 
    };

    gerarRelatorioXLS(){
        z.externalComponent.report.generateXLSReport();
        return z.externalComponent.report.isXlsReportSuccessfull();     
    };

    gerarRelatorioCSV(){
        h.generateCSVReport();
        return h.isCsvReportSuccessfull();
    };
};
module.exports = new relacaoCupons();