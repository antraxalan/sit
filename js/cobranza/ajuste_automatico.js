
function list_cobranza_ajuste_automatico() {
  //cobro='0.00';
  var cobro=localStorage.total_cobro;
  cobro=parseFloat(cobro);
  var cobro_aux=cobro;
  var credito=0;

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

    if (cobro!=0 && items>1){
      if(cobro > 0 || aux_sal < 0 || credito <0){
        credito = ((cobro*(-1))+credito).toFixed(2);
        cobro=0;
        if(count==items){
          $('.list_cobranza').find('div[nrodctom="'+aux_nro+'"]').attr('cobrado',(credito*(-1)).toFixed(2));
          $('.list_cobranza').find(".html_cobrado[marca-cobranza-html='"+aux_nro+"']").html(credito*(-1).toFixed(2)+' Bs.');
          credito=0;
        }
        if(count<items){

          if(aux_sal<0){
            $('.list_cobranza').find('div[nrodctom="'+aux_nro+'"]').attr('cobrado',(aux_sal).toFixed(2));
            $('.list_cobranza').find(".html_cobrado[marca-cobranza-html='"+aux_nro+"']").html(aux_sal.toFixed(2)+' Bs.');
            credito=credito+aux_sal;
          }else{

            if((credito*(-1))<=aux_sal){
              $('.list_cobranza').find('div[nrodctom="'+aux_nro+'"]').attr('cobrado',((credito*(-1))).toFixed(2));
              $('.list_cobranza').find(".html_cobrado[marca-cobranza-html='"+aux_nro+"']").html((credito*(-1)).toFixed(2)+' Bs.');
              credito=0;
            }else{
              $('.list_cobranza').find('div[nrodctom="'+aux_nro+'"]').attr('cobrado',(aux_sal.toFixed(2)));
              $('.list_cobranza').find(".html_cobrado[marca-cobranza-html='"+aux_nro+"']").html(aux_sal.toFixed(2)+' Bs.');
              credito=((credito*(-1))-aux_sal).toFixed(2);
            }
          }
        }
      }
    }
  });

}