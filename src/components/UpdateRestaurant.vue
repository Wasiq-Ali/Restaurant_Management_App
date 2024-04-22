<template>
	<Header />

	<div class="container mt-16">
		<h2 style="margin-bottom: 35px !important; text-transform: uppercase;">Update Restaurant.</h2>

		<form @submit.prevent="updateEntry()">
			<div class="row">
				<div class="col-12">
					<div class="form-group mb-3">
						<label for="restaurant-name" class="form-label">Restaurant Name</label>
						<input type="text" class="form-control mandatory" id="restaurant-name" v-model="restaurant.restaurant_name">
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-12">
					<div class="form-group mb-3">
						<label for="description" class="form-label">Description</label>
						<textarea class="form-control mandatory" id="description" rows="4" v-model="restaurant.description"></textarea>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-6">
					<div class="form-group">
						<label for="since" class="form-label">Since (Year):</label>
						<select id="since" class="form-control" v-model="restaurant.since">
							<option v-for="year in availableYears" :value="year">{{ year }}</option>
						</select>
					</div>
				</div>

				<div class="col-6">
					<div class="form-group mb-3">
						<label for="restaurant-code" class="form-label">Restaurant Code</label>
						<input type="text" class="form-control mandatory" id="restaurant-code" v-model="restaurant.restaurant_code">
					</div>
				</div>
			</div>
			<button type="submit" class="btn btn-primary entry-btn mt-3">Update Entry</button>
		</form>
	</div>
</template>

<script>
import Header from "@/components/Header.vue";
import axios from "axios";
import _ from 'lodash';

export default {
	name: "Update Restaurant",

	data() {
		return {
			restaurant: {
				restaurant_name: null,
				description: null,
				since: null,
				restaurant_code: null,
			},
			startYear: 1900,
			endYear: new Date().getFullYear() + 10,
			id: this.$route.query.id,

		};
	},

	components: {
		Header,
	},

	async mounted() {
		let user = localStorage.getItem("login-user");
		if(!(user) ) {
			this.$router.push({ name: "SignUp" })
			return
		}

		let result = await axios.get(`http://localhost:3000/restaurant/${this.id}`);
		/* Prefill From */
		this.restaurant = result.data;
		this.orignalRestaurantData = Object.assign({}, this.restaurant)
	},
	
	methods: {
		async updateEntry() {
			let isDataChanged = _.isEqual(this.orignalRestaurantData, this.restaurant);

			if(!isDataChanged) {
				let result = await axios.put(`http://localhost:3000/restaurant/${this.id}`, {
					restaurant_name: this.restaurant.restaurant_name,
					description: this.restaurant.description,
					since: this.restaurant.since,
					restaurant_code: this.restaurant.restaurant_code
				})

				if(result.status === 200) {
					this.$router.push({ name: "Home" })
				}
			} else {
				console.log("Values is same!. If you want to cancel select OK?");
			}

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