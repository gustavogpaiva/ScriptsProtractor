var ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
var z = new ZeedhiAPIConstructor(browser, protractor);
var loginPage = require('../../../../page-objects/login.po.js');
var kds = require('../../../../page-objects/Parametrizacao/Vendas/ParametrosGV/kds.po.js');
var h = require('../../../../page-objects/helper.po.js');
var j = require('../../../../json/leitorJson.po.js');

describe('Testes da tela KDS', function () {

    beforeAll(function () {
        loginPage.login();
        h.abrirTela(['Parametrização', 'Vendas', 'Parâmetros de Gestão de Vendas', 'KDS']);
    });

    beforeEach(function(){
        kds.filtrarUnidade(j.getValor('filial'));
    });

    afterEach(function(){
        h.fechaTela();
    });

    afterAll(function(){
        h.sairDoSistema();
    });

    it('Cadastrar setores', function(){
        //adiciona um setor de produção
        kds.setor(j.getValor('setorProducaoKDS'), 'PROD', 'Produção');
        expect(h.aguardaMensagem()).toContain('Operação realizada com sucesso.');
        //adiciona um setor de expedição
        kds.setor(j.getValor('setorExpedicaoKDS'), 'EXP', 'Expedição');
        expect(h.aguardaMensagem()).toContain('Operação realizada com sucesso.');
        //adiciona um setor de montagem
        kds.setor(j.getValor('setorMontagemKDS'), 'MTG', 'Montagem');
        expect(h.aguardaMensagem()).toContain('Operação realizada com sucesso.');
    });

    it('Cadastrar setores por unidade', function(){
        //adiciona um setor de produção na unidade
        expect(kds.setorUnidadeKDS(j.getValor('cdfilial'), j.getValor('setorProducaoKDS'))).toContain('Operação realizada com sucesso.');
        h.fechaTela();
        //adiciona um setor de expedição na unidade
        expect(kds.setorUnidadeKDS(j.getValor('cdfilial'), j.getValor('setorExpedicaoKDS'))).toContain('Operação realizada com sucesso.');
        h.fechaTela();
        //adiciona um setor de montagem na unidade
        expect(kds.setorUnidadeKDS(j.getValor('cdfilial'), j.getValor('setorMontagemKDS'))).toContain('Operação realizada com sucesso.');
    });

    it('Cadastrar setores por loja', function(){
        //adiciona um setor de produção na loja
        expect(kds.setorLojasKDS(j.getValor('cdfilial'), j.getValor('cdloja'), j.getValor('setorProducaoKDS'))).toContain('Operação realizada com sucesso.');
        h.fechaTela();
        h.fechaTela();
        //adiciona um setor de expedição na loja
        expect(kds.setorLojasKDS(j.getValor('cdfilial'), j.getValor('cdloja'), j.getValor('setorExpedicaoKDS'))).toContain('Operação realizada com sucesso.');
        h.fechaTela();
        h.fechaTela();
        //adiciona um setor de montagem na loja        
        expect(kds.setorLojasKDS(j.getValor('cdfilial'), j.getValor('cdloja'), j.getValor('setorMontagemKDS'))).toContain('Operação realizada com sucesso.');
        h.fechaTela();
    });

    it('Cadastrar produto por setor', function(){
        //adiciona produtos ao setor de produção
        expect(kds.produtosSetor(j.getValor('setorProducaoKDS'), [j.getValor('produto'), j.getValor('produto4')])).toContain('Operação realizada com sucesso.');
        h.fechaTela();
        //adiciona produtos ao setor de expedição
        expect(kds.produtosSetor(j.getValor('setorExpedicaoKDS'), [j.getValor('produto'), j.getValor('produto4')])).toContain('Operação realizada com sucesso.');
        h.fechaTela();
        //adiciona produtos ao setor de montagem
        expect(kds.produtosSetor(j.getValor('setorMontagemKDS'), [j.getValor('produto'), j.getValor('produto4')])).toContain('Operação realizada com sucesso.');
        h.fechaTela();
    });

    it('Cadastrar observação nos produtos do setor', function(){
        //adiciona observações nos produtos do setor de produção
        expect(kds.observacoes(j.getValor('setorProducaoKDS'), j.getValor('produto'), j.getValor('grupoPedido'))).toContain('Operação realizada com sucesso.');
        h.fechaTela();
        //adiciona observações nos produtos do setor de expedição
        expect(kds.observacoes(j.getValor('setorExpedicaoKDS'), j.getValor('produto'), j.getValor('grupoPedido'))).toContain('Operação realizada com sucesso.');
        h.fechaTela();
        //adiciona observações nos produtos do setor de montagem
        expect(kds.observacoes(j.getValor('setorMontagemKDS'), j.getValor('produto'), j.getValor('grupoPedido'))).toContain('Operação realizada com sucesso.');
    });

    it('Cadastrar intervalos nos produtos do setor', function(){
        //adicionar intervalos nos produtos do setor de produção
        expect(kds.intervalos(j.getValor('setorProducaoKDS'), j.getValor('produto'))).toContain('Operação realizada com sucesso.');
        h.fechaTela();
        //adicionar intervalos nos produtos do setor de expedição
        expect(kds.intervalos(j.getValor('setorExpedicaoKDS'), j.getValor('produto'))).toContain('Operação realizada com sucesso.');
        h.fechaTela();
        //adicionar intervalos nos produtos do setor de montagem
        expect(kds.intervalos(j.getValor('setorMontagemKDS'), j.getValor('produto'))).toContain('Operação realizada com sucesso.');
    });

    it('Cadastrar mapeamento de teclas', function(){
        expect(kds.mapeamentoTeclas('Cima', 'W')).toContain('Operação realizada com sucesso.');
        h.fechaTela();
        expect(kds.mapeamentoTeclas('Baixo', 'S')).toContain('Operação realizada com sucesso.');
        h.fechaTela();
        expect(kds.mapeamentoTeclas('Esquerda', 'A')).toContain('Operação realizada com sucesso.');
        h.fechaTela();
        expect(kds.mapeamentoTeclas('Direita', 'D')).toContain('Operação realizada com sucesso.');
        h.fechaTela();
        expect(kds.mapeamentoTeclas('Enter', 'Enter')).toContain('Operação realizada com sucesso.');
        h.fechaTela();
        expect(kds.mapeamentoTeclas('Rollback', 'R')).toContain('Operação realizada com sucesso.');
        h.fechaTela();
        expect(kds.mapeamentoTeclas('Zoom', 'Z')).toContain('Operação realizada com sucesso.');
    });

    it('Cadastro de cores KDS', function () {
        expect(kds.coresPedido()).toContain('Operação realizada com sucesso.');
    });

    it('Editar setor do KDS', function(){
        //edita um setor de produção
        expect(kds.edicaoSetorKDS(j.getValor('setorProducaoKDS'), 'PROD', 'Produção')).toContain('Operação realizada com sucesso.');
        h.fechaTela();
        //edita um setor de expedição
        expect(kds.edicaoSetorKDS(j.getValor('setorExpedicaoKDS'), 'EXP', 'Expedição')).toContain('Operação realizada com sucesso.');
        h.fechaTela();
        //edita um setor de montagem
        expect(kds.edicaoSetorKDS(j.getValor('setorMontagemKDS'), 'MTG', 'Montagem')).toContain('Operação realizada com sucesso.');
    });

    it('Editar produtos do KDS', function(){
        expect(kds.edicaoProdutosKDS(j.getValor('setorProducaoKDS'), j.getValor('produto'))).toContain('Operação realizada com sucesso.');
        h.fechaTela();
        expect(kds.edicaoProdutosKDS(j.getValor('setorExpedicaoKDS'), j.getValor('produto'))).toContain('Operação realizada com sucesso.');
        h.fechaTela();
        expect(kds.edicaoProdutosKDS(j.getValor('setorMontagemKDS'), j.getValor('produto'))).toContain('Operação realizada com sucesso.');
    });

    it('Editar unidade', function(){
        expect(kds.editarUnidade(j.getValor('cdfilial'))).toContain('Operação realizada com sucesso.');
    });

    it('Excluir mapeamento de teclas', function(){
        expect(kds.excluirTeclas()).toContain('Excluído com sucesso.');
    }); 

    it('Excluir intervalos nos produtos do setor', function(){
        expect(kds.excluirIntervalos(j.getValor('setorProducaoKDS'), j.getValor('produto'))).toContain('Excluído com sucesso.');
        h.fechaTela(); 
        expect(kds.excluirIntervalos(j.getValor('setorExpedicaoKDS'), j.getValor('produto'))).toContain('Excluído com sucesso.');  
        h.fechaTela();
        expect(kds.excluirIntervalos(j.getValor('setorMontagemKDS'), j.getValor('produto'))).toContain('Excluído com sucesso.');  
    });

    it('Excluir observação nos produtos do setor', function(){
        expect(kds.excluirObservacoes(j.getValor('setorProducaoKDS'), j.getValor('produto'))).toContain('Excluído com sucesso.');
        h.fechaTela();
        expect(kds.excluirObservacoes(j.getValor('setorExpedicaoKDS'), j.getValor('produto'))).toContain('Excluído com sucesso.');
        h.fechaTela();
        expect(kds.excluirObservacoes(j.getValor('setorMontagemKDS'), j.getValor('produto'))).toContain('Excluído com sucesso.');
    });    

    it('Excluir produtos por setor', function(){
        expect(kds.excluirProdutosKDS(j.getValor('setorProducaoKDS'), j.getValor('produto'))).toContain('Excluído com sucesso.');
        h.fechaTela();
        expect(kds.excluirProdutosKDS(j.getValor('setorExpedicaoKDS'), j.getValor('produto'))).toContain('Excluído com sucesso.');
        h.fechaTela();
        expect(kds.excluirProdutosKDS(j.getValor('setorMontagemKDS'), j.getValor('produto'))).toContain('Excluído com sucesso.');
    });

    it('Excluir setores por loja do KDS', function(){
        expect(kds.excluirSetorLoja(j.getValor('cdfilial'), j.getValor('cdloja'), j.getValor('setorProducaoKDS'))).toContain('Excluído com sucesso.');
        h.fechaTela();
        h.fechaTela();
        expect(kds.excluirSetorLoja(j.getValor('cdfilial'), j.getValor('cdloja'), j.getValor('setorExpedicaoKDS'))).toContain('Excluído com sucesso.');
        h.fechaTela();
        h.fechaTela();
        expect(kds.excluirSetorLoja(j.getValor('cdfilial'), j.getValor('cdloja'), j.getValor('setorMontagemKDS'))).toContain('Excluído com sucesso.');
        h.fechaTela();
    });    

    it('Excluir setores por unidade do KDS', function(){
        expect(kds.excluirSetorUnidade(j.getValor('cdfilial'), j.getValor('setorProducaoKDS'))).toContain('Excluído com sucesso.');
        h.fechaTela();
        expect(kds.excluirSetorUnidade(j.getValor('cdfilial'), j.getValor('setorExpedicaoKDS'))).toContain('Excluído com sucesso.');
        h.fechaTela();
        expect(kds.excluirSetorUnidade(j.getValor('cdfilial'), j.getValor('setorMontagemKDS'))).toContain('Excluído com sucesso.');
    });

    //lembrando que inicialmente sao realizados 3 cadastros de setores distintos, logo os 3 serão excluídos
    it('Excluir setor do KDS', function(){
        expect(kds.excluirSetor(j.getValor('setorProducaoKDS'))).toContain('Excluído com sucesso!');
        expect(kds.excluirSetor(j.getValor('setorMontagemKDS'))).toContain('Excluído com sucesso!');
        expect(kds.excluirSetor(j.getValor('setorExpedicaoKDS'))).toContain('Excluído com sucesso!');
    });
});