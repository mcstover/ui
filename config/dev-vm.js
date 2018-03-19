var merge = require('webpack-merge')
var base = require('./index.js')

module.exports = merge(base, {
	server: {
		cdnDomain: 'dev-vm-01.kiva.org',
		graphqlUri: 'https://dev-vm-01.kiva.org/ajax/graphql',
		memcachedServers: ['localhost'],
	},
	client: {
		gtmInclude: `
			<!-- Google Tag Manager -->
			<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-NGF9TX8');</script>
			<!-- End Google Tag Manager -->`,
		gtmNoScript: `
			<!-- Google Tag Manager (noscript) -->
			<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-NGF9TX8"
			height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
			<!-- End Google Tag Manager (noscript) -->`,
	},
})
