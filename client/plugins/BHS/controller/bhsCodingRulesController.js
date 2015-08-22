Meteor.subscribe("codingRules");

Template.BHSCodingRules.events({
	'click #saveCurrentCodingRules' : function() {
		var code = $('#codingRulesCode').val();
		var guideline = $('#codingRulesGuideline').val();
		var definition = $('#codingRulesDefinition').val();
			if(!code) {
				Session.set('errorMessage','Code Reference is Required');
			} else if(!guideline) {
				Session.set('errorMessage','Coding and Documentation Guideline is Required');
			} else if (!definition) {
				Session.set('errorMessage','Coding and Guideline Definition is Required');
			} else {
				Meteor.call('insertCodingRules', code, guideline, definition, Session.get('currentCodingRulesid'));
				Session.set('BHSSuccessMessage', 'CodeRules Successfully Saved');
				Meteor.setTimeout(function () {
	                Session.set('BHSSuccessMessage', ''),$('#codingRulesCode').val(""),$('#codingRulesGuideline').val(""),
	                $('#codingRulesDefinition').val(""), Session.set('currentCodingRulesid','');
            	}, 2000);  
			}
			Meteor.setTimeout(function () {
            	Session.set('errorMessage','')
        	}, 2000);
	},
	'click .CodingRules-data-row' : function() {
		Session.set('currentCodingRulesid',this._id);
	},
	'click .cancelCurrentId' : function () {
    	Session.set('currentCodingRulesid','');
    },
});

Template.BHSCodingRules.helpers({
	'codingRulesList': function () {
        return codingRules.find();
    },
    'selectedCodingRules' : function () {
    	return codingRules.findOne(Session.get('currentCodingRulesid'));        
    }
});

Template.BHSCodingRules.rendered = function () {
	
};

Template.adminTop.helpers({
	'BHSErrorMsg' : function() {
		return Session.get('errorMessage');
	},
	'BHSSuccessMessage' : function() {
		return Session.get('BHSSuccessMessage');		
	}
});