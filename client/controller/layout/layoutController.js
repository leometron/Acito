
/*
Created by LingaRaja.
Has the events and helpers related to home page.
*/

// var showPost = true;

Meteor.subscribe('featuredimage');

Template.header.events({
    'click #pageName': function () {
        Session.set('numberOfCount', 3);
        Session.set('selectedPostId', "");
        Session.set("pageId", this._id);
      Session.set('postCount',Posts.find({pageId:this._id}).count());        
        Router.go('/posts?pageId='+this._id+'&count='+Session.get('numberOfCount'));        
    },
    'click #backToPage': function () {
        Session.set('selectedPostId', "");
        Session.set("pageId", Session.get("selectedPageId"));
        history.back();
    },
});

// Template.header.helpers({
//    'pagesList' : function() {
//        return Pages.find();
//    },
//    'showSelectedPost' : function() {
//        if(Session.get('selectedPostId')){
//            return Posts.findOne({_id: Session.get('selectedPostId')});            
//        }
//    },    
// });

Template.home.events({
    'click #postTitle': function () {
        var postId = this._id;
        // $('.image').animate({width: 'toggle'}, 770);
        $('.image').animate({width: 'toggle'}, 1600);
        setTimeout(function () {
            Session.set('selectedPageId', Session.get("pageId"));
            Session.set('selectedPostId', postId);
            Router.go("/post/" + postId);
        }, 1590);
    },
    // 'click .Ask': function () {
    //     if (showPost) {
    //         $('#post').hide();
    //         $('#showPost').show().animate({"width": "50%"}, "fast");
    //         showPost = false;
    //     } else {
    //         $('#post').show();
    //         $('#showPost').hide().animate({"width": "-50%"}, "slow");
    //         showPost = true;
    //     }
    // },
    'click .right-arrow' : function(){
      var userId = this._id;
      Session.set('selectedPageId',Session.get("pageId"));         
      Session.set('selectedPostId', userId);
      // $('.image').animate({width: 'toggle'}, 1000);
      $('.image').css('-webkit-animation','mymove 2s').css('animation','mymove 2s').css('position','relative');

      Meteor.setTimeout(function(){
        // $(window).scrollTop(500);
        // $('.animateclass').css('-webkit-animation','mymoveone 1s').css('animation','mymoveone 1s').css('position','relative');
        // $('.sampleanimation').css('-webkit-animation','mymoveone 5s').css('animation','mymoveone 5s').css('position','relative');
        Router.go("/post/"+userId);
          Meteor.setTimeout(function(){
            $(window).scrollTop(500);
            // $('.home-post-field').css('-webkit-animation','mymoveone 2s').css('animation','mymoveone 2s').css('position','relative');
          },10);
      }, 1000);
   },
   'click #askQuestion' : function() {
      if (!$('#questionArea').val()) {
        $('#questionEmptyInfo').show();
      } else if (!Meteor.userId()) {
        // $('#showPost').hide().animate({"width": "-50%"}, "slow");
        // $('#loginDetail').show();
         Meteor.setTimeout(function() {
            $(window).scrollTop(500);  
          },300);
          Router.go('/login');
      } else {
        Session.set('question',$('#questionArea').val());
          Meteor.setTimeout(function(){
            $(window).scrollTop(500);  
            Router.go('/ask');
          },300);
      }
      Meteor.setTimeout(function(){
          $('#questionEmptyInfo').hide();
      }, 5000);        
   },
   'click #search' : function () {
        if(!$('#searchQuery').val()) {
            $('#searchEmptyInfo').show();
        } else {
            $(window).scrollTop(500);
            Router.go('/posts?queryString='+$('#searchQuery').val());
        }
        Meteor.setTimeout(function(){
          $('#searchEmptyInfo').hide();
        }, 5000);        
    },
   'click .select-question-row' : function() {
      if (this._id) {
        Router.go('/question?id='+ this._id);      
      }
   	},
   'click .all-questions-content' : function() {
      Router.go('/allquestions');
    },
   'click .parent-page' : function(){
    if($('#page'+this._id).hasClass('page-selection')){
      $('#page'+this._id).removeClass('page-selection');
      $("#subpage"+this._id).html('');
    } else {
      $('#page'+this._id).addClass('page-selection');
      var subPages = Pages.find({parentId: this._id});
      var t ="";
      subPages.forEach(function(item){
        t += '<div class="sub-page" id="'+item._id+'">'+item.title+'</div>';
      });
      $("#subpage"+this._id).html(t);
    }
   },
   'click .sub-page' : function(event){
      Session.set("pageId", "");
      Session.set('numberOfCount', 3);
      Session.set('selectedPostId', "");
      Session.set("pageId", $(event.target).attr("id"));
      Router.go('/posts?pageId='+Session.get("pageId")+'&count='+Session.get('numberOfCount'));             
   }    
});

// Template.postList.helpers({
//    'postsList' : function() {
//       Session.set('postCount',Posts.find({pageId:Session.get("pageId")}).count());
//       return Posts.find({pageId:Session.get("pageId")}, { limit: Session.get('numberOfCount') });
//     }
// });

Template.home.helpers({
  'mediaList' : function() {
    return Media.find();
   },
   'questionList': function () {
        return questionDetail.find({status:"active"});
   },
   'answerList': function () {
        return answer.find({status:"active"});
   },
   'parentPageList' : function() {
       return Pages.find({parentId:'null'});
   }

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

// Template.postList.helpers({
//   'postsList': function(){
//     Session.set('postCount',Posts.find({pageId:Session.get("pageId")}).count());
//     return Posts.find({pageId:Session.get("pageId")}, { limit: Session.get('numberOfCount') });
//   }
// });

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

Template.allQuestions.helpers({
   'questionList': function () {
        return questionDetail.find({status:"active"});
   }
});



Template.postDetail.helpers({
      formatDate: function(dateStr){
       var dateArr = dateStr.split('/');
       var date = new Date(dateArr[1]+'/'+dateArr[0]+'/'+dateArr[2]);
       var monthArr = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'November', 'December'];
       return monthArr[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear();
      }
});

Template.postList.rendered = function () {
    $('.post-loading-icon').hide(); 
    $(window).scroll(function(){
        if ($(window).scrollTop() >= $(document).height() - $(window).height()) {
            if(Session.get('numberOfCount')){
                if(Session.get('postCount') >= Session.get('numberOfCount')){
                  $('.post-loading-icon').show();  
                  Meteor.setTimeout(function(){
                  Session.set('numberOfCount', Session.get('numberOfCount') +3);
                    Router.go('/posts?pageId='+Session.get('pageId')+'&count='+Session.get('numberOfCount'));        
                      if(Session.get('postCount')<=Session.get('numberOfCount')){
                          $('.post-loading-icon').hide();
                          // $('.posts-Over-text').show();
                          // Meteor.setTimeout(function(){$('.posts-Over-text').hide()},3000);
                      }
                  }, 1000);
                }
            }
        }
    });     
};  
Template.home.rendered = function () {
    $('.posts-Over-text').hide();
    // $('.post-loading-icon').hide();
    $('#questionDetail').hide();
    $('#questionEmptyInfo').hide();
    $('#searchEmptyInfo').hide();
    $('#loginDetail').hide();

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
  
// $('#showPost').hide();
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


