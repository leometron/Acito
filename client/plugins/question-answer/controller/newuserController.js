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
			$('#Usererr').html("Please enter first name");
			return;
		} else if(lastname == '') {
			$('#Usererr').html("Please enter last name");
			return;
		} else if(email == '') {
			$('#Usererr').html("Please enter email id");
			return;
		} else if(password == '') {
			$('#Usererr').html("Please enter password");
			return;
		} else if(repassword == '') {
			$('#Usererr').html("Please enter confirm password");
			return;
		} else if (password != repassword) {
			$('#Usererr').html("Password and confirm password are not same");
			return;
		}

		// user = {
		// 	username: firstname,
		// 	password: password,
		// 	email: email,
		// 	profile: {
		// 		name: lastname
		// 	}
		// }
		
		// Accounts.createUser({ firstname: firstname, lastname: lastname, email: email, password:password,
		// repassword: repassword }, function(error){
  //           if(error){
  //               console.log(error.reason);
  //               $('#Usererr').html(error.reason);
  //           } else {
  //               //Router.go("login");
  //               console.log("Register Success");
  //           }
  //       });
  //       return false;
	}
});