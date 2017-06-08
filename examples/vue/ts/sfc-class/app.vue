
<template>
	<div id="app">
		<h1>{{msg}}</h1>
	</div>
</template>

<script>

import Vue from 'vue';
import Component from 'vue-class-component';

@Component({
	name: 'hello'
})
export default class App extends Vue {
	msg: string = 'Hello World!';
}

</script>

<style>

h1 {color: red}

</style>