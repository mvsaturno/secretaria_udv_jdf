$(document).ready(function() {
	SecretariaUDV.init();
});

var SecretariaUDV = {

	submitInputs: function(obj, url_dest){
		console.log('Objeto: ');
		console.log(obj);
		var data = {};
		$.each(obj.serializeArray(), function(k,v){
			data[v.name] = v.value;
		});
		console.log(data);
		data = obj.serializeArray();
		var opts = {
			type: 'POST',
			url: url_dest,
			datatype: 'json',
			data: data
		}
		console.log(opts);
		$.ajax(opts);
	},

	editStuff: function(obj) {
		obj.on('click', function(e) {
			console.log("Id selecionado: ");
			console.log(e.currentTarget.id);
			
			var identif = e.currentTarget.id.split('_edit')[0];

			var linha = $("#" + identif);

			console.log(linha);
			console.log('Codigo: ');
			console.log(linha.find('td.codigo').html());

			console.log('País:');
			console.log(linha.find('td.nome').html());

			//Essa função ainda está bem rudimentar, mas ela
			// já consegue capturar os dados da tabela do país e logar no console.
			// Aqui fiquei em dúvida se eu pego esses valores mesmo e populo os 
			// inputs pra serem editados, ou se com esses valores fazemos uma consulta
			// por Ajax pra retornar esse objeto e escrever os valores (código e pais)
			// nos <input>... E depois também, a parte de fazer update no banco não entendi
			// como funciona.
		});
	},

	createPanel: function(id_panel){
		id_panel.panel();
		id_panel.trigger('pagecreate');
		console.log(id_panel.find('[data-role=listview]'));
		id_panel.find('[data-role=listview]').listview();
		
		$('input[data-id=navbtn]').on("click", function () {
			console.log('navbtn clicked');
			id_panel.panel('toggle');
		});
		},

	observeEscolaridadeDiscipulo: function(escolaridade){
		$(escolaridade).change(function(){
		var opcao = $(escolaridade +" option:selected").val();
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
	},

	observeTransfSocio: function(div){
		div.change(function(){
		if ($('#ua_transf').css('display') === 'none') {
				$('#ua_transf_input').val('');
				$('#ua_transf').fadeIn(); 
			}else{
				$('#ua_transf_input').val('');
				$('#ua_transf').fadeOut(); 
			}
	});
	},

	carregouMenu: function(id_menu){
		$(document).on("pageinit", id_menu, function(){
			console.log('carregou main_menu !');
		});
	},

	carregouCountryMenu: function(country_menu){
	$(document).on("pageinit", country_menu, function(){

		//Essa função aqui define praonde vai o form quando o usuário da o submit:
		$(country_menu).find('form').on('submit', function(e){
			e.preventDefault();
			var inserir_pais = $("#form_pais");
			//método submitInputs dentro desse mesmo objeto (primeira função lá em cima):
			this.submitInputs(inserir_pais, '/app/pais/inserir');
		}.bind(this));

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
							html_code += '<tr id="'+ v.uid +'">'
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

					//Precisa definir essa função aqui dentro pq se definir fora ela 
					// vai ser lida antes do Ajax rodar e não vai ter o objeto (li) pra fazer o tracking
					this.editStuff($('.pais_edit'));
				}.bind(this)
			}
			console.log(opts);
			$.ajax(opts);

		}.bind(this));
	},

	carregouUAMenu: function(ua_menu){
	$(document).on("pageinit", ua_menu, function(){

		//Essa função aqui define praonde vai o form quando o usuário da o submit:
		$(ua_menu).find('form').on('submit', function(e){
			e.preventDefault();
			var inserir_ua = $("#form_ua");
			//método submitInputs dentro desse mesmo objeto (primeira função lá em cima):
			this.submitInputs(inserir_ua, '/app/ua/inserir');
		}.bind(this));

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
	}.bind(this));		
	},

	init: function(){
		//Declaração das variáveis
		var id_panel= $('#globalpanel');
		var escolaridade = "#escolaridade";
		var transferencia = $("#transf");
		var id_menu = "#main_menu";
		var country_menu = "#country_menu";
		var ua_menu = "#ua_menu";
		var uf_menu = "#uf_menu";

		//inicialização dos métodos:
		this.carregouMenu(id_menu);
		this.carregouCountryMenu(country_menu);
		this.carregouUAMenu(ua_menu);
		//this.carregouUFMenu(uf_menu);
		this.createPanel(id_panel);
		this.observeEscolaridadeDiscipulo(escolaridade);
		this.observeTransfSocio(transferencia);
		}

};