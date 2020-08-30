var ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
var z = new ZeedhiAPIConstructor(browser, protractor);

var vendedor = function () {

    var self = this;

    this.tela = function (tela) {
        z.component.menu.open();
        z.component.menu.useSearch(tela);
        z.component.menu.clickByLabel(tela);
    };

    this.navegar = function (nome) {
        element(by.cssContainingText('a.ng-binding', nome)).click();
    };


    this.cadastro = function () {
        z.component.footer.clickRightActionByLabel('Filtro');
        z.component.footer.clickCenterActionByLabel('Adicionar');
        z.field.fieldFunctions.fill('CDVENDEDOR', '001');
        z.field.selectNative.click('IDTPIJURVEN', 'Insc.[C.P.F.]');
        z.field.fieldFunctions.fill('NRINSJURVEN', '00114454');
        z.field.fieldFunctions.fill('SGVENDORCEVE', 'TST');
        z.field.selectNative.click('IDCARGOVEND', 'Vendedor');
        z.field.fieldFunctions.fill('NMRAZSOCVEN', '76422444000187');
        z.field.fieldFunctions.fill('NMFANVEN', 'Nome fantasia teste');
        z.field.fieldFunctions.fill('DTNASCVEN', '27/07/2018');
        z.field.fieldFunctions.click('NMSETOR');
        z.externalComponent.selectAutocomplete.waitDropdown('NMSETOR');
        z.externalComponent.selectAutocomplete.selectOption('NMSETOR', '0003 | EXPEDIÇÃO');

        z.field.fieldFunctions.click('NMOPERADOR');
        z.externalComponent.selectAutocomplete.waitDropdown('NMOPERADOR');
        z.externalComponent.selectAutocomplete.selectOption('NMOPERADOR', '000000009982 | Flávio Oliveira');

        z.field.fieldFunctions.fill('VRPEMAXDESVE', '10');
        z.field.fieldFunctions.fill('VRPECOMVEN', '5');
        z.field.fieldFunctions.fill('VRCOMPROVEND', '5');

        //Comissão, Comissão (Promocional), Fornecedor, Preço Base estão com defeito

        z.field.selectNative.click('IDGERACOMISVEND', 'Sim');
        z.field.fieldFunctions.fill('VRAPROVAUTOORC', '10');

        //Gerente, Supervisor, Auxiliar

        //garçom
        z.field.fieldFunctions.click('NMFILIAL');
        z.externalComponent.selectAutocomplete.waitDropdown('NMFILIAL');
        z.externalComponent.selectAutocomplete.selectOption('NMFILIAL', '0013 | TEKNISA ODHEN');

        z.field.fieldFunctions.click('NMCAIXA');
        z.externalComponent.selectAutocomplete.waitDropdown('NMCAIXA');
        z.externalComponent.selectAutocomplete.selectOption('NMCAIXA', '002 | 002 - CAIXA SAT');

        z.field.fieldFunctions.fill('VRPERCCOMISVEND', '10');
        z.field.checkbox.click('IDVRINCIDECONTA');

        z.field.fieldFunctions.fill('DSPLACAVEICULO', 'gxp-6272');
        z.field.fieldFunctions.fill('VRDIARIAVENDOR', '20');
        z.component.footer.clickRightActionByLabel('Salvar');
    };

    this.continuaCadastro = function () {
        z.widget.grid.click('CDVENDEDOR', '001', '12299748127701227551011');
        self.navegar('Endereço');
        z.component.footer.clickCenterActionByLabel('Editar');
        z.field.fieldFunctions.fill('NRCEPVEN', '32689014');

        z.field.fieldFunctions.click('NMESTADO');
        z.externalComponent.selectAutocomplete.waitDropdown('NMESTADO');
        z.externalComponent.selectAutocomplete.selectOption('NMESTADO', 'MG | MINAS GERAIS');
        z.field.fieldFunctions.fill('NMCONTVEN', '3193771337');
        z.field.fieldFunctions.fill('DSEMAILVEN', 'contato@contato.com');
        z.field.fieldFunctions.fill('NRTELEVEN', '3133333333');
        z.field.fieldFunctions.fill('NRFAXVEN', '3111111111');
        z.field.fieldFunctions.fill('NRTELRESIVEN', '3132323232');
        z.field.fieldFunctions.fill('NRCELULARVEN', '3199999999');
        z.component.footer.clickRightActionByLabel('Salvar');
    };

    this.continuaCadastro2 = function () {
        self.navegar('Região');
        z.component.footer.clickCenterActionByLabel('Adicionar');
        z.field.fieldFunctions.click('NMREGIAOPED');
        z.widget.grid.click('NMREGIAOPED', '', '0');
        z.component.footer.clickRightActionByLabel('Salvar');
        z.component.footer.clickLeftActionByLabel('Voltar');
    };

    this.editar = function () {
        //z.component.footer.clickRightActionByLabel('Filtro')
        z.widget.grid.click('CDVENDEDOR', '0001', '12299748127701227551011');
        z.component.footer.clickCenterActionByLabel('Editar');
        /*z.field.selectNative.click('IDTPIJURVEN', 'Insc.[C.N.P.J.]');
        z.field.fieldFunctions.fill('NRINSJURVEN', '45079026000105');*/
        z.field.fieldFunctions.fill('SGVENDORCEVE', 'TSTS');
        z.field.selectNative.click('IDCARGOVEND', 'Auxiliar');
        z.field.fieldFunctions.fill('NMFANVEN', 'Fantasia Testes');
        z.field.fieldFunctions.fill('DTNASCVEN', '27/07/2018');
        z.field.fieldFunctions.click('NMSETOR');
        z.externalComponent.selectAutocomplete.waitDropdown('NMSETOR');
        z.externalComponent.selectAutocomplete.selectOption('NMSETOR', '0001 | SETOR TESTE');
        z.field.fieldFunctions.click('NMOPERADOR');
        z.externalComponent.selectAutocomplete.waitDropdown('NMOPERADOR');
        z.externalComponent.selectAutocomplete.selectOption('NMOPERADOR', '000000009981 | Operador Padrão');

        z.field.fieldFunctions.fill('VRPEMAXDESVE', '15');
        z.field.fieldFunctions.fill('VRPECOMVEN', '10');
        z.field.fieldFunctions.fill('VRCOMPROVEND', '10');

        z.field.selectNative.click('IDGERACOMISVEND', 'Não');
        z.field.fieldFunctions.fill('VRAPROVAUTOORC', '5');

        z.field.fieldFunctions.click('NMFILIAL');
        z.externalComponent.selectAutocomplete.waitDropdown('NMFILIAL');
        z.externalComponent.selectAutocomplete.selectOption('NMFILIAL', '001 | TEKNISA FOOD HOUSE');

        z.field.fieldFunctions.click('NMCAIXA');
        z.externalComponent.selectAutocomplete.waitDropdown('NMCAIXA');
        z.externalComponent.selectAutocomplete.selectOption('NMCAIXA', '005 | CAIXA 5');

        z.field.fieldFunctions.fill('VRPERCCOMISVEND', '5');
        z.field.checkbox.click('IDVRINCIDECONTA');

        z.field.fieldFunctions.fill('DSPLACAVEICULO', 'TOP-1000');
        z.field.fieldFunctions.fill('VRDIARIAVENDOR', '50');
        z.component.footer.clickRightActionByLabel('Salvar');
    };

    this.excluir = function () {

        z.widget.grid.click('CDVENDEDOR', '0001', '12299748127701227551011');
        z.component.footer.clickCenterActionByLabel('Excluir');
        z.component.alert.clickButton('Sim');
        z.component.alert.clickMessageOk();
    };
};
module.exports = new vendedor();