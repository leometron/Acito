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

Template.header.rendered = function(){
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
   }else{
       $('#mainNav').scrollTop(function(){           
           $(this).css({'background-color': 'transparent','border-color':'white'})
            $('.navbar-brand').css({'font-size': 'x-large'});  
       })
   }
});

}