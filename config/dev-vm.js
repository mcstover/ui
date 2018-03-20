var merge = require('webpack-merge')
var base = require('./index.js')
var templateIncludes = require('../server/util/build3rdPartyScripts.js')

module.exports = merge(base, {
	server: {
		cdnDomain: 'dev-vm-01.kiva.org',
		graphqlUri: 'https://dev-vm-01.kiva.org/ajax/graphql',
		memcachedServers: ['localhost'],
	},
	/*
	 * 3rd Party Provided Scripts ONLY
	 * Add these to the appropriate place in the index.template.html file
	 */
	templateIncludes: {
		gtmInclude: templateIncludes.buildGTMInclude('GTM-NGF9TX8'),
		gtmNoScript: templateIncludes.buildGTMNoScript('GTM-NGF9TX8'),
	},
})
