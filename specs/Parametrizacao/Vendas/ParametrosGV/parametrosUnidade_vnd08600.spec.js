var ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
var z = new ZeedhiAPIConstructor(browser, protractor);
var loginPage = require('../../../../page-objects/login.po.js');
var unidade = require('../../../../page-objects/Parametrizacao/Vendas/ParametrosGV/parametrosUnidade_vnd08600.po.js');
var h = require('../../../../page-objects/helper.po.js');
var j = require('../../../../json/leitorJson.po.js');

describe('Testes da tela Parâmetros da Unidade', function () {
    beforeAll(function(){
        loginPage.login();
        h.tela('Parâmetros da Unidade');
    });

    afterAll(function(){
        h.sairDoSistema();
    });

    it('Parametrização da aba Frente de Caixa', function(){
       expect(unidade.frenteDeCaixa(j.getValor('cdfilial'), j.getValor('operador'), j.getValor('cliente'), j.getValor('centroCusto'), j.getValor('tipoConsumidor'), 'Não', 'TEKNISA', 'teste', '10', '5', 'Sim', 'Sim', '100,00', 'Não Utiliza')).toBe(true);
       expect(unidade.definicoesNfceSat('Sim', '1', '2', '3', 'Sim', '235647122222', '121212', '21521612121', 'Homologação', 'teknisa', '1234', 'Não', 'Sim', 'c:\\workfolder', '9KCSRNC7IKGK47HG73XIF27QB1BQDVJCQRAG', '9KCSRNC7IKGK47HG73XIF27QB1BQDVJCQRAG', '000006', '000001', '3.10', '1.00', '5', 'c:\\workfolder', 'Cancelado', 'Sim', 'Hora em Hora', 'c:\\xampp\\php', 'c:\\workfolder\\nfce', 'Não', 'Sim', 'Sim', '9999')).toBe('Operação realizada com sucesso.');
       expect(unidade.controleCaixa('10,00', 'Não', 'Sim', '15', 'Sim', 'Sim', '100', '300', '2', '6', '120', 'Sim', 'Sim', 'Sim', 'Não utiliza', 'Não solicita informações do cheque', 'Sim', 'Não')).toBe('Operação realizada com sucesso.');
       expect(unidade.definicoesConsumidor('Sim', 'Sim', 'Não utiliza criptografia', 'Sim', '10', '1', '10', 'Sim', 'Sim', 'Imprime limite diário disponível para consumo no cupom fiscal e no comprovante', 'Sim', 'Imprime saldo total no cupom fiscal')).toBe('Operação realizada com sucesso.');
    });

    it('Parametrização da aba Regras de Preço', function(){
        expect(unidade.regrasPreco(j.getValor('cdfilial'), j.getValor('tabelaDePreco'), 'Sim', 'Sim', 'Sim', 'Custo Médio Líquido da Época')).toBe('Operação realizada com sucesso.');
    });

    it('Parametrização da aba Consolidação de vendas', function(){
        expect(unidade.consolidacaoVendas(j.getValor('cdfilial'), 'Não', '02/05/2018', 'Atualiza estoque da composição do produto', j.getValor('nomeSerie'), j.getValor('cdtipoRetirada'), j.getValor('nomeSetor'), 'Não', 'Sim', 'Não', 'Não', 'Não')).toBe('Operação realizada com sucesso.');
    });

    it('Parametrização da aba Integração', function(){
        expect(unidade.integracao(j.getValor('cdfilial'), 'Sim', 'Sim', 'Sim', 'Sim', '78451', '11251')).toBe('Operação realizada com sucesso.');
    });

    it('Parametrização da aba Gestão de Vendas', function(){
        expect(unidade.gestaoVendas(j.getValor('cdfilial'), '', 'Sim', '10', '10', 'Não', 'Gera um sequencial por dia para cada unidade (Somente dias com venda)', 'Sim', 'Tabela', 'Sim', 'Previsão de consumo gerada com base na média aritmética de vendas', 'Sim', 'Sim', 'Sim', j.getValor('tipoRecebimento'))).toBe('Operação realizada com sucesso.');
        expect(unidade.datasRestricoes('01/02/2018', 'Sim', '365', 'Sim', '999', 'Sim')).toBe('Operação realizada com sucesso.');
        expect(unidade.dayPart('08:00:00','11:59:59','12:00:00','14:59:59','15:00:00','15:59:59','16:00:00','07:59:59')).toBe('Operação realizada com sucesso.');
        expect(unidade.adicionarEmail(j.getValor('cdgerente'), j.getValor('email'))).toBe('Operação realizada com sucesso.');
        expect(unidade.editarEmail(j.getValor('cdgerente'), j.getValor('email'))).toBe('Operação realizada com sucesso.');
        expect(unidade.excluirEmail(j.getValor('cdgerente'))).toBe('Operação realizada com sucesso.');
    });

    it('Parametrização da aba Produtos por Unidade', function(){
        //filtra os produtos da unidade e verifica se estão sendo exibidos no grid
        expect(unidade.produtosUnidade(j.getValor('cdfilial'), j.getValor('produtoInicialcadLoja'), j.getValor('produtoFinalcadLoja'))).toBe(true);
        //valida se os parametros estão sendo alterados e exibindo notificação após alterar o parâmetro
        var ultProdSolicitaObrigatorio = h.gridGetText('4647738367204214471062', 1, 4);
        expect(unidade.produtoObrigatorio()).toBe('Operação realizada com sucesso.');
        expect(ultProdSolicitaObrigatorio).not.toEqual(h.gridGetText('4647738367204214471062', 1, 4));
        //parametriza as informações de um dos produtos exibidos no grid
        expect(unidade.parametrizaProdutos(Math.floor((Math.random() * 10) + 1), Math.floor((Math.random() * 10) + 1), Math.floor((Math.random() * 25) + 1), Math.floor((Math.random() * 10) + 1), Math.floor((Math.random() * 10) + 1))).toBe('Operação realizada com sucesso.');
        //valida se os parâmetros que define o produto ativo ou inativo estão sendo alterados e exibindo notificação após alterar o parâmetro
        var produtoAtivo = h.gridGetText('4647738367204214471062', 2, 3);
        expect(unidade.ativarProdutos()).toBe('Operação realizada com sucesso.');
        expect(produtoAtivo).not.toEqual(h.gridGetText('4647738367204214471062', 2, 3));
        //atualiza os produtos da filial e aguarda exibir a notificação confirmando a atualização
        expect(unidade.atualizarProdutos()).toBe('Operação realizada com sucesso.');
        //realiza a exportação dos produtos de uma unidade para outra e aguarda notificação confirmando a exportação
        expect(unidade.exportarProdutos(j.getValor('cdfilial'), j.getValor('cdfilial2'), '', j.getValor('produtoInicialcadLoja'), j.getValor('produtoFinalcadLoja'))).toBe('Produtos exportados com sucesso!');
    });
});