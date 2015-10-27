// put your javascript code here

var classTemplate, animalTemplate;

var current_class = classes.class[0];
var current_animal = current_class.animals[0];

function showTemplate(template, data) {
	var html = template(data);
	$('#content').html(html);
}

function selectClass(event) {
	// do something…
	current_class = classes.class[$(event.target).data('id')];
	console.log('Something was opened: ' + current_class.name);
	
	// Display further instructions
	$("#content").html("Select a species of " + current_class.name + " to display more information.");
	
	// Assign click handlers on the links of class animalType
	$(".animalType").click(selectAnimal);
}

function selectAnimal() {
	console.log('Clicked on an animal link.');
	current_animal = current_class.animals[$(this).data("id")];
	showTemplate(animalTemplate, current_animal);
}

$(document).ready(function() {
	
	// Compile the template first:
	var source = $("#class-template").html();
	classTemplate = Handlebars.compile(source);
	
	source = $("#animal-template").html();
	animalTemplate = Handlebars.compile(source);
	
	// Clicking on a class link shows the
	// classifications of animal available to view
	$('#accordian').on('show.bs.collapse', selectClass);
	
	$(".classHeader").click(selectClass);
	
	console.log(classTemplate(classes));
	$("#accordian").html(classTemplate(classes));
});