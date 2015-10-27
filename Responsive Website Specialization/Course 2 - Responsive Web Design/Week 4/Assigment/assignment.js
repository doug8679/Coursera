// put your javascript code here

var classTemplate, animalTemplate;

var current_class = classes.class[0];
var current_animal = current_class.animals[0];

function showTemplate(template, data) {
	var html = template(data);
	$('#content').html(html);
}

$(document).ready(function() {
	
	// Compile the template first:
	var source = $("#class-template").html();
	classTemplate = Handlebars.compile(source);
	
	source = $("#animal-template").html();
	animalTemplate = Handlebars.compile(source);
	
	// Clicking on the classes link shows the
	// classifications of animal available to view
	$(".class-link").click(function(){
		console.log('Selected: ' + $(this).data("id"));
		current_class = classes[$(this).data("id")];
		// Display the classes template:
		//showTemplate(classTemplate, classes);
		
		// Set the classes link as active
		// turn of the currently active link first
		//$(".active").removeClass("active");
		// Now activate the link we want:
		//$("#classes-tab").addClass("active");
	});
	
	$(".animal-link").click(function(){
		console.log('Clicked on an animal link.');
		current_animal = current_class.animals[$(this).data("id")];
	})
	console.log(classTemplate(classes));
	$("#accordian").html(classTemplate(classes));
});