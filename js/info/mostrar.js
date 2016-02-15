

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
            tx.executeSql('SELECT * FROM DETALLE ORDER BY TipoDcto DESC', [], querySuccess_info_detalle, errorCB_info);
        }
        function queryDB_info_maestro(tx) {
            tx.executeSql('SELECT TipoDcto,NroDcto,Fecha,FechaVto,Obs,CodCliente,Conteo FROM MAESTRO ORDER BY TipoDcto DESC', [], querySuccess_info_maestro, errorCB_info);
        }
        function queryDB_info_transaccion(tx) {
            tx.executeSql('SELECT TipoDcto,NroDcto,Apu,Fecha,FechaVto,TipoDctoM,NroDctoM,Precio,Tc,CodConcepto,CodCliente,Debe,Haber,CodArt,Dcajas,Hcajas,Dunidades,Hunidades FROM DETALLE where TipoDcto>0', [], querySuccess_info_transaccion, errorCB_info);
        }
        function queryDB_info_query(tx) {
            var query = $('.query').val();
            alert(query);
            tx.executeSql(query, [], querySuccess_info_query, errorCB_info);
        }
        function queryDB_info_borrar_transaccion(tx) {
        	tx.executeSql('DELETE from DETALLE where TipoDcto>0', [], querySuccess_info_borrar_transaccion, errorCB_info);
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
            // tblContent+='<th data-priority="2">Debe</th>';
            // tblContent+='<th data-priority="3">Haber</th>';
         //    tblContent+='<th data-priority="1">CodArt</th>';
            tblContent+='<th data-priority="1">Fecha</th>';
            // tblContent+='<th data-priority="1">FechaVto</th>';
            // tblContent+='<th data-priority="1">Precio</th>';
            tblContent+='</tr>';
            tblContent+='</thead>';
            tblContent+='<tbody>';


            var len = results.rows.length;
            for (var i = 0; i < len; i++) {

                tblContent+='<tr><td>';
                tblContent+=results.rows.item(i).CodCliente     +'</td><td>';
                // tblContent+=results.rows.item(i).Debe            +'</td><td>';
                // tblContent+=results.rows.item(i).Haber           +'</td><td>';
          //       tblContent+=results.rows.item(i).CodArt         +'</td></tr>';
                tblContent+=results.rows.item(i).Fecha          +'</td></tr>';
                // tblContent+=results.rows.item(i).FechaVto       +'</td></tr>';
                // tblContent+=results.rows.item(i).Precio      +'</td></tr>';
            }
            tblContent+="</tbody></table>";
            // document.getElementById("tabla_info").innerHTML =tblContent;
            $('#tabla_info').html(tblContent);
             // $('#tabla_info').append(tblContent);
             $("#tabla_info").trigger("create");

            }
            function querySuccess_info_maestro(tx, results) {
            // var tblText='<table id="t01"><tr><th>ID</th> <th>Name</th> <th>Number</th></tr>';
            var tblContent='<form>';
            tblContent+='<input id="filterTable-input" data-type="search">';
            tblContent+='</form>';
            tblContent+='<table data-role="table"  data-mode="columntoggle" data-filter="true" data-input="#filterTable-input" class="ui-responsive selector_tabla">';
            tblContent+='<thead>';
            tblContent+='<tr>';
                tblContent+='<th> TipoDcto </th>';
                tblContent+='<th> NroDcto </th>';
                tblContent+='<th> Fecha </th>';
                tblContent+='<th> FechaVto </th>';
                tblContent+='<th> Obs </th>';
                tblContent+='<th> CodCliente </th>';
                tblContent+='<th> Conteo </th>';
            tblContent+='</tr>';
            tblContent+='</thead>';
            tblContent+='<tbody>';


            var len = results.rows.length;
            for (var i = 0; i < len; i++) {

                tblContent+='<tr><td>';
                tblContent+=results.rows.item(i).TipoDcto   +'</td><td>';
                tblContent+=results.rows.item(i).NroDcto    +'</td><td>';
                tblContent+=results.rows.item(i).Fecha      +'</td><td>';
                tblContent+=results.rows.item(i).FechaVto   +'</td><td>';
                tblContent+=results.rows.item(i).Obs        +'</td><td>';
                tblContent+=results.rows.item(i).CodCliente +'</td><td>';
                tblContent+=results.rows.item(i).Conteo     +'</td></tr>';
            }
            tblContent+="</tbody></table>";
            // document.getElementById("tabla_info").innerHTML =tblContent;
            $('#tabla_info').html(tblContent);
             // $('#tabla_info').append(tblContent);
             $("#tabla_info").trigger("create");

            }



            function querySuccess_info_transaccion(tx, results) {
            // var tblText='<table id="t01"><tr><th>ID</th> <th>Name</th> <th>Number</th></tr>';
            var tblContent='<form>';
            tblContent+='<input id="filterTable-input" data-type="search">';
            tblContent+='</form>';
            tblContent+='<table data-role="table"  data-mode="columntoggle" data-filter="true" data-input="#filterTable-input" class="ui-responsive selector_tabla">';
            tblContent+='<thead>';
            tblContent+='<tr>';

                tblContent+='<th data-priority="persist">TipoDcto</th>';
                tblContent+='<th data-priority="2">NroDcto</th>';
                tblContent+='<th data-priority="3">Apu</th>';
                tblContent+='<th data-priority="4">Fecha</th>';
                tblContent+='<th data-priority="5">FechaVto</th>';
                tblContent+='<th data-priority="6">TipoDctoM</th>';
                tblContent+='<th data-priority="7">NroDctoM</th>';
                tblContent+='<th data-priority="8">Precio</th>';
                tblContent+='<th data-priority="9">Tc</th>';
                tblContent+='<th data-priority="10">CodConcepto</th>';
                tblContent+='<th data-priority="11">CodCliente</th>';
                tblContent+='<th data-priority="12">Debe</th>';
                tblContent+='<th data-priority="13">Haber</th>';
                tblContent+='<th data-priority="14">CodArt</th>';
                tblContent+='<th data-priority="15">Dcajas</th>';
                tblContent+='<th data-priority="16">Hcajas</th>';
                tblContent+='<th data-priority="17">Dunidades</th>';
                tblContent+='<th data-priority="18">Hunidades</th>';

            tblContent+='</tr>';
            tblContent+='</thead>';
            tblContent+='<tbody>';


            var len = results.rows.length;
            for (var i = 0; i < len; i++) {

                tblContent+='<tr><td>';
                tblContent+=results.rows.item(i).TipoDcto       +'</td><td>';
                tblContent+=results.rows.item(i).NroDcto        +'</td><td>';
                tblContent+=results.rows.item(i).Apu            +'</td><td>';
                tblContent+=results.rows.item(i).Fecha          +'</td><td>';
                tblContent+=results.rows.item(i).FechaVto       +'</td><td>';
                tblContent+=results.rows.item(i).TipoDctoM      +'</td><td>';
                tblContent+=results.rows.item(i).NroDctoM       +'</td><td>';
                tblContent+=results.rows.item(i).Precio         +'</td><td>';
                tblContent+=results.rows.item(i).Tc             +'</td><td>';
                tblContent+=results.rows.item(i).CodConcepto    +'</td><td>';
                tblContent+=results.rows.item(i).CodCliente     +'</td><td>';
                tblContent+=results.rows.item(i).Debe           +'</td><td>';
                tblContent+=results.rows.item(i).Haber          +'</td><td>';
                tblContent+=results.rows.item(i).CodArt         +'</td><td>';
                tblContent+=results.rows.item(i).Dcajas         +'</td><td>';
                tblContent+=results.rows.item(i).Hcajas         +'</td><td>';
                tblContent+=results.rows.item(i).Dunidades      +'</td><td>';
                tblContent+=results.rows.item(i).Hunidades      +'</td></tr>';



                // tblContent+=results.rows.item(i).CodCliente      +'</td><td>';
                // tblContent+=results.rows.item(i).Debe            +'</td><td>';
                // tblContent+=results.rows.item(i).Haber           +'</td><td>';
          //       tblContent+=results.rows.item(i).CodArt         +'</td></tr>';
                // tblContent+=results.rows.item(i).Fecha          +'</td></tr>';
                // tblContent+=results.rows.item(i).FechaVto       +'</td></tr>';
                // tblContent+=results.rows.item(i).Precio      +'</td></tr>';
            }
            tblContent+='<tr>';

                tblContent+='<td>TipoDcto</td>';
                tblContent+='<td>NroDcto</td>';
                tblContent+='<td>Apu</td>';
                tblContent+='<td>Fecha</td>';
                tblContent+='<td>FechaVto</td>';
                tblContent+='<td>TipoDctoM</td>';
                tblContent+='<td>NroDctoM</td>';
                tblContent+='<td>Precio</td>';
                tblContent+='<td>Tc</td>';
                tblContent+='<td>CodConcepto</td>';
                tblContent+='<td>CodCliente</td>';
                tblContent+='<td>Debe</td>';
                tblContent+='<td>Haber</td>';
                tblContent+='<td>CodArt</td>';
                tblContent+='<td>Dcajas</td>';
                tblContent+='<td>Hcajas</td>';
                tblContent+='<td>Dunidades</td>';
                tblContent+='<td>Hunidades</td>';

            tblContent+='</tr>';


            tblContent+="</tbody></table>";
            // document.getElementById("tabla_info").innerHTML =tblContent;
            $('#tabla_info').html(tblContent);
             // $('#tabla_info').append(tblContent);
             $("#tabla_info").trigger("create");

            }

            function querySuccess_info_query(tx, results) {
            // var tblText='<table id="t01"><tr><th>ID</th> <th>Name</th> <th>Number</th></tr>';
            var tblContent='<form>';
            tblContent+='<input id="filterTable-input" data-type="search">';
            tblContent+='</form>';
            tblContent+='<table data-role="table"  data-mode="columntoggle" data-filter="true" data-input="#filterTable-input" class="ui-responsive selector_tabla">';
            tblContent+='<thead>';
            tblContent+='<tr>';

                tblContent+='<th data-priority="persist">TipoDcto</th>';
                tblContent+='<th data-priority="2">NroDcto</th>';
                tblContent+='<th data-priority="3">Apu</th>';
                tblContent+='<th data-priority="4">Fecha</th>';
                tblContent+='<th data-priority="5">FechaVto</th>';
                tblContent+='<th data-priority="6">TipoDctoM</th>';
                tblContent+='<th data-priority="7">NroDctoM</th>';
                tblContent+='<th data-priority="8">Precio</th>';
                tblContent+='<th data-priority="9">Tc</th>';
                tblContent+='<th data-priority="10">CodConcepto</th>';
                tblContent+='<th data-priority="11">CodCliente</th>';
                tblContent+='<th data-priority="12">Debe</th>';
                tblContent+='<th data-priority="13">Haber</th>';
                tblContent+='<th data-priority="14">CodArt</th>';
                tblContent+='<th data-priority="15">Dcajas</th>';
                tblContent+='<th data-priority="16">Hcajas</th>';
                tblContent+='<th data-priority="17">Dunidades</th>';
                tblContent+='<th data-priority="18">Hunidades</th>';

            tblContent+='</tr>';
            tblContent+='</thead>';
            tblContent+='<tbody>';


            var len = results.rows.length;
            for (var i = 0; i < len; i++) {

                tblContent+='<tr><td>';
                tblContent+=results.rows.item(i).TipoDcto       +'</td><td>';
                tblContent+=results.rows.item(i).NroDcto        +'</td><td>';
                tblContent+=results.rows.item(i).Apu            +'</td><td>';
                tblContent+=results.rows.item(i).Fecha          +'</td><td>';
                tblContent+=results.rows.item(i).FechaVto       +'</td><td>';
                tblContent+=results.rows.item(i).TipoDctoM      +'</td><td>';
                tblContent+=results.rows.item(i).NroDctoM       +'</td><td>';
                tblContent+=results.rows.item(i).Precio         +'</td><td>';
                tblContent+=results.rows.item(i).Tc             +'</td><td>';
                tblContent+=results.rows.item(i).CodConcepto    +'</td><td>';
                tblContent+=results.rows.item(i).CodCliente     +'</td><td>';
                tblContent+=results.rows.item(i).Debe           +'</td><td>';
                tblContent+=results.rows.item(i).Haber          +'</td><td>';
                tblContent+=results.rows.item(i).CodArt         +'</td><td>';
                tblContent+=results.rows.item(i).Dcajas         +'</td><td>';
                tblContent+=results.rows.item(i).Hcajas         +'</td><td>';
                tblContent+=results.rows.item(i).Dunidades      +'</td><td>';
                tblContent+=results.rows.item(i).Hunidades      +'</td></tr>';



                // tblContent+=results.rows.item(i).CodCliente      +'</td><td>';
                // tblContent+=results.rows.item(i).Debe            +'</td><td>';
                // tblContent+=results.rows.item(i).Haber           +'</td><td>';
          //       tblContent+=results.rows.item(i).CodArt         +'</td></tr>';
                // tblContent+=results.rows.item(i).Fecha          +'</td></tr>';
                // tblContent+=results.rows.item(i).FechaVto       +'</td></tr>';
                // tblContent+=results.rows.item(i).Precio      +'</td></tr>';
            }
            tblContent+='<tr>';

                tblContent+='<td>TipoDcto</td>';
                tblContent+='<td>NroDcto</td>';
                tblContent+='<td>Apu</td>';
                tblContent+='<td>Fecha</td>';
                tblContent+='<td>FechaVto</td>';
                tblContent+='<td>TipoDctoM</td>';
                tblContent+='<td>NroDctoM</td>';
                tblContent+='<td>Precio</td>';
                tblContent+='<td>Tc</td>';
                tblContent+='<td>CodConcepto</td>';
                tblContent+='<td>CodCliente</td>';
                tblContent+='<td>Debe</td>';
                tblContent+='<td>Haber</td>';
                tblContent+='<td>CodArt</td>';
                tblContent+='<td>Dcajas</td>';
                tblContent+='<td>Hcajas</td>';
                tblContent+='<td>Dunidades</td>';
                tblContent+='<td>Hunidades</td>';

            tblContent+='</tr>';


            tblContent+="</tbody></table>";
            // document.getElementById("tabla_info").innerHTML =tblContent;
            $('#tabla_info').html(tblContent);
             // $('#tabla_info').append(tblContent);
             $("#tabla_info").trigger("create");

            }







        	function querySuccess_info_borrar_transaccion(tx, results) {
        	alert("eliminado");

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
        function successCB_info_maestro() {
            // alert("successCB_info_detalle");
            // var db = window.openDatabase("strans_db", "1.0", "Sitrans DB", 500000);
            db.transaction(queryDB_info_maestro, errorCB_info);
        }
        function successCB_info_transaccion() {
            // alert("successCB_info_detalle");
            // var db = window.openDatabase("strans_db", "1.0", "Sitrans DB", 500000);
            db.transaction(queryDB_info_transaccion, errorCB_info);
        }
        function successCB_info_query() {
            // alert("successCB_info_detalle");
            // var db = window.openDatabase("strans_db", "1.0", "Sitrans DB", 500000);
            db.transaction(queryDB_info_query, errorCB_info);
        }
        function successCB_info_borrar_transaccion() {
        	// alert("successCB_info_detalle");
        	// var db = window.openDatabase("strans_db", "1.0", "Sitrans DB", 500000);
        	db.transaction(queryDB_info_borrar_transaccion, errorCB_info);
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
        function cargar_info_maestro() {
            // alert("cargar_info_detalle");
            db.transaction(successCB_info_maestro, errorCB_info);
        }

        function cargar_info_transaccion() {
            // alert("cargar_info_transaccion");
            db.transaction(successCB_info_transaccion, errorCB_info);
        }
        function cargar_info_query() {
            // alert("successCB_info_query");
            db.transaction(successCB_info_query, errorCB_info);
        }
        function borrar_info_transaccion() {
        	// alert("cargar_info_transaccion");
        	db.transaction(successCB_info_borrar_transaccion, errorCB_info);
        }


