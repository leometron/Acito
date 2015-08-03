/*

 Created by LingaRaja.

 Has the functinalities to create a index.

 */
Meteor.startup(function () {
	Posts._ensureIndex({ title : "text" });
	tags._ensureIndex({ name : "text" });	
	Pages._ensureIndex ({ title: "text" });
	Media._ensureIndex({ name : "text"});
});