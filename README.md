# 浏览器搜索


## 使用

> 主要有三种方式使用

<details open>
<summary>1. 右键</summary>
	
选中文本 > 右键 > 浏览器搜索

> 使用效果

![](https://mp-77dc03ae-7084-429e-8b0f-4d540ae4a430.cdn.bspapp.com/images/hx-search-in-browser/hx-search-in-browser-1.jpg)

</details>

<details>
<summary>2. 快捷键方式一</summary>
	
**默认未配置**，如果需要使用这个模式，可以到`工具 > 自定义快捷键`手动进行配置

> 示例配置（配置command为`extension.search_quick_pick`）

![](https://mp-77dc03ae-7084-429e-8b0f-4d540ae4a430.cdn.bspapp.com/images/hx-search-in-browser/hx-search-in-browser-2.jpg)

> 使用效果

![](https://mp-77dc03ae-7084-429e-8b0f-4d540ae4a430.cdn.bspapp.com/images/hx-search-in-browser/hx-search-in-browser-3.gif)
	
</details>


<details>
<summary>3. 快捷方式二</summary>
	
**默认未配置**，如果需要使用这个模式，可以到`工具 > 自定义快捷键`手动进行配置

> 配置command为`extension.search_with_input`

> 使用效果

![](https://mp-77dc03ae-7084-429e-8b0f-4d540ae4a430.cdn.bspapp.com/images/hx-search-in-browser/hx-search-in-browser-4.gif)

</details>

## 配置项

<details>
<summary>搜索引擎</summary>

内置了多个引擎，按需选择即可

![](https://mp-77dc03ae-7084-429e-8b0f-4d540ae4a430.cdn.bspapp.com/images/hx-search-in-browser/hx-search-in-browser-5.jpg)

> **如果只是需要一个简单的浏览器搜索，那么这个配置项大致足够了。可以无视后面看起来略显繁杂的配置内容。**

</details>

<details>
<summary>自定义引擎</summary>

> 打开文件进行配置

* 自定义引擎与内置引擎混合数据，引擎ID冲突时，自定义引擎优先级更高
	* 衍生小技巧：如果不想要内置的引擎，可以在自定义引擎中定义同id的配置，且同时配置disabled为true即可

![](https://mp-77dc03ae-7084-429e-8b0f-4d540ae4a430.cdn.bspapp.com/images/hx-search-in-browser/hx-search-in-browser-3.jpg)

> 修改配置后，右键更新引擎，然后重启IDE即可

![](https://mp-77dc03ae-7084-429e-8b0f-4d540ae4a430.cdn.bspapp.com/images/hx-search-in-browser/hx-search-in-browser-4.jpg)

</details>

<details>
<summary>使用内置浏览器模式</summary>

* 勾选时，将在HBuilderX中创建web页面；
* 不勾选时，使用系统默认浏览器搜索

> 应用内打开时，可以通过`视图 > 插件扩展视图 > 浏览器搜索`关闭

</details>

<details>
<summary>使用移动端引擎</summary>

* 勾选时，会尝试访问引擎对应的移动端页面（如果有的话）
* 在使用内置浏览器模式时建议勾选

</details>

<details>
<summary>自定义可执行程序</summary>

此配置包含三项内容：开关、cwd和cmd

> 开关即为是否使用配置的`自定义可执行程序`；而cwd和cmd，举个例子比较好理解。

如下填写的效果是：以隐私方式打开chrome，指定目标url，其中%url为目标地址占位

* cmd: `chrome.exe --incognito %url`
* cwd: `C:\\Program Files\\Google\\Chrome\\Application`

![](https://mp-77dc03ae-7084-429e-8b0f-4d540ae4a430.cdn.bspapp.com/images/hx-search-in-browser/hx-search-in-browser-7.jpg)

</details> 

## 常见问题

### 点击 `更新引擎` 并重启IDE后，右键菜单没有更新怎么办？

偶发更新失败，重新更新下试试