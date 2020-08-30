const ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
const z  = new ZeedhiAPIConstructor(browser, protractor);
const j  = require('../../../../../json/leitorJson.po.js');
const h  = require('../../../../../page-objects/helper.po.js');

class vendasNivelProd {

    /**
     * Abre o filtro da tela caso esteja fechado
     */
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
        let fieldName = 'CDCAIXA';
        let columnName = 'NMCAIXA';

        z.field.selectMultiple.click(fieldName, columnName, caixa);
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
        
        h.selectIntervalDate('DTMOVIMENTO', arrayDatas[0], arrayDatas[1]);
        z.component.footer.clickRightActionByLabel('OK');
    };

    /**
     * Seleciona um ou mais clientes no filtro.
     * 
     * @example 
     *   selecionarCliente('CLIENTE PADRAO', 'CLIENTE TEKNISA'); 
     *   selecionarCliente('CLIENTE PADRAO');
     * 
     * @param {String} cliente - Nome dos clientes a serem selecionados.    
     */
    selecionarCliente(...cliente) {
        let fieldName = 'CDCLIENTE';
        let columnName = 'NMRAZSOCCLIE';

        z.field.selectMultiple.click(fieldName, columnName, cliente);
    };

    /**
     * Seleciona um ou mais consumidores no filtro.
     * 
     * @example 
     *   selecionarConsumidor('IRENE SAVIATTO', 'ANDREIA WINTER'); 
     *   selecionarConsumidor('ABDIN MILTON PINTO');
     * 
     * @param {String} consumidor - Nome dos consumidores a serem selecionados.    
     */
    selecionarConsumidor(...consumidor) {
        let fieldName = 'CDCONSUMIDOR';
        let columnName = 'NMCONSUMIDOR';

        z.field.selectMultiple.click(fieldName, columnName, consumidor);
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
        browser.sleep(5000);
        $('#popup > span > section > section > section > section > div > div:nth-child(2) > div > div.control-menu > ul > li.float-action.expandable.fix-position-bottom.opened > div > div > div > div.floating-card-input > input').sendKeys(produto);
        browser.sleep(5000);
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
        browser.sleep(5000);
         $('#popup > span > section > section > section > section > div > div:nth-child(2) > div > div.control-menu > ul > li.float-action.expandable.fix-position-bottom.opened > div > div > div > div.floating-card-input > input').sendKeys(produto);
        browser.sleep(5000);
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
    
    /**
     * Seleciona um nivel de produto no filtro.
     * 
     * @example 
     *   selecionarNivelProduto('1');
     * 
     * @param {String} nivel - Número do nivel do produto a ser selecionado.    
     */
    selecionarNivelProduto(nivel) {
        z.field.selectNative.click('CDNVPRODUTO', nivel);
    };

    /**
     * Seleciona um tipo de relatório no filtro.
     * 
     * @example 
     *   selecionarTipoRelatorio('Sintético');
     * 
     * @param {String} tipoRel - Nome do nivel do tipo de relatório a ser selecionado.    
     */
    selecionarTipoRelatorio(tipoRel) {
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
module.exports = new vendasNivelProd();