const ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
const z  = new ZeedhiAPIConstructor(browser, protractor);
const j  = require('../../../../../json/leitorJson.po.js');
const h  = require('../../../../../page-objects/helper.po.js');

class compProdSintetico {
    
    abrirFiltro() {
        z.component.floatingControl.open();
        z.component.floatingControl.selectAction('search');
        z.component.floatingControl.selectAction('filter');
    };
        
    limparFiltro() {
        //apagar os dados nos campos do formulário
        z.component.footer.clickCenterActionByIcon('close-x');
    };

    selecionarTipoComposicao(tipoComp) {
        // Seleciona um tipo de relatório no filtro
        z.field.selectNative.click('CDCOMPOSICAO', tipoComp);
    };

    selecionarUnidade(unidade) {
        // Seleciona uma unidade no filtro
        let fieldName = 'NMFILIAL';
        let columnName = 'NMFILIAL';

        z.field.select.clickOnSelectGrid(fieldName, columnName, unidade); 
    };

    selecionarLoja(loja) {
        // Seleciona uma unidade no filtro
        let fieldName = 'NMLOJA';
        let columnName = 'NMLOJA';

        z.field.select.clickOnSelectGrid(fieldName, columnName, loja); 
    };

    selecionarTipoCusto(tipoCusto) {
        // Seleciona uma unidade no filtro
        let fieldName = 'NMTIPOCUSTO';
        let columnName = 'NMTIPOCUSTO';

        z.field.select.clickOnSelectGrid(fieldName, columnName, tipoCusto); 
    };
    
    selecionarTipoSelecao(tipoSelec) {
        // Seleciona um tipo de relatório no filtro
        z.field.selectNative.click('INTERVALISTA', tipoSelec);
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

    async selecionarProduto(...produto) {
        let fieldName  = 'CDPRODUTO';
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

    definirNivel(nivel) {
        // preenche o campo com um nivel
        z.field.fieldFunctions.fill('PRODNIV', nivel);
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
module.exports = new compProdSintetico();