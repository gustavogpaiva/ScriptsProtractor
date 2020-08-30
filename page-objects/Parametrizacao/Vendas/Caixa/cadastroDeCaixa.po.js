var ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
var z = new ZeedhiAPIConstructor(browser, protractor);
var h = require('../../../../page-objects/helper.po.js');

var cadastroDeCaixa = function () {
	var self = this;

	/*executa o cadastro de um novo caixa passando como parametros os codigos da unidade,loja,caixa 
	  o nome, tipo de caixa, habilitado, sua modalidade e qual emissor de vendas e retorna o valor 
	  se o caixa existe no grid da tela de cadastro de caixa.*/
	this.cadastrarCaixa = function (unidade, loja, caixa, nome, tipo, habilitado, modalidade, emissao) {
		var cxExiste = false;
		
		//verifica e seleciona no filtro uma unidade existente
		z.component.popup.isOpened().then(function(aberto){
    		if(aberto){
	    		h.filtroUnidade();
				h.filtroLoja();	
				z.component.footer.clickRightActionByLabel('Filtrar');
			}
    	});

		//adiciona um novo caixa
		browser.sleep(5000);
		z.component.footer.clickCenterActionByLabel('Adicionar');

		//preenche as informações de cadastro do novo caixa
		z.field.fieldFunctions.fill('CDCAIXA', caixa);
		z.field.fieldFunctions.fill('NMCAIXA', nome);
		h.selectNative('IDCONFVENDA', tipo);
		h.selectNative('IDCAIXAFISCA', habilitado);
		h.selectNative('IDHABCAIXAVENDA', modalidade);
		h.selectNative('IDTPEMISSAOFOS', emissao);

		//confirma o cadastro do caixa
		z.component.footer.clickRightActionByLabel('Salvar');
		var promiseAlert = z.component.alert.isVisible();
		promiseAlert.then(function (alert) {
			console.log('aguardando mensagem: ' + alert);
			if (alert) {
				z.component.alert.clickMessageOk();
				z.component.footer.clickLeftActionByLabel('Cancelar');
			}
		});//promiseAlert

		cxExiste = true;
		return cxExiste;
	};
	/*executa a edição das informações de um caixa cadastrado, passando como parametros o codigo da unidade, loja, caixa, o nome do caixa, o tipo de caixa, em que está habilitado, a modalidade do caixa, o emissor de cupom, seu caixa controle e setor.*/
	this.editarCaixa = function (unidade, loja, caixa, nome = null, tipo = null, habilitado = null, modalidade = null, emissao = null, controle = null, setor = null) {
		var cxEditado = false;
		
		//verifica e seleciona no filtro uma unidade existente
		z.component.popup.isOpened().then(function(aberto){
    		if(aberto){
	    		h.filtroUnidade();
				h.filtroLoja();	
				z.component.footer.clickRightActionByLabel('Filtrar');
			}
    	});

		//pesquisa no grid se o caixa está cadastrado
		if (z.widget.grid.rowExists('CDCAIXA', caixa, '1311172682190641126624')) {
			//seleciona o caixa no grid
			z.widget.grid.click('CDCAIXA', caixa, '1311172682190641126624');
			//pressiona o botão editar
			z.component.footer.clickCenterActionByIcon('pencil');
			//preenche os campos a serem alterados
			if (nome != null)
			{ z.field.fieldFunctions.fill('NMCAIXA', nome); }
			if (tipo != null)
			{ h.selectNative('IDCONFVENDA', tipo); }
			if (habilitado != null)
			{ h.selectNative('IDCAIXAFISCA', habilitado); }
			if (modalidade != null)
			{ h.selectNative('IDHABCAIXAVENDA', modalidade); }
			if (emissao != null)
			{ h.selectNative('IDTPEMISSAOFOS', emissao); }
			if (controle != null && tipo == 'Venda') {
				//abre o filtro e seleciona um caixa controle
				z.field.fieldFunctions.click('NMCAIXACONTROLE');
				h.getIdGrid().then(function(idGrid){
					if (z.widget.grid.rowExists('CDCAIXA', controle, idGrid)) {
						z.widget.grid.click('CDCAIXA', controle, idGrid);
					}
				});
			}
			if (setor != null) {
				//abre o filtro e seleciona um setor cadastrado
				z.field.fieldFunctions.click('NMSETOR');
				h.getIdGrid().then(function(idGrid){
					if (z.widget.grid.rowExists('CDSETOR', setor, idGrid)) {
						z.widget.grid.click('CDSETOR', setor, idGrid);
					}
				});
			}
			//confirma as alterações
			z.component.footer.clickRightActionByLabel('Salvar');
			cxEditado = true;
		}
		//cancela o cadastro do novo caixa e volta ao grid da tela cadastro de caixa
		else {
			z.component.footer.clickLeftActionByLabel('Cancelar');
			z.component.footer.clickLeftActionByLabel('Voltar');
		}
		return cxEditado;
	};
	/*inativa um caixa cadastrado na loja, passando como parâmetros o código de unidade, loja e caixa, caso o caixa está inativo é encerrada a rotina*/
	this.inativarCaixa = function (unidade, loja, caixa) {
		//verifica e seleciona no filtro uma unidade existente
		z.component.popup.isOpened().then(function(aberto){
    		if(aberto){
	    		h.filtroUnidade();
				h.filtroLoja();	
				z.component.footer.clickRightActionByLabel('Filtrar');
			}
    	});

		//abre o filtro suspenso para pesquisar no grid
		z.component.floatingControl.open();
		z.component.floatingControl.selectAction('search');
		//envia o caixa a ser pesquisado
		z.util.pressKey(caixa);

		//fecha o filtro suspenso apos pesquisar no grid
		z.component.floatingControl.toggle();

		//seleciona no grid o caixa cadastrado
		z.widget.grid.click('CDCAIXA', caixa, '1311172682190641126624');

		browser.sleep(8000);
		//verifica se o caixa está ativo
		var el = element(by.css('#span-field-IDATIVO > p'));
		return el.getText().then(function (ativo) {
			if (ativo == 'Sim') {
				//pressiona o botão inativar
				z.component.footer.clickCenterActionByIcon('trash');
				var promiseAlert = z.component.alert.isVisible();
				promiseAlert.then(function (alert) {
					if (alert) {
						z.component.alert.clickButton('Sim');
					}
				});//promiseAlert
				return z.component.notification.getText(0);
			}
			else {
				z.component.footer.clickLeftActionByLabel('Voltar');
				return 'O caixa ' + caixa + ' já está inativo.';
			}
		});
	};
	/**/
	this.exportarCaixa = function () { };
	/*executa a parametrização de um caixa específico, passando como parametros o codigo do unidade, loja e caixa. Esta função deve ser chamada antes das outras funções de testes que executam a parametrização do caixa*/
	this.parametrizarCaixa = function (unidade, loja, caixa) {
		//verifica e seleciona no filtro uma unidade existente
		browser.sleep(5000);
		z.component.popup.isOpened().then(function(aberto){
    		if(!aberto){
    			//abre o filtro suspenso para pesquisar no grid
				z.component.floatingControl.open();
				z.component.floatingControl.selectAction('search');
				//envia o caixa a ser pesquisado
				z.util.pressKey(caixa);
			}
			if(aberto){
				h.filtroUnidade();
				h.filtroLoja();	
				z.component.footer.clickRightActionByLabel('Filtrar');
			}
    	});

		//pesquisa no grid se o caixa está cadastrado
		if (z.widget.grid.rowExists('CDCAIXA', caixa, '1311172682190641126624')) {
			//seleciona o caixa no grid e a tela parâmetros
			z.widget.grid.click('CDCAIXA', caixa, '1311172682190641126624');
			h.navegar('Parâmetros');
		}
		else {
			z.component.footer.clickLeftActionByLabel('Voltar');
		}
	};
	/*executa a parametrização do sistema TEF*/
	this.TEF = function (utilTef, consCheque, bloqDigCartao, solParcCred, tipoTef, portTef, localTef, codLojTef, codTermTef, ipTef) {
		//navega no menu parâmetros e abre a tela TEF
		h.navegar('TEF');
		//pressiona o botão editar
		z.component.footer.clickCenterActionByIcon('pencil');
		//define se o caixa vai utilizar TEF
		h.grupoCampos('Utilização TEF');
		h.selectNative('IDUTILTEF', utilTef);
		//informa os parametros de acordo com tipo de sistema TEF
		h.grupoCampos('Parametrização TEF');
		
		//caso utilize TEF discado ou TEF Dedicado deve informar os três primeiros campos da tela
		if (utilTef == 'Utiliza TEF Dedicado' || utilTef == 'Utiliza TEF Discado') {
			h.selectNative('IDUTILCHEQ', consCheque);
			h.selectNative('IDBLOQIDCART', bloqDigCartao);
			h.selectNative('IDPARCREDCAP', solParcCred);
		}
		
		//caso utilize somente TEF dedicado informa os seguintes campos de configuração do sistema do TEF
		if (utilTef == 'Utiliza TEF Dedicado') {
			h.selectNative('IDTPTEF', tipoTef);
			//campos somente utilizados no sistema Auttar
			if (tipoTef == 'Auttar') {
				z.field.fieldFunctions.fill('CDPORTATEF', portTef);
				z.field.fieldFunctions.fill('CDESTTEF', localTef);
			}
			//campos utilizados no sistema Sitef,Scope e Auttar
			if (tipoTef == 'Sitef' || tipoTef == 'Scope' || tipoTef == 'Auttar') {
				z.field.fieldFunctions.fill('CDLOJATEF', codLojTef);
				z.field.fieldFunctions.fill('DSENDIPSITEF', ipTef);
			}
			//campos utilizados no sistema Cappta,Sitef,Scope e Auttar
			if (tipoTef == 'Cappta' || tipoTef == 'Sitef' || tipoTef == 'Scope' || tipoTef == 'Auttar')
			{ z.field.fieldFunctions.fill('CDTERTEF', codTermTef); }	
		}

		//salva os parâmetros definidos e encerra o teste da tela
		z.component.footer.clickRightActionByLabel('Salvar');

		//retorna a mensagem confirmando a parametrização da aba frente de caixa 1
		return z.component.notification.isNotificationMessagePresent().then(function(presente){
			if(presente)
				return z.component.notification.getText(0);
			//volta para tela principal de cadastro de caixa
			z.component.footer.clickLeftActionByLabel('Voltar');
		});
	};
	/*executa a parametrização da tela Frente Caixa (1)*/
	this.frenteDeCaixa1 = function (compFiscDeb, impCompDebCons, solDigObsDebCons, impComCredPes, solVendBalcao, solCpfCnpj, msgExibe, impCodBar, padrao, compVendas, tipoTela) {
		//navega no menu parâmetros e abre tela Frente Caixa(1)
		h.navegar('Frente de Caixa');
		h.navegar('Frente Caixa (1)');
		//pressiona o botão editar
		z.component.footer.clickCenterActionByIcon('pencil');
		//define os parametros utilizados na venda débito consumidor
		h.grupoCampos('Vendas Débito Consumidor');
		h.selectNative('IDSOLCONICNFIS', compFiscDeb);
		h.selectNative('IDIMPVENDCON', impCompDebCons);
		h.selectNative('IDSOLDIGOBSDC', solDigObsDebCons);

		//define os parametros utilizados na venda crédito pessoal
		h.grupoCampos('Vendas Crédito Pessoal');
		h.selectNative('IDIMPCOMPVCP', impComCredPes);

		//define os parametros utilizados na venda balcão
		h.grupoCampos('Venda Balcão');
		h.selectNative('IDINFVENBAL', solVendBalcao);

		//define a utilização de CPF e CNPJ na venda
		h.grupoCampos('Informa CPF/CNPJ');
		h.selectNative('IDSOLICITACPF', solCpfCnpj);
		z.field.fieldFunctions.fill('DSMENSCPFCUP', msgExibe);

		//define a impressão de codigo de barras apos a emissão do cupom 
		h.grupoCampos('Impressão de Código de Barras após emissão do Cupom');
		h.selectNative('IDIMPBARRCUP', impCodBar);
		z.field.fieldFunctions.click('NMPADBARRCUP');
		//seleciona no grid o padrão do código de barras
		h.getIdGrid().then(function(idGrid){
			z.widget.grid.click('NMPADBARRCUP', padrao, idGrid);
		});

		//define os parametros para complemento de venda 
		h.grupoCampos('Permite Complemento de Venda');
		h.selectNative('IDPERCOMVENCPDC', compVendas);

		//define o tipo de tela de venda de produtos
		h.grupoCampos('Tipo da Tela de Venda de Produtos');
		z.field.fieldFunctions.click('IDTPTELAVEFRASE');
		//seleciona no grid o tipo de tela venda
		h.getIdGrid().then(function(idGrid){
			z.widget.grid.click('IDTPTELAVE', tipoTela, idGrid);
		});

		//salva os parâmetros definidos e encerra o teste da tela
		z.component.footer.clickRightActionByLabel('Salvar');

		//volta para tela principal de cadastro de caixa
		z.component.footer.clickLeftActionByLabel('Voltar');

		//retorna a mensagem confirmando a parametrização da aba frente de caixa 1
		return z.component.notification.isNotificationMessagePresent().then(function(presente){
			if(presente)
				return z.component.notification.getText(0);
		});
	};
	/*executa a parametrização da tela Frente Caixa (2)*/
	this.frenteDeCaixa2 = function (ctrlRepique, percentRepique, txtRodCupomFisc, abreComanda, logProcCaixa, freqLimpVendas, nrDiasVendaMsde, geraBackup, nrDiasBaixarVendas, solTipSangrCaixa, solConsVendBalcao, impPedSetorProd) {
		//navega no menu parâmetros e abre tela Frente Caixa(2)
		h.navegar('Frente de Caixa');
		h.navegar('Frente Caixa (2)');
		//pressiona o botão editar
		z.component.footer.clickCenterActionByIcon('pencil');

		//define os parametros para utilizar controle de repique
		h.grupoCampos('Controle de Repique');
		h.selectNative('IDTPCONTRREPIQ', ctrlRepique);
		z.field.fieldFunctions.fill('VRPEMAXREPIQVND', percentRepique);

		//define os parametros de impressão do rodapé no cupom fiscal
		h.grupoCampos('Texto para ser impresso no rodapé do cupom fiscal');
		z.field.fieldFunctions.fill('DSOBSCUPFIS', txtRodCupomFisc);

		//define os parametros de abertura da comanda
		h.grupoCampos('Abertura de Comanda');
		h.selectNative('IDPERABERCOMCXA', abreComanda);

		//define os parametros para gerar LOG de processos na frente do caixa
		h.grupoCampos('Gera LOG de Processos');
		h.selectNative('IDGERALOGFOS', logProcCaixa);

		//define os parametros de limpeza das vendas no MSDE
		h.grupoCampos('Limpeza das Vendas no MSDE');
		h.selectNative('IDFREQLIMPVENDA', freqLimpVendas);
		z.field.fieldFunctions.fill('NRDIASVENDAMSDE', nrDiasVendaMsde);
		h.selectNative('IDGERBKPMSDE', geraBackup);

		//define os parametros recuperação de vendas do banco principal para o msde
		h.grupoCampos('Recuperação das Vendas (Banco de Dados Principal -> MSDE)');
		z.field.fieldFunctions.fill('NRDIASBXVNDMSDE', nrDiasBaixarVendas);

		//define os parametros de sangria do caixa
		h.grupoCampos('Sangria de Caixa');
		h.selectNative('IDSOLTPSANGRIACX', solTipSangrCaixa);

		//define os parametros de sangria do caixa
		h.grupoCampos('Solicita Nome do Consumidor');
		h.selectNative('IDSOLDIGCONS', solConsVendBalcao);

		//define os parametros para imprimir pedidos na produção
		h.grupoCampos('Imprime Pedido na Produção');
		h.selectNative('IDIMPPEDPROD', impPedSetorProd);

		//salva os parâmetros definidos e encerra o teste da tela
		z.component.footer.clickRightActionByLabel('Salvar');

		//volta para tela principal de cadastro de caixa
		z.component.footer.clickLeftActionByLabel('Voltar');

		//retorna a mensagem confirmando a parametrização da aba frente de caixa 2
		return z.component.notification.isNotificationMessagePresent().then(function(presente){
			if(presente)
				return z.component.notification.getText(0);
		});
	};
	/*executa a parametrização da tela Frente Caixa (3)*/
	this.frenteDeCaixa3 = function (senhaCupFisc, obrigFechaCaixa, numSerieNfce, utilSATComp, servSAT, agrupAutoPag, caixaSincDlv, impAutoEntrega, impCupomFiscKDS, impCupomFiscQRCODE, impNFVenda, solEmailNFVenda, visualTelaPed, finPedExpDlv) {
		//navega no menu parâmetros e abre a tela Frente Caixa(3)
		h.navegar('Frente de Caixa');
		h.navegar('Frente Caixa (3)');
		//pressiona o botão editar
		z.component.footer.clickCenterActionByIcon('pencil');

		//define os parametros para senha de cupom fiscal/pedido
		h.grupoCampos('Senha Cupom Fiscal/Pedido');
		h.selectNative('IDSENHACUP', senhaCupFisc);

		//define os parametros para obrigar o fechamento do dia
		h.grupoCampos('Obriga fechamento do dia');
		h.selectNative('IDOBRIGFECHCAIX', obrigFechaCaixa);

		//define os parametros para número série NFCE
		h.grupoCampos('Número Série NFCe');
		z.field.fieldFunctions.fill('CDSERIECX', numSerieNfce);

		//define os parametros para utilizar SAT Compartilhado
		h.grupoCampos('Utiliza SAT Compartilhado');
		h.selectNative('IDUTILSATCOMP', utilSATComp);
		z.field.fieldFunctions.fill('CDURLWSSAT', servSAT);

		//define os parametros de agrupamento de comanda no auto-pagto da comanda
		h.grupoCampos('Agrupamento de Comanda no Auto Pagamento Comanda');
		h.selectNative('IDAGRUPACMDAPC', agrupAutoPag);

		//define os parametros para sincronização delivery
		h.grupoCampos('Sincronização com Delivery');
		h.selectNative('IDSINCCAIXADLV', caixaSincDlv);
		h.selectNative('IDIMPAUTENTREG', impAutoEntrega);

		//define os parametros para imprimir cupons na expedição do KDS
		h.grupoCampos('Impressão Cupom Fiscal na expedição do pedido no KDS');
		h.selectNative('IDIMPAUTCUPEXP', impCupomFiscKDS);

		//define os parametros para impressão de cupom fiscal via QRCODE
		h.grupoCampos('Impressão Cupom Fiscal via leitura QR-Code');
		h.selectNative('IDLEITURAQRCODE', impCupomFiscQRCODE);

		//define os parametros para impressão de nota fiscal ao finalizar a venda
		h.grupoCampos('Imprime nota fiscal após finalizar a venda');
		h.selectNative('IDIMPRIMENOTA', impNFVenda);

		//define os parametros para solicitar o envio de email da NF apos finalizar vendas
		h.grupoCampos('Solicita email para envio da nota fiscal após finalizar a venda');
		h.selectNative('IDENVIAEMAIL', solEmailNFVenda);

		//define os parametros para visualizar a tela de pedido
		h.grupoCampos('Visualiza Tela de Pedido');
		h.selectNative('IDVISTELPED', visualTelaPed);

		//define os parametros para visualizar a tela de pedido
		h.grupoCampos('Finaliza Pedido Automático Delivery');
		h.selectNative('IDVISTELPED', finPedExpDlv);

		//salva os parâmetros definidos e encerra o teste da tela
		z.component.footer.clickRightActionByLabel('Salvar');

		//volta para tela principal de cadastro de caixa
		z.component.footer.clickLeftActionByLabel('Voltar');

		//retorna a mensagem confirmando a parametrização da aba frente de caixa 3
		return z.component.notification.isNotificationMessagePresent().then(function(presente){
			if(presente)
				return z.component.notification.getText(0);
		});
	};
	/*executa a parametrização da tela Abertura do Caixa*/
	this.aberturaDeCaixa = function (solCotacao, baixaPeriferico, digRedZ, altFundoTroco, valFundoTroco, tipoCaixa, baixaDados) {
		//navega no menu parâmetros e abre a tela Abertura do Caixa
		h.navegar('Abertura do Caixa');
		//pressiona o botão editar
		z.component.footer.clickCenterActionByIcon('pencil');

		//define os parâmetros de abertura de caixa
		h.grupoCampos('Abertura de Caixa');
		h.selectNative('IDVERIFCOTA', solCotacao);
		h.selectNative('IDBAIXAPERIF', baixaPeriferico);
		h.selectNative('IDINFREDZNCAD', digRedZ);
		h.selectNative('IDPALFUTRABRCXA', altFundoTroco);
		z.field.fieldFunctions.fill('VRABERCAIX', valFundoTroco);

		//define os parâmetros de tipo de caixa
		h.grupoCampos('Tipo de Caixa');
		h.selectNative('IDCOLETOR', tipoCaixa);

		//define os parâmetros de atualização de dados das tabelas na inicialização do sistema
		h.grupoCampos('Atualização dos dados das tabelas no cache local na inicialização do sistema');
		h.selectNative('IDAUTOIMPTAB', baixaDados);

		//salva os parâmetros definidos e encerra o teste da tela
		z.component.footer.clickRightActionByLabel('Salvar');

		//volta para tela principal de cadastro de caixa
		z.component.footer.clickLeftActionByLabel('Voltar');

		//retorna a mensagem confirmando a parametrização da aba abertura de caixa
		return z.component.notification.isNotificationMessagePresent().then(function(presente){
			if(presente)
				return z.component.notification.getText(0);
		});
	};

	/*executa a parametrização da tela Fechamento do Caixa*/
	this.fechamentoDeCaixa = function (impRecSangFechCaixa, confEmisRelProd, tribRelProd, impRedZFechCaixa, memFita, impLeitX, solNumDepFechCaixa, arqAtoCotepe, fechaCego) {
		//navega no menu parâmetros e abre a tela a tela Fechamento do Caixa
		h.navegar('Fechamento do Caixa');
		//pressiona o botão editar
		z.component.footer.clickCenterActionByIcon('pencil');

		//define os parâmetros de recibo de sangria no fechamento do caixa
		h.grupoCampos('Impressão do Recibo de Sangria no Fechamento do Caixa');
		h.selectNative('IDEMIRECSANG', impRecSangFechCaixa);
		//define os parâmetros do relatório de produtos
		h.grupoCampos('Relatório de Produto');
		h.selectNative('IDEMIRELPROD', confEmisRelProd);
		h.selectNative('IDTRIBRELPRO', tribRelProd);
		//define os parâmetros de emissão da redução Z no fechamento do caixa
		h.grupoCampos('Emissão da Redução Z no Fechamento do Caixa');
		h.selectNative('IDIMPREDZ', impRedZFechCaixa);
		//define os parâmetros para geração da memória fita detalhe da impressora fiscal CAT-52
		h.grupoCampos('Gera memória fita detalhe da impressora fiscal em arquivo (CAT-52)');
		h.selectNative('IDGRAVAMFD', memFita);
		//define os parâmetros para emissão da leitura x no fechamento do caixa
		h.grupoCampos('Emissão da Leitura X no Fechamento do Caixa');
		h.selectNative('IDIMPLEITURAX', impLeitX);
		//define os parâmetros para informar número de depósito no fechamento do caixa
		h.grupoCampos('Informa o número de depósito no Fechamento do Caixa');
		h.selectNative('IDSOLNUMDEPFC', solNumDepFechCaixa);
		//define os parâmetros para gerar arquivo de vendas Ato Cotepe 17/04 - RJ
		h.grupoCampos('Gera Arquivo de Vendas Ato Cotepe 17/04 - Rio de Janeiro');
		h.selectNative('IDGERAARQVNDRIO', arqAtoCotepe);
		//define os parâmetos para realizar o fechamento cego do caixa
		h.grupoCampos('Fechamento cego do Caixa');
		h.selectNative('IDUTILFECHCEGO', fechaCego);

		//salva os parâmetros definidos e encerra o teste da tela
		z.component.footer.clickRightActionByLabel('Salvar');

		//volta para tela principal de cadastro de caixa
		z.component.footer.clickLeftActionByLabel('Voltar');

		//retorna a mensagem confirmando a parametrização da aba exportação de vendas
		return z.component.notification.isNotificationMessagePresent().then(function(presente){
			if(presente)
				return z.component.notification.getText(0);
		});
	};
	/*executa a parametrização da tela Exportação de Vendas*/
	this.exportacaoDeVendas = function (caixaExp) {
		//navega no menu parâmetros e abre a tela exportação de vendas dentro da aba Caixa Associados
		h.navegar('Caixas Associados');
		h.navegar('Exportação de Vendas');

		//pressiona o botão exportar e seleciona no filtro o caixa existente para exportação das vendas
		z.component.footer.clickCenterActionByIcon('export');
		z.field.fieldFunctions.click('NMCAIXA_V');
		//obtem o id do grid da tela
		h.getIdGrid().then(function(idGrid){
			//seleciona o caixa no grid
			z.widget.grid.checkRowByValue('CDCAIXA', caixaExp, idGrid);
		});
		z.component.footer.clickRightActionByLabel('Ok');
		//confirma a parametrização de exportação de caixas
		z.component.footer.clickRightActionByLabel('Exportar');

		//volta para tela principal de cadastro de caixa
		z.component.footer.clickLeftActionByLabel('Voltar');

		//retorna a mensagem confirmando a parametrização da aba exportação de vendas
		return z.component.notification.isNotificationMessagePresent().then(function(presente){
			if(presente)
				return z.component.notification.getText(0);
		});
	};
	/*executa a parametrização da tela Importação de Tabelas*/
	this.importacaoDeVendas = function (caixaImp) {
		//navega no menu paramêtros e abre a tela importação de tabelas da aba Caixa Associados
		h.navegar('Caixas Associados');
		h.navegar('Importação de Tabelas');

		//pressiona o botão importar e seleciona no filtro o caixa existente para importação das vendas
		z.component.footer.clickCenterActionByIcon('import');
		z.field.fieldFunctions.click('NMCAIXA_V');
		//obtem o id do grid da tela
		h.getIdGrid().then(function(idGrid){
			//seleciona o caixa no grid
			z.widget.grid.click('CDCAIXA', caixaImp, idGrid);
		});
		z.component.footer.clickRightActionByLabel('Ok');
		//confirma a parametrização de exportação de caixas
		z.component.footer.clickRightActionByLabel('Importar');

		//volta para tela principal de cadastro de caixa
		z.component.footer.clickLeftActionByLabel('Voltar');

		//retorna a mensagem confirmando a parametrização da aba importação das tabelas
		return z.component.notification.isNotificationMessagePresent().then(function(presente){
			if(presente)
				return z.component.notification.getText(0);
		});
	};
	/*executa a parametrização da tela Periféricos (1)*/
	this.perifericos1 = function (geraArqDebug, imprPed, imprPuxa, imprNfce, imprSenha, imprPed2, imprKds) {
		h.navegar('Periféricos');
		h.navegar('Periféricos (1)');

		//pressiona o botão editar
		z.component.footer.clickCenterActionByIcon('pencil');
		//define os parâmetros para geração do arquivo debug da impressora fiscal
		h.grupoCampos('Arquivo de Debug');
		h.selectNative('IDGERADEBUG', geraArqDebug);
		//define os parâmetros para utilização da impressora NF Acompanhamento do pedido
		h.grupoCampos('Impressora Não Fiscal (Acompanhamento do Pedido)');
		z.field.fieldFunctions.click('NRSEQIMPRLOJA1');
		h.getIdGrid().then(function(idGrid){
			z.widget.grid.click('NRSEQIMPRLOJA', imprPed, idGrid);	
		});
		//define os parâmetros para utilização da impressora NF Puxa
		h.grupoCampos('Impressora Não Fiscal (Impressora do Puxa)');
		z.field.fieldFunctions.click('NRSEQIMPRLOJA2');
		h.getIdGrid().then(function(idGrid){
			z.widget.grid.click('NRSEQIMPRLOJA', imprPuxa, idGrid);
		});
		//define os parâmetros para utilização da impressora NF (NFCE/SAT)
		h.grupoCampos('Impressora Não Fiscal (NFCe/SAT)');
		z.field.fieldFunctions.click('NRSEQIMPRLOJA3');
		h.getIdGrid().then(function(idGrid){
			z.widget.grid.click('NRSEQIMPRLOJA', imprNfce, idGrid);
		});
		//define os parâmetros para utilização da impressora NF Senha do pedido
		h.grupoCampos('Impressora Não Fiscal (Senha do Pedido)');
		z.field.fieldFunctions.click('NRSEQIMPRLOJA4');
		h.getIdGrid().then(function(idGrid){
			z.widget.grid.click('NRSEQIMPRLOJA', imprSenha, idGrid);
		});
		//define os parâmetros para utilização da impressora NF Acompanhamento do pedido (2)
		h.grupoCampos('Acompanhamento de pedido (2)');
		z.field.fieldFunctions.click('NRSEQIMPRLOJA5');
		h.getIdGrid().then(function(idGrid){
			z.widget.grid.click('NRSEQIMPRLOJA', imprPed2, idGrid);
		});
		//define os parâmetros para utilização da impressora NF KDS
		h.grupoCampos('Pedidos Expedição KDS');
		z.field.fieldFunctions.click('NRSEQIMPRLOJA6');
		h.getIdGrid().then(function(idGrid){
			z.widget.grid.click('NRSEQIMPRLOJA', imprKds, idGrid);
		});
		//salva os parâmetros definidos e encerra o teste da tela
		z.component.footer.clickRightActionByLabel('Salvar');

		//volta para tela principal de cadastro de caixa
		z.component.footer.clickLeftActionByLabel('Voltar');

		//retorna a mensagem confirmando a parametrização da aba periféricos
		return z.component.notification.isNotificationMessagePresent().then(function(presente){
			if(presente)
				return z.component.notification.getText(0);
		});
	};
	/*executa a parametrização da tela Periféricos (2)*/
	this.perifericos2 = function (tipoBalanca, portBalanca, velBalanca, tipoDisplay, portDisplay, tipoGaveta, tipoLeitorProx, portLeitorProx, velLeitorProx, leCodBarToledo, iniCodBar, fimCodBar, iniQtde, fimQtde, iniValor, fimValor) {
		h.navegar('Periféricos');
		h.navegar('Periféricos (2)');

		//pressiona o botão editar
		z.component.footer.clickCenterActionByIcon('pencil');
		
		//define os parâmetros para utilização da balança
		h.grupoCampos('Balança');
		h.selectNative('IDTIPOBAL', tipoBalanca);
		h.selectNative('CDPORTABAL', portBalanca);
		h.selectNative('NRVELOCBAL', velBalanca);
		
		//define os parâmetros para utilização do display
		h.grupoCampos('Display');
		h.selectNative('IDTIPODISP', tipoDisplay);
		h.selectNative('CDPORTADISP', portDisplay);
		
		//define os parâmetros para utilização da gaveta
		h.grupoCampos('Gaveta');
		h.selectNative('IDTIPOGAVETA', tipoGaveta);
		
		//define os parâmetros para utilização do Leitor de proximidade
		h.grupoCampos('Leitor de Proximidade');
		h.selectNative('IDTIPOPROX', tipoLeitorProx);
		h.selectNative('CDPORTAPROX', portLeitorProx);
		h.selectNative('NRVELOCPROX', velLeitorProx);
		
		//define os parâmetros para utilização do balança Toledo
		h.grupoCampos('Configurações para a balança Toledo Prix IV');
		
		// Parâmetros utilizados na balança toledo, quando selecionar Sim
		h.selectNative('IDLCDBARBALATOL', leCodBarToledo);
		z.field.fieldFunctions.fill('NRPOSINICODBARR', iniCodBar);

		z.field.fieldFunctions.fill('NRPOSFINCODBARR', fimCodBar);
		z.field.fieldFunctions.fill('NRPOSINIQTCDBAR', iniQtde);
		z.field.fieldFunctions.fill('NRPOSFINQTCDBAR', fimQtde);
		z.field.fieldFunctions.fill('NRPOSINIVRCDBAR', iniValor);
		z.field.fieldFunctions.fill('NRPOSFINVRCDBAR', fimValor);
		
		
		//salva os parâmetros definidos e encerra o teste da tela
		z.component.footer.clickRightActionByLabel('Salvar');

		//volta para tela principal de cadastro de caixa
		z.component.footer.clickLeftActionByLabel('Voltar');

		//retorna a mensagem confirmando a parametrização da aba periféricos 2
		return z.component.notification.isNotificationMessagePresent().then(function(presente){
			if(presente)
				return z.component.notification.getText(0);
		});
	};
	/*executa a parametrização da tela Vendedores Associados*/
	this.vendedoresAssociados = function (vendedor) {
		var vendedorParametrizado;
		h.navegar('Vendedores Associados');
		//clica na opção para associar vendedores ao caixa
		z.component.footer.clickCenterActionByLabel('Adicionar');
		//seleciona no filtro um vendedor existente
		z.field.fieldFunctions.click('NMRAZSOCVEN');
		//verifica se no grid de pesquisa dos vendedores existe o vendedor a ser associado ao caixa
		vendedorParametrizado = h.getIdGrid().then(function(idGrid){
			var vendedor = z.widget.grid.rowExists('CDVENDEDOR', vendedor, idGrid);
			return vendedor.then(function (existeVendedor) {
				//seleciona o vendedor para o caixa e encerra o teste da tela
				if (existeVendedor) {
					z.widget.grid.click('CDVENDEDOR', vendedor, idGrid);
					z.component.footer.clickRightActionByLabel('Ok');
					return z.component.notification.getText(0);
				}
				//caso não exista vendedor cancela o cadastro e encerra o teste da tela
				else {
					z.component.footer.clickLeftActionByLabel('Cancelar');
					z.component.footer.clickLeftActionByLabel('Cancelar');
					return 'Vendedor não foi encontrado.';
				}
			});
		});

		//volta para tela principal de cadastro de caixa
		z.component.footer.clickLeftActionByLabel('Voltar');

		return vendedorParametrizado;
	};
};

module.exports = new cadastroDeCaixa();