const loginPage = require('../../../../../page-objects/login.po.js');
const producaoKds = require('../../../../../page-objects/Parametrizacao/Vendas/Relatorios/RelatoriosKDS/tempoProducaoKDS.po.js');
const h = require('../../../../../page-objects/helper.po.js');
const j  = require('../../../../../json/leitorJson.po.js');

describe('Testes da Tela Tempo de Produção KDS',  () => {

    //executa o login o sistema
    beforeAll(() => {
        loginPage.login();
        h.tela('Tempo Total de Produção no KDS');
    });

    afterAll(() => h.sairDoSistema());

    it('Tempo de Produção no KDS - Analítico', ()  => {
        //limpa a informações do filtro        
        producaoKds.limparFiltro();
        //remove os labels de campo obrigatórios para conseguir selecionar a unidade e o período
        producaoKds.selecionarUnidade(j.getValor('filial'));
        browser.executeScript("$('div.zh-validation').remove();");
        producaoKds.selecionarPeríodo(j.getValor('periodoComVenda'));
        producaoKds.selecionarTipoRelatorio('Analítico');
        //emite o relatório com as informações inseridas no filtro
        producaoKds.emitirRelatorio();
        //verifica se após emitir o relatório o grid possui registros
        expect(producaoKds.gridPossuiRegistros()).toBe(true);
    });

    it('Gerar relatório em PDF - Analítico', () => expect(producaoKds.gerarRelatorioPDF()).toBe(true));
    it('Gerar relatório em XLS - Analítico', () => expect(producaoKds.gerarRelatorioXLS()).toBe(true));
    it('Gerar relatório em CSV - Analítico', () => expect(producaoKds.gerarRelatorioCSV()).toBe(true));

    it('Tempo de Produção no KDS - Sintético', ()  => {
        //abre o filtro novamente
        producaoKds.abrirFiltro();
        //limpa a informações do filtro        
        producaoKds.limparFiltro();
        //remove os labels de campo obrigatórios para conseguir selecionar a unidade e o período
        producaoKds.selecionarUnidade(j.getValor('filial'));
        browser.executeScript("$('div.zh-validation').remove();");
        producaoKds.selecionarPeríodo(j.getValor('periodoComVenda'));
        producaoKds.selecionarTipoRelatorio('Sintético');
        //emite o relatório com as informações inseridas no filtro
        producaoKds.emitirRelatorio();
        //verifica se após emitir o relatório o grid possui registros
        expect(producaoKds.gridPossuiRegistros()).toBe(true);
    });

    it('Gerar relatório em PDF - Sintético', () => expect(producaoKds.gerarRelatorioPDF()).toBe(true));
    it('Gerar relatório em XLS - Sintético', () => expect(producaoKds.gerarRelatorioXLS()).toBe(true));
    it('Gerar relatório em CSV - Sintético', () => expect(producaoKds.gerarRelatorioCSV()).toBe(true));    
});