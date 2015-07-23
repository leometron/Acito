Template.adminHeader.helpers({
    'navBarList' : function(){
        return [
            {'title': 'dashboard'},
            {'title': 'posts', 'subtitle': [{'sTitle':'add_new_post','name':'AddNew'},{'sTitle':'categories','name':'Categories'},{'sTitle':'tags','name':'Tags'}]},
            {'title': 'LatestNews'},
            {'title': 'investors'},
            {'title': 'OurWorks'},
            {'title': 'HomeSliders'},
            {'title': 'Media'},
            {'title': 'pages','subtitle': [{'sTitle':'add_new_page','name':'AddNew'}]},
            {'title': 'Settings'},
            {'title': 'SEO'},
            {'title': 'Types'},
            {'title': 'collapseMenu'}
        ]
    }

});

Template.adminHeader.rendered = function () {

    var pathname = window.location.pathname.split('/')[1];
    var pathname1 = window.location.pathname.split('/')[2];
    if(pathname == 'admin' && pathname1 != undefined){
        $('#header').show();
        $('#main_view').removeClass('full-width');
    }else{
        $('#header').hide();
        $('#main_view').addClass('full-width');
    }


};
