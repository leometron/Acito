Meteor.publish('ICD', function () {
  return ICD.find();
});

Meteor.methods({
    'insertICD': function (secName,secId,icdCode,icdDetail) {
        if (typeof ICD.findOne({code: icdCode}) === "object") {
        	console.log('ICD ' + icdCode + ' already exists');    	
        } else {
        	ICD.insert({sectionName: secName,sectionId: secId,code: icdCode,detail: icdDetail});
	        console.log('ICD ' + icdCode + ' added successfully');        	
        }
    }
});
