//Definindo um Núcleo (UA):

/*
Endereço (região)
	M.Representante
	"parentesco" com outra UA (opcional)
	Lista de Discipulos
*/

function Nucleo(nome, endereco, representante, lista_discipulos, parentesco){
	this.nome = nome;
	this.endereco = endereco;
	this.representante = representante;
	this.lista_discipulos = lista_discipulos;
	this.parentesco = parentesco; //passar um array com tipo de parentesco e nome da UA

	function setEndereco(end)
	{
	this.endereco=end;
	}
}

function Discipulo (nome, endereco, telefone, email, nascimento, escolaridade, pai, mae){
	this.nome = nome;
	this.endereco = endereco;
	this.telefone = telefone;
	this.email = email;
	this.nascimento = nascimento;
	this.escolaridade = escolaridade;
	this.pai = pai;
	this.mae = mae;
}

function Grau( discipulo, evento, grau ){

}

/*Jquery:*/

$(document).ready(function() {

	/*Funções da parte de cadastro de discipulo:*/
	$("#escolaridade").change(function(){
		//alert('opcao selecionada:' + $("#escolaridade option:selected").val());
	
		var opcao = $("#escolaridade option:selected").val();

		if (opcao === 'sup_inc' || opcao === 'sup_comp') { 
			if ($('#div_curso').css('display') === 'none') {
				$('#div_curso').fadeIn(); 
			}
			if ($('#div_esp').css('display') !== 'none') {
				$('#div_esp').fadeOut();
				$('#div_esp').val('');
			}
		} 

		else if(opcao === 'pos_grad' || opcao === 'mestrado' || opcao === 'doutorado' || opcao === 'phd'){
			if ($('#div_curso').css('display') === 'none') {
				$('#div_curso').fadeIn(); 
			}

			if ($('#div_esp').css('display') === 'none') {
				$('#div_esp').fadeIn(); 
			}
		}

		else {

			if ($('#div_curso').css('display') !== 'none') {
				$('#div_curso').fadeOut();
				$('#curso').val('');
			}

			if ($('#div_esp').css('display') !== 'none') {
				$('#div_esp').fadeOut();
				$('#esp').val('');
			}
		}
	});

	$("#transf").change(function(){
		if ($('#ua_transf').css('display') === 'none') {
				$('#ua_transf_input').val('');
				$('#ua_transf').fadeIn(); 
			}else{
				$('#ua_transf_input').val('');
				$('#ua_transf').fadeOut(); 
			}
	});

	/*
	Inicializa Formulário
	*/

	$("#form_ua").submit(
		function(event){
			var data = {};
			$.each($("#form_ua").serializeArray(), function(k,v){ 
				// console.log(k);
				// console.log(v);
				data[v.name] = v.value;
			});

			console.log(data);
			data = $("#form_ua").serializeArray();

			var opts = {
				type: 'POST',
				url:'/app/ua/inserir',
				dataType:'json',
				data: data
			}
			console.log(opts);
			$.ajax(opts);
			event.preventDefault();
		});

	//Listar UAs

	$(document).on("pageinit", "#ua_menu", function(){
		console.log('carregou UA Menu!');
		data = {};
		var opts = {
				type: 'POST',
				url:'/app/ua/listar',
				dataType:'json',
				data: data,
				success: function(res) {
					console.log(res);
					var html_code = "<ul id='lista_nucleos' data-role='listview' data-inset='true'>"
					$.each(res, function(k,v){
						html_code += "<li><b>" + v.nome_ua + "</b> (" + v.cidade_ua + "-" + v.estado_ua + ")</li>";
					});
					html_code += "</ul>";
					// $(html_code).appendTo('#lista_uas').trigger('create');
					$('#lista_uas').append(html_code);
					$('#lista_uas').trigger('create');
				}
			}
			console.log(opts);
			$.ajax(opts);
	});
	
});
