# Wiz.Format.Converter 开发笔记

调用Windows的Shell来执行Exe程序

```JavaScript
objApp.CreateActiveXObject("wscript.shell")

new ActiveXObject("Shell.Application");
```

## 保存图片到本地

利用 html2markdown 自动转化 HTML 文本

## 另存为 Markdown

- [x] 将图片到出到文件夹
- [x] 用HtmlDialog做用户界面
- [ ] 利用 Markdown 标准格式化自动排版

## 直接渲染Markdown

为知笔记自带导出HTML的功能具有渲染Markdown的选项，可以利用这个功能用pandoc将html转化成富文本的word

## 利用Wiz.exe执行带参数的脚本

## 基于WizCommonUI接口的HTML解析器

利用各种HTML提取接口来实现

## 已知问题

- [x] 在 Markdown 代码块中写HTML代码会造成解析错误。
- [x] 文件名中包含特殊字符未进行过滤
- [ ] 由于 Editor.md 插件在转换图片为Markdown语句时会保留 `<img />` 元素并隐藏，所以用本插件导出后图片会出现重复。
- [ ] 如果用Typora保存后，换行符不再是 `<br />` 而变成了 `&nbsp;` ，从而造成换行符丢失。

## 关于自定义编码问题

参见：https://github.com/ashtuchkin/iconv-lite/wiki/Supported-Encodings

向开发人员请教objCommon.InputBox2()的用例