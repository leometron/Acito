Meteor.publish('subSection', function () {
  return subSection.find();
});

Meteor.methods({
    'insertSubSection': function (secId, secName, subSecName, subSecCode) {
        if (typeof section.findOne({sectionId:secId,subSectionName: subSecName}) === "object") {
        	console.log('Sub section ' + subSecName + ' already exists');    	
        } else {
        	subSection.insert({sectionId: secId, sectionName: secName,subSectionName: subSecName, subSectionCode: subSecCode});
	        console.log('Section ' + name + ' added successfully');        	
        }
    },
     'removeSelectSubSection' : function(selectedFileAll, bulkAction) {
        if (bulkAction == "Delete Permanently") {
            for (i = 0; i < selectedFileAll.length; i++) {
                subSection.remove({
                    _id: selectedFileAll[i]
                });
            }
        }
    },
    'updateDSMSubSection': function(name, code, subSecId) {
        subSection.update(subSecId, {$set: {subSectionName: name, subSectionCode: code}} );
    }
});
