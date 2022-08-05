<template>
    <div>
        <div class="container">
            <div class="hot-tags pt-30 pb-30 font-small align-self-center">
                <div class="widget-header-3">
                    <div class="row align-self-center">
                        <div class="col-md-4 align-self-center">
                            <h5 class="widget-title">Featured posts</h5>
                        </div>
                        <div class="col-md-8 text-md-right font-small align-self-center">
                            <p class="d-inline-block mr-5 mb-0">
                                <i class="elegant-icon  icon_tag_alt mr-5 text-muted"></i>Hot tags:
                            </p>
                            <ul class="list-inline d-inline-block tags">
                                <li class="list-inline-item" v-for="tag in tags.slice(0,5)" :key="tag.id"><nuxt-link :to="{ name: 'tag-slug', params: { slug: tag.slug }}" v-html="'# '+tag.name"></nuxt-link></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <Shimmer v-if="loading" :loop="6" :type="'grid'"></Shimmer> 
            <div class="loop-grid mb-30">
                    <div class="row">
                        <div class="col-lg-8 mb-30">
                            <div class="carausel-post-1 hover-up border-radius-10 overflow-hidden transition-normal position-relative">
                                <div class="arrow-cover">
                                    <button class="previous" @click="prev()">
                                        <i class="elegant-icon arrow_left"></i>
                                    </button>
                                    <button class="next" @click="next()">
                                        <i class="elegant-icon arrow_right"></i>
                                    </button>
                                </div>
                                <slick ref="slick" :options="slickOptions" v-if="posts.length > 0">
                                    <div class="slide-fade"  v-for="post in posts.slice(0,5)" :key="post.id">
                                        <div class="position-relative post-thumb">
                                            <div class="thumb-overlay img-hover-slide position-relative" :style="'background-image: url('+$common.getThumbnail(post)+')'">
                                                <nuxt-link class="img-link" :to="{ name: 'post-slug', params: { slug: post.slug }}"></nuxt-link>
                                                <span class="top-left-icon bg-warning">
                                                    <button class="elegant-icon bg-transparent border-0" :data-bookmark="'bookmark-'+post.id" :class="postIDs.indexOf(post.id) !== -1 ? 'icon_star': 'icon_star_alt'" v-on:click="$common.bookmark(post)"></button>
                                                </span>
                                                <div class="post-content-overlay text-white ml-30 mr-30 pb-30">
                                                    <div class="entry-meta meta-0 font-small mb-20" >
                                                        <nuxt-link :to="{ name: 'category-slug', params: { slug: $common.getCategory(post).toLowerCase() }}">
                                                            <span class="post-cat text-warning text-uppercase">{{ $common.getCategory(post) }}</span>
                                                        </nuxt-link>                               
                                                    </div>
                                                    <h3 class="post-title font-weight-900 mb-20">
                                                        <nuxt-link class="text-white text" :to="{ name: 'post-slug', params: { slug: post.slug }}" v-html="post.title.rendered"></nuxt-link>
                                                    </h3>
                                                    <div class="entry-meta meta-1 font-small text-white mt-10 pr-5 pl-5">
                                                        <span class="post-on">{{ $moment(post.date).format("MMM D, Y") }}</span>
                                                        <span class="time-reading has-dot">{{ $common.readingTime(post) }}</span>
                                                        <span class="hit-count has-dot">{{Math.floor(Math.random() * (1000 - 1 + 1)) + 1}} views</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </slick>
                            </div>
                        </div>
                    <article class="col-lg-4 col-md-6 mb-30" v-for="post in posts.slice(6,7)" :key="post.id">
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
                                <div class="entry-meta meta-0 font-small mb-20" >
                                    <nuxt-link class="img-link" :to="{ name: 'category-slug', params: { slug: $common.getCategory(post).toLowerCase() }}">
                                        <span class="post-cat text-success text-uppercase">{{$common.getCategory(post)}}</span>
                                    </nuxt-link>                               
                                </div>
                                <div class="d-flex post-card-content">
                                    <h5 class="post-title mb-20 font-weight-900">
                                        <nuxt-link class="text" :to="{ name: 'post-slug', params: { slug: post.slug }}" v-html="post.title.rendered"></nuxt-link>
                                    </h5>
                                    <div class="entry-meta meta-1 float-left font-x-small text-uppercase">
                                        <span class="post-on">{{ $moment(post.date).format("MMM D, Y") }}</span>
                                        <span class="time-reading has-dot">{{ $common.readingTime(post) }}</span>
                                        <span class="post-by has-dot">{{Math.floor(Math.random() * (1000 - 1 + 1)) + 1}} views</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </article>
                    <article v-for="post in posts.slice(offset,offset+3)" :key="post.id" class="col-lg-4 col-md-6 mb-30 wow fadeInUp  animated" data-wow-delay="0.0s" style="visibility: visible; animation-delay: 0s; animation-name: fadeInUp;">
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
                                <div class="entry-meta meta-0 font-small mb-20" >
                                    <nuxt-link :to="{ name: 'category-slug', params: { slug: $common.getCategory(post).toLowerCase() }}">
                                        <span class="post-cat text-info text-uppercase">{{ $common.getCategory(post) }}</span>
                                    </nuxt-link>                               
                                </div>
                                <div class="d-flex post-card-content">
                                    <h5 class="post-title mb-20 font-weight-900">
                                        <nuxt-link class="text" :to="{ name: 'post-slug', params: { slug: post.slug }}" v-html="post.title.rendered"></nuxt-link>
                                    </h5>
                                    <div class="entry-meta meta-1 float-left font-x-small text-uppercase">
                                        <span class="post-on">{{ $moment(post.date).format("MMM D, Y") }}</span>
                                        <span class="time-reading has-dot">{{ $common.readingTime(post) }}</span>
                                        <span class="post-by has-dot">{{Math.floor(Math.random() * (1000 - 1 + 1)) + 1}} views</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </article>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Slick from 'vue-slick'
