Template.adminLogin.events({
    'submit #frmLogin': function (e, t) {
        e.preventDefault();
        var email = t.find('#login-email').value, password = t.find('#login-password').value;
        if(email == ''){
            $('#errorMsg').html("Please enter user name");
            return;
        } else if(password == '') {
            $('#errorMsg').html("Please enter password");
            return;
        }

        // If validation passes, supply the appropriate fields to the
        // Meteor.loginWithPassword() function.
        Meteor.loginWithPassword(email, password, function (err) {
            if(err){
                $('#errorMsg').html("Invalid user name or Password");
            } else {
                $(location).attr('href', '/admin/ICD-10');
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
