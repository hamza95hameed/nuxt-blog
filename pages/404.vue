<template>
	<div class="container">
		<div class="row pt-80">
			<div class="col-lg-6 col-md-12 d-lg-block d-none pr-50">
				<img src="/gallery/images/page-not-found.png" alt="Not found" />
			</div>
			<div class="col-lg-6 col-md-12 pl-50 text-md-center text-lg-left">
				<h1 class="mb-30 font-weight-900 page-404">404</h1>
				<form class="search-form d-lg-flex open-search mb-30" v-on:submit.prevent="searchForm">
					<i class="icon-search"></i>
					<input class="form-control" name="q" v-model="search" type="text" placeholder="Search..." />
				</form>
				<p>
					The link you clicked may be broken or the page may have been removed.<br />
					visit the <nuxt-link :to="{ name: 'index'}">Homepage</nuxt-link>
				</p>
				<div class="form-group">
					<button type="submit" class="button button-contactForm mt-30">
						<nuxt-link class="text-white" :to="{ name: 'index'}">Homepage</nuxt-link>
					</button>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
    export default {
		layout:'layout',
        data() {
            return {
                categories: [],
                users: [],
                queryOptions: {
                    per_page: 20
                },
                search:'',
            }
        },
        methods: {
            searchForm(){
                this.$router.push({ name: 'search', query: { s: this.search } });
                this.search = ''
            },
        }
    }
</script>