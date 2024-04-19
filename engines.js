/**
 * @type {{template: string, templateMobile?: string, title: string, id: string}[]}
 */
module.exports = [
	{
		template: "https://www.baidu.com/s?wd=%s",
		templateMobile: "https://m.baidu.com/s?wd=%s",
		title: "百度",
		id: "Baidu"
	},
	{
		template: "https://www.sogou.com/web?query=%s",
		templateMobile: "https://m.sogou.com/web/searchList.jsp?keyword=%s",
		title: "搜狗",
		id: "Sogou"
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
	},
	{
		template: "https://www.so.com/s?q=%s",
		title: "360",
		id: "360"
	},
	{
		template: "https://zzk.cnblogs.com/s?w=%s",
		title: "cnblogs",
		id: "cnblogs"
	},
	{
		template: "https://so.csdn.net/so/search?q=%s",
		title: "csdn",
		id: "csdn"
	},
	{
		template: "https://github.com/search?q=vuejs",
		title: "github",
		id: "github"
	},
	{
		template: "https://stackoverflow.com/search?q=%s",
		title: "stackoverflow",
		id: "stackoverflow"
	},
]