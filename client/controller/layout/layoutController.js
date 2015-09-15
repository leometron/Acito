
/*

Created by LingaRaja.

Has the events and helpers related to home page.

*/

var showPost = true;

Meteor.subscribe('featuredimage');

Template.header.events({
    'click #pageName': function () {
        Session.set('numberOfCount', 4);
        Session.set('selectedPostId', "");
        Session.set("pageId", this._id);
    },
    'click #backToPage': function () {
        Session.set('selectedPostId', "");
        Session.set("pageId", Session.get("selectedPageId"));
        history.back();
    }
});

Template.header.helpers({
   'pagesList' : function() {
       return Pages.find();
   },
   'showSelectedPost' : function() {
       if(Session.get('selectedPostId')){
           return Posts.findOne({_id: Session.get('selectedPostId')});            
       }
   },    
});

Template.home.events({
    'click #postTitle': function () {
        var postId = this._id;
        Session.set('selectedPageId', Session.get("pageId"));
        Session.set('selectedPostId', postId);
        $('.image').animate({width: 'toggle'}, 770);
        setTimeout(function () {
            Router.go("/post/" + postId);
        }, 1000);
    },
    'click .Ask': function () {
        if (showPost) {
            $('#post').hide();
            $('#showPost').show().animate({"width": "50%"}, "fast");
            showPost = false;
        } else {
            $('#post').show();
            $('#showPost').hide().animate({"width": "-50%"}, "slow");
            showPost = true;
        }
    },
    'click .right-arrow' : function(){
      var userId = this._id;
       Session.set('selectedPageId',Session.get("pageId"));
       Session.set('selectedPostId', userId);
       $('.image').animate({width: 'toggle'}, 770);
       setTimeout(function(){
            Router.go("/post/"+userId);
       }, 1000);  
   },
   'click #askQuestion' : function() {
      if (!$('#questionArea').val()) {
        $('#questionEmptyInfo').show();
      } else {
        Session.set('question',$('#questionArea').val());
        $('#questionArea').val("");
        $('#post').show();
        $('#showPost').hide().animate({"width": "-50%"}, "slow");
        $('#question').val(Session.get('question'));            
        $('#questionDetail').show();
      }
      Meteor.setTimeout(function(){
          $('#questionEmptyInfo').hide();
      }, 5000);        
   }
});

Template.home.helpers({
   'postsList' : function() {
      Session.set('postCount',Posts.find({pageId:Session.get("pageId")}).count());
      return Posts.find({pageId:Session.get("pageId")}, { limit: Session.get('numberOfCount') });
   },  
  'mediaList' : function() {
    return Media.find();
   },

   // 'showSelectedPost' : function() {
   //     if(Session.get('selectedPostId')){
   //         // var temp = Session.get('selectedPostId');
   //         // Session.set('selectedPostId',"");
   //         // console.log('temp.........'+temp);
   //         return Posts.findOne({_id: Session.get('selectedPostId')});            
   //     }
   // },
   // 'imageList' : function() {
   //     return featuredimage.find();
   // }
});

Template.header.helpers({
    'homeSliderList' : function() {
        return homeslider.find({status:"Published"});
    },
    'singlehomeSlider' : function() {
        return homeslider.findOne({status:"Published"}, { limit:1 });
    },
    'isHomeSlider' : function() {
        return homeslider.findOne({status:"Published"});
    },    
});

Template.home.helpers({
  'imageList' : function() {
       return featuredimage.find();
   }
})

Template.postDetail.helpers({
   // 'showSelectedPost' : function() {
   //     if(Session.get('selectedPostId')){
   //         // var temp = Session.get('selectedPostId');
   //         // Session.set('selectedPostId',"");
   //         // console.log('temp.........'+temp);
   //         return Posts.findOne({_id: Session.get('selectedPostId')});            
   //     }
   //     $('#postDetail').fadeIn(10000);          
   // },
   'imageList' : function() {
       return featuredimage.find();
   },
   'singlePostSlider' : function(){
    return featuredimage.findOne({postId:Session.get('selectedPostId')}, { limit:1 });
   }
});

Template.home.rendered = function () {

   // var currentUserId;
   //          if (Meteor.userId()){
   //            console.log('entered if');
   //              currentUserId = Meteor.userId();
   //          } else {
   //            console.log('entered else');

   //              var adminObj = Meteor.users.findOne({username: 'admin'});
   //              currentUserId = adminObj._id;
   //          }
   //          console.log('currentUserId....'+currentUserId);
   //      var themeObj = theme.findOne({userId:currentUserId});

   //    console.log('themeObj.......'+currentUserId+'............'+ theme.findOne({userId:currentUserId})+'.......'+themeObj.themeName);

    $('.posts-Over').hide();
    $('.loading-icon').hide();
    $('#questionDetail').hide();
    $('#questionEmptyInfo').hide();

    $(window).scroll(function(){
        if ($(window).scrollTop() >= $(document).height() - $(window).height()) {
            // $('.loading-icon').show();            
            Meteor.setTimeout(function(){
            Session.set('numberOfCount', Session.get('numberOfCount') +4);
                if(Session.get('postCount')<=Session.get('numberOfCount')){
                    $('.loading-icon').hide();
                    $('.posts-Over').show();
                    Meteor.setTimeout(function(){$('.posts-Over').hide()},3000);
                }
            }, 3000);
        }
    });

    Meteor.setTimeout(function () {
        $('#xLoader').hide();
        $(".owl-carousel").owlCarousel({
            autoPlay: 3000,
            items: 5,
        });
    }, 5500);

    $(function () {
        console.log(Session.get('themeName'));
        var theme = Session.get('themeName');
        if (theme === 'theme1') {
            $('#currentTheme').remove();
            var themesheet = $('<link href="/theme.css" rel="stylesheet" id="currentTheme1"/>');
            themesheet.appendTo('head');
        } else {
            $('#currentTheme1').remove();
            var themesheet = $('<link href="/main.css" rel="stylesheet" id="currentTheme"/>');
            themesheet.appendTo('head');
        }
});  
  
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

  var instance = this;
  if(Session.get("selected_item") === this._id){
    Meteor.defer(function() {  
      $(instance.firstNode).addClass("selected"); //use "instance" instead of "this"
    });
  }
};

Template.postDetail.rendered = function() {
   addTwitterWidget();
};

function addTwitterWidget() {
    !function (d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0], 
            p = /^http:/.test(d.location) ? 'http' : 'https';
            // console.log("all" + d.getElementById(id));
        if (!d.getElementById(id)) {
            js = d.createElement(s);
            js.id = id;
            js.src = p + '://platform.twitter.com/widgets.js';
            fjs.parentNode.insertBefore(js, fjs);
        }
    }(document, 'script', 'twitter-wjs');
}


