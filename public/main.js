$(document).on('ready', function(){
	submitAnswer();
    createNewMessage();
});

function submitAnswer(){
	$('#submit-answer').click(function(){
		var answerValue = $('#user-answer').val();
        var user = $('#usernick').val();
        if(answerValue !== '' && user !== ''){
            var socket = io();
            socket.emit('message', {user: user, message: answerValue});
            $('#user-answer').val('');
            $('#usernick').val('');
            $('#game-content').scrollTop(1E10);
        }
	});

    $('#user-answer').keydown(function(e){
        var answerValue = $('#user-answer').val();
        var user = $('#usernick').val();
        if(e.keyCode === 13){
            if(answerValue !== '' && user !== ''){
                var socket = io();
                socket.emit('message', {user: user, message: answerValue});
                $('#user-answer').val('');
                $('#usernick').val('');
                $('#game-content').scrollTop(1E10);
            }
        }
    });
}

function createNewMessage() {
    var socket = io();
    socket.on('message', function(msg){
        var myHtml =  '<div class="row">'+
                    '<div class="col-lg-2 col-md-2 col-sm-2 avatar"><img src="ars.jpg"/><span>'+msg.user+'</span></div>'+
                    '<div class="col-lg-10 col-md-10 col-sm-10 message"><p>' + msg.message + '</p></div>'+
                    '</div>';
        $("#game-content").append(myHtml);
    });
}


