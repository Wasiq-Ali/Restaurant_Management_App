import {createRouter, createWebHistory} from "vue-router"

const base_path = "restaurants-management";

const routes = [
	{
		path: "",
		name: "Home",
		component: () => import('@/components/Home.vue'),
	},
	{
		path: "/sign-up",
		name: "SignUp",
		component: () => import('@/components/SignUp.vue')
	},
	{
		path: "/login",
		name: "Login",
		component: () => import('@/components/Login.vue')
	},
	{
		path: "/add-restaurant",
		name: "AddRestaurant",
		component: () => import('@/components/AddRestaurant.vue')
	},
	{
		path: "/update-restaurant",
		name: "UpdateRestaurant",
		component: () => import('@/components/UpdateRestaurant.vue')
	}
];

const router = createRouter({
	history: createWebHistory(base_path),
	routes,
})

export default router