/*

 Created by LingaRaja.

 Has the functinalities to create a index.

 */
Meteor.startup(function () {
	Posts._ensureIndex({ title : "text" });
});