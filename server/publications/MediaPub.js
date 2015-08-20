var querystr = "";
var date = "";

Meteor.publish('Media', function () {

    var currentUserId = this.userId;
    var temp;

    if (querystr) {
        temp = querystr;
        querystr = "";
        return Media.find({createdBy: currentUserId, $text: {$search: temp}});
    } else if (date) {
        temp = date;
        date = "";
        if (temp == "All dates") {
            return Media.find({createdBy: currentUserId});
        } else {
            return Media.find({createdBy: currentUserId, createdAt: new RegExp(temp)});
        }
    }
    else {
        return Media.find({createdBy: currentUserId});
    }
});

Meteor.methods({
    'insertMediaData': function (mediaUrl, mediaName, mediaFullName, mediaType, mediaSize, caption, alternative, description, userId, createdAt) {
        // console.log('Meteor.user......................'+userId);
        Media.insert({
            url: mediaUrl,
            name: mediaName,
            fullName: mediaFullName,
            type: mediaType,
            size: mediaSize,
            caption: caption,
            alternative: alternative,
            description: description,
            createdBy: userId,
            createdAt: createdAt

        });
    },
    'updateMediaData': function (mediaId, mediaUrl, mediaName, mediaNameType, mediaType, mediaSize, caption, alternative, description) {
        console.log('entered server');
        Media.update(
            mediaId,
            {
                $set: {
                    _id: mediaId,
                    url: mediaUrl,
                    name: mediaName,
                    fullName: mediaNameType,
                    type: mediaType,
                    size: mediaSize,
                    caption: caption,
                    alternative: alternative,
                    description: description
                }
            });
    },
    'removeMediaData': function (selectedFile) {
        Media.remove({
            _id: selectedFile
        });
    },
    'removeSelectMediaData': function (selectedFileAll, bulkAction) {
        if (bulkAction == "Delete Permanently") {
            for (i = 0; i < selectedFileAll.length; i++) {
                Media.remove({
                    _id: selectedFileAll[i]
                });
            }
        }
    },
    'searchMedia': function (queryString) {
        querystr = queryString;
    },
    'showAllMedia': function (queryStringData) {
        querystr = "";
    },
    'selectDateFilter': function (filterDate) {
        date = filterDate;
    },
});