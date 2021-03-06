$(document).ready(function () {
    $('.cep').mask('00000-000');
    $(".data").mask("9999-99-99");

});
$(".btn-default").click(function () {
    $('#modalEditar').css('display', 'none');
})
// cadstro
$('.cadastro').click(function () {
    var nome = $("input[name=nome]").val();
    var dT_NASCIMENTO = $('input[name=data]').val();
    var end = $("input[name=end]").val();
    var cep = $("input[name=cep]").mask("00000000").val();
    var uf = $("input[name=uf]").val();
    var cidade = $("input[name=cidade]").val();
    var bairro = $("input[name=bairro]").val();

    var cadastro = JSON.stringify({
        nome: nome,
        dT_NASCIMENTO: dT_NASCIMENTO,
        "status": 1,
        "DAT_INCLUSAO": "2019-10-18",
        "cliente_enderecos": [{
            LOGRADOURO: end,
            CEP: cep,
            UF: uf,
            CIDADE: cidade,
            BAIRRO: bairro,
            "STATUS": 1,
            "DAT_INCLUSAO": "2019-10-18"
        }]
    });
    $.ajax({
        url: "https://oauthhm.previsul.com.br/api/cliente/cadastrar",
        type: "post",
        data: cadastro,
        contentType: "application/json",
        async: false,
        cache: false,
        success: function (response) {
            alert("Cadastro efetuado com sucesso")
        },
        error: function (error) {
            alert("Não foi possivel fazer seu cadastro ")
        }
    });
});
// LISTA CADASTRO
var listar = 'https://oauthhm.previsul.com.br/api/cliente/obter-todos';
$('.list').click(function () {
    $.getJSON(listar, function (obj) {
        console.log(obj);
        var valores = '';
        $.each(obj, function (key, value) {
            valores += "<tr>";
            valores += "<td data-id=' " + value.id + "'>" + value.id + "</td>";
            valores += "<td>" + value.nome + "</td>";
            valores += "<td class='data'>" + value.dT_NASCIMENTO + "</td>";
            valores += "<td>" + value.cliente_Enderecos[0].logradouro + "</td>";
            valores += "<td>" + value.cliente_Enderecos[0].uf + "</td>";
            valores += "<td>" + value.cliente_Enderecos[0].cidade + "</td>";
            valores += "<td>" + value.cliente_Enderecos[0].bairro + "</td>";
            valores += "<td class='cep'>" + value.cliente_Enderecos[0].cep + "</td>";


            valores += "<td>  <button class='alt' title='Alterar' data-id=' " + value.id + "' onClick='altCadastro(this)' >ALT </button>  <button class='del' title='excluir' data-id=' " + value.id + "'  onClick='deletar(this)'>DEL </button></td>";
            valores += "</tr>";
            $("#tabela tbody").html(valores);
            $(".data").mask("9999-99-99");
        });
    });
});

// ALTERAR O CADASTRO
function altCadastro(alt) {
    let id = $(alt).data("id");
    console.log(id);
    let idend = " ";
    $.ajax({
        url: "https://oauthhm.previsul.com.br/api/cliente/obter-id/" + id,
        type: "get",
        contentType: "application/json",
        async: false,
        cache: false,
        success: function (dados) {
            if (dados.status) {
                $('#alterar_cliente_id').val(id);
                $('#alterar_nome').val(dados.nome);
                $('#alterar_data').val(dados.dT_NASCIMENTO);
                idend += dados.cliente_Enderecos[0].id;
                $('#alterar_end').val(dados.cliente_Enderecos[0].logradouro);
                $('#alterar_uf').val(dados.cliente_Enderecos[0].uf);
                $('#alterar_cidade').val(dados.cliente_Enderecos[0].cidade);
                $('#alterar_bairro').val(dados.cliente_Enderecos[0].bairro);
                $('#alterar_cep').val(dados.cliente_Enderecos[0].cep);


                $('#modalEditar').css('display', 'block');
                $('#modalEditar').css('opacity', '1');
            }
        },
        error: function (error) {
            alert("Erro ao localizar  seu cadastro ")
        }

    });

    $('#confEditar').click(function () {

        let altid = $('#alterar_cliente_id').val();
        let altnome = $('#alterar_nome').val();
        let altdata = $('#alterar_data').val();
        let altend = $('#alterar_end').val();
        let altcidade = $('#alterar_cidade').val();
        let altbairro = $('#alterar_bairro').val();
        let altcep = $('#alterar_cep').mask("00000000").val();
        let altuf = $('#alterar_uf').val();
        var alterarcao = JSON.stringify({
            id: altid,
            nome: altnome,
            dT_NASCIMENTO: altdata,
            "status": 1,
            "DAT_INCLUSAO": "2019-10-18",
            "cliente_enderecos": [{
                id: idend,
                iD_CLIENTE: altid,
                LOGRADOURO: altend,
                CEP: altcep,
                UF: altuf,
                CIDADE: altcidade,
                BAIRRO: altbairro,
                "STATUS": 1,
                "DAT_INCLUSAO": "2019-10-18"
            }]
        });
        $.ajax({
            url: "https://oauthhm.previsul.com.br/api/cliente/atualizar",
            type: "put",
            data: alterarcao,
            contentType: "application/json",
            async: false,
            cache: false,
            success: function (response) {
                alert("cadastro ALTERADO com sucesso ");
                $('.list').click();
                $('#modalEditar').css('display', 'none');
                $('#modalEditar').css('opacity', '0');
            },
            error: function (error) {
                alert("Erro ao alterar seu cadastro ")
            }
        });
    });
};

