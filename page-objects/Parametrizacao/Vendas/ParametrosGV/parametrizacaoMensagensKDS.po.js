var ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
var z = new ZeedhiAPIConstructor(browser, protractor);
var h = require('../../../../page-objects/helper.po.js');
var j = require('../../../../json/leitorJson.po.js');

var paraMensagensKDS = function () {

    var self = this;

    this.parametrizaMensagemKDS = async function () {
        z.component.footer.clickCenterActionByLabel('Adicionar');
        z.field.fieldFunctions.fill('DSMENSAGEM', 'Mensagem One');
        z.field.fieldFunctions.fill('NRHORA', '1200');
        z.field.checkbox.click('IDREPETEDIAS');
        z.field.fieldFunctions.click('NMARQUIVO');
        
        //obtem o id do grid do filtro de arquivo
        var idGrid = await h.getIdGrid();
        z.widget.grid.click('NMARQUIVO', 'teste.mp3', idGrid);    
        
        z.component.footer.clickRightActionByLabel('Salvar');

        //retorna para o spec a mensagem confirmando o cadastro da mensagem do kds
        if(await z.component.notification.isNotificationMessagePresent()){
            return z.component.notification.getText(0);
        }
    };

    this.diasSemana = async function () {
        //obtem o id do grid da tela principal
        var idGrid = await h.getIdGrid();
        //verifica se o grid contem a mensagem parametrizada
        if(await z.widget.grid.rowExists('DSMENSAGEM', 'Mensagem One', idGrid)){
            z.widget.grid.click('DSMENSAGEM', 'Mensagem One', idGrid);
            h.navegar('Dias da Semana');
            z.component.footer.clickCenterActionByLabel('Adicionar');
            z.field.fieldFunctions.click('NRDIA');
            z.widget.grid.checkAllRows('9999');
            z.component.alert.clickButton('Sim');
            z.component.footer.clickRightActionByLabel('Ok');
            z.component.footer.clickRightActionByLabel('Salvar');

            //aguarda e retorna para o spec a mensagem confirmando o cadastro da mensagem do kds
            if(await z.component.notification.isNotificationMessagePresent()){
                return z.component.notification.getText(0);
            }
        }
        //retorna para o spec a mensagem de mensagem não parametrizada
        else{
            return 'A mensagem do KDS não foi parametrizada.';
        }
    };

    this.setores = async function () {
        //obtem o id do grid da tela principal
        var idGrid = await h.getIdGrid();
        //verifica se o grid contem a mensagem parametrizada
        if(await z.widget.grid.rowExists('DSMENSAGEM', 'Mensagem One', idGrid)){
            z.widget.grid.click('DSMENSAGEM', 'Mensagem One', idGrid);        
            //navega até a aba setores
            h.navegar('Setores');
            //verifica se o setor já foi cadastrado para mensagem parametrizada
            if(await z.widget.grid.rowExists('DSMENSAGEM', 'Mensagem One', '8253390082092884745578')){
                return 'O setor já foi cadastrado.';
            }
            //senão adiciona o setor a mensagem parametrizada
            else{
                z.component.footer.clickCenterActionByLabel('Adicionar');
                z.widget.grid.checkAllRows('8253390081663529160579');
                z.component.alert.clickButton('Sim');
                z.component.footer.clickRightActionByLabel('Salvar');    
            }

            //aguarda e retorna para o spec a mensagem confirmando o cadastro da mensagem do kds
            if(await z.component.notification.isNotificationMessagePresent()){
                return z.component.notification.getText(0);
            }
        }
        //retorna para o spec a mensagem de mensagem não parametrizada
        else{
            return 'A mensagem do KDS não foi parametrizada.';   
        }
    };

    this.editar = async function () {
        z.widget.grid.clickColumn('8253390081932229383563', 0, 0, true);
        z.component.footer.clickCenterActionByLabel('Editar');
        z.field.fieldFunctions.fill('DSMENSAGEM', 'Lavar as mãos');
        z.field.fieldFunctions.fill('NRHORA', '01400');
        z.field.fieldFunctions.fill('MINUTOS', '30');
        z.field.fieldFunctions.fill('NRQTDREPTINTERV', '10');
        z.component.footer.clickRightActionByLabel('Salvar');

        if(await z.component.notification.isNotificationMessagePresent()){
            var notifica = await z.component.notification.getText(0);
            z.component.footer.clickLeftActionByLabel('Voltar');
            return notifica;
        }
    };

    this.tentaExcluir = async function () {
        z.widget.grid.checkRow('8253390081932229383563', 0, true);
        z.component.footer.clickCenterActionByIcon('trash');
        z.component.alert.clickButton('Sim');
        //se houver registros filhos dependentes da mensagem, será exibido um alert informando
        if(await z.component.alert.isVisible()){
            var alerta = z.component.alert.getText();
            z.component.alert.clickButton('OK');
            return alerta;
        }
        //caso não houver registros filhos dependentes, a mensagem será excluída e retorna a notificação para o spec
        else if(await z.component.notification.isNotificationMessagePresent()){
            return z.component.notification.getText(0);   
        }
    };

    this.excluirSetor = async function () {
        browser.sleep(10000);
        var gridVazio = await h.gridSemRegistros('8253390081932229383563');
        //se o grid não estiver vazio e seleciona a mensagem do kds
        if(!gridVazio){
            //seleciona a mensagem no grid e navega até a aba setores
            z.widget.grid.clickColumn('8253390081932229383563', 0, 0, true);
            h.navegar('Setores');
            //se o grid não estiver vazio seleciona todos os setores e exclui
            var gridVazio = await h.gridSemRegistros('8253390082092884745578');
            if(!gridVazio){
                z.widget.grid.checkAllRows('8253390082092884745578');
                z.component.alert.clickButton('Sim');  
                z.component.footer.clickCenterActionByIcon('trash');
                z.component.alert.clickButton('Sim');    
                //após a exclusão aguarda a mensagem da notificação e retorna para o spec
                if(await z.component.notification.isNotificationMessagePresent())
                    return z.component.notification.getText(0);  
            }
            //se o grid estiver vazio retorna a mensagem para o spec
            else{
                return 'Não há setores cadastrados para a mensagem.';
            }
        }
        //se o grid estiver vazio retorna a mensagem para o spec
        else{
            return 'Não há mensagens cadastrada para o KDS.';
        }
    };

    this.excluiDiasSemana = async function () {
        browser.sleep(10000);
        h.navegar('Dias da Semana');
        var gridVazio = await h.gridSemRegistros('8253390081785706139564');
        //se o grid não estiver vazio seleciona todos os setores e exclui
        if(!gridVazio){
            z.widget.grid.checkAllRows('8253390081785706139564');
            z.component.alert.clickButton('Sim');  
            z.component.footer.clickCenterActionByIcon('trash');
            z.component.alert.clickButton('Sim');    

            //após a exclusão aguarda a mensagem da notificação e retorna para o spec
            if(await z.component.notification.isNotificationMessagePresent()){
                var notifica = z.component.notification.getText(0);
                z.component.footer.clickLeftActionByLabel('Voltar');
                return notifica;  
            }
        }
        //se o grid estiver vazio retorna a mensagem para o spec
        else{
            z.component.footer.clickLeftActionByLabel('Voltar');
            return 'Dias da semana não foram parametrizados.';
        }
    };

    this.excluir = async function () {
        var gridVazio = await h.gridSemRegistros('8253390081932229383563');
        //se o grid não estiver vazio seleciona todos os setores e exclui
        if(!gridVazio){
            z.widget.grid.checkRow('8253390081932229383563', 0, true);
            z.component.footer.clickCenterActionByIcon('trash');
            z.component.alert.clickButton('Sim');

            //após a exclusão aguarda a mensagem da notificação e retorna para o spec
            if(await z.component.notification.isNotificationMessagePresent())
                return z.component.notification.getText(0);  
        }
        //se o grid estiver vazio devolve a mensagem para o spec 
        else{
            return 'Não há mensagens cadastrada para o KDS.';
        }
    };
};

module.exports = new paraMensagensKDS();
