
/*
Created by LingaRaja.
Has the events and helpers related to home page.
*/

Meteor.subscribe('featuredimage');
// Meteor.subscribe('rating');

Template.header.events({
   'click .select-question-row' : function() {
      if (this._id) {
        $(window).scrollTop(0);
        Meteor.call('countQuestion', this._id);
        Router.go('/question?id='+ this._id);      
      }
    },
    'click #logout': function() {
      Meteor.setTimeout(function () {
            Meteor.logout();
            Router.go('/');
            Meteor._reload.reload();                                    
      }, 250); 
    },
    'click .parent-page' : function(event){
      $(window).scrollTop(0)
       if($('.page'+this._id).hasClass('page-selection')){
         $('.page'+this._id).removeClass('page-selection');
         $(".subpage"+this._id).html('');
       } else {
      $('.parent-page').removeClass('page-selection');
      $(".leftMenuSubTitle").html('');         
         $('.page'+this._id).addClass('page-selection');
         var subPagesCount = Pages.find({parentId:this._id}).count();
         if(subPagesCount == 0) {
          $('.button-collapse').sideNav('hide');
           Session.setPersistent('categoryName',$(event.target).attr("name"));      
           Session.clear("pageId");
           Session.setPersistent('numberOfCount', 6);
           Session.set('selectedPostId', "");
           Session.setPersistent("pageId",this._id);
           Session.setPersistent('postCount',Posts.find({pageId:Session.get("pageId")}).count());
           Router.go('/tam/category/'+Session.get('categoryName')+'?pageId='+Session.get("pageId")+'&count='+Session.get('numberOfCount'));
         } else {
          Session.setPersistent('mainCategory',$(event.target).attr("name"));
           var subPages = Pages.find({parentId: this._id,status:'Published'});
           var t ="";
           subPages.forEach(function(item){
               t += '<div class="sub-page" name="'+item.title+'" id="'+item._id+'">'+item.title+'</div>';
           });
           $(".subpage"+this._id).html(t);        
         }      
       }     
  },
   'click .sub-page' : function(event){
      $(window).scrollTop(0)    
      Session.setPersistent('categoryName',$(event.target).attr("name"));
      Session.setPersistent('subCategory',$(event.target).attr("name"));
      $('.button-collapse').sideNav('hide');
      Session.clear("pageId");
      Session.setPersistent('numberOfCount', 6);
      Session.set('selectedPostId', "");
      Session.setPersistent("pageId", $(event.target).attr("id"));
      Session.setPersistent('postCount',Posts.find({pageId:Session.get("pageId")}).count());              
      Router.go('/tam/category/'+Session.get('mainCategory')+'/'+Session.get('subCategory')+'?pageId='+Session.get("pageId")+'&count='+Session.get('numberOfCount'));             
   },
   'click #grannyLogo' : function() {
      // Session.set('categoryName','');    
      Router.go('/');
   },
   'click .hide-on-large-only #askQuestion' : function() {
      askQuestion('hide-on-large-only');     
   },
   'click .hide-on-med-and-down #askQuestion' : function() {
      askQuestion('hide-on-med-and-down');     
   },
   'click .dr,.drName' : function() {
        Meteor.setTimeout(function(){    
          Router.go('/doctor');
        },100);      
   },
   'click .all-questions' : function() {
      $(window).scrollTop(0);
      Router.go('/allquestions');
    },
});

