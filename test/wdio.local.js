exports.config = {

    //
    // this config requires running chromedriver on port 9515
    //

	port: 9515,
	path: '/',
    specs: ['./test/e2e/**/*.js'],
    exclude: [],
    maxInstances: 10,

    capabilities: [{
        maxInstances: 1,
        browserName: 'chrome'
    }],

    sync: true,
    logLevel: 'silent',
    coloredLogs: true,
    bail: 5,
    baseUrl: 'http://localhost',
    waitforTimeout: 10000,
    connectionRetryTimeout: 90000,
    connectionRetryCount: 3,
    services: ['static-server'],

	staticServerPort: 4567,
    staticServerFolders: [
    	{ mount: '/node_modules', path: './node_modules' },
    	{ mount: '/examples', path: './examples' },
    	{ mount: '/src', path: './dist' }
    ],

    framework: 'mocha',
    reporters: ['spec'],
    mochaOpts: {ui: 'bdd', timeout: 20000},

	before: function (capabilities, specs) {
    	global.localhost = 'http://localhost:4567/';
	}
}
