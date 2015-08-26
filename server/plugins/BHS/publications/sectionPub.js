// var searchString = "";

Meteor.publish('section', function () {
	// var temp;
	// if (searchString) {
	// 	temp = searchString;
	// 	searchString = "";
 //        console.log('query string....'+temp);
 //        // return section.find({$text: { $search: temp } });
 //        if (temp == "SHOWALL") {
 //            return section.find();      
 //        } else {
 //            return section.find({ sectionName : new RegExp(temp)});        
 //        }	
	// } else {
		return section.find();		
	// }
});

Meteor.methods({
    'insertSection': function (name, code, secType) {
        if (typeof section.findOne({sectionName: name}) === "object") {
        	console.log('section ' + name + ' already exists');    	
        } else {
        	section.insert({sectionName: name, sectionCode: code, type: secType});
	        console.log('Section ' + name + ' added successfully');        	
        }
        // if (section.find().count() == 1) {
        //     section.ensureIndex({sectionName: "text",sectionCode: "text"});
        // }
    }
    // 'showSearchSection': function (searchStr) {
    // 	searchString = searchStr;
    // },
    // 'showAllSection': function () {
    // 	searchString = "";
    // }
});
