var hx = require("hbuilderx");

const main = require("./main")

const engines = require("./engines")
//该方法将在插件激活的时候调用
function activate(context) {
	//订阅销毁钩子，插件禁用的时候，自动注销该command。
	context.subscriptions.push(
		hx.commands.registerCommand('extension.search', () => {
			main.search()
		})
	)
	context.subscriptions.push(
		hx.commands.registerCommand('extension.updateEngines', () => {
			main.updateEngines()
		})
	)
	context.subscriptions.push(
		hx.commands.registerCommand("extension.search_quick_pick", () => {
			main.searchQuickPick()
		})
	)
	context.subscriptions.push(
		hx.commands.registerCommand("extension.search_with_input", () => {
			main.searchWithInput()
		})
	)
	context.subscriptions.push(
		hx.commands.registerCommand("extension.search_with_*", () => {
			console.log(9999)
			main.searchWithInput()
		})
	)
	engines.forEach(({id, title}) => {
		context.subscriptions.push(
			hx.commands.registerCommand(`extension.search_with_${id}`, () => {
				main.search(id)
			})
		)
	})
}
//该方法将在插件禁用的时候调用（目前是在插件卸载的时候触发）
function deactivate() {

}
module.exports = {
	activate,
	deactivate
}
