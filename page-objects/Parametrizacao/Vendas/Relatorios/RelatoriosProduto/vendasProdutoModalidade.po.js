const ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
const z  = new ZeedhiAPIConstructor(browser, protractor);
const j  = require('../../../../../json/leitorJson.po.js');
const h  = require('../../../../../page-objects/helper.po.js');

class produtosModalidade {

    abrirFiltro() {
        z.component.floatingControl.open();
        z.component.floatingControl.selectAction('search');
        z.component.floatingControl.selectAction('filter');
    };

    limparFiltro() {
        //apagar os dados nos campos do formulário
        z.component.footer.clickCenterActionByIcon('close-x');
    };

    selecionarUnidade(...unidade) {
        // Seleciona uma ou mais unidades no filtro
        let fieldName = 'CDFILIAL';
        let columnName = 'NMFILIAL';

        z.field.selectMultiple.click(fieldName, columnName, unidade); 
    };

    selecionarLoja(...loja) {
        // Seleciona uma ou mais lojas no filtro
        let fieldName = 'CDLOJA';
        let columnName = 'NMLOJA';

        z.field.selectMultiple.click(fieldName, columnName, loja);
    };

    selecionarPeríodo(periodo) {
        // Seleciona um período no filtro
        let arrayDatas = periodo.split(' - ');
        h.selectIntervalDate('DTENTRVENDA', arrayDatas[0], arrayDatas[1]);
        z.component.footer.clickRightActionByLabel('OK');
    };

    selecionarDia(...dia) {
        // Seleciona um ou mais dias da semana no filtro
        let fieldName = 'DAYSOFWEEK';
        let columnName = 'DIA';

        z.field.selectMultiple.click(fieldName, columnName, dia);
    };

    selecionarHorarioIni(hora){
        // Seleciona um horário inicial no filtro
        z.field.fieldFunctions.fill('TIMEINI', hora);
    };

    selecionarHorarioFin(hora){
        // Seleciona um horário final no filtro
        let field = element(by.id('TIMEFIM'));
        field.sendKeys(hora[3]);
        browser.sleep(1000);
        field.sendKeys(hora[0]);
        browser.sleep(1000);
        field.sendKeys(hora[1]);
        browser.sleep(1000);
        field.sendKeys(hora[2]);
        //z.field.fieldFunctions.fill('TIMEFIM', hora);
    };

    selecionarProdutoIni(produto) {
        z.field.fieldFunctions.click('NMPRODUTOI');
        browser.sleep(3000);
        //z.util.pressKey(produto);
         $('#popup > span > section > section > section > section > div > div:nth-child(2) > div > div.control-menu > ul > li.float-action.expandable.fix-position-bottom.opened > div > div > div > div.floating-card-input > input').sendKeys(produto);
        browser.sleep(3000);
        z.widget.grid.clickColumn('9009',0,0);
    };

    selecionarProdutoFin(produto) {
        z.field.fieldFunctions.click('NMPRODUTOF');
        browser.sleep(3000);
        //z.util.pressKey(produto);
         $('#popup > span > section > section > section > section > div > div:nth-child(2) > div > div.control-menu > ul > li.float-action.expandable.fix-position-bottom.opened > div > div > div > div.floating-card-input > input').sendKeys(produto);
        browser.sleep(3000);
        z.widget.grid.clickColumn('9009',0,0);
    };
    
    async selecionarProduto(...produto) {
        let fieldName  = 'CDARVPROD';
        let columnName = 'NMPRODUTO';
        
        z.field.fieldFunctions.click(fieldName);
        
        browser.sleep(5000);
        //obtem o id do grid do filtro
        let idGrid = await h.getIdGrid();
        for (var i in produto) {
            //verifica se o widget de pesquisa está aberto
            if(await z.component.floatingControl.isOpened()){
                //se foi feita uma pesquisa apaga o valor digitado no campo
                if(await z.util.elementExists(by.css('span.clear-button.zh-icon.zh-icon-close-x.zh-icon-no-border.zh-icon-color-white.searching'))){
                    $('span.clear-button.zh-icon.zh-icon-close-x.zh-icon-no-border.zh-icon-color-white.searching').click();
                }
                //clica novamente no campo de pesquisa para ser preenchido
                $('#popup > span > section > section > section > section > div > div:nth-child(2) > div > div.control-menu > ul > li.float-action.expandable.fix-position-bottom.opened > div > div > div > div.floating-card-input > input').click();
            }
            else{
                z.component.floatingControl.toggle();
                z.component.floatingControl.selectAction('search');
            }
            browser.sleep(5000);
            //preenche o campo de pesquisa com os nomes dos produtos presentes no array de produto
            $('#popup > span > section > section > section > section > div > div:nth-child(2) > div > div.control-menu > ul > li.float-action.expandable.fix-position-bottom.opened > div > div > div > div.floating-card-input > input').sendKeys(produto[i]);    
            
            browser.sleep(5000);
            //verifica se o produto existe no grid e seleciona
            if(await z.widget.grid.rowExists(columnName, produto[i], idGrid)){  
                z.widget.grid.checkRowByValue(columnName, produto[i], idGrid);
            }
        }
        z.component.footer.clickRightActionByLabel('Ok');
    };
    
    selecionarModalidade(...modalidade) {
        // Seleciona uma ou mais modalidades no filtro
        let fieldName = 'MODALIDADE';
        let columnName = 'NMMODALIDADE';

        z.field.selectMultiple.click(fieldName, columnName, modalidade);
    };

    selecionarTipoRelatorio(tipoRel) {
        // Seleciona um tipo de relatório no filtro
        z.field.selectNative.click('TIPORELATORIO', tipoRel);
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

                //z.externalComponent.report.openPdfReport();
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
module.exports = new produtosModalidade();