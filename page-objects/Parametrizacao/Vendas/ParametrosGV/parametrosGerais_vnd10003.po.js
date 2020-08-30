var ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
var z = new ZeedhiAPIConstructor(browser, protractor);
var h = require('../../../../page-objects/helper.po.js');
const protractorHelper = require('protractor-helper');

var parametrosGerais = function () {
	var self = this;

	this.editarParametros = function(aba){
		h.verificarAba(aba).then(function(existeAba){
			if(existeAba === true)
				h.navegar(aba);
		});
		$('.zh-footer-center > ul > li > a > span > span.zh-icon-pencil').isPresent().then(function(opcaoPresente){
			//pressiona o botão para editar os parâmetros
			if(opcaoPresente)
				z.component.footer.clickCenterActionByIcon('pencil');
		});	
	};

	this.salvarParametros = function(){
		return z.component.footer.isRightActionByLabelPresent('Salvar').then(function(opcaoPresente){
			if(opcaoPresente){
				//salva os parametros, retorna para o spec alguma mensagem de erros ou concluindo a parametrização
				z.component.footer.clickRightActionByLabel('Salvar');
				return h.aguardaMensagem();
			}
			else{
				//salva as alterações realizadas e retorna para o spec alguma mensagem de erros ou concluindo a parametrização
				return z.component.footer.isRightActionByLabelPresent('Alterar').then(function(opcaoPresente){
					if(opcaoPresente){
						z.component.footer.clickRightActionByLabel('Alterar');
						return h.aguardaMensagem();
					}
					else{
						z.component.footer.isLeftActionByLabelPresent('Cancelar').then(function(opcaoPresente){
							//cancela a edição dos parametros geral
							if(opcaoPresente)
								z.component.footer.clickLeftActionByLabel('Cancelar');
						});
						return 'Não foi possível salvar os parâmetros.';
					}
				});
			}				
		});
	};
	//Parâmetros da aba Geral
	this.composicaoProdutos = function(idcadprodcmp){
		return h.verificarGrupoCampos('Composição de Produtos').then(function(existeGrupo){
			if(existeGrupo === true){
				//define os parâmetros para cadastro de composição de produtos
				h.grupoCampos('Composição de Produtos');
				h.selectNative('IDCADPRODCMP', idcadprodcmp);		
				h.grupoCampos('Composição de Produtos');
			}
			return existeGrupo;
		});
	};

	this.mensagemUsuario = function(dsprevconspdv){
		return h.verificarGrupoCampos('Mensagem Enviada ao Usuário').then(function(existeGrupo){
			if(existeGrupo === true){
				//define os parâmetros de mensagem de limite de aprovação
				h.grupoCampos('Mensagem Enviada ao Usuário');
				z.field.fieldFunctions.fill('DSPREVCONSPDV', dsprevconspdv);
				h.grupoCampos('Mensagem Enviada ao Usuário');
			}
			return existeGrupo;
		});
	};

	this.diretorioCat52 = function(dsdirsalvcat){
		return h.verificarGrupoCampos('Diretório Destino dos arquivos da CAT-52 no servidor').then(function(existeGrupo){
			if(existeGrupo === true){		
				//define os parâmetros de destino dos arquivos CAT52
				h.grupoCampos('Diretório Destino dos arquivos da CAT-52 no servidor');
				z.field.fieldFunctions.fill('DSDIRSALVCAT', dsdirsalvcat);
				h.grupoCampos('Diretório Destino dos arquivos da CAT-52 no servidor');
			}
			return existeGrupo;
		});
	};

	this.diretorioTC = function(dsdirdestarqtc){
		return h.verificarGrupoCampos('Diretório Destino dos arquivos TC no servidor(Geração em arquivos - Fechamento do dia)').then(function(existeGrupo){
			if(existeGrupo === true){		
				//define os parâmetros de destino dos arquivos TC
				h.grupoCampos('Diretório Destino dos arquivos TC no servidor(Geração em arquivos - Fechamento do dia)');
				z.field.fieldFunctions.fill('DSDIRDESTARQTC', dsdirdestarqtc);
				h.grupoCampos('Diretório Destino dos arquivos TC no servidor(Geração em arquivos - Fechamento do dia)');
			}
			return existeGrupo;
		});
	};

	this.tabelaPrecoCliente = function(iduttabpreclvdc){
		return h.verificarGrupoCampos('Tabela de Preço Utilizada pelo cliente').then(function(existeGrupo){
			if(existeGrupo === true){
				//define os parâmetros da tabela de preço por cliente
				h.grupoCampos('Tabela de Preço Utilizada pelo cliente');
				//h.selectNative('IDUTTABPRECLVDC', iduttabpreclvdc);
				h.selectNative('IDUTTABPRECLVDC', iduttabpreclvdc);	
				h.grupoCampos('Tabela de Preço Utilizada pelo cliente');
			}
			return existeGrupo;
		});
	};

	this.impostoProduto = function(idbloqsemimp){
		return h.verificarGrupoCampos('Impostos do produto').then(function(existeGrupo){
			if(existeGrupo === true){
				//define os parâmetros de bloqueio de produtos sem impostos
				h.grupoCampos('Impostos do produto');
				h.selectNative('IDBLOQSEMIMP', idbloqsemimp);		
				h.grupoCampos('Impostos do produto');
			}
			return existeGrupo;
		});
	};

	this.diretorioNFCE = function(dsdirarqxmlnfce){
		return h.verificarGrupoCampos('Diretório destino dos arquivos NFC-e no servidor').then(function(existeGrupo){
			if(existeGrupo === true){	
				//define os parâmetros de destino dos arquivos NFCE
				h.grupoCampos('Diretório destino dos arquivos NFC-e no servidor');
				z.field.fieldFunctions.fill('DSDIRARQXMLNFCE', dsdirarqxmlnfce);
				h.grupoCampos('Diretório destino dos arquivos NFC-e no servidor');
			}
			return existeGrupo;
		});
	};

	this.atualizaProdutosBaseLocal = function(idatuprodativfi){
		return h.verificarGrupoCampos('Atualização de produtos na base local').then(function(existeGrupo){
			if(existeGrupo === true){		
				//define os parâmetros atualização de produtos na base local
				h.grupoCampos('Atualização de produtos na base local');
				h.selectNative('IDATUPRODATIVFI', idatuprodativfi);
				h.grupoCampos('Atualização de produtos na base local');
			}
			return existeGrupo;
		});
	};

	this.cancelaProdutosProduzidos = function(idinfprodproduz){
		return h.verificarGrupoCampos('Cancelamento de Produto').then(function(existeGrupo){
			if(existeGrupo === true){
				//define os parâmetros de controle de produtos
				h.grupoCampos('Cancelamento de Produto');
				h.selectNative('IDINFPRODPRODUZ', idinfprodproduz);
				h.grupoCampos('Cancelamento de Produto');
			}
			return existeGrupo;
		});				
	};

	this.pesquisarConsumidorAtivo = function(idexconsatger){
		return h.verificarGrupoCampos('Pesquisa de consumidor').then(function(existeGrupo){
			if(existeGrupo === true){
				//define os parâmetros de pesquisa de consumidor na frente do caixa
				h.grupoCampos('Pesquisa de consumidor');
				h.selectNative('IDEXCONSATGER', idexconsatger);
				h.grupoCampos('Pesquisa de consumidor');
			}
			return existeGrupo;
		});			
	};

	this.integracaoAudTax = function(cdtokenaudtax, cdkeyaudtax, proxyaudtax, portaudtax){
		return h.verificarGrupoCampos('Integração AudTax').then(function(existeGrupo){
			if(existeGrupo === true){
				//define os parâmetros da integração AudTax
				h.grupoCampos('Integração AudTax');
				z.field.fieldFunctions.fill('CDTOKENAUDTAX', cdtokenaudtax);
				z.field.fieldFunctions.fill('CDKEYAUDTAX', cdkeyaudtax);
				z.field.fieldFunctions.fill('PROXYAUDTAX', proxyaudtax);
				z.field.fieldFunctions.fill('PORTAUDTAX', portaudtax);
				h.grupoCampos('Integração AudTax');
			}
			return existeGrupo;
		});	
	};

	this.mensagemAutoAtendimento = function(dsmensrodapetaa){
		return h.verificarGrupoCampos('Mensagem exibida no rodapé inicial(Auto Atendimento)').then(function(existeGrupo){
			if(existeGrupo === true){		
				//define os parâmetros para exibição da mensagem no rodapé do TAA
				h.grupoCampos('Mensagem exibida no rodapé inicial(Auto Atendimento)');
				z.field.fieldFunctions.fill('DSMENSRODAPETAA', dsmensrodapetaa);
				h.grupoCampos('Mensagem exibida no rodapé inicial(Auto Atendimento)');
			}
			return existeGrupo;
		});			
	};

	this.textoAjudaNFPaulista = function(txhelpnfpsite){
		return h.verificarGrupoCampos('Texto exibido na Ajuda do campo "Nota Fiscal Paulista" do SnackTech').then(function(existeGrupo){
			if(existeGrupo === true){
				//define os parâmetros para exibir texto de ajuda para o campo nota fiscal paulista do snacktech
				h.grupoCampos('Texto exibido na Ajuda do campo "Nota Fiscal Paulista" do SnackTech');
				z.field.fieldFunctions.fill('TXHELPNFPSITE', txhelpnfpsite);
				h.grupoCampos('Texto exibido na Ajuda do campo "Nota Fiscal Paulista" do SnackTech');
			}
			return existeGrupo;
		});					
	};

	this.textoAjudaRefeicaoExtra = function(txhelprefexsite){
		return h.verificarGrupoCampos('Texto exibido na Ajuda do campo "Refeição Extra" do SnackTech').then(function(existeGrupo){
			if(existeGrupo === true){
				//define os parâmetros para exibir o texto de ajuda no campo refeição extra do snacktech
				h.grupoCampos('Texto exibido na Ajuda do campo "Refeição Extra" do SnackTech');
				z.field.fieldFunctions.fill('TXHELPREFEXSITE', txhelprefexsite);
				h.grupoCampos('Texto exibido na Ajuda do campo "Refeição Extra" do SnackTech');
			}
			return existeGrupo;
		});			
	};

	this.recebimentoQRCode = function(nmtiporeceqrcode){
		return h.verificarGrupoCampos('Tipo de recebimento QRCode').then(function(existeGrupo){
			if(existeGrupo === true){
				//define os parãmetros para o tipo de recebimento que utilizará QRCode
				h.grupoCampos('Tipo de recebimento QRCode');
				//h.autoComplete('NMTIPORECEQRCODE', nmtiporeceqrcode);
				h.filtroCampo('NMTIPORECEQRCODE', nmtiporeceqrcode);
				h.grupoCampos('Tipo de recebimento QRCode');
			}
			return existeGrupo;
		});			
	};

	this.linkServidorImagens = function(fileserverurl){
		return h.verificarGrupoCampos('Link do Servidor de Imagens').then(function(existeGrupo){
			if(existeGrupo === true){
				//define o parâmetro para o link de servidor de imagens
				h.grupoCampos('Link do Servidor de Imagens');
				z.field.fieldFunctions.fill('FILESERVERURL', fileserverurl);
				h.grupoCampos('Link do Servidor de Imagens');
			}
			return existeGrupo;
		});
	};

	this.gerarCodigoOperador = function(idgeracdoperador){
		return h.verificarGrupoCampos('Gerar Código Operador').then(function(existeGrupo){
			if(existeGrupo === true){
				//define o parâmetro para gerar o código de operador
				h.grupoCampos('Gerar Código Operador');
				h.selectNative('IDGERACDOPERADOR', idgeracdoperador);
				h.grupoCampos('Gerar Código Operador');	
			}
			return existeGrupo;
		});
	};

	//Parâmetros da aba Fiscal
	this.gerarArquivoMagnetico = function(dsdirarqmag){
		return h.verificarGrupoCampos('Parâmetro para Geração do Arquivo Magnético(SINTEGRA)').then(function(existeGrupo){
			if(existeGrupo === true){
				//define os parâmetros para geração do arquivo magnético
				h.grupoCampos('Parâmetro para Geração do Arquivo Magnético(SINTEGRA)');
				z.field.fieldFunctions.fill('DSDIRARQMAG', dsdirarqmag);
				h.grupoCampos('Parâmetro para Geração do Arquivo Magnético(SINTEGRA)');
			}
			return existeGrupo;
		});
	};

	//Parâmetros da aba Configuração de Email
	this.dadosSMTP = function(dssmtpautvnd, nrportaautvnd, dsemailauvnd, idtpauthsmtp, cdsenhaautvndweb, dssmtpcript){
		return h.verificarGrupoCampos('Dados do SMTP').then(function(existeGrupo){
			if(existeGrupo === true){
				h.grupoCampos('Dados do SMTP');
				//define a parametrização da configuração do email
				z.field.fieldFunctions.fill('DSSMTPAUTVND', dssmtpautvnd);
				z.field.fieldFunctions.fill('NRPORTAAUTVND', nrportaautvnd);
				z.field.fieldFunctions.fill('DSEMAILAUVND', dsemailauvnd);
				h.selectNative('IDTPAUTHSMTP', idtpauthsmtp);
				z.field.fieldFunctions.fill('CDSENHAAUTVNDWEB', cdsenhaautvndweb);
				h.selectNative('DSSMTPCRIPT', dssmtpcript);
				h.grupoCampos('Dados do SMTP');
			}
			return existeGrupo;
		});
	};

	this.testarSMTP = function(email){
		h.navegar('Configurações de Email');
		return h.verificarGrupoCampos('Dados do SMTP').then(function(existeGrupo){
			if(existeGrupo === true){
				h.grupoCampos('Dados do SMTP');
				h.click('#span-field-testeSMTP > button');
				z.field.fieldFunctions.fill('EMAIL', email);
				z.component.footer.clickRightActionByLabel('Enviar email');
				return h.aguardaMensagem();
			}
			return existeGrupo;
		});
	};

	this.dadosFaleConosco = function(dsemailcluso){
		return h.verificarGrupoCampos('Dados do "fale conosco"').then(function(existeGrupo){
			if(existeGrupo === true){
				h.grupoCampos('Dados do "fale conosco"');
				z.field.fieldFunctions.fill('DSEMAILCLUSO', dsemailcluso);
				h.grupoCampos('Dados do "fale conosco"');
			}
			return existeGrupo;
		});
	};
	//parametros da aba Contrato/Termo adesão
	this.contratoTermoAdesao = function(){
		return h.campoClicavel('DSCONTRATOGERAL').then(function(campoClicavel){
			if(campoClicavel){
				z.field.fieldFunctions.fill('DSCONTRATOGERAL', 'TEKNISA SERVICE LTDA - 01/05/1990');
				return true;
			}
			else
				return false;
		});
	};
	//parametros da aba produto
	this.filtrarProduto = function(produto){
		z.component.popup.isOpened().then(function(opened){
			if(opened){
				//verifica se o grupo Outros filtros está fechado
				$('span.zh-icon.zh-icon-down.zh-icon-no-border.closed').isPresent().then(function(grupoFechado){
					if(grupoFechado)
						h.grupoCampos('Outros Filtros');
				});
				z.field.fieldFunctions.fill('SEARCHLIST__ALL_MAP', produto);
				z.component.footer.clickRightActionByLabel('Filtrar');
			}
			else{
				z.component.footer.clickCenterActionByIcon('filter');
				//verifica se o grupo Outros filtros está fechado
				$('span.zh-icon.zh-icon-down.zh-icon-no-border.closed').isPresent().then(function(grupoFechado){
					if(grupoFechado)
						h.grupoCampos('Outros Filtros');
				});
				z.field.fieldFunctions.fill('SEARCHLIST__ALL_MAP', produto);
				z.component.footer.clickRightActionByLabel('Filtrar');
			}
		});//promise
		browser.sleep(5000);
		return h.getIdGrid().then(function(idGrid){
			return h.gridSemRegistros(idGrid).then(function(semRegistros){
				if(!semRegistros){
					z.widget.grid.click('NMPRODUTO', produto, idGrid);
					return true;
				}
				else
					return h.mensagemGrid();
			});
		});
	};
	//parametros da subaba parâmetros gerais produto
	this.parametrosProduto = function(idpesaprod, qttaraprod, cdbarproduto, nmprodimpfis, idcobtxserv, idcontrolarefil, idtpproddebcons, idtipoprod, cdproteclado, idimpproduto, idimproduvez, idsollocimp, dsdadosfornvnd, qtdiavalprodvnd, dsinfadiprodvnd, qtporcaovnd, vrminconsumodeb, idunporcaovnd, qtmedcasvnd, idpademedcasvnd, idtipomedcasvnd, idorigprodpr, dsprodvenda){
		h.selectNative('IDPESAPROD', idpesaprod);
		z.field.fieldFunctions.fill('QTTARAPROD', qttaraprod);
		z.field.fieldFunctions.fill('CDBARPRODUTO', cdbarproduto);
		z.field.fieldFunctions.fill('NMPRODIMPFIS', nmprodimpfis);
		h.selectNative('IDCOBTXSERV', idcobtxserv);
		h.selectNative('IDCONTROLAREFIL', idcontrolarefil);
		h.selectNative('IDTPPRODDEBCONS', idtpproddebcons);
		h.selectNative('IDTIPOPROD', idtipoprod);
		z.field.fieldFunctions.fill('CDPROTECLADO', cdproteclado);
		h.selectNative('IDIMPPRODUTO', idimpproduto);
		h.selectNative('IDIMPRODUVEZ', idimproduvez);
		h.selectNative('IDSOLLOCIMP', idsollocimp);
		z.field.fieldFunctions.fill('DSDADOSFORNVND', dsdadosfornvnd);
		z.field.fieldFunctions.fill('QTDIAVALPRODVND', qtdiavalprodvnd);
		z.field.fieldFunctions.fill('DSINFADIPRODVND', dsinfadiprodvnd);
		z.field.fieldFunctions.fill('QTPORCAOVND', qtporcaovnd);
		z.field.fieldFunctions.fill('VRMINCONSUMODEB', vrminconsumodeb);
		h.selectNative('IDUNPORCAOVND', idunporcaovnd);
		z.field.fieldFunctions.fill('QTMEDCASVND', qtmedcasvnd);
		h.selectNative('IDPADEMEDCASVND', idpademedcasvnd);
		h.selectNative('IDTIPOMEDCASVND', idtipomedcasvnd);
		h.selectNative('IDORIGPRODPR', idorigprodpr);
		z.field.fieldFunctions.fill('DSPRODVENDA', dsprodvenda);
	};
	//clica na opção Alteração Auto. se estiver disponível e abrir o swipe
	this.alteracaoAutomatica = function(){	
		z.component.footer.isRightActionByLabelPresent('Alteração Auto.').then(function(opcaoPresente){
			if(opcaoPresente)
				z.component.footer.clickRightActionByLabel('Alteração Auto.');
			else
				console.log('A opção alteração auto. não está disponível na tela.');
		});
	};
	//seleciona um intervalo de produtos na tela alteração automatica de produtos
	this.selecionarIntervalo = function(produtos){
		return h.verificarGrupoCampos('Selecionar Intervalo').then(function(existeGrupo){
			if(existeGrupo === true){
				//define o intervalo entre o produto inicial e produto final no filtro de pesquisa dos produtos
				h.autoComplete('NMPRODUTOINI', produtos[0]);
				h.autoComplete('NMPRODUTOFIN', produtos[1]);
			}
			return existeGrupo;
		});
	};
	//seleciona um lista de produtos na tela alteração automática de produtos
	this.selecionarLista = function(produtos){
		return h.verificarGrupoCampos('Selecionar Lista').then(function(existeGrupo){
			if(existeGrupo === true){
				//abre o filtro do campo produtos, pesquisa os produtos e seleciona no grid
				z.field.fieldFunctions.click('PRODUTOS');
				h.getIdGrid().then(function(idGrid){
					h.click('span.clear-button.zh-icon.zh-icon-close-x');
					h.click('div.floating-card-input > input');
					h.sendKeys('div.floating-card-input > input', produtos);
					browser.sleep(5000);
					z.widget.grid.rowExists('NMPRODUTO', produtos, idGrid).then(function(existeProduto){
						if(existeProduto)
							z.widget.grid.checkRowByValue('NMPRODUTO', produtos, idGrid);
						else
							console.log('Produto '+produtos+' não foi encontrado.');
					});
		            z.component.footer.clickRightActionByLabel('Ok');
		        });				
			}
			return existeGrupo;
		});
	};
	//seleciona os parâmetros que fará atualização automática
	this.selecionarParametrosProdutos = function(idpesaprod, qttaraprod_aa, qttaraprod, idcobtxserv, idtipoprod, idimpproduto, idimproduvez){
		//define os parâmetros a serem cadastrados para os produtos
		h.selectNative('IDPESAPROD', idpesaprod);
		h.campoClicavel('QTTARAPROD_AA').then(function(clicavel){
			if(clicavel)
				h.selectNative('QTTARAPROD_AA', qttaraprod_aa);
			else
				console.log('O campo QTTARAPROD_AA não está clicável');
		});
		h.campoClicavel('QTTARAPROD').then(function(clicavel){
			if(clicavel)
				z.field.fieldFunctions.fill('QTTARAPROD', qttaraprod);
			else
				console.log('O campo QTTARAPROD não está clicável');
		});
		h.selectNative('IDCOBTXSERV', idcobtxserv);
		h.selectNative('IDTIPOPROD', idtipoprod);
		h.selectNative('IDIMPPRODUTO', idimpproduto);
		h.campoClicavel('IDIMPRODUVEZ').then(function(clicavel){
			if(clicavel)
				h.selectNative('IDIMPRODUVEZ', idimproduvez);
			else
				console.log('O campo IDIMPRODUVEZ não está clicável');
		});
	};
	//filtra uma unidade existente na subaba percentual de cálculo do produto
	this.filtrarUnidade = function(unidade){
		z.component.popup.isOpened().then(function (opened) {
			if (opened) {
				h.autoComplete('NMFILIAL', unidade);
				z.component.footer.clickRightActionByLabel('Filtrar');
			}
			else {
				z.component.footer.clickCenterActionByIcon('filter');
				h.autoComplete('NMFILIAL', unidade);
				z.component.footer.clickRightActionByLabel('Filtrar');
			}
		});//promise
	};
	//define o valor percentual
	this.adicionarPercentual = function(percentual){
		$('span.action-icon.has-label > span.zh-icon.zh-icon-plus').isPresent().then(function(opcaoPresente){
			if(opcaoPresente){
				browser.executeScript('$(\'span.action-icon.has-label > span.zh-icon.zh-icon-plus\').click()');
				z.field.fieldFunctions.fill('VRPERCPREPRO', percentual);		
			}
			else
				console.log('A opção Adicionar não está disponível na tela.');
		});
	};
	//executa os testes de exclusão de produtos da tela Percentual para Calculo de preço do produto
	this.excluirCalculoPrecoProduto = function(){
		//verifica se a tela para excluir o percentual do produto está aberta
		z.swipe.isPresent().then(function(swipeAberto){
			if(swipeAberto){
				z.component.footer.clickCenterActionByLabel('Excluir');
				z.component.alert.isVisible().then(function(alertaVisivel){
					if(alertaVisivel)
						z.component.alert.clickButton('Sim');
				});		
			}
			else
				console.log('A tela Percentual para Cálculo do Preço do Produto não foi aberta.');
		});
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
		h.autoComplete('NMRAZSOCVEN', nmRazSocVen);
		//define os parâmetros de pesquisa de consumidor na frente do caixa
		h.grupoCampos('Valida Atendimento - Site Delivery');
		h.selectNative('IDVALIDAATEN', idValidaAten);
		//salva os parametros e encerra o teste da tela Geral
		z.component.footer.clickRightActionByLabel('Salvar');
		z.component.alert.clickMessageOk();
	};
	//executa os testes na aba Fidelidade
	this.fidelidade = function (clientPadrao, centroCustoFidel, tipoConsFidel) {
		//pesquisa e seleciona o cliente fidelidade 
		h.autoComplete('NMRAZSOCCLIE', clientPadrao);
		//pesquisa e seleciona o centro de custo fidelidade
		h.autoComplete('NMCCUSCLIE', centroCustoFidel);
		//pesquisa e seleciona o tipo de consumidor fidelidade
		h.autoComplete('NMTIPOCONS', tipoConsFidel);
	};
	//executa os testes na aba Banco
	this.selecionarBanco = function(cdbanco){
		return h.selecionarRegistro('CDBANCO', cdbanco);
	};
	//define o código de inscrição da empresa do banco
	this.inscricaoBanco = function(cdinscricao){
		return h.verificarGrupoCampos('Código de Inscrição da Empresa no Banco para Crédito das Vendas Realizadas via Site').then(function(existeGrupo){
			if(existeGrupo === true){
				h.grupoCampos('Código de Inscrição da Empresa no Banco para Crédito das Vendas Realizadas via Site');
				z.field.fieldFunctions.fill('DSINSCEMPVND', cdinscricao);
			}
			return existeGrupo;
		});
	};
	//define a chave do banco para transação via site
	this.criptografiaVendaSite = function(chave){
		return h.verificarGrupoCampos('Chave de Criptografia para Transações de Venda via Site').then(function(existeGrupo){
			if(existeGrupo === true){
				h.grupoCampos('Chave de Criptografia para Transações de Venda via Site');
				z.field.fieldFunctions.fill('DSKEYCRIPVND', chave);
			}
			return existeGrupo;
		});
	};
	//define a url acessada pelo banco em transações
	this.urlBancoVendaSite = function(url){
		return h.verificarGrupoCampos('URL Acessada pelos Bancos em Resposta nas Transações de Venda via Site').then(function(existeGrupo){
			if(existeGrupo === true){
				h.grupoCampos('URL Acessada pelos Bancos em Resposta nas Transações de Venda via Site');
				z.field.fieldFunctions.fill('DSURLRETVND', url);	
			}
			return existeGrupo;
		});
	};
	//executa os testes na aba Cliente
	this.selecionarCliente = function(cliente){
		return h.selecionarRegistro('NMFANTCLIE', cliente);
	};
	//
	this.selecionarParametrosCliente = function(tabePreco, nomeInstituicao, zeraSaldoMensal, criptografia, recalculoSaldo, hrrecsaldaut){
		//pesquisa e seleciona a tabela de preço
		h.autoComplete('LABELTABPRE', tabePreco);
		//seleciona o parametro para zerar saldo mensalmente
		h.selectNative('IDZERSALDCON', zeraSaldoMensal);
		//informa o nome da instituição
		h.selectNative('IDEXBTPNOMECLIE', nomeInstituicao);
		//define se utiliza criptografia no crachá
		h.selectNative('IDUTCRIPTCRACHA', criptografia);
		//define se utiliza o recálculo de saldo
		h.selectNative('IDULTRECSALDAUT', recalculoSaldo);
		//define o horário do recálculo
		z.field.fieldFunctions.fill('HRRECSALDAUT', hrrecsaldaut);
	};
	//
	this.selecionarUnidadeCliente = function(unidade){
		return h.selecionarRegistro('NOMEFILIAL', unidade);
	};
	//
	this.selecionarTabelaPreco = function(labeltabpre){
		h.autoComplete('LABELTABPRE', labeltabpre);
	};
	//executa os testes da aba Pagamento Online, sub aba Geral
	this.integracaoSitef = function(idlojaesitef, cdlojaesitef){
		return h.verificarGrupoCampos('Integração e-SiTef Software Express').then(function(existeGrupo){
			if(existeGrupo === true){
				h.grupoCampos('Integração e-SiTef Software Express');
				//informa o nome da loja e-sitef
				z.field.fieldFunctions.fill('IDLOJAESITEF', idlojaesitef);
				//informa o código da loja e-sitef
				z.field.fieldFunctions.fill('CDLOJAESITEF', cdlojaesitef);
			}
			return existeGrupo;
		});
	};
	//seleciona uma unidade existente no grid
	this.selecionarUnidade = function(unidade){
		return h.selecionarRegistro('NMFILIAL', unidade);
	};
	//executa os testes da subaba Pagamento Online por unidade
	this.pagOnlineUnidade = function(nomeLojaEsitef, codLojaEsitef){
		//preenche o campo noma da loja e-sitef
		z.field.fieldFunctions.fill('IDLOJAESITEFFIL', nomeLojaEsitef);
		//preenche o campo código da loja e-sitef
		z.field.fieldFunctions.fill('CDLOJAESITEFFIL', codLojaEsitef);
	};
	//executa os testes da subaba Bandeiras e-Sitef adicionando uma nova bandeira a unidade
	this.adicionarBandeiraUnidade = function(bandeira, idSitef, tipoRece) {
		$('span.action-icon.has-label > span.zh-icon.zh-icon-plus').isPresent().then(function(opcaoPresente){
			if(opcaoPresente){
				z.component.footer.clickCenterActionByLabel('Adicionar');
				z.field.fieldFunctions.fill('NMBANDEIRA', bandeira);
				z.field.fieldFunctions.fill('IDESITEF', idSitef);
				h.autoComplete('NMTIPORECE', tipoRece);
			}
			else
				console.log('A opção Adicionar não está disponível na tela.');
		});
	};
	//seleciona uma bandeira do e-sitef existente
	this.selecionarBandeira = function(bandeira){
		return h.selecionarRegistro('NMBANDEIRA', bandeira);
	};
	//executa os testes de exclusão de bandeiras da subaba Bandeiras e-Sitef
	this.excluirBandeiraUnidade = function(){
		//verifica se a tela para excluir a bandeira do e-sitef está aberta
		z.swipe.isPresent().then(function(swipeAberto){
			if(swipeAberto){
				z.component.footer.clickCenterActionByLabel('Excluir');
				z.component.alert.isVisible().then(function(alertaVisivel){
					if(alertaVisivel)
						z.component.alert.clickButton('Sim');
				});
			}
			else
				console.log('A tela de Bandeira e-Sitef não foi aberta.');
		});
	};
	//executa o teste da tela Bandeiras e-Sitef adicionando uma nova bandeira 
	this.adicionarBandeiraEsitef = function (bandeira, ideSitef, tipoRece) {
		z.component.footer.clickCenterActionByLabel('Adicionar');
		z.field.fieldFunctions.fill('NMBANDEIRA', bandeira);
		z.field.fieldFunctions.fill('IDESITEF', ideSitef);
		h.autoComplete('NMTIPORECE', tipoRece);
	};
	//executa os testes de exclusão das bandeiras e-Sitef
	this.excluirBandeiraEsitef = function(){		
		z.component.footer.clickCenterActionByLabel('Excluir');
		z.component.alert.isVisible().then(function(exibeAlerta){
			if(exibeAlerta)
				z.component.alert.clickButton('Sim');
		});
	};
	//testes da aba Tipo Consumidor
	this.selecionarTipoConsumidor = function(nmtipocons){
		return h.selecionarRegistro('NMTIPOCONS', nmtipocons);
	};
	this.importarDadosCatraca = function(idregdupcatr){
		return h.verificarGrupoCampos('Importação de dados da catraca').then(function(existeGrupo){
			if(existeGrupo === true){
				h.grupoCampos('Importação de dados da catraca');
				h.checkbox('IDREGDUPCATR', idregdupcatr);
			}
			return existeGrupo;
		});
	};
	this.tipoExtrato = function(idemisextrsimpl){
		return h.verificarGrupoCampos('Tipo de Extrato - Vendas Crédito Pessoal').then(function(existeGrupo){
			if(existeGrupo === true){
				h.grupoCampos('Tipo de Extrato - Vendas Crédito Pessoal');
				h.checkbox('IDEMISEXTRSIMPL', idemisextrsimpl);
			}
			return existeGrupo;
		});	
	};
	this.desabilitaTeclado = function(iddesabpesqcon){
		return h.verificarGrupoCampos('Desabilita Teclado').then(function(existeGrupo){
			if(existeGrupo === true){
				h.grupoCampos('Desabilita Teclado');
				h.checkbox('IDDESABPESQCON', iddesabpesqcon);
			}
			return existeGrupo;
		});	
	};
	this.senhaConsumidor = function(idsolsenhcons){
		return h.verificarGrupoCampos('Senha Consumidor').then(function(existeGrupo){
			if(existeGrupo === true){
				h.grupoCampos('Senha Consumidor');
				h.checkbox('IDSOLSENHCONS', idsolsenhcons);
			}
			return existeGrupo;
		});	
	};
	this.transferirSaldo = function(idpertransald){
		return h.verificarGrupoCampos('Transferência de Saldo').then(function(existeGrupo){
			if(existeGrupo === true){
				h.grupoCampos('Transferência de Saldo');
				h.checkbox('IDPERTRANSALD', idpertransald);
			}
			return existeGrupo;
		});	
	};	
	this.importarConsumidor = function(idinaconsimparq){
		return h.verificarGrupoCampos('Importação de Consumidor').then(function(existeGrupo){
			if(existeGrupo === true){
				h.grupoCampos('Importação de Consumidor');
				h.checkbox('IDINACONSIMPARQ', idinaconsimparq);
			}
			return existeGrupo;
		});	
	};
	//executa o teste da subaba Tipo de consumidor por Unidade
	this.adicionarTipoConsumidorUnidade = function(cdtipoconsex, tipocons){
		z.component.footer.clickCenterActionByLabel('Adicionar');
		z.field.fieldFunctions.fill('CDTIPOCONSEX', cdtipoconsex);
		h.autoComplete('TIPOCONS', tipocons);
	};
	this.consultarSaldo = function(opcao, posicao){
		return h.verificarGrupoCampos('Consultar o Saldo').then(function(existeGrupo){
			if(existeGrupo === true){
				h.grupoCampos('Consultar o Saldo');
				h.checkbox('POS_0', opcao);
				h.selectNative('SEL_0', posicao);
				h.grupoCampos('Consultar o Saldo');
			}
			return existeGrupo;
		});	
	};
	this.consultarExtrato = function(opcao, posicao){
		return h.verificarGrupoCampos('Consultar Extrato').then(function(existeGrupo){
			if(existeGrupo === true){
				h.grupoCampos('Consultar Extrato');
				h.checkbox('POS_1', opcao);
				h.selectNative('SEL_1', posicao);
				h.grupoCampos('Consultar Extrato');
			}
			return existeGrupo;
		});	
	};
	this.carregarCartao = function(opcao, posicao){
		return h.verificarGrupoCampos('Carregar Cartão').then(function(existeGrupo){
			if(existeGrupo === true){
				h.grupoCampos('Carregar Cartão');
				h.checkbox('POS_2', opcao);
				h.selectNative('SEL_2', posicao);
				h.grupoCampos('Carregar Cartão');
			}
			return existeGrupo;
		});	
	};
	this.bloquearCartao = function(opcao, posicao){
		return h.verificarGrupoCampos('Bloquear Cartão').then(function(existeGrupo){
			if(existeGrupo === true){
				h.grupoCampos('Bloquear Cartão');
				h.checkbox('POS_3', opcao);
				h.selectNative('SEL_3', posicao);
				h.grupoCampos('Bloquear Cartão');
			}
			return existeGrupo;
		});	
	};
	this.faleConosco = function(opcao, posicao){
		return h.verificarGrupoCampos('Fale Conosco').then(function(existeGrupo){
			if(existeGrupo === true){
				h.grupoCampos('Fale Conosco');
				h.checkbox('POS_4', opcao);
				h.selectNative('SEL_4', posicao);
				h.grupoCampos('Fale Conosco');
			}
			return existeGrupo;
		});	
	};
	this.restricaoAlimentar = function(opcao, posicao){
		return h.verificarGrupoCampos('Restrição Alimentar').then(function(existeGrupo){
			if(existeGrupo === true){
				h.grupoCampos('Restrição Alimentar');
				h.checkbox('POS_5', opcao);
				h.selectNative('SEL_5', posicao);
				h.grupoCampos('Restrição Alimentar');
			}
			return existeGrupo;
		});	
	};
	this.atualizarCadastro = function(opcao, posicao){
		return h.verificarGrupoCampos('Atualizar Cadastro').then(function(existeGrupo){
			if(existeGrupo === true){
				h.grupoCampos('Atualizar Cadastro');
				h.checkbox('POS_6', opcao);
				h.selectNative('SEL_6', posicao);
				h.grupoCampos('Atualizar Cadastro');
			}
			return existeGrupo;
		});	
	};	
	this.trocarSenha = function(opcao, posicao){
		return h.verificarGrupoCampos('Trocar Senha').then(function(existeGrupo){
			if(existeGrupo === true){
				h.grupoCampos('Trocar Senha');
				h.checkbox('POS_7', opcao);
				h.selectNative('SEL_7', posicao);
				h.grupoCampos('Trocar Senha');
			}
			return existeGrupo;
		});	
	};	
	this.tabelaPreco = function(opcao, posicao){
		return h.verificarGrupoCampos('Tabela de Preço').then(function(existeGrupo){
			if(existeGrupo === true){
				h.grupoCampos('Tabela de Preço');
				h.checkbox('POS_8', opcao);
				h.selectNative('SEL_8', posicao);
				h.grupoCampos('Tabela de Preço');
			}
			return existeGrupo;
		});	
	};
	//testes da subaba Bônus Carga de Crédito
	this.bonusCargaCredito = function (recebeBonus, cargaCredito, bonusCredito, saldConsBonus, periodoBonus, recargasMes, tipoRece){
			//marca o desmarca o checkbox para receber bônus na realização dos pedidos
			h.checkbox('IDRECEBEBONUS', recebeBonus);
			//se for para marcar o checkbox e parametrizar os dados
			if(recebeBonus === 'S'){
				//verifica se o campos estão clicavel
				return h.campoClicavel('VRCARGACREDITO').then(function(clicavel){
					if(clicavel)
						return h.campoClicavel('VRBONUSCREDITO').then(function(clicavel){
							if(clicavel)
								return h.campoClicavel('VRSALDCONSBONUS').then(function(clicavel){
										if(clicavel)
											return h.campoClicavel('IDPERIODOBONUS').then(function(clicavel){
												if(clicavel)
													return h.campoClicavel('QTRECARGASMES').then(function(clicavel){
														if(clicavel)
															return h.campoClicavel('CDTIPORECE').then(function(clicavel){
																if(clicavel){
																	//se todos os campos estão clicáveis, insere os parâmetros nos campos
																	z.field.fieldFunctions.fill('VRCARGACREDITO', cargaCredito);
																	z.field.fieldFunctions.fill('VRBONUSCREDITO', bonusCredito);
																	z.field.fieldFunctions.fill('VRSALDCONSBONUS', saldConsBonus);
																	h.selectNative('IDPERIODOBONUS', periodoBonus);
																	$('#QTRECARGASMES').clear();
																	z.component.alert.isVisible().then(function(visivel){
																		if(visivel){
																			z.component.alert.getText().then(function(alerta){
																				console.log(alerta);	
																			});
																			z.component.alert.clickButton('OK');
																		}
																	});
																	z.field.fieldFunctions.fill('QTRECARGASMES', recargasMes);
																	h.autoComplete('CDTIPORECE', tipoRece);
																	return true;
																}
																else{
																	console.log('Campo CDTIPORECE não está clicável.');
																	return false;
																}
															});
														else{
															console.log('Campo QTRECARGASMES não está clicável.');
															return false;
														}
													});
												else{
													console.log('Campo IDPERIODOBONUS não está clicável.');
													return false;
												}
											});
										else{
											console.log('Campo VRSALDCONSBONUS não está clicável.');
											return false;
										}
								});
							else{
								console.log('Campo VRBONUSCREDITO não está clicável.');
								return false;
							}
						});
					else{
						console.log('Campo VRCARGACREDITO não está clicável.');
						return false;
					}
				});
			}
			//se for para desmarcar o checkbox
			else if(recebeBonus === 'N'){
				//verifica se o campos não estão clicaveis
				return h.campoClicavel('VRCARGACREDITO').then(function(clicavel){
					if(!clicavel)
						return h.campoClicavel('VRBONUSCREDITO').then(function(clicavel){
							if(!clicavel)
								return h.campoClicavel('VRSALDCONSBONUS').then(function(clicavel){
										if(!clicavel)
											return h.campoClicavel('IDPERIODOBONUS').then(function(clicavel){
												if(!clicavel)
													return h.campoClicavel('QTRECARGASMES').then(function(clicavel){
														if(!clicavel)
															return h.campoClicavel('CDTIPORECE').then(function(clicavel){
																if(!clicavel)
																	return true;
																else{
																	console.log('Campo CDTIPORECE está clicável.');
																	return false;
																}
															});
														else{
															console.log('Campo QTRECARGASMES está clicável.');							
															return false;
														}
													});
												else{
													console.log('Campo IDPERIODOBONUS está clicável.');
													return false;
												}
											});
										else{
											console.log('Campo VRSALDCONSBONUS está clicável.');
											return false;
										}
								});
							else{
								console.log('Campo VRBONUSCREDITO está clicável.');
								return false;
							}
						});
					else{
						console.log('Campo VRCARGACREDITO está clicável.');
						return false;
					}
				});
			}
	};
	this.excluirTipoConsumidorUnidade = function(){
		z.component.footer.clickCenterActionByLabel('Excluir');
		z.component.alert.isVisible().then(function (alerta) {
			if (alerta) {
				z.component.alert.clickButton('Sim');
			}
		});//promise
	}
	//executa os testes da aba integrações
	this.selecionarOperador = function(operador){
		//abre o widget de pesquisa e envia a pesquisa de operador para o grid
		browser.executeScript('$(\'span.open.zh-icon.zh-icon-more.zh-icon-no-border.zh-icon-color-white\').click();');
		browser.executeScript('$(\'span.action-icon.search-action-icon.zh-icon.zh-icon-search.zh-icon-no-border.zh-icon-color-white\').click();');
		browser.executeScript('$(\'div.floating-card-input > input\').click();');
        h.sendKeys('div.floating-card-input > input', operador);
        //seleciona no grid operador pesquisado 
		return h.selecionarRegistro('NMOPERADOR', operador);
	};
	this.editarOperador = function(codigoExterno){
		h.sendKeys('#CDEXTOPER', codigoExterno);
	};
	this.selecionarImposto = function(imposto){
		//abre o widget de pesquisa e envia a pesquisa de imposto para o grid
		browser.executeScript('$(\'span.open.zh-icon.zh-icon-more.zh-icon-no-border.zh-icon-color-white\').click();');
		browser.executeScript('$(\'span.action-icon.search-action-icon.zh-icon.zh-icon-search.zh-icon-no-border.zh-icon-color-white\').click();');
		browser.executeScript('$(\'div.floating-card-input > input\').click();');
        h.sendKeys('div.floating-card-input > input', imposto);
        //seleciona no grid operador pesquisado 
		return h.selecionarRegistro('NMIMPOSTO', imposto);
	};
	this.editarImposto = function(codigoExterno) {
		h.sendKeys('#CDEXTIMPOS', codigoExterno);
	};
	this.selecionarTipoRecebimento = function(tipoRecebimento){
		//abre o widget de pesquisa e envia a pesquisa de imposto para o grid
		browser.executeScript('$(\'span.open.zh-icon.zh-icon-more.zh-icon-no-border.zh-icon-color-white\').click();');
		browser.executeScript('$(\'span.action-icon.search-action-icon.zh-icon.zh-icon-search.zh-icon-no-border.zh-icon-color-white\').click();');
		browser.executeScript('$(\'div.floating-card-input > input\').click();');
        h.sendKeys('div.floating-card-input > input', tipoRecebimento);
        //seleciona no grid operador pesquisado 
		return h.selecionarRegistro('NMTIPORECE', tipoRecebimento);
	};
	this.editarTipoRecebimento = function(codigoExterno) {
		h.sendKeys('#CDEXTTIPORECE', codigoExterno);
	};
};

module.exports = new parametrosGerais();