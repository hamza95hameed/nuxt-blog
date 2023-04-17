import getSiteMeta from "./utils/getSiteMeta";

const meta = getSiteMeta();
export default {
	// Global page headers: https://go.nuxtjs.dev/config-head
	ssr: true,
	head: {
		title: 'News Parho | Tech, Business, Travel and Life | Trending Topics',
		htmlAttrs: {
			lang: 'en'
		},
		meta: [
			...meta,
			{ charset: "utf-8" },
			{ name: "HandheldFriendly", content: "True" },
			{ name: "viewport", content: "width=device-width, initial-scale=1" },
			{ property: "og:site_name", content: "News Parho" },
			{
				hid: "description",
				name: "description",
				content: "Welcome to News Parho, the number one source for all trending and latest news related to Tech, Business, Travel, and Life.",
			},
			{ property: "og:image:width", content: "740" },
			{ property: "og:image:height", content: "300" },
			{ name: "twitter:site", content: "@bobross" },
			{ name: "twitter:card", content: "summary_large_image" },
		],
		link: [
			{ rel: "icon", type: "image/svg+xml", href: "/imgs/general/favicon.png" },
			{
				hid: "canonical",
				rel: "canonical",
				href: 'https://newsparho.vercel.app/',
			},
			{ rel: 'icon', type: 'image/x-icon',   href: '/imgs/general/favicon.png' },
			{ rel: 'stylesheet', type: 'text/css', href: '/css/style.css' },
			{ rel: 'stylesheet', type: 'text/css', href: '/css/widgets.css' },
			{ rel: 'stylesheet', type: 'text/css', href: '/css/responsive.css' },
			{ rel: 'stylesheet', type: 'text/css', href: '/css/custom.css' },
			{ rel: 'stylesheet', type: 'text/css', href: '/contact/css/contact-public.css' }
		],

		script: [
            // ...
            {
                hid: 'tawk.to',
                src:
                    'https://embed.tawk.to/63be6a53c2f1ac1e202cd30a/1gmfsulra',
                defer: true
            }
        ]
	},


	// Global CSS: https://go.nuxtjs.dev/config-css
	css: [

	],

	// Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
	plugins: [
		'~/plugins/inject.js'
	],

	// Auto import components: https://go.nuxtjs.dev/config-components
	components: true,

	// Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
	buildModules: [
		'@nuxt/image',
		'nuxt-compress'
	],

	// Build Configuration: https://go.nuxtjs.dev/config-build
	build: {
	},
	
	axios: {
		baseURL: 'https://www.newsparho.com/wp-json/wp/v2', // Used as fallback if no runtime config is provided
	},

	// Modules: https://go.nuxtjs.dev/config-modules
	modules: [
		'@nuxtjs/axios',
		'vue-social-sharing/nuxt',
		'nuxt-moment',
		'@nuxt/image',
	],
	generate: {
		dir: 'public'	
	},
	env: {
		googleAnalyticsId: process.env.GOOGLE_ANALYTICS_ID
	}
}
