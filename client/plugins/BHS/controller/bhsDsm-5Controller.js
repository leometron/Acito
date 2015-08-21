Meteor.subscribe("DSM");
Meteor.subscribe("subSection");

Template.BHSDSM.events({
	    'click #addNewDSMSection' : function () {
	    	$('#addNewDSMSection').hide();
	    	$('#minimizeDSMSection').show();
	        $('#chooseDSMSectionName').fadeIn(500);
	    },
	    'click #minimizeDSMSection' : function () {
	        $('#minimizeDSMSection').hide();
	        $('#addNewDSMSection').show();
	        $('#chooseDSMSectionName').fadeOut(500);
	    },
	    'click #addNewDSMSubSection' : function () {
	     	$('#addNewDSMSubSection').hide();
	     	$('#minimizeDSMSubSection').show();
	        $('#chooseDSMSubSectionName').fadeIn(500);
	    },
	    'click #minimizeDSMSubSection' : function () {
	        $('#minimizeDSMSubSection').hide();
	        $('#addNewDSMSubSection').show();
	        $('#chooseDSMSubSectionName').fadeOut(500);
	    },
	    'click #cancelDSMSection' : function () {
	        $('#minimizeDSMSection').hide();
	        $('#addNewDSMSection').show();
	        $('#chooseDSMSectionName').fadeOut(500);
	    },
	    'click #cancelDSMSubSection' : function () {
	        $('#minimizeDSMSubSection').hide();
	        $('#addNewDSMSubSection').show();
	        $('#chooseDSMSubSectionName').fadeOut(500);
	    },

	'click #saveDSMSection': function () {
        if (!$('#DSMSectionName').val()) {
            Session.set('errorMessage', 'Section name is required');
        } else {
            $('#chooseDSMSectionName').fadeOut(500);
            Session.set('errorMessage', '');
            Meteor.call('insertSection', $('#DSMSectionName').val(),"DSM");
            $('#DSMSectionName').val("");
            $('#DSMSectionName').attr('placeholder','Section Name');
        }
        Meteor.setTimeout(function () {
            Session.set('errorMessage','')
        }, 2000);	        
    },

    'click #saveDSMSubSection': function () {
        var sectionName = $('#sectionList :selected').text();
        var sectionId = $('#sectionList').val();
        if (sectionName == "Select") {
            Session.set('errorMessage', 'Please select section');
        } else if (!$('#DSMSubSectionName').val()) {
            Session.set('errorMessage', 'Sub Section name is required');
        } else {
            Session.set('errorMessage', '');
            Meteor.call('insertSubSection', sectionId, sectionName, $('#DSMSubSectionName').val());
            $('#DSMSubSectionName').val("");
            $('#DSMSubSectionName').attr('placeholder','Sub Section Name');
        }
        Meteor.setTimeout(function () {
            Session.set('errorMessage','')
        }, 2000);           
    },
    'click #saveCurrentDSMPost': function () {
        // $('#cancelCurrentICDPost').hide()
        var sectionName = $('#sectionList :selected').text();
        var sectionId = $('#sectionList').val();
        var subSectionName = $('#subSectionList :selected').text();
        var subSectionId = $('#subSectionList').val();        
        var dsmCode = $('#DSMCode').val();
        var dsmDetail = $('#DSMDetail').val();

        if (sectionName == "Select") {
            Session.set('errorMessage','Please select section');
        } else if (subSectionName == "Select") {
            Session.set('errorMessage','Please select sub section');            
        }  else if(!dsmCode) {
            Session.set('errorMessage','DSM Code is Required');
        } else if(!dsmDetail) {
            Session.set('errorMessage','DSM Detail is Required');
        } else {
        Meteor.call('insertDSM',sectionId,sectionName,subSectionId,subSectionName,dsmCode,dsmDetail,Session.get('currentDSMid'));
            Session.set('BHSSuccessMessage', 'DSM '+ dsmCode + ' successfully saved');
            Meteor.setTimeout(function () {
                Session.set('BHSSuccessMessage', ''),Session.set('currentDSMid',''),$('#sectionList').val("Select"),
                $('#subSectionList').val("Select"),$('#DSMCode').val(""),$('#DSMDetail').val(""),
                $('#DSMCode').attr("placeholder","DSMCode"),$('#DSMDetail').attr("placeholder","Detail")
            }, 2000);            
        }
        Meteor.setTimeout(function () {
            Session.set('errorMessage','')
        }, 2000);    
    },
    'click .DSM-data-row' : function () {
        Session.set('currentDSMid',this._id);
    },        
});


Template.BHSDSM.helpers({
    'sectionList': function () {
        return section.find({type:"DSM"});
    },
    'subSectionList': function () {
        return subSection.find();
    },
    'DSMList': function () {
        return DSM.find();
    },
    'selectedDSM' : function () {
        return DSM.findOne(Session.get('currentDSMid'));        
    } 
});


Template.BHSDSM.rendered = function () {
	$('#chooseDSMSectionName').hide();
    $('#chooseDSMSubSectionName').hide();
    $('#minimizeDSMSection').hide();
    $('#minimizeDSMSubSection').hide();
};

Template.adminTop.helpers({
	'BHSErrorMsg' : function() {
		return Session.get('errorMessage');
	},
	'BHSSuccessMessage' : function() {
		return Session.get('BHSSuccessMessage');		
	}
});