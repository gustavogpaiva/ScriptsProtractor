var ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
var z = new ZeedhiAPIConstructor(browser, protractor);
var loginPage = require('../../../../page-objects/login.po.js');
var promocional = require('../../../../page-objects/Parametrizacao/Vendas/Produto/cadastroGrupoPromocional.po.js');
var h = require('../../../../page-objects/helper.po.js');
var j = require('../../../../json/leitorJson.po.js');

describe('Testes da tela Cadastro de Grupo Promocional', function () {
    //faz login e abre a tela 
    beforeAll(function () {
        loginPage.login();
        h.tela('Cadastro de Grupo Promocional');
    });
    //fecha alguma tela aberta após execução dos its
    afterEach(function () {
        h.fechaTela(); 
    });
    //sai do sistema após a execução de todos its
    afterAll(function () {
        h.sairDoSistema();
    });

    it('Cadastrar um novo grupo promocional', function () {
        promocional.cadastrarGrupo(); 
        expect(h.aguardaMensagem()).toBe('Operação realizada com sucesso.');
    });
    it('Cadastrar produtos no grupo promocional', function () {
        promocional.cadastrarProduto();
        browser.sleep(1000);
        expect(h.aguardaMensagem()).toBe('Operação realizada com sucesso.');
    });
    it('Cadastrar produtos repetido no grupo promocional', function () {
        promocional.cadastrarProduto();
        expect(h.aguardaMensagem()).toBe('Impossível adicionar. Registro já existe.');
        promocional.fecharSpan();
        
    });
    it('Cadastrar automático de produtos no grupo promocional', function () {
        promocional.cadastroAutomatico();
        expect(h.aguardaMensagem()).toBe('Operação realizada com sucesso.');
    });
    it('Excluir Grupo Promocional ainda com Produto', function () {
        promocional.excluirGrupo();
        expect(h.aguardaMensagem()).toContain('Exclusão não permitida! O registro possui registros filhos.');
    });
    it('Edição de Grupo Promocional', function () {
        promocional.editarGrupo();
        expect(h.aguardaMensagem()).toBe('Operação realizada com sucesso.'); 
    });

    it('Excluir produtos no grupo promocional', function () {
        promocional.excluirProduto();
        expect(h.aguardaMensagem()).toBe('Excluído com sucesso.');
    });

    it('Excluir todos produtos no grupo promocional', function () {
        promocional.excluirTodosProdutos();
        expect(h.aguardaMensagem()).toBe('Excluído com sucesso!');
    });

    it('Excluir Grupo Promocional', function () {
       promocional.excluirGrupo();
       expect(h.aguardaMensagem()).toContain('Excluído com sucesso.');
    });
});