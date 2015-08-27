// var searchString = "";
Meteor.publish('codingRules', function () {
    // var temp;
    // if (searchString) { 
    //     temp = searchString;
    //     searchString = "";
    //     return codingRules.find({$text: { $search: temp } });
    // } else {
        return codingRules.find();
    // }
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
        // if (codingRules.find().count() == 1) {
        //     codingRules._ensureIndex({guideline: "text"});
        // }        
    },
    'removeSelectCodingRules' : function(selectedFileAll, bulkAction) {
        if (bulkAction == "Delete Permanently") {
            for (i = 0; i < selectedFileAll.length; i++) {
                codingRules.remove({
                    _id: selectedFileAll[i]
                });
            }
        }
    },
    // 'searchCodingRules' : function(searchStr) {
    //     searchString = searchStr;
    // }
});