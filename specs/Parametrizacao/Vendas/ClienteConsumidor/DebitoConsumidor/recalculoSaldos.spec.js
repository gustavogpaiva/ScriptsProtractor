var ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
var z = new ZeedhiAPIConstructor(browser, protractor);
var loginPage = require('../../../../../page-objects/login.po.js');
var calculosSaldos = require('../../../../../page-objects/Parametrizacao/Vendas/ClienteConsumidor/DebitoConsumidor/recalculoSaldos.po.js');
var h = require('../../../../../page-objects/helper.po.js');
var j = require('../../../../../json/leitorJson.po.js');

describe('Testes da Tela Recalculos de Saldos', function () {

    //executa o login o sistema
    beforeAll(function() {
        loginPage.login();
        h.tela('Recálculo de Saldos');
    });

    afterAll(function() {
        h.sairDoSistema();
    });
    afterEach(function(){
        h.fechaTela();
    });

    it('Recalcular Saldo passando os parametros Unidade, cliente e consumidor', function () {
        calculosSaldos.calcularSaldos(j.getValor('filial'),j.getValor('cliente'),'18/11/2019','00:00:00',true,j.getValor('centroCusto'),j.getValor('nomeConsumidor'));
        z.component.footer.clickRightActionByLabel('Recalcular')
        z.component.alert.clickButton('Sim');
        expect(h.aguardaMensagem()).toBe('Saldos Alterados com Sucesso!');
    });
    it('Recalcular Saldo passando os parametros Unidade e cliente', function () {
        calculosSaldos.calcularSaldos(j.getValor('filial'),j.getValor('cliente'),'18/11/2019','00:00:00',true,j.getValor('centroCusto'),'');
        z.component.footer.clickRightActionByLabel('Recalcular');
        z.component.alert.clickButton('Sim');
        expect(h.aguardaMensagem()).toBe('Saldos Alterados com Sucesso!');
    });
    it('Recalcular Saldo passando os parametros Unidade e cliente sem informação consumidor', function () {
        calculosSaldos.calcularSaldos(j.getValor('filial'),j.getValor('cliente'),'18/11/2019','00:00:00',false);
        z.component.footer.clickRightActionByLabel('Recalcular');
        z.component.alert.clickButton('Sim');
        expect(h.aguardaMensagem()).toBe('Saldos Alterados com Sucesso!');
    });
    it('Recalcular Saldo passando os parametros Unidade e cliente sem informação consumidor', function () {
        calculosSaldos.calcularSaldos(j.getValor('filial'),j.getValor('cliente'),'18/11/2019','00:00:00',false);
        z.component.footer.clickRightActionByLabel('Recalcular');
        z.component.alert.clickButton('Sim');
        expect(h.aguardaMensagem()).toBe('Saldos Alterados com Sucesso!');
    });
    it('Recalcular Saldo passando os parametros Unidade, cliente, sem informação consumidor e campo hora vazio', function () {
        calculosSaldos.calcularSaldos(j.getValor('filial'),j.getValor('cliente'),'18/11/2019','',false);
        z.component.footer.clickRightActionByLabel('Recalcular');
        expect(h.campoObrigatorio()).toBe(true);

    })
    it('Recalcular Saldo passando os parametros Unidade, cliente, sem informação consumidor e campo data vazio', function () {
        calculosSaldos.calcularSaldosSemData(j.getValor('filial'),j.getValor('cliente'),'00:01:00',false);
        z.component.footer.clickRightActionByLabel('Recalcular');
        expect(h.campoObrigatorio()).toBe(true);

    })
});