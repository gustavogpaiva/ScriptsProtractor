var ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
var z = new ZeedhiAPIConstructor(browser, protractor);
var h = require('../../../../page-objects/helper.po.js');
var j = require('../../../../json/leitorJson.po.js');

var controleAcessoCaixa = function () {
    
    var self = this;
    
    this.acessoCaixa = function () {
        h.getIdGrid().then(function(idGrid){
            z.widget.grid.click('CDGRUPOPER', j.getValor('grupoOperador'), idGrid);        
        });
        h.navegar('Permissões do Grupo de Operador');
        z.component.footer.clickCenterActionByLabel('Editar');
        //trocar Operador
        h.selectNative('IDTROCOPER', 'Não permite acesso');
        //devolução item
        h.selectNative('IDDEVITEM', 'Não permite acesso');
        //cancela cupom
        h.selectNative('IDCANCCUPOM', 'Não permite acesso');
        //cancela ultimo item
        h.selectNative('IDCANCULTITEM', 'Não permite acesso');
        //Cancela Item Genérico
        h.selectNative('IDCANCITGEN', 'Não permite acesso');
        //Cancela Mesa/Comanda
        h.selectNative('IDCANCMESCOM', 'Não permite acesso');
        //Consulta Saldo
        h.selectNative('IDCONSALDO', 'Não permite acesso');
        //Cupom com Desconto
        h.selectNative('IDCUPDESC', 'Não permite acesso');
        //Produto Combinado
        h.selectNative('IDPRODCOMB', 'Não permite acesso');
        //Consulta Preço
        h.selectNative('IDCONSPREC', 'Não permite acesso');
        //Relatórios Fiscais
        h.selectNative('IDRELFISCAIS', 'Não permite acesso');
        //Administração TEF
        h.selectNative('IDADMTEF', 'Não permite acesso');
        //Sangria
        h.selectNative('IDSANGRIA', 'Não permite acesso');
        //Suprimento
        h.selectNative('IDSUPRIME', 'Não permite acesso');
        //Leitura X
        h.selectNative('IDLEITUX', 'Não permite acesso');
        //Redução Z
        h.selectNative('IDREDUCZ', 'Não permite acesso');
        //Abrir Gaveta
        h.selectNative('IDABRGAVE', 'Não permite acesso');
        //Observação do Pedido
        h.selectNative('IDOBSPEDI', 'Não permite acesso');
        //Fechar Caixa
        h.selectNative('IDFECHACAIXA', 'Não permite acesso');
        //Bloquear Caixa
        h.selectNative('IDBLOQCAIXA', 'Não permite acesso');
        //Liberar Mesa
        h.selectNative('IDLIBERAMESA', 'Não permite acesso');
        //Retirar Consumação
        h.selectNative('IDRETICONSU', 'Não permite acesso');
        //Retirar Couvert
        h.selectNative('IDRETICOUV', 'Não permite acesso');
        //Retirar Taxa de Serviço
        h.selectNative('IDRETITXSERV', 'Não permite acesso');
        //Agrupar Mesas
        h.selectNative('IDAGRUPAMESA', 'Não permite acesso');
        //Cancelar Agrupamento/Separar Mesa
        h.selectNative('IDCANCAGPSEPMESA', 'Não permite acesso');
        //Transferir Mesa
        h.selectNative('IDTRANSFMESA', 'Não permite acesso');
        //Transferir Produto
        h.selectNative('IDTRANSPROD', 'Não permite acesso');
        //Relatório de Produtos/Vendedor
        h.selectNative('IDRELPRODVEND', 'Não permite acesso');
        //Pesquisar Produtos
        h.selectNative('IDPESQPROD', 'Não permite acesso');
        //Importar Dados
        h.selectNative('IDIMPORTDADOS', 'Não permite acesso');
        //Posição Mesa
        h.selectNative('IDPOSIMESA', 'Não permite acesso');
        //Reservar Mesa
        h.selectNative('IDRESEMESA', 'Não permite acesso');
        //Alterar Nr. Pessoas
        h.selectNative('IDALTNRPESS', 'Não permite acesso');
        //Parcial Conta
        h.selectNative('IDPARCONTA', 'Não permite acesso');
        //Abertura de Caixa
        h.selectNative('IDABERCAIXA', 'Não permite acesso');
        //Multiplicador Produto
        h.selectNative('IDMULTPROD', 'Não permite acesso');
        //Troca de Mercadoria
        h.selectNative('IDTROCAMERCA', 'Não permite acesso');
        //Cupom com Acréscimo
        h.selectNative('IDCUPOMACRESC', 'Não permite acesso');
        //Transferência de Saldo (Cred. Pessoal)
        h.selectNative('IDTRANSFSALDO', 'Não permite acesso');
        z.component.footer.clickRightActionByLabel('Salvar');
        h.navegar('Grupo de Supervisores');
        z.component.footer.clickCenterActionByLabel('Adicionar');
        h.autoComplete('DSGRUPOPER', j.getValor('grupoSupervisor'));
        z.component.footer.clickRightActionByLabel('Salvar');
        z.component.footer.clickLeftActionByLabel('Voltar');
    };
    
    this.editar = function () {
        z.widget.grid.click('CDGRUPOPER', j.getValor('grupoOperador'), '3361788051232136741510');
        h.navegar('Permissões do Grupo de Operador');
        z.component.footer.clickRightActionByLabel('Alt. Automática');
        z.field.fieldFunctions.click('DSSENHACAIXA');
        z.widget.grid.checkAllRows('9999');
        z.component.footer.clickRightActionByLabel('Ok');
        h.selectNative('VALUE', 'Permite Acesso');
        z.component.footer.clickRightActionByLabel('Salvar');
    };
    
    this.excluir = function () {
        z.widget.grid.click('CDGRUPOPER', j.getValor('grupoOperador'), '3361788051232136741510');
        h.navegar('Grupo de Supervisores');
        z.widget.grid.click('CDGRUPOPER', j.getValor('grupoOperador'), '3361788053854862972267');
        z.component.footer.clickCenterActionByLabel('Excluir');
        z.component.alert.clickButton('Sim');
    };
};
module.exports = new controleAcessoCaixa();