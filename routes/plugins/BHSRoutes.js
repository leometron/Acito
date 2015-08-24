//Routes related to plugin BHS admin 
Router.route('/admin/BHS/CodingRules', function () {
    this.render('BHSCodingRules');
});
Router.route('/admin/BHS/DSM-5', function () {
    this.render('BHSDSM');
});
Router.route('/admin/BHS/ICD-10', function () {
    this.render('BHSICD');
});

//Routes related to plugin BHS client 

Router.route('/list', {
	layoutTemplate: '',
	 data: function () {
	 	this.render('BHSlist');
	 }
});