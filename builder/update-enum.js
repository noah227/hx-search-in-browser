const path = require("path")

const pkgPath = path.resolve(__dirname, "../package.json")
/**
 * 更新配置项的枚举
 */
module.exports = (engines) => {
	engines = engines || require("../engines.js")

	const enumList = engines.map(item => item.id)
	const pkg = require(pkgPath)

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
	fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 4))
	console.log("updated")
}