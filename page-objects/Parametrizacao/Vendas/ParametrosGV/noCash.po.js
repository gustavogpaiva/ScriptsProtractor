var ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
var z = new ZeedhiAPIConstructor(browser, protractor);
var h = require('../../../../page-objects/helper.po.js');
var j = require('../../../../json/leitorJson.po.js');
var noCash = function () {
    
    var self = this;
    
    this.nocash = function(){
        z.component.footer.clickCenterActionByLabel('Editar');
        // consulta saldo
        h.selectNative('CONSULTASALDO', 'Sim');
        // Consulta Extrato
        h.selectNative('CONSULTAEXTRATO', 'Sim');
        // Recarrega Cartão
        h.selectNative('RECARREGACARTAO', 'Sim');
        // Bloquea cartão
        h.selectNative('BLOQUEACARTAO', 'Sim');
        // Restrição Alimentar
        h.selectNative('RESTRICAOALIMENTAR', 'Sim');
        // Atualiza Cadastro
        h.selectNative('ATUALIZACADASTRO', 'Sim');
        // Altera Senha
        h.selectNative('TROCASENHA', 'Sim');
        // Visualiza Cardápio
        h.selectNative('VISUALIZACARDAPIO', 'Sim');
        // Limita Valor
        h.selectNative('RESTRICAOVALOR', 'Sim');
        // Fale Conosco
        h.selectNative('FALECONOSCO', 'Sim');
        // Recarga Automática de Cartão
        h.selectNative('RECARGAAUTOCARTAO', 'Sim');
        // Edita/Cadastra Cartão
        h.selectNative('EDITACARTAO', 'Sim');
        //  Realiza login utilizando Cliente
        h.selectNative('LOGINCLIENTE', 'Sim');
        z.component.footer.clickRightActionByLabel('Salvar');
        /*h.navegar('Unidade');
        z.component.footer.clickCenterActionByIcon('close-x')
        z.field.fieldFunctions.click('CDFILIAL');
        z.widget.grid.click('NMFILIAL', j.getValor('filial'), '9999', true);
        z.component.footer.clickRightActionByLabel('Ok');
        z.component.footer.clickRightActionByLabel('Filtrar');
        h.getIdGrid().then(function(idGrid){
            z.widget.grid.click('NMFILIAL', j.getValor('filial'), idGrid);
        });
        h.navegar('Tipos de Consumidor relacionados');
        z.field.fieldFunctions.click('NMRAZSOCCLIE');
        h.getIdGrid().then(function(idGrid){
            z.widget.grid.click('NMRAZSOCCLIE', j.getValor('cliente'), idGrid);        
        });
        z.component.footer.clickRightActionByLabel('Filtrar');*/
    };
};
module.exports = new noCash();