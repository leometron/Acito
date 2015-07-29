 Meteor.subscribe('Pages');

    Template.pages.helpers ({
        'lists' : function() {
            return Pages.find();
        }
    });

Template.pages.events ({
        
        'click #list': function() {
            var userId = this._id;
            Session.set('selectedPages', userId);
            Router.go('/admin/pages/add');
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
            $(location).attr('href','pages/add');
        },

        'click #search': function() {
            var search = $('#pagesearch').val();
            Meteor.call('searchData', search);
            Meteor._reload.reload();   
        },

        'click #pageAll': function() {
            Meteor.call('loadPage', "All");
            Meteor._reload.reload();  
        },

        'click #pagePublish': function() {
            Meteor.call('loadPage', "Published");
            Meteor._reload.reload();  
        },

        'click #pageDraft': function() {
            Meteor.call('loadPage', "Draft");
            Meteor._reload.reload();  
        },

         'click #pageBin': function() {
            Meteor.call('loadPage', "Bin");
            Meteor._reload.reload();  
        },
         'click .menuitem': function (event) {            
        $('#dropdownMenu1').text( $(event.target).text());            
    }
    });


 Template.addNewPage.events({
        'click #publish': function() {
           var ParentTitle = Session.get('ParentTitle'); 
           var parentinsert = (!ParentTitle) ? "(no parent)" : ParentTitle;
           
           Meteor.call('insertPagesData', $('#title').val(), $('#comments').val(), getCurrentDate(), parentinsert);
           Router.go('/admin/pages');
        },

         'click #draft': function() {
           var ParentTitle = Session.get('ParentTitle'); 
           var parentinsert = (!ParentTitle) ? "(no parent)" : ParentTitle;
   
           Meteor.call('draftPagesData', $('#title').val(),  $('#comments').val(), getCurrentDate(), parentinsert);
           Router.go('/admin/pages');
        },

        'click #updatebin': function() {
            var ParentTitle = Session.get('ParentTitle'); 
            var parentinsert = (!ParentTitle) ? "(no parent)" : ParentTitle;
            var selectedPages = Session.get('selectedPages');

            Meteor.call('deletePagesData', $('#pageTitle').val(), $('#pageComments').val(), selectedPages, parentinsert);  
        },

         'click #insertbin': function() {
             var ParentTitle = Session.get('ParentTitle'); 
             var parentinsert = (!ParentTitle) ? "(no parent)" : ParentTitle;

            Meteor.call('binPagesData', $('#title').val(), $('#comments').val(), getCurrentDate(), parentinsert);
        },

        'click #update': function() {
            var ParentTitle = Session.get('ParentTitle'); 
            var parentinsert = (!ParentTitle) ? "(no parent)" : ParentTitle;
            var selectedPages = Session.get('selectedPages');

            Meteor.call('updatePagesData', $('#pageTitle').val(),  $('#pageComments').val(), selectedPages, parentinsert);
            Router.go('/admin/pages');
        },

        'click #delete': function() {
            var selectedPages = Session.get('selectedPages');
            Meteor.call('trashPagesData', selectedPages);
        },

         'click #restore': function() {
            var selectedPages = Session.get('selectedPages');
            Meteor.call('restorePagesData', selectedPages);
            Router.go('/admin/pages');
        },

        'click #republish': function() {
            var ParentTitle = Session.get('ParentTitle'); 
            var parentinsert = (!ParentTitle) ? "(no parent)" : ParentTitle;
            var selectedPages = Session.get('selectedPages');

            Meteor.call('RePublishPagesData', $('#pageTitle').val(), $('#pageComments').val(), selectedPages, parentinsert);
            Router.go('/admin/pages');
            
        },

        'click .parentlist': function (event) { 
        
            var parentName = $(event.target).text();       
            $('#parentinsert').text( $(event.target).text());
            Session.set('ParentTitle', parentName);        
        }
    });

 Template.addNewPage.helpers ({
        'PublishedPages': function() {
            var selectedPages = Session.get('selectedPages');
              return Pages.findOne(selectedPages);

        },

        'NoParentPages': function() {
           return Pages.find();
        }
    });


 Template.adminHeader.events ({
        'click #subNavBarpagesadd': function() {
          Session.set('selectedPages', ""); 
        }
 });

 Template.registerHelper('equals', function (a, b) {
      return a === b;
    });
