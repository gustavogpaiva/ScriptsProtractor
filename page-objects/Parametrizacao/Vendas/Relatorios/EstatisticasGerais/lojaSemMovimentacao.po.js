var ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
var z = new ZeedhiAPIConstructor(browser, protractor);
var h = require('../../../../../page-objects/helper.po.js');

var lojaSemMovimentacao = function(){
	var self = this;

	this.emiteRelatorio = async function(periodo, grupo){
		//array com as datas inicial e final
		var arrayDatas = periodo.split(' - ');
		//verifica se o popup do filtro não está aberto, e clica no icone do filtro para abrí-lo
		if(!(await z.component.popup.isOpened()) ){
			z.component.floatingControl.toggle();
			z.component.floatingControl.selectAction('search');
			z.component.floatingControl.selectAction('filter');
			browser.sleep(3000);
			//limpa as informações dos campos no filtro
			z.component.footer.clickCenterActionByIcon('close-x');
		}
		//verifica se o filtro foi aberto e informa o período e a unidade
		if(await z.component.popup.isOpened()){
			//seleciona o intervalo de datas que não tem vendas e clica em ok
			//arrayDatas[0] = data inicial, arrayDatas[1] = data final
			h.selectIntervalDate('PERIODO', arrayDatas[0], arrayDatas[1]);
			z.component.footer.clickRightActionByLabel('OK');
			//caso utiliza agrupamento de filial deve selecionar no filtro o grupo
			if(grupo != ''){
				z.field.fieldFunctions.click('CDGRUPFILI');
				z.widget.grid.click('NMGRUPFILI', grupo, await h.getIdGrid());
				z.component.footer.clickRightActionByLabel('Ok');
			}
			//seleciona a unidade no grid e clica na opção filtrar para exibir relatório
			h.filtroUnidade();
			browser.sleep(5000);
			z.component.footer.clickRightActionByLabel('Ok');
			z.component.footer.clickRightActionByLabel('Filtrar');
		}
		browser.sleep(5000);
		//obtem o id do grid da tela principal
		var idGrid = await h.getIdGrid();
		var gridVazio = await h.gridSemRegistros(idGrid);
		//se o grid não está vazio retorna true para o spec
		if(!gridVazio){
			return true;
		}
		//se o grid estiver vazio devolve para o spec a mensagem exibida no grid
		else{
			return await z.widget.grid.getText(idGrid, 0, 0); 
		}
	};

	this.exibeLojas = async function(unidade, loja, grupo, cidade, periodo){
		//array com as datas inicial e final
		var arrayDatas = periodo.split(' - ');
		//array com o dia o mes e ano do período informado
		var diaMesAnoInicial = arrayDatas[0].split('/');
		var diaMesAnoFinal   = arrayDatas[1].split('/');

		//obtem o id do grid da tela principal
		var idGrid = await h.getIdGrid();
		var gridVazio = await h.gridSemRegistros(idGrid);
		//se o grid não está vazio obtem as informações da ultima movimentação da loja
		if(!gridVazio){			
			if((await z.widget.grid.getText(idGrid, 0, 0)).indexOf(unidade) >= 0 && 
		       (await z.widget.grid.getText(idGrid, 0, 1)).indexOf(loja) >= 0 &&
		       (await z.widget.grid.getText(idGrid, 0, 2)).indexOf(grupo) >= 0 && 
		   	   (await z.widget.grid.getText(idGrid, 0, 3)).indexOf(cidade) >= 0){
		   	   	
		   	   	//converte dia mes ano inicial e separa nas variaveis
		   	   	var diaInicial = parseInt(diaMesAnoInicial[0]);
		   	   	var mesInicial = parseInt(diaMesAnoInicial[1]);
		   	   	var anoInicial = parseInt(diaMesAnoInicial[2]);

				//converte dia mes ano final e separa nas variaveis
		   	   	var diaFinal = parseInt(diaMesAnoFinal[0]);
		   	   	var mesFinal = parseInt(diaMesAnoFinal[1]);
		   	   	var anoFinal = parseInt(diaMesAnoFinal[2]);

		   	   	//array contendo a data do último movimento exibido no grid
				var ultimoMovimento = ((await z.widget.grid.getText(idGrid, 0, 5)).substring(0, 10)).split('/');
				
				//converte o dia mes ano exibidos no grid e separa nas variaveis
				var diaGrid = parseInt(ultimoMovimento[0]);
				var mesGrid = parseInt(ultimoMovimento[1]);
				var anoGrid = parseInt(ultimoMovimento[2]);

				//verifica se a última data de movimentação enquadra dentro do período informado
				if((diaGrid >= diaInicial || mesGrid >= mesInicial || anoGrid >= anoInicial) &&
				   (diaGrid <= diaFinal || diaGrid <= mesFinal || anoGrid <= anoFinal)){
				   	console.log('enquadra no periodo');
				    return true;	
				}
				else{
					return false;
				}
			}
			else{
				console.log('não está no grid');
				return false;
			}
		}
		else{
			return await z.widget.grid.getText(idGrid, 0, 0); 
		}


	};
};
module.exports = new lojaSemMovimentacao();