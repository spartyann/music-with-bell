<!DOCTYPE html>
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

		<link rel="manifest" href="manifest.json">
	</head>

	<body class="p-4" id="app">

		<div class="container">
			<div class="row">
				<div class="col-12">
					<button class="btn btn-primary" @click="clickPlay"><i class="fa fa-play"></i> Play</button>
					<button class="btn btn-primary" @click="clickPause"><i class="fa fa-pause"></i> Pause</button>
					<button class="btn btn-danger" @click="clickStop"><i class="fa fa-stop"></i> Stop</button>

					<div class="card mt-3 mb-3">
						<div class="card-body">
							<div class="row">
								<div class="col-md-6">
									<label for="vol-music" class="form-label">Volume musique <span class="badge bg-primary">{{ Math.round(volumeMusic * 100) }}</span></label>
									<input type="range" class="form-range" min="0" max="1" step="0.05" value="1" id="vol-music" v-model="volumeMusic"/>
								</div>
								<div class="col-md-6">
									<label for="vol-bell" class="form-label">Volume clochette <span class="badge bg-primary">{{ Math.round(volumeBell * 100) }}</span></label>
									<input type="range" class="form-range" min="0" max="1" step="0.05" value="1" id="vol-bell" v-model="volumeBell"/>
								</div>
							</div>
						</div>
					</div>
					
					
					<input type="range" class="form-range" min="0" max="1" step="0.00001" value="1" id="bell-range"/>
					<input type="range" class="form-range" min="0" max="1" step="0.00001" value="1" id="music-range"/>
				</div>
			</div>
		</div>
	</body>
</html>


