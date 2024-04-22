<template>
	<Header />

	<div 
	class="max-w-[380px] h-[250px] flex items-center absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 bg-blue-600 text-white px-10 py-10 rounded-md text-center text-2xl"
	:class="{ 'hidden': restaurants && restaurants.length }"
	v-if="!(restaurants && restaurants?.length)">
		<p>No restaurants found! Please visit a few minutes...</p>
	</div>

	<div class="container px-28 pt-12 mx-auto">
		<div class="restaurant-list flex justify-between flex-wrap">
			<div v-for="item in restaurants" :key="item.id" class="max-w-sm rounded overflow-hidden shadow-lg mb-12 border-2 border-slate-200">
				<div class="w-full bg-slate-100 h-52 text-slate-400 flex items-center justify-center text-3xl">{{ item.restaurant_code }}</div>
				<div class="px-4 py-4">
					<div class="font-medium text-sm mb-2 text-indigo-700">Since: {{ item.since }}</div>
					<div class="font-bold text-xl mb-2">{{ item.restaurant_name }}</div>
					<p class="text-gray-700 text-base">{{ item.description }}</p>
					<div class="flex">
						<router-link :to="{ name: 'UpdateRestaurant', query: { id: item.id } }">
							<button class="mt-5 flex w-[100px] justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Edit</button>
						</router-link>

						<button class="ms-2 mt-5 flex w-[100px] justify-center rounded-md bg-red-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500" @click="deleteEntry(item.id)">Delete</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import Header from "@/components/Header.vue"
import axios from "axios";
export default {
	name: "Home",

	data() {
		return {
			restaurants: [],
		}
	},

	components: {
		Header,
	},

	methods: {
		async loadData() {
			let user = localStorage.getItem("login-user");
			if(!(user) ) {
				this.$router.push({ name: "Login" })
				return
			}

			let result = await axios.get("http://localhost:3000/restaurant");
			result.status === 200 ? this.restaurants = result.data : [];
		},

		async deleteEntry(id) {
			let result = await axios.delete("http://localhost:3000/restaurant/" + id);
			if(result.status === 200) {
				this.loadData()
			}
		}
	},	

	mounted() {
		this.loadData();
	}
}
</script>