export default {
    name: 'FeaturePost',
    components: { 
        Slick,
    },
	data() {
        return {
			posts: [],
			queryOptions: {
				per_page: 20, // Only retrieve the 3 most recent blog posts.
				page: 1, // Current page of the collection.
				_embed: true //Response should include embedded resources.
			},
            loading: true,
            offset: 10,
            content: '',
            totalreadingtime: '',
            readingtime:'',
            word_count:'',
            timer:'',
            slickOptions: {
                dots: false,
                infinite: true,
                arrows : true,                    
                draggable:true,
                speed: 500,
                slidesToShow: 1,
                slidesToScroll: 1,
            },
            category : [],
            tags : [],
            postIDs:[],
            bookmark:false,
		}
	},
    methods: {

        next() {
            this.$refs.slick.next();
        },

        prev() {
            this.$refs.slick.prev();
        },
        reInit() {                
            let currIndex = this.$refs.slick.currentSlide()
            this.$refs.slick.destroy()
            this.$nextTick(() => {
                this.$refs.slick.create()
                this.$refs.slick.goTo(currIndex, true)
            })
        },
        async getData(){
            let posts    = await this.$axios.get('/posts', { params: this.queryOptions })
            this.posts   = posts.data
            this.loading = false
            let tags     = await this.$axios.get('/tags')
            this.tags    = tags.data
        }
	},
    mounted() {

        this.getData();
        var postArray = localStorage.bookmark == undefined ? []: JSON.parse(localStorage.bookmark);
        for (let index = 0; index < postArray.length; index++) {
            this.postIDs[this.postIDs.length] = postArray[index]
        }
        
	}
}
</script>
<style>
.slick-next.slick-arrow,
.slick-prev.slick-arrow{
    display: none !important;
}
</style>