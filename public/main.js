$(document).on('ready', function(){
	submitAnswer();
    displayLeaders();
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
                '</div>';
    $('#game-content').append(myHtml);
    $('#user-answer').val('');
    $('#game-content').scrollTop(1E10);
}

function displayLeaders() {
    $.get('/leaders', function(data) {
        for(var i in data) {
            var html = '<div class="row leaders-record">'+
                            '<div class="col-lg-6 col-md-6 col-sm-6">' + data[i].name + '</div>'+
                            '<div class="col-lg-4 col-lg-offset-2 col-md-4 col-md-offset-2 col-sm-4 col-sm-offset-2"><p>' + data[i].points + '</p></div>'+
                        '</div>';
            $('#leaders-board .container').append(html);
        }
    });
}
