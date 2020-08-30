var ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
var z = new ZeedhiAPIConstructor(browser, protractor);
var h = require('../../../../page-objects/helper.po.js');

var ambienteMesa = function () {
    var self = this;

    this.selecionarUnidade = async function(filial){
        if(await z.component.popup.isOpened()){
            h.autoComplete('NMFILIAL', filial);
            z.component.footer.clickRightActionByLabel('Filtrar');
        }
    };

    this.selecionarLoja = async function(loja, sigla){
        var idGrid = await h.getIdGrid();
        if(await z.widget.grid.rowExists('SGSALA', sigla, idGrid)){
            z.widget.grid.click('SGSALA', sigla, idGrid);
            h.navegar('Lojas');
            idGrid = await h.getIdGrid();
            if(await z.widget.grid.rowExists('NMLOJA', loja, idGrid)){
                z.widget.grid.click('NMLOJA', loja, idGrid);
            }
        }
    };

    this.ambiente = async function(loja, sigla, ambiente, mesas, mesaInicial, mesaFinal){
        z.component.footer.clickCenterActionByLabel('Adicionar');
        z.field.fieldFunctions.fill('SGSALA', sigla);
        z.field.fieldFunctions.fill('NMSALA', ambiente);
        z.field.fieldFunctions.fill('NRVAGASSALA', mesas);
        z.component.footer.clickRightActionByLabel('Salvar');

        //recebe a notificação confirmando o cadastro do novo ambiente
        if(await z.component.notification.isNotificationMessagePresent()){
            var notifica = await z.component.notification.getText(0);
            var idGrid = await h.getIdGrid();
            if((await z.widget.grid.rowExists('SGSALA', sigla, idGrid)) && 
               (await z.widget.grid.rowExists('NMSALA', ambiente, idGrid)) && 
               (await z.widget.grid.rowExists('NRVAGASSALA', mesas, idGrid)) ){
                return notifica;
            }
            else{
                return 'Ambiente não foi cadastrado.';
            }
        }
        //verifica se algum campo obrigatório não foi preenchido 
        else if(await h.campoObrigatorio())
            return 'Campos obrigatórios não foram preenchidos.';
        
        //confirma outros alertas exibidos na tela e retorna a mensagem para o spec
        else if(await z.component.alert.isVisible()){
            var alerta = await z.component.alert.getText();
            z.component.alert.clickButton('Sim');
            return alerta;
        }
    };

    this.mesa = async function(loja, sigla, mesa, nome, pessoas, posicao){
        self.selecionarLoja(loja, sigla);
        browser.sleep(15000);
        if(await $('#span-field-NMLOJA > p').getText() === loja){  
            h.navegar('Mesa');
            z.component.footer.clickCenterActionByLabel('Adicionar');   
            z.field.fieldFunctions.fill('NRMESA', mesa);
            z.field.fieldFunctions.fill('DSPOSICMESA', posicao);
            if(await z.component.alert.isVisible()){
                var alerta = await z.component.alert.getText();
                z.component.alert.clickButton('OK');
                z.component.footer.clickLeftActionByLabel('Cancelar');
                return alerta;
            }
            else{
                z.field.fieldFunctions.fill('NMMESA', nome);
                z.field.fieldFunctions.fill('NRPESSOAMESA', pessoas);
            }

            z.component.footer.clickRightActionByLabel('Salvar');

            //recebe a notificação confirmando o cadastro do nova mesa
            if(await z.component.notification.isNotificationMessagePresent()){
                var notifica = await z.component.notification.getText(0);
                if(await z.widget.grid.rowExists('NRMESA', ("0000" + mesa).slice(-4), '189799431235922801321451') &&
                   await z.widget.grid.rowExists('NMMESA', nome, '189799431235922801321451')){
                    return notifica;
                }
                else{
                    return 'A mesa não foi cadastrada.';
                }
            }
            
            //verifica se algum campo obrigatório não foi preenchido 
            else if(await h.campoObrigatorio())
                return 'Campos obrigatórios não foram preenchidos.';
            
            //confirma outros alertas exibidos na tela e retorna a mensagem para o spec
            else if(await z.component.alert.isVisible()){
                var alerta = await z.component.alert.getText();
                z.component.alert.clickButton('OK');
                return alerta;
            }
        }
        else
            return 'A loja não existe nesta unidade.';
    };

    this.cadastroAutomatico = async function(loja, sigla, mesaInicial, mesaFinal, pessoas){
        self.selecionarLoja(loja, sigla);
        browser.sleep(15000);
        if(await $('#span-field-NMLOJA > p').getText() === loja){ 
            h.navegar('Mesa'); 
            z.component.footer.clickRightActionByLabel('Cad. Automático');
            //limpa os dois inputs com o número de mesas
            var inputMesa = element.all(by.css('input.input-text'));
            inputMesa.each(function (input) {
                input.isDisplayed().then(function (displayed) {
                    if (displayed) {
                        try {
                            input.clear();
                            z.component.alert.clickButton('OK');
                        } catch (erro) {
                            console.log(erro);
                        }
                    }
                });
            });
            //insere os números da mesas inicial e final
            element(by.id('NRMESAINI')).sendKeys(mesaInicial+1);
            element(by.id('NRMESAFIN')).sendKeys(mesaFinal);        

            z.field.fieldFunctions.fill('NRPESSOAMESA', pessoas);
            z.component.footer.clickRightActionByLabel('Salvar');

            //recebe a notificação confirmando o cadastro automático de mesas
            if(await z.component.notification.isNotificationMessagePresent()){
                var notifica = await z.component.notification.getText(0);
                if(!await h.gridSemRegistros('189799431235922801321451')){
                    z.component.footer.clickLeftActionByLabel('Voltar');
                    z.component.footer.clickLeftActionByLabel('Voltar');
                    return notifica;
                }
                else{
                    z.component.footer.clickLeftActionByLabel('Voltar');
                    z.component.footer.clickLeftActionByLabel('Voltar');
                    return 'Mesas não foram cadastradas.';
                }
            }

            //confirma outros alertas exibidos na tela e retorna a mensagem para o spec
            else if(await z.component.alert.isVisible()){
                var alerta = await z.component.alert.getText();
                z.component.alert.clickButton('OK');
                z.component.footer.clickLeftActionByLabel('Cancelar');
                z.component.footer.clickLeftActionByLabel('Voltar');
                z.component.footer.clickLeftActionByLabel('Voltar');
                return alerta;
            }

            //se os campos obrigatórios não foram preenchidos cancela a edição volta a tela principal e retorna erro para spec
            else if(await h.campoObrigatorio()){
                z.component.footer.clickLeftActionByLabel('Cancelar');
                z.component.footer.clickLeftActionByLabel('Voltar');
                z.component.footer.clickLeftActionByLabel('Voltar');
                return 'Campos obrigatórios não foram preenchidos.';
            }
        }
        else
            return 'A loja não existe nesta unidade.';
    };

    this.editar = async function(filial, loja, sigla, alteraMesas, mesa){
        self.selecionarLoja(loja, sigla);
        browser.sleep(15000);
        h.navegar('Ambiente');
        if(await $('#span-field-SGSALA > p').getText() === sigla){  
            z.component.footer.clickCenterActionByLabel('Editar');
            z.field.fieldFunctions.fill('SGSALA', sigla);
            z.field.fieldFunctions.fill('NMSALA', 'Teste de edição');
            //limpa o antigo valor e insere um novo para número de mesas
            element(by.id('NRVAGASSALA')).clear();
            z.component.alert.clickButton('OK');
            z.field.fieldFunctions.fill('NRVAGASSALA', parseInt(alteraMesas)+10, false);
            z.component.footer.clickRightActionByLabel('Salvar');
        }
        else{
            return 'Ambiente não foi cadastrado.';
        }

        h.navegar('Lojas');
        if(await z.widget.grid.rowExists('NMLOJA', loja, '18979943122197839061450')){
            z.widget.grid.click('NMLOJA', loja, '18979943122197839061450');
            h.navegar('Mesa');
            if(await z.widget.grid.rowExists('NRMESA', ("0000" + mesa).slice(-4), '189799431235922801321451')){
                z.widget.grid.click('NRMESA', ("0000" + mesa).slice(-4), '189799431235922801321451');
                z.component.footer.clickCenterActionByLabel('Editar');
                z.field.fieldFunctions.fill('NMMESA', 'Mesa alterada');
                //limpa o antigo valor e insere um novo para número de pessoas
                element(by.id('NRPESSOAMESA')).clear();
                z.component.alert.clickButton('OK');
                z.field.fieldFunctions.fill('NRPESSOAMESA', '5', false);
                z.field.fieldFunctions.fill('DSPOSICMESA', 'CENTRO');       
                z.component.footer.clickRightActionByLabel('Salvar');
            }
            else{
                return 'A mesa não foi cadastrada.';
            }
        }
        else{
            return 'A loja não existe nesta unidade.';
        }

        if(await z.component.notification.isNotificationMessagePresent()){
            var notifica = await z.component.notification.getText(0);
            var erros = '';
            //se o campo não exibir o valor que foi cadastrado retorna mensagem de erro para o spec
            if(await element(by.css('#span-field-NMMESA > p')).getText() != 'Mesa alterada')
                erros = erros.concat('Nome da mesa não foi alterado. ');
            //se o campo não exibir o valor que foi cadastrado retorna mensagem de erro para o spec
            if(await element(by.css('#span-field-NRPESSOAMESA > p')).getText() != '5')
                erros = erros.concat('Número de pessoas não foi alterado. ');
            //se o campo não exibir o valor que foi cadastrado retorna mensagem de erro para o spec
            if(await element(by.css('#span-field-DSPOSICMESA > p')).getText() != 'CENTRO')
                erros = erros.concat('Posição da mesa não foi alterada. ');

            z.component.footer.clickLeftActionByLabel('Voltar');
            z.component.footer.clickLeftActionByLabel('Voltar');
            z.component.footer.clickLeftActionByLabel('Voltar');

            if(erros != '')
                return erros;
            else
                return notifica;
        }

        //confirma outros alertas exibidos na tela e retorna a mensagem para o spec
        else if(await z.component.alert.isVisible()){
            var alerta = await z.component.alert.getText();
            z.component.alert.clickButton('OK');
            z.component.footer.clickLeftActionByLabel('Cancelar');
            z.component.footer.clickLeftActionByLabel('Voltar');
            z.component.footer.clickLeftActionByLabel('Voltar');
            z.component.footer.clickLeftActionByLabel('Voltar');
            return alerta;
        }
    };

    this.excluir = async function(filial, loja){
        self.selecionarLoja(loja, 'TST');
        browser.sleep(15000);
        if(await z.widget.grid.rowExists('NMSALA', 'Teste de edição', '18979943125559279821449')){
            if(await z.widget.grid.rowExists('NMLOJA', loja, '18979943122197839061450')){  
                h.navegar('Mesa');
                if(!await h.gridSemRegistros('189799431235922801321451')){
                    z.widget.grid.checkAllRows('189799431235922801321451');
                    z.component.footer.clickCenterActionByLabel('Excluir');
                    z.component.alert.clickButton('Sim');        

                    if(await z.component.alert.isVisible()){
                        var alerta = await z.component.alert.getText();
                        z.component.alert.clickButton('OK');
                        return alerta;
                    }

                    else if(!await h.gridSemRegistros('189799431235922801321451')){
                        z.component.footer.clickLeftActionByLabel('Voltar');
                        z.component.footer.clickLeftActionByLabel('Voltar');
                        return 'Mesas não foram excluídas da loja.';   
                    }
                }
                else{
                    return 'Não há mesas cadastradas nesta loja.';
                }
            }
            else{
                return 'A loja não existe nesta unidade.';
            }
            //volta para tela de lojas muda para aba ambiente e exclui
            z.component.footer.clickLeftActionByLabel('Voltar');
            h.navegar('Ambiente');
            z.component.footer.clickCenterActionByLabel('Excluir');
            z.component.alert.clickButton('Sim');
            //espera notificação confirmando a exclusão do ambiente
            if(await z.component.notification.isNotificationMessagePresent()){
                var notifica = await z.component.notification.getText(0);
                if(!await z.widget.grid.rowExists('18979943125559279821449'))
                    return notifica;
                else
                    return 'Ambiente não foi excluído.';
            }
            //caso exiba algum alerta apos confirmar a exclusão retorna a mensagem para o spec
            else if(await z.component.alert.isVisible()){
                var alerta = await z.component.alert.getText();
                z.component.alert.clickButton('OK');
                return alerta;
            }
        }
        else{
            return 'Ambiente não foi cadastrado.';
        }
    };
};
module.exports = new ambienteMesa();