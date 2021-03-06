const ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
const z  = new ZeedhiAPIConstructor(browser, protractor);
const j  = require('../../../../../json/leitorJson.po.js');
const h  = require('../../../../../page-objects/helper.po.js');

class produtividadeVendedor {
    
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

        return h.selectMultipleBasicTests(fieldName).then((response) => {
            return response === true ? (() => {
                z.field.selectMultiple.click(fieldName, columnName, unidade);
                return true;
            })(): response;
        });   
    };
    
    /**
     * Seleciona um ou mais Lojas no filtro.
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
       
        return h.selectMultipleBasicTests(fieldName).then((response) => {
            return response === true ? (() => {
                z.field.selectMultiple.click(fieldName, columnName, loja);
                return true;
            })(): response;
        }); 
    };

    /**
     * Seleciona um período no filtro.
     * 
     * @example 
     *   selecionarPeriodo('01/01/2018 - 30/12/2018'); 
     * 
     * @param {String} periodo - Intervalo de datas a serem selecionadas.   
     */
    selecionarPeríodo(periodo) {
        let arrayDatas = periodo.split(' - ');

        h.selectIntervalDate('DTMOVTURCAIX', arrayDatas[0], arrayDatas[1]);
        z.component.footer.clickRightActionByLabel('OK');
        
        return true;
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
        z.field.selectNative.click('TIPORELATORIO', tipoRel);
        return true;
    };

    selecionarAberturaCaixa(...data) {
        // Seleciona uma data de abertura de caixa no filtro
        let fieldName = 'DTABERCAIX';
        let columnName = 'DTABER';

        return h.selectMultipleBasicTests(fieldName).then((response) => {
            return response === true ? (() => {
                z.field.selectMultiple.click(fieldName, columnName, data);
                return true;
            })(): response;
        }); 
    };

    selecionarVendedor(...vendedor) {
        //Seleciona um vendedor no filtro
        let fieldName = 'CDVENDEDOR';
        let columnName = 'NMRAZSOCVEN';

        return h.selectMultipleBasicTests(fieldName).then((response) => {
            return response === true ? (() => {
                z.field.selectMultiple.click(fieldName, columnName, vendedor);
                return true;
            })(): response;
        });
    };

    selecionarNivProdSuperior(produto) {
        // Seleciona uma data de abertura de caixa no filtro
        let fieldName = 'CDPRODUTOAVO';
        let columnName = 'NMPRODUTOAVOSELECIONADO';

        z.field.fieldFunctions.click(fieldName);
        browser.sleep(3000);
        $('#popup > span > section > section > section > section > div > div:nth-child(2) > div > div.control-menu > ul > li.float-action.expandable.fix-position-bottom.opened > div > div > div > div.floating-card-input > input').sendKeys(produto);
        browser.sleep(3000);
        z.widget.grid.clickColumn('9999',0,0);
        z.component.footer.clickRightActionByLabel('Ok');
        //z.field.selectMultiple.click(fieldName, columnName,  Array.of(produto));
        return true;
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
        return true;
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

    gerarRelatorioCSV() {
        h.generateCSVReport();
        return h.isCsvReportSuccessfull();
    };

};

module.exports = new produtividadeVendedor();