var currentPostId = "";
var querystr="", filterstr = "", categorystr= "";
// var currentDate = new Date();
Meteor.publish('Posts', function () {
    var temp;
    if(filterstr) {
        temp = filterstr;
        filterstr = "";
        if (temp == "All") {
            return Posts.find();
        } else {
            return Posts.find({ status : temp });                
        }        
    } else if (querystr) {
        temp = querystr;
        querystr = "";        
        return Posts.find({ $text: { $search: temp } });
    } else if(categorystr) {
        temp = categorystr;
        categorystr = "";
        if (temp == "All categories") {
            return Posts.find();
        } else {
        return Posts.find({ categoryName : temp } );        
        }          
    } 
    else {
        return Posts.find();
    }
});

//Define all the methods interact with the POSTS object
Meteor.methods({
    'insertPostData': function (title, content,tags,username,currentDate,category) {
        Posts.insert({title: title,content: content,publish: false,createdBy:username,tags: tags,deleted:false,createdAt:currentDate,status:"Draft",categoryName:category}, function (err, id) {
            currentPostId = id;
        });
        console.log('successfully saved the post...' + title);
    },
    'publishPostData': function (id,title, content,tags,username,currentDate,category) {
        if(id) {
            currentPostId = id;
        }
        if (currentPostId) {
            Posts.update({_id: currentPostId}, {$set: {_id: currentPostId, title: title, content: content, publish: true,createdBy: username,tags: tags,deleted:false,createdAt:currentDate,status:"Published",categoryName:category}});
        } else {
            Posts.insert({title: title, content: content, publish: true,createdBy: username,tags: tags,deleted:false,createdAt:currentDate,status:"Published",categoryName:category});
        }
        console.log('successfully published post...' + title);
    },
    'updatePostData': function (postid,title,content,tags,category) {
        Posts.update(postid, {$set: {title: title, content: content,tags: tags,categoryName:category}});
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
   },
   'statusFilter' : function(filterString) {
        filterstr = filterString;
   },
   'categoryFilter' : function(categoryString) {
        categorystr = categoryString;
   }
});
