Meteor.publish('section', function () {
	return section.find();		
});

Meteor.methods({
    'insertSection': function (name, code, secType) {
        	section.insert({sectionName: name, sectionCode: code, type: secType});
    },
    'updateSection': function (name, code, secType, currentSectionId) {
       	section.update(currentSectionId,{$set:{sectionName: name,sectionCode: code,type: secType}});
    },
    'removeSelectSection' : function(selectedSectionAll, bulkAction) {
        if (bulkAction == "Delete Permanently") {
            for (i = 0; i < selectedSectionAll.length; i++) {
                section.remove({
                    _id: selectedSectionAll[i]
                });
            }
        }
    }
});
