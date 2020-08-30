var ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
var z = new ZeedhiAPIConstructor(browser, protractor);
var paramGerais = require('../../../../page-objects/Parametrizacao/Vendas/ParametrosGV/parametrosGerais_vnd10003.po.js');
var loginPage = require('../../../../page-objects/login.po.js');
var funcoes = require('../../../../page-objects/helper.po.js');

describe('Testes da tela Parâmetros Gerais', function(){
	//executa o login o sistema
	beforeEach(function(){
		loginPage.login();
		funcoes.tela('Parâmetros Gerais');
	});
    //sai do sistema após a execução dos it
    afterEach(function(){
    	//funcoes.fechaTela();
    	funcoes.sairDoSistema();
    });
	/*Acessa a aba Gerais e executa os testes das telas incluidas nesta aba.
	executa os testes de parametrização da aba Geral.
	parâmetros: opção{Sim|Não} de cadastrar a composição, mensagem de limite de aprovação, destino da CAT52, destino dos arquivos TC, opção{Sim|Não} de utilizar tabela preço por cliente, opção{Sim|Não} de bloquear vendas de produtos sem impostos, destino dos arquivos NFCE, opção{Sim|Não} de controle de produtos e opção{Sim|Não} de pesquisar consumidores ativos.*/
	it('Parâmetros Geral', function(){
		expect(paramGerais.geral('Sim', 'Previsão fora do limite. Favor verificar', 'c:\\CAT-52', 'C:\\TC', 'Não', 'Sim', 'C:\\NFCE', 'Sim', 'Sim', 'Não', '466A4B11D4F34227E50FF51A6B9CA946B4871FB', '9999', '192.168.120.15', '3128')).toContain('Operação realizada com sucesso.');
	});
	/*executa os testes de parametrização da aba Fiscal.
	parâmetros: diretório de geração do arquivo magnético do SINTEGRA*/
	fit('Parâmetros Fiscal', function(){
		expect(paramGerais.fiscal('C:\\SINTEGRA')).toContain('Operação realizada com sucesso.');
	});
	/*executa os testes de parametrização da aba Integração Site-Delivery.
	parâmetros: código da loja e-Sitef, vendedor padrão do site Delivery, validação do atendimento do site Delivery.*/
	it('Parâmetros Integração Site-Delivery', function(){
		paramGerais.integraSiteDelivery('14852931000122at', 'VENDEDOR LOJA SAVASSI', 'Validação por Bairro');
	});
	/*executa os testes de parametrização da aba Configurações de Email. 
	parâmetros: Servidor SMTP, porta do servidro SMTP, email para envio das mensagens, autenticação, senha do email, criptografia e email do fale conosco.*/
	it('Parâmetros Configurações de Email', function(){
		expect(paramGerais.configuraEmail('smtp.teknisa.com', '9090', 'teknisa@tecfood.com', 'Com Autenticação', 'teknisa', 'SSL', 'faleconosco@teknisa.com')).toBe('Operação realizada com sucesso.');
	});
	/*Acessa a aba Produto e executa os testes das telas incluidas nesta aba.
	executa os testes de parametrização da aba Parâmetros Gerais Produto.
	parâmetros: nível de produto, o nome do produto, opção{Sim|Não} de pesar, opção{Sim|Não} de tara, código de barras, nome abreviado, opção{Sim|Não} de cobrar tx serviço, opção{Sim|Não} controlar refil, opção{Extra|Normal|Básico} produto deb.consumidor, grupo combinado, codigo do teclado, opção{Sim|Não} de imprimir produto, opção{Imprimir Agrupado|Imprime 1 por vez} de imprimir na produção, opção{Sim|Não} local impressão, dados fornecedor, validade, inf.adicionais, qtde porção, valor mínimo para vendas débito consumidor, opção{Grama|Mililitro|Unidade} da unidade de porção, parte inteira da medida, opção{Sem parte decimal|Parte decimal de '1/4'|Parte decimal de '1/3'|Parte decimal de '1/2'|Parte decimal de '2/3'|Parte decimal de '3/4'} parte decimal da medida, opção{Colher(es) de sopa|Colher(es) de sopa|Colher(es) de chá|Unidade(s)|Fatia(s)|Pedaço(s)}medida caseira, opção{Terceiros|Própria} tipo de produção e descrição do produto de venda.*/
	it('Parâmetros Gerais Produto', function(){
		expect(paramGerais.produto('REFEICAO DA SEMANA','Sim','','000001','REF.SEMANA','Sim','Não','Normal','0','1','Sim','Imprime Agrupado','Não','','','','','','Grama','','Sem parte decimal','Colher(es) de sopa','Terceiros','Refeição da semana')).toBe('Operação realizada com sucesso.');
	});
	/*executa os testes de parametrização da tela Atualização Automática.
	parâmetros: produto inicial, produto final, opção{Sim|Não} de pesar produto, opção{Sim|Não} de tara, valor da tara, opção{Sim|Não} de taxa de serviço, código{0..9} do grupo produto combinado, opção{Sim|Não} imprimir produto, opção{Imprime Agrupado|Imprime 1 por vez} de imprimir na produção.*/
    it('Atualiza Produto', function(){
    	expect(paramGerais.atualizaProduto('REFEICAO DA SEMANA','REFEICAO VEGANA','Sim','Sim','0,02','Sim','0','Sim','Imprime Agrupado')).toBe('Operação realizada com sucesso.');
    }, );
    /*executa os testes de parametrização da aba Percentual para Cálculo do preço do produto.
    parâmetros: unidade, percentual, produto inicial e o produto final.*/
	it('Percentual Cálculo Preço do Produto', function(){
    	expect(paramGerais.calculoPrecoProduto('0001','20','REFEICAO DA SEMANA','REFEICAO VEGANA')).toBe('Operação realizada com sucesso.');
    });
	/*Acessa a aba Imposto do produto e executa os testes das telas incluidas nesta aba.
	executa os testes de parametrização da aba Impostos.
	parâmetros: sigla do imposto, tipo de imposto*/
	it('Imposto(Tela retirada)', function(){
    	paramGerais.imposto('ICMS', 'ICMS');
    });
	/*executa os testes de parametrização da aba Impostos do Produto.
	parâmetros: unidade, nível inicial, código do produto inicial, código do produto final, código do imposto, alíquota do imposto, percentual de redução, modalidade base calculo, incide pis/cofins, alíquota ibpt(federal),alíquota ibpt(estadual), código CFOP, código CST/CSOSN, código CST(PIS/COFINS), alíquota PIS e alíquota COFINS.
	resultados: Primeiro teste seleciona dentro do intervalo os produtos inicial e produto final para o cadastro, após salvar deve receber a mensagem 'Ok'.
	Segundo teste seleciona dentro da lista o produto inicial e produto final para o cadastro, após salvar deve receber a mensagem 'Ok'.*/
	it('Impostos do Produto(Tela retirada)', function(){
		expect(paramGerais.impostoProduto('0001','1','1.01.01.000.00','1.01.12.050.01','00','18','0','','Sim','0','0','5102','40','01','0.65','3.00','intervalo')).toBe('Ok');
		expect(paramGerais.impostoProduto('0001','1','1.01.01.000.00','1.01.12.050.01','00','18','0','','Sim','0','0','5102','40','01','0.65','3.00','lista')).toBe('Ok');
	});
	/*executa os testes de exportação de impostos da aba ações.
	parâmetros: unidade de origem, unidade de destino, produtos a ser exportados.
	resultados: apos informar todos os produtos para exportar seus impostos, deve receber a mensagem 'Exportação realizada com sucesso!'.*/
	it('Exportação de Impostos(Tela retirada)', function(){
		expect(paramGerais.exportaImposto('0001','0002','todos')).toBe('Exportação realizada com sucesso!');
	});
	/*Acessa a aba Fidelidade e executa os testes.
	parâmetros: cliente fidelidade, centro de custo, tipo de consumidor.*/
	it('Fidelidade', function(){
		expect(paramGerais.fidelidade('ALIVITA COMERCIO DE REFEICOES', 'TEKNISA', 'CONVÊNIO')).toBe('Operação realizada com sucesso.');
	});
	/*Acessa a aba Banco e executa os testes.
	parâmetros: código do banco, código de inscrição, chave de criptografia na transação de venda site, url de acesso do banco em resposta nas transações.*/
	it('Banco', function(){
		expect(paramGerais.banco('001','01051990','123654','banco.com.br')).toBe('Operação realizada com sucesso.');
	});
	/*Acessa a aba Cliente e executa os testes.
	parâmetros: inscrição do cliente, tabela de preço, opção{Sim|Não} zera saldo mensalmente e opção{Nome Fantasia|Razão Social} nome da instituição.*/
	it('Cliente', function(){
		expect(paramGerais.cliente('0001','00001','001','Sim','Nome Fantasia')).toBe('Operação realizada com sucesso.');
	});
	/*Acessa a aba Pagamento Online e executa os testes das telas incluídas nesta aba
	executa os testes de parametrização da aba Geral*/
	it('Pagamento Online Geral', function(){
		expect(paramGerais.pagOnlineGeral('Loja Teste', '14852931000122at')).toBe('Operação realizada com sucesso.');
	});
	//executa os testes de parametrização da aba Por Unidade
	it('Pagamento Online Unidade', function(){
		expect(paramGerais.pagOnlineUnidade('0001','Loja Savassi','01051990')).toBe('Operação realizada com sucesso.');
	});
	/*executa os testes de parametrização da aba Bandeira e-Sitef
	parâmetros: unidade, nome da bandeira, identificador esitef e o tipo de recebimento.
	resultados: Primeiro teste deve informar a filial e todos os dados da nova bandeira, após salvar deve receber a mensagem 'Ok'.
	Segundo teste deve informar a filial e todos os campos obrigatórios vazios, após salvar deve receber a mensagem 'Campo obrigatório'.*/
	it('Banderia e-Sitef da Unidade', function(){
		expect(paramGerais.bandeiraUnidade('0001','AMEX','004','003')).toBe('Ok');
		funcoes.fechaTela();
		expect(paramGerais.bandeiraUnidade('0001','','','')).toBe('Campo obrigatório');
		funcoes.fechaTela();
	});
	/*executa os testes de parametrização da aba Bandeiras e-Sitef.
	parâmetros: nome da bandeira, identificador do e-Sitef e tipo de recebimento.
	resultados: Primeiro teste cadastra uma nova bandeira informando todos os dados e após salvar deve receber a mensagem 'Ok'.
	Segundo teste cadastra uma nova bandeira sem informar os dados obrigatórios e após salvar deve receber a mensagem 'Campo obrigatório'.*/
	it('Bandeira e-Sitef', function(){
		expect(paramGerais.bandeiraEsitef('Visa','003','CARTAO CREDITO')).toBe('Operação realizada com sucesso.');
		expect(paramGerais.bandeiraEsitef('','','')).toBe('Campo obrigatório');
		funcoes.fechaTela();
	});
	/**/
	it('Excluir Bandeira e-Sitef', function(){
		expect(paramGerais.excluiBandeiraEsitef('Visa')).toBe('Deletado com sucesso.');
	});
	/*Acessa a aba Tipo de Consumidor e executa os testes das telas incluidas nesta aba.
	executa os testes de parametrização da aba Tipo de Consumidor*/
	it('Tipo de Consumidor', function(){
		paramGerais.tipoConsumidor('01','S','S','N');
	});
	/*executa os testes de parametrização da aba Tipo de Consumidor por Unidade.
	parâmetros: código da unidade, código externo e código do tipo de consumidor.*/
	it('Tipo de Consumidor por Unidade', function(){
		paramGerais.tipoConsumidorUnidade('0001','02','02');
	});
	/*executa os testes de parametrização da aba Tipo de consumidor por Unidade.
	parâmetros: unidade, tipo de consumidor, opção{S|N} consultar saldo, posição{1..9} consultar saldo, opção{S|N} consultar extrato, posição{1..9} consultar extrato, opção{S|N}carregar cartão, posição{1..9} carregar cartão, opção{S|N} bloquear cartão, posição{1..9} bloquear cartão, opção{S|N} fale conosco, posição{1..9} fale conosco, opção{S|N} restrição alimentar, posição{1..9} restrição alimentar, opção{S|N}atualizar cadastro, posição{1..9} atualizar cadastro, opção{S|N} trocar senha, posição{1..9} trocar senha, opção{S|N} tabela de preço, posição{1..9} tabela de preço.*/
	it('Editar Tipo de Consumidor por Unidade', function(){
		expect(paramGerais.editaTipoConsumidorUnidade('0001','02','S','1','S','2','S','3','S','4','S','5','S','6','S','7','S','8','S','9')).toBe('Ok');
		funcoes.fechaTela();
		expect(paramGerais.editaTipoConsumidorUnidade('0001','02','N','1','N','2','N','3','N','4','N','1','N','6','N','7','N','8','N','9')).toBe('Ok');
		funcoes.fechaTela();
		expect(paramGerais.editaTipoConsumidorUnidade('0001','02','S','1','S','2','S','3','S','4','S','1','S','6','S','7','S','8','S','9')).toBe('Não Pode repetir posições');
	});
	/*executa os testes de parametrização da tela Bônus Carga de Crédito.
	parâmetros: unidade, codigo do tipo consumidor, opção{S|N} de recebe bônus na recarga, valor da recarga, valor do bônus, saldo para receber o bônus, periodo para receber o bônus, quantidade de recargas do mês e o tipo de recebimento do bônus.
	resultados: Primeiro teste executa a parametrização do bônus informando dados em todos os campos e quando salvar deverá receber a mensagem 'Ok.'
	Segundo teste desfaz a parametrização do bônus apaga todos os campos e quando salvar deverá receber a mensagem 'Ok'
	Terceiro teste marca a parametrização do bônus, deixando todos os campos em branco e quando salvar deverá receber a mensagem 'Campo obrigatório'.*/
	it('Bônus Carga de Crédito', function(){
		expect(paramGerais.bonusCargaCredito('0001','02','S','12','2','12','Mensal','5','001')).toBe('Ok');
		funcoes.fechaTela();
		expect(paramGerais.bonusCargaCredito('0001','02','N','','','','','','')).toBe('Ok');
		funcoes.fechaTela();
		expect(paramGerais.bonusCargaCredito('0001','02','S','','','','','','')).toBe('Campo obrigatório');
	});
	/*executa o teste de exclusão de um tipo de consumidor por unidade.
	parâmetros: unidade, código do tipo de consumidor.
	resultados: o teste seleciona a unidade e o tipo de consumidor a ser excluido, após confirmar a exclusão receberá o alerta com a mensagem 'Registros deletados com sucesso'.*/
	it('Excluir Tipo de Consumidor por Unidade', function(){
		expect(paramGerais.excluiTipoConsumidorUnidade('0001','02')).toBe('Registros deletados com sucesso');
	});
});