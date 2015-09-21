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
            } else {
                $(location).attr('href', '/ask');
            }
        });
        return false;

	},

	'submit #signUp' : function(e, t) {
		e.preventDefault();
		var firstname = t.find('#firstname').value;
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
		var userEmailExists = typeof Meteor.users.findOne({email: new_email}) === 'object';
		// console.log(userEmailExists);

		var userDetail = { 
        		email: new_email, 
        		password: new_password 
        	}
		
			if(!userEmailExists){
	        	Accounts.createUser(userDetail, function(error){
		            if(error){
		                $('#Usererr').html(error.reason);
		            } else {
		                console.log("Register Success");
		            }
	        	});
	        	return false;	
        	}
	}
});