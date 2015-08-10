
Template.themeheader.rendered = function(){
  $(document).on('click', 'a[href^="#"]', function(e) {
    // target element id
    var id = $(this).attr('href');
    
    var $id = $(id);
    if ($id.length === 0) {
        return;
    }

    e.preventDefault();
   
    var pos = $(id).offset().top;
    
    $('body, html').animate({scrollTop: pos});
});

$(window).scroll(function(){
   var window_top = $(window).scrollTop();
   if(window_top != 0){     
       $('#mainNav').css({'background-color': 'white'});  
       $('.navbar-brand').css({'font-size': '15px'});  
       $('.navbar-default .navbar-nav li a').css({'color':'black'})  
       $('.navbar-default .navbar-brand').css({'color':'black'})        
   }else{
       $('#mainNav').scrollTop(function(){           
       $(this).css({'background-color': 'transparent','border-color':'white'})
       $('.navbar-brand').css({'font-size': 'x-large'}); 
       $('.navbar-default .navbar-nav li a').css({'color':'white'})   
       $('.navbar-default .navbar-brand').css({'color':'white'})  
       })
   }
});

}