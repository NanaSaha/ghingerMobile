
// // https://www.npmjs.com/package/uglify-es

// module.exports = {

//   /**
//    * mangle: uglify 2's mangle option
//    */
//   mangle: true,

//   /**
//    * compress: uglify 2's compress option
//    */
//   compress: {
//     toplevel: true,
//     pure_getters: true
//   }
// };

let defaultConfig = require('@ionic/app-scripts/config/uglifyjs.config');

module.exports = Object.assign({}, defaultConfig, {
	compress: Object.assign({}, defaultConfig.compress, {
		drop_console: true,
		drop_debugger: true
	})
});