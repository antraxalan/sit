

var db = window.openDatabase("strans_db", "1.0", "Sitrans DB", 500000);

        // Query the database
        //
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
            $.mobile.loading("show");
            // alert("querySuccess_enviar_detalle");
            var data_d = '';
            var len = results.rows.length;
            alert(len);
            for (var i = 0; i < len; i++) {
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
            }
            var direccion   =$(".direccion").val();
            var codigo      =localStorage.g_username;
            var password    =localStorage.g_password;
            var info='detalle';
            $.ajax({
                type: 'POST',
                dataType: 'json',
                url: "http://"+direccion+"/sitrans_server/sitrans_insert.php",
                data: "codigo=" + codigo + "&password=" + password + "&info=" + info + "&data=" + data_d,
                success: function (resp) {
                  $.mobile.loading("hide");
                  alert(resp);
              },
              error: function (e) {
                  $.mobile.loading("hide");
                  alert('error enviar'+e.Message);
              }
          });
        }

        function querySuccess_enviar_maestro(tx, results) {
            $.mobile.loading("show");
            var data_m = '';
            var len = results.rows.length;
            alert(len);
            for (var i = 0; i < len; i++) {
               data_m=data_m+results.rows.item(i).TipoDcto+'|';
               data_m=data_m+results.rows.item(i).NroDcto+'|';
               data_m=data_m+results.rows.item(i).Fecha+'|';
               data_m=data_m+results.rows.item(i).FechaVto+'|';
               data_m=data_m+results.rows.item(i).Obs+'|';
               data_m=data_m+results.rows.item(i).CodCliente+'|';
               data_m=data_m+results.rows.item(i).Conteo+'|';
           }
           var direccion   =$(".direccion").val();
           var codigo      =localStorage.g_username;
           var password    =localStorage.g_password;
           var info='maestro';
           $.ajax({
            type: 'POST',
            dataType: 'json',
            url: "http://"+direccion+"/sitrans_server/sitrans_insert.php",
            data: "codigo=" + codigo + "&password=" + password + "&info=" + info + "&data=" + data_m,
            success: function (resp) {
              $.mobile.loading("hide");
              alert(resp);
          },
          error: function (e) {
              $.mobile.loading("hide");
              alert('error enviar'e.Message);
          }
      });
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
        function enviar_detalle() {
        	// alert("cargar_info_enviar_articulo");
            // alert("enviar_detalle");
            db.transaction(successCB_enviar_detalle, errorCB_enviar);
        }
        function enviar_maestro() {
        	// alert("cargar_info_enviar_cliente");
        	db.transaction(successCB_enviar_maestro, errorCB_enviar);
        }
        


