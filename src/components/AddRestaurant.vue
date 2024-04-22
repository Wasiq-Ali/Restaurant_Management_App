<template>
	<Header />

	<div class="container mt-16">
		<h2 style="margin-bottom: 35px !important; text-transform: uppercase;">Add a New Restaurant.</h2>

		<form @submit.prevent="handleEntry()">
			<div class="row">
				<div class="col-12">
					<div class="form-group mb-3">
						<label for="restaurant-name" class="form-label">Restaurant Name</label>
						<input type="text" class="form-control mandatory" id="restaurant-name" v-model="restaurantName">
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-12">
					<div class="form-group mb-3">
						<label for="description" class="form-label">Description</label>
						<textarea class="form-control mandatory" id="description" rows="3" v-model="description"></textarea>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-6">
					<div class="form-group">
						<label for="since" class="form-label">Since (Year):</label>
						<select id="since" class="form-control" v-model="since">
							<option selected :value="since">- - - Select Year - - -</option>
							<option v-for="year in availableYears" :value="year">{{ year }}</option>
						</select>
					</div>
				</div>

				<div class="col-6">
					<div class="form-group mb-3">
						<label for="restaurant-code" class="form-label">Restaurant Code</label>
						<input type="text" class="form-control mandatory" id="restaurant-code" v-model="restaurantCode">
					</div>
				</div>
			</div>
			<button type="submit" class="btn btn-primary entry-btn mt-3">Add Entry</button>
		</form>
	</div>
</template>

<script>
import Header from "@/components/Header.vue";
import axios from "axios";
export default {
	name: "AddRestaurant",

	data() {
		return {
			restaurantName: null,
			description: null,
			since: null,
			restaurantCode: null,
			startYear: 1900,
			endYear: new Date().getFullYear() + 10
		};
	},

	components: {
		Header,
	},

	mounted() {
		let user = localStorage.getItem("login-user");
		if(!(user) ) {
			this.$router.push({ name: "SignUp" })
			return
		}
	},
	
	methods: {
		capitalizeWords(str) {
			return str.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
		},

		async handleEntry() {
			if(!(this.restaurantName && this.description && this.restaurantCode)) {
				console.log("Please fill mandatory values");
				return
			}

			/* Description Words Length Checker*/
			const description = this.description.trim().split(/\s+/);

			if (description.length <= 21) {
				console.log("Description must contain more than 24 words.");
				return;
			} else if (description.length >= 26) {
				console.log("Description less than 24 words.");
				return
			}

			let result = await axios.post("http://localhost:3000/restaurant", {
				restaurant_name: this.capitalizeWords(this.restaurantName),
				description: this.description,
				since: this.since,
				restaurant_code: this.restaurantCode
			})

			if(result.status === 201) {
				this.$router.push({ name: "Home" })
			}
			this.restaurantName = this.description = this.description = this.restaurantCode = null;
		}
	},

	computed: {
		availableYears() {
			const years = [];
			for (let year = this.endYear; year >= this.startYear; year--) {
				years.push(year);
			}
			return years;
		}
	}
}
</script>

<style scoped>
@import "bootstrap/dist/css/bootstrap.min.css";

.form-control {
	border: 1px solid lightgray;
	border-radius: 2px !important;
	box-shadow: none !important;
}

.form-control:focus {
	border-color: #6366F1;
}

.entry-btn {
	padding-inline: 30px;
	padding-block: 10px;
	border-radius: 4px;
	font-size: 17px;
}
</style>