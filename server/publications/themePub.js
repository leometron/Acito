Meteor.publish('theme', function () {
    return theme.find();
});

//Define all the methods interact with the POSTS object
Meteor.methods({
    'saveTheme': function (themeName) {
        // console.log('')
        if (typeof theme.findOne({userId: Meteor.userId()}) === "object") {
            console.log('if...');
            theme.update({userId: Meteor.userId()}, {$set: {userId: Meteor.userId(), themeName: themeName}});
        } else {
            console.log('else...');
            theme.insert({userId: Meteor.userId(), themeName: themeName});
        }
        console.log('Theme ' + themeName + ' added successfully');
    }
});