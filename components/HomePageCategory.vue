<template>
    <div>
        <div class="bg-grey pt-50 pb-50">
            <div class="container">
                <div class="row">
                    <div class="col-lg-8">
                        <div class="post-module-2">
                            <div class="widget-header-1 position-relative mb-30  wow fadeInUp animated">
                                <h5 class="mt-5 mb-30">Travel</h5>
                            </div>
                            <Shimmer v-if="loading" :loop="3" :type="'grid'"></Shimmer>

                            <div class="loop-list loop-list-style-1">
                                <slick ref="slick" :options="slickOptions" v-if="posts.length > 0">
                                    <article class="col-md-12 mb-40 wow fadeInUp  animated" v-for="post in posts" :key="post.id">
                                        <div class="post-card-1 border-radius-10 hover-up">
                                            <div class="post-card-1 border-radius-10 hover-up">
                                                <div class="post-thumb thumb-overlay img-hover-slide position-relative" :style="'background-image: url('+$common.getThumbnail(post)+')'">
                                                    <nuxt-link class="img-link" :to="{ name: 'post-slug', params: { slug: post.slug }}"></nuxt-link>
                                                    <span class="top-left-icon bg-warning">
                                                        <button class="elegant-icon bg-transparent border-0" :data-bookmark="'bookmark-'+post.id" :class="postIDs.indexOf(post.id) !== -1 ? 'icon_star': 'icon_star_alt'" v-on:click="$common.bookmark(post)"></button>
                                                    </span>
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
                                                <div class="post-content p-30">
                                                    <div class="entry-meta meta-0 font-small mb-10">
                                                        <nuxt-link :to="{ name: 'category-slug', params: { slug: $common.getCategory(post).toLowerCase() }}">
                                                            <span class="post-cat text-warning">{{ $common.getCategory(post) }}</span>
                                                        </nuxt-link>
                                                    </div>
                                                    <div class="d-flex post-card-content">
                                                        <h5 class="post-title mb-20 font-weight-900">
                                                            <nuxt-link class="text" :to="{ name: 'post-slug', params: { slug: post.slug }}" v-html="post.title.rendered"></nuxt-link>
                                                        </h5>
                                                        <div
                                                            class="entry-meta meta-1 float-left font-x-small text-uppercase">
                                                            <span class="post-on">{{ $moment(post.date).format("MMM D, Y") }}</span>
                                                            <span class="time-reading has-dot" v-html="$common.readingTime(post)"></span>
                                                            <span class="post-by has-dot">2,265 views</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </article>
                                </slick>
                            </div>
                        </div>
                        <div class="post-module-3">
                            <div class="widget-header-1 position-relative mb-30">
                                <h5 class="mt-5 mb-30">Latest posts</h5>
                            </div>
                            <div class="loop-list loop-list-style-1">                                
                                <Shimmer v-show="loading" :loop="10" :type="'list'"></Shimmer>                                   
                                <article class="hover-up-2 transition-normal wow fadeInUp animated"  v-for="latestPost in latestPosts.slice(0,9)" :key="latestPost.id">
                                    <div class="row mb-40 list-style-2">
                                        <div class="col-md-4">
                                            <div class="post-thumb position-relative border-radius-5">
                                                <div class="img-hover-slide border-radius-5 position-relative" :style="'background-image: url('+$common.getThumbnail(latestPost)+')'">
                                                    <nuxt-link class="img-link" :to="{ name: 'post-slug', params: { slug: latestPost.slug }}"></nuxt-link>
                                                </div>
                                                <ul class="social-share">
                                                    <li><a href="#"><i class="elegant-icon social_share"></i></a></li>
                                                    <li>
                                                        <ShareNetwork
                                                        network="facebook"
                                                        :url="latestPost.link"
                                                        :title="latestPost.title.rendered"
                                                        :description="latestPost.excerpt.rendered"
                                                        class="fb"
                                                        >
                                                        <i class="elegant-icon social_facebook"></i>
                                                    </ShareNetwork>
                                                    </li>
                                                    <li><ShareNetwork
                                                        network="twitter"
                                                        :url="latestPost.link"
                                                        :title="latestPost.title.rendered"
                                                        :description="latestPost.excerpt.rendered"
                                                        class="tw"
                                                        ><i class="elegant-icon social_twitter"></i></ShareNetwork>
                                                    </li>
                                                    <li>
                                                        <ShareNetwork
                                                        network="linkedin"
                                                        :url="latestPost.link"
                                                        :title="latestPost.title.rendered"
                                                        :description="latestPost.excerpt.rendered"
                                                        class="pt"
                                                        ><i class="elegant-icon social_linkedin"></i></ShareNetwork>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div class="col-md-8 align-self-center">
                                            <div class="post-content">
                                                <div class="entry-meta meta-0 font-small mb-10">
                                                    <nuxt-link :to="{ name: 'category-slug', params: { slug: $common.getCategory(latestPost).toLowerCase() }}">
                                                        <span class="post-cat text-warning">{{ $common.getCategory(latestPost) }}</span>
                                                    </nuxt-link>
                                                </div>
                                                <h5 class="post-title font-weight-900 mb-20">
                                                    <nuxt-link class="text" :to="{ name: 'post-slug', params: { slug: latestPost.slug }}" v-html="latestPost.title.rendered"></nuxt-link>
                                                    <span class="post-format-icon">
                                                        <button class="elegant-icon bg-transparent border-0" :class="postIDs.indexOf(latestPost.id) !== -1 ? 'icon_star': 'icon_star_alt'" :data-bookmark="'bookmark-'+latestPost.id" v-on:click="$common.bookmark(latestPost)"></button>
                                                    </span>
                                                </h5>
                                                <div
                                                    class="entry-meta meta-1 float-left font-x-small text-uppercase">
                                                    <span class="post-on">{{ $moment(latestPost.date).format("MMM D, Y") }}</span>
                                                    <span class="time-reading has-dot" v-html="$common.readingTime(latestPost)"></span>
                                                    <span class="post-by has-dot">{{Math.floor(Math.random() * (1000 - 1 + 1)) + 1}} views</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </article>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4">
                        <Sidebar></Sidebar>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Slick from 'vue-slick'
import Shimmer from '../components/Shimmer.vue'
import Sidebar from '../components/Sidebar.vue'
export default {
    components: { 
        Slick,
        Sidebar,
        Shimmer
    },
    data() {
        return {
            posts:[],
            latestPosts:[],
            queryOptions: {
				_embed: true //Response should include embedded resources.
			},
            loading: true,
            category : [],
            slickOptions: {
                dots: true,
                infinite: true,
                arrows : false,                    
                draggable:true,
                autoplay:true,
                autoplaySpeed: 5000,
                slidesToShow: 2,
                slidesToScroll: 1,
                responsive: [
                    {
                    breakpoint: 1024,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 1,
                            infinite: true,
                            dots: true
                        }
                    },
                    {
                    breakpoint: 600,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1
                        }
                    },
                    {
                    breakpoint: 480,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1
                        }
                    }
                ]
            },
            postIDs:[],
        }
    },
    methods: {},
    async mounted() {
		let posts        = await this.$axios.get('/posts?categories=3025',{ params: this.queryOptions })
        this.posts       = posts.data.slice()
        let latestPosts  = await this.$axios.get('/posts', { params: this.queryOptions })
        this.latestPosts = latestPosts.data.slice()
        this.loading     = false
        let postArray    = localStorage.bookmark == undefined ? []: JSON.parse(localStorage.bookmark);

        for (let index = 0; index < postArray.length; index++) {
            this.postIDs[this.postIDs.length] = postArray[index]
        }
	}
}
</script>