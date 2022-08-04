<template>
	<footer class="pt-50 pb-20 bg-grey">
		<div class="container">
			<div class="row">
				<div class="col-lg-3 col-md-6">
					<div class="sidebar-widget wow fadeInUp animated mb-30">
						<div class="widget-header-2 position-relative mb-30">
							<h5 class="mt-5 mb-30">About me</h5>
						</div>
						<div class="textwidget">
							<p>Start writing, no matter what. The water does not flow until the faucet is turned on.</p>
							<p>
								<strong class="color-black">Address</strong><br />
								19W 24th Street New York NY 10010 United States
							</p>
							<p><strong class="color-black">Follow me</strong><br /></p>
							<ul class="header-social-network d-inline-block list-inline color-white mb-20">
								<li class="list-inline-item">
									<a
										style="background: #3b5999"
										href="https://facebook.com/hamxa95hameed"
										target="_blank"
										title="Facebook"
										><i class="elegant-icon social_facebook"></i
									></a>
								</li>
								<li class="list-inline-item">
									<a
										style="background: #55acf9"
										href="https://twitter.com/hamzahameeeed"
										target="_blank"
										title="Twitter"
										><i class="elegant-icon social_twitter"></i
									></a>
								</li>
								<li class="list-inline-item">
									<a
										style="background: #0a66c2"
										href="https://www.linkedin.com/in/hamza-hameed-67341a150/"
										target="_blank"
										title="Linkedin"
										><i class="elegant-icon social_linkedin"></i
									></a>
								</li>
							</ul>
						</div>
					</div>
				</div>
				<div class="col-lg-2 col-md-6">
					<div class="sidebar-widget widget_categories wow fadeInUp animated mb-30" data-wow-delay="0.1s">
						<div class="widget-header-2 position-relative mb-30">
							<h5 class="mt-5 mb-30">Quick links</h5>
						</div>
						<ul class="font-small">
							<li class="current">
								<nuxt-link :to="{ name: 'index'}">
									<span>Homepage</span>
								</nuxt-link>
							</li>
							<li>
								<nuxt-link :to="{ name: 'contact'}">
									<span>Contact</span>
								</nuxt-link>	
							</li>
						</ul>
					</div>
				</div>
				<div class="col-lg-3 col-md-6">
					<div class="sidebar-widget widget_tagcloud wow fadeInUp animated mb-30" data-wow-delay="0.2s">
						<div class="widget-header-2 position-relative mb-30">
							<h5 class="mt-5 mb-30">Tags</h5>
						</div>
						<div class="tagcloud mt-50">
							<nuxt-link v-for="tag in tags" :key="tag.id" class="tag-cloud-link" :to="{ name: 'tag-slug', params: { slug: tag.slug }}" v-html="tag.name"></nuxt-link>	
						</div>
					</div>
				</div>
				<div class="col-lg-4 col-md-6">
					<div class="sidebar-widget widget_newsletter wow fadeInUp animated mb-30" data-wow-delay="0.3s">
						<div class="widget-header-2 position-relative mb-30">
							<h5 class="mt-5 mb-30">Newsletter</h5>
						</div>
						<div class="newsletter">
							<p class="font-medium">
								Subscribe to our newsletter and get our newest updates right on your inbox.
							</p>
							<Newsletter></Newsletter>
						</div>
					</div>
				</div>
			</div>
			<div class="footer-copy-right pt-30 mt-20 wow fadeInUp animated">
				<p class="float-md-left font-small text-muted">© 2022 Stories</p>
				<p class="float-md-right font-small text-muted">Developed by Btechsols | All rights reserved.</p>
			</div>
		</div>
	</footer>
</template>
<script>
import Newsletter from '@/components/Newsletter'
export default {
	components:{
		Newsletter
	},
	data() {
		return {
			tags: [],
			queryOptions: {
				per_page: 10 // Only retrieve the 3 most recent blog posts.
			}
		}
	},
	methods: {
		async getData() {
			let tags = await this.$axios.get('/tags', { params: this.queryOptions })
			this.tags = tags.data

		},
	},
	mounted() {
		this.getData()
	}
}
</script>

