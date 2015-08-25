var searchString = "";

Meteor.publish('section', function () {
	var temp;
	if (searchString) {
		temp = searchString;
		searchString = "";
        return section.find({$text: { $search: temp } });	
	} else {
			return section.find();		

	}
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
    'showSearchSection': function (searchStr) {
    	searchString = searchStr;
    },
    'showAllSection': function () {
    	searchString = "";
    }
});
