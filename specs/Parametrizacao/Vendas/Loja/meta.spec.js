var ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
var z = new ZeedhiAPIConstructor(browser, protractor);
var loginPage = require('../../../../page-objects/login.po.js');
var meta = require('../../../../page-objects/Parametrizacao/Vendas/Loja/meta.po.js');
var h = require('../../../../page-objects/helper.po.js');
var j = require('../../../../json/leitorJson.po.js');

describe('Testes da tela de Meta', function () {
    beforeAll(function () {
        loginPage.login();
        h.tela('Meta');
    });

    beforeEach(function () {
        meta.selecionarUnidade(j.getValor('filial'));
    });

    afterEach(function () {
        h.fechaTela();
    });

    afterAll(function () {
        h.sairDoSistema();
    });

    it('Estimar Meta Mensal', function () {
        meta.metaMensal(j.getValor('percentualMeta'), j.getValor('periodoMeta'), j.getValor('anoMeta'));
        expect(h.aguardaMensagem()).toContain('Os valores de meta foram atualizados com sucesso.');
    });

    it('Editar Meta Mensal', function () {
        expect(meta.editarMetaMensal(j.getValor('mesMeta'), j.getValor('valorMeta'))).toBe(true);
        expect(h.aguardaMensagem()).toContain('Operação realizada com sucesso.');
    });

    it('Editar Meta por Dia da Semana', function () {
        expect(meta.editarMetaDiaSemana(j.getValor('mesMeta'), j.getValor('percentualMeta'))).toBe(true);
        expect(h.aguardaMensagem()).toContain('Operação realizada com sucesso.');
    });

    it('Editar Meta por modalidade', function () {
        expect(meta.editarMetaModalidade(j.getValor('mesMeta'), j.getValor('percentualMeta'))).toBe(true);
        expect(h.aguardaMensagem()).toContain('Operação realizada com sucesso.');
        h.fechaTela();
    });

    it('Editar Meta por Hora', function () {
        expect(meta.editarMetaHora(j.getValor('mesMeta'), j.getValor('percentualMeta'))).toBe(true);
        expect(h.aguardaMensagem()).toContain('Operação realizada com sucesso.');
        h.fechaTela();
    });

    it('Verificar Metas por Mês/Dia', function () {
        expect(meta.verificarMetasMesDia()).toBe(true);
    });

    it('Estimar Meta Especial', function () {
        meta.metaEspecial(j.getValor('periodoMeta'), j.getValor('percentualMeta'));
        expect(h.aguardaMensagem()).toContain('Operação realizada com sucesso.');
        h.fechaTela();
    });

    it('Verificar Meta Período Especial', function(){
        expect(meta.verificarMetaEspecial()).toBe(true);
    });

    it('Editar Meta Especial', function () {
        meta.editarMetaEspecial();
        expect(h.aguardaMensagem()).toContain('Operação realizada com sucesso.');
    });

    it('Excluir Meta Especial', function () {
        meta.excluirMetaEspecial()
        expect(h.aguardaMensagem()).toBe('Excluído com sucesso!');
    });

    it('Atualizar Vendas', function () {
        meta.atualizarVendas();
        expect(h.aguardaMensagem()).toBe('As informações de venda foram atualizadas com sucesso.');
    });

    it('Recalcular Meta', function () {
        meta.recalculaMeta();
        expect(h.aguardaMensagem()).toBe('Os valores de meta foram atualizados com sucesso.');
    });
});