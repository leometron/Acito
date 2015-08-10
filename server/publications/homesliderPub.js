
Meteor.publish('homeslider', function () {
  return homeslider.find();
});

Meteor.methods({
	'insertSliderData': function(title, imgname, imgfile, date){
		homeslider.insert({title:title, sliderName:imgname, sliderImage:imgfile, createdAt:date , deleted: false, published: false, status: "Draft"});
	},
	'publishSliderData': function(title, imgname, imgfile, date){
		homeslider.insert({title:title, sliderName:imgname, sliderImage:imgfile, createdAt:date, deleted: false, published: true, status: "Published"});
	},
	'republishSliderData': function(title, imgname, imgfile, date, sliderId){
		homeslider.update(sliderId, {$set: {title:title, sliderName:imgname, sliderImage:imgfile, createdAt:date, deleted: false, published:true, status: "Published"}});
	},
	'updateSliderData': function(title, imgname, imgfile, date, sliderId){
		homeslider.update(sliderId, {$set: {title:title, sliderName:imgname, sliderImage:imgfile, createdAt:date}});
	},
	'binSliderData': function(sliderId){
		homeslider.update(sliderId, {$set: {deleted:true, status:"Bin"}});
	},
	'removeSliderData': function(sliderId){
		homeslider.remove({_id: sliderId});
	},
	'unbinSliderData': function(sliderId){
		homeslider.update(sliderId, {$set: {deleted: false, status:"Published"}});
	}
});