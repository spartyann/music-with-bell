

$(() => {

	Vue.createApp({
		data() {
			return {
				musicReady: false,
				bellReady: false,

				bell: null,
				bellTest: null,
				music: null,
				volumeBell : 1,
				volumeMusic : 1,

				bellTestRange: 0,

				bellRange : 0,
				musicRange : 0,
				musicRangeUserChanging : false,

				bellEvery: 3,

				currentMusicMinutes: 0,
				currentMusicSeconds: 0,

				totalMusicMinutes: 0,
				totalMusicSeconds: 0,

				musicUrl: global_first_music,
				bellUrl: global_first_bell,
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
			ready() { return this.musicReady && this.bellReady },

			currentMusicTimeString() {
				if (this.ready == false) return '';
				return this.fillZero(this.currentMusicMinutes, 2) + ":" + this.fillZero(this.currentMusicSeconds, 2);
			},

			currentTimeUserIsEditingString() {
				if (this.musicRangeUserChanging == false) return null;
				let current = this.musicRange * this.music.duration;
				let minutes = Math.floor(current / 60);
				let seconds = Math.floor(current - minutes * 60);

				return this.fillZero(minutes, 2) + ":" + this.fillZero(seconds, 2);
			},
			

			totalMusicTimeString() {
				if (this.ready == false) return '';
				return this.fillZero(this.totalMusicMinutes, 2) + ":" + this.fillZero(this.totalMusicSeconds, 2);
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
				if (this.ready == false ) return;
				this.music.play();

				// Bell running ?
				if (this.bell.currentTime != 0 && this.bell.currentTime != this.bell.duration) this.bell.play();
			},

			clickPause(){
				if (this.ready == false ) return;
				this.bell.pause();
				this.music.pause();
			},

			clickStop(){
				if (this.ready == false ) return;
				this.bell.pause();
				this.bell.currentTime = 0; 
				this.music.pause();
				this.music.currentTime = 0;
			},

			testBell() {
				this.bellTest.play();
			},

			setBell(url)
			{
				this.bellReady = false;

				if (this.bell != null) this.bell.pause();
				this.bell = new Audio(url);
				this.bell.autoplay = false;

				let self = this;
				setTimeout(() => {
					self.bell.load();
					self.bellTest = this.bell.cloneNode();
					self.bellReady = true;
				},2);
			},
			
			setMusic(url)
			{
				this.musicReady = false;
				if (this.music != null) this.music.pause();
				this.music = new Audio(url);
				this.music.autoplay = false;
				let self = this;
				setTimeout(() => {
					self.music.load();
					self.musicReady = true;
				},2);
			},
			
			tick(){

				if (this.bell == null || this.music == null)
				{
					this.currentMusicMinutes = 0;
					this.currentMusicSeconds = 0;
					this.totalMusicMinutes = 0;
					this.totalMusicSeconds = 0;
					return;
				}
			
				this.bellRange = this.bell.currentTime / this.bell.duration;
				if (this.musicRangeUserChanging == false) this.musicRange = this.music.currentTime / this.music.duration;
				
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

				// Bell test
				if (this.bellTest.ended) { this.bellTest.pause; this.bellTest.currentTime = 0; }
				this.bellTestRange = this.bellTest.currentTime / this.bellTest.duration;

			},

			updateCurrentMusicMinutesAndSecond(){
				this.currentMusicMinutes = Math.floor(this.music.currentTime / 60);
				this.currentMusicSeconds = Math.floor(this.music.currentTime - this.currentMusicMinutes * 60);
				
				this.totalMusicMinutes = Math.floor(this.music.duration / 60);
				this.totalMusicSeconds = Math.floor(this.music.duration - this.totalMusicMinutes * 60);
			},

			userChangeMusicRange()
			{
				if (this.music == null) return; 
				this.music.currentTime = this.musicRange * this.music.duration;

				this.updateCurrentMusicMinutesAndSecond();

				this.musicRangeUserChanging = false;

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

			userInputMusicRange(){
				this.musicRangeUserChanging = true;
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

