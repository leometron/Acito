Meteor.publish('settings', function () {
    var currentUserId = this.userId;
    return settings.find({createdBy: currentUserId});
});

Meteor.methods({
    'saveSettingData': function (title, line, wpaddress, siteaddress, email, language) {

        if (typeof settings.findOne({createdBy: Meteor.userId()}) === "object") {
            console.log("update successfully");
            settings.update({createdBy: Meteor.userId()}, {
                $set: {
                    siteTitle: title,
                    tagline: line,
                    wordpressAddress: wpaddress,
                    siteAddress: siteaddress,
                    email: email,
                    language: language,
                    createdBy: Meteor.userId()
                }
            });
        } else {
            console.log("save successfully");
            settings.insert({
                siteTitle: title,
                tagline: line,
                wordpressAddress: wpaddress,
                siteAddress: siteaddress,
                email: email,
                language: language,
                createdBy: Meteor.userId()
            });
        }
    }
});