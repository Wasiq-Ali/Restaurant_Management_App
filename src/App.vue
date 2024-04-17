<template>
	<main>
		<h1>Hello World!</h1>
		<SignUp />
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
