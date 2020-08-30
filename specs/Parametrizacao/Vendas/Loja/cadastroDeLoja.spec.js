var ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
var z = new ZeedhiAPIConstructor(browser, protractor);
var loginPage = require('../../../../page-objects/login.po.js');
var loja = require('../../../../page-objects/Parametrizacao/Vendas/Loja/cadastroLoja.po.js');
var h = require('../../../../page-objects/helper.po.js');
var j = require('../../../../json/leitorJson.po.js');

describe('Testes da tela Cadastro de Loja', function () {
	//gera um codigo aleatório para nova loja
	var cdNovaLoja = Math.floor(Math.random() * 65536);
	var nmNovaLoja = j.getValor('novaLoja');

	beforeAll(function(){
		loginPage.login();
		h.tela('Cadastro de Loja');
	});

	beforeEach(function(){
		loja.selecionarUnidade(j.getValor('cdfilial'));
		loja.selecionarLoja(nmNovaLoja);
	});

	afterEach(function(){
		h.fechaTela();
	});
	
	afterAll(function(){
		h.sairDoSistema();
	});
	
	it('Cadastra uma nova loja', function(){
		loja.cadastrarLoja(cdNovaLoja, j.getValor('novaLoja'));
		expect(h.aguardaMensagem()).toBe('Operação realizada com sucesso.');
	});

	it('Editar Nome da Loja', function(){
		nmNovaLoja = j.getValor('nomeAlteracaoCadLoja');
		expect(loja.editarLoja(j.getValor('nomeAlteracaoCadLoja'))).toBe('Operação realizada com sucesso.');
	});

	it('Parametrização da aba Produtos por Loja', function(){
		//filtra os produtos da loja
		expect(loja.produtosLoja(j.getValor('nivelProdutos'))).toBe(true);
		
		//executa a parametrização das impressoras por intervalo de produtos
		expect(loja.adicionarProdutos(j.getValor('impressoraDoPuxa'), j.getValor('impressoraProducao'), j.getValor('impressoraProducao2'), 'Sim', j.getValor('produtoInicialcadLoja'), j.getValor('produtoFinalcadLoja'), 'Não')).toBe('Operação realizada com sucesso.');
		h.fechaTela();
		
		//executa a parametrização das impressoras pela lista de produtos
		loja.selecionarLoja(j.getValor('nomeAlteracaoCadLoja'));
		expect(loja.adicionarProdutos(j.getValor('impressoraDoPuxa'), j.getValor('impressoraProducao'), j.getValor('impressoraProducao2'), 'Sim', j.getValor('produtoInicialcadLoja'), j.getValor('produtoFinalcadLoja'), 'Sim')).toBe('Operação realizada com sucesso.');
	});

	it('Cadastrar impressoras por ambiente automaticamente', function(){
		expect(loja.cadastrarImpressoraAmbiente(j.getValor('configuracaoTela'), j.getValor('ambienteTela'), j.getValor('nomeImpressora'), 'Todos', j.getValor('produtoInicialcadLoja'), j.getValor('produtoFinalcadLoja'), j.getValor('nivelProdutos'))).toBe('Cadastro automático realizado com sucesso.');
	});

	it('Parametrização da aba Impressoras por loja', function(){
		loja.cadastrarImpressora(j.getValor('modeloImpressora'), j.getValor('nomeImpressora'), j.getValor('portaImpressora'), j.getValor('enderecoImpressora'), j.getValor('enderecoPerifericos'));
		expect(h.aguardaMensagem()).toBe('Operação realizada com sucesso.');
	});

	it('Parametrização da aba Mapeamento de Portas', function(){
		loja.cadastrarMapeamento(j.getValor('portaImpressora'), j.getValor('enderecoImpressora'));
		expect(h.aguardaMensagem()).toBe('Operação realizada com sucesso.');
		h.fechaTela();
	});

	it('Parametrização da aba Frente de Caixa 1', function(){
		//parametriza a sub aba frente de caixa (1)
		loja.frenteDeCaixa('Cobra taxa de serviço', '10', '0', '0', 'Acrescimo no Cupom', 'Acrescimo no Cupom', 'Sim', 'Sim', 'Sim', j.getValor('vendedor'), 'Não', 'Não', 'Sim', 'Não', j.getValor('produto'), j.getValor('produto2'));
		expect(h.aguardaMensagem()).toBe('Operação realizada com sucesso.');
	});

	it('Parametrização da aba Frente de Caixa 2', function(){	
		//parametriza a sub aba frente de caixa (2)
		loja.frenteDeCaixa2('Sim', j.getValor('grupoPedido'), 'Depois do pedido', 'Sim', j.getValor('grupoPedido'), 'Sim', j.getValor('grupoPedido'), 'Sim', j.getValor('grupoPedido'), j.getValor('grupoPedido'), 'Sim');
		expect(h.aguardaMensagem()).toBe('Operação realizada com sucesso.');
	});

	it('Parametrização da aba Frente de Caixa 3', function(){			
		//parametriza a sub aba frente de caixa (3)
		loja.frenteDeCaixa3(Math.floor(Math.random() * 99), Math.floor(Math.random() * 99), 'Sim', 'Sim', 'Sim', 'Sim', Math.floor(Math.random() * 999), 'Sim', 'Sim', 'Não', Math.floor(Math.random() * 999), 'Não solicita o garçom na realização de pedidos', 'Sim', 'Sim', 'Sim');
		expect(h.aguardaMensagem()).toBe('Operação realizada com sucesso.');
	});	

	it('Parametrização do Limite de observações', function(){					
		//parametriza a sub aba Limite de observações
		expect(loja.limiteObservacoes(j.getValor('grupoPedido'), ' 0', ' 99')).toBe('Grupo de observação não foi cadastrado.');
	});	

	it('Parametrização da comanda', function(){
		loja.parametrosComanda('Não', 'Não', 'Não', 'Não', 'Não', j.getValor('mesaPadrao'), 'Permite reutilização do mesmo número de comanda no mesmo dia', 'Não');
		expect(h.aguardaMensagem()).toBe('Operação realizada com sucesso.');
	});

	it('Parametrização da aba gestão de vendas', function(){
		loja.gestaoVendas(j.getValor('tabelaDePreco'), j.getValor('almoxarifado'), j.getValor('localEstoque'), j.getValor('tipoOperacao'), j.getValor('ipPrimario'), j.getValor('ipSecundario'));
		expect(h.aguardaMensagem()).toBe('Operação realizada com sucesso.');
	});

	it('Parametrização da aba TEF', function(){
		loja.tef('Sim', 'Sim', 'Sim');
		expect(h.aguardaMensagem()).toBe('Operação realizada com sucesso.');
	});

	it('Excluir mapeamento de portas', function(){
		loja.excluirMapeamento(j.getValor('portaImpressora'));
		expect(h.aguardaMensagem()).toBe('Excluído com sucesso!');
	});

	it('Excluir as impressoras por loja', function(){
		loja.excluirImpressora(j.getValor('nomeImpressora'));
		expect(h.aguardaMensagem()).toBe('Excluído com sucesso!');
	});

	it('Excluir impressoras automaticamente', function(){
		expect(loja.excluirImpressoraAmbiente(j.getValor('configuracaoTela'), j.getValor('ambienteTela'),  j.getValor('nomeImpressora'), j.getValor('nivelProdutos'))).toBe('Operação realizada com sucesso.');
	});
	
	it('Desativar Cadastro de Loja', function() {
		loja.desativarLoja();
		expect(h.aguardaMensagem()).toContain('Loja Desativada com Sucesso!');
	});
});