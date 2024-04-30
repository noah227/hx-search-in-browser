const hx = require("hbuilderx")
const engines = require("./engines")
const path = require("path")
const fs = require("fs")

const pkg = require("./package.json")
const {execSync} = require("child_process")
/**
 * @returns {{[index: string]: any}[]}
 */
const loadEnginesCustomized = () => {
	const filename = "engines.customized.js"
	const extensionDataDir = path.resolve(hx.env.appData, "extensions", pkg.id) 
	const fsPath = path.resolve(extensionDataDir, filename) 
	if(!fs.existsSync(fsPath)) {
		// hx在点击入口进入的时候，会自动从package.json配置的路径读取文件并创建到配置文件路径
		// 所以不存在访问不到文件的情况
		// console.warn("文件不存在")
		// 只有在本级开发手动拷贝时才需要检测创建
		if(!fs.existsSync(extensionDataDir)) fs.mkdirSync(extensionDataDir)
		fs.writeFileSync(fsPath, fs.readFileSync(path.resolve(__dirname, filename)))
	}
	return require(fsPath)
}

/**
 * 自定义引擎与内置引擎混合数据，引擎ID冲突时，自定义引擎优先级更高
 */
const loadMixedEngines = () => {
	const customizedEngines = loadEnginesCustomized()
	return Object.values([...customizedEngines, ...engines].reduce((data, engine) => {
		if(!data[engine.id]) data[engine.id] = engine
		return data
	}, {}))
}

const getConfiguration = (key, defaultValue) => {
	return hx.workspace.getConfiguration(pkg.id).get(key, defaultValue)
}

const updateConfiguration = (section, value) => {
	hx.workspace.getConfiguration(pkg.id).update(section, value)
}

const getEngine = () => {
	return getConfiguration("searchEngine")
}

const getEngineTemplate = (engineId = null) => {
	engineId = engineId || getEngine()
	const engine = loadMixedEngines().find(item => item.id === engineId)
	const useMobileEngine = getConfiguration("useMobileEngine")
	return useMobileEngine && engine.templateMobile ? engine.templateMobile : engine.template
}

const webviewMap = {}
const openAsInternal = (url) => {
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

const getSelection = () => new Promise((resolve, reject) => {
	hx.window.getActiveTextEditor().then(editor => {
		const selection = editor.selection
		const text = editor.document.getText(selection)
		text ? resolve(text) : reject("no selection")
	}).catch(e => reject(e))
})

const openUrl = (url) => {
	if(getConfiguration("z_execution")) {
		const cmd = getConfiguration("z_executionCmd", "").trim()
		const cwd = getConfiguration("z_executionCwd", "").trim()
		if(cmd) {
			execSync(cmd.replace("%url", url), {cwd: path.resolve(cwd)})
			return
		}
	}
	if (getConfiguration("useInternalBrowser")) {
		openAsInternal(url)
	} else {
		hx.env.openExternal(url)
	}
}

const search = (engineId = null, text=null) => {
	const action = (text) => {
		const template = getEngineTemplate(engineId)
		const url = template.replace("%s", text)
		// console.log(url, "<<<")
		openUrl(url)
		// hx.commands.executeCommand("workbench.action.togglePreviewBrowserVisibility", "https://www.baidu.com")
		// console.log(engine, template, url, "<<<")
		// rightSide浏览器的问题：宽度没法定，无法正确响应鼠标侧键事件
	}
	if(text) action(text)
	else {
		getSelection().then(text => {
			action(text)
		}).catch((e) => {
			console.error(e)
		})
	}
}
module.exports = {
	search,
	searchQuickPick() {
		getSelection().then(text => {
			hx.window.showQuickPick(loadMixedEngines().map(engine => {
				const url = getEngineTemplate(engine.id).replace("%s", text)
				return {
					id: engine.id,
					label: engine.id,
					description: url,
					url
				}
			})).then(item => {
				openUrl(item.url)
			})
		})
	},
	searchWithInput(){
		hx.window.showInputBox({prompt: "浏览器搜索", placeHolder: "请输入搜索内容"}).then(result => {
			const text = result.trim()
			if(text) search(null, text)
		})
	},
	/**
	 * 更新引擎（contextmenu）
	 * 插件更新后会覆盖现有package.json，需要重新执行
	 */
	updateEngines(){
		const engines = loadMixedEngines()
		const builder = require("./builder/index")
		builder(["updateEngines", "updateEnums"], {
			updateEngines: engines,
			updateEnums: engines
		})
		// 更新插件配置，如果选择的自定以引擎被删除了，则恢复为内置引擎列表中的某一项
		// package.json有default存在，所以不需要这个
		// const selectedEngine = getEngine()
		// if(!engines.find(item => item.id === selectedEngine)) {
		// 	updateConfiguration("searchEngine", engines[0].id)
		// }
		hx.window.showInformationMessage("已更新引擎配置，重启IDE后生效", ["重启", "关闭"]).then(button => {
			if(button === "重启") {
				const appRoot = hx.env.appRoot
				execSync("cli app quit", {cwd: appRoot})
				execSync("cli open", {cwd: appRoot})
			}
		})
	}
}