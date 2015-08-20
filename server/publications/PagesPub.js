var searchtext = "";
var publishtext = "";
var datetext = "";


Meteor.publish('Pages', function () {

    var currentUserId = this.userId;
    var temp;

    if (publishtext) {
        temp = publishtext;
        publishtext = "";
        if (temp == "All") {
            return Pages.find({createdBy: currentUserId});
        } else {
            return Pages.find({createdBy: currentUserId, status: temp});
        }
    } else if (searchtext) {
        temp = searchtext;
        searchtext = "";
        return Pages.find({createdBy: currentUserId, $text: {$search: temp}});
    } else if (datetext) {
        temp = datetext;
        datetext = "";
        if (temp == "All dates") {
            return Pages.find({createdBy: currentUserId});
        } else {
            return Pages.find({createdBy: currentUserId, createdAt: new RegExp(temp)});
        }
    }
    else {
        if (currentUserId) {
            return Pages.find({createdBy: currentUserId});
        } else {
            var adminObj = Meteor.users.findOne({username: 'admin'});
            return Pages.find({createdBy: adminObj._id})
        }
    }
});


//Define all the methods interact with the PAGES object
Meteor.methods({

    'insertPagesData': function (title, content, date, parent) {
        var currentUserId = Meteor.userId();
        Pages.insert({
            title: title,
            content: content,
            deleted: false,
            published: true,
            createdBy: currentUserId,
            createdAt: date,
            status: "Published",
            parentId: parent
        });
    },

    'draftPagesData': function (title, content, date, parent) {
        var currentUserId = Meteor.userId();
        Pages.insert({
            title: title,
            content: content,
            deleted: false,
            published: false,
            createdBy: currentUserId,
            createdAt: date,
            status: "Draft",
            parentId: parent
        });
    },

    'binPagesData': function (title, content, date, parent) {
        var currentUserId = Meteor.userId();
        Pages.insert({
            title: title,
            content: content,
            deleted: true,
            published: false,
            createdBy: currentUserId,
            createdAt: date,
            status: "Bin",
            parentId: parent
        });
    },

    'deletePagesData': function (pageTitle, pageComments, selectedPages, parent) {
        Pages.update(selectedPages, {
            $set: {
                title: pageTitle,
                content: pageComments,
                deleted: true,
                published: false,
                status: "Bin",
                parentId: parent
            }
        });
    },

    'updatePagesData': function (pageTitle, pageComments, selectedPages, parent) {
        Pages.update(selectedPages, {$set: {title: pageTitle, content: pageComments, parentId: parent}});
    },

    'trashPagesData': function (selectedPages) {
        Pages.remove(selectedPages);
    },

    'restorePagesData': function (selectedPages) {
        Pages.update(selectedPages, {$set: {deleted: false, status: "Draft"}});
    },


    'RePublishPagesData': function (pageTitle, pageComments, selectedPages, parent) {
        Pages.update(selectedPages, {
            $set: {
                title: pageTitle,
                content: pageComments,
                published: true,
                status: "Published",
                parentId: parent
            }
        });
    },

    'searchData': function (searchPage) {
        searchtext = searchPage;
    },

    'loadPage': function (loadData) {
        publishtext = loadData;
    },

    'dateFilter': function (filterdate) {
        datetext = filterdate;
    },

    'listbinPagesData': function (binpageid) {
        Pages.update(binpageid, {$set: {deleted: true, published: false, status: "Bin"}});
    },

    'bulkMethod': function (idList, action) {
        if (action == "Move to Bin") {
            for (i = 0; i < idList.length; i++) {
                Pages.update(idList[i], {$set: {deleted: true, status: "Bin"}});
            }
        } else if (action == "Delete") {
            for (i = 0; i < idList.length; i++) {
                Pages.remove({_id: idList[i]});
            }
        }
    }
});