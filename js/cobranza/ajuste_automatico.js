
function list_cobranza_ajuste_automatico() {
  //cobro='0.00';
  var cobro=localStorage.total_cobro;
  cobro=parseFloat(cobro);
  var cobro_aux=cobro;
  // cobro=cobro*(-1);
  var count=1;

  $(".editar_cobranza_class").each(function(index, el) {
    var aux_nro = $(this).attr("nrodctom");
    // var aux_cob = $(this).attr("cobrado");
    var aux_sal = $(this).attr("saldo");
    aux_sal=parseFloat(aux_sal);
    var aux_fch = $(this).attr("fecha-venc");
    var aux_dcm = $(this).attr("tipodctom");
    var items = $('.editar_cobranza_class').length;
    var sum_aux;
    count=count+1;
    // if(aux_nro !='19999999999'){
    //   nrodctom_arr[count]  =aux_nro;
    //   // monto_arr[count]     =aux_cob;

    //   aux_fch = aux_fch.split("/");
    //   aux_fch = aux_fch[2]+'-'+aux_fch[1]+'-'+aux_fch[0]+' 00:00:00.000';

    //   fchvto_arr[count]    =aux_fch;
    //   tipodctom_arr[count] =aux_dcm;
    //   count                =count+1;
    // }
    if (cobro!=0 && items>1){
      if(cobro > 0 || aux_sal < 0){
        if(cobro<aux_sal){
          if(items=count){
            if(aux_sal<0){
              $('.list_cobranza').find('div[nrodctom="'+documenton+'"]').attr('cobrado',(cobro));
              $('.list_cobranza').find(".html_cobrado[marca-cobranza-html='"+documenton+"']").html(cobro+' Bs.');
              cobro=0;
            }
          }else{
            // sum_aux=parseFloat(aux_sal+(cobro*(-1))).toFixed(2);
            if()
              $('.list_cobranza').find('div[nrodctom="'+documenton+'"]').attr('cobrado',(aux_sal));
            $('.list_cobranza').find(".html_cobrado[marca-cobranza-html='"+documenton+"']").html(aux_sal+' Bs.');
            cobro=cobro*(-1)+aux_sal;
          }
        }

        if(cobro>aux_sal){
          if(items=count){
            sum_aux=parseFloat(aux_sal+cobro).toFixed(2);
            $('.list_cobranza').find('div[nrodctom="'+documenton+'"]').attr('cobrado',(sum_aux));
            $('.list_cobranza').find(".html_cobrado[marca-cobranza-html='"+documenton+"']").html(sum_aux+' Bs.');
            cobro=0;
          }else{
            $('.list_cobranza').find('div[nrodctom="'+documenton+'"]').attr('cobrado',(aux_sal));
            $('.list_cobranza').find(".html_cobrado[marca-cobranza-html='"+documenton+"']").html(aux_sal+' Bs.');
            cobro=cobro*(-1)+aux_sal;
          }
        }
      }
    }
  });

}