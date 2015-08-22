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
});