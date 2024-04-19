const hx = require("hbuilderx")
const engines = require("./engines")

const getConfiguration = (key, defaultValue) => {
	return hx.workspace.getConfiguration("hx-search-in-browser").get(key, defaultValue)
}

const getEngine = () => {
	return getConfiguration("searchEngine")
}

const getEngineTemplate = (engineId=null) => {
	const customizedEngine = getConfiguration("useCustomizedEngine").trim()
	if (customizedEngine) return customizedEngine

	engineId = engineId || getEngine()
	const engine = engines.find(item => item.id === engineId)
	const useMobileEngine = getConfiguration("useMobileEngine")
	return useMobileEngine && engine.templateMobile ? engine.templateMobile : engine.template
}

const webviewMap = {}
const openAsInternal = (url) => {
	const pkg = require("./package.json")
	const viewId = pkg.id
	let webview = webviewMap[viewId]
	if (!webview) {
		let webviewPanel = hx.window.createWebView(viewId, {
			size: {
				width: "520px"
			},
			enableScripts: true
		});
		webview = webviewPanel.webView;
		webviewMap[viewId] = webview
		webviewPanel.onDidDispose(() => {
			console.log(">>>>>>已关闭")
		})
	}
	webview.html = `
		<script>location.href="${url}"</script>
	`
	hx.window.showView({
		viewId,
		containerId: `${pkg.id}--container`
	})
}
module.exports = (engineId=null) => {
	hx.window.getActiveTextEditor().then(editor => {
		const selection = editor.selection
		const text = editor.document.getText(selection)
		const template = getEngineTemplate(engineId)
		const url = template.replace("%s", text)
		// console.log(url, "<<<")
		if (getConfiguration("useInternalBrowser")) {
			openAsInternal(url)
		} else {
			hx.env.openExternal(url)
		}
		// hx.commands.executeCommand("workbench.action.togglePreviewBrowserVisibility", "https://www.baidu.com")
		// console.log(engine, template, url, "<<<")
		// rightSide浏览器的问题：宽度没法定，无法正确响应鼠标侧键事件
	})
}