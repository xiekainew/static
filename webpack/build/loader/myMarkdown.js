const loaderUtils = require("loader-utils");
module.exports = function(markdown) {
	const options = loaderUtils.getOptions(this);
	return markdown
}