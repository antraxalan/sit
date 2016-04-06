

var db = window.openDatabase("strans_db", "1.0", "Sitrans DB", 500000);
var data_d = '';
var data_m = '';
var len_d=0;
var len_m=0;
        // Query the database
        //
        function eliminar_tablas() {
            // alert("queryDB_enviar_detalle");
            
        }        
        function queryDB_enviar_detalle(tx) {
            // alert("queryDB_enviar_detalle");
            tx.executeSql('SELECT * FROM DETALLE WHERE Apu<>0', [], querySuccess_enviar_detalle, errorCB_enviar);
        }
        function queryDB_enviar_maestro(tx) {
        	tx.executeSql('SELECT * FROM MAESTRO WHERE Conteo=-1', [], querySuccess_enviar_maestro, errorCB_enviar);
        }


        // function searchQueryDB(tx) {
        // 	tx.executeSql("SELECT * FROM DEMO where name like ('%"+ document.getElementById("txtName").value + "%')",
        // 		[], querySuccess, errorCB);
        // }

        // Query the success callback
        //
        function querySuccess_enviar_detalle(tx, results) {
            // alert("querySuccess_enviar_detalle");
            
            len_d = results.rows.length;
            // alert(len_d);
            if (len_d>0){
                $.mobile.loading("show");
                for (var i = 0; i < len_d; i++) {
                    data_d=data_d+results.rows.item(i).TipoDcto+'|';
                    data_d=data_d+results.rows.item(i).NroDcto+'|';
                    data_d=data_d+results.rows.item(i).Apu+'|';
                    data_d=data_d+results.rows.item(i).Fecha+'|';
                    data_d=data_d+results.rows.item(i).FechaVto+'|';
                    data_d=data_d+results.rows.item(i).TipoDctoM+'|';
                    data_d=data_d+results.rows.item(i).NroDctoM+'|';
                    data_d=data_d+results.rows.item(i).Precio+'|';
                    data_d=data_d+results.rows.item(i).Tc+'|';
                    data_d=data_d+results.rows.item(i).CodConcepto+'|';
                    data_d=data_d+results.rows.item(i).CodCliente+'|';
                    data_d=data_d+results.rows.item(i).Debe+'|';
                    data_d=data_d+results.rows.item(i).Haber+'|';
                    data_d=data_d+results.rows.item(i).CodArt+'|';
                    data_d=data_d+results.rows.item(i).Dcajas+'|';
                    data_d=data_d+results.rows.item(i).Hcajas+'|';
                    data_d=data_d+results.rows.item(i).Dunidades+'|';
                    data_d=data_d+results.rows.item(i).Hunidades+'|';
                    data_d=data_d+results.rows.item(i).NumTransaccion+'|';
                    data_d=data_d+results.rows.item(i).CodClienteVis+'|';
                    data_d=data_d+results.rows.item(i).CodPersonalVis+'|';
                }
              //   var direccion   =$(".direccion").val();
              //   var codigo      =localStorage.g_username;
              //   var password    =localStorage.g_password;
              //   var info='detalle';
              //   $.ajax({
              //       type: 'POST',
              //       dataType: 'json',
              //       url: "http://"+direccion+"/sitrans_server/sitrans_insert.php",
              //       data: "codigo=" + codigo + "&password=" + password + "&info=" + info + "&data=" + data_d,
              //       success: function (resp) {
              //         $.mobile.loading("hide");
              //         alert(resp);
              //     },
              //     error: function (e) {
              //         $.mobile.loading("hide");
              //         alert('error enviar '+e.Message);
              //     }
              // });
}
}

function querySuccess_enviar_maestro(tx, results) {

    var len_m = results.rows.length;
            // alert(len_m);
            if(len_d>0||len_m>0){
                $.mobile.loading("show");
                for (var i = 0; i < len_m; i++) {
                 data_m=data_m+results.rows.item(i).TipoDcto+'|';
                 data_m=data_m+results.rows.item(i).NroDcto+'|';
                 data_m=data_m+results.rows.item(i).Fecha+'|';
                 data_m=data_m+results.rows.item(i).FechaVto+'|';
                 data_m=data_m+results.rows.item(i).Obs+'|';
                 data_m=data_m+results.rows.item(i).CodCliente+'|';
                 data_m=data_m+results.rows.item(i).Conteo+'|';
                 data_m=data_m+results.rows.item(i).NumTransaccion+'|';
                 data_m=data_m+results.rows.item(i).CodClienteVis+'|';
                 data_m=data_m+results.rows.item(i).CodPersonalVis+'|';
             }
             var direccion   =$(".direccion").val();
             var codigo      =localStorage.g_username;
             var password    =localStorage.g_password;
             var info='detalle_maestro';
             $.ajax({
                type: 'POST',
                dataType: 'json',
                url: "http://"+direccion+"/sitrans_server/sitrans_insert.php",
                data: "codigo=" + codigo + "&password=" + password + "&info=" + info + "&data_d=" + data_d + "&data_m=" + data_m,
                success: function (resp) {
                  $.mobile.loading("hide");
                  if(resp=='ok'){
                    eliminar_tablas();
                }
                alert(resp);
            },
            error: function (e) {
              $.mobile.loading("hide");
              alert('Por favor verifique que este conectado correctamente a su red para Cerrar su Ruta. ');
          }
      });
         }else{
            alert("Antes de Cerrar su Ruta debe de registrar alguna transaccion.");
        }
    }







        // Transaction error callback
        //
        function errorCB_enviar(err) {
        	alert("Error processing SQL4: "+err.code);
        }

        // Transaction success callback
        //
        function successCB_enviar_detalle() {
        	// alert("successCB_enviar_detalle");
        	// var db = window.openDatabase("strans_db", "1.0", "Sitrans DB", 500000);
            alert("successCB_enviar_detalle");
            db.transaction(queryDB_enviar_detalle, errorCB_enviar);
        }
        function successCB_enviar_maestro() {
        	// alert("successCB_info_enviar_cliente");
        	// var db = window.openDatabase("strans_db", "1.0", "Sitrans DB", 500000);
        	db.transaction(queryDB_enviar_maestro, errorCB_enviar);
        }

         // Cordova is ready
        //
        function get_detalle() {
        	// alert("cargar_info_enviar_articulo");
            // alert("enviar_detalle");
            db.transaction(successCB_enviar_detalle, errorCB_enviar);
        }
        function get_maestro() {
            // alert("cargar_info_enviar_cliente");
            db.transaction(successCB_enviar_maestro, errorCB_enviar);
        }
        

        function enviar_detalle_maestro() {
        	// alert("cargar_info_enviar_cliente");
        	get_detalle();
            get_maestro();
        }
        


