var ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
var z = new ZeedhiAPIConstructor(browser, protractor);
var loginPage = require('../../../../page-objects/login.po.js');
var delivery = require('../../../../page-objects/Parametrizacao/Vendas/ParametrosGV/delivery.po.js');
var h = require('../../../../page-objects/helper.po.js');
var j = require('../../../../json/leitorJson.po.js');

describe('Testes da tela Delivery', function () {

    //executa o login o sistema
    beforeAll(function () {
        loginPage.login();
        h.tela('Delivery');
    });

    afterAll(function () {
        h.sairDoSistema();
    });

    it('Parâmetros Gerais do Delivery', function () {
        expect(delivery.geral('Ambos', j.getValor('cliente'), '20,00', '14852931000122at', j.getValor('cdvendedor'), 'Validação por CEP')).toContain('Operação realizada com sucesso.');
    });

    it('Parâmetros da Unidade', function(){
        expect(delivery.unidade(j.getValor('cliente'), j.getValor('cdvendedor'), '5', '10,00', '20,00', '6')).toContain('Registros Salvos com Sucesso');
    });

    it('Cadastrar Área de atendimento', function(){
        expect(delivery.cadastrarAtendimento(j.getValor('area'), j.getValor('area'), '01800', '02359', '32241390')).toContain('Operação realizada com sucesso');
    });

    it('Parâmetros da loja', function(){
        expect(delivery.deliveryTempo(j.getValor('filial'), j.getValor('loja'), '2000', '1000')).toContain('Operação realizada com sucesso.');
        expect(delivery.horarioAgendamento('01300', '01800')).toContain('Operação realizada com sucesso.');
        expect(delivery.horarioFuncionamento('01800', '02359')).toContain('Operação realizada com sucesso.');
    });

    it('Parâmetros de bloqueio de cartões', function(){
        expect(delivery.bloqueioCartoes('123456', '14', 'Cartão bloqueado')).toContain('Operação realizada com sucesso.');
    });

    it('Parâmetros da Área de atendimento', function(){
        expect(delivery.atendimento(j.getValor('area'), j.getValor('prioridadeDLV'), j.getValor('taxaEntrega'))).toContain('Operação realizada com sucesso.');
    });

});