function con_respuesta(r){
  if(r=='1'||r=='2'){
    alert('con_respuesta');
    $(".con_index").html('<img src="img/on.png" alt="image" style="width:50px; ">');
  }

    $(".con_index").css("background-image", "none");
}
function sin_respuesta(){
  $(".con_index").css("background-image", "none");
  $(".con_index").html('<img src="img/off.png" alt="image" style="width:50px; ">');
  $(".con_index").trigger("create");
  alert('sin_respuesta');
}


 function verificar_online(){
  var direccion   =$(".direccion").val();
  var codigo      =localStorage.g_username;
  var password    =localStorage.g_password;
  var info='is_online';
  $(".con_index").css("background-image", 'url("img/loader.gif")');
  alert('verificar_online');
  $.ajax({
    type: 'POST',
    dataType: 'json',
    url: "http://"+direccion+"/sitrans_server/online.php",
    data: "codigo=" + codigo + "&password=" + password + "&info=" + info,
    success: function (resp) {
      alert("Resp: "+resp);
      con_respuesta(resp);
    },
    error: function (e) {
      sin_respuesta();
    }
  });
}
