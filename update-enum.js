const engines = require("./engines")

const enumList = engines.map(item => item.id)
const pkg = require("./package.json")

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
fs.writeFileSync("./package.json", JSON.stringify(pkg, null, 4))
console.log("updated")



