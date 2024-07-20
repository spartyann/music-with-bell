

$(() => {

	Vue.createApp({
		data() {
			return {
				bell: null,
				music: null,
				volumeBell : 1,
				volumeMusic : 1,

				bellRange : 0,
				musicRange : 0,

				bellEvery: 3,

				currentMusicMinutes: 0,
				currentMusicSeconds: 0,

				musicUrl: "assets/musics/sound-of-invisible-waters.mp3",
				bellUrl: "assets/bells/bell_3.mp3",
			}
		},

		watch: {
			volumeBell(val) { if (this.bell == null) return; this.bell.volume = val; },
			volumeMusic(val) { if (this.music == null) return; this.music.volume = val; },

			bellUrl(val) {
				this.setBell(val);
			},
			
			musicUrl(val) {
				this.setMusic(val);
			}
		},

		mounted() {
			setInterval(this.tick, 100);

			this.setBell(this.bellUrl);
			this.setMusic(this.musicUrl);
		},

		computed: {
			loaded() {
				return this.bell != null && this.music != null;
				// TODO Audio => Loaded
			},

			currentMusicTimeString() {
				return this.fillZero(this.currentMusicMinutes, 2) + ":" + this.fillZero(this.currentMusicSeconds, 2);
			},

			bellCurrentTimeForMusic() {
				if (this.currentMusicMinutes == 0) return null;
				if (this.currentMusicMinutes % this.bellEvery != 0) return null;
				if (this.currentMusicSeconds > this.bell.duration) return null;
				return this.currentMusicSeconds;
			}

		},

		methods: {
			clickPlay(){
				if (this.loaded == false ) return;
				this.music.play();

				// Bell running ?
				if (this.bell.currentTime != 0 && this.bell.currentTime != this.bell.duration) this.bell.play();
			},

			clickPause(){
				if (this.loaded == false ) return;
				this.bell.pause();
				this.music.pause();
			},

			clickStop(){
				if (this.loaded == false ) return;
				this.bell.pause();
				this.bell.currentTime = 0; 
				this.music.pause();
				this.music.currentTime = 0;
			},

			setBell(url)
			{
				if (this.bell != null) this.bell.pause();
				this.bell = new Audio(url);
				this.bell.autoplay = false;
				this.bell.load();
			},
			
			setMusic(url)
			{
				if (this.music != null) this.music.pause();
				this.music = new Audio(url);
				this.music.autoplay = false;
				this.music.load();
				return this.music;
			},
			
			tick(){
				if (this.bell == null || this.music == null)
				{
					this.currentMusicMinutes = 0;
					this.currentMusicSeconds = 0;
					return;
				} 
			
				this.bellRange = this.bell.currentTime / this.bell.duration;
				this.musicRange = this.music.currentTime / this.music.duration;
				
				this.updateCurrentMusicMinutesAndSecond();

				// Loop
				if (this.music.currentTime >= this.music.duration)
				{
					this.music.currentTime = 0;
					this.music.play();
				}

				// Bell
				if (this.bellCurrentTimeForMusic !== null)
				{
					if (this.bell.currentTime == 0 || this.bell.currentTime == this.bell.duration)
					{
						this.bell.currentTime = this.bellCurrentTimeForMusic;
						this.bell.play();
					}
				}

				if (this.bellCurrentTimeForMusic === null)
				{
					if (this.bell.currentTime != 0)
					{
						this.bell.pause();
						this.bell.currentTime = 0;
					}
				}

			},

			updateCurrentMusicMinutesAndSecond(){
				this.currentMusicMinutes = Math.floor(this.music.currentTime / 60);
				this.currentMusicSeconds = Math.floor(this.music.currentTime - this.currentMusicMinutes * 60);
			},

			userChangeMusicRange()
			{
				if (this.music == null) return; 
				this.music.currentTime = this.musicRange * this.music.duration;

				this.updateCurrentMusicMinutesAndSecond();

				if (this.bellCurrentTimeForMusic !== null)
				{
					this.bell.currentTime = this.bellCurrentTimeForMusic;
					this.bell.play();
				}

				if (this.bellCurrentTimeForMusic === null)
				{
					this.bell.pause();
					this.bell.currentTime = 0;
				}
			},

			fillZero(str, nbTotalChars = 2) {
				str = str + "";
				let nb = nbTotalChars - str.length;
				while(nb > 0) { str = "0" + str; nb--; }
				return str;
			}

		}
	}).mount('#app')
})

