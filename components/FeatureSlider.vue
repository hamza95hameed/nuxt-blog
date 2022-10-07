<template>
    <div class="featured-slider-2">
        <div class="featured-slider-2-items">
            <slick ref="slick" :options="slickOptions" v-if="posts.length > 0">
                <div class="slider-single" v-for="post in posts.slice(0,4)" :key="post.id">
                    <div class="post-thumb position-relative">
                        <nuxt-img class="thumb-overlay position-relative" :src="$common.getThumbnail(post)" sizes="sm:100vw md:50vw lg:400px" format="webp" height="600"></nuxt-img>
                        <div class="post-content-overlay">
                            <div class="container">
                                <div class="entry-meta meta-0 font-small mb-20">
                                    <nuxt-link :to="{ name: 'category-slug', params: { slug: $common.getCategory(post).toLowerCase() }}">
                                        <span class="post-cat text-warning text-uppercase">{{ $common.getCategory(post) }}</span>
                                    </nuxt-link>     
                                </div>
                                <h1 class="post-title mb-20 font-weight-900 text-white">
                                    <nuxt-link class="text-white text" :to="{ name: 'post-slug', params: { slug: post.slug }}" v-html="post.title.rendered"></nuxt-link>
                                </h1>
                                <div class="entry-meta meta-1 font-small text-white mt-10 pr-5 pl-5">
                                    <span class="post-on">{{ $moment(post.date).format("MMM D, Y") }}</span>
                                    <span class="hit-count has-dot">{{Math.floor(Math.random() * (1000 - 1 + 1)) + 1}} views</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </slick>
        </div>
        <div class="container position-relative">
            <div class="arrow-cover color-white"></div>
            <div class="featured-slider-2-nav-cover">
                <div v-if="posts.length > 0" class="featured-slider-2-nav">
                    <div class="slider-post-thumb mr-15 mt-20 position-relative w-100" @click="changeSlide(index)" v-for="(post, index) in posts.slice(0,4)" :key="post.id">
                        <div class="d-flex hover-up-2 transition-normal">
                            <div class="post-thumb post-thumb-80 d-flex mr-15 border-radius-5">
                                <img class="border-radius-5" :src="$common.getThumbnail(post)" alt="The Top 2020 Handbag Trends to Know">
                            </div>
                            <div class="post-content media-body text-white">
                                <h5 class="post-title mb-15 text-limit-2-row" v-html="post.title.rendered"></h5>
                                <div class="entry-meta meta-1 float-left font-x-small text-uppercase">
                                    <span class="post-on text-white">{{ $moment(post.date).format("MMM D, Y") }}</span>
                                    <span class="hit-count has-dot text-white">{{Math.floor(Math.random() * (1000 - 1 + 1)) + 1}} views</span>
                                </div>
                            </div>
                        </div>
                    </div>
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
                infinite: false,
                arrows : false,                    
                draggable:true,
                speed: 500,
                slidesToShow: 1,
                slidesToScroll: 1
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
        },
        changeSlide(index){
            this.$refs.slick.goTo(index);
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