
/*
Created by LingaRaja.
Has the events and helpers related to home page.
*/

Meteor.subscribe('featuredimage');
Meteor.subscribe('rating');

Template.header.events({

    'click #logout': function() {
      Meteor.setTimeout(function () {
            Meteor.logout();
            Router.go('/');
            Meteor._reload.reload();                                    
      }, 250); 
    },
    'click .parent-page' : function(event){

       if($('.page'+this._id).hasClass('page-selection')){
         $('.page'+this._id).removeClass('page-selection');
         $(".subpage"+this._id).html('');
       } else {
      $('.parent-page').removeClass('page-selection');
      $(".leftMenuSubTitle").html('');         
         $('.page'+this._id).addClass('page-selection');
         var subPagesCount = Pages.find({parentId:this._id}).count();
         if(subPagesCount == 0) {
           Session.set('categoryName',$(event.target).attr("name"));      
           Session.set("pageId", "");
           Session.set('numberOfCount', 6);
           Session.set('selectedPostId', "");
           Session.set("pageId",this._id);
           Session.set('postCount',Posts.find({pageId:Session.get("pageId")}).count());
           Router.go('/tam/category/'+Session.get('categoryName')+'?pageId='+Session.get("pageId")+'&count='+Session.get('numberOfCount'));
         } else {
          Session.set('mainCategory',$(event.target).attr("name"));
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
      Session.set('categoryName',$(event.target).attr("name"));
      Session.set('subCategory',$(event.target).attr("name"));
      $('.button-collapse').sideNav('hide');
      Session.set("pageId", "");
      Session.set('numberOfCount', 6);
      Session.set('selectedPostId', "");
      Session.set("pageId", $(event.target).attr("id"));
      Session.set('postCount',Posts.find({pageId:Session.get("pageId")}).count());              
      Router.go('/tam/category/'+Session.get('mainCategory')+'/'+Session.get('subCategory')+'?pageId='+Session.get("pageId")+'&count='+Session.get('numberOfCount'));             
   },
   'click #grannyLogo' : function()  {
      Session.set('categoryName','');    
      Router.go('/');
   },
   'click #askQuestion' : function() {
      if (!$('#questionArea').val()) {
          // $('#questionEmptyInfo').html('Please enter question');
            Materialize.toast('Please enter your question', 3000, 'error-toast');          
      } else if (!Meteor.userId()) {
        Session.set('question',$('#questionArea').val());
         Meteor.setTimeout(function() {
            $(window).scrollTop(0);  
          },300);
          $('#question_modal').closeModal();
          $('#userLoginForm').openModal();
      } else {
        Session.set('question',$('#questionArea').val());
          Meteor.setTimeout(function(){
            $(window).scrollTop(0);
              $('#question_modal').closeModal();
              $('#questionArea').val("");
              if($("label").hasClass("active")) {
               $("label").removeClass("active")
              }  
            Router.go('/ask');
          },300);
      }
      Meteor.setTimeout(function(){
          $('#questionEmptyInfo').html('');
      }, 3200);        
   },   
});

Template.home.events({
    'click #read-more,.card-title': function () {
      var postId = this._id;
      var postTitle = this.title;
      Session.set('selectedPageId',Session.get("pageId"));         
      Session.set('selectedPostId', postId);
      Meteor.setTimeout(function() {
        // Router.go("/tam/post/"+postTitle+"/"+postId);
            $(location).attr('href',"tam/post/"+postTitle+"/"+postId);

          Meteor.setTimeout(function(){
            $(window).scrollTop(0);
          },10);
      }, 100);
    },
   'click #search' : function () {
        if(!$('#searchQuery').val()) {
            $('#searchEmptyInfo').html('Please enter search string');
        } else {
            $(window).scrollTop(572);
            $('#search_modal').closeModal();
            Router.go('/posts?queryString='+$('#searchQuery').val());
            $('#searchQuery').val("");
            if($("label").hasClass("active")) {
               $("label").removeClass("active")
            }            
        }
        Meteor.setTimeout(function(){
          $('#searchEmptyInfo').html('');
        }, 3500);        
    },
    'keyup #searchQuery' : function(e){
      if (e.which == 13) {
          if (!$('#searchQuery').val()) {
              $('#searchEmptyInfo').html('Please enter search string');
          } else {
            $(window).scrollTop(572);
            $('#search_modal').closeModal();
            Router.go('/posts?queryString='+$('#searchQuery').val());
            $('#searchQuery').val("");                        
          }        
      }
      Meteor.setTimeout(function(){
        $('#searchEmptyInfo').html('');
      }, 3500);       
    },     
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
      $('#Usererr').html("Please enter username");
      return;
    } else if(new_email == '') {
      $('#Usererr').html("Please enter email");
      return;
    } else if(new_password == '') {
      $('#Usererr').html("Please enter password");
      return;
    } else if(repassword == '') {
      $('#Usererr').html("Please enter confirm password");
      return;
    } else if (new_password != repassword) {
      $('#Usererr').html("Your password and confirmation password do not match");
      return;
    }

    var userDetail = { "email": new_email, "username":  first_name, "password": new_password }

      Accounts.createUser(userDetail, function(error){
        if(error){
            $('#Usererr').html(error.reason);
        } else if(!$('#questionArea').val()) {
            $('#Usererr').html("Account has been created and logged in successfully.");
            Meteor.setTimeout(function () {
              $('#userRegistrationForm').closeModal();
            },2000);
          } else {
            $('#Usererr').html("Account has been created and logged in successfully.");
            Meteor.setTimeout(function () {
              $('#userRegistrationForm').closeModal();              
              Router.go('/ask')
            },2000);
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
   }
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

      // ratings: function() {
        // console.log("functionalities " + this.postId);
        // var counts = rating.find({postId: Session.get('routePostId')}).count();
        // var rate = rating.find({postId: Session.get('routePostId')});

        // var counts = rating.find({postId: this.postId}).count();
        // var rate = rating.find({postId: this.postId});
        // var sum = 0;
        // rate.forEach(function(item)  {
        //   sum = sum + item.points;
        // });
        // var average = sum/counts;

        // console.log("Average Rating " + average);
        
        // return {
        //   rating : average,
        //   count: counts
        // };
      // },

      postCreatedBy : function(createdById) {
        var userDoc = Meteor.users.findOne({_id: createdById});
        return userDoc.username;        
      },
      locationUrl: function() {
        // console.log('location by router.go...........'+window.location.href);
        // return "http://www.google.com";
        return window.location.href;
        // return "http://www.grannytherapy.com/tam/மணலிக்கீரை/";
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
                  if(Session.get('subCategory')) {
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
   this.$('.rateit').rateit();
   var routepostId = this.data.postId;

   this.$('.rateit').bind('rated', function(event, value) {
          if(!Meteor.userId()){
            $('#userLoginForm').openModal();
          } else {
            // alert(Meteor.userId() +  " , " + Session.get('selectedPostId') + " , " + value);
            // Meteor.call('insertrating', Meteor.userId(), Session.get('routePostId'), value);
            // alert(Meteor.userId() +  " , " + routepostId + " , " + value);
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
