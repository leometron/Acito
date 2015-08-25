Meteor.subscribe("DSM");
Meteor.subscribe("subSection");

var select_data = [];

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
            $('#DSMSectionName').val("");
            $('#DSMSectionName').attr('placeholder','Section');
            $('#sectionCode').val("");
            $('#sectionCode').attr('placeholder','Code');                          
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
            $('#DSMSubSectionName').val("");
            $('#DSMSubSectionName').attr('placeholder','Sub Section');
            $('#subSectionCode').val("");
            $('#subSectionCode').attr('placeholder','Code');                           
	    },
	    'click #cancelDSMSection' : function () {
	        $('#minimizeDSMSection').hide();
	        $('#addNewDSMSection').show();
	        $('#chooseDSMSectionName').fadeOut(500);
            $('#DSMSectionName').val("");
            $('#DSMSectionName').attr('placeholder','Section');
            $('#sectionCode').val("");
            $('#sectionCode').attr('placeholder','Code');                         
	    },
	    'click #cancelDSMSubSection' : function () {
	        $('#minimizeDSMSubSection').hide();
	        $('#addNewDSMSubSection').show();
	        $('#chooseDSMSubSectionName').fadeOut(500);
            $('#DSMSubSectionName').val("");
            $('#DSMSubSectionName').attr('placeholder','Sub Section');
            $('#subSectionCode').val("");
            $('#subSectionCode').attr('placeholder','Code');                            
	    },

	'click #saveDSMSection': function () {
        if (!$('#DSMSectionName').val()) {
            Session.set('errorMessage', 'Section name is required');
        } else {
            $('#minimizeDSMSection').hide();
            $('#addNewDSMSection').show();
            $('#chooseDSMSectionName').fadeOut(500);
            Session.set('errorMessage', '');
            var sectionCode = (!$('#sectionCode').val() ) ? "-" : $('#sectionCode').val();
            Meteor.call('insertSection', $('#DSMSectionName').val(), sectionCode, "DSM");
            $('#DSMSectionName').val("");
            $('#sectionCode').val("");
            $('#DSMSectionName').attr('placeholder','Section');
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
            $('#minimizeDSMSubSection').hide();
            $('#addNewDSMSubSection').show();
            $('#chooseDSMSubSectionName').fadeOut(500);            
            Session.set('errorMessage', '');
            var subSectionCode = (!$('#subSectionCode').val() ) ? "-" : $('#subSectionCode').val();
            Meteor.call('insertSubSection', sectionId, sectionName, $('#DSMSubSectionName').val(), subSectionCode);
            $('#DSMSubSectionName').val("");
            $('#subSectionCode').val("");
            $('#DSMSubSectionName').attr('placeholder','Sub Section');
        }
        Meteor.setTimeout(function () {
            Session.set('errorMessage','')
        }, 2000);           
    },
    'click #saveCurrentDSMPost': function () {
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
            $('#cancelCurrentDSMPost').hide();            
            Meteor.call('insertDSM',sectionId,sectionName,subSectionId,subSectionName,dsmCode,dsmDetail,Session.get('currentDSMid'));
            if (Session.get('currentDSMid')) {
                Session.set('BHSSuccessMessage', 'DSM '+ dsmCode + ' successfully updated');               
            } else {
                Session.set('BHSSuccessMessage', 'DSM '+ dsmCode + ' successfully saved');            
            }
            Meteor.setTimeout(function () {
                Session.set('BHSSuccessMessage', ''),Session.set('currentDSMid',''),$('#sectionList').val("Select"),
                $('#subSectionList').val("Select"),$('#DSMCode').val(""),$('#DSMDetail').val(""),
                $('#DSMCode').attr("placeholder","DSMCode"),$('#DSMDetail').attr("placeholder","Detail")
            }, 2600);            
        }
        Meteor.setTimeout(function () {
            Session.set('errorMessage','')
        }, 2000);    
    },
    'click .DSM-data-row' : function () {
        Session.set('currentDSMid',this._id);
    },
    'click #cancelCurrentDSMPost': function () {
        Session.set('currentDSMid','');
        $('#sectionList').val("Select");
        $('#subSectionList').val("Select");        
    },
    'click .menuitem2': function (event) {
        $('#actiondropdown').text($(event.target).text());
    },
    'click #checkbox': function (event) {
        var selectcheck = event.target.checked;
        if (selectcheck == true) {
            select_data.push(this._id);
        } else {
            var index = select_data.indexOf(this._id);
            select_data.splice(index, 1);
        }
    },
    'click #apply': function () {
        Meteor.call('removeSelectDsm', select_data, $('#actiondropdown').text());
    },
    'change #sectionList': function() {
        if($('#sectionList :selected').val() != "Select"){
             Session.set("subsectionselectId", $('#sectionList :selected').val());
        } else {
            Session.set("subsectionselectId", "");
        }
    }
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
    },
    'subSectionSelectList' :function() {
        var subvalue = Session.get("subsectionselectId");
        return subvalue;
    }
});


Template.BHSDSM.rendered = function () {
	$('#chooseDSMSectionName').hide();
    $('#chooseDSMSubSectionName').hide();
    $('#minimizeDSMSection').hide();
    $('#minimizeDSMSubSection').hide();
};
