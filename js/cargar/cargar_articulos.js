var db = window.openDatabase("strans_db", "1.0", "Sitrans DB", 500000);
var data_db_articulo;
var data_db_cliente;
var data_db_detalle;
var data_db_maestro;
var codigo_ruta;
var id_transp=localStorage.g_username;

function subir_db_articulo() {

  var direccion= $(".direccion").val();
  // var var1= $(".var1").val();

  // var codigo= $("#cod_usuario").val();
  // var password= $("#pass_usuario").val();
  var codigo      =localStorage.g_username;
  var password    =localStorage.g_password;
  var info='articulo';
 // alert("in subir_db_articulo."+direccion+"---"+var1);
 $.ajax({
  type: 'POST',
  dataType: 'json',
  url: "http://"+direccion+"/sitrans_server/sitrans.php",
  data: "codigo=" + codigo + "&password=" + password + "&info=" + info,
  success: function (resp) {
        //----- alert("success:"+resp);
        db.transaction(populateDB_articulo, errorCB_cargar);
        call_insert_db_articulo(resp);
        // $.mobile.loading("hide");
      },
      error: function (e) {
        $.mobile.loading("hide");
        alert('Por favor verifique que este conectado correctamente a su red para realizar la carga.');
      //----- alert("No se encuentra conectado a su red: "+e.message+" err code: "+e.code+ "e:"+e);
    }
  });
  // codigo_usuario=user;
  // password_usuario=pass;
  // var dbShell = window.openDatabase(database_name, database_version, database_displayname, database_size);
  // db.transaction(insertDB, errorCB);
};
function subir_db_cliente() {
  var direccion= $(".direccion").val();
  var codigo      =localStorage.g_username;
  var password    =localStorage.g_password;
  var info='cliente';
  $.ajax({
    type: 'POST',
    dataType: 'json',
    url: "http://"+direccion+"/sitrans_server/sitrans.php",
    data: "codigo=" + codigo + "&password=" + password + "&info=" + info + "&codigo_ruta=" + codigo_ruta,
    success: function (resp) {
      db.transaction(populateDB_cliente, errorCB_cargar);
      call_insert_db_cliente(resp);
    },
    error: function (e) {
      $.mobile.loading("hide");
      alert('Por favor verifique que este conectado correctamente a su red para realizar la carga.');
    }
  });

};
function subir_db_detalle() {
  var direccion= $(".direccion").val();
  var codigo      =localStorage.g_username;
  var password    =localStorage.g_password;
  var info='detalle';
  $.ajax({
    type: 'POST',
    dataType: 'json',
    url: "http://"+direccion+"/sitrans_server/sitrans.php",
    data: "codigo=" + codigo + "&password=" + password + "&info=" + info,
    success: function (resp) {
      db.transaction(populateDB_detalle, errorCB_cargar);
      call_insert_db_detalle(resp);
    },
    error: function (e) {
      $.mobile.loading("hide");
      alert('Por favor verifique que este conectado correctamente a su red para realizar la carga.');
    }
  });
};
function subir_db_maestro() {
  var direccion= $(".direccion").val();
  var codigo      =localStorage.g_username;
  var password    =localStorage.g_password;
  var info='maestro';
  $.ajax({
    type: 'POST',
    dataType: 'json',
    url: "http://"+direccion+"/sitrans_server/sitrans.php",
    data: "codigo=" + codigo + "&password=" + password + "&info=" + info,
    success: function (resp) {
      db.transaction(populateDB_maestro, errorCB_cargar);
      call_insert_db_maestro(resp);
    },
    error: function (e) {
      $.mobile.loading("hide");
      alert('Por favor verifique que este conectado correctamente a su red para realizar la carga.');
    }
  });
};
function populateDB_articulo(tx) {
    //----- alert("19");
    tx.executeSql('DROP TABLE IF EXISTS ARTICULO');
    tx.executeSql('CREATE TABLE IF NOT EXISTS ARTICULO (CodMarca INTEGER,DesMarca TEXT,CodArt INTEGER,DesArt TEXT,DesArtReducido TEXT,Calibre REAL,TipoArticulo TEXT,CantxEmpaque INTEGER,PrecioCompra REAL,PrecioVtaMin REAL,PrecioVtaMax REAL,CodBotella INTEGER,DesBotella TEXT,PVtaMinBot REAL,CodCaja INTEGER,DesCaja TEXT,PVtaMinCaja REAL,PVtaMaxCaja REAL,Estado TEXT)');
  }
  function populateDB_cliente(tx) {
    //----- alert("13");
    tx.executeSql('DROP TABLE IF EXISTS CLIENTE');
    tx.executeSql('CREATE TABLE IF NOT EXISTS CLIENTE (CodCliente INTEGER,Nombre TEXT,RazonSocial TEXT,Direccion TEXT,Nit TEXT,NroTelefono1 TEXT,NroTelefono2 TEXT,CodZona INTEGER,DesZona TEXT,CodPersonal INTEGER,DesPersonal TEXT,CodRuta TEXT,DesRuta TEXT)');
  }
  function populateDB_detalle(tx) {
    //----- alert("18");
    tx.executeSql('DROP TABLE IF EXISTS DETALLE');
    tx.executeSql('CREATE TABLE IF NOT EXISTS DETALLE (TipoDcto INTEGER,NroDcto INTEGER,Apu INTEGER,Fecha DATE,FechaVto DATE,TipoDctoM INTEGER,NroDctoM INTEGER,Precio REAL,Tc REAL,CodConcepto INTEGER,CodCliente INTEGER,Debe REAL,Haber REAL,CodArt INTEGER,Dcajas REAL,Hcajas REAL,Dunidades REAL,Hunidades REAL,NumTransaccion INTEGER,CodClienteVis INTEGER,CodPersonalVis INTEGER)');
  }
  function populateDB_maestro(tx) {
    //----- alert("18");
    tx.executeSql('DROP TABLE IF EXISTS MAESTRO');
    tx.executeSql('CREATE TABLE IF NOT EXISTS MAESTRO (TipoDcto INTEGER,NroDcto INTEGER,Fecha DATE,FechaVto DATE,Obs TEXT,CodCliente INTEGER,Conteo INTEGER,NumTransaccion INTEGER,CodClienteVis INTEGER,CodPersonalVis INTEGER)');
  }


  function call_insert_db_articulo(data) {
    data_db_articulo=data;
    //----- alert("call_insert_db_articulo");
    // codigo_usuario=user;
    // password_usuario=pass;
    // var dbShell = window.openDatabase(database_name, database_version, database_displayname, database_size);
    db.transaction(insertDB_articulo, errorCB1_carg1);
  };
  function insertDB_articulo(tx) {
    var d1=data_db_articulo;
    //----- alert("insertando: "+d1);

    //----- alert("-longitud1: "+d1[0].length);
    //----- alert("-longitud2: "+d1[1].length);
    //----- alert("-longitud3: "+d1.length);
    //----- alert("-longitud4: "+d1[0][0].length);
    //----- alert("-longitud5: "+d1[0][1].length);
    
    //----- alert("-0 reg: "+d1[0][0]+","+d1[0][1]+","+d1[0][2]+","+d1[0][3]+","+d1[0][4]+","+d1[0][5]+","+d1[0][6]+","+d1[0][7]+","+d1[0][8]+","+d1[0][9]+","+d1[0][10]+","+d1[0][11]+","+d1[0][12]+","+d1[0][13]+","+d1[0][14]+","+d1[0][15]+","+d1[0][16]+","+d1[0][17]+","+d1[0][18]);
    //----- alert("-1 reg: "+d1[1][0]+","+d1[1][1]+","+d1[1][2]+","+d1[1][3]+","+d1[1][4]+","+d1[1][5]+","+d1[1][6]+","+d1[1][7]+","+d1[1][8]+","+d1[1][9]+","+d1[1][10]+","+d1[1][11]+","+d1[1][12]+","+d1[1][13]+","+d1[1][14]+","+d1[1][15]+","+d1[1][16]+","+d1[1][17]+","+d1[1][18]);
    //----- alert("-2 reg: "+d1[2][0]+","+d1[2][1]+","+d1[2][2]+","+d1[2][3]+","+d1[2][4]+","+d1[2][5]+","+d1[2][6]+","+d1[2][7]+","+d1[2][8]+","+d1[2][9]+","+d1[2][10]+","+d1[2][11]+","+d1[2][12]+","+d1[2][13]+","+d1[2][14]+","+d1[2][15]+","+d1[2][16]+","+d1[2][17]+","+d1[2][18]);
    
    for (var i = 0; i < d1.length; i++) {

      tx.executeSql('INSERT INTO ARTICULO (CodMarca,DesMarca,CodArt,DesArt,DesArtReducido,Calibre,TipoArticulo,CantxEmpaque,PrecioCompra,PrecioVtaMin,PrecioVtaMax,CodBotella,DesBotella,PVtaMinBot,CodCaja,DesCaja,PVtaMinCaja,PVtaMaxCaja,Estado) VALUES ('+d1[i][0]+',"'+d1[i][1]+'",'+d1[i][2]+',"'+d1[i][3]+'","'+d1[i][4]+'",'+d1[i][5]+',"'+d1[i][6]+'",'+d1[i][7]+','+d1[i][8]+','+d1[i][9]+','+d1[i][10]+','+d1[i][11]+',"'+d1[i][12]+'",'+d1[i][13]+','+d1[i][14]+',"'+d1[i][15]+'",'+d1[i][16]+','+d1[i][17]+',"'+d1[i][18]+'")');
    };
  // alert("art i:"+i+" lenght:"+d1.length);

    // alert("carga articulo finalizada");
    // localStorage.g_username = codigo_usuario;
    // localStorage.g_password = password_usuario;
    // localStorage.g_existe = 1;
    // tx.executeSql('INSERT INTO DEMO (id, data) VALUES (1, "First row")');
    // tx.executeSql('INSERT INTO USUARIO (id,codigo,pass) VALUES (1,"11","22")');
  };

  function call_insert_db_cliente(data) {
    data_db_cliente=data;
    // alert(data);
    db.transaction(insertDB_cliente, errorCB1_carg2);
  };

  function insertDB_cliente(tx) {
    var d1=data_db_cliente;
  // alert("lenght:"+d1.length);
  // tx.executeSql('INSERT INTO CLIENTE (CodCliente,Nombre,RazonSocial,Direccion,Nit,NroTelefono1,NroTelefono2,CodZona,DesZona,CodPersonal,DesPersonal,CodRuta,DesRuta) VALUES (100,"EVELIN  MARIA CARDENAS TROCHE           ","Restaurant Rincon Chume±o               ","Av. Jaime Zuda±es # 1310 Zona alto sopoc","2234836017",73007643,               ,201,"SOPOCACHI                                         ",1,"CENTRAL                                 ","1","SOPOCACHI                               ")');
  for (var i = 0; i < d1.length; i++) {
    for (var j = 0; j < 13; j++) {
      d1[i][j]=d1[i][j].replace(/\s*$/,"");
    }

         // alert("i_C:"+i+" lenght: "+d1.length+" id_0>"+d1[i][0]+"--_1>"+d1[i][1]+"--_2>"+d1[i][2]+"--_3>"+d1[i][3]+"--_4>"+d1[i][4]+"--_5>"+d1[i][5]+"--_6>"+d1[i][6]+"--_7>"+d1[i][7]+"--_8>"+d1[i][8]+"--_9>"+d1[i][9]+"--_10>"+d1[i][10]+"--_11>"+d1[i][11]+"--_12>"+d1[i][12]);
        // alert(d1[i][1]);
        // alert(d1[i][2]);
        // alert(d1[i][3]);
        // alert(d1[i][4]);
        // alert(d1[i][5]);
        // alert(d1[i][6]);
        // alert(d1[i][7]);
        // alert(d1[i][8]);
        // alert(d1[i][9]);
        // alert(d1[i][10]);
        // alert(d1[i][11]);
        // alert(d1[i][12]); 
        // tx.executeSql('INSERT INTO CLIENTE (CodCliente,Nombre,RazonSocial,Direccion,Nit,NroTelefono1,NroTelefono2,CodZona,DesZona,CodPersonal,DesPersonal,CodRuta,DesRuta) VALUES ('+d1[i][0]+',"'+d1[i][1]+'","'+d1[i][2]+'","'+d1[i][3]+'","'+d1[i][4]+'",'+d1[i][5]+','+d1[i][6]+','+d1[i][7]+',"'+d1[i][8]+'",'+d1[i][9]+',"'+d1[i][10]+'","'+d1[i][11]+'","'+d1[i][12]+'")');
  

        tx.executeSql('INSERT INTO CLIENTE (CodCliente,Nombre,RazonSocial,Direccion,Nit,NroTelefono1,NroTelefono2,CodZona,DesZona,CodPersonal,DesPersonal,CodRuta,DesRuta) VALUES ('+d1[i][0]+',"'+d1[i][1]+'","'+d1[i][2]+'","'+d1[i][3]+'","'+d1[i][4]+'","'+d1[i][5]+'","'+d1[i][6]+'",'+d1[i][7]+',"'+d1[i][8]+'",'+d1[i][9]+',"'+d1[i][10]+'","'+d1[i][11]+'","'+d1[i][12]+'")');
        // tx.executeSql('INSERT INTO CLIENTE (CodCliente) VALUES ('+d1[i][0]+')');
        // var auxiliar=$("#query2").val();
        // tx.executeSql(auxiliar,[d1[i][0]]);
        // CodCliente INTEGER,Nombre TEXT,RazonSocial TEXT,Direccion TEXT,Nit TEXT,NroTelefono1 INTEGER,NroTelefono2 INTEGER,CodZona INTEGER,DesZona TEXT,CodPersonal INTEGER,DesPersonal TEXT,CodRuta TEXT,DesRuta TEXT)
};
    // alert("cliente i:"+i+" lenght:"+d1.length);

        // alert("carga cliente finalizada");
      };
      function call_insert_db_detalle(data) {
        data_db_detalle=data;
        db.transaction(insertDB_detalle, errorCB1_carg3);
      };

      function insertDB_detalle(tx) {
        var d1=data_db_detalle;
        for (var i = 0; i < d1.length; i++) {

          tx.executeSql('INSERT INTO DETALLE (TipoDcto,NroDcto,Apu,Fecha,FechaVto,TipoDctoM,NroDctoM,Precio,Tc,CodConcepto,CodCliente,Debe,Haber,CodArt,Dcajas,Hcajas,Dunidades,Hunidades,NumTransaccion,CodClienteVis,CodPersonalVis) VALUES ('+d1[i][0]+','+d1[i][1]+','+d1[i][2]+',"'+d1[i][3]+'","'+d1[i][4]+'",'+d1[i][5]+','+d1[i][6]+','+d1[i][7]+','+d1[i][8]+','+d1[i][9]+','+d1[i][10]+','+d1[i][11]+','+d1[i][12]+','+d1[i][13]+','+d1[i][14]+','+d1[i][15]+','+d1[i][16]+','+d1[i][17]+',null,null,null)');
        };
    // alert("detalle cargado");
    // alert("detalle i:"+i+" lenght:"+d1.length);
    // location.reload();
    // alert("carga detalle finalizada");
  };
  function call_insert_db_maestro(data) {
    data_db_maestro=data;
    db.transaction(insertDB_maestro, errorCB1_carg4,success_reload);
  };

  function insertDB_maestro(tx) {
    var d1=data_db_maestro;
    for (var i = 0; i < d1.length; i++) {
      tx.executeSql('INSERT INTO MAESTRO (TipoDcto,NroDcto,Fecha,FechaVto,Obs,CodCliente,Conteo,NumTransaccion,CodClienteVis,CodPersonalVis) VALUES ('+d1[i][0]+','+d1[i][1]+',"'+d1[i][2]+'","'+d1[i][3]+'","'+d1[i][4]+'",'+d1[i][5]+','+d1[i][6]+',null,null,null)');
    };
    // alert("detalle cargado");
    // alert("detalle i:"+i+" lenght:"+d1.length);
    // location.reload();
    // alert("carga detalle finalizada");
  };


  function errorCB_cargar(err) {
   alert("errorCB_cargar: "+err.message);
 }
 function errorCB1_carg1(err) {
   alert("errorCB1_carg1--: "+err.message);
 }
 function errorCB1_carg2(err) {
   alert("errorCB1_carg2--: "+err.message);
 }
 function errorCB1_carg3(err) {
   alert("errorCB1_carg3--: "+err.message);
 }
 function errorCB1_carg4(err) {
   alert("errorCB1_carg4--: "+err.message);
 }
 function success_reload() {
  localStorage.db_cargada = 1;
  localStorage.id_transportista = id_transp;
    // location.reload();
    $(".registrar").attr("disabled", "disabled");
    navigator.notification.vibrate(1000);
    navigator.notification.beep(1);
    setTimeout(function(){ location.reload(); }, 1000);
    alert("Datos cargados");
    $.mobile.loading("hide");
  }


  function verificar_usuario_y_carga(codigo) {
    codigo_ruta=codigo;
    var direccion= $(".direccion").val();
  // var var1= $(".var1").val();
  // var codigo= $("#cod_usuario").val();
  // var password= $("#pass_usuario").val();
  var codigo      =localStorage.g_username;
  var password    =localStorage.g_password;

  var info='verificar';
  //----- alert("in subir_db_articulo."+direccion+"---"+var1);
  $.ajax({
    type: 'POST',
    dataType: 'json',
    url: "http://"+direccion+"/sitrans_server/sitrans.php",
    data: "codigo=" + codigo + "&password=" + password + "&info=" + info,
    success: function (resp) {
      if(resp=='1'){
        subir_db_articulo();
        subir_db_cliente();
        subir_db_detalle();
        subir_db_maestro();
      }else{
        $.mobile.loading("hide");
        alert("Por favor verifique su Codigo y Contraseña.");
      }
    },
    error: function (e) {
      $.mobile.loading("hide");
      alert("Por favor verifique el estado de su red.");
      //----- alert("No se encuentra conectado a su red: "+e.message+" err code: "+e.code+ "e:"+e);
    }
  });
  // codigo_usuario=user;
  // password_usuario=pass;
  // var dbShell = window.openDatabase(database_name, database_version, database_displayname, database_size);
  // db.transaction(insertDB, errorCB);
};