// DELETE
function deletar(del) {
    let id = $(del).data("id");
    let confirmacao = confirm("Confirmar a exclusao do seu cadastro ");
    if (confirmacao === true) {
        $.ajax({
            url: "https://oauthhm.previsul.com.br/api/cliente/excluir?id=" + id,
            type: "delete",
            contentType: "application/json",
            async: false,
            cache: false,
            success: function (response) {
                alert("Cadastro  excluido com sucesso ");
                $('.list').click();
            },
            error: function (error) {
                alert("Erro ao excluir  seu cadastro ")
            }
        });
    } else {
    }

}






function pesqID() {
    let id = $('#idUsuario').val();
    // let confirmacao = confirm("Confirmar a exclusao do seu cadastro ");
    console.log(id);
    let idend = " ";
    $.ajax({
        url: "https://oauthhm.previsul.com.br/api/cliente/obter-id/" + id,
        type: "get",
        contentType: "application/json",
        async: false,
        cache: false,
        success: function (dados) {
            if (dados.status) {

                $('#alterar_cliente_id').val(id);
                $('#alterar_nome').val(dados.nome);
                $('#alterar_data').val(dados.dT_NASCIMENTO).mask(0000 / 00 / 00);
                idend += dados.cliente_Enderecos[0].id;
                $('#alterar_end').val(dados.cliente_Enderecos[0].logradouro);
                $('#alterar_uf').val(dados.cliente_Enderecos[0].uf);
                $('#alterar_cidade').val(dados.cliente_Enderecos[0].cidade);
                $('#alterar_bairro').val(dados.cliente_Enderecos[0].bairro);
                $('#alterar_cep').val(dados.cliente_Enderecos[0].cep);


                $('#modalEditar').css('display', 'block');
                $('#modalEditar').css('opacity', '1');
            }
        },
        error: function (error) {
            alert("Erro ao Localizar seu Cadastro ")
        }

    });

    $('#confEditar').click(function () {

        let altid = $('#alterar_cliente_id').val();
        let altnome = $('#alterar_nome').val();
        let altdata = $('#alterar_data').val();
        let altend = $('#alterar_end').val();
        let altcidade = $('#alterar_cidade').val();
        let altbairro = $('#alterar_bairro').val();
        let altcep = $('#alterar_cep').val();
        let altuf = $('#alterar_uf').val();
        var alterarcao = JSON.stringify({
            id: altid,
            nome: altnome,
            dT_NASCIMENTO: altdata,
            "status": 1,
            "DAT_INCLUSAO": "2019-10-18",
            "cliente_enderecos": [{
                id: idend,
                iD_CLIENTE: altid,
                LOGRADOURO: altend,
                CEP: altcep,
                UF: altuf,
                CIDADE: altcidade,
                BAIRRO: altbairro,
                "STATUS": 1,
                "DAT_INCLUSAO": "2019-10-18"
            }]
        });
        $.ajax({
            url: "https://oauthhm.previsul.com.br/api/cliente/atualizar",
            type: "put",
            data: alterarcao,
            contentType: "application/json",
            async: false,
            cache: false,
            success: function (response) {
                alert("cadastro ALTERADO com sucesso ");
                $('.list').click();
                $('#modalEditar').css('display', 'none');
                $('#modalEditar').css('opacity', '0');
            },
            error: function (error) {
                alert("Erro ao alterar  seu cadastro ")
            }
        });
    });
};
