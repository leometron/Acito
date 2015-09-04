//Routes related to plugin BHS admin 
Router.route('/admin/CodingRules', function () {
    if(Meteor.userId()) {    
    	this.render('BHSCodingRules');
    } else {
        alert('please login');
        Router.go('admin');
    }  	
});
Router.route('/admin/DSM-5', function () {
    if(Meteor.userId()) {    
    	this.render('BHSDSM');
    } else {
        alert('please login');
        Router.go('admin');
    }  	
});
Router.route('/admin/ICD-10', function () {
    if(Meteor.userId()) {    
    	this.render('BHSICD');
    } else {
        alert('please login');
        Router.go('admin');
    }  	
});