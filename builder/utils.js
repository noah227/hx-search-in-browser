const fs = require("fs")
const path = require("path")

const defaultLogPath = path.resolve(__dirname, "./builder.log")
module.exports = {
	logMessage(message, filePath=defaultLogPath){
		fs.appendFileSync(filePath, `${new Date().toLocaleString()}: ${message}\n`, {encoding: "utf8"})
	}
}

