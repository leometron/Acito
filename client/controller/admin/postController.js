/*

 Created by LingaRaja.

 Has the events to redirect a new post page.

 */

Meteor.subscribe("Posts");
Meteor.subscribe("users");

var selectedIds = [];

Template.posts.rendered = function(){
  	$('#apply').hide();
  	$('.dropdown-button').dropdown({
        inDuration: 300,
        outDuration: 225,
        constrain_width: true,
        gutter: 0,
        belowOrigin: true,
        alignment: 'center'
    });	
	Session.set('errorMessage','');
	var status = Session.get('checkStatus');
	if( status == "all" ){
		$('#showAll').css('color','red');
	}else if( status == "published" ){
		$('#publishFilter').css('color','red');
	}else if( status == "draft" ){
		$('#draftFilter').css('color','red');
	}else if( status == "bin" ){
		$('#binFilter').css('color','red');
	}else{
		$('#showAll').css('color','red');
	}
};

// Template.addNewPost.rendered = function(){
// tinymce.init({
//     selector: "textarea",
//     theme: "modern",
//     plugins: [
//         "advlist autolink lists link image charmap print preview hr anchor pagebreak",
//         "searchreplace wordcount visualblocks visualchars code fullscreen",
//         "insertdatetime media nonbreaking save table contextmenu directionality",
//         "emoticons template paste textcolor colorpicker textpattern imagetools"
//     ],
//     toolbar1: "insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image",
//     toolbar2: "print preview media | forecolor backcolor emoticons",
//     image_advtab: true,
//     templates: [
//         {title: 'Test template 1', content: 'Test 1'},
//         {title: 'Test template 2', content: 'Test 2'}
//     ]
// });
// };
Template.posts.events({
	'click #addNewPost': function () {
		Session.set('postImage', "");
		Session.set('selectedPostId', "");
		Router.go("/admin/posts/add");
	},
	'click .post': function () {
		Session.set('selectedPostId', this._id);
		Router.go("/admin/posts/edit");
	}, 
	'click #searchPost' : function (event) {
		event.preventDefault();                
		Meteor.call('searchPost',$('#queryString').val());
		Meteor._reload.reload();        
	},  
    'click .action-item': function (event) {            
       $('#bulkOptionDropDown').text( $(event.target).text());
       if($('#bulkOptionDropDown').text() != "Bulk Actions") {
        $('#apply').fadeIn(500);
       } else {
        $('#apply').fadeOut(500);
       }           
    },
	/*'click .menuitem1': function (event) {                            
		$('#datedropdown').text( $(event.target).text());    
	},
	'click .menuitem2': function (event) {                
		$('#categoriesdropdown').text( $(event.target).text());    
	},
	'click .menuitem3': function (event) {    
		$('#dropdownmenu').text( $(event.target).text());        
	},*/
	'click #showAll' : function(event) {
		event.preventDefault();                
		Meteor.call('statusFilter',"All");
		Meteor._reload.reload(); 
		Session.set('checkStatus','all');
	},
	'click #publishFilter' : function(event) {
		event.preventDefault();                
		Meteor.call('statusFilter',"Published");
		Meteor._reload.reload(); 
		Session.set('checkStatus','published');
	},
	'click #draftFilter' : function(event) {
		event.preventDefault();                
		Meteor.call('statusFilter',"Draft");
		Meteor._reload.reload();
		Session.set('checkStatus','draft'); 
	},
	'click #binFilter' : function(event) {
		event.preventDefault();                
		Meteor.call('statusFilter',"Bin");
		Meteor._reload.reload();
		Session.set('checkStatus','bin'); 
	},
	'click #filterByCategory' : function(event)  {
		event.preventDefault();                
		Meteor.call('categoryFilter',$('#categoriesdropdown').text());
		Meteor._reload.reload(); 
	},
   'click .checkbox': function(event) {
		if(event.target.checked==true){
			selectedIds.push( this._id);
		}else{
		  var index = selectedIds.indexOf(this._id);
			selectedIds.splice(index, 1);
		}
	},
	'click #checkboxPostsAll' : function(event) {
        var selectcheck = event.target.checked;
        if(selectcheck == true){
            $('.checkbox:checkbox').prop('checked',true);
        }else{
            $('.checkbox:checkbox').prop('checked',false);
        }
        $(".checkbox:checkbox").each(function() {
           if(this.checked){
                selectedIds.push(this.id);
           }else{
                var index = selectedIds.indexOf(this.id);
                selectedIds.splice(index, 1);
           }
       });
    },
   'click #bulkApplyBtn': function() {
		Meteor.call('bulkActions', selectedIds, $('#bulkOptionDropDown').text());
		Meteor._reload.reload(); 
   },
	// 'click #filter': function(event) {
	// 	Meteor.call('showDateFilterPost', $('#dateFilter').val());
	// 	Meteor._reload.reload();
 //   }
   'change #dateFilter' : function() {
		Meteor.call('showDateFilterPost', $('#dateFilter').val());
		Meteor._reload.reload();
   	}   
});

/*

 Has the functionality to add a new post and publish the post.

 */
