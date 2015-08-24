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
    }
});
