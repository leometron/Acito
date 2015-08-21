//Routes related to plugin BHS
Router.route('/admin/BHS', function () {
    this.render('BHSMain');
});
Router.route('/admin/BHS/CodingRules', function () {
    this.render('BHSCodingRules');
});
Router.route('/admin/BHS/DSM-5', function () {
    this.render('BHSDSM');
});
Router.route('/admin/BHS/ICD-10', function () {
    this.render('BHSICD');
});