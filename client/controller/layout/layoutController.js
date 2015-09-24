
/*
Created by LingaRaja.
Has the events and helpers related to home page.
*/

Meteor.subscribe('featuredimage');

Template.header.events({
    'click #logout': function() {
      Meteor.setTimeout(function () {
            Meteor.logout();
            Router.go('/');
            Meteor._reload.reload();                                    
      }, 250); 
    }
});

Template.home.events({
    'click #postTitle,.right-arrow,.feature-image': function () {
      var postId = this._id;
      Session.set('selectedPageId',Session.get("pageId"));         
      Session.set('selectedPostId', postId);
      $('.image').css('-webkit-animation','mymove 2s').css('animation','mymove 2s').css('position','relative');
      Meteor.setTimeout(function(){
        Router.go("/post/"+postId);
          Meteor.setTimeout(function(){
            $(window).scrollTop(500);
          },10);
      }, 1000);
    },
   'click #askQuestion' : function() {
      if (!$('#questionArea').val()) {
        $('#questionEmptyInfo').show();
      } else if (!Meteor.userId()) {
        Session.set('question',$('#questionArea').val());
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
        Meteor.call('countQuestion', this._id);
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
      var subPages = Pages.find({parentId: this._id,status:'Published'});
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
      Session.set('postCount',Posts.find({pageId:Session.get("pageId")}).count());              
      Router.go('/posts?pageId='+Session.get("pageId")+'&count='+Session.get('numberOfCount'));             
   }    
});

Template.home.helpers({
  'mediaList' : function() {
    return Media.find();
   },
   'questionList': function () {
        return questionDetail.find({status:"active"});
   },
   'questionName': function(nameStr) {
      var user = Meteor.users.findOne({ _id: nameStr});
      return user.username;
   },
   'answerList': function () {
        return answer.find({status:"active"});
   },
   'answercount': function(Id) {
        var count = answer.find({status:"active", questionId: Id}).count();
        var new_count = (count == 0)?'': (count == 1) ? ' , ' + count + ' Answer' : ' , ' + count + ' Answers';
        return new_count;
   },
   'parentPageList' : function() {
       return Pages.find({parentId:'null',status:'Published'});
   }
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
          // alert('entered if'+Session.get('postCount')+'.........'+Session.get('numberOfCount'));
                if(Session.get('postCount') >= Session.get('numberOfCount')){
                  $('.post-loading-icon').show();  
                  Meteor.setTimeout(function(){
                  Session.set('numberOfCount', Session.get('numberOfCount') +3);
                    Router.go('/posts?pageId='+Session.get('pageId')+'&count='+Session.get('numberOfCount'));        
                      if(Session.get('postCount')<=Session.get('numberOfCount')){
                          $('.post-loading-icon').hide();
                      }
                  }, 1000);
                }
            }
        }
    });     
};

Template.home.rendered = function () {
    $('.posts-Over-text').hide();
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


