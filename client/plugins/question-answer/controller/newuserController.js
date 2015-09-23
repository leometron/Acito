Template.userLogin.events( {
	'submit #userLogin': function(e, t) {
		 e.preventDefault();
        var email = t.find('#email').value, password = t.find('#password').value;
        if(email == ''){
            $('#errorMsg').html("Please enter email id");
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

		if(firstname == '') {
			$('#Usererr').html("Please enter name");
			return;
		} else if(new_email == '') {
			$('#Usererr').html("Please enter email id");
			return;
		} else if(new_password == '') {
			$('#Usererr').html("Please enter password");
			return;
		} else if(repassword == '') {
			$('#Usererr').html("Please enter confirm password");
			return;
		} else if (new_password != repassword) {
			$('#Usererr').html("Password and confirm password are not same");
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