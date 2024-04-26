const path = require("path")
/**
 * 更新配置项的枚举
 */
module.exports = (engines) => {
	engines = engines || require("../engines.js")

	const enumList = engines.map(item => item.id)
	const pkg = require("../package.json")

	const configuration = pkg.contributes.configuration

	configuration.properties = {
		...configuration.properties,
		[`${pkg.id}.searchEngine`]: {
			"type": "string",
			"default": enumList[0],
			"description": "搜索引擎",
			"enum": enumList
		}
	}

	const fs = require("fs")
	fs.writeFileSync(path.resolve(__dirname, "../package.json"), JSON.stringify(pkg, null, 4))
	console.log("updated")
}