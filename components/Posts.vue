<template>
	<div class="container">
	<feature-post></feature-post>
		<div class="row mt-8 mb-4">
			<div class="col-md-4" v-for="post in posts" :key="post.id">
				<div class="shadow">
					<nuxt-link :to="{ name: 'post-slug', params: { id: post.id } }">
						<img
							class="card-img-top"
							:src="getThumbnail(post)"
							v-if="hasThumbnail(post)"
							:alt="post.slug"
							height="250"
						/>
					</nuxt-link>
					<div class="card-body mb-3">
						<div class="d-flex justify-content-between">
							<nuxt-link :to="{ name: 'category-slug', params: { id: post.categories[0] } }">
								<p class="card-text">
									<small class="text-muted" v-html="getCategory(post)"></small>
								</p>
							</nuxt-link>
							<nuxt-link :to="{ name: 'author-slug', params: { id: post.author } }">
								<p class="card-text">
									<small class="text-muted" v-html="getAuthor(post)"></small>
								</p>
							</nuxt-link>
						</div>
						<nuxt-link :to="{ name: 'post-slug', params: { id: post.id } }">
							<h5 class="card-title text">{{ post.title.rendered }}</h5>
						</nuxt-link>
						<p class="card-text excerpt" v-html="post.excerpt.rendered"></p>
						<nuxt-link :to="{ name: 'post-slug', params: { id: post.id } }">
							<button class="btn btn-primary">Read More</button>
						</nuxt-link>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import axios from 'axios'
import FeaturePost from './FeaturePost.vue'
export default {
	components: { FeaturePost },
	name: 'Posts',
	data() {
		return {
			posts: [],
			queryOptions: {
				per_page: 20, // Only retrieve the 3 most recent blog posts.
				page: 1, // Current page of the collection.
				_embed: true //Response should include embedded resources.
			}
		}
	},
	methods: {
		hasThumbnail(post) {
			if (
				post._embedded['wp:featuredmedia'] &&
				post._embedded['wp:featuredmedia'][0].media_details &&
				post._embedded['wp:featuredmedia'][0].media_details.sizes
			) {
				return post._embedded['wp:featuredmedia'][0].media_details.sizes.full
			}
		},

		getThumbnail(post) {
			if (post._embedded['wp:featuredmedia']!= null) {
				return post._embedded['wp:featuredmedia'][0].media_details.sizes.full.source_url
			}
		},

		getAuthor(post) {
			if (post._embedded['author'][0].name) {
				return post._embedded['author'][0].name
			}
		},
		getCategory(post) {

			if (post._embedded['wp:term']) {
				return post._embedded['wp:term'][0][0].name
			}
		}
	},
	async mounted() {
		axios
			.get('/posts', { params: this.queryOptions })
			.then(response => {
				this.posts = response.data
			})
			.catch(function (response) {
				console.log(response)
			})
	}
}
</script>
<style>
</style>