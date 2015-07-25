 Meteor.subscribe('Pages');

    Template.pages.helpers ({
        'lists' : function() {
            return Pages.find();
        }
    });

Template.pages.events({
        'click #list': function() {
            var userId = this._id;
            Session.set('selectedPages', userId);
            Router.go('/admin/pages/add');
        },

        'click #addNew': function(){
            $(location).attr('href','pages/add');
        }
    });


 Template.addNewPage.events({
        'click #publish': function() {

            var title = $('#title').val();
            var content = $('#comments').val();
   
           Meteor.call('insertPagesData', title, content);
           Router.go('/admin/pages');
        },

         'click #draft': function() {

             var title = $('#title').val();
            var content = $('#comments').val();
   
           Meteor.call('draftPagesData', title, content);
           Router.go('/admin/pages');

        },

        'click #updatebin': function() {

             var selectedPages = Session.get('selectedPages');
            var pageTitle = $('#pageTitle').val();
            var pageComments = $('#pageComments').val();

            Meteor.call('deletePagesData', pageTitle, pageComments, selectedPages);
            
        },


         'click #insertbin': function() {

             var title = $('#title').val();
            var content = $('#comments').val();

           Meteor.call('binPagesData', title, content);

        },

        'click #update': function() {
            var selectedPages = Session.get('selectedPages');
            var pageTitle = $('#pageTitle').val();
            var pageComments = $('#pageComments').val();

           Meteor.call('updatePagesData', pageTitle, pageComments, selectedPages);
           Router.go('/admin/pages');
        },

        'click #delete': function() {
            var selectedPages = Session.get('selectedPages');
            Meteor.call('crashPagesData', selectedPages);
        },

         'click #restore': function() {
            var selectedPages = Session.get('selectedPages');
            Meteor.call('restorePagesData', selectedPages);
            Router.go('/admin/pages');
        },

        'click #republish': function() {

            var selectedPages = Session.get('selectedPages');
            var pageTitle = $('#pageTitle').val();
            var pageComments = $('#pageComments').val();

            Meteor.call('RePublishPagesData', pageTitle, pageComments, selectedPages);
            Router.go('/admin/pages');
            
        }
    });

 Template.addNewPage.helpers({
        'PublishedPages': function() {
            var selectedPages = Session.get('selectedPages');
              return Pages.findOne(selectedPages);

        }
    });
