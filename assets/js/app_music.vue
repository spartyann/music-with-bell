<template>

	<div class="container">
		<div class="row">
			<div class="col-12">

				<div class="my-3">

					<div class="tbl-100">
						<div class="tr">
							<div class="td wsnw vam pe-2">
								<label for="" class="form-label">Musique: </label>
							</div>
							<div class="td-100 vam p-1">
								<div class="d-inline-block">
									<select v-model="musicUrl" id="" class="form-control">
										<template v-for="(musicItem) in allMusics">
											<option :value="musicItem.path">{{ musicItem.name }}</option>
										</template>
									</select>
								</div>
							</div>
						</div>
						<div class="tr">
							<div class="td wsnw vam pe-2">
								<label for="" class="form-label">Clochette: </label>
							</div>
							<div class="td-100 vam p-1">
								<div class="d-inline-block wsnw vam">
									<select v-model="bellUrl" id="" class="form-control d-inline-block me-3">
										<template v-for="(bellItem) in allBells">
											<option :value="bellItem.path">{{ bellItem.name }}</option>
										</template>
									</select>

									<template v-if="ready">
										<button class="btn btn-primary vam" @click="testBell" v-if="bellTestRange == 0">
											<i class="fa fa-play"></i>
										</button>
										<div class="d-inline-block" v-else>
											<div class="progress" style="width:50px;" >
												<div class="progress-bar" role="progressbar" :style="'width: ' + Math.round(bellTestRange * 100) + '%'"></div>
											</div>
										</div>
									</template>
								</div>
							</div>
						</div>
						<div class="tr">
							<div class="td wsnw vam pe-2">
								<label for="bellEvery" class="form-label">Clochettes toutes les: </label>
							</div>
							<div class="td-100 vam p-1">
								<div class="d-inline-block">
									<select v-model="bellEvery" id="bellEvery" class="form-control">
										<option value="1">1 minute</option>
										<option value="2">2 minutes</option>
										<option value="3">3 minutes</option>
										<option value="4">4 minutes</option>
										<option value="5">5 minutes</option>
										<option value="6">6 minutes</option>
										<option value="10">10 minutes</option>
										<option value="15">15 minutes</option>
										<option value="20">20 minutes</option>
									</select>
								</div>
							</div>
						</div>

						<template v-if="ready">
							<div class="tr">
								<div class="td wsnw vam pe-3">
									<label for="vol-music" class="form-label">Volume musique </label>
								</div>
								<div class="td-100 vam">
									<input type="range" class="form-range vam" min="0" max="1" step="0.05" value="1" id="vol-music" v-model="volumeMusic"/>
								</div>
								<div class="td vam ps-2">
									<span class="badge bg-primary">{{ Math.round(volumeMusic * 100) }}</span>
								</div>
							</div>
							<div class="tr">
								<div class="td wsnw vam pe-3">
									<label for="vol-bell" class="form-label">Volume clochette</label>
								</div>
								<div class="td-100 vam">
									<input type="range" class="form-range  vam" min="0" max="1" step="0.05" value="1" id="vol-bell" v-model="volumeBell"/>
								</div>
								<div class="td vam ps-2">
									<span class="badge bg-primary">{{ Math.round(volumeBell * 100) }}</span>
								</div>
							</div>
						</template>
					</div>
					
				</div>

				<template v-if="ready == false">
					
					<div class=" text-center vam">
						<div class="d-inline-block vam">
							<div class="spinner-border text-primary vam" style="width: 3rem; height: 3rem;" role="status">
								<span class="sr-only">Loading...</span>
							</div>
							&nbsp;&nbsp;Chargement...
						</div>
					</div>
					
				</template>

				<template v-if="ready">

					<div class="my-3 text-center">
						<button class="btn btn-primary btn-lg" @click="clickPlay"><i class="fa fa-play"></i> Play</button>
						&nbsp;
						<button class="btn btn-primary btn-lg" @click="clickPause"><i class="fa fa-pause"></i> Pause</button>
						&nbsp;
						<button class="btn btn-danger btn-lg" @click="clickStop"><i class="fa fa-stop"></i> Stop</button>
					</div>

					<div class="text-center fz-180 digicode">
						<span class="badge bg-secondary fz-100">{{ currentTimeUserIsEditingString == null ? currentMusicTimeString : currentTimeUserIsEditingString }}</span>
						/
						<span class="badge bg-secondary fz-100">{{ totalMusicTimeString }}</span>
						
					</div>
				
					<div class="my-4">
						<input type="range" class="form-range" min="0" max="1" step="0.00001" value="1" v-model="musicRange" v-on:change="userChangeMusicRange"
						v-on:input="userInputMusicRange"/>
					</div>
					
					<!--<div class="my-4 mb-2">
						<div class="progress" style="height: 2px ">
							<template v-for="range in timeRangesLoad">
								<div :class="{ 'progress-bar': true, 'bg-white' : range.loaded == false}" role="progressbar" :style="'width: ' + range.percent" ></div>
							</template>
						</div>
					</div>
					<input type="range" class="form-range" min="0" max="1" step="0.00001" value="1" v-model="bellRange" v-on:input="userChangeMusicRange"/>-->
				</template>
			</div>
		</div>
	</div>

</template>

<script>

export default {
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

			allMusics : global_musics,
			allBells : global_bells,

			timeRangesLoad : []
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
			this.musicRangeUserChanging = false;

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
			this.bell.preload = "auto";

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
			this.music.preload = "auto";

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

			this.updateTimeRangesLoad();

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
		},


		updateTimeRangesLoad() // Not working
		{
			return;
			
			this.timeRangesLoad = [];

			let buffered = this.music.buffered;

			let previousEnd = 0;
			let previousStart = 0;

			let duration = this.music.duration;

			let addDuration = (start, end, loaded) => {
				this.timeRangesLoad.push({
					start: start,
					end: end,
					loaded : loaded,
					percent: Math.round(100 * (end - start) / duration, 5) + "%"
				})
			}

			for (let i = 0; i < buffered.length; i++){
				let start = buffered.start(i);
				let end = buffered.end(i);

				if (i == 0 && start == 0) { /* Nothing */ }
				else {
					addDuration(previousEnd, start, false);
				}
				
				addDuration(start, end, true);

				previousEnd = end;
				previousStart = start;
			}

		}

	}
}

</script>
