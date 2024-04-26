const updateEngines = require("./update-editor-menus")
const updateEnums = require("./update-enum")
const outputEngineIdList = require("./output.id-list")

/**
 * @param {Array<"updateEngines" | "updateEnums" | "outputEngineIdList">} actionList
 * @param {{updateEngines?: any[], updateEnums?: any[]}} dataMap
 */
module.exports = (actionList=[], dataMap={}) => {
	actionList.includes("updateEngines") && updateEngines(dataMap["updateEngines"])
	actionList.includes("updateEnums") && updateEnums(dataMap["updateEnums"])
	actionList.includes("outputEngineIdList") && outputEngineIdList()
}