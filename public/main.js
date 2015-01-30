$(document).on('ready', function(){
	submitAnswer();
});

function submitAnswer(){
	$('#submit-answer').click(function(){
		var answerValue = $('#user-answer').val();
		$('#game-content').append('<div class="col-lg-2 col-md-2 col-sm-2 avatar">' +'<img src="ars.jpg"/>'+ '</div>');
		$('#game-content').append('<div class="col-lg-10 col-md-10 col-sm-10 message"><p>' + answerValue + '</p></div>');
	});

    $('#user-answer').keydown(function(e){
        var answerValue = $('#user-answer').val();
        if(e.keyCode === 13){
            $('#game-content').append('<div class="col-lg-2 col-md-2 col-sm-2 avatar">' +'<img src="ars.jpg"/>'+ '</div>');
            $('#game-content').append('<div class="col-lg-10 col-md-10 col-sm-10 message"><p>' + answerValue + '</p></div>');
        }
    });
}