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
    }
});
