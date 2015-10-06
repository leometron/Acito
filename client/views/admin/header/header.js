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
                // 'subtitle': [{'sTitle': 'add', 'title': 'posts', 'name': 'AddNew'}]                
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
                // 'subtitle': [{'sTitle': 'add', 'title': 'HomeSliders', 'name': 'AddNew'}]
            },
            {
                'title': 'media',
                'maintitle': 'Media',
                'icon': 'fa-picture-o',
                // 'subtitle': [{'sTitle': 'add', 'title': 'media', 'name': 'AddNew'}]
            },
            {
                'title': 'pages',
                'maintitle': 'Pages',
                'icon': 'fa-file'
                // 'subtitle': [{'sTitle': 'add', 'title': 'pages', 'name': 'AddNew'}]
            },
            // {'title': 'settings', 'maintitle': 'Settings', 'icon': 'fa-cog'},
            // {'title': 'themes', 'maintitle': 'Themes', 'icon': 'fa-paint-brush'},
            {
                'title': 'questions',
                'maintitle': 'Questions'
                // 'subtitle': [{'sTitle': 'add', 'title': 'pages', 'name': 'AddNew'}]
            },
            {
                'title': 'answers',
                'maintitle': 'Answers'
                // 'subtitle': [{'sTitle': 'add', 'title': 'pages', 'name': 'AddNew'}]
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
    // Meteor.setTimeout(function () {
    //     $('.plugin-submenu').hide(),
    //     $('#second').hide();
    // }, 500);
};

Template.adminlayout.events({
    'click .item': function (events) {  
        var selectedId = $(events.currentTarget).attr("id");

        if (selectedId == 'navBarICD-10') {
            $('#navBarICD-10').addClass('selected');
        } else {
            $('#navBarICD-10').removeClass('selected');
        }
        if (selectedId == 'navBarDSM-5') {
            $('#navBarDSM-5').addClass('selected');
        } else {
            $('#navBarDSM-5').removeClass('selected');
        }
        if (selectedId == 'navBarCodingRules') {
            $('#navBarCodingRules').addClass('selected');
        } else {
            $('#navBarCodingRules').removeClass('selected');
        }
                        
        if (selectedId == 'navBardashboard') {
            $('#navBardashboard').addClass('selected');
        } else {
            $('#navBardashboard').removeClass('selected');
        }
        if (selectedId == 'navBarposts') {
            $('#navBarposts').addClass('selected');
        } else {
            $('#navBarposts').removeClass('selected');
        }
        if (selectedId == 'navBarmedia') {
            $('#navBarmedia').addClass('selected');
        } else {
            $('#navBarmedia').removeClass('selected');
        }
        if (selectedId == 'navBarpages') {
            $('#navBarpages').addClass('selected');
        } else {
            $('#navBarpages').removeClass('selected');
        }
        if (selectedId == 'navBarhomeSliders') {
            $('#navBarhomeSliders').addClass('selected');
        } else {
            $('#navBarhomeSliders').removeClass('selected');
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
        if(selectedId == "navBarBHS") {
            $('#navBarBHS').addClass('selected');
        } else {
            $('#navBarBHS').removeClass('selected');
        }
        if (this.title != "BHS") {
            $('#second').hide();
            $('#first').show(); 
            $('.plugin-submenu').hide(800);
            flag = true;
        }
    },
      'click .plugin': function(){
          if(flag){
            // console.log("link ");
            $('#second').show();
            $('#first').hide();
            $('.plugin-submenu').show(800);
            flag = false;
          } else {
            $('#second').hide();
            $('#first').show();
            $('.plugin-submenu').hide(800); 
            // console.log("antoher link ");
            flag = true;
          }
      }
});
