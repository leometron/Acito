Meteor.publish('section', function () {
	return section.find();		
});

Meteor.methods({
    'insertSection': function (name, code, secType) {
        if (typeof section.findOne({sectionName: name}) === "object") {
        	console.log('section ' + name + ' already exists');    	
        } else {
        	section.insert({sectionName: name, sectionCode: code, type: secType});
	        console.log('Section ' + name + ' added successfully');        	
        }
    },
    'removeDSMSelectSection' : function(selectedFileAll, bulkAction) {
        if (bulkAction == "Delete Permanently") {
            for (i = 0; i < selectedFileAll.length; i++) {
                section.remove({
                    _id: selectedFileAll[i]
                });
            }
        }
    },
    'updateDSMSection': function(name, code, secType, secId) {
        section.update(secId, {$set: {sectionName: name, sectionCode: code, type: secType}} );
    }
});
