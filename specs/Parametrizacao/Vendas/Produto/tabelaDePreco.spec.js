var ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
var z = new ZeedhiAPIConstructor(browser, protractor);
var loginPage = require('../../../../page-objects/login.po.js');
var tabelaPreco = require('../../../../page-objects/Parametrizacao/Vendas/Produto/tabelaDePreco.po.js');
var h = require('../../../../page-objects/helper.po.js');
var j = require('../../../../json/leitorJson.po.js');

describe('Testes da tela Tabela de Preço', function() {
    beforeAll(function() {
        loginPage.login();
        h.tela('Tabela de Preço');
    });

    beforeEach(function() {
        tabelaPreco.selecionarUnidade(j.getValor('filial'));
    });

    afterEach(function() {
        h.fechaTela(); 
    });

    afterAll(function() {
        h.sairDoSistema();
    });

    it('Adicionar tabela de Preço', function() {
        tabelaPreco.adicionarTabela(j.getValor('cdNovaTabelaPreco'), j.getValor('novaTabelaPreco'));
        expect(h.aguardaMensagem()).toBe('Operação realizada com sucesso.');
    });

    it('Adicionar vigência para uma tabela de Preço', function(){
        tabelaPreco.adicionarVigencia(j.getValor('novaTabelaPreco'));
        expect(h.aguardaMensagem()).toBe('Operação realizada com sucesso.');
    });

    it('Editar vigência de uma tabela de preço', function(){
        tabelaPreco.editarVigencia(j.getValor('cdNovaTabelaPreco'), j.getValor('novaTabelaPreco'));
        expect(h.aguardaMensagem()).toBe('Operação realizada com sucesso.'); 
    });

    it('Adicionar preços nos produtos da tabela de preço', function(){
        tabelaPreco.adicionarPreco(j.getValor('cdNovaTabelaPreco'), j.getValor('novaTabelaPreco'), j.getValor('produtoInicialcadLoja'), j.getValor('produtoFinalcadLoja'), j.getValor('preco'));
        expect(h.aguardaMensagem()).toBe('Operação realizada com sucesso.');
    });

    it('Alterar preços dos produtos da tabela de preço', function(){
        //altera os preços dos produtos da tabela de preço, informando o intervalo produtos 
        tabelaPreco.alterarPreco(j.getValor('cdNovaTabelaPreco'), j.getValor('novaTabelaPreco'), j.getValor('produtoInicialcadLoja'), j.getValor('produtoFinalcadLoja'), j.getValor('preco'), 'Intervalo');
        expect(h.aguardaMensagem()).toBe('Operação realizada com sucesso.');
        h.fechaTela();
        //altera os preços dos produtos da tabela de preço, informando os produtos na lista de produtos
        tabelaPreco.alterarPreco(j.getValor('cdNovaTabelaPreco'), j.getValor('novaTabelaPreco'), j.getValor('produtoInicialcadLoja'), j.getValor('produtoFinalcadLoja'), j.getValor('preco'), 'Lista');
        expect(h.aguardaMensagem()).toBe('Operação realizada com sucesso.');
    });

    it('Adicionar preços diferenciados nos produtos da tabela de preço', function(){
        tabelaPreco.adicionarPrecoDiferenciado(j.getValor('cdTabelaPreco'), j.getValor('tabelaDePreco'), j.getValor('produto4'), j.getValor('diaSemana'), j.getValor('tipoConsumidor'), j.getValor('precoDiferenciado'), j.getValor('descontoAcrescimo'), j.getValor('percentualValor'), j.getValor('visualizaPreco'), j.getValor('horaInicial'), j.getValor('horaFinal'));
        expect(h.aguardaMensagem()).toBe('Operação realizada com sucesso.');
        h.fechaTela();
    });

    it('Alterar preços diferenciados nos produtos da tabela de preço', function(){
        tabelaPreco.alterarPrecoDiferenciado(j.getValor('cdTabelaPreco'), j.getValor('tabelaDePreco'), j.getValor('produto4'), j.getValor('diaSemana'), j.getValor('tipoConsumidor'), '5,00', 'Acréscimo', 'Valor', 'Não', j.getValor('horaFinal'));
        expect(h.aguardaMensagem()).toBe('Operação realizada com sucesso.');
        h.fechaTela();
    });

    xit('Alteração automática dos preços diferenciados', function(){
        expect(tabelaPreco.alterarAutomaticoPreco(j.getValor('cdfilial'), j.getValor('cdTabelaPreco'), j.getValor('tabelaDePreco'), j.getValor('produto4'), j.getValor('diaSemana'), j.getValor('tipoConsumidor'), j.getValor('precoDiferenciado'), j.getValor('descontoAcrescimo'), j.getValor('percentualValor'), j.getValor('visualizaPreco'), j.getValor('horaInicial'), j.getValor('horaFinal'))).toBe('Alteração realizada com sucesso.');
        h.fechaTela();
    });

    it('Exportação da tabela de preço', function(){
        //exporta a tabela de preço para uma unidade criando uma nova tabela na filial
        tabelaPreco.exportarTabelaPreco(j.getValor('cdfilial'), j.getValor('cdfilial2'),  j.getValor('novaTabelaPreco'), j.getValor('novaTabelaPreco'), j.getValor('cdNovaTabelaPreco'), 'Sim', 'Sim', j.getValor('produto'), j.getValor('produto2'),  j.getValor('produto3'),  j.getValor('produto4'), 'Não', j.getValor('cdfilial3'));
        expect(h.aguardaMensagem()).toBe('Exportação realizada com sucesso!');
        h.fechaTela();
        //exporta a tabela de preço para várias unidades
        tabelaPreco.exportarTabelaPreco(j.getValor('cdfilial'), j.getValor('cdfilial2'), j.getValor('novaTabelaPreco'), j.getValor('novaTabelaPreco'), j.getValor('cdNovaTabelaPreco'), 'Sim', 'Sim', j.getValor('produto'), j.getValor('produto2'),  j.getValor('produto3'),  j.getValor('produto4'), 'Sim', j.getValor('cdfilial3'));
        expect(h.aguardaMensagem()).toBe('Exportação realizada com sucesso!');
        h.fechaTela();
        //exporta a tabela de preço para uma unidade
        tabelaPreco.exportarTabelaPreco(j.getValor('cdfilial'), j.getValor('cdfilial2'), j.getValor('novaTabelaPreco'), j.getValor('novaTabelaPreco'), j.getValor('cdNovaTabelaPreco'), 'Sim', 'Não', j.getValor('produto'), j.getValor('produto2'),  j.getValor('produto3'),  j.getValor('produto4'), 'Não', j.getValor('cdfilial3'));
        expect(h.aguardaMensagem()).toBe('Exportação realizada com sucesso!');
    });

    it('Atualizar os preços da tabela de preço ativa', function(){
        tabelaPreco.atualizarPrecos(j.getValor('cdTabelaPreco'), j.getValor('tabelaDePreco'));
        expect(h.aguardaMensagem()).toBe('Atualização dos preços realizada com sucesso!');
        h.fechaTela();
    });

    it('Importar uma vigência de uma tabela de preço', function(){
        tabelaPreco.importarVigencia(j.getValor('cdTabelaPreco'), j.getValor('tabelaDePreco'), j.getValor('vigenciaOrigem'));
        expect(h.aguardaMensagem()).toBe('Importado com sucesso!');
        h.fechaTela();
        //limpa a informação utilizada na pesquisa de tabelas  
        z.component.floatingControl.open();
        z.component.floatingControl.selectAction('search');
        browser.sleep(3000);
        $('span.clear-button.zh-icon.zh-icon-close-x.zh-icon-no-border.zh-icon-color-white.searching').click();
    });

    it('Excluir preços diferenciados nos produtos da tabela de preço', function(){
        tabelaPreco.excluirPrecoDiferenciado(j.getValor('cdTabelaPreco'), j.getValor('tabelaDePreco'), j.getValor('produto4'), j.getValor('diaSemana'), j.getValor('tipoConsumidor'));
        expect(h.aguardaMensagem()).toBe('Operação realizada com sucesso.');
    });

    it('Excluir vigência de uma Tabela de Preço', function(){
        tabelaPreco.excluirVigencia(j.getValor('cdNovaTabelaPreco'), j.getValor('novaTabelaPreco'));
        expect(h.aguardaMensagem()).toBe('Excluído com sucesso.');
    });    

    it('Excluir tabela de Preço', function() {
        tabelaPreco.excluirTabela(j.getValor('cdNovaTabelaPreco'), j.getValor('novaTabelaPreco'));
        expect(h.aguardaMensagem()).toBe('Excluído com sucesso.');
    });
});