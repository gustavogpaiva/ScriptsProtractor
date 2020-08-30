var ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
var z = new ZeedhiAPIConstructor(browser, protractor);
var loginPage = require('../../../../page-objects/login.po.js');
var meta = require('../../../../page-objects/Parametrizacao/Vendas/Loja/meta.po.js');
var h = require('../../../../page-objects/helper.po.js');

describe('Testes da tela de Meta', function () {
    beforeEach(function () {
        loginPage.login();
        h.tela('Meta');
    });

    afterEach(function () {
        h.sairDoSistema();
    });

    it('Estimar Meta Mensal', function () {
        meta.metaMensal();
        expect(z.widget.grid.getText('3638210603645353162275', 1, 2)).toBe('1.000.000,00');
    });

    it('Estimar Meta Especial', function () {
        meta.realizarMeta();
        expect(z.widget.grid.getText('3638210602585623398331', 1, 0)).toBe('01/08/2018');
    });

    it('Editar Meta Especial', function () {
        meta.editarMetaEspecial();
        expect(z.widget.grid.getText('3638210602585623398331', 1, 1)).toBe('QUARTA-FEIRA');
    });

    it('Excluir Meta Especial', function () {
        expect(meta.excluirMetaEspecial()).toBe('Deletado com sucesso.');
    });

    it('Atualizar Vendas', function () {
        expect(meta.atualizaVendas()).toBe('As informações de venda foram atualizadas com sucesso.');
    });

    it('Recalcular Meta', function () {
        expect(meta.recalculaMeta()).toBe('Os valores de meta foram atualizados com sucesso.');
    });
});