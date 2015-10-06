Meteor.publish('rating', function () {
  return rating.find();
});

Meteor.methods({
		'insertrating': function(user,post, ratings) {
		 // console.log(user+'......'+post);
		  if( typeof rating.findOne({userId: user, postId: post}) === "object") {
		  	
		  	var obj = rating.findOne({userId: user, postId: post});
		  	// console.log(" rating value " + ratings + post);
		  	rating.update(obj._id, {$set: {points: ratings}});
		  	console.log("Rating update successfully");

		  } else {
		  	console.log(" rating value " + ratings);
			rating.insert({ userId: user, postId: post, points: ratings });
			console.log("Rating insert successfully");
		  }		
		}
});
