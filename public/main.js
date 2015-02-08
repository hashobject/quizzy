$(document).on('ready', function(){
    var name = '';
	submitAnswer();
    handleMessage();
    displayLeaders();
    onlineUsers();
});

function submitAnswer(){

    var socket = io();
	$('#submit-answer').click(function(){
		var answerValue = $('#user-answer').val(),
            nickname = $('#nickname').val();
        if(name !== nickname){
            socket.emit('user created', nickname);
            greetingsFromBot();
            name = nickname;
        }
        newMessage(nickname, answerValue);
	});

    $('#user-answer').keydown(function(e){
        var answerValue = $('#user-answer').val(),
            nickname = $('#nickname').val();

        if(e.keyCode === 13){
            if(name !== nickname){
                socket.emit('user created', nickname);
                greetingsFromBot();
                name = nickname;
            }
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
        $('#game-content').scrollTop(1E10);
    });
}

function newMessage(user, message){
    if(message !== '' && user !== ''){
        var socket = io();
        socket.emit('message', {user: user, message: message});
        $('#user-answer').val('');
        $('#nickname').prop('disabled', true);
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

function onlineUsers(){
    var socket = io();
    socket.on('online users', function(users){
        $('#online').empty();
        for(var i in users){
            $('#online').append('<p>'+users[i].name+'</p>');
        }
    });
}

function greetingsFromBot(){
    var socket = io();
    socket.on('user greeting', function(greeting){
        var myHtml =  '<div class="row">'+
            '<div class="col-lg-2 col-md-2 col-sm-2 avatar"><img src="ars.jpg"/><span>BOT</span></div>'+
            '<div class="col-lg-10 col-md-10 col-sm-10 message"><p>' + greeting + '</p></div>'+
            '</div>';
        $("#game-content").append(myHtml);
    });
}

