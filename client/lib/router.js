
BHSListController = RouteController.extend({
  template: 'BHSlist',
  increment: 30, 

  postsLimit: function() { 
    return parseInt(this.params.postsLimit) || this.increment; 
  },
  findOptions: function() {
    if(Session.get('title') == "DSM-5 codes") {
      return {sort: {sectionName: 1,subSectionName:1}, limit: this.postsLimit()};      
    } else if(Session.get('title') == "ICD-10 codes") {
      return {sort: {sectionName: 1}, limit: this.postsLimit()};
    } else {
      return {sort: {guideline: 1}, limit: this.postsLimit()};      
    }
  },

  subscriptions: function() {
    if(Session.get('title') == "ICD-10 codes"){
      this.ICDSubscribed= Meteor.subscribe('ICD', this.findOptions(),function () {
        Session.set('ICD_data_loaded', true);
       });
    }else if(Session.get('title') == "DSM-5 codes"){
       this.DSMSubscribed= Meteor.subscribe('DSM', this.findOptions(),function () {
        Session.set('DSM_data_loaded', true);
       });
    }else{
      this.CodingRulesSubscribed= Meteor.subscribe('codingRules', this.findOptions(),function () {
        Session.set('CR_data_loaded', true);
       });
    }
  },

  posts: function() {
    var postData = "";
    if(Session.get('title') == "ICD-10 codes"){
      if (Session.get('searchString')) {
        var temp = Session.get('searchString');
        // Session.set('searchString','');        
        postData = ICD.find({ $or: [ { sectionName : new RegExp(Session.get('searchString'),'i') }, { sectionCode : new RegExp(Session.get('searchString'),'i')} ] },this.findOptions());
      } else if(Session.get('selectedAlphabet')) {
        postData = ICD.find({sectionName : new RegExp('^' + Session.get('selectedAlphabet'),'i') },this.findOptions());
      } else {
        // postData = ICD.find({sectionName : new RegExp('^' + Session.get('firstAlphabetinList'),'i') },this.findOptions());
        postData = ICD.find({},this.findOptions());        
      }
      $('#loading').css('display','none');
      return postData;
    } else if (Session.get('title') == "DSM-5 codes"){
      if (Session.get('searchString')) {
        postData =  DSM.find({ $or: [ { sectionName : new RegExp(Session.get('searchString'),'i')}, { sectionCode : new RegExp(Session.get('searchString'),'i')} ] },this.findOptions());
      } else if(Session.get('selectedAlphabet')) {
        postData =  DSM.find({sectionName : new RegExp('^' + Session.get('selectedAlphabet') + '|:' + Session.get('selectedAlphabet'),'i') },this.findOptions());
      } else {
        // postData =  DSM.find({sectionName : new RegExp('^' + Session.get('firstAlphabetinList') + '|:' + Session.get('firstAlphabetinList'),'i') },this.findOptions());
        postData =  DSM.find({},this.findOptions());        
      }
       $('#loading').css('display','none');
      return postData;
    }else{
      if (Session.get('searchString')) {
        postData =  codingRules.find({ guideline : new RegExp(Session.get('searchString'),'i')},this.findOptions());
      } else if(Session.get('selectedAlphabet')) {
        postData =  codingRules.find({guideline : new RegExp('^' + Session.get('selectedAlphabet'),'i') }, this.findOptions());
      } else {
        // postData =  codingRules.find({guideline : new RegExp('^' + Session.get('firstAlphabetinList'),'i') },this.findOptions());
        postData =  codingRules.find({},this.findOptions());        
      }
       $('#loading').css('display','none');
      return postData;
    }
  },

  'resultCount' : function() {
    if(Session.get('searchString')){
       if(Session.get('title') == "Coding Rules") {
         return codingRules.find({ guideline : new RegExp(Session.get('searchString'),'i')}).count();
       } else if(Session.get('title') == "ICD-10 codes") {
         return ICD.find({ $or: [ { sectionName : new RegExp(Session.get('searchString'),'i')}, { sectionCode : new RegExp(Session.get('searchString'),'i')} ] }).count();
       } else if(Session.get('title') == "DSM-5 codes") {
         return DSM.find({ $or: [ { sectionName : new RegExp(Session.get('searchString'),'i')}, { sectionCode : new RegExp(Session.get('searchString'),'i')} ] }).count();
       }
     }
     else if (Session.get('selectedAlphabet')) {
       if(Session.get('title') == "Coding Rules") {
         return codingRules.find({guideline : new RegExp('^' + Session.get('selectedAlphabet'),'i') }).count();
       } else if(Session.get('title') == "ICD-10 codes") {
         return ICD.find({sectionName : new RegExp('^' + Session.get('selectedAlphabet'),'i') }).count();
       } else if(Session.get('title') == "DSM-5 codes") {
         return DSM.find({sectionName : new RegExp('^' + Session.get('selectedAlphabet') + '|:' + Session.get('selectedAlphabet'),'i') }).count();
       }      
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
            obj.sectionCode = data[i].sectionCode;
            arr.push(obj);
          }
        }
        if (Session.get('ICD_data_loaded')) {
          $('#loading').css('display','none');   
          return {
            listICD: arr,
            ready: self.ICDSubscribed.ready,
            searchDataEmpty : self.resultCount(),
            nextPath: function() {
              if (self.posts().count() === self.postsLimit()){
                return self.nextPath();
              }
            }
          };
        } else {
          $('#loading').css('display','block');         
        }
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
        if (Session.get('DSM_data_loaded')) {
          $('#loading').css('display','none');        
          return {
            listDSM: arr,
            ready: self.DSMSubscribed.ready,
            searchDataEmpty : self.resultCount(),
            nextPath: function() {
              if (self.posts().count() === self.postsLimit()){
                return self.nextPath();
              }
            }
          };
        } else {
          $('#loading').css('display','block');        
        }
    }else{
      if(data.length>0){
          for(var i=0;i<data.length;i++){
            var obj=new Object();
            obj.guideline=data[i].guideline;
            obj.definition=data[i].definition;
            arr.push(obj);
          }
        }
        if (Session.get('CR_data_loaded')) {
          $('#loading').css('display','none');        
          return {
            listCodingRule: arr,
            ready: self.CodingRulesSubscribed.ready,
            searchDataEmpty : self.resultCount(),
            nextPath: function() {
              if (self.posts().count() === self.postsLimit()){
                return self.nextPath();
              }
            }
          };
        } else {
          $('#loading').css('display','block');          
        }      
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

