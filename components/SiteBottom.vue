<template>
    <div>
        <div class="site-bottom pt-50 pb-50">
            <div class="container">
                <div class="row">
                    <div class="col-lg-4 col-md-3" v-for="(c, i) in categories" :key="c.id">
                        <div class="sidebar-widget widget-latest-posts mb-30 wow fadeInUp animated" style="visibility: visible; animation-name: fadeInUp;">
                            <div class="widget-header-2 position-relative mb-30">
                                <h5 class="mt-5 mb-30">{{c.name}}</h5>
                            </div>
                            <Shimmer v-if="loading" :loop="5" :type="'lastestPost'"></Shimmer>
                            <div class="post-block-list post-module-1" v-for="post in posts[i]" :key="post.id" v-show="post.categories == c.id">
                                <ul class="list-post">
                                    <li class="mb-30">
                                        <div class="d-flex hover-up-2 transition-normal">
                                            <div class="post-thumb post-thumb-80 d-flex mr-15 border-radius-5 img-hover-scale overflow-hidden">
                                                <nuxt-link  class="color-white" :to="{ name: 'post-slug', params: { slug: post.slug }}">
                                                    <img :src="$common.getThumbnail(post)" :alt="post.title.rendered">
                                                </nuxt-link>
                                            </div>
                                            <div class="post-content media-body">
                                                <h6 class="post-title mb-15 text-limit-2-row font-medium">
                                                    <nuxt-link  class="text" :to="{ name: 'post-slug', params: { slug: post.slug }}" v-html="post.title.rendered"></nuxt-link>
                                                </h6>
                                                <div class="entry-meta meta-1 float-left font-x-small text-uppercase">
                                                    <span class="post-on">{{ $moment(post.date).format("MMM D, Y") }}</span>
                                                    <span class="post-by has-dot">{{Math.floor(Math.random() * (1000 - 1 + 1)) + 1}} views</span>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Shimmer from './Shimmer.vue'
export default {
    data() {
        return {
            categories: [{ name: "Entertainment", id: "3022" }, { name: "Sports", id: "3016" }, { name: "Travel", id: "3025" }],
            title: "",
            category: "",
            loading: true,
            posts: [],
            categoryName: "",
            queryOptions: {
                _embed: true
            },
            category_id: {
                per_page: 5,
                page: 1,
                _embed: true
            },
            page: 1,
            perPage: 9,
            pages: [],
        };
    },
    methods: {
        async getData() {
            for (let index = 0; index < this.categories.length; index++) {
                let  category = await this.$axios.get("/categories?slug=" + this.categories[index].name.toLowerCase(), { params: this.queryOptions })
                this.category = category.data[0]
                let  posts    = await this.$axios.get("/posts?categories=" + this.category.id, { params: this.category_id })
                this.posts.push(posts.data)
            }
            this.loading  = false                
        },
    },
    mounted() {
        this.getData();
    },
    components: { Shimmer }
}
</script>