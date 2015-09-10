//Routes related to plugin BHS admin 
Router.route('/admin/CodingRules', function () {
    if(Meteor.userId()) {    
    	this.render('BHSCodingRules');
    } else {
        $('.loginalert').show();
        Router.go('admin');
    }  	
});
Router.route('/admin/DSM-5', function () {
    if(Meteor.userId()) {    
    	this.render('BHSDSM');
    } else {
        $('.loginalert').show();
        Router.go('admin');
    }  	
});
Router.route('/admin/ICD-10', function () {
    if(Meteor.userId()) {    
    	this.render('BHSICD');
    } else {
        $('.loginalert').show();
        Router.go('admin');
    }  	
});