Meteor.publish('DSM', function () {
  return DSM.find();
});

Meteor.methods({
    'insertDSM': function (secId,subSecId,dsmCode,dsmDetail,currentId) {
        if (typeof ICD.findOne(currentId) === "object") {
        	// DSM.update(currentId,{$set:{sectionName: secName,sectionId: secId,code: icdCode,detail: icdDetail}});        	
        	// console.log('ICD ' + icdCode + ' updated successfully');    	
        } else {
        	DSM.insert({sectionId: secId,subSectionId: subSecId,DSMCode: dsmCode,DSMDetail: dsmDetail});
	        console.log('DSM ' + dsmCode + ' added successfully');        	
        }
    }
});