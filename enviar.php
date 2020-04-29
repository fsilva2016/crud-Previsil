<?php
$host ="https://oauthhm.previsul.com.br/api/cliente/cadastrar"

$nome = $_POST["nome"]
$dtNascimento = $_POST["dtNascimento"] 
$cliente_Enderecos =  $_POST["cliente_Enderecos"]
if {
	// Inserimos no banco de dados
	$query = mysql_query("INSERT INTO  VALUES ('', '".$nome."', '".$dtNascimento."', '".$cliente_Enderecos."')");
	// Se inserido com sucesso
	if ($query) {
		echo false;
	} 
	// Se houver algum erro ao inserir
	else {
		echo "Não foi possível inserir a mensagem no momento.";
	}
}

?>