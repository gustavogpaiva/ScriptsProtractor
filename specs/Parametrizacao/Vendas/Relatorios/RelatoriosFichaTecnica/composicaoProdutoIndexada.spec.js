const loginPage = require('../../../../../page-objects/login.po.js');
const composicaoIndexada = require('../../../../../page-objects/Parametrizacao/Vendas/Relatorios/RelatoriosFichaTecnica/composicaoProdutoIndexada.po.js');
const h = require('../../../../../page-objects/helper.po.js');
const j  = require('../../../../../json/leitorJson.po.js');

describe('Testes da Tela Composição Produto Indexada', () => {

    //executa o login o sistema
    beforeAll(() => {
        loginPage.login();
        h.tela('Composição de Produto (Indexada)');
    });

    afterAll(() => h.sairDoSistema());

    it('Composição Produto Indexada - Nível', () => {
        //limpa a informações do filtro
        composicaoIndexada.limparFiltro();
        //remove os labels de campo obrigatórios para conseguir selecionar a unidade, loja e o tipo de custo
        composicaoIndexada.selecionarTipoComposicao('Padrão');
        browser.executeScript("$('div.zh-validation').remove();");
        composicaoIndexada.selecionarUnidade(j.getValor('filial'));
        browser.executeScript("$('div.zh-validation').remove();");
        composicaoIndexada.selecionarLoja(j.getValor('nomeAlteracaoCadLoja'));
        browser.executeScript("$('div.zh-validation').remove();");
        composicaoIndexada.selecionarTipoCusto('Custo Médio Líquido Atual');
        composicaoIndexada.selecionarTipoSelecao('Nível');
        composicaoIndexada.definirNivel(j.getValor('nivelProdutos'));
        //emite o relatório com as informações inseridas no filtro
        composicaoIndexada.emitirRelatorio();
        //verifica se após emitir o relatório o grid possui registros
        expect(composicaoIndexada.gridPossuiRegistros()).toBe(true);
    });

    it('Gerar relatório em PDF - Nível', () => expect(composicaoIndexada.gerarRelatorioPDF()).toBe(true));
    it('Gerar relatório em XLS - Nível', () => expect(composicaoIndexada.gerarRelatorioXLS()).toBe(true));
    it('Gerar relatório em CSV - Nível', () => expect(composicaoIndexada.gerarRelatorioCSV()).toBe(true));

    it('Composição Produto Indexada - Lista', () => {
        //abre o filtro novamente
        composicaoIndexada.abrirFiltro();
        //limpa a informações do filtro
        composicaoIndexada.limparFiltro();
        //remove os labels de campo obrigatórios para conseguir selecionar a unidade, loja e o tipo de custo
        composicaoIndexada.selecionarTipoComposicao('Padrão');
        browser.executeScript("$('div.zh-validation').remove();");
        composicaoIndexada.selecionarUnidade(j.getValor('filial'));
        browser.executeScript("$('div.zh-validation').remove();");
        composicaoIndexada.selecionarLoja(j.getValor('nomeAlteracaoCadLoja'));
        browser.executeScript("$('div.zh-validation').remove();");
        composicaoIndexada.selecionarTipoCusto('Custo Médio Líquido Atual');
        composicaoIndexada.selecionarTipoSelecao('Lista');
        composicaoIndexada.selecionarProduto(j.getValor('produtoInicialcadLoja'), j.getValor('produtoFinalcadLoja'));
        //emite o relatório com as informações inseridas no filtro
        composicaoIndexada.emitirRelatorio();
        //verifica se após emitir o relatório o grid possui registros
        expect(composicaoIndexada.gridPossuiRegistros()).toBe(true);
    });

    it('Gerar relatório em PDF - Lista', () => expect(composicaoIndexada.gerarRelatorioPDF()).toBe(true));
    it('Gerar relatório em XLS - Lista', () => expect(composicaoIndexada.gerarRelatorioXLS()).toBe(true));
    it('Gerar relatório em CSV - Lista', () => expect(composicaoIndexada.gerarRelatorioCSV()).toBe(true));    

    it('Composição Produto Indexada - Intervalo', () => {
        //abre o filtro novamente
        composicaoIndexada.abrirFiltro();
        //limpa a informações do filtro
        composicaoIndexada.limparFiltro();
        //remove os labels de campo obrigatórios para conseguir selecionar a unidade, loja e o tipo de custo
        composicaoIndexada.selecionarTipoComposicao('Padrão');
        browser.executeScript("$('div.zh-validation').remove();");
        composicaoIndexada.selecionarUnidade(j.getValor('filial'));
        browser.executeScript("$('div.zh-validation').remove();");
        composicaoIndexada.selecionarLoja(j.getValor('nomeAlteracaoCadLoja'));
        browser.executeScript("$('div.zh-validation').remove();");
        composicaoIndexada.selecionarTipoCusto('Custo Médio Líquido Atual');
        composicaoIndexada.selecionarTipoSelecao('Intervalo');
        composicaoIndexada.selecionarProdutoIni(j.getValor('produtoInicialcadLoja'));
        composicaoIndexada.selecionarProdutoFin(j.getValor('produtoFinalcadLoja'));
        //emite o relatório com as informações inseridas no filtro
        composicaoIndexada.emitirRelatorio();
        //verifica se após emitir o relatório o grid possui registros
        expect(composicaoIndexada.gridPossuiRegistros()).toBe(true);
    });

    it('Gerar relatório em PDF - Intervalo', () => expect(composicaoIndexada.gerarRelatorioPDF()).toBe(true));
    it('Gerar relatório em XLS - Intervalo', () => expect(composicaoIndexada.gerarRelatorioXLS()).toBe(true));
    it('Gerar relatório em CSV - Intervalo', () => expect(composicaoIndexada.gerarRelatorioCSV()).toBe(true));      
});