 function steps_clear(){
     localStorage.steps=1;
     $('.progress .circle').removeClass().addClass('circle');
     $('.progress .bar').removeClass().addClass('bar');
 }

 function steps_next(){
    var i = localStorage.steps;

    $('.progress .circle:nth-of-type(' + i + ')').addClass('active');
    $('.progress .circle:nth-of-type(' + (i - 1) + ')').removeClass('active').addClass('done');
    // $('.progress .circle:nth-of-type(' + (i - 1) + ') .label').html('&#10003;');
    $('.progress .bar:nth-of-type(' + (i - 1) + ')').addClass('active');
    $('.progress .bar:nth-of-type(' + (i - 2) + ')').removeClass('active').addClass('done');
    i++;
    if (i == 0) {
      $('.progress .bar').removeClass().addClass('bar');
      $('.progress div.circle').removeClass().addClass('circle');
      i = 1;
  }
    localStorage.steps=i;
}
