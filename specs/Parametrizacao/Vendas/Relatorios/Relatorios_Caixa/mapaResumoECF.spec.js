const loginPage = require('../../../../../page-objects/login.po.js');
const mapaResumoECF = require('../../../../../page-objects/Parametrizacao/Vendas/Relatorios/Relatorios_Caixa/mapaResumoECF.po.js');
const h = require('../../../../../page-objects/helper.po.js');
const j = require('../../../../../json/leitorJson.po.js');

describe('Testes da Tela Mapa Resumo ECF (Relatório)', () => {

    //executa o login o sistema
    beforeAll(() => {
        loginPage.login();
        h.tela('Mapa Resumo ECF');
    });

    afterAll(() => {
        h.sairDoSistema();
    });

    afterAll(() => h.sairDoSistema());

    it('Gerar Relatório de Mapa Resumo ECF', () => {
    	mapaResumoECF.selecionarTipoRelatorio('São Paulo');
    	mapaResumoECF.selecionarRegiao(j.getValor('regiao'));
    	mapaResumoECF.selecionarUnidade(j.getValor('filial'));
    	mapaResumoECF.selecionarLoja(j.getValor('nomeAlteracaoCadLoja'));
    	mapaResumoECF.selecionarCaixa([j.getValor('nmcaixa')]);
    	mapaResumoECF.selecionarPeriodo(j.getValor('periodoComVenda'));
    	expect(mapaResumoECF.emitirRelatorio()).toBe(true);
    });
});