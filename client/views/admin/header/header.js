Meteor.subscribe("plugin");

var mainTitle;
var flag = true;
Template.adminlayout.helpers({
    'navBarList': function () {
        return [
            {'title': 'dashboard', 'maintitle': 'Dashboard', 'icon': 'fa-tachometer'},
            {
                'title': 'posts',
                'maintitle': 'Posts',
                'icon': 'fa-thumb-tack',
                'subtitle': [{'sTitle': 'add', 'title': 'posts', 'name': 'AddNew'}, {
                    'sTitle': 'tags',
                    'title': 'posts',
                    'name': 'Tags'
                }, {'sTitle': 'image', 'title': 'posts', 'name': 'FeaturedImage'}]
            },
            {
                'title': 'homeSliders',
                'maintitle': 'HomeSliders',
                'icon': 'fa-bars',
            },
            {
                'title': 'media',
                'maintitle': 'Media',
                'icon': 'fa-picture-o',
            },
            {
                'title': 'pages',
                'maintitle': 'Pages',
                'icon': 'fa-file'
            },
            {
                'title': 'questions',
                'maintitle': 'Questions'
            },
            {
                'title': 'answers',
                'maintitle': 'Answers'
            },
            {
                'title': 'users',
                'maintitle': 'Users'
            },                         
        ]
    },
    // 'pluginList': function () {
    //     return plugin.find();
    // }

});


Template.adminlayout.rendered = function () {
    // $('.plugin-submenu').hide();    
    $('#subNavBarpostsadd').hide();
    $('#subNavBarpostscategories').hide();
    $('#subNavBarpoststags').hide();
    $('#subNavBarmediaadd').hide();
    $('#subNavBarpagesadd').hide();
    $('#subNavBarHomeSlidersadd').hide();
    $('#subNavBarpostsimage').hide();
    $('#logoutSpinner').hide();
    var path = $(location).attr('pathname');
    var pathname = $(location).attr('pathname').split('/')[1];
    var pathname1 = $(location).attr('pathname').split('/')[2];    

    if(pathname === 'admin' && pathname1 != undefined && path != '/admin/'){
        $('#header').show();
        $('#navBardashboard').addClass('selected');
        $('#main_view').removeClass('full-width');
    } else {
        $('#header').hide();
        $('#main_view').addClass('full-width');
    }
};

Template.adminlayout.events({
    'click .item': function (events) {  
        var selectedId = $(events.currentTarget).attr("id");

        if (selectedId == 'navBardashboard') {
            $('#navBardashboard').addClass('selected');
            $('#navdashboard').css("color", "#FFFFFF");
        } else {
            $('#navBardashboard').removeClass('selected');
            $('#navdashboard').css("color", "#000000");
        }
        if (selectedId == 'navBarposts') {
            $('#navBarposts').addClass('selected');
            $('#navposts').css("color", "#FFFFFF");
        } else {
            $('#navBarposts').removeClass('selected');
            $('#navposts').css("color", "#000000");
        }
        if (selectedId == 'navBarmedia') {
            $('#navBarmedia').addClass('selected');
            $('#navmedia').css("color", "#FFFFFF");
        } else {
            $('#navBarmedia').removeClass('selected');
            $('#navmedia').css("color", "#000000");
        }
        if (selectedId == 'navBarpages') {
            $('#navBarpages').addClass('selected');
            $('#navpages').css("color", "#FFFFFF");
        } else {
            $('#navBarpages').removeClass('selected');
             $('#navpages').css("color", "#000000");
        }
        if (selectedId == 'navBarhomeSliders') {
            $('#navBarhomeSliders').addClass('selected');
            $('#navhomeSliders').css("color", "#FFFFFF");
        } else {
            $('#navBarhomeSliders').removeClass('selected');
            $('#navhomeSliders').css("color", "#000000");
        }
        if(selectedId == 'navBarquestions') {
            $('#navBarquestions').addClass('selected');
            $('#navquestions').css("color", "#FFFFFF");    
        } else {
            $('#navBarquestions').removeClass('selected');
            $('#navquestions').css("color", "#000000");
        }
        if(selectedId == 'navBaranswers') {
            $('#navBaranswers').addClass('selected');
            $('#navanswers').css("color", "#FFFFFF");
        } else {
            $('#navBaranswers').removeClass('selected');
            $('#navanswers').css("color", "#000000")
        }
        if(selectedId == 'navBarusers') {
            $('#navBarusers').addClass('selected');
            $('#navusers').css("color", "#FFFFFF");
        } else {
            $('#navBarusers').removeClass('selected');
            $('#navusers').css("color", "#000000")
        }        
        if (selectedId == 'navBarsettings') {
            $('#navBarsettings').addClass('selected');
        } else {
            $('#navBarsettings').removeClass('selected');
        }
        if (selectedId == 'navBarthemes') {
            $('#navBarthemes').addClass('selected');
        } else {
            $('#navBarthemes').removeClass('selected');
        }
        if (this.title == 'posts') {
            $('#subNavBarpostsadd').show(800);
            $('#subNavBarpoststags').show(800);
            $('#subNavBarpostsimage').show(800);
        } else {
            $('#subNavBarpostsadd').hide(800);
            $('#subNavBarpoststags').hide(800);
            $('#subNavBarpostsimage').hide(800);
        }
        if (this.title == 'media') {
            $('#subNavBarmediaadd').show(800);
        } else {
            $('#subNavBarmediaadd').hide(800);
        }

        if (this.title == 'pages') {
            $('#subNavBarpagesadd').show(800);
        } else {
            $('#subNavBarpagesadd').hide(800);
        }
        if (this.title == 'HomeSliders') {
            $('#subNavBarHomeSlidersadd').show(800);
        } else {
            $('#subNavBarHomeSlidersadd').hide(800);
        }
    },
      'click .plugin': function(){
          if(flag){
            $('#second').show();
            $('#first').hide();
            $('.plugin-submenu').show(800);
            flag = false;
          } else {
            $('#second').hide();
            $('#first').show();
            $('.plugin-submenu').hide(800); 
            flag = true;
          }
      },
      'click #logout': function() {
            $('#logoutSpinner').show();
            Meteor.setTimeout(function () {
                $('#logoutSpinner').hide();
                Meteor.logout();
                Router.go('admin');                                    
        }, 2000); 
      }
});
