var ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
var z = new ZeedhiAPIConstructor(browser, protractor);
var j = require('../../../../json/leitorJson.po.js');
var h = require('../../../../page-objects/helper.po.js');

var configTerminal = function () {
    var self = this;

    this.filtrarConfiguracao = async function (){
        if(!await z.component.popup.isOpened()){
            z.component.floatingControl.toggle();
            z.component.floatingControl.selectAction('search');
            z.component.floatingControl.selectAction('filter');
        }
        browser.sleep(8000);
        h.filtroUnidade();
        browser.sleep(8000);
        h.filtroLoja();
        z.component.footer.clickRightActionByLabel('Filtrar');
    };
    
    this.cadastrarConfiguracao = async function (codigo) {
        //adiciona uma nova loja, informando código e o nome
        z.component.footer.clickCenterActionByLabel('Adicionar');

        //loop para buscar todos 'id'NMCONFTELA e tentar inserir um valor em input
        var elementos = element.all(by.name('NMCONFTELA'));
        elementos.each(function (el) {
            el.isDisplayed().then(function (displayed) {
                if (displayed) {
                    try {
                        el.sendKeys(codigo)
                    } catch (erro) {
                        console.log(erro);
                    }
                }
            })
        });
        //clica na opção salvar apos definir o nome da configuração do caixa
        z.component.footer.clickRightActionByLabel('Salvar');

        //clica na configuração do caixa exibida no grid
        z.widget.grid.click('NMCONFTELA', j.getValor('nomeAlteracaoCadLoja'), '845309593783672194568');
        //finaliza a primeira parte do cadastro
        h.navegar('Caixas Associados');

        //se o grid estiver vazio clica para adicionar um caixa a configuração do caixa
        if(await h.gridSemRegistros('8453095932610382788569')){
            z.component.footer.clickCenterActionByLabel('Adicionar');
            z.field.fieldFunctions.click('NMFILIAL');
            z.widget.grid.click('NMFILIAL', j.getValor('filial'), '9009');
            //adiciona um caixa existente na unidade
            z.field.fieldFunctions.click('CDCAIXA');
            //se o caixa existir no grid seleciona e clica em salvar
            if(await z.widget.grid.rowExists('CDCAIXA', j.getValor('cdcaixa'), '9999')){
                console.log('existe caixa');
                z.widget.grid.click('CDCAIXA', j.getValor('cdcaixa'), '9999');    
                z.component.footer.clickRightActionByLabel('Ok');   
                z.component.footer.clickRightActionByLabel('Salvar');    
            }
            //senão cancela a opção de adicionar o caixa
            else{
                console.log('não existe caixa');
                z.component.footer.clickLeftActionByLabel('Cancelar');
                z.component.footer.clickLeftActionByLabel('Cancelar');
            }
        }
        
        //navega ate grupo de produtos e clica para adicionar um novo grupo de produtos
        h.navegar('Grupos de Produtos');
        z.component.footer.clickCenterActionByLabel('Adicionar');

        //seleciona a pagina do grupo a ser exibida na configuração do caixa
        element.all(by.css('div.new-select.input-text.form-input-margin-bottom.mousetrap.form-control')).get(2).click();
        element.all(by.css('li.option')).get(12).click();
        
        //seleciona a posição do grupo a ser exibida na configuração do caixa
        z.field.fieldFunctions.click('NRBUTTON');
        z.widget.grid.click('NRBUTTON', '01', '9009');
        
        //função para preencher campo nome do grupo
        var elementos = element.all(by.name('DSBUTTON'));
        elementos.each(function (el) {
            el.isDisplayed().then(function (displayed) {
                if (displayed) {
                    try {
                        el.sendKeys('Teste de inserção');
                    } catch (err) {
                        console.log(err);
                    }
                }
            })
        });

        //insere legendas no campo de idiomais ingles espanhol
        z.field.fieldFunctions.fill('DSBUTTONINGLES', 'tests');
        z.field.fieldFunctions.fill('DSBUTTONESPANH', 'teste');

        //seleciona a cor do botão do grupo
        var elementos = element.all(by.css('#NRCOLORBACK'));
        elementos.each(function(el){
           el.isDisplayed().then(function(displayed){
               if(displayed){
                   try{
                       el.click();
                   } catch(err){
                       console.log(err);
                   }
               }
           });
        });
        z.component.footer.clickRightActionByLabel('Ok');

        //seleciona a cor da fonte do grupo
        var elementos = element.all(by.css('#NRCOLORTEXT'));
        elementos.each(function(el){
           el.isDisplayed().then(function(displayed){
               if(displayed){
                   try{
                       el.click();
                   } catch(err){
                       console.log(err);
                   }
               }
           });
        });
        z.component.footer.clickRightActionByLabel('Ok');

        //define o tamanho da fonte do grupo
        z.field.fieldFunctions.fill('NRFONTETEXT', '8');

        //define se o grupo vai ser exibido no auto atendimento
        h.selectNative('IDSHOWTAA', 'Sim');
        
        //clica em salvar o grupo de produtos da configuração do terminal do caixa
        z.component.footer.clickRightActionByLabel('Salvar');

        //abre um grupo cadastrado para inserir um produto dentro do grupo
        z.widget.grid.click('DSBUTTON', 'Teste de inserção','845309593188953947591');
        //navega até a aba Produtos
        $$('a.ng-binding').get(9).click();

        z.component.footer.clickCenterActionByLabel('Adicionar');

        //h.selectNative('NRPGCONFTELA', '1');
        //seleciona a pagina que o produto a ser exibido no grupo de produtos
        element.all(by.css('div.new-select.input-text.form-input-margin-bottom.mousetrap.form-control')).get(2).click();
        element.all(by.css('li.option')).get(12).click();

        z.field.fieldFunctions.click('NRBUTTON');
        z.widget.grid.click('NRBUTTON', '01', '9009');

        h.selectNative('IDTPBUTTON', 'Produtos');

        //clica no campo produto, pesquisa o produtos e cadastra para o grupo
        h.click('#NMPRODUTO > span.zh-icon.zh-icon-search.zh-icon-no-border');
        browser.sleep(3000);
        $$('div.floating-card-input > input').get(6).sendKeys(j.getValor('produto'));
        z.widget.grid.click('NMPRODUTO', j.getValor('produto'), '9009');
        
        //insere o nome dos produtos para o idioma ingles e espanhol
        z.field.fieldFunctions.fill('DSBUTTONINGLES', 'Product');
        z.field.fieldFunctions.fill('DSBUTTONESPANH', 'Producto');

        //seleciona a opção se o produto permite venda no delivery -> h.selectNative('IDEXIBEAPPCONS', 'Sim');
        element.all(by.css('div.new-select.input-text.form-input-margin-bottom.mousetrap.form-control')).get(4).click();
        element.all(by.css('li.option')).get(25).click();

        //define o tamanho da fonte
        z.field.fieldFunctions.fill('NRFONTETEXT', '08');
        //clica para salvar o novo produto no grupo de produtos 
        z.component.footer.clickRightActionByLabel('Salvar');
        //caso exiba algum alerta de erro clica no botão ok e cancela o cadastro do produto
        if(await h.alertaDeErro())
            z.component.footer.clickLeftActionByLabel('Cancelar');

        z.component.footer.clickLeftActionByLabel('Voltar');

        h.navegar('Grupos de Recebimento');
        z.component.footer.clickCenterActionByLabel('Adicionar');

        //seleciona a posição do grupo de recebimento
        element.all(by.css('div.new-select.input-text.form-input-margin-bottom.mousetrap.form-control')).get(2).click();
        element.all(by.css('li.option')).get(12).click();

        //função para preencher campo nome do grupo
        var elementos = element.all(by.name('DSBUTTON'));
        elementos.each(function (el) {
            el.isDisplayed().then(function (displayed) {
                if (displayed) {
                    try {
                        el.sendKeys('Teste de inserção');
                    } catch (err) {
                        console.log(err);
                    }
                }
            })
        });

        //define o tamanho da fonte do grupo
        z.field.fieldFunctions.fill('NRFONTETEXT', '8');
        //clica para salvar o novo grupo de recebimento
        z.component.footer.clickRightActionByLabel('Salvar');

        if(await z.widget.grid.rowExists('DSBUTTON', 'Teste de inserção' ,'8453095932400867749703')){
            z.widget.grid.click('DSBUTTON', 'Teste de inserção' ,'8453095932400867749703');
            //navega até aba tipo de recebimento
            $$('a.ng-binding').get(8).click();
            z.component.footer.clickCenterActionByLabel('Adicionar');

            //seleciona a pagina do tipo de recebimento
            element.all(by.css('div.new-select.input-text.form-input-margin-bottom.mousetrap.form-control')).get(2).click();
            element.all(by.css('li.option')).get(12).click();

            //seleciona a posição do tipo de recebimento
            element.all(by.css('div.new-select.input-text.form-input-margin-bottom.mousetrap.form-control')).get(3).click();
            element.all(by.css('li.option')).get(14).click();

            z.field.fieldFunctions.click('CDIDENTBUTON');
            z.widget.grid.click('NMTIPORECE', 'DINHEIRO', '9009');

            //define o tamanho da fonte do grupo
            z.field.fieldFunctions.fill('NRFONTETEXT', '8');

            h.selectNative('IDTPBUTTON', 'Tipo de Recebimento');
            //clica para salvar o novo tipo de recebimento
            z.component.footer.clickRightActionByLabel('Salvar');
            z.component.footer.clickLeftActionByLabel('Voltar');
        }
        //navega até a aba ambiente
        h.navegar('Ambiente');

        if(!(await z.widget.grid.rowExists('CDSALA', '00001', '845309593833584289757'))){
            z.component.footer.clickCenterActionByLabel('Adicionar');
            h.selectNative('NRBUTTON', '1');

            z.field.fieldFunctions.click('CDSALA');
            if(await h.gridSemRegistros('9009')){
                z.component.footer.clickLeftActionByLabel('Cancelar');
                z.component.footer.clickLeftActionByLabel('Cancelar');
                //return 'Ambiente para mesas não foi cadastrado';
            }
            else{
                z.widget.grid.click('NMSALA', j.getValor('ambiente'), '9009');

                //função para preencher campo nome do grupo
                var elementos = element.all(by.name('DSBUTTON'));
                elementos.each(function (el) {
                    el.isDisplayed().then(function (displayed) {
                        if (displayed) {
                            try {
                                el.sendKeys('Teste de inserção');
                            } catch (err) {
                                console.log(err);
                            }
                        }
                    })
                });

                z.field.fieldFunctions.fill('NRFONTETEXT', '08');
                //clica para salvar o novo ambiente
                z.component.footer.clickRightActionByLabel('Salvar');
            }
        }

        //volta para o grid principal
        z.component.footer.clickLeftActionByLabel('Voltar');

        //retorna true para o spec caso a configuração foi salva e está exibida no grid
        if(await z.widget.grid.rowExists('NMCONFTELA', j.getValor('nomeAlteracaoCadLoja'), '845309593783672194568'))
            return true;
        //retorna false para o spec caso a configuração não esteja presente no grid
        else
            return false;
    };
    
    this.editarConfTerminal = async function (caixa, codigo) {
        if(await z.widget.grid.rowExists('NMCONFTELA', j.getValor('nomeAlteracaoCadLoja'), '845309593783672194568')){
            z.widget.grid.click('NMCONFTELA',j.getValor('nomeAlteracaoCadLoja'), '845309593783672194568');
            //pressiona o botão editar
            z.component.footer.clickCenterActionByIcon('pencil');
            
            //esse campo em especifico necessita desta função para inserir valor no input
            //foi realizado a alteração em relação ao código acima, a função clear foi implementada para
            //limpar o que está escrito no campo
            var elementos = element.all(by.name('NMCONFTELA'));
            elementos.each(function (el) {
                el.isDisplayed().then(function (displayed) {
                    if (displayed) {
                        try {
                            el.clear();
                            el.sendKeys(codigo)
                        } catch (err) {
                            console.log(err);
                        }
                    }
                })
            });
            z.component.footer.clickRightActionByLabel('Salvar');
            z.component.footer.clickLeftActionByLabel('Voltar');

            //retorna true para o spec caso a configuração foi salva e está exibida no grid
            if(await z.widget.grid.rowExists('NMCONFTELA', codigo, '845309593783672194568'))
                return true;
            //retorna false para o spec caso a configuração não esteja presente no grid
            else
                return false;
        }
        else{
            return 'Não foi possível localizar configuração terminal do caixa.';
        }
    };
    
    this.excluirConfTerminal = async function () {
        if(await z.widget.grid.rowExists('NMCONFTELA', 'CAIXA PDV LOJA 5', '845309593783672194568')){
            z.widget.grid.click('NMCONFTELA', 'CAIXA PDV LOJA 5', '845309593783672194568');
            z.component.footer.clickCenterActionByLabel('Excluir');
            z.component.alert.clickButton('Sim');
            if(!(await z.widget.grid.rowExists('NMCONFTELA', 'CAIXA PDV LOJA 5', '845309593783672194568')))
                return true;
            else
                return 'Não foi possível excluir a configuração terminal do caixa.';
        }
        else
            return 'Não foi possível localizar configuração terminal do caixa.'; 
        
    };
    
    this.cadastroSemNome = async function () {
        z.component.footer.clickCenterActionByLabel('Adicionar');
        z.component.footer.clickRightActionByLabel('Salvar');
        
        //se aparecer a notificação de que o campo é obrigatorio retorna true para o spec
        if(await z.util.elementExists(by.css('div.zh-validation > span'))){
            z.component.footer.clickLeftActionByLabel('Cancelar');
            z.component.footer.clickLeftActionByLabel('Voltar');
            return true;
        }
        //se conseguir salvar com o campo obrigatório vazio retorna false para o spec
        else{
            return false;
        }
    };
    
    this.edicaoSemNome = async function () {
        browser.sleep(5000);
        //seleciona a configuração do terminal do caixa
        z.widget.grid.click('NMCONFTELA', j.getValor('nomeAlteracaoCadLoja'), '845309593783672194568');
        z.component.footer.clickCenterActionByIcon('pencil');
        
        //funcao para percorrer todos os nmcontela e apagar o campo
        var elementos = element.all(by.name('NMCONFTELA'));
        await elementos.each(function (el) {
            el.isDisplayed().then(function (displayed) {
                if (displayed) {
                    try {
                        el.clear();
                        
                    } catch (err) {
                        console.log(err);
                    }
                }
            })
        });
        //tenta salvar a configuração com o obrigatório vazio
        z.component.footer.clickRightActionByLabel('Salvar');

        //se aparecer a notificação de que o campo é obrigatorio retorna true para o spec
        if(await z.util.elementExists(by.css('div.zh-validation > span'))){
            z.component.footer.clickLeftActionByLabel('Cancelar');
            z.component.footer.clickLeftActionByLabel('Voltar');
            return true;
        }
        //se conseguir salvar com o campo obrigatório vazio retorna false para o spec
        else{
            return false;
        }
    };
};
module.exports = new configTerminal();