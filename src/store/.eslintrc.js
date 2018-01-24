// http://eslint.org/docs/user-guide/configuring

module.exports = {
	root: false,
	rules: {
		// allow modifying the state in mutations
		'no-param-reassign': ['error', {
			'props': true,
			'ignorePropertyModificationsFor': ['state']
		}],
	}
}
