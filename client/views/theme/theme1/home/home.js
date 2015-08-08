var showPost = true;

Template.theme.helpers({
 
});


Template.theme.rendered = function () {

$('#showPost').hide();
$('#postIntroduction').offset().top - $('#postasas').offset().top



  $('a[href*=#]:not([href=#])').click(function () {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false;
      }
    }

    return true;
  });
};

Template.theme1.events({
  'click #Ask' : function(){   
       if(showPost){          
          $('#showPost').show();
          showPost = false;  
       }else{
        $('#showPost').hide();
          showPost = true;  
       }    
  }

});
