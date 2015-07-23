Template.adminHeader.helpers({
    'navBarList' : function(){
        return [
            {'title': 'Dashboard'},
            {'title': 'Posts', 'subtitle': ['AddNew','Categories','Tags']},
            {'title': 'LatestNews'},
            {'title': 'investors'},
            {'title': 'OurWorks'},
            {'title': 'HomeSliders'},
            {'title': 'Media'},
            {'title': 'Pages'},
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
