var ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
var z = new ZeedhiAPIConstructor(browser, protractor);
var h = require('../../../../page-objects/helper.po.js');

var cadObservacao = function () {

    var self = this;

    this.cadObs = function () {
        z.component.footer.clickRightActionByLabel('Filtro');
        z.component.footer.clickCenterActionByLabel('Adicionar');
        z.field.fieldFunctions.fill('DSGRPOCOR', 'Teste');
        z.component.footer.clickRightActionByLabel('Salvar');
    };

    this.observacao = function () {
        z.widget.grid.clickColumn('154704262121757450531021', 2, 0, false);
        h.navegar('Observações');
        z.component.footer.clickCenterActionByLabel('Adicionar');
        z.field.fieldFunctions.fill('DSOCORR', 'Combo X');
        z.field.fieldFunctions.fill('CDEXTOBSPROD', '100');
        z.field.selectNative.click('IDCONTROLAOBS', 'Observação');
        z.field.fieldFunctions.fill('DSAPELIDOOBS', 'TST');
        z.field.selectNative.click('IDEXIOBSAPPCONS', 'Sim');
        z.field.fieldFunctions.click('CDARVPROD');
        z.widget.grid.click('NMPRODUTO', 'CONTRA FILE - KG', '0');
        z.field.selectNative.click('IDSINAL', 'Não');
        z.component.footer.clickRightActionByLabel('Salvar');
    };

    this.cadProdutos = function () {
        z.widget.grid.clickColumn('15470426216060477751022', 0, 0, true);
        h.navegar('Produtos');
        z.component.footer.clickCenterActionByLabel('Adicionar');
        z.field.fieldFunctions.click('CDARVPRODINI');
        z.widget.grid.click('NMPRODUTO', 'CONTRA FILE - KG', '0');
        z.component.footer.clickRightActionByLabel('Salvar');
        z.component.footer.clickLeftActionByLabel('Voltar');
    };

    this.obsObrigatoria = function () {
        h.navegar('Grupo de Observações Obrigatórias');
        z.component.footer.clickCenterActionByLabel('Adicionar');
        z.field.fieldFunctions.fill('NMGRUPOBRIG', 'Grupo teste');
        z.component.footer.clickRightActionByLabel('Salvar');
        z.widget.grid.clickColumn('1547042621854967306761', 0, 0, true);
        h.navegar('Ocorrências Obrigatórias do Grupo');
        z.component.footer.clickCenterActionByLabel('Adicionar');
        z.widget.grid.click('__CHECKBOX', '', '15470426213614166707926');
        //z.widget.grid.clickColumn('15470426213614166707926', 0, 0, true);
        z.component.footer.clickRightActionByLabel('Salvar');
        var msg = z.component.alert.getText();
        z.component.alert.clickMessageOk();
        z.component.footer.clickLeftActionByLabel('Voltar');
        z.component.footer.clickLeftActionByLabel('Voltar');
        return msg;
    };


    this.editar = function () {

        z.component.footer.clickRightActionByLabel('Filtro');
        z.widget.grid.clickColumn('154704262121757450531021', 2, 0, false);
        //erro ao tentar editar esse grupo
        h.navegar('Grupo de Observações Obrigatórias'); 
        z.widget.grid.clickColumn('1547042621854967306761', 0, 1, true);
        z.component.footer.clickCenterActionByIcon('pencil');
        z.field.fieldFunctions.fill('NMGRUPOBRIG', 'Grupo Observação');
        z.component.footer.clickRightActionByLabel('Salvar');
        
       /* botão salvar não está funcionando
        h.navegar('Observações');
        z.widget.grid.clickColumn('15470426216060477751022', 0, 0, true);
        z.component.footer.clickCenterActionByIcon('pencil');
        z.field.fieldFunctions.fill('DSOCORR', 'Combo XTUDAO');
        z.field.fieldFunctions.fill('CDEXTOBSPROD', '300');
        z.field.selectNative.click('IDCONTROLAOBS', 'Adicionar');
        z.field.fieldFunctions.fill('DSAPELIDOOBS', 'Teste Odhen');
        z.field.selectNative.click('IDEXIOBSAPPCONS', 'Não');
        z.component.footer.clickRightActionByLabel('Salvar');*/


        z.component.footer.clickLeftActionByLabel('Voltar');
        h.navegar('Grupo Observação');
        z.component.footer.clickCenterActionByLabel('Editar');
        z.field.fieldFunctions.fill('DSGRPOCOR', 'Apresentação Odhen');
        z.component.footer.clickRightActionByLabel('Salvar');
    };

    this.excluir = function () {
        z.component.footer.clickRightActionByLabel('Filtro');
        z.widget.grid.clickColumn('154704262121757450531021', 2, 0, false);
        h.navegar('Grupo de Observações Obrigatórias');
        z.widget.grid.clickColumn('1547042621854967306761', 0, 0, true);
        h.navegar('Ocorrências Obrigatórias do Grupo');
        z.widget.grid.click('__CHECKBOX', '', '15470426211496686762925');
        z.component.footer.clickCenterActionByLabel('Excluir');
        z.component.alert.clickButton('Sim');
        z.component.alert.clickMessageOk();
        z.component.footer.clickLeftActionByLabel('Voltar');
        z.widget.grid.click('__CHECKBOX', '', '1547042621854967306761');
        z.component.footer.clickCenterActionByLabel('Excluir');
        z.component.alert.clickButton('Sim');
        z.component.alert.clickMessageOk();
        h.navegar('Observações');
        z.widget.grid.clickColumn('15470426216060477751022', 0, 0, true);
        h.navegar('Produtos');
        z.widget.grid.click('__CHECKBOX', '', '154704262141655898431023');
        z.component.footer.clickCenterActionByLabel('Excluir');
        z.component.alert.clickButton('Sim');
        z.component.alert.clickMessageOk();
        z.component.footer.clickLeftActionByLabel('Voltar');
        h.navegar('Observações');
        z.widget.grid.click('__CHECKBOX', '', '15470426216060477751022');
        z.component.footer.clickCenterActionByLabel('Excluir');
        z.component.alert.clickButton('Sim');
        z.component.alert.clickMessageOk();
        h.navegar('Grupo Observação');
        z.component.footer.clickCenterActionByLabel('Excluir');
        z.component.alert.clickButton('Sim');
        var msg = z.component.alert.getText();
        z.component.alert.clickMessageOk();
        return msg;
    };
};
module.exports = new cadObservacao();
