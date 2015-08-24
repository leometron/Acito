Meteor.publish('codingRules', function () {
  return codingRules.find();
});


Meteor.methods({
    'insertCodingRules': function (codeReference, guideline, definition, currentId) {
    	if (typeof codingRules.findOne(currentId) === "object") {
    		codingRules.update(currentId,{$set:{code: codeReference, guideline: guideline, definition: definition}});
    	} else {
	        codingRules.insert({
	            code: codeReference,
	            guideline: guideline,
	            definition: definition
	        });
    	}
    },
    'removeSelectCodingRules' : function(selectedFileAll, bulkAction) {
        if (bulkAction == "Delete Permanently") {
            for (i = 0; i < selectedFileAll.length; i++) {
                codingRules.remove({
                    _id: selectedFileAll[i]
                });
            }
        }
    }
});