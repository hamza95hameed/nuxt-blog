<template>
    <div>
        <div class="site-bottom pt-50 pb-50">
            <div class="container">
                <div class="sidebar-widget widget-latest-posts mb-30 mt-20 wow fadeInUp animated">
                    <div class="widget-header-2 position-relative mb-30">
                        <h5 class="mt-5 mb-30">Categories</h5>
                    </div>
                    <Shimmer v-if="loading" :loop="3" :type="'categories'"></Shimmer>
                    <slick ref="slick" :options="slickOptions" v-if="categories.length > 0">
                        <div class="carausel-3-columns" v-for="category in categories" :key="category.id" v-show="category.name != 'Uncategorized'">
                            <div class="carausel-3-columns-item d-flex bg-grey has-border p-25 hover-up-2 transition-normal border-radius-5">
                                <div class="post-thumb post-thumb-64 d-flex mr-15 border-radius-5 img-hover-scale overflow-hidden">
                                    <nuxt-link class="color-white" :to="{ name: 'category-slug', params: { slug: category.slug } }">
                                        <img src="https://via.placeholder.com/350x350" :alt="category.name">
                                    </nuxt-link>

                                </div>
                                <div class="post-content media-body">
                                    <h6> <nuxt-link :to="{ name: 'category-slug', params: { slug: category.slug } }">{{category.name}}</nuxt-link> </h6>
                                    <p class="text-muted font-small" v-html="category.description.slice(0,15)"></p>
                                </div>
                            </div>
                        </div>
                    </slick>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Slick from 'vue-slick'
import Shimmer from '@/components/Shimmer.vue'

export default {
    components: { 
        Slick, 
        Shimmer
    },
    data() {
        return {
			categories: [],
            queryOptions: {
				per_page: 100, 
				page: 1,
				_embed: true
			},
            loading: true,
            slickOptions: {
                dots: false,
                infinite: true,
                autoplay: true,
                arrows : false,                    
                draggable:true,
                autoplaySpeed: 5000,
                slidesToShow: 3,
                slidesToScroll: 1,
                responsive: [
                    {
                    breakpoint: 1024,
                        settings: {
                            slidesToShow: 3,
                            slidesToScroll: 1,
                            infinite: true,
                            dots: true
                        }
                    },
                    {
                    breakpoint: 600,
                        settings: {
                            slidesToShow: 2,
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
		}
	},
    methods:{
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
        }
    },
    async mounted() {
		let categories  = await this.$axios.get('/categories',{ params: this.queryOptions })
        this.categories = categories.data;
        this.loading = false
	}
}
</script>
