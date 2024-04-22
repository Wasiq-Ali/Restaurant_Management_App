<template>
	<div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
		<div class="sm:mx-auto sm:w-full sm:max-w-sm">
			<img class="mx-auto h-56 w-auto" src="../assets/logo/app-logo.png" alt="RMA logo" />
			<h2 class="mt-2 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Login to your account</h2>
		</div>

		<div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
			<form class="space-y-6" @submit.prevent="handleLogin()">
				<div>
					<label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email address</label>
					<div class="mt-2">
						<input id="email" name="email" type="text" autocomplete="off" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" v-model="email" />
					</div>
				</div>

				<div>
					<div class="flex items-center justify-between">
						<label for="password" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
						<div class="text-sm">
							<a href="#" class="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a>
						</div>
					</div>
					<div class="mt-2">
						<input id="password" name="password" type="password" autocomplete="off" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" v-model="password" />
					</div>
				</div>

				<div>
					<button type="submit" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Login</button>
				</div>
				
				<div>
					<h2 class="mb-2 text-md">Don't have an account?</h2>
					<router-link :to="{ name: 'SignUp' }">
						<button type="submit" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign Up</button>
					</router-link>
				</div>
			</form>
		</div>
	</div>
</template>

<script>
import axios from "axios";

export default {
	name: "Login",

	data() {
		return {
			email: null,
			password: null
		}
	},

	methods: {
        validateEmail(email) {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return re.test(email);
        },

        async handleLogin() {
            if (!(this.email && this.password)) {
                console.log("Put Some Values");
				return false;
            }

            if (!this.validateEmail(this.email)) {
                console.log("Enter Valid Email");
				return false;
            }

			let result = await axios.get(`http://localhost:3000/users?email=${this.email}&password=${this.password}`);

			if(result.status == 200 && result.data.length > 0) {
				localStorage.setItem("login-user", JSON.stringify(result.data[0]));
				this.$router.push({ name: "Home" })
			} else {
				console.log("You don't have an account. Please Signup for login");
				return false
			}
			this.name = this.email = this.password = null;
        },
    },

	mounted() {
		let user = localStorage.getItem("login-user");
		if(user) {
			this.$router.push({ name: "Home" });
		}
	}
}
</script>