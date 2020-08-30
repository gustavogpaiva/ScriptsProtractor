var ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
var z = new ZeedhiAPIConstructor(browser, protractor);
var h = require('../../../../page-objects/helper.po.js');
var j = require('../../../../json/leitorJson.po.js');

var kds = function () {  
    var self = this;
    
    this.setor = function (setorProdKDS, setorExpKDS, setorMontKDS) {
        z.component.popup.isOpened().then(function(aberto){
            if(aberto){
                h.filtroUnidade();
                z.component.footer.clickRightActionByLabel('Filtrar');
            }
        });
        
        //navega até aba setor
        h.navegar('Setor');
        //adiciona setor 1 de 3
        z.component.footer.clickCenterActionByLabel('Adicionar');
        // z.field.fieldFunctions.fill('CDSETOR', '0008');
        z.field.fieldFunctions.fill('SGSETOR', 'EXP');
        z.field.fieldFunctions.fill('NMSETOR', setorExpKDS);
        h.selectNative('IDTIPOSETOR', 'Expedição');
        z.component.footer.clickRightActionByLabel('Salvar');
        //adiciona setor 2 de 3
        z.component.footer.clickCenterActionByLabel('Adicionar');
        // z.field.fieldFunctions.fill('CDSETOR', '0009');
        z.field.fieldFunctions.fill('SGSETOR', 'PROD');
        z.field.fieldFunctions.fill('NMSETOR', setorProdKDS);
        h.selectNative('IDTIPOSETOR', 'Produção');
        z.component.footer.clickRightActionByLabel('Salvar');
        //adiciona setor 3 de 3
        z.component.footer.clickCenterActionByLabel('Adicionar');
        //z.field.fieldFunctions.fill('CDSETOR', '0010');
        z.field.fieldFunctions.fill('SGSETOR', 'MONT');
        z.field.fieldFunctions.fill('NMSETOR', setorMontKDS);
        h.selectNative('IDTIPOSETOR', 'Montagem');
        z.component.footer.clickRightActionByLabel('Salvar');

        //retorna a mensagem confirmando o cadastro de setor
        return z.component.notification.isNotificationMessagePresent().then(function(presente){
            if(presente)
                return z.component.notification.getText(0);
        });
    };
    
    this.produtosSetor = function () {
        z.component.popup.isOpened().then(function(aberto){
            if(aberto){
                h.filtroUnidade();
                z.component.footer.clickRightActionByLabel('Filtrar');
            }
        });
        
        //navega até a aba setor
        h.navegar('Setor');
        z.widget.grid.click('CDSETOR', j.getValor('cdSetorKDS'), '1703783845705579958990');
        //navega até a aba Produtos do setor
        h.navegar('Produtos do setor');
        z.component.footer.clickCenterActionByIcon('plus');
        z.field.fieldFunctions.click('NMPRODUTO');
        //envia o termo de pesquisa do produto
        browser.sleep(5000);
        z.util.pressKey(j.getValor('produto'));
        //clica no produto pesquisado no grid
        h.getIdGrid().then(function(idGrid){
            z.widget.grid.click('NMPRODUTO', j.getValor('produto'), idGrid);
        });
        h.selectNative('IDRESUMOPRODKDS', 'Não aparece');
        h.selectNative('IDRESTRICAOORIGEM', 'Sem restrição');
        z.field.fieldFunctions.fill('DSAPELIDORESUMO', 'AB');
        //esse campo só aparece quando o tipo de setor for produção
        z.util.elementExists(by.css('span.zh-label.zh-field-group-label.ng-binding')).then(function(setorProducao){
            if(setorProducao){
                z.field.fieldFunctions.fill('NRTEMPOPROD', '1000');
            }
        });
        z.component.footer.clickRightActionByLabel('Salvar');

        //retorna a mensagem confirmando o cadastro de setor
        return z.component.notification.isNotificationMessagePresent().then(function(presente){
            if(presente)
                return z.component.notification.getText(0);
        });
    };
    
    this.observacoes = function () {
        z.component.popup.isOpened().then(function(aberto){
            if(aberto){
                h.filtroUnidade();
                z.component.footer.clickRightActionByLabel('Filtrar');
            }
        });
        
        h.navegar('Setor');
        h.getIdGrid().then(function(idGrid){
            z.widget.grid.click('CDSETOR', j.getValor('cdSetorKDS'), idGrid);        
        });
        
        h.navegar('Produtos do setor');
        z.widget.grid.click('NMPRODUTO', j.getValor('produto'), '17037838451122297446991');
        
        h.navegar('Observações');
        z.component.footer.clickCenterActionByLabel('Adicionar');
        
        //grupo
        z.field.fieldFunctions.click('DSGRPOCOR');
        z.widget.grid.click('DSGRPOCOR', j.getValor('grupoPedido'), '9009');
        
        //Observação
        z.field.fieldFunctions.click('DSOCORR');
        z.widget.grid.checkAllRows('9999');
        z.component.alert.clickButton('Sim');
        z.component.footer.clickRightActionByLabel('Ok');
        
        //tempo de produção
        h.selectNative('IDSINALALTERATEMPO', 'Adição');
        z.field.fieldFunctions.fill('NRTEMPOPROD', '60');
        z.component.footer.clickRightActionByLabel('Salvar');

        //retorna a mensagem confirmando o cadastro de setor
        return z.component.notification.isNotificationMessagePresent().then(function(presente){
            if(presente)
                return z.component.notification.getText(0);
        });
    };
    
    this.intervalos = function () {
        z.component.popup.isOpened().then(function(aberto){
            if(aberto){
                h.filtroUnidade();
                z.component.footer.clickRightActionByLabel('Filtrar');
            }
        });
        
        h.navegar('Setor');
        h.getIdGrid().then(function(idGrid){
            z.widget.grid.click('CDSETOR', j.getValor('cdSetorKDS'), idGrid);        
        });
        h.navegar('Produtos do setor');
        z.widget.grid.click('NMPRODUTO', j.getValor('produto'), '17037838451122297446991');
        h.navegar('Intervalos');
        z.component.footer.clickCenterActionByLabel('Adicionar');
        z.field.fieldFunctions.fill('NRSEQINTERVALO', '10');
        z.field.fieldFunctions.fill('NRTEMPOINTER', '60');
        z.component.footer.clickRightActionByLabel('Salvar');

        //retorna a mensagem confirmando o cadastro dos intervalos
        return z.component.notification.isNotificationMessagePresent().then(function(presente){
            if(presente){
                return z.component.notification.getText(0).then(function(notificacao){
                        //existe dois voltar nessa parte
                        z.component.footer.clickLeftActionByLabel('Voltar');
                        z.component.footer.clickLeftActionByLabel('Voltar');        
                        return notificacao;
                });
            }
        });
    };
    
    this.coresPedido = function () {
        z.component.popup.isOpened().then(function(aberto){
            if(aberto){
                h.filtroUnidade();
                z.component.footer.clickRightActionByLabel('Filtrar');
            }
        });
        
        h.navegar('Cores do Pedido');
        z.component.footer.clickCenterActionByLabel('Adicionar');
        z.field.fieldFunctions.fill('NRINICIOCOR', '251');
        z.field.fieldFunctions.fill('NRFINALCOR', '300');
        
        z.field.fieldFunctions.click('NRCORPEDIDO');
        z.component.footer.clickRightActionByLabel('Ok');        
        
        h.selectNative('IDPISCAPED', 'Sim');
        z.component.footer.clickRightActionByLabel('Salvar');

        //verifica se alerta de conflito de intervalo será exibido, e devolve a mensagem para o spec
        return z.component.alert.isVisible().then(function(visivel){
            if(visivel){
                return z.component.alert.getText().then(function(msgAlerta){
                    z.component.alert.clickMessageOk();
                    z.component.footer.clickLeftActionByLabel('Cancelar');
                    return msgAlerta;
                });
            }
            else{
                //retorna a mensagem para o spec confirmando o cadastro dos intervalos
                return z.component.notification.isNotificationMessagePresent().then(function(presente){
                    if(presente){
                        return z.component.notification.getText(0).then(function(notificacao){
                                return notificacao;
                        });
                    }
                }); 
            }
        });
    };
    
    this.mapeamentoTeclas = function () {
        z.component.popup.isOpened().then(function(aberto){
            if(aberto){
                h.filtroUnidade();
                z.component.footer.clickRightActionByLabel('Filtrar');
            }
        });
        h.navegar('Mapeamento de Teclas');
        z.component.footer.clickCenterActionByLabel('Adicionar');
        h.selectNative('IDFUNCAO', 'Cima');
        z.field.fieldFunctions.fill('IDKEY', 'W');
        z.component.footer.clickRightActionByLabel('Salvar');
        z.component.footer.clickLeftActionByLabel('Voltar');
        
        z.component.footer.clickCenterActionByLabel('Adicionar');
        h.selectNative('IDFUNCAO', 'Baixo');
        z.field.fieldFunctions.fill('IDKEY', 'S');
        z.component.footer.clickRightActionByLabel('Salvar');
        z.component.footer.clickLeftActionByLabel('Voltar');
        
        z.component.footer.clickCenterActionByLabel('Adicionar');
        h.selectNative('IDFUNCAO', 'Esquerda');
        z.field.fieldFunctions.fill('IDKEY', 'A');
        z.component.footer.clickRightActionByLabel('Salvar');
        z.component.footer.clickLeftActionByLabel('Voltar');
        
        z.component.footer.clickCenterActionByLabel('Adicionar');
        h.selectNative('IDFUNCAO', 'Direita');
        z.field.fieldFunctions.fill('IDKEY', 'D');
        z.component.footer.clickRightActionByLabel('Salvar');
        z.component.footer.clickLeftActionByLabel('Voltar');
        
        z.component.footer.clickCenterActionByLabel('Adicionar');
        h.selectNative('IDFUNCAO', 'Enter');
        z.field.fieldFunctions.fill('IDKEY', 'Enter');
        z.component.footer.clickRightActionByLabel('Salvar');
        z.component.footer.clickLeftActionByLabel('Voltar');
        
        z.component.footer.clickCenterActionByLabel('Adicionar');
        h.selectNative('IDFUNCAO', 'Rollback');
        z.field.fieldFunctions.fill('IDKEY', 'R');
        z.component.footer.clickRightActionByLabel('Salvar');
        z.component.footer.clickLeftActionByLabel('Voltar');
        
        z.component.footer.clickCenterActionByLabel('Adicionar');
        h.selectNative('IDFUNCAO', 'Zoom');
        z.field.fieldFunctions.fill('IDKEY', 'Z');
        z.component.footer.clickRightActionByLabel('Salvar');

        //retorna a mensagem confirmando o mapeamento de teclas
        return z.component.notification.isNotificationMessagePresent().then(function(presente){
            if(presente)
                return z.component.notification.getText(0).then(function(notificacao){
                    z.component.footer.clickLeftActionByLabel('Voltar');
                    return notificacao;
                });
        });
    };
    
    this.setorUnidadeKDS = function () {
        z.component.popup.isOpened().then(function(aberto){
            if(aberto){
                h.filtroUnidade();
                z.component.footer.clickRightActionByLabel('Filtrar');
            }
        });
        h.navegar('Unidade');
        z.widget.grid.click('CDFILIAL' ,j.getValor('cdfilial') , '17037838451018985559894');
        browser.sleep('5000');
        element(by.cssContainingText('a.ng-binding', 'Setores por Unidade')).click();
        //h.navegar('Setores por Unidade');
        z.component.footer.clickCenterActionByLabel('Adicionar');
        z.field.fieldFunctions.click('NMSETOR');
        h.getIdGrid().then(function(idGrid){
            z.widget.grid.click('NMSETOR', j.getValor('nomeSetor'), idGrid);        
        });
        h.selectNative('IDCONCDIRETO', 'Não');
        h.selectNative('IDCONTSOMKDS', 'Não');
        h.selectNative('IDHABPREENVIO', 'Não');
        h.selectNative('IDMOSTRAORIGEM', 'Sim');
        h.selectNative('IDUTLINTPAINEL', 'Não');
        h.selectNative('IDHABROLLBKDS', 'Não');
        h.selectNative('IDHABTIMERPROD', 'Não');
        //h.selectNative('IDHABSOMKDS', 'Não'); salvar não funciona com esse ativo
        z.component.footer.clickRightActionByLabel('Salvar');

        //retorna a mensagem confirmando o mapeamento de teclas
        return z.component.notification.isNotificationMessagePresent().then(function(presente){
            if(presente)
                return z.component.notification.getText(0).then(function(notificacao){
                    z.component.footer.clickLeftActionByLabel('Voltar');
                    return notificacao;
                });
        });
    };
    
    this.setorLojasKDS = function () {
        z.component.popup.isOpened().then(function(aberto){
            if(aberto){
                h.filtroUnidade();
                z.component.footer.clickRightActionByLabel('Filtrar');
            }
        });

        h.navegar('Unidade');
        z.widget.grid.click('CDFILIAL' ,j.getValor('cdfilial') , '17037838451018985559894');
        h.navegar('Lojas');
        z.widget.grid.click('CDLOJA', j.getValor('cdloja'), '17037838453485708404944');
        h.navegar('Setores por Loja');
        z.component.footer.clickCenterActionByLabel('Adicionar');
        z.field.fieldFunctions.click('NMSETOR');
        h.getIdGrid().then(function(idGrid){
            z.widget.grid.click('NMSETOR', j.getValor('nomeSetor'), idGrid);        
        });
        z.component.footer.clickRightActionByLabel('Salvar');
        
        //retorna a mensagem confirmando o mapeamento de teclas
        return z.component.notification.isNotificationMessagePresent().then(function(presente){
            if(presente)
                return z.component.notification.getText(0).then(function(notificacao){
                    z.component.footer.clickLeftActionByLabel('Voltar');
                    z.component.footer.clickLeftActionByLabel('Voltar');
                    return notificacao;
                });
        });
    };
    
    this.edicaoSetorKDS = function(){
        z.component.popup.isOpened().then(function(aberto){
            if(aberto){
                h.filtroUnidade();
                z.component.footer.clickRightActionByLabel('Filtrar');
            }
        });

        h.navegar('Setor');
        z.widget.grid.click('CDSETOR', j.getValor('cdSetorKDS'), '1703783845705579958990');
        z.component.footer.clickCenterActionByLabel('Editar');
        z.field.fieldFunctions.fill('SGSETOR', 'EXPED');
        z.field.fieldFunctions.fill('NMSETOR', j.getValor('setorExpedicaoKDS'));
        h.selectNative('IDTIPOSETOR', 'Expedição');
        z.component.footer.clickRightActionByLabel('Salvar'); 
        
        //retorna a mensagem confirmando a edição dos setores do KDS
        return z.component.notification.isNotificationMessagePresent().then(function(presente){
            if(presente)
                return z.component.notification.getText(0).then(function(notificacao){
                    z.component.footer.clickLeftActionByLabel('Voltar');
                    return notificacao;
                });
        });

    };

    this.edicaoProdutosKDS = function(){
        z.component.popup.isOpened().then(function(aberto){
            if(aberto){
                h.filtroUnidade();
                z.component.footer.clickRightActionByLabel('Filtrar');
            }
        });        
        
        h.navegar('Setor');
        z.widget.grid.click('CDSETOR', j.getValor('cdSetorKDS'), '1703783845705579958990');
        h.navegar('Produtos do setor');
        z.widget.grid.click('NMPRODUTO', j.getValor('produto'), '17037838451122297446991');
        z.component.footer.clickCenterActionByLabel('Editar');
        h.selectNative('IDRESUMOPRODKDS', 'Aparece quando necessário');
        h.selectNative('IDRESTRICAOORIGEM', 'Utilizar restriçoes da API');
        z.field.fieldFunctions.fill('DSAPELIDORESUMO', 'TESTE DE NOME');
        //se estiver editando produção do setor de produção parametriza os dois campos
        z.util.elementExists(by.css('span.zh-label.zh-field-group-label.ng-binding')).then(function(setorProducao){
            if(setorProducao){
                z.field.fieldFunctions.fill('NRTEMPOPROD', '0230');
                z.field.fieldFunctions.fill('NRTEMPOEXIB', '0100');            
            }
        });
        z.component.footer.clickRightActionByLabel('Salvar');
        
        //aguarda alerta confirmando se deseja alterar o produto em todos os setores
        z.component.alert.isVisible().then(function(visivel){
            if(visivel)
                z.component.alert.clickButton('Não');
        });

        //retorna a mensagem para o spec confirmando a edição do produto do setor
        return z.component.notification.isNotificationMessagePresent().then(function(presente){
            if(presente)
                return z.component.notification.getText(0).then(function(notificacao){
                    z.component.footer.clickLeftActionByLabel('Voltar');
                    return notificacao;
                });
        });
    };

    this.edicaoSetor = function () {
       
        h.navegar('Setor');
        z.widget.grid.click('CDSETOR', j.getValor('cdSetorKDS'), '1703783845705579958990');
        z.component.footer.clickCenterActionByLabel('Editar');
        z.field.fieldFunctions.fill('SGSETOR', 'EXPED');
        z.field.fieldFunctions.fill('NMSETOR', 'Expedição 2');
        h.selectNative('IDTIPOSETOR', 'Expedição');
        z.component.footer.clickRightActionByLabel('Salvar');
        
        h.navegar('Produtos do setor');
        z.widget.grid.clickColumn('17037838451122297446991',0, 0, true);
        z.component.footer.clickCenterActionByLabel('Editar');
        h.selectNative('IDRESUMOPRODKDS', 'Aparece quando necessário');
        h.selectNative('IDRESTRICAOORIGEM', 'Utilizar restriçoes da API');
        z.field.fieldFunctions.fill('DSAPELIDORESUMO', 'TESTE DE NOME');
        z.component.footer.clickRightActionByLabel('Salvar');
        z.component.footer.clickLeftActionByLabel('Voltar');
    };
    
    this.edicaoTeclas = function () {
        h.navegar('Mapeamento de Teclas');
        //faz a primeira edição
        z.widget.grid.clickColumn('170378384516294726631093', 0, 0, false);
        z.component.footer.clickCenterActionByLabel('Editar');
        h.selectNative('IDFUNCAO', 'Cima');
        z.field.fieldFunctions.fill('IDKEY', 'T');
        z.component.footer.clickRightActionByLabel('Salvar');
        z.component.footer.clickLeftActionByLabel('Voltar');
        
        //faz a segunda edição
        z.widget.grid.clickColumn('170378384516294726631093', 1, 0, false);
        z.component.footer.clickCenterActionByLabel('Editar');
        h.selectNative('IDFUNCAO', 'Baixo');
        z.field.fieldFunctions.fill('IDKEY', 'G');
        z.component.footer.clickRightActionByLabel('Salvar');
        z.component.footer.clickLeftActionByLabel('Voltar');
        
        //faz a terceira edição
        z.widget.grid.clickColumn('170378384516294726631093', 2, 0, false);
        z.component.footer.clickCenterActionByLabel('Editar');
        h.selectNative('IDFUNCAO', 'Esquerda');
        z.field.fieldFunctions.fill('IDKEY', 'F');
        z.component.footer.clickRightActionByLabel('Salvar');
        z.component.footer.clickLeftActionByLabel('Voltar');
        
        //faz a quarta edição
        z.widget.grid.clickColumn('170378384516294726631093', 3, 0, false);
        z.component.footer.clickCenterActionByLabel('Editar');
        h.selectNative('IDFUNCAO', 'Direita');
        z.field.fieldFunctions.fill('IDKEY', 'H');
        z.component.footer.clickRightActionByLabel('Salvar');
        z.component.footer.clickLeftActionByLabel('Voltar');
        
        //faz a quinta edição
        z.widget.grid.clickColumn('170378384516294726631093', 4, 0, false);
        z.component.footer.clickCenterActionByLabel('Editar');
        h.selectNative('IDFUNCAO', 'Enter');
        z.field.fieldFunctions.fill('IDKEY', 'P');
        z.component.footer.clickRightActionByLabel('Salvar');
        z.component.footer.clickLeftActionByLabel('Voltar');
        
        //faz a sexta edição
        z.widget.grid.clickColumn('170378384516294726631093', 5, 0, false);
        z.component.footer.clickCenterActionByLabel('Editar');
        h.selectNative('IDFUNCAO', 'Rollback');
        z.field.fieldFunctions.fill('IDKEY', 'U');
        z.component.footer.clickRightActionByLabel('Salvar');
        z.component.footer.clickLeftActionByLabel('Voltar');
        
        //faz a setíma edição
        z.widget.grid.clickColumn('170378384516294726631093', 6, 0, false);
        z.component.footer.clickCenterActionByLabel('Editar');
        h.selectNative('IDFUNCAO', 'Zoom');
        z.field.fieldFunctions.fill('IDKEY', 'Ç');
        z.component.footer.clickRightActionByLabel('Salvar');
        z.component.footer.clickLeftActionByLabel('Voltar');
    };
    
    this.editarUnidade = function(){
        z.component.popup.isOpened().then(function(aberto){
            if(aberto){
                h.filtroUnidade();
                z.component.footer.clickRightActionByLabel('Filtrar');
            }
        });

        h.navegar('Unidade');
        h.getIdGrid().then(function(idGrid){
            z.widget.grid.click('CDFILIAL', j.getValor('cdfilial'), idGrid);
        });
        
        z.component.footer.clickCenterActionByLabel('Editar');
        //envia o numero de atraso padrão da produção de itens no kds
        z.field.fieldFunctions.fill('NRATRAPADRAO', '60');
        
        //verifica se o alerta será exibido informando que o valor deve ser maior que '0'
        z.component.alert.isVisible().then(function(visivel){
            if(visivel)
                z.component.alert.clickMessageOk();
        });
        z.component.footer.clickRightActionByLabel('Salvar');

        //retorna a mensagem para o spec confirmando a edição do produto do setor
        return z.component.notification.isNotificationMessagePresent().then(function(presente){
            if(presente)
                return z.component.notification.getText(0).then(function(notificacao){
                    return notificacao;
                });
        });
    };

    this.editarSetoreUnidade = function(){
        browser.sleep(2000);
        element(by.cssContainingText('a.ng-binding', 'Setores por Unidade')).click();
        z.widget.grid.clickColumn('1703783845842249706895', 0, 0, false);
        z.component.footer.clickCenterActionByLabel('Editar');
        h.selectNative('IDCONCDIRETO', 'Sim');
        h.selectNative('IDCONTSOMKDS', 'Sim');
        h.selectNative('IDHABPREENVIO', 'Sim');
        h.selectNative('IDMOSTRAORIGEM', 'Não');
        h.selectNative('IDUTLINTPAINEL', 'Sim');
        h.selectNative('IDHABROLLBKDS', 'Sim');
        h.selectNative('IDHABTIMERPROD', 'Sim');
        z.component.footer.clickRightActionByLabel('Salvar');
        z.component.footer.clickLeftActionByLabel('Voltar');
    };
    
    this.excluirTeclas = function () {
        z.component.popup.isOpened().then(function(aberto){
            if(aberto){
                h.filtroUnidade();
                z.component.footer.clickRightActionByLabel('Filtrar');
            }
        });
               
        h.navegar('Mapeamento de Teclas');
        //obtem o número de linhas do grid da aba 'Mapeamento de Teclas'
        return z.widget.grid.getNrRowsFromGroupedGrid('170378384516294726631093').then(function(total){
            //se total linhas for maior que '0' percorre cada linha do grid e exclui todos os mapeamentos de teclas
            if(total > 0){
                //seleciona cada linha clica na opção excluir e confirma
                for(var i = 1; i <= total; i++){
                    z.widget.grid.clickColumn('170378384516294726631093', 0, 0);
                    z.component.footer.clickCenterActionByLabel('Exlcuir');
                    z.component.alert.clickButton('Sim');
                }    
                //retorna a mensagem para o spec que a exclusão foi realizada com sucesso
                return 'Excluído com sucesso.';
            }
            //se total de linhas for '0' retorna a mensagem para o spec que o mapeamento não está cadastrado
            else{
                return 'Mapeamento de teclas não foi cadastrado.';
            }
        });
    };
    
    this.excluirSetor = function (setorKDS) {
        z.component.popup.isOpened().then(function(aberto){
            if(aberto){
                h.filtroUnidade();
                z.component.footer.clickRightActionByLabel('Filtrar');
            }
        });

        h.navegar('Setor');
        z.widget.grid.click('NMSETOR', setorKDS, '1703783845705579958990');
        z.component.footer.clickCenterActionByLabel('Excluir');
        z.component.alert.clickButton('Sim');
        
        //aqui ocorre a pergunta de que talvez possa existir registro filho
        return z.component.alert.isVisible().then(function(alerta){
            //se houver registro filho retorna a mensagem para o spec e fecha o alerta
            if(alerta){
                var msgAlerta = z.component.alert.getText().then(function(msg){
                    return msg;
                });
                z.component.alert.clickMessageOk();
                z.component.footer.clickLeftActionByLabel('Voltar'); 
                return msgAlerta;       
            }
            //senão retorna a mensagem para o spec confirmando a exclusão do setor
            else{
                return z.component.notification.isNotificationMessagePresent().then(function(presente){
                    if(presente)
                        return z.component.notification.getText(0).then(function(notificacao){
                            return notificacao;
                        });
                });                
            }
        });
    };

    this.excluirIntervalos = function(setorKDS){
        z.component.popup.isOpened().then(function(aberto){
            if(aberto){
                h.filtroUnidade();
                z.component.footer.clickRightActionByLabel('Filtrar');
            }
        });

        //navega até a aba setor e escolhe o setor que terá o intervalo excluído
        h.navegar('Setor');
        z.widget.grid.click('NMSETOR', setorKDS, '1703783845705579958990');

        //navega até aba produtos por setor e seleciona o produto que contem o intervalo
        h.navegar('Produtos do setor');
        return h.gridSemRegistros('17037838451122297446991').then(function(semRegistros){
            //se existe produtos cadastrado para o setor seleciona no grid
            if(!semRegistros){
                z.widget.grid.clickColumn('17037838451122297446991', 0, 0, true);
                //navega até a aba intevalos seleciona o intervalo e exclui
                h.navegar('Intervalos');
                return h.gridSemRegistros('17037838454030606082215').then(function(semIntervalos){
                    //se existir intervalo cadastrado, seleciona e exclui do grid
                    if(!semIntervalos){
                        z.widget.grid.clickColumn('17037838454030606082215', 0, 0, false);
                        z.component.footer.clickCenterActionByLabel('Excluir');
                        z.component.alert.clickButton('Sim');
                        //retorna a mensagem de notificação para o spec, confirmando a exclusão do intervalo
                        return z.component.notification.isNotificationMessagePresent().then(function(presente){
                            if(presente){
                                return z.component.notification.getText(0).then(function(notificacao){
                                    z.component.footer.clickLeftActionByLabel('Voltar'); 
                                    z.component.footer.clickLeftActionByLabel('Voltar'); 
                                    return notificacao;
                                });
                            }
                        });                          
                    }
                    //senão retorna a mensagem para o spec que não há intervalo cadastrado
                    else{
                        return 'Não há intervalos cadastrado.';
                    }
                });
            }
            //senão retorna para o spec que não há produtos cadastrado para o setor
            else{
                return 'Não há produtos cadastrado para o setor.';
            }               
        });
    };

    this.excluirObservacoes = function(setorKDS){
        z.component.popup.isOpened().then(function(aberto){
            if(aberto){
                h.filtroUnidade();
                z.component.footer.clickRightActionByLabel('Filtrar');
            }
        });

        //navega até a aba setor e escolhe o setor que terá o intervalo excluído
        h.navegar('Setor');
        z.widget.grid.click('NMSETOR', setorKDS, '1703783845705579958990');

        //navega até a aba produtos do setor seleciona o produto com a observação a ser excluída
        h.navegar('Produtos do setor');
        return h.gridSemRegistros('17037838451122297446991').then(function(semRegistros){
            //se existe produtos para o setor seleciona no grid
            if(!semRegistros){
                z.widget.grid.clickColumn('17037838451122297446991', 0, 0, true);
                //navega até aba observações e seleciona a observação do produto a ser excluida
                h.navegar('Observações');   
                return h.gridSemRegistros('17037838451044048193992').then(function(semRegistros){
                    //se existe observação seleciona no grid e exclui
                    if(!semRegistros){
                        z.widget.grid.checkAllRows('17037838451044048193992');
                        z.component.alert.clickButton('Sim');
                        z.component.footer.clickCenterActionByLabel('Excluir');
                        z.component.alert.clickButton('Sim');                

                        //retorna a mensagem de notificação para o spec, confirmando a exclusão do intervalo
                        return z.component.notification.isNotificationMessagePresent().then(function(presente){
                            if(presente)
                                return z.component.notification.getText(0).then(function(notificacao){
                                    z.component.footer.clickLeftActionByLabel('Voltar'); 
                                    z.component.footer.clickLeftActionByLabel('Voltar'); 
                                    return notificacao;
                                });
                        }); 
                    }
                    //senão volta a tela principal e retorna a mensagem para o spec
                    else{
                        z.component.footer.clickLeftActionByLabel('Voltar'); 
                        z.component.footer.clickLeftActionByLabel('Voltar'); 
                        return 'Não há observações cadastradas.';
                    }
                });
            }
            else{
                return 'Não há produtos cadastrado para o setor.';
            }
        });
    };
    
    this.excluirProdutosKDS = function(setorKDS){
        z.component.popup.isOpened().then(function(aberto){
            if(aberto){
                h.filtroUnidade();
                z.component.footer.clickRightActionByLabel('Filtrar');
            }
        });

        //navega até a aba setor e escolhe o setor que terá o intervalo excluído
        h.navegar('Setor');
        z.widget.grid.click('NMSETOR', setorKDS, '1703783845705579958990');

        //navega até a aba produtos do setor seleciona o produto com a observação a ser excluída
        h.navegar('Produtos do setor');
        return h.gridSemRegistros('17037838451122297446991').then(function(semRegistros){
            //se existir produtos cadastrados seleciona todos no grid e exclui
            if(!semRegistros){
                z.widget.grid.checkAllRows('17037838451122297446991');
                z.component.alert.clickButton('Sim');
                z.component.footer.clickCenterActionByLabel('Excluir');
                z.component.alert.clickButton('Sim');

                //retorna a mensagem de notificação para o spec, confirmando a exclusão do intervalo
                return z.component.notification.isNotificationMessagePresent().then(function(presente){
                if(presente)
                    return z.component.notification.getText(0).then(function(notificacao){
                        z.component.footer.clickLeftActionByLabel('Voltar'); 
                        return notificacao;
                    });
                }); 
            }
            else{
                return 'Não há produtos cadastrado para o setor.';
            }
        });
    };

    this.excluirSetorLoja = function () {
        z.component.popup.isOpened().then(function(aberto){
            if(aberto){
                h.filtroUnidade();
                z.component.footer.clickRightActionByLabel('Filtrar');
            }
        });

        h.navegar('Unidade');
        z.widget.grid.clickColumn('17037838451018985559894', 0, 0, false);
        h.navegar('Lojas');
        z.widget.grid.clickColumn('17037838453485708404944', 0, 0, false);
        h.navegar('Setores por Loja');
        z.widget.grid.clickColumn('17037838453581633034945', 0, 0, false);
        z.component.footer.clickCenterActionByLabel('Excluir');
        z.component.alert.clickButton('Sim');

        //retorna a mensagem de notificação para o spec, confirmando a exclusão do intervalo
        return z.component.notification.isNotificationMessagePresent().then(function(presente){
        if(presente)
            return z.component.notification.getText(0).then(function(notificacao){
                z.component.footer.clickLeftActionByLabel('Voltar'); 
                z.component.footer.clickLeftActionByLabel('Voltar'); 
                return notificacao;
            });
        }); 
    };

    this.excluirSetorUnidade = function(){
        z.component.popup.isOpened().then(function(aberto){
            if(aberto){
                h.filtroUnidade();
                z.component.footer.clickRightActionByLabel('Filtrar');
            }
        });

        h.navegar('Unidade');
        z.widget.grid.clickColumn('17037838451018985559894', 0, 0, false);
        element(by.cssContainingText('a.ng-binding', 'Setores por Unidade')).click();
        z.widget.grid.click('NMSETOR', j.getValor('nomeSetor'), '1703783845842249706895');
        z.component.footer.clickCenterActionByLabel('Excluir');
        z.component.alert.clickButton('Sim');

        //caso o setor esteja vinculado a mais de uma loja exibirá 
        return z.component.alert.isVisible().then(function(alerta){
            //se houver registro filho retorna a mensagem para o spec e fecha o alerta
            if(alerta){
                var msgAlerta = z.component.alert.getText().then(function(msg){
                    return msg;
                });
                z.component.alert.clickMessageOk();
                z.component.footer.clickLeftActionByLabel('Voltar'); 
                return msgAlerta;       
            }
            //senão retorna a mensagem para o spec confirmando a exclusão do setor
            else{
                return z.component.notification.isNotificationMessagePresent().then(function(presente){
                    if(presente)
                        return z.component.notification.getText(0).then(function(notificacao){
                            z.component.footer.clickLeftActionByLabel('Voltar');
                            return notificacao;
                        });
                });                
            }
        });
    };
}
module.exports = new kds();