<template>
	<div class="toc-container" v-html="content"></div>
</template>

<script setup>

const props = defineProps({
	content:{
		type: String
	}
})
</script>

<style>
.toc-container {
  max-height: calc(100vh - 200px);
  overflow-y: auto;
  padding: 20px;
  -ms-overflow-style: none;
}
</style>