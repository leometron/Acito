Meteor.subscribe("section");
Meteor.subscribe("ICD");

Template.BHSICD.events({
	'click #saveSection': function () {
        if (!$('#sectionName').val()) {
            Session.set('errorMessage', 'Section name is required');
        } else {
            Session.set('errorMessage', '');
            Meteor.call('insertSection', $('#sectionName').val());
        }
    },
    'click #saveCurrentICDPost': function () {
    	var sectionName = $('#sectionList :selected').text();
		var sectionId = $('#sectionList').val();    	
    	var icdCode = $('#ICDCode').val();
    	var ICDDetail = $('#ICDDetail').val();

		if (sectionName == "Choose Section") {
			Session.set('errorMessage','Please select the section');
		} else if(!icdCode) {
			Session.set('errorMessage','ICD Code is Required');
		} else if(!ICDDetail) {
			Session.set('errorMessage','ICD Detail is Required');
		} else {
    		Session.set('errorMessage','');			
			Meteor.call('insertICD',sectionName,sectionId,icdCode,ICDDetail);
            Session.set('BHSSuccessMessage', 'ICD '+ icdCode + ' successfully saved');
            Meteor.call('insertFeaturedImage', Session.get('selectFeaturedImage'), $('#pageId').val(), getUserName());
            Meteor.setTimeout(function () {
                Session.set('BHSSuccessMessage', ''),$('#ICDCode').val(""),$('#ICDDetail').val("")
            }, 2000);			
		}
    }
});


Template.BHSICD.helpers({
    'sectionList': function () {
        return section.find();
    },
});

Template.adminTop.helpers({
	'BHSErrorMsg' : function() {
		return Session.get('errorMessage');
	},
	'BHSSuccessMessage' : function() {
		return Session.get('BHSSuccessMessage');		
	}
});