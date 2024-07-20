
var bell = null;
var music = null;
var elementVolumeBell = null;
var elementVolumeMusic = null;


$(() => {
	let bellRange = $('#bell-range');
	let musicRange = $('#music-range');
	let elementVolumeBell = $('#vol-bell');
	let elementVolumeMusic = $('#vol-music');
	
	elementVolumeBell.on("input", () => { if (bell == null) return; bell.volume = elementVolumeBell.val(); });
	elementVolumeMusic.on("input", () => { if (music == null) return; music.volume = elementVolumeMusic.val(); });


	
	musicRange.on("input", () => {
		if (music == null) return;
		let ratio = musicRange.val();
		music.currentTime = ratio * music.duration;
	});



	Vue.createApp({
		data() {
			return {
				bell: null,
				music: null,
				volumeBell : 1,
				volumeMusic : 1,


			}
		},

		mounted() {
			setInterval(this.tick, 100);

			this.setBell('assets/bells/bell_3.mp3');
			this.setMusic('assets/musics/sound-of-invisible-waters.mp3');
	
		},

		computed: {
			loaded() {
				return this.bell != null && this.music != null;
				// TODO Audio => Loaded
			}

		},

		methods: {
			clickPlay(){
				if (this.loaded == false ) return;
				this.bell.play();
				this.music.play();
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
				if (this.bell != null) this.bell.stop();
				this.bell = new Audio(url);
				this.bell.autoplay = false;
				this.bell.load();
			},
			
			setMusic(url)
			{
				if (this.music != null) this.music.stop();
				this.music = new Audio(url);
				this.music.autoplay = false;
				this.music.load();
				return this.music;
			},
			
			tick(){
				if (this.bell == null || this.music == null) return;
			
				let bellRange = $('#bell-range');
				let musicRange = $('#music-range');
			
				bellRange.val(this.bell.currentTime / this.bell.duration);
				musicRange.val(this.music.currentTime / this.music.duration);
			}

		}
	}).mount('#app')
})

