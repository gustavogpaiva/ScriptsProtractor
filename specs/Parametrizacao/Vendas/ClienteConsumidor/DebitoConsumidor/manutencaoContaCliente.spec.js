var ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
var z = new ZeedhiAPIConstructor(browser, protractor);
var loginPage = require('../../../../../page-objects/login.po.js');
var manutencao = require('../../../../../page-objects/Parametrizacao/Vendas/ClienteConsumidor/DebitoConsumidor/manutencaoContaCliente.po.js');
var h = require('../../../../../page-objects/helper.po.js');
var j = require('../../../../../json/leitorJson.po.js');

describe('Testes da Tela Manutenção Conta Cliente/Consumidor', function () {
    
    //executa o login o sistema
    beforeAll(function () {
        loginPage.login();
        h.tela('Manutenção de Conta Cliente/ Consumidor');
        manutencao.filtroTela(j.getValor('cliente'), j.getValor('nomeConsumidor'));
        z.component.footer.clickRightActionByLabel('Filtrar');
    });
    afterEach(function(){
        h.fechaTela();
    });
    afterAll(function () {
        h.sairDoSistema();
    });
    
    it('Manutenção Conta Cliente/Consumidor inserir Débito', function () {
        manutencao.manutencaoConta('Débito', '20');
        z.component.footer.clickRightActionByLabel('Salvar');
        expect(h.aguardaMensagem()).toBe('Registros Salvos com Sucesso');
    });
    it('Manutenção Conta Cliente/Consumidor inserir Crédito', function () {
        manutencao.manutencaoConta('Crédito', '240');
        z.component.footer.clickRightActionByLabel('Salvar');
        expect(h.aguardaMensagem()).toBe('Registros Salvos com Sucesso');
    });

    it('Editar Manutenção Conta Cliente', function(){
        manutencao.edicaoConta('Débito', 'Manutenção editada' );
        z.component.footer.clickRightActionByLabel('Salvar');
        expect(h.aguardaMensagem()).toBe('Registros Salvos com Sucesso');
    });
});