Meteor.subscribe("section");
Meteor.subscribe("ICD");

Template.BHSICD.events({
	'click #saveSection': function () {
        if (!$('#sectionName').val()) {
            Session.set('errorMessage', 'Section name is required');
        } else {
            $('#minimizeAddNewSection').hide();
            $('#addNewSection').show();
            $('#chooseSectionName').fadeOut(500);
            Session.set('errorMessage', '');
            Meteor.call('insertSection', $('#sectionName').val(),"ICD");
            $('#sectionName').val("");
            $('#sectionName').attr('placeholder','Section Name');
        }
        Meteor.setTimeout(function () {
            Session.set('errorMessage','')
        }, 2000);	        
    },
    'click #addNewSection' : function () {
        $('#addNewSection').hide();
        $('#minimizeAddNewSection').show();
        $('#chooseSectionName').fadeIn(500);
    },
    'click #minimizeAddNewSection' : function () {
        $('#minimizeAddNewSection').hide();
        $('#addNewSection').show();
        $('#chooseSectionName').fadeOut(500);
    },
    'click #cancelSection' : function () {
        $('#minimizeAddNewSection').hide();
        $('#addNewSection').show();
        $('#chooseSectionName').fadeOut(500);
    },
    'click #saveCurrentICDPost': function () {
    	$('#cancelCurrentICDPost').hide()
    	var sectionName = $('#sectionList :selected').text();
		var sectionId = $('#sectionList').val();    	
    	var icdCode = $('#ICDCode').val();
    	var ICDDetail = $('#ICDDetail').val();

		if (sectionName == "Select") {
			Session.set('errorMessage','Please select section');
		} else if(!icdCode) {
			Session.set('errorMessage','ICD Code is Required');
		} else if(!ICDDetail) {
			Session.set('errorMessage','ICD Detail is Required');
		} else {
			Meteor.call('insertICD',sectionName,sectionId,icdCode,ICDDetail,Session.get('currentICDid'));
            Session.set('BHSSuccessMessage', 'ICD '+ icdCode + ' successfully saved');
            Meteor.setTimeout(function () {
                // $('#sectionList').text("Choose Section");
                console.log('........'+$('#sectionList').val());
                Session.set('BHSSuccessMessage', ''),Session.set('currentICDid',''),$('#sectionList').val("Select")
            }, 2000);			
		}
        Meteor.setTimeout(function () {
            Session.set('errorMessage','')
        }, 2000);		
    },
    'click .ICD-data-row' : function () {
    	Session.set('currentICDid',this._id);
    },
    'click #cancelCurrentICDPost' : function () {
    	Session.set('currentICDid','');
    	// $('#ICDCode').attr("placeholder", "ICD Code");
    },
});


Template.BHSICD.helpers({
    'sectionList': function () {
        return section.find();
    },
    'ICDList': function() {
    	return ICD.find();
    },
    'selectedICD' : function () {
    	return ICD.findOne(Session.get('currentICDid'));    	
    }
});


Template.BHSICD.rendered = function () {
    $('#minimizeAddNewSection').hide();
    $('#chooseSectionName').hide();
};

Template.adminTop.helpers({
	'errormsg' : function() {
		return Session.get('errorMessage');
	},
	'BHSSuccessMessage' : function() {
		return Session.get('BHSSuccessMessage');		
	}
});

Template.adminHeader.events({
    'click #subNavBarBHSICD-10': function () {
        Meteor.call('showSection','ICD');
    },
    'click #subNavBarBHSDSM-5': function () {
        Meteor.call('showSection','DSM');        
    }
});