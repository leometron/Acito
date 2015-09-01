Meteor.subscribe("section");
Meteor.subscribe("allICD");

var select_data = [];
var select_section_data = [];

Template.BHSICD.events({
	'click #saveSection': function () {
        var issectionName = $('#sectionName').val();
        if (!issectionName) {
            Session.set('errorMessage', 'Section name is required');
        } else {
            $('#minimizeAddNewSection').hide();
            $('#addNewSection').show();
            $('#chooseSectionName').fadeOut(500);
            Session.set('errorMessage', '');
            var sectionCode = (!$('#sectionCode').val() ) ? "-" : $('#sectionCode').val();
            var capitalizedSectionCode = sectionCode.replace(/^[a-z]/, function(m){ return m.toUpperCase() });
            var secName = $('#sectionName').val();
            var capitalizedSection = secName.replace(/^[a-z]/, function(m){ return m.toUpperCase() });   
            Meteor.call('insertSection', capitalizedSection,capitalizedSectionCode,"ICD");
                Session.set('BHSSuccessMessage', 'Section '+ $('#sectionName').val() + ' successfully saved');
            $('#sectionName').val("");
            $('#sectionCode').val("");
            $('#sectionName').attr('placeholder','Section');
        }
        Meteor.setTimeout(function () {
            Session.set('errorMessage',''),Session.set('BHSSuccessMessage','')
        }, 2000);	        
    },
    'click #updateSection': function () {
        var sectionCode = (!$('.sectionCode').val() ) ? "-" : $('.sectionCode').val();
        var capitalizedSectionCode = sectionCode.replace(/^[a-z]/, function(m){ return m.toUpperCase() });
        var secName = $('.sectionName').val();
        var capitalizedSection = secName.replace(/^[a-z]/, function(m){ return m.toUpperCase() });   
            Meteor.call('updateSection', capitalizedSection,capitalizedSectionCode,"ICD", Session.get('currentICDSectionid'));
            if (Session.get('currentICDSectionid')) {
                Session.set('BHSSuccessMessage', 'Section '+ $('#sectionName').val() + ' successfully Updated');               
            } else {
                Session.set('BHSSuccessMessage', 'Section '+ $('#sectionName').val() + ' successfully saved');
            } 
            $('.sectionName').val("");
            $('.sectionCode').val("");
            $('.sectionName').attr('placeholder','Section');
            $('.sectionCode').attr('placeholder','Code');
        Meteor.setTimeout(function () {
            Session.set('errorMessage',''),Session.set('BHSSuccessMessage',''),Session.set('currentICDSectionid','')
        }, 2000);           
    },
    'click #addNewSection' : function () {
        $('#addNewSection').hide();
        $('#bulkActionSection').hide();
        $('#minimizeAddNewSection').show();
        $('#chooseSectionName').fadeIn(500);
    },
    'click #editSection' : function () {
        $('#updateSectionName').hide();
        $('#chooseSectionName').hide();
        $('#minimizeAddNewSection').hide();
        $('#addNewSection').show();
        $('#bulkActionSection').fadeIn(500);
    },
    'click #minimizeAddNewSection' : function () {
        $('#minimizeAddNewSection').hide();
        $('#addNewSection').show();
        $('#chooseSectionName').fadeOut(500);
        $('#sectionName').val("");
        $('#sectionName').attr('placeholder','Section');
        $('#sectionCode').val("");
        $('#sectionCode').attr('placeholder','Code');                   
    },
    'click #cancelSection' : function () {
        $('#bulkActionSection').fadeOut(500);
        $('#minimizeAddNewSection').hide();
        $('#addNewSection').show();
        $('#chooseSectionName').fadeOut(500);
        $('#sectionName').val("");
        $('#sectionName').attr('placeholder','Section');
        $('#sectionCode').val("");
        $('#sectionCode').attr('placeholder','Code');                     
    },
    'click #cancelCurrentId' : function() {
        $('#updateSectionName').fadeOut(500);
    },
    'click .closebtn' : function() {
        $('#bulkActionSection').fadeOut(500);
    },
    'click #saveCurrentICDPost': function () {
    	var section = $('#sectionList :selected').text();
        var setionCode;
        var sectionName;
        if(section.match(/:/g)) {
            var split = section.split(':');
            setionCode = split[0];
            sectionName = split[1];            
        } else {
            setionCode = "-";
            sectionName = section;            
        }
		var sectionId = $('#sectionList').val();    	
    	var icdCode = $('#ICDCode').val();
        var capitalizedIcdCode = icdCode.replace(/^[a-z]/, function(m){ return m.toUpperCase() });
    	var ICDDetail = $('#ICDDetail').val();
        var capitalizedIcdDetail = ICDDetail.replace(/^[a-z]/, function(m){ return m.toUpperCase() });

		if (section == "Select") {
			Session.set('errorMessage','Please select section');
		} else if(!icdCode) {
			Session.set('errorMessage','ICD Code is Required');
		} else if(!ICDDetail) {
			Session.set('errorMessage','ICD Description is Required');
		} else {
            $('#cancelCurrentICDPost').hide()
			Meteor.call('insertICD',setionCode,sectionName,sectionId,capitalizedIcdCode,capitalizedIcdDetail,Session.get('currentICDid'));
            if (Session.get('currentICDid')) {
                Session.set('BHSSuccessMessage', 'ICD '+ icdCode + ' successfully updated');               
            } else {
                Session.set('BHSSuccessMessage', 'ICD '+ icdCode + ' successfully saved');
            }            
            Meteor.setTimeout(function () {
                Session.set('BHSSuccessMessage', ''),Session.set('currentICDid',''),$('#sectionList').val("Select"),
                $('#ICDCode').val(""),$('#ICDDetail').val(""),$('#ICDCode').attr('placeholder',"ICD Code"),$('#ICDDetail').attr("placeholder",'Description')
            }, 2600);			
		}
        Meteor.setTimeout(function () {
            Session.set('errorMessage','')
        }, 2000);		
    },
    'click .ICD-data-row' : function () {
    	Session.set('currentICDid',this._id);
    },
    'click .ICD-section-data-row' : function () {
        Session.set('currentICDSectionid',this._id);
        $('#updateSectionName').fadeIn(500);
    },
    'click #cancelCurrentICDPost' : function () {
    	Session.set('currentICDid','');
    },
    'click .menuitem2': function (event) {
        $('#actiondropdown').text($(event.target).text());
    },
    'click .menuitem3': function (event) {
        $('#actiondropdownSection').text($(event.target).text());
    },
    'click #checkboxSection': function (event) {
        var selectcheck = event.target.checked;
        if (selectcheck == true) {
            select_section_data.push(this._id);
        } else {
            var index = select_section_data.indexOf(this._id);
            select_section_data.splice(index, 1);
        }
    },
    'click #applySection' : function() {
        Meteor.call('removeSelectSection', select_section_data, $('#actiondropdownSection').text());
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
        Meteor.call('removeSelectIcd', select_data, $('#actiondropdown').text());
    },
});


Template.BHSICD.helpers({
    'sectionList': function () {
        return section.find({type:"ICD"});
    },
    'ICDList': function() {
    	return ICD.find();
    },
    'selectedICD' : function () {
    	return ICD.findOne(Session.get('currentICDid'));    	
    },
    'selectedSectionICD' : function () {
        return section.findOne(Session.get('currentICDSectionid'));        
    },
    'ICDListCount' : function () {
         return ICD.find().count();  
    }
});


Template.BHSICD.rendered = function () {
    $('#minimizeAddNewSection').hide();
    $('#chooseSectionName').hide();
    $('#bulkActionSection').hide();
};
