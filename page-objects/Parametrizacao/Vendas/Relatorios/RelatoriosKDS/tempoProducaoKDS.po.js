const ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
const z  = new ZeedhiAPIConstructor(browser, protractor);
const j  = require('../../../../../json/leitorJson.po.js');
const h  = require('../../../../../page-objects/helper.po.js');

class producaoKDS {

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

    selecionarProduto(produto) {
        // Seleciona uma data de abertura de caixa no filtro
        let fieldName = 'CDPRODUTO';
        let columnName = 'NMPRODUTO';

        z.field.fieldFunctions.click(fieldName);
        browser.sleep(3000);
        z.util.pressKey(produto);
        browser.sleep(3000);
        z.widget.grid.clickColumn('9999',0,0);
        z.component.footer.clickRightActionByLabel('Ok');
        //z.field.selectMultiple.click(fieldName, columnName,  Array.of(produto));
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
     * Seleciona um ou mais setores no filtro.
     * 
     * @example 
     *   selecionarSetor('EXPEDIÇÃO ODHEN', 'MONTAGEM'); 
     *   selecionarSetor('SETOR TESTE');
     * 
     * @param {String} setor - Nome dos setores a serem selecionados.    
     */
    selecionarSetor(...setor) {
        let fieldName = 'CDSETOR';
        let columnName = 'NMSETOR';

        z.field.selectMultiple.click(fieldName, columnName, setor);
    };

    /**
     * Seleciona um tipo de relatório no filtro.
     * 
     * @example 
     *   selecionarTipoRelatorio('Sintético');
     * 
     * @param {String} tipoRel - Nome do tipo de relatório a ser selecionado.    
     */
    selecionarTipoRelatorio(tipoRel) {
        z.field.selectNative.click('isAnalitico', tipoRel);
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
module.exports = new producaoKDS();