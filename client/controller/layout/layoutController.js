
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
           Router.go('/posts?pageId='+Session.get("pageId")+'&count='+Session.get('numberOfCount'));
         } else {
           var subPages = Pages.find({parentId: this._id,status:'Published'});
           var t ="";
           subPages.forEach(function(item){
               t += '<div class="sub-page" style="padding:8px 20px; color:#ffffff; border-bottom:1px solid #D1D1D1" name="'+item.title+'" id="'+item._id+'">'+item.title+'</div>';
           });
           $(".subpage"+this._id).html(t);        
         }      
       }     
  },
   'click .sub-page' : function(event){
      Session.set('categoryName',$(event.target).attr("name"));
      // alert(Session.set('postName',this._id));
      $('.button-collapse').sideNav('hide');
      Session.set("pageId", "");
      Session.set('numberOfCount', 6);
      Session.set('selectedPostId', "");
      Session.set("pageId", $(event.target).attr("id"));
      Session.set('postCount',Posts.find({pageId:Session.get("pageId")}).count());              
      Router.go('/posts?pageId='+Session.get("pageId")+'&count='+Session.get('numberOfCount'));             
   }, 
    // 'click .read-more' : function() {
    //     $(window).scrollTop(572);
    //     Router.go('/readmore?id='+ this._id);
    // }
});

