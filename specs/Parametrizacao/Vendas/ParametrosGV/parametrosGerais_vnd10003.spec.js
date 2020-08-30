var ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
var z = new ZeedhiAPIConstructor(browser, protractor);
var paramGerais = require('../../../../page-objects/Parametrizacao/Vendas/ParametrosGV/parametrosGerais_vnd10003.po.js');
var loginPage = require('../../../../page-objects/login.po.js');
var h = require('../../../../page-objects/helper.po.js');
var j = require('../../../../json/leitorJson.po.js');

describe('Testes da tela Parâmetros Gerais', function(){
	//executa o login o sistema
	beforeAll(function(){
		loginPage.login();
		h.tela('Parâmetros Gerais');
	});
	//fecha alguma tela que ficou aberta após a execução dos it
	afterEach(function(){
		h.fechaTela();
	});
	//sai do sistema após a execução de todos it
	afterAll(function(){
		h.sairDoSistema();
	});

	/*Acessa a aba Gerais e executa os testes executa os testes de parametrização da aba Geral.*/
	it('Parametrização da aba Geral', function(){
		paramGerais.editarParametros('Gerais');
		expect(paramGerais.composicaoProdutos('Sim')).toBe(true);
		expect(paramGerais.mensagemUsuario('Previsão fora do limite. Favor verificar')).toBe(true);
		expect(paramGerais.diretorioCat52('c:\\CAT-52')).toBe(true);
		expect(paramGerais.diretorioTC('C:\\TC')).toBe(true);
		expect(paramGerais.tabelaPrecoCliente('Não')).toBe(true);
		expect(paramGerais.impostoProduto('Sim')).toBe(true);
		expect(paramGerais.diretorioNFCE('C:\\NFCE')).toBe(true);
		expect(paramGerais.atualizaProdutosBaseLocal('Sim')).toBe(true);
		expect(paramGerais.cancelaProdutosProduzidos('Sim')).toBe(true);
		expect(paramGerais.pesquisarConsumidorAtivo('Não')).toBe(true);
		expect(paramGerais.integracaoAudTax('466A4B11D4F34227E50FF51A6B9CA946B4871FB', '9999', '192.168.120.15', '3128')).toBe(true);
		expect(paramGerais.mensagemAutoAtendimento('Volte Sempre')).toBe(true);
		expect(paramGerais.textoAjudaNFPaulista('CPF')).toBe(true);
		expect(paramGerais.textoAjudaRefeicaoExtra('Adiciona Refeição')).toBe(true);
		expect(paramGerais.recebimentoQRCode(j.getValor('tipoRecebimento'))).toBe(true);
		expect(paramGerais.linkServidorImagens('https://midia.teknisa.com/files/')).toBe(true);
		expect(paramGerais.gerarCodigoOperador('Sim')).toBe(true);
		expect(paramGerais.salvarParametros()).toContain('Operação realizada com sucesso.');
	});
	/*executa os testes de parametrização da aba Fiscal*/
	it('Parametrização da aba Fiscal', function(){
		paramGerais.editarParametros('Fiscal');
		expect(paramGerais.gerarArquivoMagnetico('C:\\SINTEGRA')).toBe(true);
		expect(paramGerais.salvarParametros()).toContain('Operação realizada com sucesso.');
	});
	/*executa os testes de parametrização da aba Integração Site-Delivery*/
	//it('Parametrização da aba Integração Site-Delivery', function(){
	//	paramGerais.integraSiteDelivery('14852931000122at', 'VENDEDOR LOJA SAVASSI', 'Validação por Bairro');
	//});
	/*executa os testes de parametrização da aba Configurações de Email*/
	it('Parametrização da aba Configurações de Email', function(){
		paramGerais.editarParametros('Configurações de Email');
		expect(paramGerais.dadosSMTP('smtp.teknisa.com', '9090', 'teknisa@tecfood.com', 'Com Autenticação', 'teknisa', 'SSL')).toBe(true);
		expect(paramGerais.dadosFaleConosco('faleconosco@teknisa.com')).toBe(true);
		expect(paramGerais.salvarParametros()).toContain('Operação realizada com sucesso.');
	});
	/*executa o teste de conexão stmp da aba configuração de email*/
	it('Teste de conexão SMTP', function(){
		expect(paramGerais.testarSMTP(j.getValor('email'))).toContain('Operação realizada com sucesso.');
	});
	/*executa o teste de parametrização da aba Contrato/Termo Adesão*/
	it('Parametrização da aba Contrato/Termo Adesão', function(){
		paramGerais.editarParametros('Contrato/ Termo Adesão');
		paramGerais.contratoTermoAdesao();
		expect(paramGerais.salvarParametros()).toContain('Operação realizada com sucesso.');
	});
	/*Acessa a aba Produto e executa os testes das telas incluidas nesta aba.
	executa os testes de parametrização da aba Parâmetros Gerais Produto.*/
	it('Parametrização da aba Gerais Produto', function(){
		//abre a aba Produto para edição dos parâmetros
		h.navegar('Produto');
		expect(paramGerais.filtrarProduto(j.getValor('produto'))).toBe(true);
		paramGerais.editarParametros('Parâmetros Gerais Produto');
		paramGerais.parametrosProduto('Sim', '', '000001', 'LANCHE', 'Sim', 'Não', 'Normal', '0', '1', 'Sim', 'Imprime Agrupado', 'Não', '', '', '', '', '', 'Grama', '', 'Sem parte decimal', 'Colher(es) de sopa', 'Terceiros', 'Opção de lanche');
		expect(paramGerais.salvarParametros()).toBe('Operação realizada com sucesso.');
	});
	/*executa os testes de parametrização da tela Alteração Automática*/
  	it('Alteração automática de produto', function(){
  		//abre a aba Produto para edição dos parâmetros
  		h.navegar('Produto');
  		//filtra o produto existente da arvóres de produto e depois fecha swipe
  		paramGerais.filtrarProduto(j.getValor('produto'));
  		h.fechaTela();
  		
  		//seleciona a opção alteração automática, o intervalo de produtos e as informações a ser cadastradas
  		paramGerais.alteracaoAutomatica();
  		expect(paramGerais.selecionarIntervalo([j.getValor('produtoInicialcadLoja'), j.getValor('produtoFinalcadLoja')])).toBe(true);
  		paramGerais.selecionarParametrosProdutos('Sim', 'Sim', '0,02', 'Sim', '0', 'Sim', 'Imprime Agrupado');
  		expect(paramGerais.salvarParametros()).toBe('Operação realizada com sucesso.');
  		
  		//seleciona a opção alteração automática, a lista de produtos e as informações a serem cadastradas
  		paramGerais.alteracaoAutomatica();
  		expect(paramGerais.selecionarLista(j.getValor('produtoInicialcadLoja'))).toBe(true);
  		expect(paramGerais.selecionarLista(j.getValor('produtoFinalcadLoja'))).toBe(true);
  		paramGerais.selecionarParametrosProdutos('Sim', 'Sim', '0,02', 'Sim', '0', 'Sim', 'Imprime Agrupado');
  		expect(paramGerais.salvarParametros()).toBe('Operação realizada com sucesso.');  		
  	});
	/*executa os testes de parametrização da aba Percentual para Cálculo do preço do produto*/
	it('Parametrização da aba Percentual Cálculo Preço do Produto - Adicionar percentual de produto', function(){
		//abre a aba Produto para edição dos parâmetros
		h.navegar('Produto');
		//filtra o produto existente da arvóres de produto e depois fecha swipe
  		paramGerais.filtrarProduto(j.getValor('produto'));
  		h.fechaTela();
  		//alterna para subaba Percentual para Cálculo do preço do produto para edição dos parâmetros
  		h.navegar('Percentual para Cálculo do Preço do Produto');
  		//filtra a unidade existente para executar os cálculos
  		paramGerais.filtrarUnidade(j.getValor('filial'));
  		
  		//adiciona um novo percentual para um intervalo de produtos
  		paramGerais.adicionarPercentual('002');
  		expect(paramGerais.selecionarIntervalo([j.getValor('produtoInicialcadLoja'), j.getValor('produtoFinalcadLoja')])).toBe(true);
  		expect(paramGerais.salvarParametros()).toBe('Operação realizada com sucesso.');

  		//adiciona um novo percentual para uma lista de produtos
		paramGerais.adicionarPercentual('002');
		expect(paramGerais.selecionarLista(j.getValor('produto2'))).toBe(true);
  		expect(paramGerais.selecionarLista(j.getValor('produto3'))).toBe(true);
  		expect(paramGerais.salvarParametros()).toBe('Operação realizada com sucesso.');
  	});
	/*executa os testes de exclusão da aba Percentual para Cálculo do preço do produto*/
  	it('Parametrização da aba Percentual Cálculo Preço do Produto - Excluir percentual de produto', function(){
  		//filtra e verifica se o percentual do produto foi cadastrado
  		expect(paramGerais.filtrarProduto(j.getValor('produtoInicialcadLoja'))).toBe(true);
  		//remove o percentual dos preços para os produtos cadastrados
		paramGerais.excluirCalculoPrecoProduto();
		expect(h.aguardaMensagem()).toBe('Excluído com sucesso!');

		//filtra e verifica se o percentual do produto foi cadastrado
  		expect(paramGerais.filtrarProduto(j.getValor('produtoFinalcadLoja'))).toBe(true);
  		//remove o percentual dos preços para os produtos cadastrados
  		paramGerais.excluirCalculoPrecoProduto();
		expect(h.aguardaMensagem()).toBe('Excluído com sucesso!');

		//filtra e verifica se o percentual do produto foi cadastrado
  		expect(paramGerais.filtrarProduto(j.getValor('produto2'))).toBe(true);
  		//remove o percentual dos preços para os produtos cadastrados
		paramGerais.excluirCalculoPrecoProduto();
		expect(h.aguardaMensagem()).toBe('Excluído com sucesso!');

		//filtra e verifica se o percentual do produto foi cadastrado
  		expect(paramGerais.filtrarProduto(j.getValor('produto3'))).toBe(true);
  		//remove o percentual dos preços para os produtos cadastrados
  		paramGerais.excluirCalculoPrecoProduto();
		expect(h.aguardaMensagem()).toBe('Excluído com sucesso!');
  	});
	/*Acessa a aba Fidelidade e executa os testes*/
	it('Parametrização da aba Fidelidade', function(){
		paramGerais.editarParametros('Fidelidade');
		paramGerais.fidelidade(j.getValor('cliente'), j.getValor('centroCusto'), j.getValor('tipoConsumidor'));
		expect(paramGerais.salvarParametros()).toBe('Operação realizada com sucesso.');
	});
	/*Acessa a aba Banco e executa os testes*/
	it('Parametrização da aba Banco', function(){
		//abre a aba banco, verifica se o banco está cadastrado e seleciona no grid
		h.navegar('Banco');
		expect(paramGerais.selecionarBanco(j.getValor('cdbanco'))).toBe(true);
		//após selecionar o banco habilita a edição dos parâmetros
		paramGerais.editarParametros();
		expect(paramGerais.inscricaoBanco(j.getValor('inscricaoDoBanco'))).toBe(true);		
		expect(paramGerais.criptografiaVendaSite(j.getValor('chaveDoBanco'))).toBe(true);		
		expect(paramGerais.urlBancoVendaSite(j.getValor('urlDoBanco'))).toBe(true);
		expect(paramGerais.salvarParametros()).toBe('Operação realizada com sucesso.');
	});
	/*Acessa a aba Cliente e executa os testes*/
	it('Parametrização da aba Cliente', function(){
		//abre a aba cliente e filtra a unidade
		h.navegar('Cliente');
		paramGerais.filtrarUnidade(j.getValor('filial'));
		expect(paramGerais.selecionarCliente(j.getValor('cliente'))).toBe(true);
		//aguarda abrir a tela cliente e habilita a edição dos parâmetros
		paramGerais.editarParametros();
		//define a tabela de preço, nome do site, se vai zerar o saldo mensal, recalculo de saldo mensal, criptografia de crachá e hora do recálculo
		paramGerais.selecionarParametrosCliente(j.getValor('tabelaDePreco'), 'Nome Fantasia', j.getValor('zeraSaldoMensal'), 'Não', 'Não Utiliza', '12:00');
		expect(paramGerais.salvarParametros()).toBe('Operação realizada com sucesso.');
	});
	/*Acessa a aba Cliente e parametriza as tabelas de preços*/
	it('Parametrização da aba Cliente - Tabela de preços', function(){
		//abre a aba cliente e filtra a unidade
		h.navegar('Cliente');
		paramGerais.filtrarUnidade(j.getValor('filial'));
		expect(paramGerais.selecionarCliente(j.getValor('cliente'))).toBe(true);
		//aguarda abrir a tela cliente e muda para aba Tabela de Preço
		h.navegar('Tabelas de Preço');
		//seleciona uma unidade existente que o cliente está cadastrado
		expect(paramGerais.selecionarUnidadeCliente(j.getValor('filial'))).toBe(true);
		//aguarda abrir a tela tabela de preço da unidade e habilita para edição dos parametros
		paramGerais.editarParametros();
		paramGerais.selecionarTabelaPreco(j.getValor('tabelaDePreco'));
		expect(paramGerais.salvarParametros()).toBe('Operação realizada com sucesso.');
		h.fechaTela();
	});
	/*Acessa a aba Pagamento Online e executa os testes das telas incluídas nesta aba
	executa os testes de parametrização da aba Geral*/
	it('Parametrização da aba Pagamento Online - Geral', function(){
		//abre a aba Pagamento Online e habilita o modo de edição dos parâmetros
		paramGerais.editarParametros('Pagamento Online');
		expect(paramGerais.integracaoSitef(j.getValor('loja'), '14852931000122at')).toBe(true);
		expect(paramGerais.salvarParametros()).toBe('Operação realizada com sucesso.');
	});
	//executa os testes de parametrização da aba Por Unidade
	it('Parametrização da aba Pagamento Online - Unidade', function(){
		//abre a aba Pagamento Online e muda para subaba unidade e filtra uma unidade existente
		h.navegar('Pagamento Online');
		h.navegar('Unidade');
		paramGerais.filtrarUnidade(j.getValor('filial'));
		//seleciona uma unidade existente e habilita a edição dos parâmetros
		expect(paramGerais.selecionarUnidade(j.getValor('filial'))).toBe(true);
		paramGerais.editarParametros();
		//edita os parametros do pagamento online por unidade
		paramGerais.pagOnlineUnidade(j.getValor('loja'), '01051990');
		expect(paramGerais.salvarParametros()).toBe('Operação realizada com sucesso.');
	});
	/*executa os testes de parametrização da aba Bandeira e-Sitef*/
	it('Parametrização da aba Banderia e-Sitef por Unidade - Inclusão de bandeiras', function(){
		//abre a aba Pagamento Online e muda para subaba Bandeira e-Sitef
		h.navegar('Pagamento Online');
		h.navegar('Unidade');
		//filtra a unidade e seleciona a aba Bandeira e-Sitef
		paramGerais.filtrarUnidade(j.getValor('filial'));
		expect(paramGerais.selecionarUnidade(j.getValor('filial'))).toBe(true);
		h.click('body > span > section > section > div.default-window > section.zh-swipe-container.zh-swipe-right.open > div > div:nth-child(3) > section > header > div > div > ul > li:nth-child(2) > label > a');
		//cadastra uma nova bandeira do eSitef da unidade
		paramGerais.adicionarBandeiraUnidade(j.getValor('cdfilial'), j.getValor('tipoRecebimento3'), '004', j.getValor('tipoRecebimento3'));	
		expect(paramGerais.salvarParametros()).toBe('Operação realizada com sucesso.');
		//testa se a tela permite cadastrar bandeiras eSitef com campos obrigatórios em branco
		paramGerais.adicionarBandeiraUnidade(j.getValor('cdfilial'), '', '', '');
		expect(paramGerais.salvarParametros()).toBe(false);
		expect(h.campoObrigatorio()).toBe(true);
	});
	it('Parametrização da aba Banderia e-Sitef por Unidade - Exclusão de bandeiras', function(){
		//abre a aba Pagamento Online e muda para subaba Bandeira e-Sitef
		h.navegar('Pagamento Online');
		h.navegar('Unidade');
		//filtra a unidade e seleciona a aba Bandeira e-Sitef
		paramGerais.filtrarUnidade(j.getValor('filial'));
		expect(paramGerais.selecionarUnidade(j.getValor('filial'))).toBe(true);
		h.click('body > span > section > section > div.default-window > section.zh-swipe-container.zh-swipe-right.open > div > div:nth-child(3) > section > header > div > div > ul > li:nth-child(2) > label > a');
		expect(paramGerais.selecionarBandeira(j.getValor('cdfilial'))).toBe(true);
		paramGerais.excluirBandeiraUnidade();
		expect(h.aguardaMensagem()).toBe('Excluído com sucesso!');
	});
	/*executa os testes de parametrização da aba Bandeiras e-Sitef*/
	it('Bandeira e-Sitef', function(){
		h.navegar('Pagamento Online');
		h.navegar('Bandeiras e-SiTef');
		//testa o cadastro de bandeira eSitef
		paramGerais.adicionarBandeiraEsitef(j.getValor('tipoRecebimento3'), '003', j.getValor('tipoRecebimento3'));
		expect(paramGerais.salvarParametros()).toBe('Operação realizada com sucesso.');
		//testa se a tela permite cadastrar bandeira com campos em branco
		paramGerais.adicionarBandeiraEsitef('','','');
		expect(paramGerais.salvarParametros()).toBe(false);
		expect(h.campoObrigatorio()).toBe(true);
	});
	/**/
	it('Excluir Bandeira e-Sitef', function(){
		h.navegar('Pagamento Online');
		h.navegar('Bandeiras e-SiTef');
		expect(paramGerais.selecionarBandeira(j.getValor('tipoRecebimento3'))).toBe(true);
		paramGerais.excluirBandeiraEsitef(j.getValor('tipoRecebimento3'));
		expect(h.aguardaMensagem()).toBe('Excluído com sucesso!');
	});
	/*Acessa a aba Tipo de Consumidor e executa os testes das telas incluidas nesta aba*/
	it('Tipo de Consumidor', function(){
		h.navegar('Tipo de Consumidor');
		expect(paramGerais.selecionarTipoConsumidor(j.getValor('tipoConsumidor'))).toBe(true);
		paramGerais.editarParametros();
		expect(paramGerais.importarDadosCatraca('S')).toBe(true);
		expect(paramGerais.tipoExtrato('S')).toBe(true);;
		expect(paramGerais.desabilitaTeclado('N')).toBe(true);;
		expect(paramGerais.senhaConsumidor('S')).toBe(true);;
		expect(paramGerais.transferirSaldo('S')).toBe(true);;
		expect(paramGerais.importarConsumidor('S')).toBe(true);
		expect(paramGerais.salvarParametros()).toBe('Operação realizada com sucesso.');
	});
	/*executa os testes de parametrização da aba Tipo de Consumidor por Unidade*/
	it('Tipo de Consumidor por Unidade', function(){
		h.navegar('Tipo de Consumidor');
		h.navegar('Tipo de Consumidor por Unidade');
		paramGerais.filtrarUnidade(j.getValor('filial'));
		paramGerais.adicionarTipoConsumidorUnidade(j.getValor('codigoExterno'), j.getValor('tipoConsumidor'));
		expect(paramGerais.salvarParametros()).toBe('Operação realizada com sucesso.');
	});
	/*executa os testes de parametrização da aba Tipo de consumidor por Unidade*/
	it('Editar Tipo de Consumidor por Unidade', function(){
		h.navegar('Tipo de Consumidor');
		h.navegar('Tipo de Consumidor por Unidade');
		paramGerais.filtrarUnidade(j.getValor('filial'));
		expect(paramGerais.selecionarTipoConsumidor(j.getValor('tipoConsumidor'))).toBe(true);
		paramGerais.editarParametros('Controle de acesso ao site - Snack Tech');
		//testa a parametrização de todas posições marcadas
		expect(paramGerais.consultarSaldo('S','1')).toBe(true);
		expect(paramGerais.consultarExtrato('S','2')).toBe(true);
		expect(paramGerais.carregarCartao('S','3')).toBe(true);
		expect(paramGerais.bloquearCartao('S','4')).toBe(true);
		expect(paramGerais.faleConosco('S','5')).toBe(true);
		expect(paramGerais.restricaoAlimentar('S','6')).toBe(true);
		expect(paramGerais.atualizarCadastro('S','7')).toBe(true);
		expect(paramGerais.trocarSenha('S','8')).toBe(true);
		expect(paramGerais.tabelaPreco('S','9')).toBe(true);
		expect(paramGerais.salvarParametros()).toBe('Operação realizada com sucesso.');
	});
	//executa os testes de parametrização da tela Bônus Carga de Crédito
	it('Bônus Carga de Crédito', function(){
		h.navegar('Tipo de Consumidor');
		h.navegar('Tipo de Consumidor por Unidade');
		paramGerais.filtrarUnidade(j.getValor('filial'));
		expect(paramGerais.selecionarTipoConsumidor(j.getValor('tipoConsumidor'))).toBe(true);
		//testa a parametrização marcando o campo de utilização do bônus e inserindo valores nos campos obrigatórios
		paramGerais.editarParametros('Bônus Carga de Crédito');
		expect(paramGerais.bonusCargaCredito('S','12','2','12','Mensal','5',j.getValor('tipoRecebimento'))).toBe(true);
		expect(paramGerais.salvarParametros()).toBe('Operação realizada com sucesso.');
		//testa a parametrização desmarcando o campo de utilização do bônus e limpando todos os campos
		paramGerais.editarParametros('Bônus Carga de Crédito');
		expect(paramGerais.bonusCargaCredito('N','','','','','','')).toBe(true);
		expect(paramGerais.salvarParametros()).toBe('Operação realizada com sucesso.');
		//testa a parametrização deixando os campos obrigatórios em branco
		paramGerais.editarParametros('Bônus Carga de Crédito');
		expect(paramGerais.bonusCargaCredito('S','','','','','','')).toBe(true);
		expect(paramGerais.salvarParametros()).toBe(false);
		expect(h.campoObrigatorio()).toBe(true);
	});
	//executa o teste de exclusão de um tipo de consumidor por unidade
	it('Excluir Tipo de Consumidor por Unidade', function(){
		h.navegar('Tipo de Consumidor');
		h.navegar('Tipo de Consumidor por Unidade');
		paramGerais.filtrarUnidade(j.getValor('filial'));
		expect(paramGerais.selecionarTipoConsumidor(j.getValor('tipoConsumidor'))).toBe(true);
		paramGerais.excluirTipoConsumidorUnidade(j.getValor('tipoConsumidor'));
		expect(h.aguardaMensagem()).toBe('Excluído com sucesso!');
	});
	//executa o teste de parametrização da aba integrações
	it('Parametrização da aba Integrações - Código externo do operador', function(){
		h.navegar('Integrações');
		h.navegar('Operador');
		//testa a parametrização da subaba operador pesquisa e seleciona um operador existente
		expect(paramGerais.selecionarOperador(j.getValor('operador'))).toBe(true);
		//edita o código externo do operador
		paramGerais.editarParametros();
		paramGerais.editarOperador(j.getValor('codigoExterno'));
		expect(paramGerais.salvarParametros()).toBe('Registros Salvos com Sucesso');
	});
	//executa o teste de parametrização da subaba imposto
	it('Parametrização da aba Integrações - Código externo do imposto', function(){
		h.navegar('Integrações');
		h.navegar('Imposto');
		//testa a parametrização da subaba imposto pesquisa e seleciona um imposto existente
		expect(paramGerais.selecionarImposto(j.getValor('imposto'))).toBe(true);
		//edita o código externo do imposto
		paramGerais.editarParametros();
		paramGerais.editarImposto(j.getValor('codigoExterno'));
		expect(paramGerais.salvarParametros()).toBe('Registros Salvos com Sucesso');		
	});
	//executa o teste de parametrização da subaba tipoRecebimento
	it('Parametrização da aba Integrações - Código externo do tipo de recebimento', function(){
		h.navegar('Integrações');
		h.navegar('Tipo de Recebimento');
		//testa a parametrização da subaba imposto pesquisa e seleciona um imposto existente
		expect(paramGerais.selecionarTipoRecebimento(j.getValor('tipoRecebimento'))).toBe(true);
		//edita o código externo do imposto
		paramGerais.editarParametros();
		paramGerais.editarTipoRecebimento(j.getValor('codigoExterno'));
		expect(paramGerais.salvarParametros()).toBe('Registros Salvos com Sucesso');		
	});
});