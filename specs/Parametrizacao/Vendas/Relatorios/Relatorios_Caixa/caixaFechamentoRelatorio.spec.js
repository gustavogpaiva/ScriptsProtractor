const loginPage = require('../../../../../page-objects/login.po.js');
const relfechamentoCaixa = require('../../../../../page-objects/Parametrizacao/Vendas/Relatorios/Relatorios_Caixa/caixaFechamentoRelatorio.po.js');
const h = require('../../../../../page-objects/helper.po.js');
const j = require('../../../../../json/leitorJson.po.js');

describe('Testes da Tela Fechamento de Caixa (Relatório)', () => {
    
    //executa o login o sistema
    beforeAll(() => {
        loginPage.login();
        browser.sleep(7000);
        browser.get(browser.params.applicationUrl + '/man/#/man#reports%2Fvnd05606_relFechamentoCaixaControle');
    });

    afterAll(() => h.sairDoSistema());

    it('Gerar Relatório de Fechamento de Caixa| Controle', () => {
        relfechamentoCaixa.selecionarTipoRelatorio('Controle');
        relfechamentoCaixa.selecionarUnidade(j.getValor('filial'));
        relfechamentoCaixa.selecionarLoja(j.getValor('nomeAlteracaoCadLoja'));
        relfechamentoCaixa.selecionarPeriodo(j.getValor('periodoComVenda'));
        relfechamentoCaixa.selecionarCaixa(j.getValor('nmcaixa'));
        expect(relfechamentoCaixa.emitirRelatorio()).toBe(true);
    });
    
    it('Gerar Relatório de Fechamento de Caixa| Por Loja', () => {
        relfechamentoCaixa.selecionarTipoRelatorio('Por Loja');
        relfechamentoCaixa.selecionarUnidade(j.getValor('filial'));
        relfechamentoCaixa.selecionarLoja(j.getValor('nomeAlteracaoCadLoja'));
        relfechamentoCaixa.selecionarPeriodo(j.getValor('periodoComVenda'));
        relfechamentoCaixa.selecionarCaixa(j.getValor('nmcaixa'));
        expect(relfechamentoCaixa.emitirRelatorio()).toBe(true);
    });
    
    it('Gerar Relatório de Fechamento de Caixa| Por Caixa', () => {
        relfechamentoCaixa.selecionarTipoRelatorio('Por Caixa');
        relfechamentoCaixa.selecionarUnidade(j.getValor('filial'));
        relfechamentoCaixa.selecionarLoja(j.getValor('nomeAlteracaoCadLoja'));
        relfechamentoCaixa.selecionarPeriodo(j.getValor('periodoComVenda'));
        relfechamentoCaixa.selecionarCaixa(j.getValor('nmcaixa'));
        expect(relfechamentoCaixa.emitirRelatorio()).toBe(true);
    });
});