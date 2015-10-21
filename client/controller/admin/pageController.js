Meteor.subscribe('Pages');

var selectedIds = [];

Template.pages.helpers({
    'lists': function () {
        return Pages.find();
    },
    'pageListCount': function() {
        return Pages.find().count();
    }
});

  Template.pages.rendered = function(){
    $('#apply').hide();
    $('.dropdown-button').dropdown({
        inDuration: 300,
        outDuration: 225,
        constrain_width: true,
        gutter: 0,
        belowOrigin: true,
        alignment: 'center'
    }); 
    var status = Session.get('pageStatus');
    var bulkOptionArr = ['Delete', 'Move to Bin'];
    if ( status == "all" ) {
       $('#pageAll').css('color','red');
    } else if ( status == "published" ) {
       $('#pagePublish').css('color','red');
    } else if ( status == "draft" ) {
       $('#pageDraft').css('color','red');
    } else if ( status == "bin" ) {
        bulkOptionArr = ['Delete'];
       $('#pageBin').css('color','red');
    } else {
        $('#pageAll').css('color', 'red');
    }
    var t = '<li class="action-item">Bulk Actions</li>';
    $('ul#bulkActions').html('');
    
    for(var i = 0; i < bulkOptionArr.length; i++) {
        t += '<li class="divider"></li>'
            +'<li class="action-item">' + bulkOptionArr[i] + '</li>';
    }
    $('ul#bulkActions').html(t);
};

  Template.addNewPage.rendered = function(){
    $('.dropdown-button').dropdown({
        inDuration: 300,
        outDuration: 225,
        constrain_width: true,
        gutter: 0,
        belowOrigin: true,
        alignment: 'center'
    });
    var selectedPages = Session.get('selectedPages');
    var pageDoc = Pages.findOne(selectedPages);
    if(pageDoc) {
        Session.set('parentId', pageDoc.parentId);
        Session.set('parentTitle', pageDoc.parentTitle);
    } else {
        Session.set('parentId', '');
        Session.set('parentTitle', '');
    }
  };

Template.pages.events ({
        
        'click #list': function() {
            var userId = this._id;
            Session.set('selectedPages', userId);
            Router.go('/admin/pages/edit');
        },

        'click #editlist': function() {
          var userId = this._id;
          Session.set('selectedPages', userId);
        },

        'click #binlist': function()  {
          var userId = this._id;
          Meteor.call('listbinPagesData', userId);
        },

        'click #restorelist': function() {
            var userId = this._id;
           Meteor.call('restorePagesData', userId);
        },

        'click #deletelist': function() {
            var userId = this._id;
            Meteor.call('trashPagesData', userId);
        },

        'click #addNew': function(){
           // Session.set('selectedPages', ''); 
            $(location).attr('href','pages/add');
            // Router.go('/admin/pages/add');
        },

        'click #search': function() {
            var search = $('#pagesearch').val();
            Meteor.call('searchData', search);
            Meteor._reload.reload();
            Session.set('pageStatus', "all");    
        },

        'click #pageAll': function() {
            Meteor.call('loadPage', "All");
            Meteor._reload.reload();
            Session.set('pageStatus', "all");  
        },

        'click #pagePublish': function() {
            Meteor.call('loadPage', "Published");
            Meteor._reload.reload();
            Session.set('pageStatus', "published");   
        },

        'click #pageDraft': function() {
            Meteor.call('loadPage', "Draft");
            Meteor._reload.reload(); 
            Session.set('pageStatus', "draft");  
        },

         'click #pageBin': function() {
            Meteor.call('loadPage', "Bin");
            Meteor._reload.reload();
            Session.set('pageStatus', "bin");   
        },

         'click .action-item': function (event) {            
           $('#bulkOptionDropDown').text($(event.target).text());
           if($('#bulkOptionDropDown').text() != "Bulk Actions") {
            $('#apply').fadeIn(500);
           } else {
            $('#apply').fadeOut(500);
           }           
        },

         'click .checkbox': function(event) {
            if (event.target.checked == true) {
              selectedIds.push( this._id);
            } else {
              var index = selectedIds.indexOf(this._id);
              selectedIds.splice(index, 1);
            }
        },
        'click #checkboxPagesAll' : function(event) {
            var selectcheck = event.target.checked;
            if(selectcheck == true){
                $('.checkbox:checkbox').prop('checked',true);
            }else{
                $('.checkbox:checkbox').prop('checked',false);
            }
            $(".checkbox:checkbox").each(function() {
               if(this.checked){
                    selectedIds.push(this.value);
               }else{
                    var index = selectedIds.indexOf(this.value);
                    selectedIds.splice(index, 1);
               }
           });
        },
        'click #Bulkapply' : function () {
          Meteor.call('bulkMethod', selectedIds, $('#bulkOptionDropDown').text());
          Meteor._reload.reload();
          Session.set('pageStatus', "all");
        },

        // 'click #Datefilter': function(event) {
        //    var date = $('#filterdate').val();
        //    Meteor.call('dateFilter', date);
        //    Meteor._reload.reload();
        //    Session.set('pageStatus', "all");
        // },
        'change #filterdate' : function() {
           var date = $('#filterdate').val();
           Meteor.call('dateFilter', date);
           Meteor._reload.reload();
           Session.set('pageStatus', "all");
        }
});


