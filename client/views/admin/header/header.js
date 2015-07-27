var mainTitle;
Template.adminHeader.helpers({
    'navBarList' : function(){
        return [
            {'title': 'dashboard'},
            {'title': 'posts', 'subtitle': [{'sTitle':'add','title': 'posts','name':'AddNew'},{'sTitle':'categories','title': 'posts','name':'Categories'},{'sTitle':'tags','title': 'posts','name':'Tags'}]},
            {'title': 'LatestNews'},
            {'title': 'HomeSliders'},
            {'title': 'media','subtitle': [{'sTitle':'add','title': 'media','name':'AddNew'}]},
            {'title': 'pages','subtitle': [{'sTitle':'add','title': 'pages','name':'AddNew'}]},
            {'title': 'Settings'},
            {'title': 'SEO'},
            {'title': 'Types'},
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

    console.log(navBar)

};

