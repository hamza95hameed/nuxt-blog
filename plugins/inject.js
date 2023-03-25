const common = {
    name: 'Common',
    getTag(post) {
        if (post._embedded['wp:term']) {
            return post._embedded['wp:term'][1]
        }
    }, 
    getThumbnail(post) {
        if (post._embedded['wp:featuredmedia']!= null) {
            return post._embedded['wp:featuredmedia'][0].media_details.sizes.full.source_url
        }
    },
    readingTime(post) {
        if(post.content.rendered){
            this.content = post.content.rendered;
        }
        this.word_count = this.content.match(/(\w+)/g).length;
        this.readingtime = Math.ceil(this.word_count / 200);
        if (this.readingtime == 1) {
            this.timer = " minute read";
        } else {
            this.timer = " minutes read";
        }
        this.totalreadingtime = this.readingtime + this.timer;
        return this.totalreadingtime;
    },
    getCategory(post) {
        if (post._embedded['wp:term']) {
            return post._embedded['wp:term'][0][0].name
        }
    },
    getAuthor(post) {
        if (post._embedded['author'][0].name) {
            return post._embedded['author'][0].name
        }
    },
    hasThumbnail(post) {
        if (
            post._embedded['wp:featuredmedia'] &&
            post._embedded['wp:featuredmedia'][0].media_details &&
            post._embedded['wp:featuredmedia'][0].media_details.sizes
        ) {
            return post._embedded['wp:featuredmedia'][0].media_details.sizes.full
        }
    },
    bookmark(post){
        let postIDs = localStorage.bookmark == undefined ? []: JSON.parse(localStorage.bookmark);
        if(postIDs.indexOf(post.id) === -1){
            postIDs[postIDs.length] = post.id;
            localStorage.setItem("bookmark" , JSON.stringify(postIDs))
        }
        else{
            let index = postIDs.indexOf(post.id);
            if (index > -1) {
                postIDs.splice(index, 1);
            }
            localStorage.setItem("bookmark" , JSON.stringify(postIDs))
        }
    },
    getAuthorImage(post) {
        if (post._embedded['author'][0].avatar_urls) {
            return post._embedded['author'][0].avatar_urls[96]
        }
    },
    getAuthorSlug(post) {
        if (post._embedded['author'][0].slug) {
            return post._embedded['author'][0].slug
        }
    },
    getAuthorDesc(post) {
        if (post._embedded['author'][0].description) {
            return post._embedded['author'][0].description
        }
    },
}


export default ({ app }, inject) => {
    // Inject $hello(msg) in Vue, context and store.
    inject('hello', msg => console.log(`Hello ${msg}!`))
    inject('common', common)
}