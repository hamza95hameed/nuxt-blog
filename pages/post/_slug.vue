<template>
	<main class="bg-grey pb-30" v-if="post">
		<div class="container single-content">
			<div class="entry-header entry-header-style-1 mb-50 pt-50">
			<h1 class="entry-title mb-50 font-weight-900" v-html="post.title.rendered"></h1>
			<div class="row">
				<div class="col-md-6">
				<div class="entry-meta align-items-center meta-2 font-small color-muted">
					<p class="mb-5">
					<span class="author-avatar">
						<img class="img-circle" :src="$common.getAuthorImage(post)" alt="Steven Madden" /></span>
					By
					<nuxt-link :to="{name : 'author-slug', params: { slug: $common.getAuthorSlug(post) }}"><span class="author-name font-weight-bold">{{ $common.getAuthor(post) }}</span></nuxt-link>
					</p>
					<span class="mr-10"> {{ $moment(post.date).format("MMM D, Y") }}</span>
					<span class="has-dot">{{ $common.readingTime(post) }}</span>
				</div>
				</div>
				<div class="col-md-6 text-right d-none d-md-inline">
				<ul class="header-social-network d-inline-block list-inline mr-15">
					<li class="list-inline-item text-muted">
						<span>Share this: </span>
					</li>
					<li class="list-inline-item text-muted">
						<ShareNetwork
						network="facebook"
						:url="post.link"
						:title="post.title.rendered"
						:description="post.excerpt.rendered"
						class="social-icon fb text-xs-center"
						>
						<i class="elegant-icon social_facebook"></i>
					</ShareNetwork>
					</li>
					<li class="list-inline-item text-muted">
						<ShareNetwork
						network="twitter"
						:url="post.link"
						:title="post.title.rendered"
						:description="post.excerpt.rendered"
						class="social-icon tw text-xs-center"
						><i class="elegant-icon social_twitter"></i></ShareNetwork>
					</li>
					<li class="list-inline-item text-muted">
						<ShareNetwork
						network="linkedin"
						:url="post.link"
						:title="post.title.rendered"
						:description="post.excerpt.rendered"
						class="social-icon pt text-xs-center"
						><i class="elegant-icon social_linkedin"></i></ShareNetwork>
					</li>
				</ul>
				</div>
			</div>
			</div>

			<figure class="image mb-30 m-auto text-center border-radius-10">
				<img class="border-radius-10" :src="$common.getThumbnail(post)" :alt="post.title.rendered" width="100%"/>
			</figure>

			<article class="entry-wraper mb-50">
				<div  v-html="post.content.rendered"></div>
				<div class="entry-bottom mt-50 mb-30 wow fadeIn animated" style="visibility: visible; animation-name: fadeIn" >
					<div class="tags">
					<span>Tags: </span>
					<span v-for="tag in tags" :key="tag.id" >
						<nuxt-link  :to="{name : 'tag-slug', params: { slug: tag.slug }}">{{ tag.name }}</nuxt-link>
					</span>
					</div>
				</div>
				<div class="single-social-share clearfix wow fadeIn animated" style="visibility: visible; animation-name: fadeIn">
					<ul class=" header-social-network d-inline-block list-inline float-md-right mt-md-0 mt-4">
						<li class="list-inline-item text-muted">
							<span>Share this: </span>
						</li>
						<li class="list-inline-item text-muted">
							<ShareNetwork
							network="facebook"
							:url="post.link"
							:title="post.title.rendered"
							:description="post.excerpt.rendered"
							class="fb"
							>
							<i class="elegant-icon social_facebook"></i>
						</ShareNetwork>
						</li>
						<li class="list-inline-item text-muted">
							<ShareNetwork
							network="twitter"
							:url="post.link"
							:title="post.title.rendered"
							:description="post.excerpt.rendered"
							class="tw"
							><i class="elegant-icon social_twitter"></i></ShareNetwork>
						</li>
						<li class="list-inline-item text-muted">
							<ShareNetwork
							network="linkedin"
							:url="post.link"
							:title="post.title.rendered"
							:description="post.excerpt.rendered"
							class="pt"
							><i class="elegant-icon social_linkedin"></i></ShareNetwork>
						</li>
					</ul>
				</div>

				<div class=" author-bio p-30 mt-50 border-radius-10 bg-white wow fadeIn animated" style="visibility: visible; animation-name: fadeIn">
					<div class="author-image mb-30">
						<img class="avatar" :src="$common.getAuthorImage(post)" :alt="$common.getAuthor(post)" />
					</div>
					<div class="author-info">
						<h4 class="font-weight-bold mb-20">
							<nuxt-link :to="{name : 'author-slug', params: { slug: $common.getAuthorSlug(post) }}"><span class="vcard author"><span class="fn">{{ $common.getAuthor(post) }}</span></span></nuxt-link>
						</h4>
						<p>{{ $common.getAuthorDesc(post) }}</p>
					</div>
				</div>

				<div class="related-posts">
					<div class="post-module-3">
						<div class="widget-header-2 position-relative mb-30">
							<h5 class="mt-5 mb-30">Related posts</h5>
						</div>
						<div class="loop-list loop-list-style-1">
							<article class="hover-up-2 transition-normal wow fadeInUp animated" style="visibility: visible; animation-name: fadeInUp" v-for="relate in related.slice(0,5)" :key="relate.id" v-show="$route.params.slug != relate.slug">
								<div class="row mb-40 list-style-2">
									<div class="col-md-4">
										<div class="post-thumb position-relative border-radius-5">
											<div class="img-hover-slide border-radius-5 position-relative" :style="'background-image: url('+$common.getThumbnail(relate)+')'">
												<nuxt-link class="img-link" :to="{ name: 'post-slug', params: { slug: relate.slug }}" ></nuxt-link>
											</div>
											<ul class="social-share">
												<li><a href="#"><i class="elegant-icon social_share"></i></a></li>
												<li>
													<ShareNetwork
													network="facebook"
													:url="post.link"
													:title="post.title.rendered"
													:description="post.excerpt.rendered"
													class="fb"
													>
													<i class="elegant-icon social_facebook"></i>
												</ShareNetwork>
												</li>
												<li><ShareNetwork
													network="twitter"
													:url="post.link"
													:title="post.title.rendered"
													:description="post.excerpt.rendered"
													class="tw"
													><i class="elegant-icon social_twitter"></i></ShareNetwork>
												</li>
												<li>
													<ShareNetwork
													network="linkedin"
													:url="post.link"
													:title="post.title.rendered"
													:description="post.excerpt.rendered"
													class="pt"
													><i class="elegant-icon social_linkedin"></i></ShareNetwork>
												</li>
											</ul>
										</div>
									</div>
									<div class="col-md-8 align-self-center">
										<div class="post-content">
											<div class="entry-meta meta-0 font-small mb-10">
												<nuxt-link :to="{name : 'category-slug', params: { slug: $common.getCategory(post).toLowerCase() }}"><span class="post-cat text-warning">{{ $common.getCategory(relate) }}</span></nuxt-link>
											</div>
											<h5 class="post-title font-weight-900 mb-20">
												<nuxt-link class="text" :to="{ name: 'post-slug', params: { slug: relate.slug }}" v-html="relate.title.rendered"></nuxt-link>
											</h5>
											<div class="entry-meta meta-1 float-left font-x-small text-uppercase">
												<span class="post-on">{{ $moment(relate.date).format("MMM D, Y") }}</span>
												<span class="time-reading has-dot">{{ $common.readingTime(relate) }}</span>
												<span class="post-by has-dot">{{Math.floor(Math.random() * (1000 - 1 + 1)) + 1}} views</span>
											</div>
										</div>
									</div>
								</div>
							</article>
							<div class="comments-area" v-if="comments.length > 0">
								<div class="widget-header-2 position-relative mb-30">
									<h5 class="mt-5 mb-30">Comments</h5>
								</div>
								<div class="comment-list wow fadeIn  animated" style="visibility: visible; animation-name: fadeIn;" v-for="comment in comments" :key="comment.id">
									<div class="single-comment justify-content-between d-flex">
										<div class="user justify-content-between d-flex align-items-center">
											<div class="thumb">
												<img :src="comment.author_avatar_urls[96]" :alt="comment.author_name"  width="512">
											</div>
											<div class="desc">
												<p class="comment" v-html="comment.content.rendered"></p>
												<div class="d-flex justify-content-between">
													<div class="d-flex align-items-center">
														<h5>
															<a href="#">{{ comment.author_name }}</a>
														</h5>
														<p class="date">{{ $moment(comment.date).format("MMMM D, Y [at] h:mm:ss a") }}</p>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div class="comment-form wow fadeIn  animated" style="visibility: visible; animation-name: fadeIn;">
								<div class="widget-header-2 position-relative mb-30">
									<h5 class="mt-5 mb-30" id="reply" >Leave a Reply</h5>
								</div>
								<form class="form-contact comment_form contact-form" id="commentForm" v-on:submit.prevent="submitForm">							
									<div class="row">
										<div class="col-12">
											<div class="form-group">
												<textarea  v-model="form.content" class="form-control w-100" name="content" id="comment" cols="30" rows="9" placeholder="Write Comment"></textarea>
											</div>
										</div>
										<div class="col-sm-6">
											<div class="form-group">
												<input v-model="form.author_name" class="form-control" name="author_name" id="name" type="text" placeholder="Name">
											</div>
										</div>
										<div class="col-sm-6">
											<div class="form-group">
												<input v-model="form.author_email" class="form-control" name="author_email" id="email" type="email" placeholder="Email">
											</div>
										</div>
										<div class="col-12">
											<div class="form-group">
												<input v-model="form.author_url" class="form-control" name="author_url" id="website" type="text" placeholder="Website">
											</div>
										</div>
									</div>
									<div class="form-group">
										<button class="btn button button-contactForm">Post Comment</button>
									</div>
									<div class="contact-form-group">
										<div class="contact-message" v-show="message" :class="sent ? 'contact-success-message': 'contact-error-message'">{{message}}</div>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>

				<div class="single-more-articles border-radius-5">
					<div class="widget-header-2 position-relative mb-30">
					<h5 class="mt-5 mb-30">You might be interested in</h5>
					<button class="single-more-articles-close">
						<i class="elegant-icon icon_close"></i>
					</button>
					</div>
					<div class="post-block-list post-module-1 post-module-5">
					<ul class="list-post">
						<li class="mb-30" v-for="relate in related.slice(0,3)" :key="relate.id" v-show="$route.params.slug != relate.slug">
							<div class="d-flex hover-up-2 transition-normal">
								<div class="post-thumb post-thumb-80 d-flex mr-15 border-radius-5 img-hover-scale overflow-hidden">
									<nuxt-link class="color-white" :to="{ name: 'post-slug', params: { slug: relate.slug }}" >
										<img :src="$common.getThumbnail(relate)" alt="10 Reasons To Start Your Own, Profitable Website!"/>
									</nuxt-link>
								</div>
								<div class="post-content media-body">
									
								<h6 class="post-title mb-15 text-limit-2-row font-medium">
									<nuxt-link class="text" :to="{ name: 'post-slug', params: { slug: relate.slug }}" v-html="relate.title.rendered"></nuxt-link>
								</h6>
								<div class=" entry-meta meta-1 float-left font-x-small text-uppercase">
									<span class="post-on">{{ $moment(relate.date).format("MMM D, Y") }}</span>
									<span class="post-by has-dot">{{Math.floor(Math.random() * (1000 - 1 + 1)) + 1}} views</span>
								</div>
								</div>
							</div>
						</li>
					</ul>
					</div>
				</div>
			</article>
		</div>
	</main>
