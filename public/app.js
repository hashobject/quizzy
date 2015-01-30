$(document).on('ready', function(){
	getAnswer();
});

function getAnswer(){
	$('#send-answer').click(function(){
		var answerValue = $('#answer-field').val();
		$('#messages-window').append('<div class="avatar">'+'<img src="ars.jpg"/>'+'</div>');
		$('#messages-window').append('<div class="message">'+answerValue+'</div>');
	});
}