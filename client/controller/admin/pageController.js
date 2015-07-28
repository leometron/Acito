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

        'click #addNew': function(){
            $(location).attr('href','pages/add');
        },

        'click #search': function() {
            var search = $('#pagesearch').val();
            Meteor.call('searchData', search);
            Meteor._reload.reload();   
        }
    });


 Template.addNewPage.events({
        'click #publish': function() {

           Meteor.call('insertPagesData', $('#title').val(), $('#comments').val());
           Router.go('/admin/pages');
        },

         'click #draft': function() {
   
           Meteor.call('draftPagesData', $('#title').val(),  $('#comments').val());
           Router.go('/admin/pages');
        },

        'click #updatebin': function() {

            var selectedPages = Session.get('selectedPages');
            Meteor.call('deletePagesData', $('#pageTitle').val(), $('#pageComments').val(), selectedPages);  
        },

         'click #insertbin': function() {

            Meteor.call('binPagesData', $('#title').val(), $('#comments').val());
        },

        'click #update': function() {
            var selectedPages = Session.get('selectedPages');

           Meteor.call('updatePagesData', $('#pageTitle').val(),  $('#pageComments').val(), selectedPages);
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

            var selectedPages = Session.get('selectedPages');

            Meteor.call('RePublishPagesData', $('#pageTitle').val(), $('#pageComments').val(), selectedPages);
            Router.go('/admin/pages');
            
        },

        'click #parentinsert': function() {

          var parentUsername = this.title;
          Session.set('ParentName', parentUsername);
          console.log(parentUsername);

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