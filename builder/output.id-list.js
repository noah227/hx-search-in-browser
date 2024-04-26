module.exports = () => {
	const engines = require("../engines.js")
	console.log(engines.map(({id}) => id).join(" | "))
}