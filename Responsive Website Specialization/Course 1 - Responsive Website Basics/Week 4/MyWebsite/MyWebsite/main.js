$(document).ready(function(){
	$('#more').click(function(){
		if ($('#more').text() === 'More info') {
			$('#more').text('Less info');
			$('#short-info').html('An aspiring web-developer who is self-taught and who continues to build his portfolio with more projects.');	
			$('#short-info').show();
		}
		else {
			$('#more').text('More info');
			$('#more').css('margin-top', '20px');
			$('#short-info').hide();
		}
	});
});