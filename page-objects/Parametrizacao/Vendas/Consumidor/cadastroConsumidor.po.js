var ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
var z = new ZeedhiAPIConstructor(browser, protractor);
var h = require('../../../../page-objects/helper.po.js');
var j = require('../../../../json/leitorJson.po.js');
var moment = require('moment');

var consumidor = function () {
    var self = this;

    this.cadastroConsumidor = async function () {
        browser.sleep(5000);
        if(await z.component.popup.isOpened()){
            h.pesquisaItem('NMRAZSOCCLIE',j.getValor('cliente'));
            z.component.footer.clickRightActionByLabel('Filtrar');
        }
        z.component.footer.clickCenterActionByLabel('Adicionar');
        z.field.fieldFunctions.fill('CDCONSUMIDOR', '32');
        z.field.fieldFunctions.fill('CDIDCONSUMID', 'clienteOdhen');
        z.field.fieldFunctions.fill('NMCONSUMIDOR', j.getValor('nomeConsumidor'));
        z.field.selectNative.click('IDSEXOCONS', 'Masculino');
        z.field.selectNative.click('IDSITCONSUMI', 'Sim');
        //z.field.fieldFunctions.fill('DTNASCCONS', '01/05/1990');

        z.field.fieldFunctions.fill('DSEMAILCONS', 'teste@teste.com');
        h.selectNative('IDTPVENDACONS', 'Todos');
        h.pesquisaItem('NMTIPOCONS', j.getValor('tipoConsumidor'));
        h.pesquisaItem('NMCCUSCLIE', j.getValor('centroCusto'));
        
        z.component.footer.clickRightActionByLabel('Salvar');

        //caso exiba um alerta informando que o consumidor exista
        browser.sleep(5000);
        if(await z.component.alert.isVisible()){
            var alerta = z.component.alert.getText();
            z.component.alert.clickButton('OK');
            z.component.footer.clickLeftActionByLabel('Cancelar');
            return alerta;
        }

        //senão obtem a mensagem de confirmação do cadastro do consumidor
        else{
            z.component.footer.clickLeftActionByLabel('Voltar');
            if(await z.widget.grid.rowExists('CDCONSUMIDOR','000000000000000000032','1228597376813998833507')){
                return true;
            }            
            else{
                return false;
            }
        }    
    };

    this.tentaCodigoIgual = async function () {
        return await self.cadastroConsumidor();
    };

    this.dadosResponsavel = async function () {
        browser.sleep(5000);
        //verifica se o consumidor existe no grid
        if(await z.widget.grid.rowExists('CDCONSUMIDOR', '000000000000000000032', '1228597376813998833507')){
            z.widget.grid.click('CDCONSUMIDOR', '000000000000000000032', '1228597376813998833507');
            h.navegar('Dados do Responsável');
            if(await z.util.elementExists(by.css('a.ng-binding'))){
                element.all(by.css('a.ng-binding')).get(1).click();
                z.component.footer.clickCenterActionByLabel('Editar');
                z.field.fieldFunctions.fill('NMRESPCONS', 'Teste de inserção');
                
                //verifica se o cpf foi informado e se é válido
                element(by.css('#NRCPFRESPCON')).clear();
                browser.sleep(3000);
                if(await z.component.alert.isVisible())
                        z.component.alert.clickButton('OK');
                browser.sleep(3000);
                z.field.fieldFunctions.fill('NRCPFRESPCON', ' 01234567890');

                //retorna para o spec a mensagem que o cpf é inválido
                browser.sleep(5000);
                if(await z.component.alert.isVisible()){
                    var alerta = await z.component.alert.getText();
                    z.component.alert.clickButton('OK');
                    z.component.footer.clickLeftActionByLabel('Cancelar');
                    return alerta;
                }
                //insere demais informações do responsável
                else{
                    z.field.fieldFunctions.fill('NRRGCONSUMID', '00000000');
                    //o nome do login do site preenche somente se estiver habilitado no primeiro cadastro
                    if(!await element(by.id('NMLOGINCONS')).getAttribute('readonly'))
                        z.field.fieldFunctions.fill('NMLOGINCONS', 'teknisaTeste');
                    z.component.footer.clickRightActionByLabel('Salvar');
                    
                    return true;
                }
            }
        }
        else{
            return 'O consumidor não foi cadastrado.';
        }
    };
    //aba de endereços com defeito no grid 22/08/18, issue aberta 155137
    this.enderecos = async function(){
        browser.sleep(5000);
        h.navegar('Endereço');
        z.component.footer.clickCenterActionByLabel('Editar');
        
        h.pesquisaItem('NMPAIS', 'Brasil');
        //se o campo do pais não foi selecionado com o valor cancela a edição e retorna para o erro para o spec
        if(!await z.util.elementExists(by.css('#NMPAIS > span.value'))){
            //z.component.footer.clickLeftActionByLabel('Cancelar');
            element(by.css('#footer > div.zh-footer-left > ul > li:nth-child(1) > a > span.zh-footer-title-sprit.ng-binding')).click();
            return 'Não foi possível selecionar o país.';
        }

        h.pesquisaItem('NMESTADO', 'MINAS GERAIS');
        //se o campo do estado não foi selecionado com o valor cancela a edição e retorna para o erro para o spec
        if(!await z.util.elementExists(by.css('#NMESTADO > span.value'))){
            z.component.footer.clickLeftActionByLabel('Cancelar');
            return 'Não foi possível selecionar o estado.';
        }
        
        h.pesquisaItem('NMMUNICIO', 'BELO HORIZONTE');
        //se o campo do municipio não foi selecionado com o valor cancela a edição e retorna para o erro para o spec
        if(!await z.util.elementExists(by.css('#NMMUNICIO > span.value'))){
            z.component.footer.clickLeftActionByLabel('Cancelar');
            return 'Não foi possível selecionar o muncipio.';
        }

        h.pesquisaItem('NMBAIRRO', 'FUNCIONARIOS');
        //se o campo do municipio não foi selecionado com o valor cancela a edição e retorna para o erro para o spec
        if(!await z.util.elementExists(by.css('#NMBAIRRO > span.value'))){
            z.component.footer.clickLeftActionByLabel('Cancelar');
            return 'Não foi possível selecionar o bairro.';
        }

        z.field.fieldFunctions.fill('NRCEPCONS','30130151');
        z.field.fieldFunctions.fill('DSENDECONS','Rua Pernambuco');
        z.field.fieldFunctions.fill('NRTELECONS','3121222300');
        z.field.fieldFunctions.fill('NRRAMAL1CONS','999');
        z.field.fieldFunctions.fill('NRCELULARCONS','3199999999');
        
        z.component.footer.clickRightActionByLabel('Salvar');

        return true;
    };

    this.parametros = async function(){
        browser.sleep(5000);
        h.navegar('Parâmetros');
        z.component.footer.clickCenterActionByLabel('Editar');
        //Permite Consumo de Produto Extra
        h.selectNative('IDPERCONSPRODEX', 'Sim');
        //Permite Consumo no Lanche da Manhã
        h.selectNative('IDTPSELMANHA', 'Sim');
        //Permite Consumo no Lanche da Tarde
        h.selectNative('IDTPSELTARDE', 'Sim');
        //Permite Consumo no Almoço
        h.selectNative('IDTPSEALMOCO', 'Sim');
        //Atualiza CPF do Cadastro de Consumidor Durante a venda
        h.selectNative('IDATUCPFCONS', 'Sim');
        //Imprime CPF
        h.selectNative('IDIMPCPFCUPOM', 'Sim');
        //Cadastro Confirmado
        h.selectNative('IDCADCONFLIBCON', 'Sim');
        z.component.footer.clickRightActionByLabel('Salvar');

        return true;
    };

    this.saldo = async function(){
        browser.sleep(5000);
        h.navegar('Saldo');
        z.component.footer.clickCenterActionByLabel('Editar');
        //Verificar saldo do Consumidor
        z.field.selectNative.click('IDVERSALDCON', 'Sim');
        z.field.fieldFunctions.fill('VRAVIDEBCONS', '5');
        z.field.fieldFunctions.fill('VRLIMDEBCONS', '0');
        z.field.fieldFunctions.fill('VRMAXDEBCONS', '200');
        z.field.fieldFunctions.fill('VRSUBSBASICO', '200');
        //venda crédito pessoal
        z.field.fieldFunctions.fill('VRAVICREDCONS', '20');
        z.field.fieldFunctions.fill('VRLIMCREDCONS', '10');
        z.field.fieldFunctions.fill('VRMAXCREDCONS', '200');
        z.field.fieldFunctions.fill('VRMESUBCONS', '800');
        z.field.fieldFunctions.fill('VRPESUBCONS', '6');
        z.component.footer.clickRightActionByLabel('Salvar');
        
        return true;
    };

    this.unidadesAssociadas = async function(){
        browser.sleep(5000);
        h.navegar('Unidades Associadas');
        if(!await z.widget.grid.rowExists('CDFILIAL', j.getValor('cdfilial'), '287528518515278363276316831636')){
            console.log('adiciona unidade');
            z.component.footer.clickCenterActionByLabel('Adicionar');
            if(await z.widget.grid.rowExists('CDFILIAL', j.getValor('cdfilial'), '63362527252175812818713637')){
                console.log('adiciona unidade do cliente');
                z.widget.grid.checkRowByValue('CDFILIAL', j.getValor('cdfilial'), '63362527252175812818713637');
                z.component.footer.clickRightActionByLabel('Adicionar');     
                z.component.footer.clickLeftActionByLabel('Voltar');
                return true;
            }
            else{
                z.component.footer.clickLeftActionByLabel('Voltar');
                z.component.footer.clickLeftActionByLabel('Voltar');
                return 'Unidade não está associada ao cliente.';
            }
        }
        else{
            z.component.footer.clickLeftActionByLabel('Voltar');
            return 'Unidade já foi associada ao consumidor.';
        }
    };

    this.editarConsumidor = async function(){
        if(await z.component.popup.isOpened()){
            h.pesquisaItem('NMRAZSOCCLIE',j.getValor('cliente'));
            z.component.footer.clickRightActionByLabel('Filtrar');
        }

        if(await z.widget.grid.rowExists('CDCONSUMIDOR', '000000000000000000032', '1228597376813998833507')){
            z.widget.grid.click('CDCONSUMIDOR', '000000000000000000032', '1228597376813998833507');
            z.component.footer.clickCenterActionByLabel('Editar');
            z.field.fieldFunctions.fill('CDIDCONSUMID', 'Editei aqui');
            z.field.fieldFunctions.fill('NMCONSUMIDOR', 'teste de edição');
            h.selectNative('IDSEXOCONS', 'Feminino');
            
            //verifica se o email foi informado e se é válido
            element(by.id('DSEMAILCONS')).clear();
            browser.sleep(2000);
            if(await z.component.alert.isVisible())
                z.component.alert.clickButton('OK');
            //z.field.fieldFunctions.fill('DSEMAILCONS', 'outroemail@teknisa.com');
            var elementos = element.all(by.id('DSEMAILCONS'));
            elementos.each(function (el) {
                el.isDisplayed().then(function (displayed) {
                    if (displayed) {
                        try {
                            el.sendKeys('outroemail@teknisa.com');
                        } catch (erro) {
                            console.log(erro);
                        }
                    }
                })
            });

            //retorna para o spec a mensagem que o email é inválido
            browser.sleep(2000);
            if(await z.component.alert.isVisible()){
                var alerta = await z.component.alert.getText();
                z.component.alert.clickButton('OK');
                z.component.footer.clickLeftActionByLabel('Cancelar');
                return alerta;
            }

            h.selectNative('IDTPVENDACONS', '1 - Venda Débito Consumidor');
            h.pesquisaItem('NMTIPOCONS', 'PADRÃO');
            z.component.footer.clickRightActionByLabel('Salvar');    
        }
        else{
            return 'O consumidor não foi cadastrado.';
        }
        
        return true;
    };

    this.editarDadosReponsavel = async function() {
        h.navegar('Dados do Responsável');
        z.component.footer.clickCenterActionByLabel('Editar');
        z.field.fieldFunctions.fill('NMRESPCONS', 'teste de edição');
        
        //verifica se o cpf foi informado e se é válido
        element(by.css('#NRCPFRESPCON')).clear();
        browser.sleep(2000);
        if(await z.component.alert.isVisible())
            z.component.alert.clickButton('OK');
        //z.field.fieldFunctions.fill('NRCPFRESPCON', '001234567890');
        var elementos = element.all(by.id('NRCPFRESPCON'));
        elementos.each(function (el) {
            el.isDisplayed().then(function (displayed) {
                if (displayed) {
                    try {
                        el.sendKeys('001234567890');
                    } catch (erro) {
                        console.log(erro);
                    }
                }
            })
        });

        //retorna para o spec a mensagem que o cpf é inválido
        browser.sleep(2000);
        if(await z.component.alert.isVisible()){
            var alerta = await z.component.alert.getText();
            z.component.alert.clickButton('OK');
            z.component.footer.clickLeftActionByLabel('Cancelar');
            return alerta;
        }
        //insere demais informações do responsável
        else{
            z.field.fieldFunctions.fill('NRRGCONSUMID', '00000000');
        }

        z.component.footer.clickRightActionByLabel('Salvar');
        
        return true;
    };

    this.editarParametros = async function(){
        h.navegar('Parâmetros');
        z.component.footer.clickCenterActionByLabel('Editar');
        //Permite Consumo de Produto Extra
        h.selectNative('IDPERCONSPRODEX', 'Não');
        //Permite Consumo no Lanche da Manhã
        h.selectNative('IDTPSELMANHA', 'Não');
        //Permite Consumo no Lanche da Tarde
        h.selectNative('IDTPSELTARDE', 'Não');
        //Permite Consumo no Almoço
        h.selectNative('IDTPSEALMOCO', 'Não');
        //Atualiza CPF do Cadastro de Consumidor Durante a venda
        h.selectNative('IDATUCPFCONS', 'Não');
        //Imprime CPF
        h.selectNative('IDIMPCPFCUPOM', 'Não');
        //Cadastro Confirmado
        h.selectNative('IDCADCONFLIBCON', 'Não');
        z.component.footer.clickRightActionByLabel('Salvar');

        return true;
    };

    this.editarSaldo = async function(){
        h.navegar('Saldo');
        z.component.footer.clickCenterActionByLabel('Editar');
        //Verificar saldo do Consumidor
        z.field.selectNative.click('IDVERSALDCON', 'Não');
        z.component.footer.clickRightActionByLabel('Salvar');
        
        return true;
    };
    //adiciona uma segunda unidade ao consumidor
    this.editarUnidadesAssociadas = async function(){
        h.navegar('Unidades Associadas');
        if(!await z.widget.grid.rowExists('CDFILIAL', j.getValor('cdfilial2'), '287528518515278363276316831636')){
            z.component.footer.clickCenterActionByLabel('Adicionar');
            if(await z.widget.grid.rowExists('CDFILIAL', j.getValor('cdfilial2'), '63362527252175812818713637')){
                z.widget.grid.checkRowByValue('CDFILIAL', j.getValor('cdfilial2'), '63362527252175812818713637');
                z.component.footer.clickRightActionByLabel('Adicionar');     
            }
            else{
                return 'Unidade não está associada ao cliente.';
            }
        }
        else{
            return 'Unidade já foi associada ao consumidor.';
        }
        
        return true;
    };

    this.alteracaoAutomatica = async function(){
        if(await z.component.popup.isOpened()){
            h.pesquisaItem('NMRAZSOCCLIE',j.getValor('cliente'));
            z.component.footer.clickRightActionByLabel('Filtrar');
        }
        
        z.component.footer.clickRightActionByLabel('Alteração Automática');       
        
        z.field.fieldFunctions.click('CDCLIENTE');
        if(!await h.gridSemRegistros('9999')){
            z.widget.grid.checkAllRows('9999');    
            z.component.footer.clickRightActionByLabel('Ok');
        }
        else{
            z.component.footer.clickLeftActionByLabel('Cancelar');
            z.component.footer.clickLeftActionByLabel('Cancelar');
            return 'Não foram localizados clientes.';
        }
        
        z.field.fieldFunctions.click('CDCCUSCLIE');
        if(!await h.gridSemRegistros('9999')){
            z.widget.grid.checkAllRows('9999');    
            z.component.footer.clickRightActionByLabel('Ok');
        }
        else{
            z.component.footer.clickLeftActionByLabel('Cancelar');
            z.component.footer.clickLeftActionByLabel('Cancelar');
            return 'Não foram localizados centro de custo.';
        }

        z.field.fieldFunctions.click('CDTIPOCONS');
        if(!await h.gridSemRegistros('9999')){
            z.widget.grid.checkAllRows('9999');    
            z.component.footer.clickRightActionByLabel('Ok');
        }
        else{
            z.component.footer.clickLeftActionByLabel('Cancelar');
            z.component.footer.clickLeftActionByLabel('Cancelar');
            return 'Não foram localizados Tipos de consumidor por clientes.';
        }
        
        z.field.fieldFunctions.click('CDCONSUMIDOR');
        if(!await h.gridSemRegistros('9999')){
            z.widget.grid.checkAllRows('9999');    
            z.component.footer.clickRightActionByLabel('Ok');
        }
        else{
            z.component.footer.clickLeftActionByLabel('Cancelar');
            z.component.footer.clickLeftActionByLabel('Cancelar');
            return 'Não foram localizados consumidores.';
        }

        //abre aba de tipo de venda
        h.grupoCampos('Tipo de Venda');
        z.field.selectNative.click('ENABLE_IDTPVENDACONS', 'Sim');
        z.field.selectNative.click('IDTPVENDACONS', '3 - Venda A Vista');
        //abre aba de saldo
        h.grupoCampos('Saldo');
        z.field.selectNative.click('ENABLE_SALDO', 'Sim');
        //valor do subsidio
        z.field.fieldFunctions.fill('VRMESUBCONS', '500');
        //valor do desconto na folha
        z.field.fieldFunctions.fill('VRPESUBCONS', '6');

        //verifica saldo "sim"
        z.field.selectNative.click('IDVERSALDCON', 'Sim');
        h.grupoCampos('Vendas Débito Consumidor');
        z.field.fieldFunctions.fill('VRAVIDEBCONS', '10');
        z.field.fieldFunctions.fill('VRLIMDEBCONS', '5');
        z.field.fieldFunctions.fill('VRMAXDEBCONS', '50');
        //vendas credito pessoal
        z.field.fieldFunctions.fill('VRAVICREDCONS', '10');
        z.field.fieldFunctions.fill('VRLIMCREDCONS', '5');
        z.field.fieldFunctions.fill('VRMAXCREDCONS', '50');
        //Alterar Centro de Custo
        z.field.selectNative.click('ENABLE_CDCCUSCLIE', 'Sim');
        z.field.fieldFunctions.click('P_NMCCUSCLIE');
        z.widget.grid.click('NMCCUSCLIE', 'TEKNISA', '0');
        //Alterar Tipo de Consumidor
        z.field.selectNative.click('ENABLE_CDTIPOCONS', 'Sim');
        
        h.pesquisaItem('NMTIPOCONS', 'PADRÃO');
        //se o campo do tipo de consumidor não foi selecionado com o valor cancela a edição e retorna para o erro para o spec
        if(!await z.util.elementExists(by.css('#NMTIPOCONS > span.value'))){
            z.component.footer.clickLeftActionByLabel('Cancelar');
            return 'Não foram localizados Tipos de Consumidores.';
        }
        
        z.component.footer.clickRightActionByLabel('Salvar');

        //aguarda se algum alerta ficará visivel recebe a mensagem e retorna para o spec
        if(await z.component.alert.isVisible()){
            var alerta = z.component.alert.getText();
            z.component.alert.clickButton('OK');
            return alerta;
        }
            
        return true; 
    };

    this.excluir = async function(){
        if(await z.component.popup.isOpened()){
            h.pesquisaItem('NMRAZSOCCLIE',j.getValor('cliente'));
            z.component.footer.clickRightActionByLabel('Filtrar');
        }
        
        if(await z.widget.grid.rowExists('CDCONSUMIDOR', '000000000000000000032', '1228597376813998833507')){
            z.widget.grid.click('CDCONSUMIDOR', '000000000000000000032', '1228597376813998833507');
            h.navegar('Unidades Associadas');
            if(!await h.gridSemRegistros('287528518515278363276316831636')){
                z.widget.grid.checkAllRows('287528518515278363276316831636');
                z.component.footer.clickCenterActionByLabel('Excluir');
                z.component.alert.clickButton('Sim');
            }
            h.navegar('Formulário');
            z.component.footer.clickCenterActionByLabel('Excluir');    
        }
        
        return true;
    };

    this.excluirComRegistroFilho = async function(){
        browser.sleep(5000);
        var open = await z.component.popup.isOpened();
        console.log('popup aberto : '+open);
        if(open){
            h.pesquisaItem('NMRAZSOCCLIE',j.getValor('cliente'));
            z.component.footer.clickRightActionByLabel('Filtrar');
        }

        if(await z.widget.grid.rowExists('CDCONSUMIDOR', '000000000000000000032', '1228597376813998833507')){
            z.widget.grid.click('CDCONSUMIDOR', '000000000000000000032', '1228597376813998833507');
            z.component.footer.clickCenterActionByLabel('Excluir');
        }
        else{
            return 'O consumidor não foi cadastrado.';
        }
        
        //recebe um alerta informando não ser possível excluir o consumidor por ter registros filho
        if(await z.component.alert.isVisible()){
            var alerta = await z.component.alert.getText();    
            z.component.alert.clickMessageOk();
            return alerta;
        }

        //recebe a notificação que conseguiu excluir consumidor com registro filho
        else{
            return 'Consumidor excluído.'; 
        } 
    };
};
module.exports = new consumidor();