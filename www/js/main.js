/*Jquery:*/
$(function(){
	console.log('init.js loaded.');
	
	$('#globalpanel').panel();
	$('#globalpanel').trigger('pagecreate');
	console.log($('#globalpanel').find('[data-role=listview]'));
	$('#globalpanel').find('[data-role=listview]').listview();
	
	$('input[data-id=navbtn]').on("click", function () {
		console.log('navbtn clicked');
		$('#globalpanel').panel('toggle');
	});

	/*Funções da parte de cadastro de discipulo:*/
	$("#escolaridade").change(function(){
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
	
	/*
	Países
	*/

	/*Listar Países (passar o ID do HTML a ser gerado e o ID do elemento a ser populado - 'dest' = placeholder): */
	function lista_paises(id, dest){
	console.log('Carregando select de paises');
	data = {};
	var opts = {
			type: 'POST',
			url:'/app/pais/listar',
			dataType:'json',
			data: data,
			success: function(res) {
				console.log(res);
				var html_code = "<select id='"+ id +"' name="+id+">";
				$.each(res, function(k,v){
					html_code += "<option value="+v.uid+">" + v.nome + "</option>";
				});
				html_code += "</select>";
				$(dest).append(html_code);
				$(dest).trigger('create');
			}
		}
		console.log(opts);
		$.ajax(opts);
	}

	 /*Função de editar os países*/


	$("#pais_submit").click(
		function(event){
			var data = {
				'pais_key': $('#pais_key').val(),
				'pais_nome': $('#pais_nome').val()
			};
			console.log(data);

			var opts = {
				type: 'POST',
				url:'/app/pais/inserir',
				dataType:'json',
				data: data
			}
			console.log(opts);
			$.ajax(opts);
		});

	//Listar UAs
});

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
				var html_code = "<ul id='lista_nucleos' data-role='listview' data-inset='true'>";
				$.each(res, function(k,v){
					html_code += "<li><b>" + v.nome_ua + "</b> (" + v.cidade_ua + "-" + v.estado_ua + ")</li>";
				});
				html_code += "</ul>";
				$('#lista_uas').append(html_code);
				$('#lista_uas').trigger('create');
			}
		}
		console.log(opts);
		$.ajax(opts);
});

$(document).on("pageinit", "#country_menu", function(){
	console.log('carregou #country_menu!');
	data = {};
	var opts = {
			type: 'POST',
			url:'/app/pais/listar',
			dataType:'json',
			data: data,
			success: function(res) {
				console.log('/app/pais/listar result:');
				console.log(res);
				var html_code = '';
				html_code += '<li>'
					+ '<table class="ui-table list-item">'
					+ '<tr><td colspan="1"><b>Codigo</b></td><td colspan="1"><b>País</b></td><td colspan="2"></td></tr>';
				$.each(res, function(k,v){
					console.log(k);
					console.log(v);
					if (v.uid != 0) {
						html_code += '<tr>'
						+ '<td class="codigo">'  + v.uid + '</td>'
						+ '<td class="nome">'  + v.nome + '</td>'
						+ '<td>'  + '<button class="ui-btn pais_edit" id="'+v.uid+'_edit" data-type="button" data-inline="true">Editar</button>' + '</td>'
						+ '<td>'  + '<button class="ui-btn pais_delete" id="'+v.uid+'_delete" data-type="button" data-inline="true">Deletar</button>' + '</td>'
						+ '</tr>';
					}
				});
				html_code += '</table></li>';
				$('#country_list').append(html_code);
				$('#country_list').trigger('create');
			}
		}
		console.log(opts);
		$.ajax(opts);
});

$(document).on("pageinit", "#uf_menu", function(){
	console.log('carregou #uf_menu!');
	data = {};
	var opts = {
			type: 'POST',
			url:'/app/uf/listar',
			dataType:'json',
			data: data,
			success: function(res) {uf/listar result:');
				console.log(res);
				var html_code = '';
				html_code += '<li>'
					+ '<table class="ui-table list-item">'
					+ '<tr><td colspan="1"><b>Sigla</b></td><td colspan="1"><b>Estado</b></td><td colspan="2"></td></tr>';
				$.each(res, function(k,v){
					console.log(k);
					console.log(v);
					if (v.uid != 0) {
						html_code += '<tr>'
						+ '<td class="codigo">'  + v.uid + '</td>'
						+ '<td class="nome">'  + v.nome + '</td>'
						+ '<td>'  + '<button class="ui-btn pais_edit" id="'+v.uid+'_edit" data-type="button" data-inline="true">Editar</button>' + '</td>'
						+ '<td>'  + '<button class="ui-btn pais_delete" id="'+v.uid+'_delete" data-type="button" data-inline="true">Deletar</button>' + '</td>'
						+ '</tr>';
					}
				});
				html_code += '</table></li>';
				$('#uf_list').append(html_code);
				$('#uf_list').trigger('create');
			}
		}
		console.log(opts);
		$.ajax(opts);
});

$(document).on("pageinit", "#main_menu", function(){
	console.log('carregou main_menu !');
});