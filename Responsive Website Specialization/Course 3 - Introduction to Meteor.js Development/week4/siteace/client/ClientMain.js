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
			return Websites.find({}, {sort:{upvotes: -1, downvotes: -1}});         
		}
	});


	/////
	// template events 
	/////

	Template.website_item.events({
		"click .js-upvote":function(event){
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
			console.log("The url they entered is: "+url);
			
			//  put your website saving code in here!	

			return false;// stop the form submit from reloading the page

		}
	});