$(document).on('ready', function(){

    /*var socket= io();
    socket.on('user connected', function(msg){
        var myHtml =  '<div class="row">'+
            '<div class="col-lg-2 col-md-2 col-sm-2 avatar"><span>BOT</span></div>'+
            '<div class="col-lg-10 col-md-10 col-sm-10 message"><p>' + msg +'</p></div>'+
            '</div>';
        $("#game-content").append(myHtml);
    });*/
    createUser();
    onlineUsers();
	submitAnswer();
    handleMessage();
});

function submitAnswer(){
	$('#submit-answer').click(function(){
		var answerValue = $('#user-answer').val(),
            userNick = $('#usernick').val();
        newMessage(userNick, answerValue);
	});

    $('#user-answer').keydown(function(e){
        var answerValue = $('#user-answer').val(),
            userNick = $('#usernick').val();
        if(e.keyCode === 13){
            newMessage(userNick, answerValue);
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
        $('#usernick').val('');
        $('#game-content').scrollTop(1E10);
    }
}

function createUser(){
    $('#create-user').click(function(){
        var nickname = $('#nickname').val(),
            socket = io();
        if(nickname !== ''){
            $('#dialog-container').css('display', 'none');
            $('#my-dialog').css('display', 'none');
            $('#nickname').val('');
            socket.emit('user created', nickname);
        }
    });
}

function onlineUsers(){
    var socket = io();
    socket.on('online users', function(users){
        console.log(users);
    });
}




