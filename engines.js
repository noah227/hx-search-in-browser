/**
 * @type {{template: string, templateMobile?: string, title: string, id: string, disabled?: boolean}[]}
 */
module.exports = [
	{
		template: "https://www.baidu.com/s?wd=%s",
		templateMobile: "https://m.baidu.com/s?wd=%s",
		title: "百度",
		id: "Baidu"
	}, 
	{
		template: "https://www.bing.com/search?q=%s", 
		title: "Bing",
		id: "Bing"
	},
	{
		template: "https://www.google.com/search?q=%s",
		title: "Google",
		id: "Google"
	}
]