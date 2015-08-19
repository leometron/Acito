/*

 Created by LingaRaja.

 Has the events and helpers related to theme selection.

 */

Meteor.subscribe('theme');

Template.themes.events({
    'click .themeSelection': function (e) {
        $('.themeSelection').removeClass('selected-border');
        selectedImage(e);
    },
    'click #selectTheme': function () {
        // var selectedThemeId = $('.themeSelection.selected-border').attr('id');
        Meteor.call('saveTheme', $('.themeSelection.selected-border').attr('id'));
        console.log($('.themeSelection.selected-border').attr('id'));
        Session.set('themeName', $('.themeSelection.selected-border').attr('id'))
        Router.go("http://localhost:3000/");

    }
});