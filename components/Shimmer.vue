<template>
    <div>
        <div v-if="type == 'list'">
            <div class="row mb-40 list-style-2" v-for='index in loop' :key='index'>
                <div class="col-md-4">
                    <div class="post-thumb position-relative border-radius-5">
                        <div class="img-hover-slide border-radius-5 position-relative shimmer"></div>                                                 
                    </div>
                </div> 
                <div class="col-md-8 align-self-center">
                    <div class="post-content">
                        <div class="entry-meta meta-0 font-small mb-10">
                            <span class="text-warning shimmer w-25" id="category"></span>
                        </div> 
                        <h5 class="post-title font-weight-900 shimmer w-100" id="desc"></h5> 
                        <h5 class="post-title font-weight-900 mb-20 shimmer w-75" id="desc"></h5> 
                        <div class="entry-meta meta-1 float-left font-x-small text-uppercase">
                            <span class="post-on shimmer" id="tag"></span> 
                            <span class="time-reading shimmer" id="tag"></span> 
                            <span class="post-by shimmer" id="tag"></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="type == 'grid'" class="row">
            <article class="col-lg-4 col-md-6 mb-30" v-for='index in loop' :key='index'>
            <div class="post-card-1 border-radius-10 hover-up">
                <div class="post-thumb thumb-overlay-shimmer img-hover-slide position-relative shimmer">                                
                    <span class="top-left-icon shimmer"></span> 
                </div> 
                <div class="post-content p-30">
                    <div class="mb-20">
                        <span class="shimmer w-25" id="category"></span>
                    </div> 
                    <div class="post-card-content">
                        <h5 class="mb-0 shimmer" id="desc"></h5> 
                        <h5 class="mb-20 shimmer w-75" id="desc"></h5> 
                        <div class="entry-meta meta-1 float-left font-x-small text-uppercase">
                            <span class="post-on shimmer" id="tag"></span> 
                            <span class="time-reading shimmer" id="tag"></span> 
                            <span class="post-by shimmer" id="tag"></span>
                        </div>
                    </div>
                </div>
            </div>            
            </article>
        </div>
        <div v-if="type == 'test'">
            <div class="d-flex bg-white has-border p-25 hover-up transition-normal border-radius-5" v-for='index in loop' :key='index'>
                <div class="post-content media-body">
                    <h6 class="post-title mb-15 text-limit-2-row font-medium shimmer" id="desc"></h6>
                    <div class="entry-meta meta-1 float-left font-x-small text-uppercase">
                        <span class="post-on shimmer" id="tag"></span>
                        <span class="post-by shimmer" id="tag"></span>
                    </div>
                </div>
                <div class="post-thumb post-thumb-80 d-flex ml-15 border-radius-5 img-hover-scale overflow-hidden shimmer">
                    <img  width="90" height="90"/>
                </div>
            </div>
        </div>
        <div v-if="type == 'instafeed'">
            <ul class="insta-feed">
                <li v-for='index in loop' :key='index'>
                    <img class="border-radius-5 shimmer" width="90" height="90">
                </li>
            </ul>
        </div>
        <div v-if="type == 'lastestPost'">
            <div class="post-block-list post-module-1" v-for='index in loop' :key='index'>
                <ul class="list-post">
                    <li class="mb-30">
                        <div class="d-flex hover-up-2 transition-normal">
                            <div class="post-thumb post-thumb-80 d-flex mr-15 border-radius-5 img-hover-scale overflow-hidden shimmer">
                                    <img width="90" height="90">
                            </div>
                            <div class="post-content media-body">
                                <h6 class="post-title mb-15 text-limit-2-row font-medium shimmer" id="desc"></h6>
                                <div class="entry-meta meta-1 float-left font-x-small text-uppercase">
                                    <span class="post-on shimmer" id="tag"></span>
                                    <span class="post-by shimmer" id="tag"></span>
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div v-if="type == 'categories'" class="d-flex justify-content-between">
            <div class="w-100" v-for='index in loop' :key='index'>
                <div class="carausel-3-columns-item d-flex bg-grey has-border p-25 hover-up-2 transition-normal border-radius-5">
                    <div class="post-thumb post-thumb-64 d-flex mr-15 border-radius-5 img-hover-scale overflow-hidden shimmer">
                        <img />
                    </div>
                    <div class="post-content media-body">
                        <h6 class="shimmer" id="desc"> </h6>
                        <p class="text-muted font-small shimmer"></p>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>
<script>
export default {
    props: ["loop", "type"],
}
</script>
<style scoped>
    .shimmer {
        animation: shimmer 3s;
        animation-iteration-count: infinite;
        background: linear-gradient(to right, #e6e6e6 5%, #cccccc 25%, #e6e6e6 35%);
        background-size: 1000px 100%;
        animation-duration: 1s;
        animation-fill-mode: forwards;  
        animation-iteration-count: infinite;
        animation-name: shimmer;
        animation-timing-function: ease-in-out;
    }

    @keyframes shimmer {
        0% {
            background-position: -400px 0;
        }
        100% {
            background-position: 400px 0; 
        }
    }
    .line{  
        width: 100%;
        height: 10px;
    }

    #category{
        display: block;
        height: 10px;
    }
    #desc{
        display: block;
        height: 20px;
    }

    #tag{
        width: 60px;
        display: inline-block;
        height: 10px;
    }
    .thumb-overlay-shimmer{
        border-radius: 10px 10px 0 0;
        min-height: 200px;
    } 
</style>