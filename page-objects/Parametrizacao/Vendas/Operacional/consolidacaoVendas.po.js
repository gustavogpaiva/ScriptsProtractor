var ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
var z = new ZeedhiAPIConstructor(browser, protractor);
var h = require('../../../../page-objects/helper.po.js');
var j = require('../../../../json/leitorJson.po.js');

var consolidacaoVendas = function () {
    //atualizar os parametros quando for corrigido os autoComplete
    
    var past30days = moment().subtract(30, 'days').calendar();
    var today = moment().format('DD/MM/YYYY');
    
    var self = this;
    
    this.vendas = function () {
        // filial
        z.field.fieldFunctions.click('NMFILIAL');
        z.widget.grid.click('NMFILIAL', j.getValor('filial'), '0');
        // loja
        z.field.fieldFunctions.click('NMLOJA');
        z.widget.grid.click('CDLOJA', j.getValor('cdloja'), '0');
        // caixa
        z.field.fieldFunctions.click('CDCAIXA');
        z.widget.grid.click('CDCAIXA', j.getValor('cdcaixa'), '9999', true);
        z.component.footer.clickRightActionByLabel('Ok');
        // tipo de retirada
        z.field.fieldFunctions.click('NMTIPORETI');
        z.widget.grid.click('CDTIPORETI', j.getValor('cdtipoRetirada'), '0');
        //nome do setor
        z.field.fieldFunctions.click('NMSETOR');
        z.widget.grid.click('CDSETOR', j.getValor('cdsetor'), '0');
        //data
        z.field.calendar.selectIntervalDate('DTVENDA', past30days,today, 'pt_br');
        //codigo cliente
        z.field.fieldFunctions.click('CDCLIENTE');
        z.widget.grid.click('CDCLIENTE', j.getValor('cliente'), '9999', true);
        z.component.footer.clickRightActionByLabel('Ok');
        //codigo tipo consumidor
        z.field.fieldFunctions.click('CDTIPOCONS');
        z.widget.grid.click('NMTIPOCONS', j.getValor('consumidor'),'9999', true);
        z.component.footer.clickRightActionByLabel('Ok');
        /* centro de custo cliente não tem registro
        z.field.fieldFunctions.click('CDCCUSCLIE');
        z.widget.grid.click('NMCCUSCLIE', j.getValor('centroCusto'),'9999', true)//no saas não tem centro de custo, adicionar no json depois
        z.component.footer.clickRightActionByLabel('Ok');*/
        // vendas
        z.field.fieldFunctions.click('NRSEQVENDA');
        z.widget.grid.checkAllRows('9999');
        z.component.footer.clickRightActionByLabel('Ok');
        // Agrupa itens de vendas para realizar consolidação
        z.field.selectNative.click('TODASNF2', 'Sim');
        // Somente itens de vendas não consolidados
        z.field.selectNative.click('TODASNF', 'Sim');
        z.component.footer.clickRightActionByLabel('Filtro');
        z.component.footer.clickRightActionByLabel('Consolidar Vendas');
        z.component.alert.clickButton('Sim');
        z.component.alert.clickMessageOk();
        z.component.alert.clickMessageOk();
        z.component.footer.clickLeftActionByLabel('Voltar');
    };
    
    this.cancelamento = function () {
        z.field.fieldFunctions.click('NMFILIAL');
        z.widget.grid.click('NMFILIAL', j.getValor('filial'), '0');
        z.field.fieldFunctions.click('NMLOJA');
        z.widget.grid.click('CDLOJA', j.getValor('cdloja'), '0');
        z.field.calendar.selectIntervalDate('DTVENDA', past30days,today, 'pt_br');
        z.field.fieldFunctions.click('CDCAIXA');
        z.widget.grid.click('CDCAIXA', j.getValor('cdcaixa'), '9999', true);
        z.component.footer.clickRightActionByLabel('Ok');
        //vendas
        z.field.fieldFunctions.click('LSTVENDAS');
        z.widget.grid.checkAllRows('9999');
        z.component.footer.clickRightActionByLabel('Ok');
        z.component.footer.clickRightActionByLabel('Filtro');
        z.component.footer.clickRightActionByLabel('Cancelar Consolidação');
        z.component.alert.clickButton('Sim');
        z.component.alert.clickMessageOk();
    };
    
    this.segundaConsolidacaoVendas = function () {
        self.vendas();
       /* z.field.fieldFunctions.click('NMLOJA');
        z.widget.grid.click('CDLOJA', '001', '0');
        z.field.fieldFunctions.click('CDCAIXA');
        z.widget.grid.checkAllRows('9999');
        z.component.footer.clickRightActionByLabel('Ok');
        z.field.fieldFunctions.click('NMTIPORETI');
        z.widget.grid.click('CDTIPORETI', '01', '0');
        z.field.fieldFunctions.click('NMSETOR');
        z.widget.grid.click('CDSETOR', '0003', '0');
        z.field.calendar.selectIntervalDate('DTVENDA', '01/06/2018', '31/07/2018', 'pt_br');
        z.field.fieldFunctions.click('CDCLIENTE');
        z.widget.grid.click('__CHECKBOX', '', '9999');
        z.component.footer.clickRightActionByLabel('Ok');
        z.field.fieldFunctions.click('CDTIPOCONS');
        z.widget.grid.checkAllRows('9999');
        z.component.footer.clickRightActionByLabel('Ok');
        /*centro de custo cliente não tem registro
        z.field.fieldFunctions.click('CDCCUSCLIE');
        z.widget.grid.checkAllRows('9999');
        z.component.footer.clickRightActionByLabel('Ok');*/
        // vendas 
      /* z.field.fieldFunctions.click('NRSEQVENDA');
        z.widget.grid.checkAllRows('9999');
        z.component.footer.clickRightActionByLabel('Ok');
        
        z.field.selectNative.click('TODASNF2', 'Sim');
        z.field.selectNative.click('TODASNF', 'Sim');
        z.component.footer.clickRightActionByLabel('Filtro');
        z.component.footer.clickRightActionByLabel('Consolidar Vendas');
        z.component.alert.clickButton('Sim');
        z.component.alert.clickMessageOk();
        z.component.footer.clickLeftActionByLabel('Voltar');*/
    };
    
    this.editarParametrosConsolidacaoVendas = function () {
        // esperar a remoção do autoComplete da tela
        // filial
        z.field.fieldFunctions.click('NMFILIAL');
        z.widget.grid.click('NMFILIAL', j.getValor('filial'), '0');
        z.component.footer.clickRightActionByLabel('Filtro');
        z.widget.grid.click('NMFILIAL', j.getValor('filial'), '4647738362226231657726');
        h.navegar('Consolidação de vendas');
        z.component.footer.clickCenterActionByLabel('Editar');
        h.grupoCampos('Restrição de Datas');
        z.field.selectNative.click('IDCONSUMIOBR', 'Sim');
        z.field.fieldFunctions.click('DTINITESCONS');
        z.field.calendar.clickDate('02/02/2018', 'pt_br'); 
        h.grupoCampos('Padões da consolidação');
        z.field.selectNative.click('IDATUEST', 'Atualiza estoque da composição do produto');
        /*z.field.fieldFunctions.click('DSSERIE');
        z.externalComponent.selectAutocomplete.waitDropdown('DSSERIE');
        z.externalComponent.selectAutocomplete.selectOption('DSSERIE', 'SERIE 01');*/
        z.field.fieldFunctions.click('NMTIPORETI');
        z.externalComponent.selectAutocomplete.waitDropdown('NMTIPORETI');
        z.externalComponent.selectAutocomplete.selectOption('NMTIPORETI', 'Consumo Produção');
        z.field.fieldFunctions.click('NMSETOR');
        z.externalComponent.selectAutocomplete.waitDropdown('NMSETOR');
        z.externalComponent.selectAutocomplete.selectOption('NMSETOR', 'EXPEDIÇÃO');
        z.field.selectNative.click('IDPERCONVESTNEG', 'Sim');
        z.field.selectNative.click('IDVISUPRODNEG', 'Sim');
        z.field.selectNative.click('IDGERANFVENPROD', 'Não');
        z.field.selectNative.click('IDUTILCONTAB', 'Não');
        z.field.selectNative.click('IDBLOQCONSOLIDA', 'Não');
        z.component.footer.clickRightActionByLabel('Salvar');
    };
    
    this.parametrosUnidadeConsolidacao = function () {
        z.field.fieldFunctions.click('NMFILIAL');
        z.widget.grid.click('CDFILIAL', '0001', '0');
        z.component.footer.clickRightActionByLabel('Filtro');
        z.widget.grid.click('CDFILIAL', '0001', '4647738362226231657726');
        h.navegar('Consolidação de vendas');
        z.component.footer.clickCenterActionByLabel('Editar');
        h.grupoCampos('Restrição de Datas');
        z.field.selectNative.click('IDCONSUMIOBR', 'Não');
        z.field.fieldFunctions.click('DTINITESCONS');
        z.field.calendar.clickDate('27/01/2018', 'pt_br');
        h.grupoCampos('Padões da consolidação');
        z.field.selectNative.click('IDATUEST', 'Atualiza estoque da composição do produto');
        /*z.field.fieldFunctions.click('DSSERIE');
        z.externalComponent.selectAutocomplete.waitDropdown('DSSERIE');
        z.externalComponent.selectAutocomplete.selectOption('DSSERIE', 'SERIE 01');*/
        z.field.fieldFunctions.click('NMTIPORETI');
        z.externalComponent.selectAutocomplete.waitDropdown('NMTIPORETI');
        z.externalComponent.selectAutocomplete.selectOption('NMTIPORETI', 'Consumo Produção');
        z.field.fieldFunctions.click('NMSETOR');
        z.externalComponent.selectAutocomplete.waitDropdown('NMSETOR');
        z.externalComponent.selectAutocomplete.selectOption('NMSETOR', 'EXPEDIÇÃO');
        z.field.selectNative.click('IDPERCONVESTNEG', 'Não');
        z.field.selectNative.click('IDVISUPRODNEG', 'Não');
        z.field.selectNative.click('IDGERANFVENPROD', 'Não');
        z.field.selectNative.click('IDUTILCONTAB', 'Não');
        z.field.selectNative.click('IDBLOQCONSOLIDA', 'Não');
        z.component.footer.clickRightActionByLabel('Salvar');
    };
};
module.exports = new consolidacaoVendas();