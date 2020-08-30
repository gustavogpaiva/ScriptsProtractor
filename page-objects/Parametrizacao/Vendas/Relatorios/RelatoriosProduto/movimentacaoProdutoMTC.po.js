var ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
var z = new ZeedhiAPIConstructor(browser, protractor);
var h = require('../../../../../page-objects/helper.po.js');

var movimentacaoProdutoMTC = function(){
	self = this;

	this.emiteRelatorio = async function(periodo, nivelAgrupador, selecaoDeProdutos, nivelProdutos, produtoInicial, produtoFinal){
		//array com as datas inicial e final
		var arrayDatas = periodo.split(' - ');
		//verifica se o filtro foi aberto e informa o período e a unidade
		if(await z.component.popup.isOpened()){
			//seleciona a unidade no grid e clica na opção filtrar para exibir relatório
			h.filtroUnidade();
			//seleciona o intervalo de datas que não tem vendas e clica em ok
			//arrayDatas[0] = data inicial, arrayDatas[1] = data final
			h.selectIntervalDate('DTHRPEDIDO', arrayDatas[0], arrayDatas[1]);
			z.component.footer.clickRightActionByLabel('OK');
			//escolhe o nivel de agrupamento dos produtos no relatório
			h.selectNative('CDNVPRODUTOAGRUP', nivelAgrupador);
			//seleciona a seleção de produtos, nível, intervalo, lista
			h.selectNative('INTERVALISTA', selecaoDeProdutos);
			//se a seleção de produtos for para nível, informe  o número do do nível dos produtos
			if(selecaoDeProdutos == 'Nível'){
				z.field.fieldFunctions.fill('PRODNIV', nivelProdutos);
			}
			//se a seleção de produtos for por Intervalo informa o produto inicial e final
			else if(selecaoDeProdutos == 'Intervalo'){
				//seleciona o produto inicial do intervalo
				z.field.fieldfunctions.click('PRODINI');
				z.util.pressKey(produtoInicial);
				//seleciona o produto final do intervalo
				z.field.fieldfunctions.click('PRODFIN');
				z.util.pressKey(produtoFinal);
			}
			//se a seleção for por lista, seleciona no filtro os produtos a ser exibidos no relatório
			else if(selecaoDeProdutos == 'Lista'){
				z.field.fieldfunctions.click('CDPRODUTO');
				z.util.pressKey(produtoInicial);
				z.widget.grid.click('NMPRODUTO', produtoInicial, await h.getIdGrid);
				z.component.floatingControl.toggle();
				z.component.floatingControl.selectAction('search');
				z.util.pressKey(produtoFinal);
				z.component.footer.clickLeftActionByLabel('Ok');
			}
				
			z.component.footer.clickRightActionByLabel('Filtrar');

			browser.sleep(5000);
			//se o grid não está vazio retorna true para o spec
			if(!(await h.gridSemRegistros(await h.getIdGrid())) ){
				return true;
			}
			//se o grid estiver vazio devolve para o spec a mensagem exibida no grid
			else{
				return await z.widget.grid.getText(idGrid, 0, 0); 
			}
		}
	};

	this.verificarProdutos = async function(){
		//obtem o total de linhas exibidas no grid
		var idGrid = await h.getIdGrid();
		var totalLinhas = await z.widget.grid.getNrRowsFromGroupedGrid(idGrid);
		//percorre as primeiras linhas do grid comparando verificando se os nomes dos produtos estão repetidos
		for(var i = 0; i < totalLinhas; i++){
			for(var j = i+1; j < totalLinhas; j++){
				var produto1 = (await z.widget.grid.getText(idGrid, i, 1));
				var produto2 = (await z.widget.grid.getText(idGrid, j, 1));
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
	};

	this.verificarRank = async function(){
		//obtem o total de linhas exibidas no grid
		var idGrid = await h.getIdGrid();
		var totalLinhas = await z.widget.grid.getNrRowsFromGroupedGrid(idGrid);
		//percorre as primeiras linhas do grid comparando se os produtos estão classificados pelo valor total
		for(var i = 0; i < totalLinhas; i++){
			for(var j = i+1; j < totalLinhas; j++){
				var produtoMaior = parseFloat(await z.widget.grid.getText(idGrid, i, 5));
				var produtoMenor = parseFloat(await z.widget.grid.getText(idGrid, j, 5));
				//caso retornar vazio pode ser um agrupador de nivel ou uma linha total, não será comparada
				if(produtoMaior != '' && produtoMenor != ''){
					//verifica se o produto maior tem valor total maior que o produto menor
					if(produtoMaior < produtoMenor)
						return false;
				}
			}
		}
		//caso o rank esteja classicado corretamento retorna true para o spec
		return true;
	};

	this.verificarValorUnitMedio = async function(){
		//obtem o total de linhas exibidas no grid
		var idGrid = await h.getIdGrid();
		var totalLinhas = await z.widget.grid.getNrRowsFromGroupedGrid(idGrid);
		//
		for(var i = 0; i < totalLinhas; i++){
			var qtdProduto = parseFloat(await z.widget.grid.getText(idGrid, i, 3));
			var vrUnitMedio = parseFloat(await z.widget.grid.getText(idGrid, i, 4));
			var vrTotal = parseFloat(await z.widget.grid.getText(idGrid, i, 5));
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