var chapters = [
    {name: 'פרק א', startTime: 0, endTime: 241},
    {name: 'פרק ב', startTime: 241, endTime: 389},
    {name: 'פרק ג', startTime: 389, endTime: 571},
    {name: 'פרק ד', startTime: 571, endTime: 661},
    {name: 'בר יוחאי', startTime: 661, endTime: 978},
    {name: 'כל הפרקים ברצף', startTime: 0, endTime: 980}
];
var buttonsPerRow = 3;

var app = {
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
        
        document.getElementById('splashScreen').addEventListener('click', this.hideSplashScreen.bind(this));
        
        this.createPlayButtons();
        
        this.loadAudio();
        
        //this.playChapter = this.playChapter.bind(this);
    },

    onDeviceReady: function() {
        console.log('Device is ready');
    },    
    
    hideSplashScreen: function() {
        document.getElementById('splashScreen').style.display = 'none';
        document.getElementById('mainScreen').style.display = 'block';
    },
    
    createPlayButtons: function() {
        
        var chaptersHtml = '';
        
        for(var i = 0; i < chapters.length; i += 1) {
            chaptersHtml += '<button onclick="app.playChapter(' + i + ');" ' + (((i % buttonsPerRow) == 0) ? 'class="first"' : '') + '>' + chapters[i].name + '</button>';
        }
        
        document.getElementById('mainScreen').innerHTML = chaptersHtml;
    },
    
    loadAudio: function() {
        this.audio = document.createElement('audio');
        this.audio.src = 'assets/story.mp3'
        this.audio.addEventListener('timeupdate', this.timeChanged.bind(this));
        this.stopAt = null;
    },
    
    playChapter: function(chapter) {
        this.audio.currentTime = chapters[chapter].startTime;
        this.audio.play();
        this.stopAt = chapters[chapter].endTime;
    },
    
    timeChanged: function() {
        console.log('time: ' + this.audio.currentTime);
        if(this.audio.currentTime > this.stopAt) { 
            this.audio.pause();
        }
    }
};

window.onload = app.initialize.bind(app);