Template.home.events({
    'click #read-more,.card-image': function () {
      var postId = this._id;
      var postTitle = this.title.replace(/ /g,"-");
      // Session.set('selectedPageId',Session.get("pageId"));         
      Session.set('selectedPostId', postId);
      Meteor.setTimeout(function() {
        // Router.go("/tam/post/"+postTitle+"/"+postId);
            $(location).attr('href',"/tam/post/"+postTitle+"/"+postId);

          Meteor.setTimeout(function(){
            $(window).scrollTop(0);
          },10);
      }, 100);
    },
   'click #search' : function () {
        if(!$('#searchQuery').val()) {
            $('#searchEmptyInfo').html('Please enter search string');
        } else {
            $(window).scrollTop(0);
            $('#search_modal').closeModal();
            Router.go('/tam/category/search-posts?queryString='+$('#searchQuery').val());
            $('#searchQuery').val("");
            if($("label").hasClass("active")) {
               $("label").removeClass("active")
            }            
        }
        Meteor.setTimeout(function(){
          $('#searchEmptyInfo').html('');
        }, 3500);        
    },
    // 'keyup #searchQuery' : function(e){
    //   if (e.which == 13) {
    //       if (!$('#searchQuery').val()) {
    //           $('#searchEmptyInfo').html('Please enter search string');
    //       } else {
    //         $(window).scrollTop(572);
    //         $('#search_modal').closeModal();
    //         Router.go('/posts?queryString='+$('#searchQuery').val());
    //         $('#searchQuery').val("");                        
    //       }        
    //   }
    //   Meteor.setTimeout(function(){
    //     $('#searchEmptyInfo').html('');
    //   }, 3500);       
    // },     
   'click .select-question-row' : function() {
      if (this._id) {
        $(window).scrollTop(0);
        Meteor.call('countQuestion', this._id);
        Router.go('/question?id='+ this._id);      
      }
   	},
   'click .all-questions-content' : function() {
      $(window).scrollTop(0);
      Router.go('/allquestions');
    },
    'click .back-arrow' : function() {
      history.back();
    },
  'click #registerNewUser' : function () {
      $('#userLoginForm').closeModal();   
      $('#userRegistrationForm').openModal();
  },
  'click .close_search' : function() {
      $('#search_modal').closeModal();
  },
  'click .close_ask' : function() {
      $('#question_modal').closeModal();
  },
  'click .close_login' : function() {
    $('#userLoginForm').closeModal();
  },
  'click .close_register' : function() {
    $('#userRegistrationForm').closeModal();
  },
  'submit #userLogin': function(e, t) {
     e.preventDefault();
        var email = t.find('#email').value, password = t.find('#password').value;
        if(email == ''){
            Materialize.toast('Please enter email or username', 3000, 'error-toast');
            return;
        } else if(password == '') {
            Materialize.toast('Please enter password', 3000, 'error-toast');
            return;
        }

        Meteor.loginWithPassword(email, password, function (err) {
            if(err){
                Materialize.toast('Invalid email or Password', 3000, 'error-toast');
            } else if(!$('#questionArea').val()) {
               $('#userLoginForm').closeModal();
            } else {
              $('#userLoginForm').closeModal();
              Router.go('/ask');
            }
        });
        return false;

  },

  'submit #signUp' : function(e, t) {
    e.preventDefault();
    var first_name = t.find('#firstname').value;
    var new_email = t.find('#upemail').value, new_password = t.find('#signpassword').value;
    var repassword = t.find('#re-password').value;

    if(first_name == '') {
      Materialize.toast('Please enter username', 3000, 'error-toast');
      return;
    } else if(new_email == '') {
      Materialize.toast('Please enter email', 3000, 'error-toast');
      return;
    } else if(new_password == '') {
      Materialize.toast('Please enter password', 3000, 'error-toast');
      return;
    } else if(repassword == '') {
      Materialize.toast('Please enter confirm password', 3000, 'error-toast');
      return;
    } else if (new_password != repassword) {
      Materialize.toast('Your password and confirmation password do not match', 3000, 'error-toast');
      return;
    }

    var userDetail = { "email": new_email, "username":  first_name, "password": new_password }

      Accounts.createUser(userDetail, function(error){
        if(error){
            Materialize.toast(error.reason, 3000, 'error-toast');
        } else if(!$('#questionArea').val()) {
            Materialize.toast('Account has been created and logged in successfully.', 3000, 'success-toast');
            Meteor.setTimeout(function () {
              $('#userRegistrationForm').closeModal();
            },3000);
          } else {
            Materialize.toast('Account has been created and logged in successfully.', 3000, 'success-toast');
            Meteor.setTimeout(function () {
              $('#userRegistrationForm').closeModal();              
              Router.go('/ask')
            },3000);
          }
      });
      return false;
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
      var data = Pages.find({parentId:'null',status:'Published'}).fetch();
      if(data.length>0){
        $.each(data, function(i,row) {
            var x = Pages.find({parentId: row._id,status:'Published'}).count();
            if(x == 0) {
              row.isChild = "No";
            } else {
              row.isChild = "Yes";
            }
        });
      }
       return data;
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
    'parentPageList' : function() {
       // return Pages.find({parentId:'null',status:'Published'});
      var data = Pages.find({parentId:'null',status:'Published'}).fetch();
      if(data.length>0){
        $.each(data, function(i,row) {
            var x = Pages.find({parentId: row._id,status:'Published'}).count();
            if(x == 0) {
              row.isChild = "No";
            } else {
              row.isChild = "Yes";
            }
        });
      }
      return data;       
   },
   'category' : function() {
      return Session.get('categoryName');
   },
    'tagsList' : function() {
        return Pages.find({priority:"yes"});
    },
    'questionList': function () {
        return questionDetail.find({status:"active"});
   },
   questionCreatedBy : function(createdById) {
      var userDoc = Meteor.users.findOne({_id: createdById});
      return userDoc.username;        
  },   
});

Template.readMore.helpers({
    'homeSliderList' : function() {
        return homeslider.find({status:"Published"});
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
       var monthArr = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October','November', 'December'];
       return monthArr[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear();
      },

      postCreatedBy : function(createdById) {
        var userDoc = Meteor.users.findOne({_id: createdById});
        return userDoc.username;        
      },
      locationUrl: function() {
        return window.location.href;
      }
});

Template.postList.rendered = function () {
    $('.post-loading-icon').hide();
    $(window).scroll(function(){
        if ($(window).scrollTop() >= $(document).height() - $(window).height()) {
            if(Session.get('numberOfCount')){
                if(Session.get('postCount') >= Session.get('numberOfCount')){
                  $('.post-loading-icon').show();
                    $(window).scrollTop($(document).height() - $(window).height() - 10);  
                  Session.set('numberOfCount', Session.get('numberOfCount') +3);                
                  Meteor.setTimeout(function() {
                  if(Session.get('subCategory')) {
                    // alert('scroll value.....'+(window).scrollTop()+'........'+$(document).height() - $(window).height());
                    Router.go('/tam/category/'+Session.get('mainCategory')+'/'+Session.get('subCategory')+'?pageId='+Session.get("pageId")+'&count='+Session.get('numberOfCount'));             
                  } else {
                    Router.go('/tam/category/'+Session.get('categoryName')+'?pageId='+Session.get("pageId")+'&count='+Session.get('numberOfCount'));
                  }
                  // Router.go('/posts?pageId='+Session.get('pageId')+'&count='+Session.get('numberOfCount')); 
                      if(Session.get('postCount')<=Session.get('numberOfCount')){
                          $('.post-loading-icon').hide();                         
                      }
                  }, 300);
                }
            }
        }
    });     
};

Template.header.rendered = function () {
  $('#questionArea').val("");
  $('.button-collapse').sideNav();
  $('.leftContent').css('height',window.innerHeight-141);

  $('.search').click(function(){
      $('#search_modal').openModal();
  });
  $('.question').click(function(){
      $('#question_modal').openModal();
  });
};

Template.home.rendered = function () {
   // $('.posts-Over-text').hide();
    // $('#questionDetail').hide();
    // $('#loginDetail').hide();
    // $('.leftContent').css('height',window.innerHeight-141);
};

Template.postDetail.rendered = function() { 
  addTwitterWidget();
  addFbLikeWidget();
  addSharethisWidget();
   this.$('.rateit').rateit();
   var routepostId = this.data.postId;

   var postDoc = Posts.findOne({ _id: routepostId});
   Meteor.setTimeout(function() {
      $('#list'+postDoc._id).html(postDoc.description);
      $('#detail'+postDoc._id).html(postDoc.description);
   }, 100);

   this.$('.rateit').bind('rated', function(event, value) {
          if(!Meteor.userId()){
            $('#userLoginForm').openModal();
          } else {
            Meteor.call('insertrating', Meteor.userId(), routepostId, value);
          }
    });
};

function addTwitterWidget() {
    !function (d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0], 
            p = /^http:/.test(d.location) ? 'http' : 'https';
            // id="";
        if (!d.getElementById(id)) {
            js = d.createElement(s);
            js.id = id;
            js.src = p + '://platform.twitter.com/widgets.js';
            fjs.parentNode.insertBefore(js, fjs);
        }
    }(document, 'script', 'twitter-wjs');
}


function addSharethisWidget() {
  var media_element = document.createElement('script');
    media_element.src = 'http://w.sharethis.com/button/buttons.js'; 
    media_element.onload = function()
      {
        stLight.options({publisher: "adf6a9e7-f0ba-4402-bfa2-bbf4a9b749d8", doNotHash: true, 
          doNotCopy: false, hashAddressBar: false, async: true});
      };
    document.body.appendChild(media_element);  
}

Template.registerHelper ("timeanalysis", function(date) {
    if(date)
       
       var current_date = new Date();
       var previous_date = new Date(date);

       var date1_ms = current_date.getTime();
       var date2_ms = previous_date.getTime(); 
        
       var difference_ms = date1_ms - date2_ms;
           difference_ms = difference_ms/1000;

       var seconds = Math.floor(difference_ms % 60);
          difference_ms = difference_ms/60; 
       
       var minutes = Math.floor(difference_ms % 60);
        minutes = (minutes == 0)?'': (minutes == 1) ? minutes + ' minute' : minutes + '  minutes';
          difference_ms = difference_ms/60;
       
       var hours = Math.floor(difference_ms % 24);
        hours = (hours == 0)?'': (hours == 1) ? hours + ' hour, ' : hours + '  hours, ';
          difference_ms = difference_ms/24;

       var days = Math.floor(difference_ms % 7);
        days = (days == 0)?'': (days == 1) ? days + ' day, ' : days + '  days, '; 
          difference_ms = difference_ms/7;

       var weeks = Math.floor(difference_ms % 4.5);
        weeks = (weeks == 0)?'': (weeks == 1) ? weeks + ' week, ' : weeks + '  weeks, '; 
          difference_ms = difference_ms/4.5;

       var months = Math.floor(difference_ms % 12);
        months = (months == 0)?'': (months == 1) ? months + ' month, ' : months + '  months, ';
          difference_ms = difference_ms/12;
       
       var years = Math.floor(difference_ms);
        years = (years == 0)?'': (years == 1) ? years + ' year, ' : years + '  years, '; 

      return years + months + weeks + days + hours + minutes + ' ago';

});

function addFbLikeWidget() { 
  (function(d, s, id) {    
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        // Meteor.setTimeout(function() {
        //     Meteor._reload.reload();
        // }, 100);
        return;
      }
      js = d.createElement(s); js.id = id;
      js.src = "http://connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v2.5";
      fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));
}

function askQuestion(paerentClass) {
  if (!$('.' + paerentClass + ' #questionArea').val()) {
          // $('#questionEmptyInfo').html('Please enter question');
            Materialize.toast('Please enter your question', 3000, 'error-toast');          
      } else if (!Meteor.userId()) {
        Session.set('question',$('.' + paerentClass + ' #questionArea').val());
        // Session.setPersistent('question',$('#questionArea').val())
         Meteor.setTimeout(function() {
            $(window).scrollTop(0);  
          },300);
          $('#question_modal').closeModal();
          $('#userLoginForm').openModal();
      } else {
        Session.set('question',$('.' + paerentClass + ' #questionArea').val());
          Meteor.setTimeout(function(){
            $(window).scrollTop(0);
              $('#question_modal').closeModal();
              $('.' + paerentClass + ' #questionArea').val("");
              if($("label").hasClass("active")) {
               $("label").removeClass("active")
              }  
            Router.go('/ask');
          },300);
      }
      Meteor.setTimeout(function(){
          $('#questionEmptyInfo').html('');
      }, 3200);   
}
