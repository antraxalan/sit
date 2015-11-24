

		var db = window.openDatabase("strans_db", "1.0", "Sitrans DB", 500000);

        // Populate the database
        //

function populateDB_articulo(tx) {
    //----- alert("19");
    tx.executeSql('CREATE TABLE IF NOT EXISTS ARTICULO (CodMarca INTEGER,DesMarca TEXT,CodArt INTEGER,DesArt TEXT,DesArtReducido TEXT,Calibre REAL,TipoArticulo TEXT,CantxEmpaque INTEGER,PrecioCompra REAL,PrecioVtaMin REAL,PrecioVtaMax REAL,CodBotella INTEGER,DesBotella TEXT,PVtaMinBot REAL,CodCaja INTEGER,DesCaja TEXT,PVtaMinCaja REAL,PVtaMaxCaja REAL,Estado TEXT)');
}
function populateDB_cliente(tx) {
    //----- alert("13");
    tx.executeSql('CREATE TABLE IF NOT EXISTS CLIENTE (CodCliente INTEGER,Nombre TEXT,RazonSocial TEXT,Direccion TEXT,Nit TEXT,NroTelefono1 TEXT,NroTelefono2 TEXT,CodZona INTEGER,DesZona TEXT,CodPersonal INTEGER,DesPersonal TEXT,CodRuta TEXT,DesRuta TEXT)');
}
function populateDB_detalle(tx) {
    //----- alert("18");
    tx.executeSql('CREATE TABLE IF NOT EXISTS DETALLE (TipoDcto INTEGER,NroDcto INTEGER,Apu INTEGER,Fecha DATE,FechaVto DATE,TipoDctoM INTEGER,NroDctoM INTEGER,Precio REAL,Tc REAL,CodConcepto INTEGER,CodCliente INTEGER,Debe REAL,Haber REAL,CodArt INTEGER,Dcajas REAL,Hcajas REAL,Dunidades REAL,Hunidades REAL)');
}
        // Query the database
        //
        function queryDB_info_articulo(tx) {
        	tx.executeSql('SELECT * FROM ARTICULO', [], querySuccess_info_articulo, errorCB_info);
        }
        function queryDB_info_cliente(tx) {
        	tx.executeSql('SELECT * FROM CLIENTE', [], querySuccess_info_cliente, errorCB_info);
        }
        function queryDB_info_detalle(tx) {
        	tx.executeSql('SELECT * FROM DETALLE', [], querySuccess_info_detalle, errorCB_info);
        }

        // function searchQueryDB(tx) {
        // 	tx.executeSql("SELECT * FROM DEMO where name like ('%"+ document.getElementById("txtName").value + "%')",
        // 		[], querySuccess, errorCB);
        // }

        // Query the success callback
        //
        function querySuccess_info_articulo(tx, results) {
        	// var tblText='<table id="t01"><tr><th>ID</th> <th>Name</th> <th>Number</th></tr>';
        	var tblContent='<form>';
        	tblContent+='<input id="filterTable-input" data-type="search">';
        	tblContent+='</form>';
        	tblContent+='<table data-role="table"  data-mode="columntoggle" data-filter="true" data-input="#filterTable-input" class="ui-responsive selector_tabla">';
        	tblContent+='<thead>';
        	tblContent+='<tr>';

        	tblContent+='<th data-priority="persist">CodMarca</th>';
        	tblContent+='<th data-priority="2">DesMarca</th>';
        	tblContent+='<th data-priority="3">CodArt</th>';
        	tblContent+='<th data-priority="1">DesArt</th>';
        	tblContent+='</tr>';
        	tblContent+='</thead>';
        	tblContent+='<tbody>';


        	var len = results.rows.length;
        	for (var i = 0; i < len; i++) {

        		tblContent +='<tr><td>'; 

        		tblContent+=results.rows.item(i).CodMarca	+'</td><td>';
        		tblContent+=results.rows.item(i).DesMarca	+'</td><td>';
        		tblContent+=results.rows.item(i).CodArt	 	+'</td><td>';
        		tblContent+=results.rows.item(i).DesArt	 	+'</td></tr>';
        	}
        	tblContent+="</tbody></table>";
        	// document.getElementById("tabla_info").innerHTML =tblContent;
        	$('#tabla_info').html(tblContent);
        	 // $('#tabla_info').append(tblContent);
        	 $("#tabla_info").trigger("create");

        	}

        	function querySuccess_info_cliente(tx, results) {
        	// var tblText='<table id="t01"><tr><th>ID</th> <th>Name</th> <th>Number</th></tr>';
        	var tblContent='<form>';
        	tblContent+='<input id="filterTable-input" data-type="search">';
        	tblContent+='</form>';
        	tblContent+='<table data-role="table"  data-mode="columntoggle" data-filter="true" data-input="#filterTable-input" class="ui-responsive selector_tabla">';
        	tblContent+='<thead>';
        	tblContent+='<tr>';

        	tblContent+='<th data-priority="persist">CodCliente</th>';
        	tblContent+='<th data-priority="2">Nombre</th>';
        	tblContent+='<th data-priority="1">RazonSocial</th>';
        	tblContent+='<th data-priority="3">Direccion</th>';
        	tblContent+='</tr>';
        	tblContent+='</thead>';
        	tblContent+='<tbody>';


        	var len = results.rows.length;
        	for (var i = 0; i < len; i++) {

        		tblContent +='<tr><td>'; 

        		tblContent+=results.rows.item(i).CodCliente		+'</td><td>';
        		tblContent+=results.rows.item(i).Nombre			+'</td><td>';
        		tblContent+=results.rows.item(i).RazonSocial	+'</td><td>';
        		tblContent+=results.rows.item(i).Direccion	 	+'</td></tr>';
        	}
        	tblContent+="</tbody></table>";
        	// document.getElementById("tabla_info").innerHTML =tblContent;
        	$('#tabla_info').html(tblContent);
        	// $('#tabla_info').append(tblContent);
        	$("#tabla_info").trigger("create");
        	}

        	function querySuccess_info_detalle(tx, results) {
        	// var tblText='<table id="t01"><tr><th>ID</th> <th>Name</th> <th>Number</th></tr>';
        	var tblContent='<form>';
        	tblContent+='<input id="filterTable-input" data-type="search">';
        	tblContent+='</form>';
        	tblContent+='<table data-role="table"  data-mode="columntoggle" data-filter="true" data-input="#filterTable-input" class="ui-responsive selector_tabla">';
        	tblContent+='<thead>';
        	tblContent+='<tr>';

        	tblContent+='<th data-priority="persist">CodCliente</th>';
        	tblContent+='<th data-priority="2">Debe</th>';
        	tblContent+='<th data-priority="3">Haber</th>';
            tblContent+='<th data-priority="1">CodArt</th>';
            tblContent+='<th data-priority="1">Fecha</th>';
            tblContent+='<th data-priority="1">FechaVto</th>';
        	tblContent+='<th data-priority="1">Precio</th>';
        	tblContent+='</tr>';
        	tblContent+='</thead>';
        	tblContent+='<tbody>';


        	var len = results.rows.length;
        	for (var i = 0; i < len; i++) {

        		tblContent+='<tr><td>';
        		tblContent+=results.rows.item(i).CodCliente		+'</td><td>';
        		tblContent+=results.rows.item(i).Debe			+'</td><td>';
        		tblContent+=results.rows.item(i).Haber			+'</td><td>';
                tblContent+=results.rows.item(i).CodArt         +'</td></tr>';
                tblContent+=results.rows.item(i).Fecha          +'</td></tr>';
                tblContent+=results.rows.item(i).FechaVto       +'</td></tr>';
        		tblContent+=results.rows.item(i).Precio 	    +'</td></tr>';
        	}
        	tblContent+="</tbody></table>";
        	// document.getElementById("tabla_info").innerHTML =tblContent;
        	$('#tabla_info').html(tblContent);
        	 // $('#tabla_info').append(tblContent);
        	 $("#tabla_info").trigger("create");

        	}





        // Transaction error callback
        //
        function errorCB_info(err) {
        	alert("Error processing SQL4: "+err.code);
        }

        // Transaction success callback
        //
        function successCB_info_articulo() {
        	// alert("successCB_info_articulo");
        	// var db = window.openDatabase("strans_db", "1.0", "Sitrans DB", 500000);
        	db.transaction(queryDB_info_articulo, errorCB_info);
        }
        function successCB_info_cliente() {
        	// alert("successCB_info_cliente");
        	// var db = window.openDatabase("strans_db", "1.0", "Sitrans DB", 500000);
        	db.transaction(queryDB_info_cliente, errorCB_info);
        }
        function successCB_info_detalle() {
        	// alert("successCB_info_detalle");
        	// var db = window.openDatabase("strans_db", "1.0", "Sitrans DB", 500000);
        	db.transaction(queryDB_info_detalle, errorCB_info);
        }

         // Cordova is ready
        //
        function cargar_info_articulo() {
        	// alert("cargar_info_articulo");
        	db.transaction(successCB_info_articulo, errorCB_info);
        }
        function cargar_info_cliente() {
        	// alert("cargar_info_cliente");
        	db.transaction(successCB_info_cliente, errorCB_info);
        }
        function cargar_info_detalle() {
        	// alert("cargar_info_detalle");
        	db.transaction(successCB_info_detalle, errorCB_info);
        }


