const cozip = require("cozip")

const pack = () => {
    cozip(`${require("./package.json").id}.zip`, [
		["./builder", true],
        ["./engines.js"],
        ["./engines.customized.js"],
        ["./extension.js"],
        ["./main.js"],
        ["./package.json"]
    ])
}

pack()
