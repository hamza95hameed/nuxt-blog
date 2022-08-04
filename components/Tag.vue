<template>
	<grid-view :post_type="'tags'"></grid-view>
</template>
<script>
import GridView from '@/components/GridView.vue';
export default {
	components: {
		GridView
	}
}
</script>