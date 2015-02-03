$(document).on('ready', function(){
	submitAnswer();
    displayMessage();
});

function submitAnswer(){
	$('#submit-answer').click(function(){
		var answerValue = $('#user-answer').val();
        if(answerValue !== ''){
            var socket = io();
            socket.emit('message', answerValue);
            $('#user-answer').val('');
            $('#game-content').scrollTop(1E10);
        }
	});

    $('#user-answer').keydown(function(e){
        var answerValue = $('#user-answer').val();
        if(e.keyCode === 13){
            if(answerValue !== ''){
                var socket = io();
                socket.emit('message', answerValue);
                $('#user-answer').val('');
                $('#game-content').scrollTop(1E10);
            }
        }
    });
}

function displayMessage() {
    var socket = io();
    socket.on('message', function(msg){
        var myHtml =  '<div class="row">'+
                    '<div class="col-lg-2 col-md-2 col-sm-2 avatar"><img src="ars.jpg"/></div>'+
                    '<div class="col-lg-10 col-md-10 col-sm-10 message"><p>' + msg + '</p></div>'+
                    '</div>';
        $("#game-content").append(myHtml);
    });
}


