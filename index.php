<?php

$dirMusics = array_merge(glob(__DIR__ . '/assets/musics/*.wav'), glob(__DIR__ . '/assets/musics/*.mp3'));
$dirBells = array_merge(glob(__DIR__ . '/assets/bells/*.wav'), glob(__DIR__ . '/assets/bells/*.mp3'));

$dirBells = array_map(function($dir) {
	return str_replace(__DIR__ . '/', '', $dir);
}, $dirBells);

$dirMusics = array_map(function($dir) {
	return str_replace(__DIR__ . '/', '', $dir);
}, $dirMusics);


?><!DOCTYPE html>
<html lang="fr">
	<head>
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta charset="UTF-8">
		<meta name="viewport" content="user-scalable=yes, width=device-width, initial-scale=1, maximum-scale=5">
		<meta name="theme-color" content="#1976d2">
		<meta name="description" content="Musique avec clochette">
		<title>Musique avec Clochettes</title>
		<script src="assets\jquery\jquery-3.7.1.min.js" ></script>
		<link href="assets/font-awesome-4.7.0/css/font-awesome.min.css" rel="stylesheet">
		<script src="assets/vue/vue.global.js"></script>
		<link href="assets/bootstrap/css/bootstrap.min.css" rel="stylesheet">
		<script src="assets/bootstrap/js/bootstrap.bundle.min.js" ></script>

		<script src="assets/js/app.js" ></script>
		<link href="assets/css/app.css" rel="stylesheet">
		
		<link rel="manifest" href="manifest.json">
	</head>

	<body class="p-4" id="app">

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
											<?php foreach($dirMusics as $music) { ?>
												<option value="<?php echo htmlentities($music); ?>"><?php echo basename($music); ?></option>
											<?php } ?>
										</select>
									</div>
								</div>
							</div>
							<div class="tr">
								<div class="td wsnw vam pe-2">
									<label for="" class="form-label">Clochette: </label>
								</div>
								<div class="td-100 vam p-1">
									<div class="d-inline-block">
										<select v-model="bellUrl" id="" class="form-control">
											<?php foreach($dirBells as $bell) { ?>
												<option value="<?php echo htmlentities($bell); ?>"><?php echo basename($bell); ?></option>
											<?php } ?>
										</select>
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
						</div>
						
					</div>

					<div class="my-3 text-center">
						<button class="btn btn-primary btn-lg" @click="clickPlay"><i class="fa fa-play"></i> Play</button>
						&nbsp;
						<button class="btn btn-primary btn-lg" @click="clickPause"><i class="fa fa-pause"></i> Pause</button>
						&nbsp;
						<button class="btn btn-danger btn-lg" @click="clickStop"><i class="fa fa-stop"></i> Stop</button>
					</div>

					<div class="text-center fz-180 digicode">
						<span class="badge bg-secondary fz-100">{{ currentMusicTimeString }}</span>
					</div>
				
					<div class="my-4">
						<input type="range" class="form-range" min="0" max="1" step="0.00001" value="1" v-model="musicRange" v-on:input="userChangeMusicRange"/>
					</div>
					
					<!--<input type="range" class="form-range" min="0" max="1" step="0.00001" value="1" v-model="bellRange" v-on:input="userChangeMusicRange"/>-->
				</div>
			</div>
		</div>
	</body>
</html>


