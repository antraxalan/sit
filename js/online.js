function con_respuesta(r){
  if(r=='1'||r=='2'){
    if(r=='1'){
      $(".con_index").html('<img src="img/on_o.png" alt="image" style="width:50px; ">');
    }else{
      $(".con_index").html('<img src="img/on.png" alt="image" style="width:50px; ">');
    }
  }else{
    $(".con_index").html('<img src="img/off.png" alt="image" style="width:50px; ">');
  }
  $(".con_index").css("background-image", "none");
}
function sin_respuesta(){
  // alert("Por favor verifique su red.");
  $(".con_index").css("background-image", "none");
  $(".con_index").html('<img src="img/off.png" alt="image" style="width:50px; ">');
  $(".con_index").trigger("create");
  // alert('sin_respuesta');
}
function con_respuesta_alert(r){
  if(r=='1'||r=='2'){
    // alert('con_respuesta');
    if(r=='1'){
      $(".con_index").html('<img src="img/on_o.png" alt="image" style="width:50px; ">');
      alert("Verifique que SITRANS este habilitado para realizar operaciones externas.");
    }else{
      $(".con_index").html('<img src="img/on.png" alt="image" style="width:50px; ">');
      alert("Conectado.");
    }
  }else{
    $(".con_index").html('<img src="img/off.png" alt="image" style="width:50px; ">');
    alert("Conectado a la red pero no a SITRANS.");
  }
  $(".con_index").css("background-image", "none");
  $(".con_index").trigger("create");
}
function sin_respuesta_alert(){
  $(".con_index").css("background-image", "none");
  $(".con_index").html('<img src="img/off.png" alt="image" style="width:50px; ">');
  $(".con_index").trigger("create");
  alert("Por favor verifique que este conectado correctamente a su red.");
  // alert('sin_respuesta');
}


function verificar_online(){
  var direccion   =$(".direccion").val();
  var codigo      =localStorage.g_username;
  var password    =localStorage.g_password;
  var info='is_online';
  $(".con_index").css("background-image", 'url("img/loader.gif")');
  // alert('verificar_online');
  $.ajax({
    type: 'POST',
    dataType: 'json',
    url: "http://"+direccion+"/sitrans_server/online.php",
    data: "codigo=" + codigo + "&password=" + password + "&info=" + info,
    success: function (resp) {
      // alert("Resp: "+resp);
      con_respuesta(resp);
    },
    error: function (e) {
      sin_respuesta();
    }
  });
}


function verificar_online_alert(){
  var direccion   =$(".direccion").val();
  var codigo      =localStorage.g_username;
  var password    =localStorage.g_password;
  var info='is_online';
  $(".con_index").css("background-image", 'url("img/loader.gif")');
  // alert('verificar_online');
  $.ajax({
    type: 'POST',
    dataType: 'json',
    url: "http://"+direccion+"/sitrans_server/online.php",
    data: "codigo=" + codigo + "&password=" + password + "&info=" + info,
    success: function (resp) {
      // alert("Resp: "+resp);
      con_respuesta_alert(resp);
    },
    error: function (e) {
      sin_respuesta_alert();
    }
  });
}
