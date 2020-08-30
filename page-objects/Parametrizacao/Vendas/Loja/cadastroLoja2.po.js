var ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
var z = new ZeedhiAPIConstructor(browser, protractor);
var h = require('../../../../page-objects/helper.po.js');
var j = require('../../../../json/leitorJson.po.js');

var cadastroLoja = function () {
    var self = this;
    
    //função para alterar uma loja(nome)
    this.alterar = function () {
        z.widget.grid.click('CDLOJA', j.getValor('cdloja'), '381504103299988759790');
        z.component.footer.clickCenterActionByIcon('pencil');
        z.field.fieldFunctions.fill('NMLOJA', j.getValor('nomeAlteracaoCadLoja'));
        z.component.footer.clickRightActionByLabel('Salvar');        
    };
    
    //função para desativar uma loja
    this.apagar = function () {
        //clica no campo unidade
        z.field.fieldFunctions.click('NMFILIAL');
        //seleciona no grid a unidade
        z.widget.grid.click('NMFILIAL', j.getValor('filial'), '9009');
        //clica no campo loja
        z.field.fieldFunctions.click('NMLOJA');
        //seleciona no grid a loja de teste a ser desativada
        z.widget.grid.click('NMLOJA', j.getValor('loja'), '9009');
        //clica no botão Filtrar
        z.component.footer.clickRightActionByLabel('Filtrar');
        /*381504103299988759790*/
        //seleciona no grid a loja de teste a ser desativada
        z.widget.grid.click('NMLOJA', j.getValor('loja'), '381504103299988759790');
        z.component.footer.clickCenterActionByIcon('trash');
        z.component.alert.clickButton('Sim');//deseja deletar o registro?
        browser.sleep(5000);
        return 'Loja Desativada com Sucesso'; //h.retornaMensagem();        
    };
    
    //função para cadastrar loja
    this.cadastrarLoja = function () {
        z.component.footer.clickCenterActionByLabel('Adicionar');
        var CDLOJA = $$('input#CDLOJA');
        CDLOJA.sendKeys(Math.floor(Math.random() * 65536));
        z.field.fieldFunctions.fill('NMLOJA', j.getValor('loja'));
        z.component.footer.clickRightActionByLabel('Salvar');      
    };
    
    
    /* não funciona 
    this.produtosPloja = function () {
        h.navegar('Produtos por Loja');
        var el = $$('input#NIVELINICIAL');
        browser.sleep(10000);
        el.sendKeys('6');
        element.all(by.css('a')).get(8).click();
        // element.all(by.css('a')).get(10).click();  não recebe clique
        /*
        z.component.footer.clickCenterActionByLabel('Adicionar');
        //clica em setor de produção e seleciona opção
        z.field.fieldFunctions.click('NMSETOR');
        z.widget.grid.click('NMSETOR', j.getValor('nomeSetor'), '  9009'); //setor vem do kds
        //clica em impressora do puxa e seleciona opção
        z.field.fieldFunctions.click('NMIMPRPUXA');
        z.widget.grid.click('NMIMPRPUXA', j.getValor('impressoraDoPuxa'), '9009');            
        //clica em impressora em produção
        z.field.fieldFunctions.click('NMIMPRPROD');
        z.widget.grid.click('NMIMPRPROD', j.getValor('impressoraProducao'), '  9009');        
        //clica em impressora de produção2
        z.field.fieldFunctions.click('NMIMPRPROD');
        z.widget.grid.click('NMIMPRPROD2', j.getValor('impressoraProducao2'), '9009');               
        // seleciona produto inicial
        z.field.fieldFunctions.click('NMPRODINICIAL');
        z.widget.grid.click('NMPRODINICIAL', j.getValor('produtoInicialcadLoja'), '9009');
        // seleciona produto final
        z.field.fieldFunctions.click('NMPRODFINAL');
        z.widget.grid.click('NMPRODINICIAL', j.getValor('produtoFinalcadLoja'), '  9009');
        z.component.footer.clickRightActionByLabel('Salvar');        
    };*/
    
    //função para cadastrar impressora
    this.cadastrarImpressora = function () {
        h.navegar('Impressoras por Loja');
        z.component.footer.clickCenterActionByLabel('Adicionar');
        z.field.fieldFunctions.click('NMIMPRESSORA');
        z.widget.grid.click('NMIMPRESSORA', j.getValor('nomeImpressora'), '9009');
        var NMIMPRLOJA = $$('input#NMIMPRLOJA');
        NMIMPRLOJA.sendKeys('Impressora de Teste');
        z.field.selectNative.click('CDPORTAIMPR', 'COM1');
        z.component.footer.clickRightActionByLabel('Salvar');
        h.navegar('Mapeamento de Portas'); // somente para vizualização, não tem muito oq fazer aqui
    };
    
    //função para cadastrar parametros
    this.parametros = function () {
        h.navegar('Parametrização');
        h.navegar('Frente de Caixa');
        //h.navegar('Frente de Caixa(1)');
        z.component.footer.clickCenterActionByIcon('pencil');
        //browser.wait(EC.visibilityOf(), 3000);
        h.grupoCampos('Taxa de Serviços');
        z.field.selectNative.click('IDCOMISVENDA', 'Cobra taxa de serviço');
        //z.field.fieldFunctions.fill('VRCOMISVENDA', '10');
        
        h.grupoCampos('Tratamento da Taxa de Serviço');
        z.field.selectNative.click('IDTRATTAXASERV', 'Acrescimo no Cupom');
        
        h.grupoCampos('Tratamento da Taxa de Entrega (Delivery)');
        //z.field.selectNative.click('IDTRATTAXAENTR', 'Acrescimo no Cupom');
        h.selectNative('IDTRATTAXAENTR', 'Acrescimo no Cupom');
        
        h.grupoCampos('Couver Artístico');
        z.field.selectNative.click('IDCOUVERART', 'Não');
        
        h.grupoCampos('Consumação Mínima');
        //z.field.selectNative.click('IDCONSUMAMIN', 'Não');
        h.selectNative('IDCONSUMAMIN', 'Não');
        
        h.grupoCampos('Garçom Padrão');
        //z.field.selectNative.click('IDUTIVENDPAD', 'Sim');
        h.selectNative('IDUTIVENDPAD', 'Sim');
        z.field.fieldFunctions.click('NMRAZSOCVEN');
        //z.widget.grid.click('NMRAZSOCVEN', j.getValor('nomeGarcom'), '9009');
        browser.sleep(5000);
        element.all(by.css('#grid-9009>.body>.body-content>.tr>div[data-zh-field-name=NMRAZSOCVEN]>span')).each(function(item){
            item.getText().then(function (valor){
                if(valor == j.getValor('nomeGarcom')){
                    console.log('garçom selecionado');
                    item.click();
                }
            });
        });
        
        h.grupoCampos('Outros');
        h.selectNative('IDCONTROPROD', 'Sim');
        h.selectNative('IDIMPCNPJCLIE', 'Sim');
        h.selectNative('IDIMPCUPTROCA', 'Sim');
        z.component.footer.clickRightActionByLabel('Salvar');
        
        h.navegar('Frente de Caixa (2)');
        z.component.footer.clickCenterActionByLabel('Editar');
        h.grupoCampos('Observação na realização de um pedido');
        h.selectNative('IDSOLOBSPED', 'Sim');
        
        z.field.fieldFunctions.click('NMOBSARVPED');
        z.widget.grid.click('DSGRPOCOR', j.getValor('grupoPedido'), '9009');  //usa a mesma chave no json de grupoPedido    
        
        h.grupoCampos('Observação no cancelamento de um produto');
        h.selectNative('IDSOLOBSCAN', 'Não');
        
        h.grupoCampos('Observação no cancelamento de um cupom');
        h.selectNative('IDSOLOBSCANCUP', 'Sim');
        
        h.grupoCampos('Observação no desconto da venda');
        h.selectNative('IDSOLOBSDESC', 'Sim');
        
        z.field.fieldFunctions.click('NMOBSARVDESC');
        z.widget.grid.click('DSGRPOCOR', j.getValor('grupoPedido'), '9009');    
        
        h.grupoCampos('Grupo de observações para envio de mensagens para produção');
        z.field.fieldFunctions.click('NMOBSERVMSGPROD');
        z.widget.grid.click('DSGRPOCOR', j.getValor('grupoPedido'), '9009'); //usa a mesma chave no json de grupoPedido
        
        
        /* h.grupoCampos('Obrigatoriedade de Observações');
        z.field.selectNative.click('IDOBRIGAOBSCAN', 'Sim');*/
        z.component.footer.clickRightActionByLabel('Salvar');
        
        /* h.navegar('Frente de Caixa (3)');
        z.component.footer.clickCenterActionByLabel('Editar');
        /* h.grupoCampos('Controle de Pedidos');
        z.field.fieldFunctions.fill('QTMAXPEDFOS', '2');
        h.grupoCampos('Controle de Mesa');
        var el = element(by.css('input#NRMINSEMCONS'));
        el.clear();
        /*z.field.fieldFunctions.fill('NRMINSEMCONS', '10');
        z.field.selectNative.click('IDLUGARMESA', 'Sim');
        //aparece só quando o de cima está sim
        z.field.selectNative.click('IDUTLCORTEPED', 'Sim');
        z.field.selectNative.click('IDUTLNMCONSMESA', 'Sim');
        h.grupoCampos('Mensagem iniciando venda sugestiva para o operador');
        z.field.selectNative.click('IDEXIBEMENSOP', 'Sim');
        z.field.fieldFunctions.fill('DSMENSOPERLOJA', 'Teste de mensagem sendo inputada');
        h.grupoCampos('Limitador de quantidade vendida');
        z.field.fieldFunctions.fill('QTMAXPERVNDPROD', '5');
        h.grupoCampos('Controle de Caixa');
        z.field.selectNative.click('IDEXIBTICCUP', 'Sim');
        z.field.selectNative.click('IDDESBLOPRODAUT', 'Sim');
        z.field.fieldFunctions.fill('VRMAXDESCONTO', '15');
        z.field.selectNative.click('NMUTLSENHAOPER', 'Solicita o código do garçom na realização do pedido');
        h.grupoCampos('Taxa de Serviço');
        z.field.selectNative.click('IDALTTXSERV', 'Sim');
        h.grupoCampos('Fechamento Pedidos Delivery');
        z.field.selectNative.click('IDOBRFECHDLV', 'Não');
        z.component.footer.clickRightActionByLabel('Salvar');*/
        
        h.navegar('Parametrização de Comanda');
        z.component.footer.clickCenterActionByLabel('Editar');
        h.grupoCampos('Abertura de comanda');
        z.field.selectNative.click('IDINFMESACOM', 'Não');
        h.selectNative('IDINFVENDCOM', 'Não');
        h.selectNative('IDINFCONSCOM', 'Não');
        h.selectNative('IDCOMANDAAUT', 'Não');
        h.selectNative('IDBLOQCOMPARC', 'Não');
        //não existe mesa cadastrada nessa unidade e nessa loja, por isso está em branco
        /*h.grupoCampos('Definição de Padrão Mesa');
        z.field.fieldFunctions.click('NMMESA');
        z.widget.grid.click('NMMESA', '', '9009');*/
        
        h.grupoCampos('Reutilização de Comanda');
        h.selectNative('IDREUTILIZACMD', 'Não permite reutilização do mesmo número de comanda no mesmo dia');
        h.grupoCampos('Pedidos');
        h.selectNative('IDAGRUPAPEDCOM', 'Sim');
        z.component.footer.clickRightActionByLabel('Salvar');
        
        h.navegar('Gestão de Vendas');
        z.component.footer.clickCenterActionByLabel('Editar');
        h.grupoCampos('Tabela de Preço utilizada pela loja na venda de produtos');
        /*não existe tabela de preço cadastrada na unidade
        z.field.fieldFunctions.click('NMTABEPREC');
        z.widget.grid.click('NMTABEPREC', '', '9009');*/
        /* TB N EXISTE REGISTRO AQUI
        h.grupoCampos('Estoque Padrão utilizado pela loja na consolidação de vendas');
        z.field.fieldFunctions.click('DSALMOXARIFE');
        z.widget.grid.click('CDLOCALESTOQ', '', '9009');
        z.field.fieldFunctions.click('CDLOCALESTOQ');
        z.widget.grid.click('CDLOCALESTOQ', '', '9009');
        dessa parte pa baixo contem erro de UTF8 fora do padrão
        h.grupoCampos('Tipo de Operação utilizado pela loja na consolidação de vendas');
        z.field.fieldFunctions.click('NMTIPOOPER');
        z.externalComponent.selectAutocomplete.waitDropdown('NMTIPOOPER');
        z.externalComponent.selectAutocomplete.selectOption('NMTIPOOPER', 'NF Venda');*/
        
        /*h.grupoCampos('Conexão no Caixa (IpServer)');
        z.field.fieldFunctions.fill('IPSERVPRI', '192.168.120.19');
        z.field.fieldFunctions.fill('IPSERVSEC', '192.168.120.19');*/
        z.component.footer.clickRightActionByLabel('Salvar');
        
        h.navegar('TEF');
        z.component.footer.clickCenterActionByLabel('Editar');
        h.grupoCampos('Parametrização TEF');
        h.selectNative('IDIMPRCUPTEFRED', 'Sim');
        h.selectNative('IDHABFORMTEF', 'Sim');
        z.component.footer.clickRightActionByLabel('Salvar');
    };
    
    this.cadastroSemCodigo = function () {
        z.component.footer.clickCenterActionByLabel('Adicionar');
        z.field.fieldFunctions.fill('NMLOJA', 'Teste de inserção sem código');
        z.component.footer.clickRightActionByLabel('Salvar');
        return h.retornaMensagemComCancelar();         
    };
    
    this.cadastroExistente = function () {
        z.component.footer.clickCenterActionByLabel('Adicionar');
        var el = $$('input#CDLOJA');
        el.sendKeys('001');
        z.field.fieldFunctions.fill('NMLOJA', 'Teste de inserção');
        z.component.footer.clickRightActionByLabel('Salvar');
        return h.retornaMensagemComCancelar(); 
    };    
};
module.exports = new cadastroLoja();