<template>
    <div>
        <introduction></introduction>
        <div class="container">
            <feature-post></feature-post>
            <home-page-category></home-page-category>
            <site-bottom></site-bottom>
            <home-page-categories></home-page-categories>
        </div>   
    </div> 
</template>
<script>
import FeaturePost from './FeaturePost.vue'
import HomePageCategories from './HomePageCategories.vue'
import SiteBottom from './SiteBottom.vue'
import HomePageCategory from './HomePageCategory.vue'
import Introduction from './Introduction.vue'

export default {
	components: { 
        Introduction,
        FeaturePost,
        HomePageCategories,
        HomePageCategory,
        SiteBottom
    }
}
</script>