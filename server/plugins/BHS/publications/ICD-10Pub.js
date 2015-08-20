Meteor.publish('ICD', function () {
  return ICD.find();
});

Meteor.methods({
    'insertICD': function (secName,secId,icdCode,icdDetail,currentId) {
        if (typeof ICD.findOne(currentId) === "object") {
        	// var currentObj = ICD.findOne({code: icdCode});
        	ICD.update(currentId,{$set:{sectionName: secName,sectionId: secId,code: icdCode,detail: icdDetail}});        	
        	console.log('ICD ' + icdCode + ' updated successfully');    	
        } else {
        	ICD.insert({sectionName: secName,sectionId: secId,code: icdCode,detail: icdDetail});
	        console.log('ICD ' + icdCode + ' added successfully');        	
        }
    }
});
