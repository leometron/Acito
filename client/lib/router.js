
BHSListController = RouteController.extend({
  template: 'BHSlist',
  increment: 15, 

 postsLimit: function() { 
    return parseInt(this.params.postsLimit) || this.increment; 
  },

  findOptions: function() {
    return {sort: {sectionName: 1}, limit: this.postsLimit()};
  },

  subscriptions: function() {
    if(Session.get('title') == "ICD-10 codes"){
      this.ICDSubscribed= Meteor.subscribe('ICD', this.findOptions());
    }else if(Session.get('title') == "DSM-5 codes"){
       this.DSMSubscribed= Meteor.subscribe('DSM', this.findOptions());
    }else{
      this.CodingRulesSubscribed= Meteor.subscribe('codingRules', this.findOptions());
    }
  },

  posts: function() {
    if(Session.get('title') == "ICD-10 codes"){
      return ICD.find({}, this.findOptions());
    }else if(Session.get('title') == "DSM-5 codes"){
       return DSM.find({}, this.findOptions());
    }else{
      return codingRules.find({}, this.findOptions());
    }
  },

  data: function() {
    var self = this;
    var arr = [];
    var data = self.posts().fetch();
    

    if(Session.get('title') == "ICD-10 codes"){
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
          listICD: arr,
          ready: self.ICDSubscribed.ready,
          nextPath: function() {
            if (self.posts().count() === self.postsLimit()){
                return self.nextPath();
            }
          }
      };
    } else  if(Session.get('title') == "DSM-5 codes"){
        var prevSectionName="";
        var prevSubSectionName = "";
        if(data.length>0){
          for(var i=0;i<data.length;i++){
            var obj=new Object();
            if(prevSectionName!=data[i].sectionName){
              obj.sectionName=data[i].sectionName;
            }
            if(prevSubSectionName!=data[i].subSectionName){
               obj.subSectionName=data[i].subSectionName;
            }
            obj.DSMCode=data[i].DSMCode;
            obj.DSMDetail=data[i].DSMDetail;
            prevSectionName = data[i].sectionName;
            prevSubSectionName = data[i].subSectionName;
            arr.push(obj);
          }
        }
        return {
          listDSM: arr,
          ready: self.DSMSubscribed.ready,
          nextPath: function() {
            if (self.posts().count() === self.postsLimit()){
                return self.nextPath();
              }
          }
      };
    }else{
      if(data.length>0){
          for(var i=0;i<data.length;i++){
            var obj=new Object();
            obj.guideline=data[i].guideline;
            obj.definition=data[i].definition;
            arr.push(obj);
          }
        }
        return {
          listCodingRule: arr,
          ready: self.CodingRulesSubscribed.ready,
          nextPath: function() {
            if (self.posts().count() === self.postsLimit()){
              return self.nextPath();
            }
          }
      };
    }
  }
});

BHSController = BHSListController.extend({
    nextPath: function() {
        return Router.routes.BHSlist.path({postsLimit: this.postsLimit() + this.increment});
    }
});

Router.route('/', {
  name: 'BHShome',
  layoutTemplate: '',
});

Router.route('/list', {
  controller: BHSController,
  layoutTemplate: ''
});

Router.route('/list/:postsLimit?', {
  name: 'BHSlist',
  controller: BHSController,
  layoutTemplate: ''
});

