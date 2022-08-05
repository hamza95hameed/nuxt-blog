<template>
	<grid-view :post_type="'tags'"></grid-view>
</template>
<script>
import getSiteMeta from "@/utils/getSiteMeta";
export default {
	layout:'layout',
	async asyncData({$axios, route}) {
		const {data} = await $axios.get('/tags?slug=' + route.params.slug+'&_embed=true')
		return  {article:data[0]} ;
	},
	head() {
		return {
			title: `News Parho | ${this.article.name}`,
			meta: [
				...this.meta,
			],
			link: [
				{
					hid: "canonical",
					rel: "canonical",
					href: `https://newsparho.com/tag/${this.$route.params.slug}`,
				},
			],
		};
	},
	computed: {
		meta() {
			const metaData = {
				type: "article",
				title: `News Parho | ${this.article.name}`,
				description: `${this.article.description}`,
				url: `https://newsparho.com/tag/${this.$route.params.slug}`,
				mainImage: '',
			};
			return getSiteMeta(metaData);
		}
	},
}
</script>