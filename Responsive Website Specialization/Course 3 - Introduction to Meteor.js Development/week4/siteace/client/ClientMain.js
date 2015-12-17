/// routing 

Router.configure({
  layoutTemplate: 'ApplicationLayout'
});

Router.route('/', function () {
	this.render('navbar', {to:"navbar"});
  this.render('main', {
    to:"body"
  });
});

Router.route('/site/:_id', function () {
  this.render('navbar', {
    to:"navbar"
  });
  this.render('website_detail', {
    to:"body",
	data:function(){
		return Websites.findOne({_id:this.params._id});
	}
  });
});

/// accounts config

Accounts.ui.config({
passwordSignupFields: "USERNAME_AND_EMAIL"
});

// global helper
Template.registerHelper('formatDate', function(date){
	return moment(date).format('YYYY-MM-DD');
});

// helper function that returns all available websites
	Template.website_list.helpers({
		websites:function(){
			return Websites.find({}, {sort:{upvotes: -1, downvotes: 1,createdOn:-1, title: 1}});         
		}
	});
	
	Template.website_detail.helpers({
			comments:function(site_id){
				return Comments.find({siteId: site_id}, {sort: {createdOn: -1}});
			},
			getUser:function(user_id){
				var user = Meteor.users.findOne({_id:user_id});  
				if (user){
					return user.username;
				} else {
					return "anon";
				}
			}
	});
	
	Template.comment_item.helpers({
			getUser:function(user_id){
				var user = Meteor.users.findOne({_id:user_id});  
				if (user){
					return user.username;
				} else {
					return "anon";
				}
			}
	});
	

	/////
	// template events 
	/////
	
	Template.website_detail.events({
		"click .js-upvote":function() {
			// example of how you can access the id for the website in the database
		// (this is the data context for the template)
		var website_id = this._id;
		console.log("Up voting website with id "+website_id);
		// put the code in here to add a vote to a website!
		var site = Websites.findOne({_id:website_id});
		if (site.upvotes) {
			Websites.update({_id:website_id},
			{$set: {upvotes:++site.upvotes}});
		} else {
			Websites.update({_id:website_id},
			{$set: {upvotes:1}});
		}
		return false;// prevent the button from reloading the page
		}
	})

	Template.website_item.events({
		"click .js-upvote":function() {
			// example of how you can access the id for the website in the database
		// (this is the data context for the template)
		var website_id = this._id;
		console.log("Up voting website with id "+website_id);
		// put the code in here to add a vote to a website!
		var site = Websites.findOne({_id:website_id});
		if (site.upvotes) {
			Websites.update({_id:website_id},
			{$set: {upvotes:++site.upvotes}});
		} else {
			Websites.update({_id:website_id},
			{$set: {upvotes:1}});
		}
		return false;// prevent the button from reloading the page
		}, 
		"click .js-downvote":function(event){

			// example of how you can access the id for the website in the database
			// (this is the data context for the template)
			var website_id = this._id;
			console.log("Down voting website with id "+website_id);

			// put the code in here to remove a vote from a website!
			var site = Websites.findOne({_id:website_id});
			if (site.downvotes) {
				Websites.update({_id:website_id},
				  {$set: {downvotes:++site.downvotes}});
			} else {
				Websites.update({_id:website_id},
				  {$set: {downvotes:1}});
			}
			
			return false;// prevent the button from reloading the page
		}
	})

	Template.website_form.events({
		"click .js-toggle-website-form":function(event){
			$("#website_form").toggle('slow');
		}, 
		"submit .js-save-website-form":function(event){

			// here is an example of how to get the url out of the form:
			var url = event.target.url.value;
			var title = event.target.title.value;
			var descr = event.target.description.value;
			console.log("The url they entered is: "+url);
			
			//  put your website saving code in here!	
			if (Meteor.user()) {
				Websites.insert({
					url:url,
					title:title,
					description:descr,
					createdOn:new Date(),
					createdBy:Meteor.user()._id
				});
			}
			$("#website_form").toggle('slow');
			return false;// stop the form submit from reloading the page
		},
		"keyup #url": function(event, template) {
			Meteor.call("checkURL", event.target.value, function(err, resp){
				if (!err) {
					console.log(resp);
					template.find("#description").value = resp.description;
					template.find("#title").value = resp.title;
				}
			});
		}
	});
	
	Template.add_comment_form.events({
		"click .js-toggle-comment-form":function(event){
			$("#comment_form").toggle('slow');
		}, 
		"submit .js-save-comment-form":function(event){
			console.log("Saving comment...");
			// here is an example of how to get the url out of the form:
			var comment = event.target.comment.value;
			console.log(comment);
						
			//  put your website saving code in here!	
			if (Meteor.user()) {
				console.log("User is logged in: " + Meteor.user()._id);
				Comments.insert({
					comment:comment,
					createdOn:new Date(),
					createdBy:Meteor.user()._id,
					siteId: this._id
				});
			}
			$("#comment_form").toggle('slow');
			return false;// stop the form submit from reloading the page
		}
	});
	
	/// event functions
	function UpVote(event) {
		
	}