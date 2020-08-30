var ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
var z = new ZeedhiAPIConstructor(browser, protractor);
var loginPage = require('../../../../page-objects/login.po.js');
var obs = require('../../../../page-objects/Parametrizacao/Vendas/Produto/cadastroObservacao.po.js');
var h = require('../../../../page-objects/helper.po.js');
var j = require('../../../../json/leitorJson.po.js');

describe('Testes da tela Cadastro de Observação', function () {
    //executa o login o sistema
    beforeAll(function () {
        loginPage.login();
        h.tela('Cadastro de Observação');
    });
    //seleciona um grupo de observação cadastrado
    beforeEach(function () {
        obs.selecionarGrupoObservacao(j.getValor('grupoObservacao'));
    });
    //fecha algum alerta ou telas que ficaram abertas durante a execução dos it
    afterEach(function () {
        h.fechaTela();
    });
    //sai do sistema após a execução dos it
    afterAll(function () {
        h.sairDoSistema();
    });

    it('Cadastro de Observação', function () {
        //cadastra um novo grupo de observação
        obs.cadastrarGrupoObservacao(j.getValor('grupoObservacao'));
        expect(h.aguardaMensagem()).toBe('Operação realizada com sucesso.');
    });

    it('Edição de Cadastro de Observação', function () {
        //edita a descrição da observação
        obs.editarGrupoObservacao(j.getValor('grupoObservacao'));
        expect(h.aguardaMensagem()).toBe('Operação realizada com sucesso.');
    });

    it('Cadastrar observações para um grupo de observação', function () {
        //cadastra uma nova uma observação para o produto
        obs.cadastrarObservacao(j.getValor('observacaoProduto'), j.getValor('tipoObservacao'), j.getValor('observacaoProduto'), j.getValor('exibeObservacao'), j.getValor('obsProdutoIngles'), j.getValor('obsProdutoEspanhol'), j.getValor('produtoObservacao'), j.getValor('destacaKDS'));
        expect(h.aguardaMensagem()).toBe('Operação realizada com sucesso.');
        //cadastra uma nova observação para remover produto
        obs.cadastrarObservacao(j.getValor('observacaoRemover'), j.getValor('tipoObservacao'), j.getValor('observacaoRemover'), j.getValor('exibeObservacao'), j.getValor('obsProdutoIngles'), j.getValor('obsProdutoEspanhol'), j.getValor('produtoObservacao'), j.getValor('destacaKDS'));
        expect(h.aguardaMensagem()).toBe('Operação realizada com sucesso.');
        //cadastra uma nova observação para adicionar produto
        obs.cadastrarObservacao(j.getValor('observacaoAdicionar'), j.getValor('tipoObservacao'), j.getValor('observacaoAdicionar'), j.getValor('exibeObservacao'), j.getValor('obsProdutoIngles'), j.getValor('obsProdutoEspanhol'), j.getValor('produtoObservacao'), j.getValor('destacaKDS'));
        expect(h.aguardaMensagem()).toBe('Operação realizada com sucesso.');
    });

    it('Editar observações de um grupo de observação', function () {
        //edita as observações de remover de um produto
        obs.editarObservacao(j.getValor('observacaoRemover'), j.getValor('tipoObservacao2'), j.getValor('observacaoRemover'), j.getValor('exibeObservacao'), j.getValor('obsRemoverIngles'), j.getValor('obsRemoverEspanhol'), j.getValor('produtoObservacao'), j.getValor('destacaKDS'));
        expect(h.aguardaMensagem()).toBe('Operação realizada com sucesso.');
        h.fechaTela();
        //edita as observações de adicionar de um produto
        obs.editarObservacao(j.getValor('observacaoAdicionar'), j.getValor('tipoObservacao3'), j.getValor('observacaoAdicionar'), j.getValor('exibeObservacao'), j.getValor('obsAdicionarIngles'), j.getValor('obsAdicionarEspanhol'), j.getValor('produtoObservacao'), j.getValor('destacaKDS'));
        expect(h.aguardaMensagem()).toBe('Operação realizada com sucesso.');
        h.fechaTela();
    });
    
    it('Cadastrar produtos para uma observação', function () {
        //cadastra um produto para uma observação de produto
        obs.cadastrarProduto(j.getValor('observacaoProduto'), j.getValor('produtoObservacao'));
        expect(h.aguardaMensagem()).toBe('Operação realizada com sucesso.');
        h.fechaTela();
        //cadastra um produto para uma observação de remover
        obs.cadastrarProduto(j.getValor('observacaoRemover'), j.getValor('produtoObservacao'));
        expect(h.aguardaMensagem()).toBe('Operação realizada com sucesso.');
        h.fechaTela();
        //cadastra um produto para uma observação de adicionar
        obs.cadastrarProduto(j.getValor('observacaoAdicionar'), j.getValor('produtoObservacao'));
        expect(h.aguardaMensagem()).toBe('Operação realizada com sucesso.');
        h.fechaTela();
    });

    it('Verificar as observações por produto', function () {
        //verica se as parametrizações dos produtos estão sendo exibidas no grid
        expect(obs.observacaoProdutos()).toBe(true);
        //parametriza uma quantidade minima inserindo um número aleatóriao, e aguarda notificação confirmando a parametrização
        obs.quantidadeMinima(Math.floor((Math.random() * 5) + 1));
        expect(h.aguardaMensagem()).toBe('Operação realizada com sucesso.');
    });

    it('Cadastrar uma nova observação para um produto', function () {
        //cadastra uma nova observação que será incluida nas observações dos produtos 
        obs.cadastrarObservacao('Nova Observação', j.getValor('tipoObservacao'), j.getValor('observacaoProduto'), j.getValor('exibeObservacao'), j.getValor('obsProdutoIngles'), j.getValor('obsProdutoEspanhol'), j.getValor('produtoObservacao'), j.getValor('destacaKDS'));
        expect(h.aguardaMensagem()).toBe('Operação realizada com sucesso.');
        //navega até a aba observação de produto e verifica se existem produtos com observações cadastradas
        expect(obs.observacaoProdutos()).toBe(true);
        //cadastra uma nova observação para o produto
        obs.cadastrarObsProduto(j.getValor('produtoObservacao'), 'Nova Observação');
        expect(h.aguardaMensagem()).toBe('Operação realizada com sucesso.');
        h.fechaTela();
    });

    it('Cadastrar grupo de observações obrigatórias', function () {
        //cadastra uma nova observação obrigatória
        obs.cadastrarObsObrigatoria(j.getValor('obsObrigatoria'));
        expect(h.aguardaMensagem()).toBe('Registros Salvos com Sucesso'); 
        //cadastrar as ocorrencias para observações obrigatórias
        obs.cadastrarOcorrencia(j.getValor('obsObrigatoria'));
        expect(h.aguardaMensagem()).toBe('Registros salvos com sucesso!'); 
        h.fechaTela();
    });

    it('Editar grupo de observações obrigatórias', function () {
        //edita a descrição do grupo de observações obrigatórias
        obs.editarObsObrigatoria(j.getValor('obsObrigatoria'));
        expect(h.aguardaMensagem()).toBe('Operação realizada com sucesso.');
        h.fechaTela();
    });
    
    it('Excluir grupo de observações obrigatórias', function () {
        //exclui as ocorrências das observações obrigatórias
        obs.excluirOcorrencia(j.getValor('obsObrigatoria'));
        expect(h.aguardaMensagem()).toContain('Excluído com sucesso!');
        h.fechaTela();
        //exclui o grupo de observações obrigatórias
        obs.excluirObsObrigatoria(j.getValor('obsObrigatoria'));
        expect(h.aguardaMensagem()).toContain('Excluído com sucesso!');
    });

    it('Excluir uma observação de um produto', function () {
        //navega até a aba observação de produto e verifica se existem produtos com observações cadastradas
        expect(obs.observacaoProdutos()).toBe(true);
        //seleciona o produto verifica se a observação existe, excluir e aguarda notificação ser exibida
        obs.excluirObsProduto(j.getValor('produtoObservacao'), 'Nova Observação');
        expect(h.aguardaMensagem()).toContain('Excluído com sucesso!');
        h.fechaTela();
    });

    it('Excluir produtos para uma observação', function () {
        //exclui um produto de uma observação
        obs.excluirProduto(j.getValor('observacaoProduto'), j.getValor('produtoObservacao'));
        expect(h.aguardaMensagem()).toContain('Excluído com sucesso!');
        h.fechaTela();
        //exclui um produto de uma observação de remover
        obs.excluirProduto(j.getValor('observacaoRemover'), j.getValor('produtoObservacao'));
        expect(h.aguardaMensagem()).toContain('Excluído com sucesso!');
        h.fechaTela();
        //exclui um produto de uma observação de adição
        obs.excluirProduto(j.getValor('observacaoAdicionar'), j.getValor('produtoObservacao'));
        expect(h.aguardaMensagem()).toContain('Excluído com sucesso!');
        h.fechaTela();
    });

    it('Excluir observações para um grupo de observação', function () {
        //exclui uma observação do produto
        obs.excluirObservacao(j.getValor('observacaoProduto'));
        expect(h.aguardaMensagem()).toContain('Excluído com sucesso!');
        //exclui uma observação de remover
        obs.excluirObservacao(j.getValor('observacaoRemover'));
        expect(h.aguardaMensagem()).toContain('Excluído com sucesso!');
        //exclui uma observação de adição
        obs.excluirObservacao(j.getValor('observacaoAdicionar'));
        expect(h.aguardaMensagem()).toContain('Excluído com sucesso!');
        //exclui uma observação adicionada 
        obs.excluirObservacao('Nova Observação');
        expect(h.aguardaMensagem()).toContain('Excluído com sucesso!');
    });

    it('Excluir Cadastro de Observação', function () {
        //exclui um grupo de observação existente
        obs.excluirGrupoObservacao();
        expect(h.aguardaMensagem()).toContain('Excluído com sucesso!');
    });
});