var ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
var z = new ZeedhiAPIConstructor(browser, protractor);
var loginPage = require('../../../../page-objects/login.po.js');
var beneficio = require('../../../../page-objects/Parametrizacao/Vendas/Fidelidade/cadastroBeneficio.po.js');
var h = require('../../../../page-objects/helper.po.js');
var j = require('../../../../json/leitorJson.po.js');

describe('Testes da tela Cadastro de Beneficio Fidelidade', function () {
    //executa o login o sistema
    beforeAll(function () {
        loginPage.login();
        h.tela('Cadastro de Benefícios Fidelidade');
    });

    afterAll(function () {
        h.sairDoSistema();
    });

    afterEach(function(){
        h.fechaTela();
    });

    it('Cadastro de Beneficio', function () {
        beneficio.aplicaFilto('');
        z.component.footer.clickRightActionByLabel('Filtrar');
        z.component.footer.clickCenterActionByLabel('Adicionar');
        beneficio.cadBeneficio(j.getValor('nomeBeneficio'),j.getValor('tipoBeneficio'),j.getValor('ativacaoBeneficio'), '5', '2', '20');
        z.component.footer.clickRightActionByLabel('Salvar');
        expect(h.aguardaMensagem()).toBe('Operação realizada com sucesso.');
    });

    it('Editar Cadastro de Beneficio', function () {
        beneficio.selecionaBeneficio(j.getValor('nomeBeneficio'));
        z.component.footer.clickCenterActionByLabel('Editar');
        beneficio.editaBeneficio('Editado','10','2','90')
        z.component.footer.clickRightActionByLabel('Salvar');
        expect(h.aguardaMensagem()).toBe('Operação realizada com sucesso.');
    });

    it('Exclusão de Beneficio', function () {
        beneficio.selecionaBeneficio('Editado');
        z.component.footer.clickCenterActionByLabel('Excluir');    
        z.component.alert.clickButton('Sim');    
        expect(h.aguardaMensagem()).toBe('Excluído com sucesso.');
    });
    it('Tentativa de cadastro com campo obrigatório em branco', function(){
        z.component.footer.clickCenterActionByLabel('Adicionar');
        beneficio.cadBeneficio(j.getValor('nomeBeneficio'),j.getValor('tipoBeneficio'),j.getValor('ativacaoBeneficio'), '5', '2', '');
        z.component.footer.clickRightActionByLabel('Salvar');
        expect(h.campoObrigatorio()).toBe(true);
    })
});