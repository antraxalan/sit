var db = window.openDatabase("strans_db", "1.0", "Sitrans DB", 500000);

function llenar_btns_cargar(datos){
  var d1=datos;
  var rutas_html='';
  if(d1!=''){
    for (var i = 0; i < d1.length; i++) {
      rutas_html+='<button type="button" data-theme="b" class="button_o_10 carga_class_gnrl por_rutas" data-icon="navigation" data-iconpos="right" cod-carga="'+d1[i][0]+'">'+d1[i][1]+'</button>';
    }
  }else{
    rutas_html='<h2 align="center">No existen rutas fijadas.</h2>';
  }
  $('.cargar_button_2').html(rutas_html);
  $('.cargar_button_2').trigger('create');
  $.mobile.loading("hide");

  $('.cargar_button_1').show();
  $('.cargar_button_2').hide();
  $('#cargar_popup').popup( "open" );

}


function cargar_datos_ajax_ok(){

 var direccion= $(".direccion").val();
 var codigo      =localStorage.g_username;
 var password    =localStorage.g_password;
 var info='rutas';
 $.ajax({
  type: 'POST',
  dataType: 'json',
  url: "http://"+direccion+"/sitrans_server/ruta.php",
  data: "codigo=" + codigo + "&password=" + password,
  success: function (resp) {
    llenar_btns_cargar(resp);
  },
  error: function (e) {
    $.mobile.loading("hide");
    alert("Por favor verifique el estado de su red.");
  }
});

}

function cargar_datos_btn_press(){
 if(localStorage.g_existe=='0'||(typeof localStorage.g_existe === 'undefined')){
  $('#login_popup').popup( "open" );
  $("#cod_usuario").focus();
}else{

  $.mobile.loading("show");
  var direccion= $(".direccion").val();
  var codigo      =localStorage.g_username;
  var password    =localStorage.g_password;
  var info='verificar';
  $.ajax({
    type: 'POST',
    dataType: 'json',
    url: "http://"+direccion+"/sitrans_server/sitrans.php",
    data: "codigo=" + codigo + "&password=" + password + "&info=" + info,
    success: function (resp) {
      if(resp=='1'){
        cargar_datos_ajax_ok();
      }else{
        $.mobile.loading("hide");
        alert("Por favor verifique su Codigo y Contraseña.");
      }
    },
    error: function (e) {
      $.mobile.loading("hide");
      alert("Por favor verifique el estado de su red.");
    }
  });

}
}


function cargar_datos_btn_gnrl_press(cod){
  if(cod=='c'){
    $('.cargar_button_1').hide();
    $('.cargar_button_2').show();
  }else{

    $.mobile.loading("show", {
        theme: 'a'
      });
      if(localStorage.db_cargada=='0'||(typeof localStorage.db_cargada === 'undefined')){
        verificar_usuario_y_carga(cod);
      }else{
        navigator.notification.vibrate(500);
        navigator.notification.confirm(
          "Desea reemplazar la información existente?\n\nEsta no podra ser recuperada.", 
          function(buttonIndex){
           if(buttonIndex == "1"){
            verificar_usuario_y_carga(cod);
          }else{
            $.mobile.loading("hide");
            return;
          }
        }, 
        "Confirmación", 
        "Si,No"
        );
      }

  }
}
