Meteor.subscribe('Pages');

var selectedIds = [];

Template.pages.helpers({
    'lists': function () {
        return Pages.find();
    }
});

Template.pages.rendered = function () {
    var status = Session.get('checkStatus');
    if (status == "all") {
        $('#pageAll').css('color', 'red');
    } else if (status == "published") {
        $('#pagePublish').css('color', 'red');
    } else if (status == "draft") {
        $('#pageDraft').css('color', 'red');
    } else if (status == "bin") {
        $('#pageBin').css('color', 'red');
    } else {
        $('#pageAll').css('color', 'red');
    }
};

Template.addNewPage.rendered = function () {
    Session.set('errorMessage', '');
};

Template.pages.events({

    'click #list': function () {
        var userId = this._id;
        Session.set('selectedPages', userId);
        Session.set('errorMessage', "");
        Router.go('/admin/pages/edit');
    },

    'click #editlist': function () {
        var userId = this._id;
        Session.set('selectedPages', userId);
    },

    'click #binlist': function () {
        var userId = this._id;
        Meteor.call('listbinPagesData', userId);
    },

    'click #restorelist': function () {
        var userId = this._id;
        Meteor.call('restorePagesData', userId);
    },

    'click #deletelist': function () {
        var userId = this._id;
        Meteor.call('trashPagesData', userId);
    },

    'click #addNew': function () {
        // Session.set('selectedPages', '');
        $(location).attr('href', 'pages/add');
        // Router.go('/admin/pages/add');
    },

    'click #search': function () {
        var search = $('#pagesearch').val();
        Meteor.call('searchData', search);
        Meteor._reload.reload();
        Session.set('checkStatus', "all");
    },

    'click #pageAll': function () {
        Meteor.call('loadPage', "All");
        Meteor._reload.reload();
        Session.set('checkStatus', "all");
    },

    'click #pagePublish': function () {
        Meteor.call('loadPage', "Published");
        Meteor._reload.reload();
        Session.set('checkStatus', "published");
    },

    'click #pageDraft': function () {
        Meteor.call('loadPage', "Draft");
        Meteor._reload.reload();
        Session.set('checkStatus', "draft");
    },

    'click #pageBin': function () {
        Meteor.call('loadPage', "Bin");
        Meteor._reload.reload();
        Session.set('checkStatus', "bin");
    },

    'click .menuitem': function (event) {
        $('#dropdownMenu1').text($(event.target).text());
    },

    'click .checkbox': function (event) {
        if (event.target.checked == true) {
            selectedIds.push(this._id);
        } else {
            var index = selectedIds.indexOf(this._id);
            selectedIds.splice(index, 1);
        }
    },

    'click #Bulkapply': function () {
        Meteor.call('bulkMethod', selectedIds, $('#dropdownMenu1').text());
        Meteor._reload.reload();
        Session.set('checkStatus', "all");
    },

    'click #Datefilter': function (event) {
        var date = $('#filterdate').val();
        Meteor.call('dateFilter', date);
        Meteor._reload.reload();
        Session.set('checkStatus', "all");
    }
});


Template.addNewPage.events({
    'click #publish': function () {
        if (!$('#title').val()) {
            Session.set('errorMessage', 'Page title is required');
        } else {
            Session.set('errorMessage', '');
            var ParentTitle = Session.get('ParentTitle');
            var parentinsert = (!ParentTitle) ? "(no parent)" : ParentTitle;
            var pagecomment = (!$('#comments').val()) ? "-" : $('#comments').val();
            Meteor.call('insertPagesData', $('#title').val(), pagecomment, getCurrentDate(), parentinsert);
            Router.go('/admin/pages');
        }
    },

    'click #draft': function () {
        if (!$('#title').val()) {
            Session.set('errorMessage', 'Page title is required');
        } else {
            Session.set('errorMessage', '');
            var ParentTitle = Session.get('ParentTitle');
            var parentinsert = (!ParentTitle) ? "(no parent)" : ParentTitle;
            var pagecomment = (!$('#comments').val()) ? "-" : $('#comments').val();
            Meteor.call('draftPagesData', $('#title').val(), pagecomment, getCurrentDate(), parentinsert);
            Router.go('/admin/pages');
        }
    },

    'click #updatebin': function () {
        if (!$('#pageTitle').val()) {
            Session.set('errorMessage', 'Page title is required');
        } else {
            Session.set('errorMessage', '');
            var ParentTitle = Session.get('ParentTitle');
            var parentinsert = (!ParentTitle) ? "(no parent)" : ParentTitle;
            var selectedPages = Session.get('selectedPages');
            var pagecomment = (!$('#pageComments').val()) ? "-" : $('#pageComments').val();
            Meteor.call('deletePagesData', $('#pageTitle').val(), pagecomment, selectedPages, parentinsert);
            Router.go('/admin/pages');
        }
    },

    'click #insertbin': function () {
        if (!$('#title').val()) {
            Session.set('errorMessage', 'Page title is required');
        } else {
            Session.set('errorMessage', '');
            var ParentTitle = Session.get('ParentTitle');
            var parentinsert = (!ParentTitle) ? "(no parent)" : ParentTitle;
            var pagecomment = (!$('#comments').val()) ? "-" : $('#comments').val();
            Meteor.call('binPagesData', $('#title').val(), pagecomment, getCurrentDate(), parentinsert);
            Router.go('/admin/pages');
        }
    },

    'click #update': function () {
        if (!$('#pageTitle').val()) {
            Session.set('errorMessage', 'Page title is required');
        } else {
            Session.set('errorMessage', '');
            var ParentTitle = Session.get('ParentTitle');
            var parentinsert = (!ParentTitle) ? "(no parent)" : ParentTitle;
            var selectedPages = Session.get('selectedPages');
            var pagecomment = (!$('#pageComments').val()) ? "-" : $('#pageComments').val();
            Meteor.call('updatePagesData', $('#pageTitle').val(), pagecomment, selectedPages, parentinsert);
            Router.go('/admin/pages');
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
            Session.set('errorMessage', 'Page title is required');
        } else {
            Session.set('errorMessage', '');
            var ParentTitle = Session.get('ParentTitle');
            var parentinsert = (!ParentTitle) ? "(no parent)" : ParentTitle;
            var selectedPages = Session.get('selectedPages');
            var pagecomment = (!$('#pageComments').val()) ? "-" : $('#pageComments').val();
            Meteor.call('RePublishPagesData', $('#pageTitle').val(), pagecomment, selectedPages, parentinsert);
            Router.go('/admin/pages');
        }
    },

    'click .parentlist': function (event) {
        var parentName = $(event.target).text();
        $('#parentinsert').text($(event.target).text());
        Session.set('ParentTitle', parentName);
    }
});

Template.addNewPage.helpers({
    'PublishedPages': function () {
        var selectedPages = Session.get('selectedPages');
        return Pages.findOne(selectedPages);
    },

    'NoParentPages': function () {
        return Pages.find();
    },

    'errormsg': function () {
        return Session.get('errorMessage');
    }
});


Template.adminHeader.events({
    'click #subNavBarpagesadd': function () {
        Session.set('selectedPages', "");
    },
    'click #navBarpages': function () {
        Session.set('errorMessage', "");
    }
});

Template.registerHelper('equals', function (a, b) {
    return a === b;
});
