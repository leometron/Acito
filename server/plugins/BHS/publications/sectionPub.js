Meteor.publish('section', function () {
	return section.find();		
});

Meteor.methods({
    'insertSection': function (name, secType) {
        if (typeof section.findOne({sectionName: name}) === "object") {
        	console.log('section ' + name + ' already exists');    	
        } else {
        	section.insert({sectionName: name, type: secType});
	        console.log('Section ' + name + ' added successfully');        	
        }
    }
});
