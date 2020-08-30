var ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
var z = new ZeedhiAPIConstructor(browser, protractor);
var h = require('../../../../page-objects/helper.po.js');

var meta = function () {
    var self = this;

    this.selecionarUnidade = function(filial){
        h.getIdGrid().then(function(idGrid){
            z.widget.grid.rowExists('NMFILIAL', filial, idGrid).then(function(existeUnidade){
                if(existeUnidade)
                    z.widget.grid.click('NMFILIAL', filial, idGrid);
            });    
        });
    };

    this.metaEspecial = function(periodo, percentual){
        h.navegar('Meta Período Especial');
        z.component.footer.clickCenterActionByLabel('Adicionar');
        var arrayDatas = periodo.split(' - ');
        h.selectIntervalDate('PERIODO', arrayDatas[0], arrayDatas[1]);
        z.component.footer.clickRightActionByLabel('OK');
        z.field.fieldFunctions.fill('DSMETAESP', 'Meta da semana');
        z.field.fieldFunctions.fill('PERCCORRECAO', percentual);
        z.component.footer.clickRightActionByLabel('Salvar');
    };

    this.editarMetaEspecial = function () {
        h.navegar('Meta Período Especial');
        z.widget.grid.click('NMDIA', 'QUARTA-FEIRA', '3638210602585623398331');
        z.component.footer.clickCenterActionByLabel('Editar');
        z.field.fieldFunctions.fill('DSMETAESP', 'Teste de Edição');
        z.field.fieldFunctions.fill('PERCCORRECAO', '20');
        z.component.footer.clickRightActionByLabel('Salvar');
    };

    this.excluirMetaEspecial = function () {
        h.navegar('Meta Período Especial');
        h.gridSemRegistros('3638210602585623398331').then(function(semRegistros){
            if(semRegistros)
                h.mensagemGrid();
            else{
                h.getIdGrid().then(function(idGrid){
                    z.widget.grid.checkAllRows(idGrid);
                    z.component.footer.clickCenterActionByLabel('Excluir');
                    //aguarda o alerta ficar visivel e clica na opção Sim
                    z.component.alert.isVisible().then(function(alertaVisivel){
                        if(alertaVisivel)
                            z.component.alert.clickButton('Sim');
                    });
                });
            }
        });
    };

    this.metaMensal = function (percentual, periodo, ano) {
        z.component.footer.clickRightActionByLabel('Ações');
        h.selectAction('Estimar meta');
        h.click('input#PERCENTUAL.input-text.mousetrap.zh-field-PERCENTUAL.zh-text-align-right.ng-valid-maxlength');
        $$('input#PERCENTUAL.input-text.mousetrap.zh-field-PERCENTUAL.zh-text-align-right.ng-valid-maxlength').get(1).sendKeys(percentual);
        var arrayDatas = periodo.split(' - ');
        //arrayDatas[0] = data inicial, arrayDatas[1] = data final
        h.selectIntervalDate('PERIODOMETA', arrayDatas[0], arrayDatas[1]);
        z.component.footer.clickRightActionByLabel('OK');
        z.component.footer.clickRightActionByLabel('Estimar Meta');
    };

    this.editarMetaMensal = function (mes, valor) {
        h.navegar('Meta por Mês');
        return h.getIdGrid().then(function(idGrid){
            return z.widget.grid.rowExists('CDMES', mes, idGrid).then(function(existeMes){
                if(existeMes){
                    z.widget.grid.click('CDMES', mes, idGrid);
                    z.component.footer.clickCenterActionByLabel('Editar');
                    z.field.fieldFunctions.fill('VRMES', valor);
                    z.component.footer.clickRightActionByLabel('Salvar');
                    return true;
                }
                else
                    return 'A meta para o mês '+ mes +' não existe no grid.';
            });
        });
    };

    this.editarMetaDiaSemana = function(mes, percentual){
        h.navegar('Meta por Mês');
        return z.widget.grid.rowExists('CDMES', mes, '3638210603645353162275').then(function(existeMes){
            if(existeMes){
                z.widget.grid.click('CDMES', mes, '3638210603645353162275');
                h.navegar('Meta por Dia da Semana');
                return h.gridSemRegistros('3638210601640353379295').then(function(semRegistros){
                    if(semRegistros)
                        return h.mensagemGrid();
                    else{
                        h.editInlineFieldValue(percentual, 0, 1, '3638210601640353379295');
                        z.component.footer.clickRightActionByLabel('Salvar alterações');
                        return h.notificacao().then(function(notificacaoVisivel){
                            return notificacaoVisivel ? true : false;
                        });
                    }
                });
            }      
            else
                return 'A meta para o mês '+ mes +' não existe no grid.';
        });
    };

    this.editarMetaModalidade = function(mes, percentual){
        h.navegar('Meta por Mês');
        return z.widget.grid.rowExists('CDMES', mes, '3638210603645353162275').then(function(existeMes){
            if(existeMes){
                z.widget.grid.click('CDMES', mes, '3638210603645353162275');
                h.navegar('Meta por Dia da Semana');
                return h.gridSemRegistros('3638210601640353379295').then(function(semRegistros){
                    if(semRegistros)
                        return h.mensagemGrid();
                    else{
                        z.widget.grid.clickColumn('3638210601640353379295', 0, 0);
                        h.navegar('Meta por Modalidade');
                        return h.gridSemRegistros('3638210601239997428313').then(function(semRegistros){
                            if(semRegistros)
                                return h.mensagemGrid();
                            else{
                                h.editInlineFieldValue(percentual, 0, 2, '3638210601239997428313');
                                z.component.footer.clickRightActionByLabel('Salvar alterações');
                                return h.notificacao().then(function(notificacaoVisivel){
                                    return notificacaoVisivel ? true : false;
                                });
                            }
                        });
                    }                        
                });
            }
            else
                return 'A meta para o mês '+ mes +' não existe no grid.';                 
        });
    };

    this.editarMetaHora = function(mes, percentual){
        h.navegar('Meta por Mês');
        return z.widget.grid.rowExists('CDMES', mes, '3638210603645353162275').then(function(existeMes){
            if(existeMes){
                z.widget.grid.click('CDMES', mes, '3638210603645353162275');
                h.navegar('Meta por Dia da Semana');
                return h.gridSemRegistros('3638210601640353379295').then(function(semRegistros){
                    if(semRegistros)
                        return h.mensagemGrid();
                    else{
                        z.widget.grid.clickColumn('3638210601640353379295', 0, 0);
                        h.navegar('Meta por Hora');
                        return h.gridSemRegistros('3638210602983286253349').then(function(semRegistros){
                            if(semRegistros)
                                return h.mensagemGrid();
                            else{
                                h.editInlineFieldValue(percentual, 0, 1, '3638210602983286253349');
                                z.component.footer.clickRightActionByLabel('Salvar alterações');
                                return h.notificacao().then(function(notificacaoVisivel){
                                    if(notificacaoVisivel){
                                        $('span.notification-message-icon').click();
                                        return true;
                                    }
                                    else
                                        return false;
                                });
                            }
                        });
                    }                        
                });
            }
            else
                return 'A meta para o mês '+ mes +' não existe no grid.';                 
        });
    };

    this.verificarMetasMesDia = function(){
        h.navegar('Meta por Mês/Dia');
        return h.gridSemRegistros('3638210601640353379295').then(function(semRegistros){
            if(semRegistros)
                return h.mensagemGrid();
            else
                return true;
        });
    };

    this.verificarMetaEspecial = function(){
        h.navegar('Meta Período Especial');
        return h.gridSemRegistros('3638210602585623398331').then(function(semRegistros){
            if(semRegistros)
                return h.mensagemGrid();
            else
                return true;
        });
    };

    this.atualizarVendas = function () {
        z.component.footer.clickLeftActionByLabel('Voltar');
        z.component.footer.clickRightActionByLabel('Ações');
        h.selectAction('Atualizar Vendas');
    };

    this.recalculaMeta = function () {
        z.component.footer.clickLeftActionByLabel('Voltar');
        z.component.footer.clickRightActionByLabel('Ações');
        h.selectAction('Recalcular meta');
        z.component.alert.clickButton('Sim');
    };
};
module.exports = new meta();