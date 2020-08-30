var ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
var z = new ZeedhiAPIConstructor(browser, protractor);
var loginPage = require('../../../../page-objects/login.po.js');
var cliente = require('../../../../page-objects/Parametrizacao/Vendas/Consumidor/CodigoExternoCliente.po.js');
var h = require('../../../../page-objects/helper.po.js');

describe('Testes da tela Código Externo Cliente', function () {

    //executa o login o sistema
    beforeAll(function () {
        loginPage.login();	
        h.tela('Código Externo Cliente');
    });
    //sai do sistema depois da execução dos testes
    afterAll(function () {
        h.sairDoSistema();
    });
    //realiza o filtro antes de cada it nos casos em que houver
    beforeEach(function(){
        cliente.selecionarUnidadeCliente();
    });
    //fecha a tela ao fim da execução de cada it
    afterEach(function(){
        h.fechaTela();
    });

    it('Cadastro de Código Externo Cliente', function () {
        cliente.cadastroCodCliente();
        expect(h.aguardaMensagem()).toBe('Operação realizada com sucesso.');
    });
    it('Cadastro de Código Externo Cliente repetido', function(){
        cliente.cadastroCodCliente();
        expect(h.aguardaMensagem()).toBe('Os parâmetros passados já existem para este cliente.'); 
    });

    it('Edição Código Externo Cliente', function () {
        cliente.editarCodCliente();
        expect(h.aguardaMensagem()).toBe('Operação realizada com sucesso.');
    });

    it('Exclusão Código Externo Cliente', function () {
        cliente.excluirCodCaixa();
        expect(h.aguardaMensagem()).toBe('Excluído com sucesso!');
    });
});