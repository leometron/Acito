Meteor.subscribe('homeslider');

var selectedIds = [];

Template.addNewMedia.rendered = function () {
    $("#popupMediadetail").hide();
};

Template.addNewHomeSlider.rendered = function () {
    Session.set('errorMessage', '');
};

Template.addNewHomeSlider.events({
    'click #selectImage': function () {
        // alert("success");
        $('#uploadFile').addClass('border');
        $('#media').hide();
        $('#mediaLibrary').removeClass('border');
        $('#dropFile').show();
    },
    'click #mediaLibrary': function () {
        $('#uploadFile').removeClass('border');
        $('#dropFile').hide();
        $('#mediaLibrary').addClass('border');
        $('#media').show();
        $("#popupMediadetail").hide();
    },
    'click #uploadFile': function () {
        $('#media').hide();
        $('#mediaLibrary').removeClass('border');
        $('#uploadFile').addClass('border');
        $('#dropFile').show();
    },
    'click .selectedImg': function (e) {
        if (this._id) {
            $('.selectedImg').removeClass('selected-border');
            $(e.currentTarget).addClass('selected-border');
            Session.set('selectedImageUrl', this.url);
            Session.set('selectimgName', this.name);
        }
    },
    'change #selectSlideUrl': function (event, template) {
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
                    Session.set('selectedImageUrl', url);
                    Session.set('selectimgName', img.name);
                }
            });
        });
    },
    'click #sliderpublish': function () {
        var selectimage = Session.get('selectedImageUrl');
        Session.set('selectImage', selectimage);
    },
    'click #saveSlider': function () {
        if (!$('#sliderTitle').val()) {
            Session.set('errorMessage', 'Home Slider title is required');
        } else if (!Session.get('selectimgName')) {
            Session.set('errorMessage', 'Home Slider image is required');
        } else {
            Session.set('errorMessage', '');
            var sliderImage = $('#sliderImage').attr('src');
            Meteor.call('insertSliderData', $('#sliderTitle').val(), Session.get('selectimgName'), sliderImage, getCurrentDate());
            Router.go('/admin/homeSliders');
        }
    },
    'click #publishSlider': function () {
        if (!$('#sliderTitle').val()) {
            Session.set('errorMessage', 'Home Slider title is required');
        } else if (!Session.get('selectimgName')) {
            Session.set('errorMessage', 'Home Slider image is required');
        } else {
            Session.set('errorMessage', '');
            var sliderImage = $('#sliderImage').attr('src');
            Meteor.call('publishSliderData', $('#sliderTitle').val(), Session.get('selectimgName'), sliderImage, getCurrentDate());
            Router.go('/admin/homeSliders');
        }
    },
    'click #republishSlider': function () {
        if (!$('#sliderTitle').val()) {
            Session.set('errorMessage', 'Home Slider title is required');
        } else if (!$('#sliderName').val()) {
            Session.set('errorMessage', 'Home Slider image is required');
        } else {
            Session.set('errorMessage', '');
            var sliderImage = $('#sliderImage').attr('src');
            var sliderId = Session.get('selectedSliderId');
            Meteor.call('republishSliderData', $('#sliderTitle').val(), $('#sliderName').val(), sliderImage, getCurrentDate(), sliderId);
            Router.go('/admin/homeSliders');
        }
    },
    'click #updateSlider': function () {
        if (!$('#sliderTitle').val()) {
            Session.set('errorMessage', 'Home Slider title is required');
        } else if (!$('#sliderName').val()) {
            Session.set('errorMessage', 'Home Slider image is required');
        } else {
            Session.set('errorMessage', '');
            var sliderImage = $('#sliderImage').attr('src');
            var sliderId = Session.get('selectedSliderId');
            Meteor.call('updateSliderData', $('#sliderTitle').val(), $('#sliderName').val(), sliderImage, getCurrentDate(), sliderId);
            Router.go('/admin/homeSliders');
        }
    },

    'click #moveBin': function () {
        Meteor.call('binSliderData', Session.get('selectedSliderId'));
        Router.go('/admin/homeSliders');
    },
    'click #removeSlider': function () {
        Meteor.call('removeSliderData', Session.get('selectedSliderId'));
        Router.go('/admin/homeSliders');
    },
    'click #restoreSlider': function () {
        Meteor.call('unbinSliderData', Session.get('selectedSliderId'), Session.get('SliderPublishId'));
        Router.go('/admin/homeSliders');
    }

});

// Meteor.subscribe('Media');

Template.addNewHomeSlider.helpers({
    'mediaList': function () {
        return Media.find();
    },
    'errormsg': function () {
        return Session.get('errorMessage');
    },
    'getUrlValue': function () {
        return Session.get('selectImage');
    },
    'imageName': function () {
        return Session.get('selectimgName');
    },
    'showSelectedSlider': function () {
        return homeslider.findOne(Session.get('selectedSliderId'));
    },
});

Template.homeSlider.helpers({
    'sliderList': function () {
        return homeslider.find();
    }
});

Template.homeSlider.events({
    'click #addNew': function () {
        // Session.set('selectedSliderId', '');
        $(location).attr('href', 'homeSliders/add');
        // Router.go("/admin/homeSliders/add");
    },
    'click #slider': function () {
        Session.set('selectedSliderId', this._id);
        Session.set('SliderPublishId', this.published);
        Session.set('errorMessage', "");
        Session.set('selectImage', '');
        Session.set('selectimgName', '');
        Router.go("/admin/homeSliders/edit");
    },
    'click #searchSlider': function () {
        Meteor.call('searchSlider', $('#searchString').val());
        Meteor._reload.reload();
        Session.set('checkStatus', "all");
    },
    'click #Datefilter': function () {
        Meteor.call('dateSlider', $('#filterdate').val());
        Meteor._reload.reload();
        Session.set('checkStatus', "all");
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
        Meteor.call('bulkSlider', selectedIds, $('#dropdownMenu1').text());
        Meteor._reload.reload();
        Session.set('checkStatus', "all");
    },
    'click #sliderAll': function () {
        Meteor.call('loadSlider', "All");
        Meteor._reload.reload();
        Session.set('checkStatus', "all");
    },
    'click #sliderPublish': function () {
        Meteor.call('loadSlider', "Published");
        Meteor._reload.reload();
        Session.set('checkStatus', "published");
    },
    'click #sliderDraft': function () {
        Meteor.call('loadSlider', "Draft");
        Meteor._reload.reload();
        Session.set('checkStatus', "draft");
    },
    'click #sliderBin': function () {
        Meteor.call('loadSlider', "Bin");
        Meteor._reload.reload();
        Session.set('checkStatus', "bin");
    }
});

Template.adminHeader.events({
    'click #subNavBarHomeSlidersadd': function () {
        Session.set('selectedSliderId', '');
    },
    'click #navBarHomeSliders': function () {
        Session.set('errorMessage', "");
        Session.set('selectImage', '');
        Session.set('selectimgName', '');
    }
});

Template.homeSlider.rendered = function () {
    var status = Session.get('checkStatus');
    if (status == "all") {
        $('#sliderAll').css('color', 'red');
    } else if (status == "published") {
        $('#sliderPublish').css('color', 'red');
    } else if (status == "draft") {
        $('#sliderDraft').css('color', 'red');
    } else if (status == "bin") {
        $('#sliderBin').css('color', 'red');
    } else {
        $('#sliderAll').css('color', 'red');
    }
};
