Meteor.publish('DSM', function () {
  return DSM.find();
});

Meteor.methods({
    'insertDSM': function (secId,secName,subSecId,subSecName,dsmCode,dsmDetail,currentId) {
        if (typeof ICD.findOne(currentId) === "object") {
        	// DSM.update(currentId,{$set:{sectionName: secName,sectionId: secId,code: icdCode,detail: icdDetail}});        	
        	// console.log('ICD ' + icdCode + ' updated successfully');    	
        } else {
        	DSM.insert({sectionId: secId,sectionName: secName,subSectionId: subSecId,subSectionName: subSecName,DSMCode: dsmCode,DSMDetail: dsmDetail});
	        console.log('DSM ' + dsmCode + ' added successfully');        	
        }
    }
});