</template>
<script>
import getSiteMeta from "@/utils/getSiteMeta";
export default {
	layout:'layout',
	name: 'post-slug',
	data() {
		return {
			post: '',
			tag:'',
			tags:[],
			category: '',
			queryOptions: {
				_embed: true //Response should include embedded resources.
			},
			related: [],
			postCategory: '',
			form: {
                content: '',
                author_name: '',
                author_email: '',
                author_url: ''
            },
			comments: '',
			message: '',
			sent:false,
			description:'',
			pageTitle:'',
			pageUrl:'',
			ogImage:''
		}
	},

	head() {
		return {
			title: this.pageTitle,
			meta: [
				...this.meta,
				{
					property: "article:published_time",
					content: this.post.date,
				},
				{
					property: "article:modified_time",
					content: this.post.modified,
				},
				{
					property: "article:tag",
					content: this.tags,
				},
				{ name: "twitter:label1", content: "Written by" },
				{ name: "twitter:data1", content:  "Hamza Hameed" },
				{ name: "twitter:label2", content: "Filed under" },
				{
					name: "twitter:data2",
					content: this.post.tags ?  this.$common.getTag(this.post) : "",
				},
			],
			link: [
				{
					hid: "canonical",
					rel: "canonical",
					href: `https://bobross.com/post/${this.$route.params.slug}`,
				},
			],
		};
	},
	computed: {
		meta() {
			const metaData = {
				type: "article",
				title: this.pageTitle,
				description: this.description,
				url: `https://bobross.com/post/${this.$route.params.slug}`,
				mainImage: this.ogImage,
			};
			return getSiteMeta(metaData);
		}
	},
	methods: {
		submitForm(){
			this.form['post'] = this.post.id
            this.$axios.post('/comments', this.form)
                .then((response) => {
					this.sent = response.data.status == 'hold' ? true : false;
					if(this.sent){
						this.message      	   = 'Your comment is posted successfully.';
						this.form.content      = ''
						this.form.author_name  = ''
						this.form.author_email = ''
						this.form.author_url   = ''
					}
					setTimeout(() => {
						this.message = ''
					}, 5000);
					
                })
                .catch((error) => {
                }).finally(() => {
            });
        },
		async postData() {
			let post          = await this.$axios.get('/posts?slug=' + this.$route.params.slug, { params: this.queryOptions })
			this.post         = post.data[0]               
			this.postCategory = post.data[0].categories[0]

			this.description  = post.data[0].excerpt.rendered
			this.pageTitle    = post.data[0].title.rendered
			this.pageUrl      = post.data[0].link
			this.ogImage      = this.$common.getThumbnail(post.data[0])

			this.tags         = this.$common.getTag(this.post)

			let related       = await this.$axios.get('/posts?categories='+ this.postCategory, { params: this.queryOptions })
			this.related      = related.data

			let comments      = await this.$axios.get('/comments?post=' + this.post.id)
			this.comments     = comments.data
		},
	},
	mounted() {
		this.postData();
	}
}
</script>