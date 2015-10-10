Template.adminLogin.events({
    'submit #frmLogin': function (e, t) {
        e.preventDefault();
        var email = t.find('#login-email').value, password = t.find('#login-password').value;
        if(email == ''){
            Materialize.toast('Please enter user name', 3000, 'error-toast');
            return;
        } else if(password == '') {
            Materialize.toast('Please enter password', 3000, 'error-toast');
            return;
        }

        // If validation passes, supply the appropriate fields to the
        // Meteor.loginWithPassword() function.
        Meteor.loginWithPassword(email, password, function (err) {
            if(err){
                Materialize.toast('Invalid user name or Password', 3000, 'error-toast');
            } else {
                $(location).attr('href', '/admin/dashboard');
            }
        });
        return false;
    },
    'click .loginalertbtn' : function() {
        $('.loginalert').hide();
    }
});

Template.adminTop.events({
    'click #logout' : function () {
        $('.logout-icon').show();
        Meteor.setTimeout(function () {
            $('.logout-icon').hide();
            Meteor.logout();
            Router.go('admin');                                    
        }, 2000); 
    }
});

Template.adminTop.rendered = function(){
    $('.logout-icon').hide();
}

Template.adminLogin.rendered = function(){
    $('.loginalert').hide();
}
