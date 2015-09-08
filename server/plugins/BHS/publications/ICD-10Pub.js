Meteor.publish('allICD', function () {
  return ICD.find();
});

Meteor.publish('ICD', function(options) {
  check(options, {
    sort: Object,
    limit: Number
  });
  return ICD.find({}, options);        
});

Meteor.methods({
    'insertICD': function (secCode,secName,secId,icdCode,icdDetail,currentId) {
        if (typeof ICD.findOne(currentId) === "object") {
        	ICD.update(currentId,{$set:{sectionCode: secCode,sectionName: secName,sectionId: secId,code: icdCode,detail: icdDetail}});        	
        	console.log('ICD ' + icdCode + ' updated successfully');    	
        } else {
        	ICD.insert({sectionCode: secCode,sectionName: secName,sectionId: secId,code: icdCode,detail: icdDetail});
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
    },
    'removeSelectSectionIcd' : function(selectedFileAll, bulkAction) {
     if (bulkAction == "Delete Permanently") {
            for (i = 0; i < selectedFileAll.length; i++) {
                ICD.remove({sectionId: selectedFileAll[i]});
            }
        }
    },
    'updateSectionInICD' : function (secName,secCode,secId) {
        ICD.update({sectionId:secId},{$set:{sectionCode: secCode,sectionName: secName}},{ multi: true });
    }
});
