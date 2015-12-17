Meteor.startup(function () {
    // code to run on server at startup
    if (!Websites.findOne()){
    	console.log("No websites yet. Creating starter data.");
    	  Websites.insert({
    		title:"Goldsmiths Computing Department", 
    		url:"http://www.gold.ac.uk/computing/", 
    		description:"This is where this course was developed.", 
    		createdOn:new Date()
    	});
    	 Websites.insert({
    		title:"University of London", 
    		url:"http://www.londoninternational.ac.uk/courses/undergraduate/goldsmiths/bsc-creative-computing-bsc-diploma-work-entry-route", 
    		description:"University of London International Programme.", 
    		createdOn:new Date()
    	});
    	 Websites.insert({
    		title:"Coursera", 
    		url:"http://www.coursera.org", 
    		description:"Universal access to the world’s best education.", 
    		createdOn:new Date()
    	});
    	Websites.insert({
    		title:"Google", 
    		url:"http://www.google.com", 
    		description:"Popular search engine.", 
    		createdOn:new Date()
    	});
		
		var site = Websites.findOne({title: "Google"});
		Comments.insert({
			siteId: site._id,
			createdOn: new Date(),
			comment: "Eh, it's okay..."
		});
    }
  
    var cheerio = Meteor.npmRequire('cheerio');
	var getMeta = Meteor.npmRequire('lets-get-meta');
  
Meteor.methods({
	checkURL: function(url) {
		this.unblock();
		var result = HTTP.get(url);
		console.log(result);
		console.log();
		console.log("Processing document content...");
		var meta = getMeta(result.content);
		$ = cheerio.load(result.content);
		console.log($("title").html());
		meta.title = $("title").html();
		console.log(meta);
		return meta;
	}
});

});
  