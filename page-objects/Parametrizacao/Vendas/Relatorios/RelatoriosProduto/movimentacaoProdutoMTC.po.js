const ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
const z = new ZeedhiAPIConstructor(browser, protractor);
const h = require('../../../../../page-objects/helper.po.js');

class movimentacaoProdutoMTC {
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
     *   selecionarUnidade('TEKNISA CURITIBA');
     * 
     * @param {String} unidade - Nome das unidades a serem selecionadas.    
     */
    selecionarUnidade(unidade) {
        let fieldName = 'NMFILIAL';
        let columnName = 'NMFILIAL';

        z.field.fieldFunctions.click(fieldName); 
        h.getIdGrid().then(function(idGrid){
        	z.widget.grid.click(columnName, unidade, idGrid);	
        });
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
        
        h.selectIntervalDate('DTHRPEDIDO', arrayDatas[0], arrayDatas[1]);
        z.component.footer.clickRightActionByLabel('OK');
    };
    /**
     * Seleciona um nivel de agrupador no filtro.
     * 
     * @example 
     *   selecionarNivelAgrupador('1');
     * 
     * @param {String} nivel - Número do nivel do agrupador a ser selecionado.    
     */
    selecionarNivelAgrupador(nivel) {
        z.field.selectNative.click('CDNVPRODUTOAGRUP', nivel);
    }; 
    /**
     * Seleciona um tipo de seleção no filtro.
     * 
     * @example 
     *   selecionarTipoSelecao('Lista');
     * 
     * @param {String} tipoSelec - Descrição do tipo de seleção de produtos a ser selecionado.    
     */
    selecionarTipoSelecao(tipoSelec) {
        z.field.selectNative.click('INTERVALISTA', tipoSelec);
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
        z.field.fieldFunctions.click('PRODINI');
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

    /**
     * Seleciona um nivel de produto no filtro.
     * 
     * @example 
     *   selecionarNivelProduto('1');
     * 
     * @param {String} nivel - Número do nivel do produto a ser selecionado.    
     */
    selecionarNivelProduto(nivel) {
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
	async verificarProdutos(){
		//obtem o total de linhas exibidas no grid
		let idGrid = await h.getIdGrid();
		let totalLinhas = await z.widget.grid.getNrRowsFromGroupedGrid(idGrid);
		//percorre as primeiras linhas do grid comparando verificando se os nomes dos produtos estão repetidos
		for(let i = 0; i < totalLinhas; i++){
			for(let j = i+1; j < totalLinhas; j++){
				let produto1 = (await z.widget.grid.getText(idGrid, i, 1));
				let produto2 = (await z.widget.grid.getText(idGrid, j, 1));
				//caso retornar vazio pode ser um agrupador de nivel ou uma linha total, não será comparada
				if(produto1 != '' && produto2 != ''){
				    //se encontrar um elemento repetido no grid retorna false para o spec
					if(produto1.indexOf(produto2) >= 0)
						return false;
				}
			}
		}
		//caso não exista produtos repetidos no grid retorna true para o spec
		return true;
	}

	async verificarRank(){
		//obtem o total de linhas exibidas no grid
		let idGrid = await h.getIdGrid();
		let totalLinhas = await z.widget.grid.getNrRowsFromGroupedGrid(idGrid);
		//percorre as primeiras linhas do grid comparando se os produtos estão classificados pelo valor total
		for(let i = 0; i < totalLinhas; i++){
			for(let j = i+1; j < totalLinhas; j++){
				let produtoMaior = parseFloat(await z.widget.grid.getText(idGrid, i, 5));
				let produtoMenor = parseFloat(await z.widget.grid.getText(idGrid, j, 5));
				//caso retornar vazio pode ser um agrupador de nivel ou uma linha total, não será comparada
				if(produtoMaior != '' && produtoMenor != ''){
					//verifica se o produto maior tem valor total maior que o produto menor
					if(produtoMaior < produtoMenor)
						return false;
				}
			}
		}
		//caso o rank esteja classificado corretamento retorna true para o spec
		return true;
	};

	async verificarValorUnitMedio(){
		//obtem o total de linhas exibidas no grid
		let idGrid = await h.getIdGrid();
		let totalLinhas = await z.widget.grid.getNrRowsFromGroupedGrid(idGrid);
		//
		for(let i = 0; i < totalLinhas; i++){
			let qtdProduto = parseFloat(await z.widget.grid.getText(idGrid, i, 3));
			let vrUnitMedio = parseFloat(await z.widget.grid.getText(idGrid, i, 4));
			let vrTotal = parseFloat(await z.widget.grid.getText(idGrid, i, 5));
			//se o valor unitario com a quantida de produto for maior ao valor total e o valor medio for 0 ou vazio
			//retorna false para o spec
			if((qtdProduto * vrUnitMedio) > vrTotal && (vrUnitMedio == 0 || vrUnitMedio == ''))
				return false;
		}	
		//caso os valores unitários estejam sendo exibidos retorna true para o spec
		return true;
	};          
};

module.exports = new movimentacaoProdutoMTC();