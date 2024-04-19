const engines = require("./engines")

const pkg = require("./package.json")

const defaultCommands = [
	{
	    "command": "extension.search",
	    "title": "浏览器搜索"
	}
]
const defaultMenus = [
	{
	    "command": "extension.search",
	    "group": "assist",
	    "when": "editorTextFocus && editorHasSelection"
	},
	{
	    "id": "extension.search.entries",
		"title": "浏览器搜索",
	    "group": "assist",
	    "when": "editorTextFocus && editorHasSelection"
	}
]

const commands = [...defaultCommands]
const contextMenus = [...defaultMenus]

engines.forEach(({id, title}, index) => {
	const command = `extension.search_with_${id}`
	commands.push({command, title: `${title}(&${index + 1})`})
	contextMenus.push({command, group: `extension.search.entries@${index + 1}`, when: "editorTextFocus && editorHasSelection"})
})
contextMenus.push({
	"group": "z_commands"
})

pkg.contributes.commands = commands
pkg.contributes.menus["editor/context"] = contextMenus

const fs = require("fs")
fs.writeFileSync("./package.json", JSON.stringify(pkg, null, 4))
console.log("menus updated")



