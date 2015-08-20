Meteor.publish('theme', function () {
    // return theme.find();
    var loginUserId = this.userId;    
        if (loginUserId) {
            return theme.find({userId: loginUserId});
        } else {
            var adminObj = Meteor.users.findOne({username: 'admin'});
            return theme.find({userId: adminObj._id});
        }    
});

//Define all the methods interact with the POSTS object
Meteor.methods({
    'saveTheme': function (themeName) {
        if (typeof theme.findOne({userId: Meteor.userId()}) === "object") {
            theme.update({userId: Meteor.userId()}, {$set: {userId: Meteor.userId(), themeName: themeName}});
        } else {
            theme.insert({userId: Meteor.userId(), themeName: themeName});
        }
        console.log('Theme ' + themeName + ' added successfully');
    }
});