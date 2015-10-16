Template.featuredImage.rendered = function () {
    Session.set('errorImage', '');
    Session.set('selectFeaturedImage', '');
    $('.dropdown-button').dropdown({
        inDuration: 300,
        outDuration: 225,
        constrain_width: true,
        gutter: 0,
        belowOrigin: true,
        alignment: 'center'
    }); 
}


Template.featuredImage.events({
    'change #selectFeaturedImage': function (event, template) {
        FS.Utility.eachFile(event, function (file) {
            Images.insert(file, function (err, fileObj) {
                if (err) {
                    console.log('error')
                } else {
                    var url = "/cfs/files/images/" + fileObj._id;
                    // Meteor.setTimeout(function(){Session.set('browsedMediaUrl', url)}, 1000);
                    Session.set('selectFeaturedImage', url);
                }
            });
        });
    },
    'click #publishFeaturedImage': function () {
        if (!Session.get('selectFeaturedImage')) {
            Materialize.toast('Image is required', 3000, 'error-toast');
        } else if ($('.drop-down-label').text() == "None") {
            Materialize.toast('Post title is required', 3000, 'error-toast');
        } else {
            Materialize.toast('Featured Image Saved', 3000, 'success-toast');
            Meteor.call('insertFeaturedImage', Session.get('selectFeaturedImage'), Session.get('postId'), getUserName());
            Meteor.setTimeout(function () {
                Session.set('postId', ''), $('.drop-down-label').text("None"), Session.set('selectFeaturedImage', ''), $('#selectFeaturedImage').val("")
            }, 2000);
        }
    },
    'click .drop-down-item.page': function(event) {
        $('.drop-down-label.page').text($(event.target).text());
        $('.drop-down-label.post').text('None');
        $('ul#posts').html('');   

        Session.set('postId', '');
        var posts = Posts.find({pageId: event.target.id});
        var t = '<li class="drop-down-item post">None</li>';
        posts.forEach(function(item){
            t += '<li class="divider"></li>'+
                 '<li class="drop-down-item post" id="' + item._id + '">' + item.title + '</li>';
        });
        $('ul#posts').append(t);         
     },
     'click .drop-down-item.post': function(event) {
        $('.drop-down-label.post').text($(event.target).text());
        Session.set('postId', event.target.id);
     } 
});


Template.featuredImage.helpers({
    'pagesList': function() {
        return Pages.find();
    },
    'postList': function() {
        return Posts.find({pageId: 'none'});
    }
});