var ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
var z = new ZeedhiAPIConstructor(browser, protractor);
var loginPage = require('../../../../page-objects/login.po.js');
var kds = require('../../../../page-objects/Parametrizacao/Vendas/ParametrosGV/kds.po.js');
var h = require('../../../../page-objects/helper.po.js');
var j = require('../../../../json/leitorJson.po.js');

describe('Testes da tela KDS', function () {

    beforeAll(function () {
        loginPage.login();
        h.tela('KDS');
    });

    it('Cadastrar setores por unidade', function(){
        expect(kds.setorUnidadeKDS()).toContain('Operação realizada com sucesso.');
    });

    it('Cadastrar setores por loja', function(){
        expect(kds.setorLojasKDS()).toContain('Operação realizada com sucesso.');
    });

    it('Cadastrar setor', function(){
        expect(kds.setor(j.getValor('setorProducaoKDS'), j.getValor('setorExpedicaoKDS'), j.getValor('setorMontagemKDS'))).toContain('Operação realizada com sucesso.');
    });

    it('Cadastrar produto por setor', function(){
        expect(kds.produtosSetor()).toContain('Operação realizada com sucesso.');
    });

    it('Cadastrar observação nos produtos do setor', function(){
        expect(kds.observacoes()).toContain('Operação realizada com sucesso.');
    });

    it('Cadastrar intervalos nos produtos do setor', function(){
        expect(kds.intervalos()).toContain('Operação realizada com sucesso.');
    });

    it('Cadastrar mapeamento de teclas', function(){
        expect(kds.mapeamentoTeclas()).toContain('Operação realizada com sucesso.');
    });

    it('Cadastro de cores KDS', function () {
        expect(kds.coresPedido()).toContain('Operação realizada com sucesso.');
    });

    it('Editar setor do KDS', function(){
        expect(kds.edicaoSetorKDS()).toContain('Operação realizada com sucesso.');
    });

    it('Editar produtos do KDS', function(){
        expect(kds.edicaoProdutosKDS()).toContain('Operação realizada com sucesso.');
    });

    it('Editar unidade', function(){
        expect(kds.editarUnidade()).toContain('Operação realizada com sucesso.');
    });

    it('Excluir mapeamento de teclas', function(){
        expect(kds.excluirTeclas()).toContain('Excluído com sucesso.');
    }); 

    it('Excluir intervalos nos produtos do setor', function(){
        expect(kds.excluirIntervalos(j.getValor('setorProducaoKDS'))).toContain('Excluído com sucesso!');   
    });

    it('Excluir observação nos produtos do setor', function(){
        expect(kds.excluirObservacoes(j.getValor('setorProducaoKDS'))).toContain('Excluído com sucesso!');
    });    

    it('Excluir produtos por setor', function(){
        expect(kds.excluirProdutosKDS(j.getValor('setorProducaoKDS'))).toContain('Excluído com sucesso!');
    });

    //lembrando que inicialmente sao realizados 3 cadastros de setores distintos, logo os 3 serão excluídos
    it('Excluir setor do KDS', function(){
        expect(kds.excluirSetor(j.getValor('setorProducaoKDS'))).toContain('Excluído com sucesso!');
        expect(kds.excluirSetor(j.getValor('setorMontagemKDS'))).toContain('Excluído com sucesso!');
        expect(kds.excluirSetor(j.getValor('setorExpedicaoKDS'))).toContain('Excluído com sucesso!');
    });    

    it('Excluir setores por loja do KDS', function(){
        expect(kds.excluirSetorLoja()).toContain('Excluído com sucesso!');
    });    

    it('Excluir setores por unidade do KDS', function(){
        expect(kds.excluirSetorUnidade()).toContain('Excluído com sucesso!');
    });
});