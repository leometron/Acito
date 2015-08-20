var searchstr = "";
var datestr = "";
var allslider = "";


Meteor.publish('homeslider', function () {

	var currentUserId = this.userId;
  	var temp;
  	if(searchstr) {
  		temp = searchstr;
  		searchstr = "";
  		return homeslider.find({ createdBy: currentUserId, $text: { $search: temp }});
  	} else if(datestr) {
  		temp = datestr;
  		datestr = "";
  		if(temp == "All dates"){
  			return homeslider.find({ createdBy: currentUserId });		
  		} else {
  			return homeslider.find({createdBy: currentUserId, createdAt : new RegExp(temp)});
  		}
  	} else if(allslider){
  		temp = allslider;
  		allslider = "";
  			if(temp == "All"){
  				return homeslider.find({ createdBy: currentUserId });
  			} else {
  			return homeslider.find({createdBy: currentUserId, status: temp});	
  		}
    } else {
        return homeslider.find({createdBy: currentUserId});
    }

});

Meteor.methods({
    'insertSliderData': function (title, imgname, imgfile, date) {
        homeslider.insert({
            title: title,
            sliderName: imgname,
            sliderImage: imgfile,
            createdAt: date,
            deleted: false,
            published: false,
            status: "Draft",
            createdBy: Meteor.userId()
        });
    },
    'publishSliderData': function (title, imgname, imgfile, date) {
        homeslider.insert({
            title: title,
            sliderName: imgname,
            sliderImage: imgfile,
            createdAt: date,
            deleted: false,
            published: true,
            status: "Published",
            createdBy: Meteor.userId()
        });
    },
    'republishSliderData': function (title, imgname, imgfile, date, sliderId) {
        homeslider.update(sliderId, {
            $set: {
                title: title,
                sliderName: imgname,
                sliderImage: imgfile,
                createdAt: date,
                deleted: false,
                published: true,
                status: "Published"
            }
        });
    },
    'updateSliderData': function (title, imgname, imgfile, date, sliderId) {
        homeslider.update(sliderId, {$set: {title: title, sliderName: imgname, sliderImage: imgfile, createdAt: date}});
    },
    'binSliderData': function (sliderId) {
        homeslider.update(sliderId, {$set: {deleted: true, status: "Bin"}});
    },
    'removeSliderData': function (sliderId) {
        homeslider.remove({_id: sliderId});
    },
    'unbinSliderData': function (sliderId, status) {
        // if(status){
        homeslider.update(sliderId, {$set: {deleted: false, status: "Published"}});
        // } else {
        // 	homeslider.update(sliderId, {$set: {deleted: false, status:"Draft"}});
        // }

    },
    'searchSlider': function (searchString) {
        searchstr = searchString;
    },
    'dateSlider': function (dateString) {
        datestr = dateString;
    },
    'bulkSlider': function (idList, action) {
        if (action == "Move to Bin") {
            for (i = 0; i < idList.length; i++) {
                homeslider.update(idList[i], {$set: {deleted: true, status: "Bin"}});
            }
        } else if (action == "Delete") {
            for (i = 0; i < idList.length; i++) {
                homeslider.remove({_id: idList[i]});
            }
        }
    },
    'loadSlider': function (load) {
        allslider = load;
    }
});