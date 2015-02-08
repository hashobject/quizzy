$(document).on('ready', function(){
	submitAnswer();
    handleMessage();
    displayLeaders();
});

function submitAnswer(){
	$('#submit-answer').click(function(){
		var answerValue = $('#user-answer').val(),
            nickname = $('#nickname').val();
        newMessage(nickname, answerValue);
	});

    $('#user-answer').keydown(function(e){
        var answerValue = $('#user-answer').val(),
            userNick = $('#nickname').val();
        if(e.keyCode === 13){
            newMessage(nickname, answerValue);
        }
    });
}

function handleMessage() {
    var socket = io();
    socket.on('message', function(msg){
        var myHtml =  '<div class="row">'+
                    '<div class="col-lg-2 col-md-2 col-sm-2 avatar"><img src="ars.jpg"/><span>'+msg.user+'</span></div>'+
                    '<div class="col-lg-10 col-md-10 col-sm-10 message"><p>' + msg.message + '</p></div>'+
                    '</div>';
        $("#game-content").append(myHtml);
    });
}

function newMessage(user, message){
    if(message !== '' && user !== ''){
        var socket = io();
        socket.emit('message', {user: user, message: message});
        $('#user-answer').val('');
        $('#nickname').val('');
        $('#game-content').scrollTop(1E10);
    }
}

function displayLeaders() {
    $.get('/leaders', function(data) {
        for(var i in data) {
            var html = '<div class="row leaders-record">'+
                            '<div class="col-lg-6 col-md-6 col-sm-6">' + data[i].name + '</div>'+
                            '<div class="col-lg-4 col-lg-offset-2 col-md-4 col-md-offset-2 col-sm-4 col-sm-offset-2">' + data[i].points + '</div>'+
                        '</div>';
            $('#leaders .leaders-col').append(html);
        }
    });
}
