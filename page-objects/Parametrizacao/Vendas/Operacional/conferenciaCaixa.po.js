var ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
var z = new ZeedhiAPIConstructor(browser, protractor);
var h = require('../../../../page-objects/helper.po.js');

var conferenciaCaixa = function(){
	self = this;

	this.filtrarConferencia = function(data){
		z.component.popup.isOpened().then(function(existePopup){
			if(existePopup){
				h.filtroUnidade();
				h.filtroLoja();
				browser.sleep(3000);
				$('div.zh-select-date.zh-field-DTCAIXA > div.close-button > span').click();
				$('#DTCAIXA').click();
				//z.util.pressKey(data);
				$('#DTCAIXA').sendKeys(data);
				z.component.footer.clickRightActionByLabel('Filtrar');	
			}
		});
	};

	this.exibirConferencia = function(){
		return h.getIdGrid().then(function(idGrid){
			return h.gridSemRegistros(idGrid).then(function(semRegistros){
				if(!semRegistros)
					return true;
				else
					return false;
			});
		});
	};

	this.verificarDiferencas = function(){
		return h.getIdGrid().then(async function(idGrid){
			var totalLinhas = await h.gridGetNrRows(idGrid);
			var erros = '';
			for(var i = 2; i <= (totalLinhas-2);i++){
				var codigo 		 = await h.gridGetText(idGrid, i, 1);
				var tipoRece 	 = await h.gridGetText(idGrid, i, 2);
				var conferido    = await h.gridGetText(idGrid, i, 3);
				var sangria 	 = await h.numero(await h.gridGetText(idGrid, i, 4));
				var sistema 	 = await h.numero(await h.gridGetText(idGrid, i, 5));
				var fechaSistema = await h.numero(await h.gridGetText(idGrid, i, 6));
				var conferencia  = await h.numero(await h.gridGetText(idGrid, i, 7));
				var confsangsis  = await h.numero(await h.gridGetText(idGrid, i, 8));
				
				if((sangria-sistema) !== fechaSistema)
					erros = erros.concat('Erro na diferença da sangria para o sistema: '+codigo+'-'+tipoRece+'. ');

				if((conferencia+sangria-sistema) !== confsangsis)
					erros = erros.concat('Existem diferença na conferência do recebimento: '+codigo+'-'+tipoRece+'. ');

				if(conferido !== 'Sim')
					erros = erros.concat('O valor da coluna Conferido não foi alterado: '+codigo+'-'+tipoRece+'. ');
			}

			if(erros !== '')
                return erros;
            else
                return true;
		});
	};

	this.confirmarConferencia = function(){
		z.component.footer.clickRightActionByLabel('Confirmar Conferência');
		return h.getIdGrid().then(async function(idGrid){
			var totalLinhas = await h.gridGetNrRows(idGrid);
			var erros = await h.alertaDeErro();
			for(var i = 2; i <= (totalLinhas-2);i++){
				var codigo 		 = await h.gridGetText(idGrid, i, 1);
				var tipoRece 	 = await h.gridGetText(idGrid, i, 2);
				var conferido    = await h.gridGetText(idGrid, i, 3);

				if(conferido !== 'Sim')
					erros = erros.concat('Erro ao alterar status da conferência para o recebimento: '+codigo+'-'+tipoRece+'. ');
			}

			if(erros)
                return erros;
            else
                return true;
        });
	};

	this.gridPossuiRegistros = async function() {
        //verifica se o grid está sem registros ou se foi preenchido com informações
        browser.sleep(5000);
        return (!await h.gridSemRegistros(await h.getIdGrid()));
    };

	this.gerarRelatorioPDF = function(){
		var reportURL;
		var screenURL;

        //gera o pdf se houver registros no grid, senão retorna a mensagem de que grid está sem registros
        return this.gridPossuiRegistros().then(function(temRegistros){
            if(temRegistros){    
                screenURL = browser.getCurrentUrl();

                z.externalComponent.report.openReportAction();
                z.externalComponent.report.clickGeneratePDF();
                browser.sleep(10000);
                          
                browser.driver.getAllWindowHandles().then(function(windows){
                    browser.ignoreSynchronization = true;
                    var initialWindowsQntd = windows.length;
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

	this.gerarRelatorioXLS = function(){
		z.externalComponent.report.generateXLSReport();
        return z.externalComponent.report.isXlsReportSuccessfull(); 
	};

	this.gerarRelatorioCSV = function(){
		h.generateCSVReport();
        return h.isCsvReportSuccessfull();
	};
};
module.exports = new conferenciaCaixa();