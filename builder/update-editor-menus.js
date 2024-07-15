const path = require("path")

const pkgPath = path.resolve(__dirname, "../package.json")
const pkg = require(pkgPath)
const {logMessage} = require("./utils.js")

const defaultCommands = [
	{
	    "command": "extension.search_with_default",
	    "title": "浏览器搜索"
	},
	{
	    "command": "extension.search_quick_pick",
	    "title": "浏览器搜索（Quick Pick）"
	},
	{
	    "command": "extension.search_with_input",
	    "title": "浏览器搜索（输入）"
	}
]
const defaultMenus = [
	{
	    "command": "extension.search_with_default",
	    "group": "assist",
	    "when": "editorTextFocus && editorHasSelection"
	},
	{
	    "id": "extension.search.entries",
		"title": "浏览器搜索++",
	    "group": "assist",
	    "when": "editorTextFocus"
	}
]


/**
 * 更新contextmenus
 */
module.exports = (engines) => {
	engines = engines || require("../engines.js")
	
	const commands = [...defaultCommands]
	const contextMenus = [...defaultMenus]
	
	const charList = new Array(26).fill("").map((_, index) => String.fromCharCode(index + 65))
	engines.forEach(({id, title}, index) => {
		const command = `extension.search_with_${id}`
		if(index < charList.length) title += `(&${charList[index]})`
		commands.push({command, title})
		contextMenus.push({command, group: `extension.search.entries@${index + 1}`, when: "editorTextFocus && editorHasSelection"})
	})
	commands.push({
		"command": "extension.updateEngines",
		"title": "更新引擎"
	})
	
	contextMenus.push(
		{
		    "command": "extension.updateEngines",
		    "group": `extension.search.entries@${engines.length || 1}`,
		    "when": "editorTextFocus"
		},
		{
			"group": "z_commands"
		}
	)
	
	pkg.contributes.commands = commands
	pkg.contributes.menus["editor/context"] = contextMenus
	pkg.enginesUpdatedAt = new Date().toLocaleString()
	console.log(pkg.contributes.commands)
	const fs = require("fs")
	fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 4))
	console.log("menus updated")
	logMessage("已更新右键菜单信息")
}

