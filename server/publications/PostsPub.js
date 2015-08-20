var currentPostId = "";
var querystr = "", filterstr = "", categorystr = "", dateString = "";

Meteor.publish('Posts', function () {
    var loginUserId = this.userId;
    var temp;
    if (filterstr) {
        temp = filterstr;
        filterstr = "";
        if (temp == "All") {
            return Posts.find({createdBy: loginUserId});
        } else {
            return Posts.find({createdBy: loginUserId, status: temp});
        }
    } else if (querystr) {
        temp = querystr;
        querystr = "";        
        return Posts.find({ createdBy: loginUserId, $text: { $search: temp } });
    } else if(categorystr) {
        temp = categorystr;
        categorystr = "";
        if (temp == "All categories") {
            return Posts.find({createdBy: loginUserId});
        } else {
            return Posts.find({categoryName: temp});
        }
    } else if (dateString) {
        temp = dateString;
        dateString = "";
        if (temp == "All dates") {
            return Posts.find({createdBy: loginUserId});
        } else {
            return Posts.find({createdBy: loginUserId, createdAt: new RegExp(temp)});
        }
    } else {
        if (loginUserId) {
            return Posts.find({createdBy: loginUserId});
        } else {
            var adminObj = Meteor.users.findOne({username: 'admin'});
            return Posts.find({createdBy: adminObj._id});
        }
    }
});

//Define all the methods interact with the POSTS object
Meteor.methods({
    'insertPostData': function (title, content, tags, currentDate, pageid, pagename, image) {
        Posts.insert({
            title: title,
            content: content,
            publish: false,
            createdBy: Meteor.userId(),
            tags: tags,
            deleted: false,
            createdAt: currentDate,
            status: "Draft",
            pageId: pageid,
            pageName: pagename,
            featuredImage: image
        }, function (err, id) {
            currentPostId = id;
        });
        console.log('successfully saved the post...' + title);
    },
    'publishPostData': function (id, title, content, tags, currentDate, pageid, pagename, image) {
        currentPostId = id;
        if (currentPostId) {
            Posts.update({_id: currentPostId}, {
                $set: {
                    _id: currentPostId,
                    title: title,
                    content: content,
                    publish: true,
                    createdBy: Meteor.userId(),
                    tags: tags,
                    deleted: false,
                    createdAt: currentDate,
                    status: "Published",
                    pageId: pageid,
                    pageName: pagename,
                    featuredImage: image
                }
            });
        } else {
            Posts.insert({
                title: title,
                content: content,
                publish: true,
                createdBy: Meteor.userId(),
                tags: tags,
                deleted: false,
                createdAt: currentDate,
                status: "Published",
                pageId: pageid,
                pageName: pagename,
                featuredImage: image
            });
        }
        console.log('successfully published post...' + title);
    },
    'updatePostData': function (postid, title, content, tags, pageid, pagename, image) {
        Posts.update(postid, {
            $set: {
                title: title,
                content: content,
                tags: tags,
                pageId: pageid,
                pageName: pagename,
                featuredImage: image
            }
        });
        console.log('successfully updated post...' + title);
    },
    'binPostData': function (postid) {
        Posts.update(postid, {$set: {deleted: true, status: "Bin"}});
        console.log('Post ' + title + ' is moved to bin');
    },
    'unbinPostData': function (postid) {
        Posts.update(postid, {$set: {deleted: false, status: "Published"}});
        console.log('successfully restored the post...' + title);
    },
    'removePostData': function (selectedPostId) {
        Posts.remove({_id: selectedPostId});
        console.log('Post removed successfully');
    },
    'searchPost': function (queryString) {
        querystr = queryString;
    },
    'statusFilter': function (filterString) {
        filterstr = filterString;
    },
    'categoryFilter': function (categoryString) {
        categorystr = categoryString;
    },
    'bulkActions': function (idList, action) {
        if (action == "Move to Bin") {
            for (i = 0; i < idList.length; i++) {
                Posts.update(idList[i], {$set: {deleted: true, status: "Bin"}});
            }
        } else if (action == "Delete") {
            for (i = 0; i < idList.length; i++) {
                Posts.remove({_id: idList[i]});
            }
        }
    },
    'showDateFilterPost': function (filterDate) {
        dateString = filterDate;
    },
    'removeFeaturedImage': function (postId) {
        Posts.update(postId, {$set: {featuredImage: "-"}});
    }
});
