var ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
var z = new ZeedhiAPIConstructor(browser, protractor);
var h = require('../../../../page-objects/helper.po.js');

var cadIntegracao = function () {
    var self = this;
    //cadastra uma nova integração
    this.cadastrarIntegracao = async function(identificador, nome, tipoRecebimento, codigoExterno){
        //adiciona uma nova integração pelo identificador e nome
        z.component.footer.clickCenterActionByLabel('Adicionar');
        h.autoComplete('IDPLATAFORMAVEND', identificador);
        z.field.fieldFunctions.fill('NMINTEGRACAO', nome);
        z.component.footer.clickRightActionByLabel('Salvar');
        //verifica se após salvar existem campo obrigatório sem preencher
        if(await h.campoObrigatorio())
            return 'Campos obrigatórios não foram preenchidos.';
        //verifica as mensagens recebidas após clicar salvar
        var mensagemRecebida = await h.aguardaMenagem();

        //obtem o id do grid da tela
        var idGrid = await h.getIdGrid();
        //verifica se o cadastro da integração existe no grid, clica e adiciona um tipo de recebimento
        if(await z.widget.grid.rowExists('IDINTEGRACAO', identificador, idGrid)){
            return mensagemRecebida;
        }
        //retorna para o spec que o cadastro de integração não foi realizado
        else
            return 'Identificador da integração não foi cadastrado.';
    };
    
    this.cadastrarTipoRecebimento = async function(identificador, tipoRecebimento, codigoExterno){
        //obtem o id do grid da tela
        var idGrid = await h.getIdGrid();
        //verifica se o cadastro da integração existe no grid, clica e adiciona um tipo de recebimento
        if(await z.widget.grid.rowExists('IDINTEGRACAO', identificador, idGrid)){
            z.widget.grid.click('IDINTEGRACAO', identificador, idGrid);
            h.navegar('Tipo de Recebimento');
            z.component.footer.clickCenterActionByLabel('Adicionar');
            z.field.fieldFunctions.click('NMTIPORECE');
            $$('div.floating-card-input > input').get(2).sendKeys(tipoRecebimento);
            browser.sleep(5000);
            //obtem o grid do popup
            idGrid = await h.getIdGrid();
            //se o tipo de recebimento existe seleciona para inclusão no cadastro da integração
            if(await z.widget.grid.rowExists('NMTIPORECE', tipoRecebimento, idGrid)){
                z.widget.grid.click('NMTIPORECE', tipoRecebimento, idGrid);
            }
            //senão cancela o cadastro do tipo recebimento e retorna a mensagem para o spec
            else{
                z.component.footer.clickLeftActionByLabel('Cancelar');
                return 'Tipo de recebimento não foi encontrado.';
            }
            //digita o codigo externo para o cadastro da integração e clica em salvar
            z.field.fieldFunctions.fill('CDTPRECEINTE', codigoExterno);
            z.component.footer.clickRightActionByLabel('Salvar');
            
            //verifica se algum campo obrigatório não foi preenchido 
            if(await h.campoObrigatorio())
                return 'Campos obrigatórios não foram preenchidos.';

            //verifica se algum alerta será exibido por cadastrar recebimentos repetidos ou notificações e retorna a mensagem para o spec
            var mensagemRecebida = await h.aguardaMensagem();
            if(mensagemRecebida)
                return mensagemRecebida;
        }
        //retorna para o spec que o cadastro de integração não foi realizado
        else
            return 'Identificador da integração não foi cadastrado.';
    };

    this.editarIntegracao = async function(identificador, nome, tipoRecebimento, codigoExterno){
        var idGrid = await h.getIdGrid();
        if(await z.widget.grid.rowExists('IDINTEGRACAO', identificador, idGrid)){
            z.widget.grid.click('IDINTEGRACAO', identificador, idGrid);
            z.component.footer.clickCenterActionByLabel('Editar');
            //as novas versões do manage o campo fica desabilitado
            if(await h.campoClicavel('IDPLATAFORMAVEND'))
                h.autoComplete('IDPLATAFORMAVEND', identificador);
            z.field.fieldFunctions.fill('NMINTEGRACAO', nome);
            z.component.footer.clickRightActionByLabel('Salvar');

            //verifica se algum campo obrigatório não foi preenchido 
            if(await h.campoObrigatorio())
                return 'Campos obrigatórios não foram preenchidos.';

            //verifica se algum alerta será exibido por cadastrar recebimentos repetidos ou notificações e retorna a mensagem para o spec
            var mensagemRecebida = await h.aguardaMensagem();
            if(mensagemRecebida)
                return mensagemRecebida;
        }
    };
    
    this.editarTipoRecebimento = async function(identificador, tipoRecebimento, codigoExterno, codigoExternoAlterado){
        var idGrid = await h.getIdGrid();
        if(await z.widget.grid.rowExists('IDINTEGRACAO', identificador, idGrid)){
            z.widget.grid.click('IDINTEGRACAO', identificador, idGrid);
            h.navegar('Tipo de Recebimento');
            idGrid = await h.getIdGrid();
            if(await z.widget.grid.rowExists('CDTPRECEINTE', codigoExterno, idGrid)){
                z.widget.grid.click('CDTPRECEINTE', codigoExterno, idGrid);
                z.component.footer.clickCenterActionByLabel('Editar');
                z.field.fieldFunctions.click('NMTIPORECE');
                $$('div.floating-card-input > input').get(2).sendKeys(tipoRecebimento);
                browser.sleep(5000);
                //obtem o id do grid do popup
                idGrid = await h.getIdGrid();
                //verifica se o tipo de recebimento está no grid e seleciona 
                if(await z.widget.grid.rowExists('NMTIPORECE', tipoRecebimento, idGrid))
                    z.widget.grid.click('NMTIPORECE', tipoRecebimento, idGrid);
                //senão cancela e volta para tela principal
                else{
                    z.component.footer.clickLeftActionByLabel('Cancelar');
                    z.component.footer.clickLeftActionByLabel('Cancelar');
                    z.component.footer.clickLeftActionByLabel('Voltar');
                    return 'Tipo de recebimento não foi encontrado.';
                }    
                z.field.fieldFunctions.fill('CDTPRECEINTE', codigoExternoAlterado);
                z.component.footer.clickRightActionByLabel('Salvar');

                //verifica se algum campo obrigatório não foi preenchido 
                if(await h.campoObrigatorio())
                    return 'Campos obrigatórios não foram preenchidos.';

                //verifica se algum alerta será exibido por cadastrar recebimentos repetidos ou notificações e retorna a mensagem para o spec
                var mensagemRecebida = await h.aguardaMensagem();
                if(mensagemRecebida)
                    return mensagemRecebida;
            }
        }
    }
    this.excluirIntegracao = async function(identificador){
        var idGrid = await h.getIdGrid();
        if(await z.widget.grid.rowExists('IDINTEGRACAO', identificador, idGrid)){
            z.widget.grid.click('IDINTEGRACAO', identificador, idGrid);
            h.navegar('Tipo de Recebimento');
            idGrid = await h.getIdGrid();
            if(!await h.gridSemRegistros(idGrid)){
                z.widget.grid.checkAllRows(idGrid);
                z.component.footer.clickCenterActionByLabel('Excluir');
                z.component.alert.clickButton('Sim');
                h.navegar('Integrações');
                z.component.footer.clickCenterActionByLabel('Excluir');
                z.component.alert.clickButton('Sim');

                //verifica se algum campo obrigatório não foi preenchido 
                if(await h.campoObrigatorio())
                    return 'Campos obrigatórios não foram preenchidos.';

                //verifica se algum alerta será exibido por cadastrar recebimentos repetidos ou notificações e retorna a mensagem para o spec
                var mensagemRecebida = await h.aguardaMensagem();
                if(mensagemRecebida)
                    return mensagemRecebida;
            } 
            else{
                return 'Tipo de recebimento não foi encontrado.';
            }
        }
        //retorna para o spec que o cadastro de integração não foi realizado
        else{
            return 'Identificador da integração não foi cadastrado.';
        }
    };
};
module.exports = new cadIntegracao();