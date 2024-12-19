<template>

	<app_music v-if="authenticated"></app_music>
	<code_input v-else="" v-on:ok="processAuthenticated"></code_input>

</template>

<script>

const { loadModule } = window['vue3-sfc-loader'];

export default {
	
	components: {
		'app_music': Vue.defineAsyncComponent( () => loadModule('./assets/js/app_music.vue', vueLoaderOptions) ),
		'code_input': Vue.defineAsyncComponent( () => loadModule('./assets/js/code_input.vue', vueLoaderOptions) )
	},

	data() {

		return {
			authenticated : false
		}
	},


	methods:{
		processAuthenticated()
		{
			this.authenticated = true;
		}
	}
	
}

</script>
