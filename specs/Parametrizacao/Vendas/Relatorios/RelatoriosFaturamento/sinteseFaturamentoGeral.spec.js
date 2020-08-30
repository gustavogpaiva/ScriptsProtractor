const loginPage = require('../../../../../page-objects/login.po.js');
const sintese = require('../../../../../page-objects/Parametrizacao/Vendas/Relatorios/RelatoriosFaturamento/sinteseFaturamentoGeral.po.js');
const h = require('../../../../../page-objects/helper.po.js');
const j  = require('../../../../../json/leitorJson.po.js');

describe('Testes da Tela Sintese de Faturamento (Geral/Modalidade)', () => {

    //executa o login o sistema
    beforeAll(() => {
        loginPage.login();
        h.tela('Síntese de Faturamento por Modalidade (Geral/Modalidade)');
    });

    afterAll(() => h.sairDoSistema());

    it('Sintese de Faturamento (Geral/Modalidade) - Analítico', ()  => {
        //limpa a informações do filtro
        sintese.limparFiltro();
        //remove os labels de campo obrigatórios para conseguir selecionar a unidade, loja e o período
        browser.executeScript("$('div.zh-validation').remove();");
        sintese.selecionarUnidade(j.getValor('filial'));
        sintese.selecionarLoja(j.getValor('nomeAlteracaoCadLoja'));
        browser.executeScript("$('div.zh-validation').remove();");
        sintese.selecionarPeríodo(j.getValor('periodoComVenda'));
        sintese.selecionarModalidade();
        sintese.selecionarTipoRelatorio('Analítico');
        //emite o relatório com as informações inseridas no filtro
        sintese.emitirRelatorio();
        //verifica se após emitir o relatório o grid possui registros
        expect(sintese.gridPossuiRegistros()).toBe(true);
    });

    it('Gerar relatório em PDF - Analítico', () => expect(sintese.gerarRelatorioPDF()).toBe(true));
    it('Gerar relatório em XLS - Analítico', () => expect(sintese.gerarRelatorioXLS()).toBe(true));
    it('Gerar relatório em CSV - Analítico', () => expect(sintese.gerarRelatorioCSV()).toBe(true));

    it('Sintese de Faturamento (Geral/Modalidade) - Sintético', ()  => {
        //abre o filtro novamente
        sintese.abrirFiltro();
        //limpa a informações do filtro
        sintese.limparFiltro();
        //remove os labels de campo obrigatórios para conseguir selecionar a unidade, loja e o período
        browser.executeScript("$('div.zh-validation').remove();");
        sintese.selecionarUnidade(j.getValor('filial'));
        sintese.selecionarLoja(j.getValor('nomeAlteracaoCadLoja'));
        browser.executeScript("$('div.zh-validation').remove();");
        sintese.selecionarPeríodo(j.getValor('periodoComVenda'));
        sintese.selecionarModalidade();
        sintese.selecionarTipoRelatorio('Sintético');
        //emite o relatório com as informações inseridas no filtro
        sintese.emitirRelatorio();
        //verifica se após emitir o relatório o grid possui registros
        expect(sintese.gridPossuiRegistros()).toBe(true);
    });

    it('Gerar relatório em PDF - Sintético', () => expect(sintese.gerarRelatorioPDF()).toBe(true));
    it('Gerar relatório em XLS - Sintético', () => expect(sintese.gerarRelatorioXLS()).toBe(true));
    it('Gerar relatório em CSV - Sintético', () => expect(sintese.gerarRelatorioCSV()).toBe(true));    
});