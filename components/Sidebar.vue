<template>
    <div class="widget-area">
        <div class="mb-30">
            <a href="javascript:void(0)" target="_blank">
                <nuxt-img sizes="sm:100vw md:50vw lg:400px" format="webp" src="https://via.placeholder.com/1500x1500?text=Top+Sidebar+Ads" width="auto" height="auto" style="max-width: 100%" alt="Top Sidebar Ads" />
            </a>
        </div>
        <div class="sidebar-widget widget-about mb-50 pt-30 pr-30 pb-30 pl-30 bg-white border-radius-5 has-border  wow fadeInUp animated">
            <h5 class="mb-20">Hello, I&#039;m Hamza Hameed</h5>
            <p class="font-medium text-muted">Hi, I’m Hamza Hameed, a Lahore native, who start his career as a freelancer two years ago. As time pass I learned different skills and blogging is one them which I loved to do in free time.</p>
            <strong>Follow me: </strong>
            <ul class="header-social-network d-inline-block list-inline color-white mb-20">
                <li class="list-inline-item">
                    <a style="background: #3b5999" href="https://facebook.com/hamxa95hameed" target="_blank" title="Facebook">
                        <i class="elegant-icon social_facebook"></i>
                    </a>
                </li>
                <li class="list-inline-item">
                    <a style="background: #55ACF9" href="https://twitter.com/hamzahameeeed" target="_blank" title="Twitter">
                        <i class="elegant-icon social_twitter"></i>
                    </a>
                </li>
                <li class="list-inline-item">
                    <a style="background: #0a66c2" href="https://linkedin.com/in/hamza-hameed-67341a150/" target="_blank" title="Linkedin">
                        <i class="elegant-icon social_linkedin"></i>
                    </a>
                </li>
            </ul>
        </div>
        <div class="sidebar-widget widget-latest-posts mb-50 wow fadeInUp animated">
            <div class="widget-header-1 position-relative mb-30">
                <h5 class="mt-5 mb-30">Most popular</h5>
            </div>
            <Shimmer v-if="loading" :loop="5" :type="'test'"></Shimmer>
            <div class="post-block-list post-module-1">
                <ul class="list-post">
                    <li class="mb-30 wow fadeInUp animated" v-for="latestPost in latestPosts.slice(10,14)" :key="latestPost.id">
                        <div class="d-flex bg-white has-border p-25 hover-up transition-normal border-radius-5">
                            <div class="post-content media-body">
                                <h6 class="post-title mb-15 text-limit-2-row font-medium">
                                    <nuxt-link :to="{ name: 'post-slug', params: { slug: latestPost.slug }}" v-html="latestPost.title.rendered"></nuxt-link>
                                </h6>
                                <div
                                    class="entry-meta meta-1 float-left font-x-small text-uppercase">
                                    <span class="post-on">{{ $moment(latestPost.date).format("MMM D, Y") }}</span>
                                    <span class="post-by has-dot">{{Math.floor(Math.random() * (1000 - 1 + 1)) + 1}} views</span>
                                </div>
                            </div>
                            <div
                                class="post-thumb post-thumb-80 d-flex ml-15 border-radius-5 img-hover-scale overflow-hidden">
                                <nuxt-link class="color-white" :to="{ name: 'post-slug', params: { slug: latestPost.slug }}">
                                    <nuxt-img sizes="sm:100vw md:50vw lg:400px" format="webp" :src="$common.getThumbnail(latestPost)" :alt="latestPost.title.rendered" />
                                </nuxt-link>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div class="sidebar-widget widget_instagram wow fadeInUp animated">
            <div class="widget-header-1 position-relative mb-30">
                <h5 class="mt-5 mb-30">Galleries</h5>
            </div>
            <Shimmer v-if="loading" :loop="9" :type="'instafeed'"></Shimmer>
            <div class="instagram-gellay">
                <ul class="insta-feed">
                    <li v-for="latestPost in latestPosts.slice(0,9)" :key="latestPost.id">
                        <nuxt-link :to="{ name: 'post-slug', params: { slug: latestPost.slug }}"  data-animate="zoomIn" data-duration="1.5s" data-delay="0.1s">
                            <nuxt-img sizes="sm:100vw md:50vw lg:400px" format="webp" class="border-radius-5" :src="$common.getThumbnail(latestPost)" :alt="latestPost.title.rendered" width="90" height="90" />
                        </nuxt-link>
                    </li>
                </ul>
            </div>
        </div>
        <div class="mt-30 mb-30">
            <a href="javascript:void(0)" target="_blank">
                <nuxt-img sizes="sm:100vw md:50vw lg:400px" format="webp" width="auto" height="auto" src="https://via.placeholder.com/1500x1500?text=Bottom+Sidebar+Ads" style="max-width: 100%" alt="Bottom Sidebar Ads" />
            </a>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            latestPosts:[],
            queryOptions: {
				_embed: true //Response should include embedded resources.
			},
            loading: true,
            category : [],
            postIDs:[],
        }
    },
    async mounted() {
        let latestPosts  = await this.$axios.get('/posts', { params: this.queryOptions })
        this.latestPosts = latestPosts.data
        this.loading = false
	}
}
</script>