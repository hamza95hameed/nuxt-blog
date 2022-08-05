<template>
      <div class="container">
		<div class="archive-header pt-50">
		<h2 class="font-weight-900">{{ postTypeName }}</h2>
		<div class="breadcrumb">
			<nuxt-link :to="{ name: 'index'}">Home</nuxt-link><span></span>
			{{ postTypeName }}
		</div>

		<div class="bt-1 border-color-1 mt-30 mb-50"></div>
        </div>
        <div class="mt-30 mb-50"></div>
		<Shimmer v-if="loading" :loop="9" :type="'grid'"></Shimmer>
        <div class="loop-list loop-list-style-1">
          <div class="row">
            <article class="col-md-4 mb-40 wow fadeInUp animated" v-for="post in displayedPosts" :key="post.slug">
              <div class="post-card-1 border-radius-10 hover-up">
                <div class="post-card-1 border-radius-10 hover-up">
                  <div class="post-thumb thumb-overlay img-hover-slide position-relative" :style="'background-image: url('+$common.getThumbnail(post)+')'">
					<nuxt-link class="img-link" :to="{ name: 'post-slug', params: { slug: post.slug } }"></nuxt-link>
					<span class="top-left-icon bg-warning">
						<button class="elegant-icon bg-transparent border-0" :class="postIDs.indexOf(post.id) !== -1 || (postID == post.id && bookmarkClass) ? 'icon_star': 'icon_star_alt'" :data-bookmark="'bookmark-'+post.id" v-on:click="bookmark(post)"></button>
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
                      <nuxt-link :to="{ name: 'category-slug', params: { slug: postTypeName.toLowerCase() } }"><span class="post-cat text-primary">{{ postTypeName }}</span></nuxt-link>
                    </div>
                    <div class="d-flex post-card-content">
                      <h5 class="post-title mb-20 font-weight-900">
                        <nuxt-link  class="text" :to="{ name: 'post-slug', params: { slug: post.slug }}" v-html="post.title.rendered"></nuxt-link>
                      </h5>
                      <div class="entry-meta  meta-1 float-left font-x-small text-uppercase">
                        <span class="post-on">{{ $moment(post.date).format("MMM D, Y") }}</span>
                        <span class="time-reading has-dot">{{ $common.readingTime(post) }}</span>
                        <span class="post-by has-dot">{{Math.floor(Math.random() * (1000 - 1 + 1)) + 1}} views</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>
        <div class="pagination-area  mb-30 wow fadeInUp animated justify-content-start">
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
	  
</template>
<script>
export default {
    props: ["post_type"],
	data() {
		return {
			categories: '',
			title: '',
			postType: '',
			posts: [],
			loading: true,
			postTypeName : '',
			queryOptions: {
				_embed: true //Response should include embedded resources.
			},
			postTypeID: {
				per_page: 100,
				_embed: true //Response should include embedded resources.
			},
			page: 1,
			perPage: 9,
			pages: [],
			postIDs:[],
            postID:null,
			bookmarkClass:false
		}
	},
	methods: {
		bookmark(post){
			this.postID        = post.id;
			this.bookmarkClass = !this.bookmarkClass;
			this.$common.bookmark(post)
		},
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

		async getData() {
			this.postTypeName = this.$route.params.slug.replace("-", " ").toUpperCase();;   
			let postType      = await this.$axios.get('/'+this.post_type+'?slug=' + this.$route.params.slug, { params: this.queryOptions })			
			let posts         = await this.$axios.get('/posts?'+this.post_type+'='+ postType.data[0].id, { params: this.postTypeID });
			this.posts 		  = posts.data
			this.loading      = false;
		},
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
	async mounted() {
		this.getData();
        var postArray = localStorage.bookmark == undefined ? []: JSON.parse(localStorage.bookmark);
        for (let index = 0; index < postArray.length; index++) {
            this.postIDs[this.postIDs.length] = postArray[index]
        }
	}
}
</script>