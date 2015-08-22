Meteor.publish('ICD', function () {
  return ICD.find();
});

Meteor.methods({
    'insertICD': function (secName,secId,icdCode,icdDetail,currentId) {
        if (typeof ICD.findOne(currentId) === "object") {
        	ICD.update(currentId,{$set:{sectionName: secName,sectionId: secId,code: icdCode,detail: icdDetail}});        	
        	console.log('ICD ' + icdCode + ' updated successfully');    	
        } else {
        	ICD.insert({sectionName: secName,sectionId: secId,code: icdCode,detail: icdDetail});
	        console.log('ICD ' + icdCode + ' added successfully');        	
        }
    },
    'removeSelectIcd' : function(selectedFileAll, bulkAction) {
        if (bulkAction == "Delete Permanently") {
            for (i = 0; i < selectedFileAll.length; i++) {
                ICD.remove({
                    _id: selectedFileAll[i]
                });
            }
        }
    }
});
