const cozip = require("cozip")

const pack = () => {
    cozip(`${require("./package.json").id}.zip`, [
        ["./engines.js"],
        ["./extension.js"],
        ["./main.js"],
        ["./package.json"]
    ])
}

pack()
