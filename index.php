<?php

$dirMusics = array_merge(glob(__DIR__ . '/assets/musics/*.wav'), glob(__DIR__ . '/assets/musics/*.mp3'));
$dirBells = array_merge(glob(__DIR__ . '/assets/bells/*.wav'), glob(__DIR__ . '/assets/bells/*.mp3'));

$dirBells = array_map(function($dir) {
	return str_replace(__DIR__ . '/', '', $dir);
}, $dirBells);

$dirMusics = array_map(function($dir) {
	return str_replace(__DIR__ . '/', '', $dir);
}, $dirMusics);


$musics = [];
foreach($dirMusics as $music) {
	$musics[] = [ 'path' => $music, 'name' => basename($music) ];
}

$bells = [];
foreach($dirBells as $music) {
	$bells[] = [ 'path' => $music, 'name' => basename($music) ];
}

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
		<script src="assets/vue/vue3-sfc-loader.js"></script>
		<script src="assets/vue/vue.global.js"></script>
		<link href="assets/bootstrap/css/bootstrap.min.css" rel="stylesheet">
		<script src="assets/bootstrap/js/bootstrap.bundle.min.js" ></script>

		<script>

			const global_first_music = '<?php echo addslashes($dirMusics[0]) ?>';
			const global_first_bell = '<?php echo addslashes($dirBells[0]) ?>';

			const global_musics = <?php echo json_encode($musics); ?>;
			const global_bells = <?php echo json_encode($bells); ?>;

			const vueLoaderOptions = {
				moduleCache: {
					vue: Vue
				},
				async getFile(url) {
					
					const res = await fetch(url);
					if ( !res.ok ) throw Object.assign(new Error(res.statusText + ' ' + url), { res });
					return { getContentData: asBinary => asBinary ? res.arrayBuffer() : res.text(), }
				},
				addStyle(textContent) {

					const style = Object.assign(document.createElement('style'), { textContent });
					const ref = document.head.getElementsByTagName('style')[0] || null;
					document.head.insertBefore(style, ref);
				},
			}

			const { loadModule } = window['vue3-sfc-loader'];


			$(() => {
				const app = Vue.createApp({
					components: {
						'app': Vue.defineAsyncComponent( () => loadModule('./assets/js/app.vue', vueLoaderOptions) )
					},
				});

				app.mount('#app');
			});
		</script>

		<link href="assets/css/app.css?t=<?php echo filemtime(__DIR__ . '/assets/css/app.css'); ?>" rel="stylesheet">
		
		<link rel="manifest" href="manifest.json">
	</head>

	<body class="p-4" id="app">

		<app></app>

	</body>
</html>


