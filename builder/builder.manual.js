const inquirer = require("inquirer")

;(async() => {
	const { actions } = await inquirer.prompt([{
		name: 'actions',
		type: 'checkbox',
		message: `选择要执行的操作`,
		choices: [
			{ name: '更新引擎', value: 'updateEngines' },
			{ name: '更新配置项枚举', value: 'updateEnums' },
			{ name: '输出引擎ID列表', value: 'outputEngineIdList' },
		]
	}])
	require("./index.js")(actions)
})()