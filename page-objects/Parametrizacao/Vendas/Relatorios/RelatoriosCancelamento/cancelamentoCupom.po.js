const ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
const z = new ZeedhiAPIConstructor(browser, protractor);
const j = require('../../../../../json/leitorJson.po.js');
const h = require('../../../../../page-objects/helper.po.js');

class cancelamentoCupom {

    limparFiltro() {
        //apagar os dados nos campos do formulário
        z.component.footer.clickCenterActionByIcon('close-x');
    };

    selecionarUnidade(...unidade) {
        // Seleciona uma unidade no filtro
        let fieldName   = 'CDFILIAL';
        let columnName  = 'NMFILIAL';

        z.field.selectMultiple.click(fieldName, columnName, unidade); 
    };

    selecionarCaixa(...caixa) {
        let fieldName   = 'CDFILICAIXA';
        let columnName  = 'NMCAIXA';
        
        arguments.length != 0 ? z.field.selectMultiple.click(fieldName, columnName, caixa):
                                this.todosCaixas(fieldName);
    };

    selecionarPeríodo(periodo) {
        // Seleciona um período no filtro
        let arrayDatas = periodo.split(' - ');
        h.selectIntervalDate('DTENTRVENDA', arrayDatas[0], arrayDatas[1]);
        z.component.footer.clickRightActionByLabel('OK');
    };

    emitirRelatorio() {
        z.component.footer.clickRightActionByLabel('Filtrar');
    };

    async gridPossuiRegistros() {
        //verifica se o grid está sem registros ou se foi preenchido com informações
        browser.sleep(5000);
        return (!await h.gridSemRegistros(await h.getIdGrid()));
    };

    todosCaixas(fieldName) {
        z.field.fieldFunctions.click(fieldName);
        z.widget.grid.checkAllRows('9999');
        z.component.footer.clickRightActionByLabel('Ok');
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
        z.externalComponent.report.openReportAction();
        z.util.clickElement(by.css('.zh-report-csv > .zh-report-text'));
        return z.component.alert.isVisible().then(function(isAlertVisible){
            return z.component.notification.count("error").then(function(errorCount){
                return browser.driver.getAllWindowHandles().then(function(tabs){
                    return !isAlertVisible && errorCount === 0 && tabs.length === 1;
                });
            });
        });
    };
};

module.exports = new cancelamentoCupom();