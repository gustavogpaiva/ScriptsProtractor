const loginPage = require('../../../../../page-objects/login.po.js');
const vendasProdModalidade = require('../../../../../page-objects/Parametrizacao/Vendas/Relatorios/RelatoriosProduto/vendasProdutoModalidade.po.js');
const h = require('../../../../../page-objects/helper.po.js');
const j  = require('../../../../../json/leitorJson.po.js');

describe('Testes da Tela Vendas de Produto no Período por Modalidade', () => {

    //executa o login o sistema
    beforeAll(()  => {
        loginPage.login();
        h.tela('Vendas Produto por Modalidade')
    });

    afterAll(() => h.sairDoSistema());

    it('Vendas de Produto no Período por Modalidade - Analítico por Intervalo', () => {
        //limpa a informações do filtro
        vendasProdModalidade.limparFiltro();
        //remove os labels de campo obrigatórios para conseguir selecionar a unidade, loja e o período
        vendasProdModalidade.selecionarUnidade(j.getValor('filial'));
        vendasProdModalidade.selecionarLoja(j.getValor('nomeAlteracaoCadLoja'));
        browser.executeScript("$('div.zh-validation').remove();");
        vendasProdModalidade.selecionarPeríodo(j.getValor('periodoComVenda'));
        vendasProdModalidade.selecionarDia('Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado');
        vendasProdModalidade.selecionarHorarioIni('0000');//00:00
        vendasProdModalidade.selecionarHorarioFin('2359');//23:59
        vendasProdModalidade.selecionarProdutoIni(j.getValor('produtoInicialcadLoja'));
        vendasProdModalidade.selecionarProdutoFin(j.getValor('produtoFinalcadLoja'));
        vendasProdModalidade.selecionarModalidade('Balcão', 'Delivery', 'Mesa', 'Terminal de Auto-Atendimento', 'Comanda');
        vendasProdModalidade.selecionarTipoRelatorio('Analítico');
        //emite o relatório com as informações inseridas no filtro
        vendasProdModalidade.emitirRelatorio();
        //verifica se após emitir o relatório o grid possui registros
        expect(vendasProdModalidade.gridPossuiRegistros()).toBe(true);
    });

    it('Gerar relatório em PDF - Analítico por Intervalo', () => expect(vendasProdModalidade.gerarRelatorioPDF()).toBe(true));
    it('Gerar relatório em XLS - Analítico por Intervalo', () => expect(vendasProdModalidade.gerarRelatorioXLS()).toBe(true));
    it('Gerar relatório em CSV - Analítico por Intervalo', () => expect(vendasProdModalidade.gerarRelatorioCSV()).toBe(true));

    it('Vendas de Produto no Período por Modalidade - Sintético por Intervalo', () => {
        //abre o filtro novamente
        vendasProdModalidade.abrirFiltro();
        //limpa a informações do filtro
        vendasProdModalidade.limparFiltro();
        //remove os labels de campo obrigatórios para conseguir selecionar a unidade, loja e o período
        vendasProdModalidade.selecionarUnidade(j.getValor('filial'));
        vendasProdModalidade.selecionarLoja(j.getValor('nomeAlteracaoCadLoja'));
        browser.executeScript("$('div.zh-validation').remove();");
        vendasProdModalidade.selecionarPeríodo(j.getValor('periodoComVenda'));
        vendasProdModalidade.selecionarDia('Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado');
        vendasProdModalidade.selecionarHorarioIni('0000');//00:00
        vendasProdModalidade.selecionarHorarioFin('2359');//23:59
        vendasProdModalidade.selecionarProdutoIni(j.getValor('produtoInicialcadLoja'));
        vendasProdModalidade.selecionarProdutoFin(j.getValor('produtoFinalcadLoja'));
        vendasProdModalidade.selecionarModalidade('Balcão', 'Delivery', 'Mesa', 'Terminal de Auto-Atendimento', 'Comanda');
        vendasProdModalidade.selecionarTipoRelatorio('Sintético');
        //emite o relatório com as informações inseridas no filtro
        vendasProdModalidade.emitirRelatorio();
        //verifica se após emitir o relatório o grid possui registros
        expect(vendasProdModalidade.gridPossuiRegistros()).toBe(true);
    });

    it('Gerar relatório em PDF - Sintético por Intervalo', () => expect(vendasProdModalidade.gerarRelatorioPDF()).toBe(true));
    it('Gerar relatório em XLS - Sintético por Intervalo', () => expect(vendasProdModalidade.gerarRelatorioXLS()).toBe(true));
    it('Gerar relatório em CSV - Sintético por Intervalo', () => expect(vendasProdModalidade.gerarRelatorioCSV()).toBe(true));

    it('Vendas de Produto no Período por Modalidade - Analítico por Lista', () => {
        //abre o filtro novamente
        vendasProdModalidade.abrirFiltro();
        //limpa a informações do filtro
        vendasProdModalidade.limparFiltro();
        //remove os labels de campo obrigatórios para conseguir selecionar a unidade, loja e o período
        vendasProdModalidade.selecionarUnidade(j.getValor('filial'));
        vendasProdModalidade.selecionarLoja(j.getValor('nomeAlteracaoCadLoja'));
        browser.executeScript("$('div.zh-validation').remove();");
        vendasProdModalidade.selecionarPeríodo(j.getValor('periodoComVenda'));
        vendasProdModalidade.selecionarDia('Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado');
        vendasProdModalidade.selecionarHorarioIni('0000');//00:00
        vendasProdModalidade.selecionarHorarioFin('2359');//23:59
        vendasProdModalidade.selecionarProduto(j.getValor('produtoInicialcadLoja'), j.getValor('produtoFinalcadLoja'));
        vendasProdModalidade.selecionarModalidade('Balcão', 'Delivery', 'Mesa', 'Terminal de Auto-Atendimento', 'Comanda');
        vendasProdModalidade.selecionarTipoRelatorio('Analítico');
        //emite o relatório com as informações inseridas no filtro
        vendasProdModalidade.emitirRelatorio();
        //verifica se após emitir o relatório o grid possui registros
        expect(vendasProdModalidade.gridPossuiRegistros()).toBe(true);
    });

    it('Gerar relatório em PDF - Analítico por Lista', () => expect(vendasProdModalidade.gerarRelatorioPDF()).toBe(true));
    it('Gerar relatório em XLS - Analítico por Lista', () => expect(vendasProdModalidade.gerarRelatorioXLS()).toBe(true));
    it('Gerar relatório em CSV - Analítico por Lista', () => expect(vendasProdModalidade.gerarRelatorioCSV()).toBe(true));

    it('Vendas de Produto no Período por Modalidade - Sintético por Lista', () => {
        //abre o filtro novamente
        vendasProdModalidade.abrirFiltro();
        //limpa a informações do filtro
        vendasProdModalidade.limparFiltro();
        //remove os labels de campo obrigatórios para conseguir selecionar a unidade, loja e o período
        vendasProdModalidade.selecionarUnidade(j.getValor('filial'));
        vendasProdModalidade.selecionarLoja(j.getValor('nomeAlteracaoCadLoja'));
        browser.executeScript("$('div.zh-validation').remove();");
        vendasProdModalidade.selecionarPeríodo(j.getValor('periodoComVenda'));
        vendasProdModalidade.selecionarDia('Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado');
        vendasProdModalidade.selecionarHorarioIni('0000');//00:00
        vendasProdModalidade.selecionarHorarioFin('2359');//23:59
        vendasProdModalidade.selecionarProduto(j.getValor('produtoInicialcadLoja'), j.getValor('produtoFinalcadLoja'));
        vendasProdModalidade.selecionarModalidade('Balcão', 'Delivery', 'Mesa', 'Terminal de Auto-Atendimento', 'Comanda');
        vendasProdModalidade.selecionarTipoRelatorio('Sintético');
        //emite o relatório com as informações inseridas no filtro
        vendasProdModalidade.emitirRelatorio();
        //verifica se após emitir o relatório o grid possui registros
        expect(vendasProdModalidade.gridPossuiRegistros()).toBe(true);
    });

    it('Gerar relatório em PDF - Sintético por Lista', () => expect(vendasProdModalidade.gerarRelatorioPDF()).toBe(true));
    it('Gerar relatório em XLS - Sintético por Lista', () => expect(vendasProdModalidade.gerarRelatorioXLS()).toBe(true));
    it('Gerar relatório em CSV - Sintético por Lista', () => expect(vendasProdModalidade.gerarRelatorioCSV()).toBe(true));
});