Template.home.events({

  //  'click .parent-page' : function(){
  //  if($('.page'+this._id).hasClass('page-selection')){
  //    $('.page'+this._id).removeClass('page-selection');
  //    $(".subpage"+this._id).html('');
  //  } else {
  //    $('.page'+this._id).addClass('page-selection');
  //    var subPagesCount = Pages.find({parentId:this._id}).count();
  //    if(subPagesCount == 0) {
  //      Session.set("pageId", "");
  //      Session.set('numberOfCount', 6);
  //      Session.set('selectedPostId', "");
  //      Session.set("pageId",this._id);
  //      Session.set('postCount',Posts.find({pageId:Session.get("pageId")}).count());
  //      Router.go('/posts?pageId='+Session.get("pageId")+'&count='+Session.get('numberOfCount'));
  //    } else {
  //      var subPages = Pages.find({parentId: this._id,status:'Published'});
  //      var t ="";
  //      subPages.forEach(function(item){
  //          t += '<div class="sub-page" style="padding:8px 20px; color:#ffffff; border-bottom:1px solid #D1D1D1;" id="'+item._id+'">'+item.title+'</div>';
  //      });
  //      $(".subpage"+this._id).html(t);        
  //    }      
  //  }     
  // },
  //  'click .sub-page' : function(event){
  //     $('.button-collapse').sideNav('hide');
  //     Session.set("pageId", "");
  //     Session.set('numberOfCount', 6);
  //     Session.set('selectedPostId', "");
  //     Session.set("pageId", $(event.target).attr("id"));
  //     Session.set('postCount',Posts.find({pageId:Session.get("pageId")}).count());              
  //     Router.go('/posts?pageId='+Session.get("pageId")+'&count='+Session.get('numberOfCount'));             
  //  },
    // 'click #postTitle,.read-more,.feature-image': function () {
    //   var postId = this._id;
    //   Session.set('selectedPageId',Session.get("pageId"));         
    //   Session.set('selectedPostId', postId);
    //   // $('.image').css('-webkit-animation','mymove 2s').css('animation','mymove 2s').css('position','relative');
    //   Meteor.setTimeout(function(){
    //     Router.go("/post/"+postId);
    //       Meteor.setTimeout(function(){
    //         $(window).scrollTop(0);
    //       },10);
    //   }, 100);
    // },

    'click #read-more': function () {
      var postId = this._id;
      Session.set('selectedPageId',Session.get("pageId"));         
      Session.set('selectedPostId', postId);
      // $('.image').css('-webkit-animation','mymove 2s').css('animation','mymove 2s').css('position','relative');
      Meteor.setTimeout(function(){
        Router.go("/post/"+postId);
          Meteor.setTimeout(function(){
            $(window).scrollTop(0);
          },10);
      }, 100);
    },

   'click #askQuestion' : function() {
      if (!$('#questionArea').val()) {
        $('#questionEmptyInfo').show();
      } else if (!Meteor.userId()) {
        Session.set('question',$('#questionArea').val());
         Meteor.setTimeout(function() {
            $(window).scrollTop(0);  
          },300);
          // Router.go('/login');
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
          $('#questionEmptyInfo').hide();
      }, 5000);        
   },
   'click #search' : function () {
        if(!$('#searchQuery').val()) {
            $('#searchEmptyInfo').show();
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
          $('#searchEmptyInfo').hide();
        }, 5000);        
    },
    'keyup #searchQuery' : function(e){
      if (e.which == 13) {
          if (!$('#searchQuery').val()) {
            // $('#searchLabel').attr('data-error','please enter search string');
              $('#searchEmptyInfo').show();
          } else {
            $(window).scrollTop(572);
            $('#search_modal').closeModal();
            Router.go('/posts?queryString='+$('#searchQuery').val());
            $('#searchQuery').val("");                        
          }        
      }
      Meteor.setTimeout(function(){
        $('#searchEmptyInfo').hide();
      }, 5000);       
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
  'submit #userLogin': function(e, t) {
     e.preventDefault();
        var email = t.find('#email').value, password = t.find('#password').value;
        if(email == ''){
            $('#errorMsg').html("Please enter email or username");
            return;
        } else if(password == '') {
            $('#errorMsg').html("Please enter password");
            return;
        }

        Meteor.loginWithPassword(email, password, function (err) {
            if(err){
                $('#errorMsg').html("Invalid email or Password");
            } else if(!$('#questionArea').val()) {
              history.back();
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
    // var userEmailExists = typeof Meteor.users.findOne({email: new_email}) === 'object';
    // console.log(userEmailExists);

    var userDetail = { "email": new_email, "username":  first_name, "password": new_password }

      Accounts.createUser(userDetail, function(error){
        if(error){
            $('#Usererr').html(error.reason);
        } else if(!$('#questionArea').val()) {
            $('#Usererr').html("Account has been created and logged in successfully.");
            Meteor.setTimeout(function () {
              history.back()
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

      // Meteor.setTimeout(function () {
          //   $('#firstname').val(''), $('#upemail').val(''), $('#signpassword').val(''), $('#re-password').val(''), $('#Usererr').html("")
          // },3000);  
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
       // return Pages.find({parentId:'null',status:'Published'});
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
       var monthArr = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'November', 'December'];
       return monthArr[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear();
      },

      ratings: function() {
        var counts = rating.find({postId: Session.get('selectedPostId')}).count();
        var rate = rating.find({postId: Session.get('selectedPostId')});
        var sum = 0;
        rate.forEach(function(item)  {
          sum = sum + item.points;
        });
        // console.log("sum of points " + sum);
        // console.log("counts " + counts);
        var average = sum/counts;
        // console.log("average " + average);
        return {
          rating : average,
          count: counts
        };
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
                      }
                  }, 300);
                }
            }
        }
    });     
};

// Template.header.rendered = function () {
//    $(document).ready(function(){
//     $('.collapsible').collapsible({
//       accordion : false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
//     });
//   });     
// };

Template.home.rendered = function () {
   $('.posts-Over-text').hide();
    $('#questionDetail').hide();
    $('#questionEmptyInfo').hide();
    $('#searchEmptyInfo').hide();
    $('#loginDetail').hide();
    $('.leftContent').css('height',window.innerHeight-141);

   /* Meteor.setTimeout(function () {
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
    }*/
};

Template.postDetail.rendered = function() { 
   addTwitterWidget();
   this.$('.rateit').rateit();

    this.$('.rateit').bind('rated', function(event, value) {
          if(!Meteor.userId()){
            Router.go('/login');
          } else {
            // alert(Meteor.userId() +  " , " + Session.get('selectedPostId') + " , " + value);
            Meteor.call('insertrating', Meteor.userId(), Session.get('selectedPostId'), value);
          }
    });
};

function addTwitterWidget() {
    !function (d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0], 
            p = /^http:/.test(d.location) ? 'http' : 'https';
            id="";
            // console.log("all" + d.getElementById(id));
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
