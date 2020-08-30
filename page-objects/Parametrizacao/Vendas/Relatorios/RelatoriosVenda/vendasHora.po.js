const ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
const z  = new ZeedhiAPIConstructor(browser, protractor);
const j  = require('../../../../../json/leitorJson.po.js');
const h  = require('../../../../../page-objects/helper.po.js');

class vendaHora {

    /**
     * Apaga os dados nos campos do filtro.
     */
    limparFiltro() {
        z.component.footer.clickCenterActionByIcon('close-x');
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
     * Seleciona uma ou mais lojas no filtro.
     * 
     * @example 
     *   selecionarLoja('LOJA PADRE EUSTAQUIO', 'LOJA PRAÇA 7'); 
     *   selecionarLoja('LOJA NOVA LIMA');
     * 
     * @param {String} loja - Nome das lojas a serem selecionados.    
     */
    selecionarLoja(...loja) {
        let fieldName = 'CDLOJA';
        let columnName = 'NMLOJA';

        z.field.selectMultiple.click(fieldName, columnName, loja);
    };

    /**
     * Seleciona uma data no filtro.
     * 
     * @example 
     *   selecionarData('01/01/2018 - 30/12/2018'); 
     * 
     * @param {String} periodo - Intervalo de datas a serem selecionadas.   
     */
    selecionarData(periodo) {
        let arrayDatas = periodo.split(' - ');
        
        h.selectIntervalDate('DTENTRVENDA', arrayDatas[0], arrayDatas[1]);
        z.component.footer.clickRightActionByLabel('OK');
    };

    /**
     * Seleciona um horário inicial no filtro.
     * 
     * @example 
     *   selecionarHorarioIni('1200'); 
     * 
     * @param {String} hora - Horário a ser preenchido.   
     */
    selecionarHorarioIni(hora){
        let field = element(by.id('HRINI'));

        field.sendKeys(hora[3]);
        browser.sleep(1000);
        field.sendKeys(hora[0]);
        browser.sleep(1000);
        field.sendKeys(hora[1]);
        browser.sleep(1000);
        field.sendKeys(hora[2]);
        //z.field.fieldFunctions.fill('HRINI', hora);
    };

    /**
     * Seleciona um horário final no filtro.
     * 
     * @example 
     *   selecionarHorarioFin('2359'); 
     * 
     * @param {String} hora - Horário a ser preenchido.   
     */
    selecionarHorarioFin(hora){
        let field = element(by.id('HRFIN'));

        field.sendKeys(hora[3]);
        browser.sleep(1000);
        field.sendKeys(hora[0]);
        browser.sleep(1000);
        field.sendKeys(hora[1]);
        browser.sleep(1000);
        field.sendKeys(hora[2]);
        //z.field.fieldFunctions.fill('HRFIN', hora);
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

    /* vendaHora = function () {
        z.field.fieldFunctions.click('NMFILIAL');
        z.widget.grid.click('NMFILIAL', j.getValor('filial'),'0');
        z.field.fieldFunctions.click('CDLOJA');
        z.widget.grid.checkAllRows('9999');
        z.component.footer.clickRightActionByLabel('Ok');
        z.field.fieldFunctions.fill('MINUTOS', '1234');
        z.field.calendar.selectIntervalDate('DTENTRVENDA', '17/12/2017', '17/07/2018', 'pt_br');
        z.field.fieldFunctions.fill('HRINI', '1200');
        z.field.fieldFunctions.fill('HRFIN', '1800');
        z.component.footer.clickRightActionByLabel('Filtro');
        browser.sleep('3000');
    }; */
};
module.exports = new vendaHora();