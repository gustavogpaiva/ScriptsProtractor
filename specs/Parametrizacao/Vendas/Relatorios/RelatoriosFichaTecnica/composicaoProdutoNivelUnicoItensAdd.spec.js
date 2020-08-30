const loginPage = require('../../../../../page-objects/login.po.js');
const composicaoPNivel = require('../../../../../page-objects/Parametrizacao/Vendas/Relatorios/RelatoriosFichaTecnica/composicaoProdutoNivelUnicoItensAdd.po.js');
const h = require('../../../../../page-objects/helper.po.js');
const j  = require('../../../../../json/leitorJson.po.js');

describe('Testes da Tela Composição de Produto (Nível Único com Produtos Adicionais)', () => {

    //executa o login o sistema
    beforeAll(() => {
        loginPage.login();
        h.tela('Composição de Produto (Nível Único com Produtos Adicionais)');
    });

    afterAll(() => h.sairDoSistema());

    it('Composição Produto Por Nível Unico - Nível', () => {
        //limpa a informações do filtro        
        composicaoPNivel.limparFiltro();
        //remove os labels de campo obrigatórios para conseguir selecionar a unidade, operador e o tipo de custo
        browser.executeScript("$('div.zh-validation').remove();");
        composicaoPNivel.selecionarUnidade(j.getValor('filial'));
        browser.executeScript("$('div.zh-validation').remove();");
        composicaoPNivel.selecionarLoja(j.getValor('nomeAlteracaoCadLoja'));
        browser.executeScript("$('div.zh-validation').remove();");
        composicaoPNivel.selecionarTipoCusto('Custo Médio Líquido Atual');
        composicaoPNivel.selecionarTipoSelecao('Nível');
        composicaoPNivel.definirNivel(j.getValor('nivelProdutos'));

        //emite o relatório com as informações inseridas no filtro
        composicaoPNivel.emitirRelatorio();
        //verifica se após emitir o relatório o grid possui registros
        expect(composicaoPNivel.gridPossuiRegistros()).toBe(true);
    });

    it('Gerar relatório em PDF - Nível', () => expect(composicaoPNivel.gerarRelatorioPDF()).toBe(true));
    it('Gerar relatório em XLS - Nível', () => expect(composicaoPNivel.gerarRelatorioXLS()).toBe(true));
    it('Gerar relatório em CSV - Nível', () => expect(composicaoPNivel.gerarRelatorioCSV()).toBe(true));

    it('Composição Produto Por Nível Unico - Lista', () => {
        //abre o filtro novamente
        composicaoPNivel.abrirFiltro();
        //limpa a informações do filtro        
        composicaoPNivel.limparFiltro();
        //remove os labels de campo obrigatórios para conseguir selecionar a unidade, operador e o tipo de custo
        browser.executeScript("$('div.zh-validation').remove();");
        composicaoPNivel.selecionarUnidade(j.getValor('filial'));
        browser.executeScript("$('div.zh-validation').remove();");
        composicaoPNivel.selecionarLoja(j.getValor('nomeAlteracaoCadLoja'));
        browser.executeScript("$('div.zh-validation').remove();");
        composicaoPNivel.selecionarTipoCusto('Custo Médio Líquido Atual');
        composicaoPNivel.selecionarTipoSelecao('Lista');
        composicaoPNivel.selecionarProduto(j.getValor('produtoInicialcadLoja'), j.getValor('produtoFinalcadLoja'));

        //emite o relatório com as informações inseridas no filtro
        composicaoPNivel.emitirRelatorio();
        //verifica se após emitir o relatório o grid possui registros
        expect(composicaoPNivel.gridPossuiRegistros()).toBe(true);
    });

    it('Gerar relatório em PDF - Lista', () => expect(composicaoPNivel.gerarRelatorioPDF()).toBe(true));
    it('Gerar relatório em XLS - Lista', () => expect(composicaoPNivel.gerarRelatorioXLS()).toBe(true));
    it('Gerar relatório em CSV - Lista', () => expect(composicaoPNivel.gerarRelatorioCSV()).toBe(true));  
    
    it('Composição Produto Por Nível Unico - Intervalo', () => {
        //abre o filtro novamente
        composicaoPNivel.abrirFiltro();
        //limpa a informações do filtro        
        composicaoPNivel.limparFiltro();
        //remove os labels de campo obrigatórios para conseguir selecionar a unidade, operador e o tipo de custo
        browser.executeScript("$('div.zh-validation').remove();");
        composicaoPNivel.selecionarUnidade(j.getValor('filial'));
        browser.executeScript("$('div.zh-validation').remove();");
        composicaoPNivel.selecionarLoja(j.getValor('nomeAlteracaoCadLoja'));
        browser.executeScript("$('div.zh-validation').remove();");
        composicaoPNivel.selecionarTipoCusto('Custo Médio Líquido Atual');
        composicaoPNivel.selecionarTipoSelecao('Intervalo');
        composicaoPNivel.selecionarProdutoIni(j.getValor('produtoInicialcadLoja'));
        composicaoPNivel.selecionarProdutoFin(j.getValor('produtoFinalcadLoja'));

        //emite o relatório com as informações inseridas no filtro
        composicaoPNivel.emitirRelatorio();
        //verifica se após emitir o relatório o grid possui registros
        expect(composicaoPNivel.gridPossuiRegistros()).toBe(true);
    });

    it('Gerar relatório em PDF - Intervalo', () => expect(composicaoPNivel.gerarRelatorioPDF()).toBe(true));
    it('Gerar relatório em XLS - Intervalo', () => expect(composicaoPNivel.gerarRelatorioXLS()).toBe(true));
    it('Gerar relatório em CSV - Intervalo', () => expect(composicaoPNivel.gerarRelatorioCSV()).toBe(true));       
});