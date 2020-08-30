var ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
var z = new ZeedhiAPIConstructor(browser, protractor);
var h = require('../../../../page-objects/helper.po.js');
var teclas = require('protractor-hotkeys');

var parametrosGerais = function () {
	var self = this;

	//abre o filtro e pesquisa um valor que existe em qualquer campo
	this.filtroSuspenso = function (valor) {
		browser.sleep(10000);
		//abre o filtro suspenso para pesquisar no grid
		element(by.css('body > span > section > section > div.default-window.ng-scope > section.everything.ng-scope > div > section > section > section > section > div > section > section > section > div > section > div > section > div > div:nth-child(2) > div > div.control-handle > span.open.zh-icon.zh-icon-more.zh-icon-no-border.zh-icon-color-white')).isDisplayed().click();

		z.util.clickElement(by.css('span.action-icon.search-action-icon.zh-icon.zh-icon-search.zh-icon-no-border.zh-icon-color-white'));
		//seleciona o campo
		z.util.clickElement(by.css('div.floating-card-input > input'))
		//e envia o valor para o campo de pesquisa
		z.util.pressKey(valor);
		//fecha o filtro suspenso apos pesquisar no grid
		z.util.clickElement(by.css('span.open.zh-icon.zh-icon-more.zh-icon-no-border.zh-icon-color-white'));
	};
	//executa a parametrização da tela Geral
	this.geral = function (cadProdCmp, dsPrevConsPdv, dsDirSalvaCat, dsDirDestArqTc, utTabPrecLvdc, bloqSemImp, dirArqXmlNfce, infProdProduz, atuProdAtivFi, exConsAtGer, tokenAudTax, keyAudTax, proxyAudTax, portaAudTax) {
		//abre a tela Geral dentro da aba Gerais
		h.navegar('Gerais');
		h.navegar('Geral');
		//pressiona o botão editar
		z.component.footer.clickCenterActionByIcon('pencil');

		//define os parâmetros para cadastro de composição de produtos
		h.grupoCampos('Composição de Produtos');
		h.selectNative('IDCADPRODCMP', cadProdCmp);
		//define os parâmetros de mensagem de limite de aprovação
		h.grupoCampos('Mensagem Enviada ao Usuário');
		z.field.fieldFunctions.fill('DSPREVCONSPDV', dsPrevConsPdv);
		//define os parâmetros de destino dos arquivos CAT52
		h.grupoCampos('Diretório Destino dos arquivos da CAT-52 no servidor');
		z.field.fieldFunctions.fill('DSDIRSALVCAT', dsDirSalvaCat);
		//define os parâmetros de destino dos arquivos TC
		h.grupoCampos('Diretório Destino dos arquivos TC no servidor(Geração em arquivos - Fechamento do dia)');
		z.field.fieldFunctions.fill('DSDIRDESTARQTC', dsDirDestArqTc);
		teclas.trigger('end');
		//define os parâmetros da tabela de preço por cliente
		h.grupoCampos('Tabela de Preço Utilizada pelo cliente');
		//h.selectNative('IDUTTABPRECLVDC', utTabPrecLvdc);
		h.selectNative('IDUTTABPRECLVDC', utTabPrecLvdc);
		//define os parâmetros da tabela de preço por cliente
		h.grupoCampos('Impostos do produto');
		h.selectNative('IDBLOQSEMIMP', bloqSemImp);
		//define os parâmetros de destino dos arquivos NFCE
		h.grupoCampos('Diretório destino dos arquivos NFC-e no servidor');
		z.field.fieldFunctions.fill('DSDIRARQXMLNFCE', dirArqXmlNfce);
		//define os parâmetros atualização de produtos na base local
		h.grupoCampos('Atualização de produtos na base local');
		h.selectNative('IDATUPRODATIVFI', atuProdAtivFi);
		//define os parâmetros de controle de produtos
		h.grupoCampos('Cancelamento de Produto');
		h.selectNative('IDINFPRODPRODUZ', infProdProduz);
		//define os parâmetros de pesquisa de consumidor na frente do caixa
		h.grupoCampos('Pesquisa de consumidor');
		h.selectNative('IDEXCONSATGER', exConsAtGer);
		/*element(by.css("select[id='IDEXCONSATGER']")).element(by.xpath("..")).element(by.css("div.new-select")).click();
		if(exConsAtGer == 'Sim')
        	element.all(by.css('li.option')).get(10).click();
        else
			element.all(by.css('li.option')).get(11).click();
		*/
		//define os parâmetros da integração AudTax
		h.grupoCampos('Integração AudTax');
		z.field.fieldFunctions.fill('CDTOKENAUDTAX', tokenAudTax);
		z.field.fieldFunctions.fill('CDKEYAUDTAX', keyAudTax);
		z.field.fieldFunctions.fill('PROXYAUDTAX', proxyAudTax);
		z.field.fieldFunctions.fill('PORTAUDTAX', portaAudTax);
		//salva os parametros e encerra o teste da tela Geral
		z.component.footer.clickRightActionByLabel('Salvar');
		return h.notificacao();
	};
	//executa a parametrização da tela Fiscal
	this.fiscal = function (dsDirArqMag) {
		//abre a tela Fiscal dentro da aba Gerais
		h.navegar('Gerais');
		h.navegar('Fiscal');
		//pressiona o botão editar
		z.component.footer.clickCenterActionByIcon('pencil');

		//define os parâmetros para geração do arquivo magnético
		h.grupoCampos('Parâmetro para Geração do Arquivo Magnético(SINTEGRA)');
		z.field.fieldFunctions.fill('DSDIRARQMAG', dsDirArqMag);
		//salva os parametros e encerra o teste da tela Geral
		z.component.footer.clickRightActionByLabel('Salvar');
		return h.notificacao();
	};
	//executa a parametrização da tela Integração Site - Delivery
	this.integraSiteDelivery = function (cdLojaEsitef, nmRazSocVen, idValidaAten) {
		//abre a tela Fiscal dentro da aba Gerais
		h.navegar('Gerais');
		h.navegar('Integração Site - Delivery');
		//pressiona o botão editar
		z.component.footer.clickCenterActionByIcon('pencil');

		//define os parâmetros de integração do e-Sitef
		h.grupoCampos('Integração E-sitef');
		z.field.fieldFunctions.fill('CDLOJAESITEF', cdLojaEsitef);
		//define os parâmetros de vendedor padrão de Site Delivery
		h.grupoCampos('Definição de Padrão para Site Delivery');
		h.pesquisaItem('NMRAZSOCVEN', nmRazSocVen);
		//define os parâmetros de pesquisa de consumidor na frente do caixa
		h.grupoCampos('Valida Atendimento - Site Delivery');
		h.selectNative('IDVALIDAATEN', idValidaAten);
		//salva os parametros e encerra o teste da tela Geral
		z.component.footer.clickRightActionByLabel('Salvar');
		z.component.alert.clickMessageOk();
	};
	//executa a parametrização da tela Configurações de Email
	this.configuraEmail = function (dsSmtpAutVnd, nrPortaAutVnd, dsEmailAuVnd, idTpAuthSmtp, cdSenhaAutVndWeb, dsSmtpCript, dsEmailCluso) {
		//abre a tela Fiscal dentro da aba Gerais
		h.navegar('Gerais');
		h.navegar('Configurações de Email');
		//pressiona o botão editar
		z.component.footer.clickCenterActionByIcon('pencil');

		//define a parametrização da configuração do email
		h.grupoCampos('Dados do SMTP');
		z.field.fieldFunctions.fill('DSSMTPAUTVND', dsSmtpAutVnd);
		z.field.fieldFunctions.fill('NRPORTAAUTVND', nrPortaAutVnd);
		z.field.fieldFunctions.fill('DSEMAILAUVND', dsEmailAuVnd);
		h.selectNative('IDTPAUTHSMTP', idTpAuthSmtp);
		z.field.fieldFunctions.fill('CDSENHAAUTVNDWEB', cdSenhaAutVndWeb);
		h.selectNative('DSSMTPCRIPT', dsSmtpCript);
		//define a parametrização do fale conosco
		h.grupoCampos('Dados do "fale conosco"');
		z.field.fieldFunctions.fill('DSEMAILCLUSO', dsEmailCluso);
		//salva os parametros e encerra o teste da tela
		z.component.footer.clickRightActionByLabel('Salvar');
		return h.notificacao();
	};
	//executa a parametrização da tela Configurações Gerais Produto
	this.produto = function (produto, pesa, tara, codBarras, nmAbreviado, txServico, controlRefil, tpProdDebCons, grupProdComb, codTecla, imprProd, imprProducao, solLocImpr, fornecedor, diasValidade, infAdic, qtdePorcao, valMinConsDebito, unPorcao, partIntMed, partDecMed, medCaseira, tipoProd, descProdVenda) {
		browser.sleep(10000);
		h.navegar('Produto');
		z.component.popup.isOpened().then(function (opened) {
			if (opened) {
				h.grupoCampos('Outros Filtros');
				z.field.fieldFunctions.fill('SEARCHLIST__ALL', produto);
				z.component.footer.clickRightActionByLabel('Filtro');
			}
			else {
				z.component.footer.clickCenterActionByIcon('filter');
				h.grupoCampos('Outros Filtros');
				z.field.fieldFunctions.fill('SEARCHLIST__ALL', produto);
				z.component.footer.clickRightActionByLabel('Filtro');
			}
		});//promise

		z.widget.grid.click('NMPRODUTO', produto, '695234340438025423356');
		z.component.footer.clickCenterActionByIcon('pencil');

		h.selectNative('IDPESAPROD', pesa);
		z.field.fieldFunctions.fill('QTTARAPROD', tara);
		z.field.fieldFunctions.fill('CDBARPRODUTO', codBarras);
		z.field.fieldFunctions.fill('NMPRODIMPFIS', nmAbreviado);
		h.selectNative('IDCOBTXSERV', txServico);
		h.selectNative('IDCONTROLAREFIL', controlRefil);
		h.selectNative('IDTPPRODDEBCONS', tpProdDebCons);
		h.selectNative('IDTIPOPROD', grupProdComb);
		z.field.fieldFunctions.fill('CDPROTECLADO', codTecla);
		h.selectNative('IDIMPPRODUTO', imprProd);
		h.selectNative('IDIMPRODUVEZ', imprProducao);
		h.selectNative('IDSOLLOCIMP', solLocImpr);
		z.field.fieldFunctions.fill('DSDADOSFORNVND', fornecedor);
		z.field.fieldFunctions.fill('QTDIAVALPRODVND', diasValidade);
		z.field.fieldFunctions.fill('DSINFADIPRODVND', infAdic);
		z.field.fieldFunctions.fill('QTPORCAOVND', qtdePorcao);
		z.field.fieldFunctions.fill('VRMINCONSUMODEB', valMinConsDebito);
		h.selectNative('IDUNPORCAOVND', unPorcao);
		z.field.fieldFunctions.fill('QTMEDCASVND', partIntMed);
		h.selectNative('IDPADEMEDCASVND', partDecMed);
		h.selectNative('IDTIPOMEDCASVND', medCaseira);
		h.selectNative('IDORIGPRODPR', tipoProd);
		z.field.fieldFunctions.fill('DSPRODVENDA', descProdVenda);
		//salva os parâmetros e encerra o teste da tela
		z.component.footer.clickRightActionByLabel('Salvar');
		return h.notificacao();
	};
	//executa os testes de atualização da tela produto
	this.atualizaProduto = function (prodInicial, prodFinal, pesa, tipoTara, valorTara, cobraTxServico, grupoProdComb, imprProd, imprProducao) {
		browser.sleep(10000);
		h.navegar('Produto');
		//filtra todos os produtos cadastrados
		z.component.popup.isOpened().then(function (opened) {
			if (opened) {
				h.grupoCampos('Outros Filtros');
				z.field.fieldFunctions.fill('SEARCHLIST__ALL', '');
				z.component.footer.clickRightActionByLabel('Filtro');
			}
			else {
				z.component.footer.clickCenterActionByIcon('filter');
				h.grupoCampos('Outros Filtros');
				z.field.fieldFunctions.fill('SEARCHLIST__ALL', '');
				z.component.footer.clickRightActionByLabel('Filtro');
			}
		});//promise
		//abre a tela Atualização Automática	
		z.component.footer.clickRightActionByLabel('Alteração Auto.');
		//define o intervalo entre o produto inicial e produto final no filtro de pesquisa dos produtos
		z.field.fieldFunctions.click('NMPRODUTOINI');
		z.component.floatingControl.isOpened().then(async function(opened){
			if(opened){
				z.util.pressKey(prodInicial);
				z.widget.grid.click('NMPRODUTO', prodInicial, await h.getIdGrid());
			}
		});//promise
		browser.sleep(5000);
		z.field.fieldFunctions.click('NMPRODUTOFIN');
		z.component.floatingControl.isOpened().then(async function(opened){
			if(opened){
				z.util.pressKey(prodFinal);
				z.widget.grid.click('NMPRODUTO', prodFinal, await h.getIdGrid());
			}
		});//promise		
		browser.sleep(5000);
		//define os parâmetros a serem cadastrados para os produtos
		h.selectNative('IDPESAPROD', pesa);
		h.selectNative('QTTARAPROD_AA', tipoTara);
		z.field.fieldFunctions.fill('QTTARAPROD', valorTara);
		h.selectNative('IDCOBTXSERV', cobraTxServico);
		h.selectNative('IDTIPOPROD', grupoProdComb);
		h.selectNative('IDIMPPRODUTO', imprProd);
		h.selectNative('IDIMPRODUVEZ', imprProducao);
		//salva os parâmetros e encerra o teste da tela
		z.component.footer.clickRightActionByLabel('Alterar');
		return h.notificacao();
	};
	//executa os testes da tela Percentual para Calculo de preço do produto
	this.calculoPrecoProduto = function (unidade, percentual, prodInicial, prodFinal) {
		browser.sleep(10000);
		h.navegar('Produto');
		z.component.popup.isOpened().then(function (opened) {
			if (opened) {
				z.component.footer.clickRightActionByLabel('Filtro');
			}
			else {
				h.navegar('Percentual para Cálculo do Preço do Produto');
				element(by.css('#NMFILIAL > span.zh-select-text.ng-binding')).getText().then(function (nmfilial) {
					if (nmfilial != '')
						z.util.clickElement(by.css('#NMFILIAL > span > svg'));
				});
				h.unidade(unidade);
				z.component.footer.clickRightActionByLabel('Filtro');
			}
		});//promise
		z.component.footer.clickCenterActionByIcon('plus');
		browser.sleep(5000);
		z.field.fieldFunctions.fill('VRPERCPREPRO', percentual);
		h.grupoCampos('Selecionar Intervalo');
		z.field.fieldFunctions.click('NMPRODUTOINI');
		z.component.floatingControl.isOpened().then(async function(opened){
			if(opened){
				z.util.pressKey(prodInicial);
				z.widget.grid.click('NMPRODUTO', prodInicial, await h.getIdGrid());
			}
		});//promise
		browser.sleep(5000);
		z.field.fieldFunctions.click('NMPRODUTOFIN');
		z.component.floatingControl.isOpened().then(async function(opened){
			if(opened){
				z.util.pressKey(prodFinal);
				z.widget.grid.click('NMPRODUTO', prodFinal, await h.getIdGrid());
			}
		});//promise
		//
		z.component.footer.clickRightActionByLabel('Salvar');
	};
	//executa os testes da tela imposto (tela retirada)
	this.imposto = function (imposto, tipoImposto) {
		browser.sleep(10000);
		h.navegar('Imposto do Produto');
		h.navegar('Impostos');

		z.widget.grid.click('SGIMPOSTO', imposto, '695234340346795168453');
		z.component.footer.clickCenterActionByIcon('pencil');

		h.selectNative('IDTPIMPOSFIS', tipoImposto);
		z.component.footer.clickRightActionByLabel('Salvar');
		z.component.footer.clickLeftActionByLabel('Voltar');
	};
	//executa os testes da tela imposto por produto (tela retirada)
	this.impostoProduto = function (unidade, nivel, prodInicial, prodFinal, imposto, aliquota, percReducao, baseCalc, incidePisCof, aliqIbpt, aliqIbptEs, cfopPis, cstIcms, cstPisCof, aliqPis, aliqCofins, filtro) {
		var utilFiltro;
		var returnParam;
		browser.sleep(10000);
		h.navegar('Imposto do Produto');
		h.navegar('Impostos do Produto');
		z.component.popup.isOpened().then(function (opened) {
			if (opened) {
				h.pesquisaItem('NMFILIAL', unidade);
				z.field.fieldFunctions.fill('CDARVPROD', nivel);
				z.component.footer.clickRightActionByLabel('Filtro');
			}
			else {
				z.component.footer.clickCenterActionByIcon('filter');
				h.pesquisaItem('NMFILIAL', unidade);
				z.field.fieldFunctions.fill('CDARVPROD', nivel);
				z.component.footer.clickRightActionByLabel('Filtro');
			}
		});//promise
		browser.sleep(5000);
		//verifica se o grid contém itens ou está vazio
		returnParam = z.util.elementExists(by.css('#grid-6952343401606784974468 > div.body > div > div > div > ng-include > p')).then(function (exibe) {
			var returnPesquisa;
			if (!exibe) {
				//abre a opção 'Ações' do menu
				z.component.footer.clickRightActionByLabel('Ações');
				z.util.clickElement(by.css('#popup > span > section > section > section > div > div > ul > li:nth-child(1) > div > div > span'));
				if (filtro == 'intervalo') {
					//h.pesquisaItem('NMPRODUTOINI', prodInicial);
					//adiciona o produto inicial no cadastro de impostos
					browser.sleep(5000);
					z.util.clickElement(by.css('#NMPRODUTOINI > span > svg'));
					//pesquisa no filtro suspenso do grid
					browser.sleep(5000);
					z.util.pressKey(prodInicial);
					//verifica se o produto pesquisado está no grid
					returnPesquisa = z.widget.grid.rowExists('NMPRODUTO', prodInicial, '9000').then(function (existe) {
						browser.sleep(5000);
						var msg;
						if (existe) {
							//seleciona no grid o produto pesquisado
							z.widget.grid.click('NMPRODUTO', prodInicial, '9000');
							//adiciona o produto final no cadastro de impostos
							z.util.clickElement(by.css('#NMPRODUTOFIN > span.ng-scope.zh-icon.zh-icon-close-x.zh-icon-no-border > svg'));
							z.util.clickElement(by.css('#NMPRODUTOFIN > span > svg'));
							//pesquisa no filtro suspenso do grid
							z.util.pressKey(prodFinal);
							//verifica se o produto pesquisado está no grid
							msg = z.widget.grid.rowExists('NMPRODUTO', prodInicial, '9000').then(function (existe) {
								if (existe) {
									z.widget.grid.click('NMPRODUTO', prodFinal, '9000');
									utilFiltro = true;
								}
								else {
									z.component.footer.clickLeftActionByLabel('Cancelar');
									utilFiltro = false;
									return 'O produto final não foi locaizado.';
								}
							});//promise					
						}
						else {
							z.component.footer.clickLeftActionByLabel('Cancelar');
							utilFiltro = false;
							msg = 'O produto inicial não foi localizado.';
						}
						return msg;
					});//promise	
				}
				else if (filtro == 'lista') {
					//z.util.clickElement(by.css('#PRODUTOS > span > svg'));
					browser.sleep(5000);
					z.field.fieldFunctions.click('PRODUTOS');
					z.util.clickElement(by.css('#popup > span > section > section > section > section > div > div:nth-child(2) > div > div.control-menu > ul > li.float-action.ng-scope.expandable.opened > div > div > div > div.floating-card-input > span.floating-card-search-field.ng-binding'));
					z.util.clickElement(by.css('#popup > span > section > section > section > section > div > div:nth-child(2) > div > div.control-menu > ul > li.float-action.ng-scope.expandable.opened > div > div > div > div.floating-card-search-field-select.opened > ul > li:nth-child(1) > span.ng-binding'));
					//pesquisa no filtro suspenso do grid
					z.util.pressKey(prodInicial);
					//verifica se o produto pesquisado está no grid
					returnPesquisa = z.widget.grid.rowExists('NMPRODUTO', prodInicial, '9999').then(function (existe) {
						if (existe) {
							z.widget.grid.click('__CHECKBOX', '', '9999');
							utilFiltro = true;
						}
						else
							return 'O produto inicial não foi localizado.';
					});//promise
					z.util.clickElement(by.css('#popup > span > section > section > section > section > div > div:nth-child(2) > div > div.control-menu > ul > li.float-action.ng-scope.expandable.opened > div > div > div > div.floating-card-input > input'));
					//apaga valores digitados no filtro suspenso
					element(by.css('#popup > span > section > section > section > section > div > div:nth-child(2) > div > div.control-menu > ul > li.float-action.ng-scope.expandable.opened > div > div > div > div.floating-card-input > input')).clear();
					//pesquisa no filtro suspenso do grid
					z.util.pressKey(prodFinal);
					//verifica se o produto pesquisado está no grid
					returnPesquisa = z.widget.grid.rowExists('NMPRODUTO', prodFinal, '9999').then(function (existe) {
						browser.sleep(5000);
						if (existe) {
							z.widget.grid.click('__CHECKBOX', '', '9999');
							utilFiltro = true;
							z.component.footer.clickRightActionByLabel('Ok');
						}
						else {
							z.component.footer.clickLeftActionByLabel('Cancelar');
							return 'O produto final não foi locaizado.';
						}
					});//promise
				}
				browser.sleep(5000);
				if (utilFiltro) {
					h.pesquisaItem('NMIMPOSTO', imposto);
					z.field.fieldFunctions.fill('VRPEALIMPFIS', aliquota);
					z.field.fieldFunctions.fill('VRPERCREDUCAO', percReducao);
					h.selectNative('IDINCIDEPISCOF', incidePisCof);
					z.field.fieldFunctions.fill('VRALIQIBPT', aliqIbpt);
					z.field.fieldFunctions.fill('VRALIQIBPTES', aliqIbptEs);
					h.pesquisaItem('CDCFOPPFIS', cfopPis);
					h.pesquisaItem('CDCSTICMS', cstIcms);
					h.pesquisaItem('CDCSTPISCOF', cstPisCof);
					h.pesquisaItem('VRALIQPIS', aliqPis);
					h.pesquisaItem('VRALIQCOFINS', aliqCofins);
					z.component.footer.clickRightActionByLabel('Salvar');
					z.component.alert.clickMessageOk();
					returnPesquisa = 'Ok';
				}
				else {
					z.component.footer.clickLeftActionByLabel('Cancelar');
					z.component.footer.clickLeftActionByLabel('Cancelar');
				}
			}
			else {
				returnPesquisa = 'Não foram encontrados produtos.';
			}
			return returnPesquisa;
		});//promiseItens
		return returnParam;
	};
	//executa os testes na tela exportação de impostos da aba imposto de produto (tela retirada)
	this.exportaImposto = function (unidadeOrigem, unidadeDestino, produtos) {
		browser.sleep(10000);
		var returnParam;
		h.navegar('Imposto do Produto');
		h.navegar('Impostos do Produto');
		z.component.popup.isOpened().then(function (opened) {
			if (opened) {
				h.pesquisaItem('NMFILIAL', unidade);
				z.component.footer.clickRightActionByLabel('Filtro');
			}
			else {
				z.component.footer.clickCenterActionByIcon('filter');
				h.pesquisaItem('NMFILIAL', unidade);
				z.component.footer.clickRightActionByLabel('Filtro');
			}
		});//promise
		browser.sleep(5000);
		//abre a opção 'Ações' do menu
		z.component.footer.clickRightActionByLabel('Ações');
		z.util.clickElement(by.css('#popup > span > section > section > section > div > div > ul > li:nth-child(1) > div > div > span'));
		//caso seja exportar os impostos de todos produtos da unidade
		if (produtos == 'todos') {
			z.widget.grid.checkAllRows('9999');
			z.component.alert.isVisible().then(function (alerta) {
				if (alerta) {
					z.component.alert.clickButton('Sim');
				}
			});//promise
		}
		//confirma a exportação dos impostos dos produtos
		z.component.footer.clickRightActionByLabel('Ok');
		z.component.footer.clickRightActionByLabel('Exportar');
		//aguarda alerta com mensagem de confirmação
		z.component.alert.isVisible().then(function (alerta) {
			if (alerta) {
				z.component.alert.clickButton('Sim');
			}
		});//promise
		//recebe a mensagem de confirmação da exportação de impostos
		returnParam = z.component.alert.isVisible().then(function (alerta) {
			var msg;
			if (alerta) {
				msg = z.component.alert.getText();
				z.component.alert.clickMessageOk();
			}
			return msg;
		});//promise
		return returnParam;
	};
	//executa os testes na tela Fidelidade
	this.fidelidade = function (clientPadrao, centroCustoFidel, tipoConsFidel) {
		//navega até a aba Fidelidade
		h.navegar('Fidelidade');
		//clica no botão editar
		z.component.footer.clickCenterActionByIcon('pencil');
		//clica no campo cliente fidelidade
		z.field.fieldFunctions.click('NMRAZSOCCLIE');
		//envia a pesquisa do cliente fidelidade para o grid
		h.enviaPesquisaGrid(clientPadrao);

		//verifica se a informação pesquisada existe no grid e está igual que foi passada no parametro clientPadrao
		var existeCliente = h.existeResultadoGrid(clientPadrao).then(function(existe){
			if(existe){
				//obtem o id do grid do popup
				h.getIdGrid().then(function(idGrid){
					//seleciona o cliente fidelidade pelo nome
					z.widget.grid.click('NMRAZSOCCLIE', clientPadrao, idGrid);	
				});
			}	
			else{
				z.component.footer.clickLeftActionByLabel('Cancelar');
			}	
		});//promise
		browser.sleep(10000);
		//clica no campo centro de custo fidelidade
		z.field.fieldFunctions.click('NMCCUSCLIE');
		//envia a pesquisa do centro de custo fidelidade para o grid
		h.enviaPesquisaGrid(centroCustoFidel);

		//verifica se a informação pesquisada existe no grid e está igual que foi passada no parâmetro centroCustoFidel
		var existeCentroCusto = h.existeResultadoGrid(centroCustoFidel).then(function(existe){
			if(existe){
				//obtem o id do grid do popup
				h.getIdGrid().then(function(idGrid){
					//seleciona o cliente fidelidade pelo nome
					z.widget.grid.click('NMCCUSCLIE', centroCustoFidel, idGrid);	
				});
			}
			else{
				z.component.footer.clickLeftActionByLabel('Cancelar');
			}
		});//promise
		browser.sleep(10000);
		//clica no campo tipo de consumidor fidelidade
		z.field.fieldFunctions.click('NMTIPOCONS');
		//envia a pesquisa do tipo de consumidor fidelidade para o grid
		h.enviaPesquisaGrid(tipoConsFidel);

		//verifica se a informação pesquiada existe no grid  e está igual que foi passada no parâmetro tipoConsFidel
		var existeTipoConsumidor = h.existeResultadoGrid(tipoConsFidel).then(function(existe){
			if(existe){
				//obtem o id do grid do popup
				h.getIdGrid().then(function(idGrid){
					//seleciona o cliente fidelidade pelo nome
					z.widget.grid.click('NMTIPOCONS', tipoConsFidel, idGrid);	
				});
			}
			else{
				z.component.footer.clickLeftActionByLabel('Cancelar');
			}
		});//promise
		
		if(existeCliente && existeCentroCusto && existeTipoConsumidor){
			z.component.footer.clickRightActionByLabel('Salvar');
			return 'Operação realizada com sucesso.';
		}
		else{
			z.component.footer.clickLeftActionByLabel('Cancelar');
			return 'Campos obrigatórios não foram parametrizados.'
		}
	};
	//executa os testes na tela Banco
	this.banco = function (codBanco, codInscricao, chave, url) {
		h.navegar('Banco');
		z.widget.grid.click('CDBANCO', codBanco, '695234340477283463577');
		z.component.footer.clickCenterActionByIcon('pencil');
		h.grupoCampos('Código de Inscrição da Empresa no Banco para Crédito das Vendas Realizadas via Site');
		z.field.fieldFunctions.fill('DSINSCEMPVND', codInscricao);
		h.grupoCampos('Chave de Criptografia para Transações de Venda via Site');
		z.field.fieldFunctions.fill('DSKEYCRIPVND', chave);
		h.grupoCampos('URL Acessada pelos Bancos em Resposta nas Transações de Venda via Site');
		z.field.fieldFunctions.fill('DSURLRETVND', url);
		z.component.footer.clickRightActionByLabel('Salvar');
		return h.notificacao();
	};
	//executa os testes na tela Cliente
	this.cliente = function (unidade, cliente, tabePreco, zeraSaldoMensal, nomeInstituicao) {
		h.navegar('Cliente');
		//verifica se o popup de filtro da unidade está aberto
		z.component.popup.isOpened().then(function (opened) {
			//se estiver abre o filtro de pesquisa de unidade
			if (opened)
				z.field.fieldFunctions.click('NMFILIAL');
			//se estiver fechado abre o popup do filtro.
			else{
				z.component.footer.clickCenterActionByIcon('filter');
				z.field.fieldFunctions.click('NMFILIAL');
			}
		});//promise
		//pesquisa a unidade no filtro
		h.enviaPesquisaGrid(unidade);
		//seleciona a unidade pesquisada no grid do popup e filtra
		h.getIdGrid().then(function(idGrid){
			z.widget.grid.click('CDFILIAL', unidade, idGrid, true);
			z.component.footer.clickRightActionByLabel('Filtro');
		});//promise
		//seleciona no grid o cliente filtrado na pesquisa
		z.widget.grid.click('NRINSJURCLIE', cliente, '6952343402413011446597');
		//clica no ícone de editar 
		z.component.footer.clickCenterActionByIcon('pencil');
		//se a tabela de preço foi passada no parâmetro e seleciona no filtro
		if (tabePreco != ''){
			z.field.fieldFunctions.click('LABELTABPRE');
			//h.pesquisaItem('LABELTABPRE', tabePreco);
			h.enviaPesquisaGrid(tabePreco);
			//seleciona a tabela de preço pesquisada no grid do popup
			h.getIdGrid().then(function(idGrid){
				z.widget.grid.click('CDTABEPREC', tabePreco, idGrid, true);
			});//promise
		}
		//se não for usar tabela de preço
		else
			z.util.clickElement(by.css('#LABELTABPRE > span.ng-scope.zh-icon.zh-icon-close-x.zh-icon-no-border > svg'));
		//seleciona o parametro para zerar saldo mensalmente
		h.selectNative('IDZERSALDCON', zeraSaldoMensal);
		//informa o nome da instituição
		h.selectNative('IDEXBTPNOMECLIE', nomeInstituicao);
		//salva as parametrizações da tabela de preço por cliente
		z.component.footer.clickRightActionByLabel('Salvar');
		//retorna a informação após salvar os parâmetros
		return h.notificacao();
	};
	//executa os testes na tela Pagamento Online
	this.pagOnlineGeral = function (nomLojaEsitef, codLojaEsitef) {
		//navega até a aba Pagamento online
		h.navegar('Pagamento Online');
		//seleciona a aba interna geral
		h.navegar('Geral');
		//abre o agrupamento de campos
		h.grupoCampos('Integração e-SiTef Software Express');
		//e clica no ícone editar
		z.component.footer.clickCenterActionByIcon('pencil');
		//informa o nome da loja e-sitef
		z.field.fieldFunctions.fill('IDLOJAESITEF', nomLojaEsitef);
		//informa o código da loja e-sitef
		z.field.fieldFunctions.fill('CDLOJAESITEF', codLojaEsitef);
		//salva os parâmetros clicando no botão salvar
		z.component.footer.clickRightActionByLabel('Salvar');
		//retorna a informação após salvar os parâmetros
		return h.notificacao();
	};
	//executa os testes na tela Pagamento Online por unidade
	this.pagOnlineUnidade = function (unidade, nomeLojaEsitef, codLojaEsitef) {
		browser.sleep(10000);
		//navega até a aba Pagamento online
		h.navegar('Pagamento Online');
		//seleciona a aba interna Por Unidade
		h.navegar('Unidade');
		//clica no campo unidade para abrir o filtro de pesquisa de unidades
		z.field.fieldFunctions.click('NMFILIAL');
		//pesquisa a unidade existente no filtro
		h.enviaPesquisaGrid(unidade);
		//seleciona a unidade pesquisada no grid do popup e filtra
		h.getIdGrid().then(function(idGrid){
			z.widget.grid.click('CDFILIAL', unidade, idGrid, true);
			//clica no botão filtro para carregar as informações no grid
			z.component.footer.clickRightActionByLabel('Filtro');
		});//promise
		//aguarda carregar o filtro da tela e seleciona a linha com o valor do parâmetro
		browser.sleep(10000);
		//seleciona a unidade filtrada no parâmetro
		z.widget.grid.click('CDFILIAL', unidade, '6952343404121702888659');
		//clica no botão editar
		z.component.footer.clickCenterActionByIcon('pencil');
		//preenche o campo noma da loja e-sitef
		z.field.fieldFunctions.fill('IDLOJAESITEFFIL', nomeLojaEsitef);
		//preenche o campo código da loja e-sitef
		z.field.fieldFunctions.fill('CDLOJAESITEFFIL', codLojaEsitef);
		//clica no botão salvar, e guarda os parâmetros
		z.component.footer.clickRightActionByLabel('Salvar');
		//retorna a informação após salvar os parâmetros
		return h.notificacao();	
	};
	//executa os testes da tela Bandeiras e-Sitef adicionando uma nova bandeira a unidade
	this.bandeiraUnidade = function (unidade, bandeira, idSitef, tipoRece) {
		browser.sleep(10000);
		z.component.popup.isOpened().then(function (opened) {
			if (opened) {
				h.pesquisaItem('NMFILIAL', unidade);
				z.component.footer.clickRightActionByLabel('Filtro');
			}
			else {
				h.navegar('Pagamento Online');
				h.navegar('Por Unidade');
				z.component.popup.isOpened().then(function (opened) {
					if (!opened)
						z.component.footer.clickCenterActionByIcon('filter');
				});//promise
				h.pesquisaItem('NMFILIAL', unidade);
				z.component.footer.clickRightActionByLabel('Filtro');
			}
		});//promise
		//aguarda carregar o filtro da tela e seleciona a linha com o valor do parâmetro
		browser.sleep(5000);
		z.widget.grid.click('CDFILIAL', unidade, '6952343404121702888659');
		//abre a aba Bandeiras e-Sitef
		browser.sleep(5000);
		element(by.css('body > span > section > section > div.default-window.ng-scope > section.zh-swipe-container.zh-swipe-right.ng-scope.open > div > div:nth-child(2) > section > header > div > div > ul > li:nth-child(2) > label > a')).click();
		//adiciona uma nova bandeira
		z.component.footer.clickCenterActionByIcon('plus');
		z.field.fieldFunctions.fill('NMBANDEIRA', bandeira);
		z.field.fieldFunctions.fill('IDESITEF', idSitef);
		h.pesquisaItem('CDTIPORECE', tipoRece);
		z.component.footer.clickRightActionByLabel('Salvar');
		var returnParam = z.util.elementExists(by.css('div.zh-validation.ng-scope')).then(function (valida) {
			var msg;
			if (valida) {
				msg = 'Campo obrigatório';
			}
			else {
				msg = 'Ok';
			}
			return msg;
		});//promise
		return returnParam;
	};
	//executa o teste da tela Bandeiras e-Sitef adicionando uma nova bandeira 
	this.bandeiraEsitef = function (bandeira, ideSitef, tipoRece) {
		browser.sleep(10000);
		h.navegar('Pagamento Online');
		h.navegar('Bandeiras e-SiTef');
		z.component.footer.clickCenterActionByIcon('plus');
		z.field.fieldFunctions.fill('NMBANDEIRA', bandeira);
		z.field.fieldFunctions.fill('IDESITEF', ideSitef);
		
		if(tipoRece != ''){
			z.field.fieldFunctions.click('NMTIPORECE');
			h.enviaPesquisaGrid(tipoRece);
			h.getIdGrid().then(function(idGrid){
				z.widget.grid.click('NMTIPORECE', tipoRece, idGrid, true);
			});//promise
		}

		z.component.footer.clickRightActionByLabel('Salvar');

		var returnParam = z.util.elementExists(by.css('div.zh-validation.ng-scope')).then(function (valida) {
			if (valida) 
				return 'Campo obrigatório';
			else
				return 'Ok';
		});//promise

		if(returnParam == 'Ok')
			return h.notificacao();
		else
			return returnParam;
	};
	this.excluiBandeiraEsitef = function (bandeira) {
		browser.sleep(5000);
		h.navegar('Pagamento Online');
		h.navegar('Bandeiras e-SiTef');
		var bandeiraExcluida = z.util.elementExists(by.css('p.text-center.zh-text-search-not-found.ng-binding.ng-scope')).then(function (vazio) {
			var msg;
			if (vazio)
				msg = 'Não foram encontrados registros';
			else {
				msg = z.widget.grid.rowExists('NMBANDEIRA', bandeira, '6952343402764605722696').then(function (existe) {
					var returnPesquisa;
					if (existe) {
						z.widget.grid.click('NMBANDEIRA', bandeira, '6952343402764605722696');
						z.component.footer.clickCenterActionByIcon('trash');
						returnPesquisa = z.component.alert.isVisible().then(function (alerta) {
							var msgExclusao;
							if (alerta) {
								z.component.alert.clickButton('Sim');
								msgExclusao = z.component.alert.getText();
								z.component.alert.clickMessageOk();
							}
							return msgExclusao;
						});//promise
					}
					else {
						returnPesquisa = 'Bandeira não foi localizada';
					}
					return returnPesquisa;
				});//promise
			}
			return msg;
		});//promise
		return bandeiraExcluida;
	};
	this.tipoConsumidor = function (codTipoCons, regDupCatr, emisExtrSimpl, desabPesqCon) {
		h.navegar('Tipo de Consumidor');
		z.widget.grid.click('CDTIPOCONS', codTipoCons, '695234340482959329715');
		z.component.footer.clickCenterActionByIcon('pencil');
		h.grupoCampos('Importação de dados da catraca');
		element(by.id('zh-checkbox-IDREGDUPCATR')).getAttribute('checked').then(function (check) {
			//se for para marcar o checkbox
			if (!check && regDupCatr == 'S') {
				z.field.checkbox.click('IDREGDUPCATR');
			}
			//se for para desmarcar o checkbox
			else if (check && regDupCatr == 'N') {
				z.field.checkbox.click('IDREGDUPCATR');
			}
		});
		h.grupoCampos('Tipo de Extrato - Vendas Crédito Pessoal');
		element(by.id('zh-checkbox-IDEMISEXTRSIMPL')).getAttribute('checked').then(function (check) {
			if (!check && emisExtrSimpl == 'S') {
				z.field.checkbox.click('IDEMISEXTRSIMPL');
			}
			else if (check && emisExtrSimpl == 'N') {
				z.field.checkbox.click('IDEMISEXTRSIMPL');
			}
		});
		h.grupoCampos('Desabilita Teclado');
		element(by.id('zh-checkbox-IDDESABPESQCON')).getAttribute('checked').then(function (check) {
			if (!check && desabPesqCon == 'S') {
				z.field.checkbox.click('IDDESABPESQCON');
			}
			else if (check && desabPesqCon == 'N') {
				z.field.checkbox.click('IDDESABPESQCON');
			}
		});
		z.component.footer.clickRightActionByLabel('Salvar');
		z.component.footer.clickLeftActionByLabel('Voltar');
	};
	//executa o teste da tela Tipo de consumidor por Unidade
	this.tipoConsumidorUnidade = function (unidade, codExterno, tipoCons) {
		h.navegar('Tipo de Consumidor');
		h.navegar('Tipo de Consumidor por Unidade');
		h.pesquisaItem('NMFILIAL', unidade);
		z.component.footer.clickRightActionByLabel('Filtro');
		var tipoConsCadastrado = z.widget.grid.rowExists('CDTIPOCONS', codExterno, '6952343402463304614734').then(function (existe) {
			var verificaCadastro;
			if (!existe) {
				z.component.footer.clickCenterActionByIcon('plus');
				z.field.fieldFunctions.fill('CDTIPOCONSEX', codExterno);
				h.pesquisaItem('TIPOCONS', tipoCons);
				z.component.footer.clickRightActionByLabel('Salvar');
				z.component.alert.clickMessageOk();
				verificaCadastro = 'Operação realizada com sucesso.';
			}
			else {
				verificaCadastro = 'Tipo de consumidor já está cadastrado para unidade.';
			}
			return verificaCadastro;
		});//promiseRowsExists	
		return tipoConsCadastrado;
	};
	//executa os testes de edição dos parâmetros do Controle de acesso ao site - Snacktech, da tela Tipo de consumidor por Unidade
	this.editaTipoConsumidorUnidade = function (unidade, consumidor, consultaSaldo, pos0, consultaExtrato, pos1, carregaCartao, pos2, bloqCartao, pos3, faleConosco, pos4, restAlimentar, pos5, atualizaCad, pos6, trocaSenha, pos7, tabePreco, pos8) {
		h.navegar('Tipo de Consumidor');
		h.navegar('Tipo de Consumidor por Unidade');
		z.component.popup.isOpened().then(function (opened) {
			if (opened) {
				h.pesquisaItem('NMFILIAL', unidade);
				z.component.footer.clickRightActionByLabel('Filtro');
			}
			else {
				z.component.footer.clickCenterActionByIcon('filter');
				h.pesquisaItem('NMFILIAL', unidade);
				z.component.footer.clickRightActionByLabel('Filtro');
			}
		});//promise
		var tipoConsEditado = z.widget.grid.rowExists('CDTIPOCONS', consumidor, '6952343402463304614734').then(function (existe) {
			if (existe) {
				z.widget.grid.click('CDTIPOCONS', consumidor, '6952343402463304614734');
				browser.sleep(5000);
				h.navegar('Controle de acesso ao site - Snack Tech');
				z.component.footer.clickCenterActionByIcon('pencil');
				h.grupoCampos('Consultar o Saldo');
				element(by.id('zh-checkbox-POS_0')).getAttribute('checked').then(function (check) {
					//se for para marcar o checkbox
					if (!check && consultaSaldo == 'S') {
						z.field.checkbox.click('POS_0');
						h.selectNative('SEL_0', pos0);
					}
					//se for para desmarcar o checkbox
					else if (check && consultaSaldo == 'N') {
						z.field.checkbox.click('POS_0');
					}
				});
				h.grupoCampos('Consultar Extrato');
				element(by.id('zh-checkbox-POS_1')).getAttribute('checked').then(function (check) {
					//se for para marcar o checkbox e selecionar a posição da opção
					if (!check && consultaExtrato == 'S') {
						z.field.checkbox.click('POS_1');
						h.selectNative('SEL_1', pos1);
					}
					//se for para desmarcar o checkbox
					else if (check && consultaExtrato == 'N') {
						z.field.checkbox.click('POS_1');
					}
				});
				h.grupoCampos('Carregar Cartão');
				element(by.id('zh-checkbox-POS_2')).getAttribute('checked').then(function (check) {
					//se for para marcar o checkbox e selecionar a posição da opção
					if (!check && carregaCartao == 'S') {
						z.field.checkbox.click('POS_2');
						h.selectNative('SEL_2', pos2);
					}
					//se for para desmarcar o checkbox
					else if (check && carregaCartao == 'N') {
						z.field.checkbox.click('POS_2');
					}
				});
				h.grupoCampos('Bloquear Cartão');
				element(by.id('zh-checkbox-POS_3')).getAttribute('checked').then(function (check) {
					//se for para marcar o checkbox e selecionar a posição da opção
					if (!check && bloqCartao == 'S') {
						z.field.checkbox.click('POS_3');
						h.selectNative('SEL_3', pos3);
					}
					//se for para desmarcar o checkbox
					else if (check && bloqCartao == 'N') {
						z.field.checkbox.click('POS_3');
					}
				});
				h.grupoCampos('Fale Conosco');
				element(by.id('zh-checkbox-POS_4')).getAttribute('checked').then(function (check) {
					//se for para marcar o checkbox e selecionar a posição da opção
					if (!check && faleConosco == 'S') {
						z.field.checkbox.click('POS_4');
						h.selectNative('SEL_4', pos4);
					}
					//se for para desmarcar o checkbox
					else if (check && faleConosco == 'N') {
						z.field.checkbox.click('POS_4');
					}
				});
				h.grupoCampos('Restrição Alimentar');
				element(by.id('zh-checkbox-POS_5')).getAttribute('checked').then(function (check) {
					//se for para marcar o checkbox e selecionar a posição da opção
					if (!check && restAlimentar == 'S') {
						z.field.checkbox.click('POS_5');
						h.selectNative('SEL_5', pos5);
					}
					//se for para desmarcar o checkbox
					else if (check && restAlimentar == 'N') {
						z.field.checkbox.click('POS_5');
					}
				});
				h.grupoCampos('Atualizar Cadastro');
				element(by.id('zh-checkbox-POS_6')).getAttribute('checked').then(function (check) {
					//se for para marcar o checkbox e selecionar a posição da opção
					if (!check && atualizaCad == 'S') {
						z.field.checkbox.click('POS_6');
						h.selectNative('SEL_6', pos6);
					}
					//se for para desmarcar o checkbox
					else if (check && atualizaCad == 'N') {
						z.field.checkbox.click('POS_6');
					}
				});
				h.grupoCampos('Trocar Senha');
				element(by.id('zh-checkbox-POS_7')).getAttribute('checked').then(function (check) {
					//se for para marcar o checkbox e selecionar a posição da opção
					if (!check && trocaSenha == 'S') {
						z.field.checkbox.click('POS_7');
						h.selectNative('SEL_7', pos7);
					}
					//se for para desmarcar o checkbox
					else if (check && trocaSenha == 'N') {
						z.field.checkbox.click('POS_7');
					}
				});
				h.grupoCampos('Tabela de Preço');
				element(by.id('zh-checkbox-POS_8')).getAttribute('checked').then(function (check) {
					//se for para marcar o checkbox e selecionar a posição da opção
					if (!check && tabePreco == 'S') {
						z.field.checkbox.click('POS_8');
						h.selectNative('SEL_8', pos8);
					}
					//se for para desmarcar o checkbox
					else if (check && tabePreco == 'N') {
						z.field.checkbox.click('POS_8');
					}
				});
				//salvar as parametrizações da tela
				z.component.footer.clickRightActionByLabel('Salvar');
				//aguarda mensagem de algum erro na parametrização dos campos
				var msg = z.component.alert.isVisible().then(function (alerta) {
					var msgAlerta;
					if (alerta) {
						msgAlerta = z.component.alert.getText();
						//z.component.alert.clickMessageOk();
						//z.component.footer.clickLeftActionByLabel('Cancelar');
					}
					else {
						msgAlerta = 'Ok';
					}
					return msgAlerta;
				});
				//z.component.footer.clickLeftActionByLabel('Voltar');
			}
			return msg;
		});//promise
		return tipoConsEditado;
	};
	//
	this.bonusCargaCredito = function (unidade, consumidor, recebeBonus, cargaCredito, bonusCredito, saldConsBonus, periodoBonus, recargasMes, tipoRece) {
		browser.sleep('5000');
		h.navegar('Tipo de Consumidor');
		h.navegar('Tipo de Consumidor por Unidade');
		z.component.popup.isOpened().then(function (opened) {
			if (opened) {
				h.pesquisaItem('NMFILIAL', unidade);
				z.component.footer.clickRightActionByLabel('Filtro');
			}
			else {
				z.component.footer.clickCenterActionByIcon('filter');
				h.pesquisaItem('NMFILIAL', unidade);
				z.component.footer.clickRightActionByLabel('Filtro');
			}
		});//promise
		browser.sleep('5000');
		z.widget.grid.rowExists('CDTIPOCONS', consumidor, '6952343402463304614734').then(function (existe) {
			if (existe) {
				z.widget.grid.click('CDTIPOCONS', consumidor, '6952343402463304614734');
				browser.sleep('5000');
				h.navegar('Bônus Carga de Crédito');
				z.component.footer.clickCenterActionByIcon('pencil');
				//se for para marcar o checkbox e parametrizar os dados
				element(by.id('zh-checkbox-IDRECEBEBONUS')).getAttribute('checked').then(function (checked) {
					if ((recebeBonus == 'S' && !checked) || (recebeBonus == 'S' && checked)) {
						if (!checked)
							z.field.checkbox.click('IDRECEBEBONUS');
						z.field.fieldFunctions.fill('VRCARGACREDITO', cargaCredito);
						z.field.fieldFunctions.fill('VRBONUSCREDITO', bonusCredito);
						z.field.fieldFunctions.fill('VRSALDCONSBONUS', saldConsBonus);
						element(by.id('QTRECARGASMES')).getAttribute('readonly').then(function (desativado) {
							if (!desativado) {
								z.field.fieldFunctions.fill('QTRECARGASMES', recargasMes);
								h.selectNative('IDPERIODOBONUS', periodoBonus);
							}
						});
						if (tipoRece != '')
							h.pesquisaItem('CDTIPORECE', tipoRece);
						else
							z.util.clickElement(by.css('#CDTIPORECE > span.ng-scope.zh-icon.zh-icon-close-x.zh-icon-no-border > svg'));
					}
					//se for para desmarcar o checkbox e limpar alguns campos
					else if (recebeBonus == 'N' && checked) {
						z.field.fieldFunctions.fill('VRCARGACREDITO', cargaCredito);
						z.field.fieldFunctions.fill('VRBONUSCREDITO', bonusCredito);
						z.field.fieldFunctions.fill('VRSALDCONSBONUS', saldConsBonus);
						element(by.id('QTRECARGASMES')).getAttribute('readonly').then(function (desativado) {
							if (!desativado) {
								z.field.fieldFunctions.fill('QTRECARGASMES', recargasMes);
								h.selectNative('IDPERIODOBONUS', periodoBonus);
							}
						});
						if (tipoRece != '') {
							h.pesquisaItem('CDTIPORECE', tipoRece);
						}
						else {
							z.util.clickElement(by.css('#CDTIPORECE > span.ng-scope.zh-icon.zh-icon-close-x.zh-icon-no-border > svg'));
						}
						z.field.checkbox.click('IDRECEBEBONUS');
					}
				});
			}
		});//promise
		var returnParam = z.util.elementExists(by.css('div.zh-validation.ng-scope')).then(function (valida) {
			var msg;
			if (valida && recebeBonus == 'S') {
				//z.component.footer.clickLeftActionByLabel('Cancelar');  
				msg = 'Campo obrigatório';
			}
			else {
				//salva e confirma as parametrizações da tela
				z.component.footer.clickRightActionByLabel('Salvar');
				//aguarda algum alerta ser exibido na janela 
				msg = z.component.alert.isVisible().then(function (alerta) {
					var msgAlert;
					if (alerta) {
						msgAlert = z.component.alert.getText();
						z.component.alert.clickMessageOk();
						//z.component.footer.clickLeftActionByLabel('Cancelar');  
					}
					else {
						msgAlert = 'Ok';
						browser.sleep('5000');
						z.component.footer.clickLeftActionByLabel('Voltar');
					}
					return msgAlert;
				});//promise
			}
			return msg;
		});//promise
		return returnParam;
	};
	this.excluiTipoConsumidorUnidade = function (unidade, consumidor) {
		h.navegar('Tipo de Consumidor');
		h.navegar('Tipo de Consumidor por Unidade');
		z.component.popup.isOpened().then(function (opened) {
			if (opened) {
				h.pesquisaItem('NMFILIAL', unidade);
				z.component.footer.clickRightActionByLabel('Filtro');
			}
			else {
				z.component.footer.clickCenterActionByIcon('filter');
				h.pesquisaItem('NMFILIAL', unidade);
				z.component.footer.clickRightActionByLabel('Filtro');
			}
		});//promise
		var tipoConsExcluido = z.widget.grid.rowExists('CDTIPOCONS', consumidor, '6952343402463304614734').then(function (existe) {
			var msg;
			if (existe) {
				z.widget.grid.click('CDTIPOCONS', consumidor, '6952343402463304614734');
				z.component.footer.clickCenterActionByIcon('trash');
				msg = z.component.alert.isVisible().then(function (alerta) {
					var msgAlert;
					if (alerta) {
						z.component.alert.clickButton('Sim');
						msgAlert = z.component.alert.getText();
						//z.component.alert.clickMessageOk();	
					}
					return msgAlert;
				});//promise
			}
			else {
				msg = 'Tipo de consumidor não localizado';
			}
			return msg;
		});//promise
		return tipoConsExcluido;
	}
};

module.exports = new parametrosGerais();