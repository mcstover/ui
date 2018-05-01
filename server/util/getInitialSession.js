const fetch = require('isomorphic-fetch');
const https = require('https');

module.exports = function getInitialSession(url) {
	return new Promise((resolve, reject) => {
		fetch(url, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				query: '{ hello }'
			}),
			agent: new https.Agent({
				// fix request blocked b/c of self-signed certificate on dev-vm. TODO: maybe do a prod check?
				rejectUnauthorized: false
			})
		})
			.then(result => {
				const resHeaders = result.headers;
				let kvCookieValue = null;
				if (resHeaders.has('set-cookie')) {
					// process for extracting value
					const kvCookie = resHeaders.get('set-cookie').trim().replace('kv=', '').split(';');
					[kvCookieValue] = kvCookie;
					// we could also send it intact
					// kvCookieValue = resHeaders.get('set-cookie');
					console.log(`Retrieved kv cookie: ${kvCookieValue}`);
				}
				resolve(kvCookieValue);
			})
			.catch(err => reject(err));
	});
};
