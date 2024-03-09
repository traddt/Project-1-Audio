var isStopped = 1;
var shouldStop = 0;
var runtime = 354;

//Pause and Play button
function pauseplay(){
	var audio = document.getElementById("myaudio");
	var btn = document.getElementById("btn-pause");

	if (btn.innerHTML == "Pause") {
		audio.pause();
		btn.innerHTML = "Play";
	} else if (isStopped == 0) {
		audio.play();	
	btn.innerHTML = "Pause";
	}
}

//Used to display the current time in the song
function displayTime(audio) {
	var minutes = Math.floor(Math.floor(audio.currentTime) / 60);
	var seconds = Math.floor(audio.currentTime) % 60;
	var time = minutes + ":";
	if (seconds < 10) time += "0";
	time += seconds;
	document.getElementById("currTime").innerHTML = time;
}


//Starts the music
function startSound(s,e,audio) {
	audio.currentTime=s;
	audio.play();

	setInterval(function(){
		displayTime(audio);
		if (shouldStop == 1) {
			alert("FORCE");
			return;
			shouldStop = 0;
			audio.pause();
			playBtn.innerHTML = "Stopped"
			audio.currentTime = 0;
			document.getElementById("currTime").innerHTML = "0.00";
			isStopped = 1;
		} else if (audio.currentTime>e){
			//alert("TIME");
			return;
			audio.pause();
			playBtn.innerHTML = "Stopped"
			audio.currentTime = 0;
			document.getElementById("currTime").innerHTML = "0.00";
			isStopped = 1;
		}
	},1000);
}


//Activated when a segment is triggered
function pauseplaysegment(s,e) {
	var audio = document.getElementById("myaudio");
	var playBtn = document.getElementById("btn-pause");
	
	if (isStopped == 1) {
		isStopped = 0;
		playBtn.innerHTML = "Pause"
		startSound(s,e,audio);
	} else {
		audio.pause();
		shouldStop = 1;
		setTimeout(function(){
			console.log("Executed after 1 second");
		}, 1000);
		shouldStop = 0;
		startSound(s,e,audio);
	}
	
}

//Rewinds by 5 seconds
function rewind() {
	var audio = document.getElementById("myaudio");
	var playBtn = document.getElementById("btn-pause");
	var replay = 0;
	
	//Pause if currently playing
	if (playBtn.innerHTML == "Pause") {
		replay = 1;
		audio.pause();
	}

	//Rewind
	if (audio.currentTime - 5 < 0) {
		audio.currentTime == 0;
	} else {
		audio.currentTime -= 5;
	}
	
	//Unpause if currently playing
	if (replay == 1) {
		audio.play();
	}
}

//Fast-Forwards by 5 seconds
function forward() {
	var audio = document.getElementById("myaudio");
	var playBtn = document.getElementById("btn-pause");
	var replay = 0;
	
	//Pause if currently playing
	if (playBtn.innerHTML == "Pause") {
		replay = 1;
		audio.pause();
	}
	
	//Rewind
	if (audio.currentTime + 5 > runtime) {
		audio.currentTime == 0;
		playBtn.innerHTML = "Stopped";
		
	} else {
		audio.currentTime += 5;
		//Unpause if currently playing
		if (replay == 1) {
			audio.play();
		}
	}
}