Template.addNewPost.events({
	'click #savePost' : function () {
		if (!$('#postName').val()) {
			Materialize.toast('Post title is required', 3000);
		} else {  
			var tag = (!$('#postTags').val() ) ? "-" : $('#postTags').val();
			var pageId = ($('#pageName').val() == "Category") ? "Uncategorized" : $('#pageName').val();
			var pageName = $('#pageName :selected').text();        
			var postContent = (!$('#postContent').val()) ? "-" : $('#postContent').val();
			var featuredImage;
			if($('#featureImage').length == 0) {
				featuredImage = "-";
			} else {
				featuredImage = $('#featureImage').attr('src');
			}                     
			Meteor.call('insertPostData',$('#postName').val(),postContent,tag,getCurrentDate(),pageId,pageName,featuredImage);
			Router.go("/admin/posts");  
		}
	},
	'click #publishPost' : function () {
		if(!$('#postName').val()) {
			Materialize.toast('Post title is required', 4000);
		} else {  
		alert('else')                 ;
			var tag = (!$('#postTags').val() ) ? "-" : $('#postTags').val();
			var pageId = ($('#pageName').val() == "Category") ? "Uncategorized" : $('#pageName').val();
			var pageName = $('#pageName :selected').text();
			var postContent = (!$('#postContent').val()) ? "-" : $('#postContent').val();
			var featuredImage;
			if($('#featureImage').length == 0) {
				featuredImage = "-";
			} else {
				featuredImage = $('#featureImage').attr('src');
			}              
			Meteor.call('publishPostData',Session.get('selectedPostId'),$('#postName').val(),postContent,tag,getCurrentDate(),pageId,pageName,featuredImage);
			Router.go("/admin/posts");
		}       
	},
	'click #updatePost' : function() {
		if (!$('#postName').val()) {
			Materialize.toast('Post title is required', 4000);
		} else {             
			var tag = (!$('#postTags').val() ) ? "-" : $('#postTags').val();
			var pageId = ($('#pageName').val() == "Category") ? "Uncategorized" : $('#pageName').val();
			var pageName = $('#pageName :selected').text();        
			var postContent = (!$('#postContent').val()) ? "-" : $('#postContent').val();
			var featuredImage;
			if($('#featureImage').length == 0) {
				featuredImage = "-";
			} else {
				featuredImage = $('#featureImage').attr('src');
			}                                 
			Meteor.call('updatePostData',Session.get('selectedPostId'),$('#postName').val(),postContent,tag,pageId,pageName,featuredImage);
			Router.go("/admin/posts");
		}        
	},
	'click #moveBin' : function() {
		Meteor.call('binPostData',Session.get('selectedPostId')); 
		Router.go("/admin/posts");               
	},
	'click #restorePost' : function() {
		Meteor.call('unbinPostData',Session.get('selectedPostId'));
		Router.go("/admin/posts");
	},
	'click #removePost' : function() {
		Meteor.call('removePostData',Session.get('selectedPostId')); 
		Router.go("/admin/posts");               
	},
	 'click #deletePost': function() {
	   Meteor.call('removePostData',Session.get('selectedPostId'));
	   Router.go("/admin/posts"); 
	},
	'click #addNewTag' : function() {
		Router.go("/admin/posts/tags");                       
	},
	'click #selectImage': function () {             
		 $('#uploadFile').addClass('border');
		 $('#media').hide();
		 $('#mediaLibrary').removeClass('border');
		 $('#dropFile').show();             
	},
	'click #mediaLibrary': function(){
		console.log("media");
		$('#uploadFile').removeClass('border');
		$('#dropFile').hide() ;
		$('#mediaLibrary').addClass('border');
		$('#media').show();
		$("#popupMediadetail").hide();
	},
	'click #uploadFile': function(){
		$('#media').hide();
		$('#mediaLibrary').removeClass('border');
		$('#uploadFile').addClass('border');
		$('#dropFile').show();
	},
    'click .selectedImg': function(e) {
        if(this._id){
            $('.selectedImg').removeClass('selected-border');
            $(e.currentTarget).addClass('selected-border');
            Session.set('postImageUrl', this.url);
        }
    },
    'change #selectMediaUrl': function (event, template) {
        FS.Utility.eachFile(event, function (file) {
            var img = event.target.files[0]
            Images.insert(file, function (err, fileObj) {
                if (err) {
                    console.log('error')
                } else {
                    var url = "/cfs/files/images/" + fileObj._id;
                    Session.set('uploadMediaUrl', url);
                    var currentUserId = Meteor.userId();
                    Meteor.call('insertMediaData', url, img.name, "-", img.type, img.size + " Bytes", "-", "-", "-", currentUserId, getCurrentDate());
                    $('#uploadFile').removeClass('border');
                    $('#dropFile').hide();
                    $('#mediaLibrary').addClass('border');
                    $('#media').show();
                    $("#popupMediadetail").hide();
                    Session.set('postImageUrl', url);
                }
            });
        });
    },
    'click #selectpublish': function () {
        var selectimage = Session.get('postImageUrl');
        Session.set('postImage', selectimage);
    },
    'click #removeImage': function () {
        Meteor.call('removeFeaturedImage', Session.get('selectedPostId'));
        Session.set('postImage', '');
    }
});

/*

 Has the heplper to find all the post published by the server.

 */

Template.posts.helpers({
    'postList': function () {
        return Posts.find();
    },
    'pageList': function () {
        return Pages.find();
    },
    'postListCount': function(){
    	return Posts.find().count();
    }
});

Template.addNewPost.helpers({
	'showSelectedPost': function(){
		return Posts.findOne(Session.get('selectedPostId'));
	},
	'pageList' : function() { 
		return Pages.find();
	},
	'mediaList' : function() {
		return Media.find();  
	},
	'getpostUrl' : function() { 
		return Session.get('postImage');
	},
    'showUploadMediaUrl' : function() {
        return Session.get('uploadMediaUrl');
    }
    // 'subPageList' : function(){
    // 	return Pages.find({parentId:{$ne:'null'}});
    // }
});

Template.adminHeader.events({
    'click #subNavBarpostsadd': function () {
        Session.set('selectedPostId', "");
        Session.set('postImage', "");
	},
	'click #subNavBarmediaadd' : function() {
    	$("#editPage").hide();
	}
});

Template.adminlayout.helpers({
	'errormsg' : function() {
		return Session.get('errorMessage');
	}
});