Template.addNewPage.events({
    'click #publish': function () {
        if (!$('#title').val()) {
            Materialize.toast('Page title is required', 3000, 'error-toast');
        } else {
            var parentId = (!Session.get('parentId')) ? "null" : Session.get('parentId');
            var parentTitle = (!Session.get('parentTitle')) ? "null" : Session.get('parentTitle');
            var pagecomment = (!$('#comments').val()) ? "-" : $('#comments').val();
            var priority;
            if ($('#yesButton').prop('checked')) {
                priority = "yes";
            } else {
                priority = "no";
            }
            Meteor.call('insertPagesData', $('#title').val(), pagecomment, getCurrentDate(), parentId, parentTitle, priority);
            Router.go('/admin/pages');
            Session.set('parentId', '');
            Session.set('parentTitle', '');
        }
    },

    'click #draft': function () {
        if (!$('#title').val()) {
            Materialize.toast('Page title is required', 3000, 'error-toast');
        } else {
            var parentId = (!Session.get('parentId')) ? "null" : Session.get('parentId');
            var parentTitle = (!Session.get('parentTitle')) ? "null" : Session.get('parentTitle');
            var pagecomment = (!$('#comments').val()) ? "-" : $('#comments').val();
            var priority;
            if ($('#yesButton').prop('checked')) {
                priority = "yes";
            } else {
                priority = "no";
            }            
            Meteor.call('draftPagesData', $('#title').val(), pagecomment, getCurrentDate(), parentId, parentTitle, priority);
            Router.go('/admin/pages');
            Session.set('parentId', '');
            Session.set('parentTitle', '');
        }
    },

    'click #updatebin': function () {
        if (!$('#pageTitle').val()) {
            Materialize.toast('Page title is required', 3000, 'error-toast');
        } else {
            var selectedPages = Session.get('selectedPages');
            var parentId = (!Session.get('parentId')) ? "null" : Session.get('parentId');
            var parentTitle = (!Session.get('parentTitle')) ? "null" : Session.get('parentTitle');
            var pagecomment = (!$('#pageComments').val()) ? "-" : $('#pageComments').val();
            Meteor.call('deletePagesData', $('#pageTitle').val(), pagecomment, selectedPages, parentId, parentTitle);
            Router.go('/admin/pages');
            Session.set('parentId', '');
            Session.set('parentTitle', '');
        }
    },

    'click #insertbin': function () {
        if (!$('#title').val()) {
            Materialize.toast('Page title is required', 3000, 'error-toast');
        } else {
            var parentId = (!Session.get('parentId')) ? "null" : Session.get('parentId');
            var parentTitle = (!Session.get('parentTitle')) ? "null" : Session.get('parentTitle');
            var pagecomment = (!$('#comments').val()) ? "-" : $('#comments').val();
            Meteor.call('binPagesData', $('#title').val(), pagecomment, getCurrentDate(), parentId, parentTitle);
            Router.go('/admin/pages');
            Session.set('parentId', '');
            Session.set('parentTitle', '');
        }
    },

    'click #update': function () {
        if (!$('#pageTitle').val()) {
            Materialize.toast('Page title is required', 3000, 'error-toast');
        } else {
            var selectedPages = Session.get('selectedPages');
            var parentId = (!Session.get('parentId')) ? "null" : Session.get('parentId');
            var parentTitle = (!Session.get('parentTitle')) ? "null" : Session.get('parentTitle');
            var pagecomment = (!$('#pageComments').val()) ? "-" : $('#pageComments').val();
            Meteor.call('updatePagesData', $('#pageTitle').val(), pagecomment, selectedPages, parentId, parentTitle);
            Router.go('/admin/pages');
            Session.set('parentId', '');
            Session.set('parentTitle', '');
        }
    },

    'click #delete': function () {
        var selectedPages = Session.get('selectedPages');
        Meteor.call('trashPagesData', selectedPages);
    },

    'click #restore': function () {
        var selectedPages = Session.get('selectedPages');
        Meteor.call('restorePagesData', selectedPages);
        Router.go('/admin/pages');
    },

    'click #republish': function () {
        if (!$('#pageTitle').val()) {
            Materialize.toast('Page title is required', 3000, 'error-toast');
        } else {
            var selectedPages = Session.get('selectedPages');
            var parentId = (!Session.get('parentId')) ? "null" : Session.get('parentId');
            var parentTitle = (!Session.get('parentTitle')) ? "null" : Session.get('parentTitle');
            var pagecomment = (!$('#pageComments').val()) ? "-" : $('#pageComments').val();
            Meteor.call('RePublishPagesData', $('#pageTitle').val(), pagecomment, selectedPages, parentId, parentTitle);
            Router.go('/admin/pages');
            Session.set('parentId', '');
            Session.set('parentTitle', '');
        }
    },
    'click .drop-down-item': function(event) {
        var parentName = $(event.target).text();
        var parentId = this._id;
        $('.drop-down-label').text($(event.target).text());
        Session.set('parentId', parentId);
        Session.set('parentTitle', parentName);
    }
});

Template.addNewPage.helpers({
    selectedPage: function () {
        var selectedPages = Session.get('selectedPages');
        return Pages.findOne(selectedPages);
    },

    parentPages: function () {
        return Pages.find({parentId: 'null', status: 'Published'});
    }
});


Template.adminHeader.events({
    'click #subNavBarpagesadd': function () {
        Session.set('selectedPages', "");
    }
});

Template.registerHelper('equals', function (a, b) {
    return a === b;
});
