var ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
var z = new ZeedhiAPIConstructor(browser, protractor);
var h = require('../../../../page-objects/helper.po.js');
var j = require('../../../../json/leitorJson.po.js');
var tecla = require('protractor-hotkeys');

var delivery = function () {
    var self = this;

    this.geral = async function(modoDLV, clienteDLV, precoMinPed, codLojaEsitef, vendedor, validaDLV){
        //abre a aba geral e clica no ícone editar
        h.navegar('Geral');
        z.component.footer.clickCenterActionByIcon('pencil');
        //define o modo do delivery
        h.selectNative('IDMODODLV', modoDLV);
        //define o cliente padrão do delivery
        h.autoComplete('NMRAZSOCCLIE', clienteDLV);
        //se o campo do cliente não foi selecionado com o valor cancela a edição e retorna o erro para o spec
        if(!await z.util.elementExists(by.css('#NMRAZSOCCLIE > span.value'))){
            z.component.footer.clickLeftActionByLabel('Cancelar');
            return 'Não foi possível selecionar o cliente.';
        }
        //abre o grupo de campos e define o preço minimo do pedido
        h.grupoCampos('Preço Mínimo Pedido');
        z.field.fieldFunctions.fill('VRMINPEDIDO', precoMinPed);
        //abre o grupo de campos e define o código de integração do e-sitef
        h.grupoCampos('Integração E-sitef');
        z.field.fieldFunctions.fill('CDLOJAESITEF', codLojaEsitef);        
        //abre o grupo de campos e define o vendedor padrão do delivery
        h.grupoCampos('Definição de Padrão para Site Delivery');
        h.autoComplete('NMRAZSOCVEN', vendedor);
        //se o campo do vendedor não foi selecionado com o valor cancela a edição e retorna o erro para o spec
        if(!await z.util.elementExists(by.css('#NMRAZSOCVEN > span.value'))){
            z.component.footer.clickLeftActionByLabel('Cancelar');
            return 'Não foi possível selecionar o vendedor.';
        }
        //abre o grupo de campos e define o tipo  de validação do atendimento
        h.grupoCampos('Valida Atendimento - Site Delivery');
        h.selectNative('IDVALIDAATEN', validaDLV);
        //clica na opção de salvar
        z.component.footer.clickRightActionByLabel('Salvar');

        //retorna a mensagem de notificação para o spec confirmando a parametrização
        if(await z.component.notification.isNotificationMessagePresent())
            return z.component.notification.getText(0);
        //verifica se exibirá algum alerta e retorna a mensagem para o spec
        if(await z.component.alert.isVisible()){
            var alerta = await z.component.alert.getText();
            z.component.alert.clickButton('OK');
            return alerta;
        }   
        //verifica se existe algum campo obrigatório, e retorna a mensagem para o spec
        if(await h.campoObrigatorio()){
            return 'Campos obrigatório não foram informados.';
        }
    };

    this.unidade = async function(unidade, clientePadrao, vendedor, tempoEntregaLim, taxaEntrega, precoMinPed, distancia){
        h.navegar('Unidade');
        if(await z.widget.grid.rowExists('CDFILIAL', unidade, '1342490609174259265917')){
            z.widget.grid.click('CDFILIAL', unidade, '1342490609174259265917');
            h.navegar('Parâmetros');
            z.component.footer.clickCenterActionByIcon('pencil');

            h.autoComplete('NMRAZSOCCLIE', clientePadrao);
            //se o campo do cliente não foi selecionado com o valor cancela a edição e retorna o erro para o spec
            if(!await z.util.elementExists(by.css('#NMRAZSOCCLIE > span.value'))){
                z.component.footer.clickLeftActionByLabel('Cancelar');
                return 'Não foi possível selecionar o cliente.';
            }
            
            h.autoComplete('NMFANVEN', vendedor);
            //se o campo do vendedor não foi selecionado com o valor cancela a edição e retorna o erro para o spec
            if(!await z.util.elementExists(by.css('#NMFANVEN > span.value'))){
                z.component.footer.clickLeftActionByLabel('Cancelar');
                return 'Não foi possível selecionar o vendedor.';
            }
            z.field.fieldFunctions.fill('NRTEMPMAXENTR', tempoEntregaLim);
            z.field.fieldFunctions.fill('VRTXENTREGA', taxaEntrega);
            z.field.fieldFunctions.fill('VRMINPEDIDO', precoMinPed);
            h.selectNative('NRDISTANCIAATEND', distancia);

            //clica na opção de salvar
            z.component.footer.clickRightActionByLabel('Salvar');        

            //retorna a mensagem de notificação para o spec confirmando a parametrização
            if(await z.component.notification.isNotificationMessagePresent())
                return z.component.notification.getText(0);   
            //verifica se exibirá algum alerta e retorna a mensagem para o spec
            if(await z.component.alert.isVisible()){
                var alerta = await z.component.alert.getText();
                z.component.alert.clickButton('OK');
                return alerta;
            }   
            //verifica se existe algum campo obrigatório, e retorna a mensagem para o spec
            if(await h.campoObrigatorio()){
                return 'Campos obrigatório não foram informados.';
            }
        }
        else{
            return 'Unidade não foi encontrada.';
        }
    };

    this.deliveryTempo = async function(unidade, loja, tempoEntrega, tempoProducao){
        h.navegar('Unidade');
        if(await z.widget.grid.rowExists('CDFILIAL', unidade, '1342490609174259265917')){
            z.widget.grid.click('CDFILIAL', unidade, '1342490609174259265917');
            h.navegar('Loja');
            if(await z.widget.grid.rowExists('NMLOJA', loja, '13424906093923029338937')){
                z.widget.grid.click('NMLOJA', loja, '13424906093923029338937');
                h.navegar('Delivery Tempo');
                z.component.footer.clickCenterActionByIcon('pencil');
                z.field.fieldFunctions.fill('HRTEMPOENTREGA', tempoEntrega);
                z.field.fieldFunctions.fill('NRTEMPOPRODUCAO', tempoProducao);
                z.component.footer.clickRightActionByLabel('Salvar'); 
            }
            else
                return 'Loja não foi encontrada.';
        }
        else
            return 'Unidade não foi encontrada.';

        //retorna a mensagem de notificação para o spec confirmando a parametrização
        if(await z.component.notification.isNotificationMessagePresent())
            return z.component.notification.getText(0); 
        //verifica se exibirá algum alerta e retorna a mensagem para o spec
        if(await z.component.alert.isVisible()){
            var alerta = await z.component.alert.getText();
            z.component.alert.clickButton('OK');
            return alerta;
        }  
    };

    this.horarioAgendamento = async function(horaInicial, horaFinal){
        browser.sleep(10000);
        h.navegar('Horários de Agendamento');
        browser.sleep(5000);
        z.component.footer.clickCenterActionByLabel('Adicionar');
        z.field.fieldFunctions.click('NRDIAATENDELOJA');
        z.widget.grid.checkAllRows('9999');
        z.component.alert.clickButton('Sim');
        z.component.footer.clickRightActionByLabel('Ok');
        z.field.fieldFunctions.fill('HRINIATENDELOJA', horaInicial);
        z.field.fieldFunctions.fill('HRFIMATENDELOJA', horaFinal);
        z.field.selectNative.click('IDATENDELOJA', 'Ativo');
        z.component.footer.clickRightActionByLabel('Salvar');

        //caso exiba alertas na tela após o salvar retorna a mensagem para o spec
        if(await z.component.alert.isVisible()){
            var alerta = await z.component.alert.getText();
            z.component.alert.clickButton('OK');
            z.component.footer.clickLeftActionByLabel('Cancelar');
            return alerta;
        }
        //retorna a mensagem de notificação para o spec confirmando a parametrização
        if(await z.component.notification.isNotificationMessagePresent())
            return await z.component.notification.getText(0);   
        //verifica se existe algum campo obrigatório, e retorna a mensagem para o spec
        if(await h.campoObrigatorio()){
            return 'Campos obrigatório não foram informados.';
        }
    };

    this.horarioFuncionamento = async function(horaInicial, horaFinal){
        browser.sleep(10000);
        h.navegar('Horários de Funcionamento');
        z.component.footer.clickCenterActionByLabel('Adicionar');
        z.field.fieldFunctions.click('NRDIAATENDELOJA');
        z.widget.grid.checkAllRows('9999');
        z.component.alert.clickButton('Sim');
        z.component.footer.clickRightActionByLabel('Ok');
        z.field.fieldFunctions.fill('HRINIATENDELOJA', horaInicial);
        z.field.fieldFunctions.fill('HRFIMATENDELOJA', horaFinal);
        z.field.selectNative.click('IDATENDELOJA', 'Ativo');
        z.component.footer.clickRightActionByLabel('Salvar');

        //caso exiba alertas na tela após o salvar retorna a mensagem para o spec
        if(await z.component.alert.isVisible()){
            var alerta = await z.component.alert.getText();
            z.component.alert.clickButton('OK');
            z.component.footer.clickLeftActionByLabel('Cancelar');
            z.component.footer.clickLeftActionByLabel('Voltar');
            return alerta;
        }

        //retorna a mensagem de notificação para o spec confirmando a parametrização
        if(await z.component.notification.isNotificationMessagePresent()){
            var notifica = await z.component.notification.getText(0);
            z.component.footer.clickLeftActionByLabel('Voltar');
            return notifica;
        }
    };

    this.bloqueioCartoes = async function(primeiros, ultimos, descricao){
        browser.sleep(10000);
        h.navegar('Bloqueio de Cartões de Crédito');
        z.component.footer.clickCenterActionByLabel('Adicionar');
        z.field.fieldFunctions.fill('NRPRIMEIROS', primeiros);
        z.field.fieldFunctions.fill('NRULTIMOS', ultimos);
        z.field.fieldFunctions.fill('DESCCARTAO', descricao);
        z.component.footer.clickRightActionByLabel('Salvar');

        //retorna a mensagem de notificação para o spec confirmando a parametrização
        if(await z.component.notification.isNotificationMessagePresent()){
            return z.component.notification.getText(0);
        }
        //caso exiba alertas na tela após o salvar retorna a mensagem para o spec
        if(await z.component.alert.isVisible()){
            var alerta = await z.component.alert.getText();
            z.component.alert.clickButton('OK');
            z.component.footer.clickLeftActionByLabel('Cancelar');
            return alerta;
        }
    };

    this.atendimento = async function(area, prioridade, taxaEntrega){
        browser.sleep(5000);
        //navega até a aba 'Área de atendimento'
        element.all(by.css('a.ng-binding')).get(7).click();
        var existeArea = await z.widget.grid.rowExists('DSAREA', area, '134249060942254418381018');
        //se a área não foi cadastrada, adiciona uma nova, uma prioridade, e taxa de entrega
        if(!existeArea){
            z.component.footer.clickCenterActionByLabel('Adicionar');
            h.autoComplete('NMAREA', area);
            z.field.fieldFunctions.fill('NRORDATEND', prioridade);
            z.field.fieldFunctions.fill('VRTXENTRFILIAR', taxaEntrega);
            z.component.footer.clickRightActionByLabel('Salvar');

            //verifica se algum campo obrigatorio não foi preenchido 
            if(await z.util.elementExists(by.css('.zh-validation'))){
                z.component.footer.clickLeftActionByLabel('Cancelar');
                z.component.footer.clickLeftActionByLabel('Voltar');
                return 'Campo obrigatório Área de atendimento não foi informado.';
            }

            //retorna a mensagem de notificação para o spec confirmando a parametrização
            if(await z.component.notification.isNotificationMessagePresent()){
                var notifica = await z.component.notification.getText(0);
                z.component.footer.clickLeftActionByLabel('Voltar');
                return notifica;
            }
        }
        //se a área foi cadastrada retorna a mensagem para o spec e volta a tela principal
        else{
            z.component.footer.clickLeftActionByLabel('Voltar');    
            return 'Área de atendimento já foi cadastrada.'
        }
    };

    this.cadastrarAtendimento = async function(nome, descArea, horaInicial, horaFinal, endereco){
        //navega até a aba área de atendimento
        h.navegar('Área de Atendimento');
        //clica na opção adicionar para entrar com a nova área
        z.component.footer.clickCenterActionByLabel('Adicionar');
        //informações da area, nome, hora inicial de atendimento, hora final de atendimento
        z.field.fieldFunctions.fill('NMAREA', nome);
        z.field.fieldFunctions.fill('DSAREA', descArea);
        z.field.fieldFunctions.fill('HRINIATENDELOJA', horaInicial);
        z.field.fieldFunctions.fill('HRFIMATENDELOJA', horaFinal);
        //confirma o cadastro da área
        z.component.footer.clickRightActionByLabel('Confirmar');
        //informa o endereço da nova area e clica no botão buscar
        z.field.fieldFunctions.fill('address', endereco);
        $('#submit').click();

        //seleciona a área no mapa
        z.util.clickElement(by.css('#mapPolygon > div > div > div:nth-child(1) > div:nth-child(3)'));
        //clica no botão enter para confirmar o popup
        tecla.trigger('enter');
        //clica na opção para salvar nova área
        z.component.footer.clickRightActionByLabel('Salvar');

        //retorna a mensagem de notificação para o spec confirmando a parametrização
        if(await z.component.notification.isNotificationMessagePresent()){
            return z.component.notification.getText(0);
        }
    };
  
};

module.exports = new delivery();