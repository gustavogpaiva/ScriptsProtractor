const ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
const z  = new ZeedhiAPIConstructor(browser, protractor);
const j  = require('../../../../../json/leitorJson.po.js');
const h  = require('../../../../../page-objects/helper.po.js');

class vendasImposto {

    /**
     * Apaga os dados nos campos do filtro.
     */
    limparFiltro() {
        z.component.footer.clickCenterActionByIcon('close-x');
    };

    /**
     * Seleciona um relatório no filtro.
     * 
     * @example 
     *   selecionarRelatorio('Imposto por Produto (Total Geral)');
     * 
     * @param {String} relatorio - Nome do relatório a ser selecionado.    
     */
    selecionarRelatorio(relatorio) {
        z.field.selectNative.click('IDRELATORIOFIELD', relatorio);
    };

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
        let fieldName = 'CDCAIXA';
        let columnName = 'NMCAIXA';

        z.field.selectMultiple.click(fieldName, columnName, caixa);
    };

    /**
     * Seleciona um ou mais impostos no filtro.
     * 
     * @example 
     *   selecionarImposto('Imp. Renda Retido Fonte (ENTR)', 'Isento'); 
     *   selecionarImposto('Imposto Circ. Merc. Servicos');
     * 
     * @param {String} imposto - Nome dos impostos a serem selecionados.    
     */
    selecionarImposto(...imposto) {
        let fieldName = 'CDIMPOSTO';
        let columnName = 'NMIMPOSTO';

        z.field.selectMultiple.click(fieldName, columnName, imposto);
    };

    /**
     * Seleciona um período no filtro.
     * 
     * @example 
     *   selecionarPeríodo('01/01/2018 - 30/12/2018'); 
     * 
     * @param {String} periodo - Intervalo de datas a serem selecionadas.   
     */
    selecionarPeríodo(periodo) {
        let arrayDatas = periodo.split(' - ');
        
        h.selectIntervalDate('DTENTRVENDA', arrayDatas[0], arrayDatas[1]);
        z.component.footer.clickRightActionByLabel('OK');
    };

    /**
     * Seleciona um produto inicial no filtro.
     * 
     * @example 
     *   selecionarProdutoIni('Arroz integral');
     * 
     * @param {String} produto - Nome do produto a ser selecionado.    
     */
    selecionarProdutoIni(produto) {
        z.field.fieldFunctions.click('NMPRODUTOI');
        browser.sleep(3000);
        z.util.pressKey(produto);
        browser.sleep(3000);
        z.widget.grid.clickColumn('9009',0,0);
    };

    /**
     * Seleciona um produto final no filtro.
     * 
     * @example 
     *   selecionarProdutoFin('Arroz integral');
     * 
     * @param {String} produto - Nome do produto a ser selecionado.    
     */
    selecionarProdutoFin(produto) {
        z.field.fieldFunctions.click('NMPRODUTOF');
        browser.sleep(3000);
        z.util.pressKey(produto);
        browser.sleep(3000);
        z.widget.grid.clickColumn('9009',0,0);
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

                z.externalComponent.report.openReportAction();
                z.externalComponent.report.clickGeneratePDF();
                browser.sleep(10000);
                          
                browser.driver.getAllWindowHandles().then(function(windows){
                    browser.ignoreSynchronization = true;
                    let initialWindowsQntd = windows.length;
                    if (typeof windows !== 'undefined' &&
                        windows.length > 1) {
                        browser.driver.switchTo().window(windows[1]);
                        reportURL = z.externalComponent.report.getPdfReportUrl();
                        z.externalComponent.report.closePdfReport();
                    }
                    browser.ignoreSynchronization = false;
                });
      
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
module.exports = new vendasImposto();