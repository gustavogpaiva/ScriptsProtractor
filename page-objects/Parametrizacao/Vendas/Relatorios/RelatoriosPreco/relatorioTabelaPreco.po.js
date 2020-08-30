const ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
const z  = new ZeedhiAPIConstructor(browser, protractor);
const j  = require('../../../../../json/leitorJson.po.js');
const h  = require('../../../../../page-objects/helper.po.js');

class relTabPreco {
    
    limparFiltro() {
        //apagar os dados nos campos do formulário
        z.component.footer.clickCenterActionByIcon('close-x');
    };

    selecionarUnidade(unidade) {
        // Seleciona uma unidade no filtro
        let fieldName = 'NMFILIAL';
        let columnName = 'NMFILIAL';

        z.field.select.clickOnSelectGrid(fieldName, columnName, unidade); 
    };

    selecionarTabelaPreco(tabPreco) {
        // Seleciona uma unidade no filtro
        let fieldName = 'NMTABEPREC';
        let columnName = 'NMTABEPREC';

        z.field.select.clickOnSelectGrid(fieldName, columnName, tabPreco); 
    };

    selecionarVigencia(vigencia) {
        // Seleciona uma unidade no filtro
        let fieldName = 'LABELDTVIGENCIA';
        let columnName = 'LABELDTVIGENCIA';

        z.field.select.clickOnSelectGrid(fieldName, columnName, vigencia); 
    };

    selecionarProdutoIni(produto) { 
        z.field.fieldFunctions.click('PRODINI');
        browser.sleep(5000);
        $('#popup > span > section > section > section > section > div > div:nth-child(2) > div > div.control-menu > ul > li.float-action.expandable.fix-position-bottom.opened > div > div > div > div.floating-card-input > input').sendKeys(produto);
        browser.sleep(5000);
        z.widget.grid.clickColumn('9009',0,0);
    };

    selecionarProdutoFin(produto) { 
        z.field.fieldFunctions.click('PRODFIN');
        browser.sleep(5000);
        $('#popup > span > section > section > section > section > div > div:nth-child(2) > div > div.control-menu > ul > li.float-action.expandable.fix-position-bottom.opened > div > div > div > div.floating-card-input > input').sendKeys(produto);
        browser.sleep(5000);
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
}

module.exports = new relTabPreco();