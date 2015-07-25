Template.adminHeader.helpers({
    'navBarList' : function(){
        return [
            {'title': 'dashboard'},
            {'title': 'posts', 'subtitle': [{'sTitle':'add','name':'AddNew'},{'sTitle':'categories','name':'Categories'},{'sTitle':'tags','name':'Tags'}]},
            {'title': 'LatestNews'},
            {'title': 'investors'},
            {'title': 'OurWorks'},
            {'title': 'HomeSliders'},
            {'title': 'media','subtitle': [{'sTitle':'add_new_media','name':'AddNew'}]},
            {'title': 'pages','subtitle': [{'sTitle':'add_new_page','name':'AddNew'}]},
            {'title': 'Settings'},
            {'title': 'SEO'},
            {'title': 'Types'},
            {'title': 'collapseMenu'}
        ]
    }

});

Template.adminHeader.rendered = function () {

    var pathname = $(location).attr('pathname').split('/')[1];
    var pathname1 = $(location).attr('pathname').split('/')[2];
    if(pathname == 'admin' && pathname1 != undefined){
        $('#header').show();
        $('#main_view').removeClass('full-width');
    }else{
        $('#header').hide();
        $('#main_view').addClass('full-width');
    }

};

//Template.adminHeader.events ({
//    'click #navBar .nav': function(){
//        var mainTitle = this.title;
//        $(location).attr('href',mainTitle);
//
//    },
//    'click #subNavBar': function(){
//        var path = $(location).attr('pathname').split('/')[2];
//        var subTitle = this.stitle;
//        console.log(subTitle);
//        $(location).attr('href', subTitle);
//
//    }
//});

