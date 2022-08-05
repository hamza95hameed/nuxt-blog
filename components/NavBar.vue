<template>
    <div>
        <header class="main-header header-style-1 font-heading">
            <div class="header-top">
                <div class="container">
                    <div class="row pt-20 pb-20">
                        <div class="col-md-3 col-6">
                            <nuxt-link :to="{ name: 'index'}"> <img class="logo" src="/imgs/general/logo.png" alt="Newsparho"></nuxt-link>
                        </div>
                        <div class="col-md-9 col-6 text-right header-top-right">
                            <button class="search-icon d-inline" @click="openSearch()">
                                <span class="mr-15 text-muted font-small">
                                    <i class="elegant-icon icon_search mr-5"></i>
                                Search</span>
                            </button>                            
                        </div>
                    </div>
                </div>
            </div>
            <div class="header-sticky">
                <div class="container align-self-center">
                    <div class="mobile_menu d-lg-none d-block"></div>
                    <div class="main-nav d-none d-lg-block float-left">
                        <nav>
                            <ul class="main-menu d-none d-lg-inline font-small">
                                <li :class="this.$route.path == '/' ? 'current-menu-item' :'' ">
                                    <nuxt-link :to="{ name: 'index'}">
                                        <i class="elegant-icon icon_house_alt mr-5"></i> Home
                                    </nuxt-link>
                                </li>
                                <li :class="this.$route.path == '/category/automobiles' ? 'current-menu-item' :'' ">
                                    <nuxt-link :to="{ name: 'category-slug', params: { slug: 'automobiles' }}">
                                        Automobiles
                                    </nuxt-link>
                                </li>
                                <li :class="this.$route.path == '/category/entertainment' ? 'current-menu-item' :'' ">
                                    <nuxt-link :to="{ name: 'category-slug', params: { slug: 'entertainment' }}">
                                        Entertainment
                                    </nuxt-link>
                                </li>
                                <li :class="this.$route.path == '/category/food' ? 'current-menu-item' :'' ">
                                    <nuxt-link :to="{ name: 'category-slug', params: { slug: 'food' }}">
                                       Food
                                    </nuxt-link>
                                </li>
                                <li :class="this.$route.path == '/category/games' ? 'current-menu-item' :'' ">
                                    <nuxt-link :to="{ name: 'category-slug', params: { slug: 'games' }}">
                                       Games
                                    </nuxt-link>
                                </li>
                                <li :class="this.$route.path == '/category/sports' ? 'current-menu-item' :'' ">
                                    <nuxt-link :to="{ name: 'category-slug', params: { slug: 'sports' }}">
                                       Sports
                                    </nuxt-link>
                                </li>
                                <li :class="this.$route.path == '/category/travel' ? 'current-menu-item' :'' ">
                                    <nuxt-link :to="{ name: 'category-slug', params: { slug: 'travel' }}">
                                       Travel
                                    </nuxt-link>
                                </li>
                                <li :class="this.$route.path == '/bookmark' ? 'current-menu-item' :'' ">
                                    <nuxt-link :to="{ name: 'bookmark'}">
                                        Bookmark
                                    </nuxt-link>
                                </li>
                                <li :class="this.$route.path == '/contact' ? 'current-menu-item' :'' ">
                                    <nuxt-link :to="{ name: 'contact'}">
                                        Contact
                                    </nuxt-link>
                                </li>
                            </ul>
                            <ul class="d-block d-lg-none text-muted" id="mobile-menu" data-label="Menu">
                                <li class=" menu-item-has-children    current-menu-item ">
                                    <nuxt-link :to="{ name: 'index'}">
                                        <i class="elegant-icon icon_house_alt mr-5"></i> Home
                                    </nuxt-link>
                                </li>
                                <li>
                                    <nuxt-link :to="{ name: 'category-slug', params: { slug: 'automobiles' }}">
                                        Automobiles
                                    </nuxt-link>
                                </li>
                                <li>
                                    <nuxt-link :to="{ name: 'category-slug', params: { slug: 'entertainment' }}">
                                        Entertainment
                                    </nuxt-link>
                                </li>
                                <li>
                                    <nuxt-link :to="{ name: 'category-slug', params: { slug: 'food' }}">
                                       Food
                                    </nuxt-link>
                                </li>
                                <li>
                                    <nuxt-link :to="{ name: 'category-slug', params: { slug: 'games' }}">
                                       Games
                                    </nuxt-link>
                                </li>
                                <li>
                                    <nuxt-link :to="{ name: 'category-slug', params: { slug: 'sports' }}">
                                       Sports
                                    </nuxt-link>
                                </li>
                                <li>
                                    <nuxt-link :to="{ name: 'category-slug', params: { slug: 'travel' }}">
                                       Travel
                                    </nuxt-link>
                                </li>
                                <li>
                                    <nuxt-link :to="{ name: 'bookmark'}">
                                        Bookmark
                                    </nuxt-link>
                                </li>
                                <li>
                                    <nuxt-link :to="{ name: 'contact'}">
                                        Contact
                                    </nuxt-link>
                                </li>
                            </ul>
                        </nav>
                    </div>
                    <div class="float-right header-tools text-muted font-small">
                        <ul class="header-social-network d-inline-block list-inline mr-15">
                            <li class="list-inline-item">
                                <a class="social-icon text-xs-center" style="background: #3b5999" href="https://facebook.com/newsparho73" target="_blank" title="Facebook">
                                    <i class="elegant-icon social_facebook"></i>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div class="clearfix"></div>
                </div>
            </div>
        </header>
        <div class="main-search-form">
            <div class="container">
                <div class="pt-50 pb-50 ">
                    <div class="row mb-20">
                        <div class="col-12 align-self-center main-search-form-cover m-auto">
                            <p class="text-center"><span class="search-text-bg">Search</span></p>
                            <form class="search-header" v-on:submit.prevent="searchForm">
                                <div class="input-group w-100">
                                    <input type="text" name="q" v-model="search" class="form-control" placeholder="Search posts, authors, tags and categories">
                                    <div class="input-group-append">
                                        <button class="btn btn-search bg-white" type="submit">
                                            <i class="elegant-icon icon_search"></i>
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'NavBar',
        data() {
            return {
                categories: [],
                users: [],
                queryOptions: {
                    per_page: 20
                },
                search:'',
                open:false
            }
        },
        methods: {
            searchForm(){
                this.open = !this.open
                this.$router.push({ name: 'search', query: { s: this.search } });
                this.search = ''
            },
            openSearch(){
                this.open = !this.open
            }
        },
        head () {
            return {
                bodyAttrs: {
                    class: this.open ? 'open-search-form' : ''
                }
            }
        },
    }
</script>
