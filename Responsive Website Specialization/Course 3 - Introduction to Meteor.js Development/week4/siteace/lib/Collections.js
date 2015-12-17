Websites = new Mongo.Collection("websites");
Comments = new Mongo.Collection("comments");

// setup security for collections
Websites.allow({
	
	insert:function(userId, doc){
		if (Meteor.user()){
			if (userId != doc.createdBy){
				return false;
			} else {
				return true;
			}
		} else {
			return false;
		}
	},
	remove:function(userId, doc){
		return false;
	}
});

Comments.allow({
	
	insert:function(userId, doc){
		if (Meteor.user()){
			if (userId != doc.createdBy){
				return false;
			} else {
				return true;
			}
		} else {
			return false;
		}
	},
	remove:function(userId, doc){
		return false;
	}
});

