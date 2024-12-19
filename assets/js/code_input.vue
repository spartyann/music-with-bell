<template>
	<div class="container">
		<div class="row">
			<div class="col-12">
				<h1>Veuillez saisir le code</h1>
				<p>
					Cette application est à usage strictement privée et réservée à l'usage personnelle de Yann Tassy.
					<br />
					Son utilisation est interdite.
					<br />
					Veuillez vous rendre sur <a href="https://www.yanntassy.fr">www.yanntassy.fr</a>
				</p>

				<div class="text-center">
					<div class="pad">
						<template v-for="(row) in pad">
							<div class="text-center">
								<template v-for="(cell) in row">
									<div class="pin_key" v-html="cell.text" @click="cell.click"></div>
								</template>
							</div>
						</template>
					</div>
				</div>

				<pre class="border fz-200 text-center p-2" >&nbsp;{{ code }}&nbsp;</pre>

				<div class="alert alert-danger" v-if="invalid">
					Code invalide
				</div>
			</div>
		</div>
	</div>

</template>

<style>
	.pad {
		padding: 10px;
		margin: 10px;
		background-color: #efefef;
		border-radius: 10px;
		display: inline-block;
		text-align: center;
	}

	.pin_key {
		width: max(60px, min(30vw, 10vh));
		height: max(60px, min(30vw, 10vh));
		margin: 10px;
		font-size: 180%;
		font-family: arial;
		background: rgba(0, 0, 0, 0.15);
		color: #363b5e;
		border-radius: 50%;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		font-weight: bold;
		cursor: pointer;
		user-select: none;
	}
</style>

<script>


export default {
	
	data() {
		let self = this;
		return {
			code : "",
			invalid : false,
			pad: [
				[
					{ text: 7, click: () => { self.tap("7") } },
					{ text: 8, click: () => { self.tap("8") } },
					{ text: 9, click: () => { self.tap("9") } }
				],
				[
					{ text: 4, click: () => { self.tap("4") } },
					{ text: 5, click: () => { self.tap("5") } },
					{ text: 6, click: () => { self.tap("6") } }
				],
				[
					{ text: 1, click: () => { self.tap("1") } },
					{ text: 2, click: () => { self.tap("2") } },
					{ text: 3, click: () => { self.tap("3") } }
				],
				[
					{ text: "0", click: () => { self.tap("0") }  },
					{ text: "<i class='fa fa-chevron-left'></i>", click: () => { self.back() }  },
					{ text: "OK", click: () => { self.validate() }  }
				],
			]
		}
	},

	methods: {
		tap(number) {
			this.code += number;
			this.invalid = false;
		},
		back() {
			if (this.code == "") return;
			this.code = this.code.substring(0, this.code.length - 1);
		},
		validate()
		{
			if (this.code == "04340") this.$emit("ok");
			else
			{
				this.code="";
				this.invalid = true;
			}
		}
	}
	
}

</script>
