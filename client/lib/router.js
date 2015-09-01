
BHSListController = RouteController.extend({
  template: 'BHSlist',
  increment: 10, 
 postsLimit: function() { 
    return parseInt(this.params.postsLimit) || this.increment; 
  },

  findOptions: function() {
    return {sort: this.sort, limit: this.postsLimit()};
  },

  subscriptions: function() {
    this.icdSubscribed= Meteor.subscribe('ICD', this.findOptions());
  },

  posts: function() {
    return ICD.find({}, this.findOptions());
  },

  data: function() {
    var self = this;
    var data = self.posts().fetch();
    var arr = [];
    var prevSectionName="";
    if(data.length>0){
      for(var i=0;i<data.length;i++){
        var obj = new  Object();
        if(prevSectionName!=data[i].sectionName){
          obj.sectionName = data[i].sectionName;
        }
        obj.code = data[i].code;
        obj.detail = data[i].detail;
        prevSectionName = data[i].sectionName;
        arr.push(obj);
      }
    }

    return {
      listIcd: arr,
      ready: self.icdSubscribed.ready,
      nextPath: function() {
        if (self.posts().count() === self.postsLimit())
          return self.nextPath();
      }
    };
  }
});

NewBHSController = BHSListController.extend({
   sort: {sectionName: 1},
    nextPath: function() {
      return Router.routes.BHSlist.path({postsLimit: this.postsLimit() + this.increment})
    }
});

Router.route('/', {
  name: 'BHShome',
  layoutTemplate: '',
});

Router.route('/list', {
  controller: NewBHSController,
  layoutTemplate: ''
});

Router.route('/list/:postsLimit?', {
  name: 'BHSlist',
  controller: NewBHSController,
  layoutTemplate: ''
});


