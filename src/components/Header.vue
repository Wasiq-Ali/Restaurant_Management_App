<template>
	<header class="flex justify-between items-center py-1 px-6 bg-gray-100 text-black">
		<router-link :to="{ name: 'Home' }">
			<div class="company-logo">
				<img src="../assets/logo/app-logo.png" class="h-20 w-auto mr-2" alt="RMA Logo">
			</div>
		</router-link>

		<nav>
			<ul class="flex items-center space-x-16">
				<router-link :to="{ name: 'Home' }">
					<li class="hover:text-gray-700 cursor-pointer">Home</li>
				</router-link>

				<router-link :to="{ name: 'AddRestaurant' }" v-if="admin">
					<li class="hover:text-gray-700 cursor-pointer">Add Restaurant</li>
				</router-link>

				<li class="hover:text-gray-700 cursor-pointer">Contact</li>
				<li class="hover:text-gray-700 cursor-pointer">FAQs</li>
			</ul>
		</nav>

		<div class="action-btn text-right">
			<div class="mb-2">
				Account Name: <span class="font-medium">{{ accountHolderName }}</span>
			</div>
			<button @click="handleLogout" class="hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 bg-indigo-600 text-white font-semibold py-2 px-4 rounded">
				Logout
			</button>
		</div>
	</header>
</template>

<script>
export default {
	name: "Header",

	data() {
		return {
			accountHolderName: null,
			admin: true,
		}
	},

	mounted() {
		let user = JSON.parse(localStorage.getItem("login-user"));
		this.accountHolderName = user?.name
	},

	methods: {
		handleLogout() {
			localStorage.removeItem("login-user");
			this.$router.push({ name: "Login" })
		},
	},
}
</script>

<style>
.router-link-exact-active {
	font-weight: bold;
}
</style>