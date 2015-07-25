var currentPostId = "";
var querystr;
Meteor.publish('Posts', function () {
    if(querystr) {
        console.log('entered if');
        return Posts.find({ $text: { $search: querystr } });        
    } else {
        console.log('entered else');        
        return Posts.find();
    }
});

//Define all the methods interact with the POSTS object
Meteor.methods({
    'insertPostData': function (title, content,tags,username) {
        Posts.insert({title: title,content: content,publish: false,createdBy:username,tags: tags,deleted:false,status:"Draft"}, function (err, id) {
            currentPostId = id;
        });
        console.log('successfully saved the post...' + title);
    },
    'publishPostData': function (title, content,tags,username) {
        if (currentPostId) {
            Posts.update({_id: currentPostId}, {$set: {_id: currentPostId, title: title, content: content, publish: true,createdBy: username,tags: tags,deleted:false,status:"Published"}});
        } else {
            Posts.insert({title: title, content: content, publish: true,createdBy: username,tags: tags,deleted:false,status:"Published"});
        }
        console.log('successfully published post...' + title);
    },
    'updatePostData': function (postid,title,content,tags,username) {
        Posts.update(postid, {$set: {_id: postid, title: title, content: content, publish: true,createdBy: username,tags: tags,status:"Published"}});
        console.log('successfully updated post...' + title);
    },
    'binPostData' : function (postid) {
        Posts.update(postid, {$set: {deleted: true,status:"Bin"}});
        console.log('Post '+ title + ' is moved to bin');        
    },
    'unbinPostData' : function (postid) {
        Posts.update(postid, {$set: {deleted: false,status:"Published"}});
        console.log('successfully restored the post...' + title);
    },
    'removePostData': function(selectedPostId){
        Posts.remove({_id: selectedPostId});
        console.log('Post '+ title + 'removed successfully');                
   },
   'searchPost' : function(queryString) {
        querystr = queryString; 
   }
});
