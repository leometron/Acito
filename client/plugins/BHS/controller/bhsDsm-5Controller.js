Meteor.subscribe("DSM");

Template.BHSDSM.events({
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
        if (!$('#DSMSectionName').val()) {
            Session.set('errorMessage', 'Section name is required');
        } else if (!$('#DSMSubSectionName').val()) {
            Session.set('errorMessage', 'Sub Section name is required');
        } else {
            $('#chooseDSMSubSectionName').fadeOut(500);
            Session.set('errorMessage', '');
            Meteor.call('insertSubSection', $('#DSMSectionName').val(), $('#DSMSubSectionName').val());
            $('#DSMSubSectionName').val("");
            $('#DSMSubSectionName').attr('placeholder','Sub Section Name');
        }
        Meteor.setTimeout(function () {
            Session.set('errorMessage','')
        }, 2000);           
    },    
 //    'click #addNewSection' : function () {
 //        $('#chooseSectionName').fadeIn(500);
 //    },
 //    'click #cancelSection' : function () {
 //        $('#chooseSectionName').fadeOut(500);
 //    },
 //    'click #saveCurrentICDPost': function () {
 //    	$('#cancelCurrentICDPost').hide()
 //    	var sectionName = $('#sectionList :selected').text();
	// 	var sectionId = $('#sectionList').val();    	
 //    	var icdCode = $('#ICDCode').val();
 //    	var ICDDetail = $('#ICDDetail').val();

	// 	if (sectionName == "Select") {
	// 		Session.set('errorMessage','Please select section');
	// 	} else if(!icdCode) {
	// 		Session.set('errorMessage','ICD Code is Required');
	// 	} else if(!ICDDetail) {
	// 		Session.set('errorMessage','ICD Detail is Required');
	// 	} else {
	// 		Meteor.call('insertICD',sectionName,sectionId,icdCode,ICDDetail,Session.get('currentICDid'));
 //            Session.set('BHSSuccessMessage', 'ICD '+ icdCode + ' successfully saved');
 //            Meteor.setTimeout(function () {
 //                // $('#sectionList').text("Choose Section");
 //                console.log('........'+$('#sectionList').val());
 //                Session.set('BHSSuccessMessage', ''),Session.set('currentICDid',''),$('#sectionList').val("Select")
 //            }, 2000);			
	// 	}
 //        Meteor.setTimeout(function () {
 //            Session.set('errorMessage','')
 //        }, 2000);		
 //    },
 //    'click .ICD-data-row' : function () {
 //    	Session.set('currentICDid',this._id);
 //    },
 //    'click #cancelCurrentICDPost' : function () {
 //    	Session.set('currentICDid','');
 //    	// $('#ICDCode').attr("placeholder", "ICD Code");
 //    },
});


Template.BHSDSM.helpers({
    'sectionList': function () {
        return section.find({type:"DSM"});
    },
    // 'ICDList': function() {
    // 	return ICD.find();
    // },
    // 'selectedICD' : function () {
    // 	return ICD.findOne(Session.get('currentICDid'));    	
    // }
});


Template.adminTop.helpers({
	'BHSErrorMsg' : function() {
		return Session.get('errorMessage');
	},
	'BHSSuccessMessage' : function() {
		return Session.get('BHSSuccessMessage');		
	}
});