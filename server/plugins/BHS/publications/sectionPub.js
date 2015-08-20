Meteor.publish('section', function () {
  return section.find();
});

Meteor.methods({
    'insertSection': function (name) {
        if (typeof section.findOne({sectionName: name}) === "object") {
        	console.log('section ' + name + ' already exists');    	
        } else {
        	section.insert({sectionName: name});
	        console.log('Section ' + name + ' added successfully');        	
        }
    }
});
