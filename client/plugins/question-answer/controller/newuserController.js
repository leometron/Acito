Template.userLogin.events( {
	'submit #userLogin': function(e, t) {
		 e.preventDefault();
        var email = t.find('#email').value, password = t.find('#password').value;
        if(email == ''){
            $('#errorMsg').html("Please enter user name");
            return;
        } else if(password == '') {
            $('#errorMsg').html("Please enter password");
            return;
        }

	},

	'submit #signUp' : function(e, t) {
		e.preventDefault();
		var firstname = t.find('#firstname').value, lastname = t.find('#lastname').value;
		var email = t.find('#upemail').value, password = t.find('#signpassword').value;
		var repassword = t.find('#re-password').value;

		if(firstname == '') {
			$('#Usererr').html("Please enter First Name");
			return;
		} else if(lastname == '') {
			$('#Usererr').html("Please enter Last Name");
			return;
		} else if(email == '') {
			$('#Usererr').html("Please enter Email Id");
			return;
		} else if(password == '') {
			$('#Usererr').html("Please enter Password");
			return;
		} else if(repassword == '') {
			$('#Usererr').html("Please enter Confirm Password");
			return;
		}

	}
});