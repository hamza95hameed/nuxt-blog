<template>
    <div class="container">
        <div class="archive-header pt-50">
            <h2 class="font-weight-900">Bookmark</h2>
            <div class="breadcrumb">
                <nuxt-link :to="{ name: 'index'}">Home</nuxt-link><span></span>
                Bookmark
            </div>
            <div class="bt-1 border-color-1 mt-30 mb-50"></div>
        </div>
        <div class="row">
            <div class="col-lg-8">
                <div>
                    <div class="post-module-3">
                        <div class="loop-list loop-list-style-1">
                            <Shimmer v-if="loading" :loop="5" :type="'list'"></Shimmer>
                            <div v-if="posts.length > 0">
                                <article class="hover-up-2 transition-normal wow fadeInUp animated" v-for="post in displayedPosts" :key="post.id">
                                    <div class="row mb-40 list-style-2">
                                        <div class="col-md-4">
                                            <div class="post-thumb position-relative border-radius-5">
                                                <div class="img-hover-slide border-radius-5 position-relative"
                                                    :style="'background-image: url('+$common.getThumbnail(post)+')'">
                                                    <nuxt-link class="img-link" :to="{ name: 'post-slug', params: { slug: post.slug }}"></nuxt-link>
                                                </div>
                                                <ul class="social-share">                                                
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
                                                    <nuxt-link :to="{ name: 'category-slug', params: { slug: $common.getCategory(post).toLowerCase() }}">
                                                        <span class="post-cat text-uppercase">{{ $common.getCategory(post) }}</span>
                                                    </nuxt-link>                               
                                                </div>
                                                <h5 class="post-title font-weight-900 mb-20">
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
                            <div v-else>
                                <div class="text-md-center text-lg-left">
                                    <h1 class="mb-30 font-weight-900">No Bookmark Found</h1>
                                </div>
                            </div>
                        </div>
                        <div class="pagination-area  mb-30 wow fadeInUp animated justify-content-start"  v-if="posts.length > 0">
                            <nav>
                                <ul class="pagination">
                                    <li class="page-item" >
                                        <span class="page-link" :class="page == 1 ? 'disable': ''"  v-if="page != 1"  @click="page--">‹</span>
                                    </li>
                                    <li class="page-item" :class="page == pageNumber ? 'active': ''" v-for="pageNumber in pages" :key="pageNumber.id"><a class="page-link"  @click="page = pageNumber"> {{pageNumber}} </a></li>
                                    <li class="page-item" >
                                        <a class="page-link" :class="page < pages.length ? 'disable': ''" v-if="page < pages.length" @click="page++">›</a>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-4 primary-sidebar sticky-sidebar">
                <Sidebar></Sidebar>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    layout:'layout',
    data(){
        return{
            posts: [],
            queryOptions: {
				_embed: true
			},
            loading: true,
            content: '',
            totalreadingtime: '',
            readingtime:'',
            word_count:'',
            timer:'',
            time:'',
            category : [],
            page: 1,
			perPage: 14,
			pages: [],
        }
    },
    computed: {
		displayedPosts () {
			return this.paginate(this.posts);
		}
	},
	filters: {
		trimWords(value){
			return value.split(" ").splice(0,20).join(" ") + '...';
		}
	},

	watch: {
		posts () {
			this.setPages();
		},
	},
    methods:{
        setPages () {
			let numberOfPages = Math.ceil(this.posts.length / this.perPage);
			for (let index = 1; index <= numberOfPages; index++) {
				this.pages.push(index);
			}
		},
		paginate (posts) {
			let page = this.page;
			let perPage = this.perPage;
			let from = (page * perPage) - perPage;
			let to = (page * perPage);
			return  posts.slice(from, to);
		},
        
    },
    async mounted() { 
        if(localStorage.bookmark != undefined){
            let posts     = await this.$axios.get('/posts?include='+JSON.parse(localStorage.bookmark), { params: this.queryOptions })
            this.posts    = posts.data
        }
        this.loading  = false
    }
}
</script>