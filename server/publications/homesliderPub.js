Meteor.publish('homeslider', function () {
  return homeslider.find();
});

Meteor.methods({
	'insertSliderData': function(title, imgname, imgfile, date){
		homeslider.insert({title:title, sliderName:imgname, sliderImage:imgfile, createdAt:date , deleted: false, published: false, status: "Draft"});
	},
	'publishSliderData': function(title, imgname, imgfile, date){
		homeslider.insert({title:title, sliderName:imgname, sliderImage:imgfile, createdAt:date , deleted: false, published: true, status: "Published"});		
	}
});