<template>
	<main class="h-screen">
		<RouterView />
	</main>
</template>

<script>
import SignUp from '@/components/SignUp.vue';

export default {
	name: "App",

	components: {
		SignUp,
	}
}
</script>
