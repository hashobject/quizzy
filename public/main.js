$(document).on('ready', function(){
	submitAnswer();
    setInterval(function(){
        displayAnswer();
    }, 1000);
});

function submitAnswer(){
	$('#submit-answer').click(function(){
		var answerValue = $('#user-answer').val();
        if(answerValue !== ''){
            //displayAnswer(answerValue);
            $.post('/messages', {message: answerValue});
            displayAnswer();
            $('#user-answer').val('');
        }
	});

    $('#user-answer').keydown(function(e){
        var answerValue = $('#user-answer').val();
        if(e.keyCode === 13){
            if(answerValue !== ''){
                //displayAnswer(answerValue);
                $.post('/messages', {message: answerValue});
                displayAnswer();
                $('#user-answer').val('');
            }
        }
    });
}

function displayAnswer() {
    var messages;
    $.get('/messages', function(data){
        messages = data;
        if(messages.length !== 0) {
            $('#game-content').children('.row').remove();
            for(var i in messages) {
                var myHtml =  '<div class="row">'+
                    '<div class="col-lg-2 col-md-2 col-sm-2 avatar"><img src="ars.jpg"/></div>'+
                    '<div class="col-lg-10 col-md-10 col-sm-10 message"><p>' + messages[i] + '</p></div>'+
                    '</div>';

                $('#game-content').append(myHtml);
            }
            $('#game-content').scrollTop(1E10);
        }
    });

}
