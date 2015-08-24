// Template.header.created = function () {
//   Session.set('isActive', false);
//   Session.set('showLogin', false);
// };

// Template['header'].helpers({
//   showLogin: function () {
//     return Session.get('showLogin');
//   },
//   isActive: function () {
//     return Session.get('isActive') ? 'active' : '';
//   },
//   animateClass: function () {
//     return Session.get('isActive') ? 'fadeIn' : 'fadeOut';
//   },
//   iconClass: function () {
//     return Meteor.user() ? 'user' : 'sign in';
//   }
// });

// Template['header'].events({
//   'click .resize.button' : function () {
//     var showLogin = Session.get('showLogin');

//     Session.set('isActive', !Session.get('isActive'));

//     setTimeout(function () {
//       Session.set('showLogin', !Session.get('showLogin'));
//     }, 600);
//   },
//   'click .log-out.button' : function () {
//     Meteor.logout();
//   }
// });

Template.header.rendered = function () {
    $(document).on('click', 'a[href^="#"]', function (e) {
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

  if($(window).scrollTop() + $(window).height() == $(document).height()) {
        $('.loading-icon').show();
    Meteor.setTimeout(function(){
    $('.loading-icon').hide();
      Session.set('numberOfCount', Session.get('numberOfCount') +4);
          if(Session.get('postCount')<=Session.get('numberOfCount')){
            $('.give-more-content').hide();
            $('.posts-Over').show();
            Meteor.setTimeout(function(){$('.posts-Over').hide()},1500);
          }
    }, 1000);
   }

  var theme = Session.get('themeName');
  if(theme === 'theme1'){
var window_top = $(window).scrollTop();   
   if(window_top != 0){     
      $('#mainNav').css({'background-color': 'black'});  
       $('.navbar-brand').css({'font-size': '15px'});  
       $('.navbar-default .navbar-nav li a').css({'color':'black'})  
       $('.navbar-default .navbar-brand').css({'color':'black'})   
       $('.navbar-fixed-top').css({'top': '0', 'width':'100%'})  
       $('.navbar-fixed-top').css({'left':'0'})   
   }else{
       $('#mainNav').scrollTop(function(){           
       $(this).css({'background-color': 'transparent','border-color':'black'})
       $('.navbar-brand').css({'font-size': 'x-large'}); 
       $('.navbar-default .navbar-nav li a').css({'color':'black'})   
       $('.navbar-default .navbar-brand').css({'color':'black'})  
       $('.navbar-fixed-top').css({'top': '25px', 'width':'95%'})  
        $('.navbar-fixed-top').css({'left':'35px'})  
       })
   }
   
  }else{
   var window_top = $(window).scrollTop();   
   if(window_top != 0){     
       $('#mainNav').css({'background-color': 'black'});  
       $('.navbar-brand').css({'font-size': '15px'});  
       $('.navbar-default .navbar-nav li a').css({'color':'white'})  
      $('.navbar-default .navbar-brand').css({'color':'white'}) 
      $('.back').css({'color': 'white'})       
   }else{
       $('#mainNav').scrollTop(function(){           
       $(this).css({'background-color': 'transparent','border-color':'white'})
       $('.navbar-brand').css({'font-size': 'x-large'}); 
       $('.navbar-default .navbar-nav li a').css({'color':'white'})   
      $('.navbar-default .navbar-brand').css({'color':'white'})  
      $('.back').css({'color': 'black'}) 
      })
  }
}
      
});
};