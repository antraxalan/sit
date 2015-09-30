

		var db = window.openDatabase("strans_db", "1.0", "Sitrans DB", 500000);
		var currentRow;
        // Populate the database
        //
        function populateDB_info(tx) {
        	tx.executeSql('CREATE TABLE IF NOT EXISTS ARTICULO (IdArticulo INTEGER PRIMARY KEY AUTOINCREMENT,CodMarca,DesMarca,CodArt,DesArt,DesArtReducido,Calibre,TipoArticulo,CantxEmpaque,PrecioCompra,PrecioVtaMin,PrecioVtaMax,CodBotella,DesBotella,PVtaMinBot,CodCaja,DesCaja,PVtaMinCaja,PVtaMaxCaja,Estado)');
        }

        // Query the database
        //
        function queryDB_info(tx) {
        	tx.executeSql('SELECT * FROM ARTICULO', [], querySuccess_info, errorCB_info);
        }

        // function searchQueryDB(tx) {
        // 	tx.executeSql("SELECT * FROM DEMO where name like ('%"+ document.getElementById("txtName").value + "%')",
        // 		[], querySuccess, errorCB);
        // }

        // Query the success callback
        //
        function querySuccess_info(tx, results) {
        	// var tblText='<table id="t01"><tr><th>ID</th> <th>Name</th> <th>Number</th></tr>';
        	var tblContent='<form>';
			tblContent+='<input id="filterTable-input" data-type="search">';
			tblContent+='</form>';
			tblContent+='<table data-role="table" id="movie-table" data-mode="columntoggle" data-filter="true" data-input="#filterTable-input" class="ui-responsive">';
			tblContent+='<thead>';
			tblContent+='<tr>';
			tblContent+='<th data-priority="1">IdArticulo</th>';
			tblContent+='<th data-priority="persist">CodMarca</th>';
			tblContent+='<th data-priority="2">DesMarca</th>';
			tblContent+='<th data-priority="3">CodArt</th>';
			tblContent+='<th data-priority="4">DesArt</th>';
			tblContent+='</tr>';
			tblContent+='</thead>';
			tblContent+='<tbody>';


        	var len = results.rows.length;
        	for (var i = 0; i < len; i++) {

        		tblContent +='<tr><td>'; 
        		tblContent+=results.rows.item(i).IdArticulo	+'</td><td>'
        		tblContent+=results.rows.item(i).CodMarca	+'</td><td>'
        		tblContent+=results.rows.item(i).DesMarca	+'</td><td>'
        		tblContent+=results.rows.item(i).CodArt	 	+'</td><td>'
        		tblContent+=results.rows.item(i).DesArt	 	+'</td></tr>';
        	}
        	tblContent+="</tbody></table>";
        	document.getElementById("tabla_info").innerHTML =tblContent;
        	// $('#tabla_info').html(tblContent);
        	 // $('#tabla_info').append(tblContent);
        	$("#tabla_info").trigger("create");
        }

        

        // Transaction error callback
        //
        function errorCB_info(err) {
        	alert("Error processing SQL: "+err.code);
        }

        // Transaction success callback
        //
        function successCB_info() {
        	// alert("successCB_info");
        	// var db = window.openDatabase("strans_db", "1.0", "Sitrans DB", 500000);
        	db.transaction(queryDB_info, errorCB_info);
        }

         // Cordova is ready
        //
        function cargar_info() {
        	// alert("cargar_info");
        	
        	db.transaction(populateDB_info, errorCB_info, successCB_info);
        }

     
