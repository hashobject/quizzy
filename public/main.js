$(document).on('ready', function(){
	submitAnswer();
});

function submitAnswer(){
	$('#submit-answer').click(function(){
		var answerValue = $('#user-answer').val();
        if(answerValue !== ''){
            displayAnswer(answerValue);
        }
	});

    $('#user-answer').keydown(function(e){
        var answerValue = $('#user-answer').val();
        if(e.keyCode === 13){
            if(answerValue !== ''){
                displayAnswer(answerValue);
            }
        }
    });
}

function displayAnswer(message, avatar) {
    var myHtml =  '<div class="row">'+
                    '<div class="col-lg-2 col-md-2 col-sm-2 avatar"><img src="ars.jpg"/></div>'+
                    '<div class="col-lg-10 col-md-10 col-sm-10 message"><p>' + message + '</p></div>'+
                '</div>'
    $('#game-content').append(myHtml);
    $('#user-answer').val('');
    $('#game-content').scrollTop(1E10);
}
