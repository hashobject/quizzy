$(document).on('ready', function(){

    var userName = '',
        socket = io(),
        question = '';

    $('#submit-answer').click(function(){
        submitAnswer(socket);
    });

    $('#user-answer').keydown(function(e){
        if(e.keyCode === 13){
            submitAnswer(socket);
        }
    });

    handleMessage(socket);

    displayLeaders(socket);

    onlineUsers(socket);

    getQuestion();

    checkTheAnswer(socket);

    function submitAnswer(socket){

        var answerValue = $('#user-answer').val(),
            nickname = $('#nickname').val();

        if(userName !== nickname){
            greetingsFromBot(socket);
            userName = nickname;
        }

        newMessage(nickname, answerValue);
    }

    function handleMessage(socket) {
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

    function displayLeaders(socket) {
        socket.on('leaders', function(leaders) {
            $('#leaders .leaders-col').empty();
            for(var i in leaders) {
                var html = '<div class="row leaders-record">'+
                    '<div class="col-lg-6 col-md-6 col-sm-6">' + leaders[i].name + '</div>'+
                    '<div class="col-lg-4 col-lg-offset-2 col-md-4 col-md-offset-2 col-sm-4 col-sm-offset-2">' + leaders[i].points + '</div>'+
                    '</div>';
                $('#leaders .leaders-col').append(html);
            }
        });
    }

    function getQuestion() {
        $.get('/question', function(data) {
            var myHtml =  '<div class="row">'+
                '<div class="col-lg-2 col-md-2 col-sm-2 avatar"><span>BOT</span></div>'+
                '<div class="col-lg-10 col-md-10 col-sm-10 message"><p>' + data.question + '</p></div>'+
                '</div>';
            $("#game-content").append(myHtml);
            $('#game-content').scrollTop(1E10);
        });
    }

    function onlineUsers(socket){
        socket.on('online users', function(users){
            $('#online').empty();
            for(var i in users){
                $('#online').append('<p>'+users[i].name+'</p>');
            }
            console.log(users);
        });
    }

    function greetingsFromBot(socket){
        socket.on('user greeting', function(greeting){
            var myHtml =  '<div class="row">'+
                '<div class="col-lg-2 col-md-2 col-sm-2 avatar"><span>BOT</span></div>'+
                '<div class="col-lg-10 col-md-10 col-sm-10 message"><p>' + greeting + '</p></div>'+
                '</div>';
            $("#game-content").append(myHtml);
        });
    }

    function checkTheAnswer(socket) {
        socket.on('answer', function (data) {
            if(data){
                var myHtml =  '<div class="row">'+
                    '<div class="col-lg-2 col-md-2 col-sm-2 avatar"><span>BOT</span></div>'+
                    '<div class="col-lg-10 col-md-10 col-sm-10 message"><p>' + data.question + '</p></div>'+
                    '</div>';
                $("#game-content").append(myHtml);
                $('#game-content').scrollTop(1E10);
            }
        });
    }

});














