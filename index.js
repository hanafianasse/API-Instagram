var express = require('express');
var app = express();
var server = app.listen('3000');

app.use(express.static('.'));

var fileSystem = require('fs');
var data = fileSystem.readFileSync('names.json');
var data = JSON.parse(data);
app.get('/greating/:name',function(){
	var params = request.params;
	response.send('hello ' + params.name);	
});

app.get('/all',function(request, response){
	response.send(data);
});

app.get('/add/:word/:number',function(request, response){
	var params = request.params;
	data[params.word] = Number(params.number);
	fileSystem.writeFile('names.json',JSON.stringify(data,null,2),function(){
		console.log('all set.');
	});
	var reply = {
		message : "Thanks for your contribution !"
	}
	response.send(reply);
});

app.get('/getScoreOf/:word',function(request, response){
	var params = request.params;
	if(data.hasOwnProperty(params.word)){
		reply = {"score : " : data[params.word]}	
	}else{
		reply = {"message" : "not found"}		
	}
	response.send(reply);
});


app.get('/instagrame',function(request, response){
	var InstagramAPI = require('instagram-api');
	var accessToken = '3947378930.1677ed0.1f39cb4b71be4ba0b71c80c1cf619888';

	var instagramAPI = new InstagramAPI(accessToken);

	instagramAPI.userSelfMedia().then(function(result) {
		response.send({'anasseInstagrame':result})
	}, function(err){
		console.log(err);
	});
});


app.get('/hamzaProfilPicture',function(request, response){
	var InstagramAPI = require('instagram-api');
	var accessToken = '3947378930.1677ed0.1f39cb4b71be4ba0b71c80c1cf619888';

	var instagramAPI = new InstagramAPI(accessToken);

	instagramAPI.mediaLikes("1585757355860202856_3947378930").then(function(result) {
		for (var i = 0; i < result.data.length; i++) {
			if(result.data[i].id == "4912098671"){
				response.send({"hamzaProfilUrl":result.data[i].profile_picture});
			}
		}
		response.send({message : "not here "});
	}, function(err){
		console.log(err);
	});

});







