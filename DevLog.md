# Wiz.Format.Converter 开发笔记

调用Windows的Shell来执行Exe程序

```JavaScript
objApp.CreateActiveXObject("wscript.shell")

new ActiveXObject("Shell.Application");
```

## 另存为 Markdown

- [ ] 将图标到出到文件夹，重新命名图片名称
- [ ] 用HtmlDialog做用户界面

```javascript
    ////////////////////////////////////////////////
    // 处理带图片内容
    function dealImgDoc (doc) {
        var arrImgTags = "";

        function dealImg (imgSrc) {
            var result = saveImageToLocal(imgSrc);
            arrImgTags += result[1];
            return result[0];
        }

        var imgReg = /(!\[[^\[]*?\]\()(.+?)(\s+['"][\s\S]*?['"])?(\))/g;
        doc = doc.replace(imgReg, function(whole, a, b, c, d) {
            if (c) {
                return a + dealImg(b) + c + d;
            } else{
                return a + dealImg(b) + d;
            }
        });

        var imgStrDiv = "";
        if (arrImgTags != "") {
            imgStrDiv = "<div name=\"markdownimage\" style=\"display:none;\">" + arrImgTags + "</div>";
        };
        return [doc, imgStrDiv];
    }

    ////////////////////////////////////////////////
    // 保存图片到本地临时目录
    // 返回新图片路径名和图片HTML标签内容
    function saveImageToLocal(filename) {
        filename = filename.replace(/\\/g, '/');
        var imgName = filename.substring(filename.lastIndexOf('/') + 1);
        var filenameNew = filename;
        var tagImg = "";

        var imgFullPath = "";
        if (filename.indexOf(filesDirName) == 0) {
            imgFullPath = filesFullPath + imgName;
        }
        else {
            imgFullPath = filename;
            if (imgFullPath.indexOf("file:///") == 0) {
                imgFullPath = imgFullPath.substring(8);
            }
        }

        if (imgFullPath != "") {
            if (objCommon.PathFileExists(imgFullPath)) {

                // 转换可能包含中文名的名称，转换成Unicode
                var imgNameNew = escape(imgName).replace(/%/g, '_');

                // 路径不同，则进行拷贝
                var imgCopyToFullPath = filesFullPath + imgNameNew;
                if (imgFullPath != imgCopyToFullPath) {

                    // 目标文件已经存在
                    if (objCommon.PathFileExists(imgCopyToFullPath)) {
                        var date = new Date();
                        imgNameNew = date.getTime() + imgNameNew;
                        imgCopyToFullPath = filesFullPath + imgNameNew;
                    }

                    objCommon.CopyFile(imgFullPath, imgCopyToFullPath);
                }

                filenameNew = filesDirName + imgNameNew;
                tagImg = "<img src=\"" + imgCopyToFullPath + "\">";
            }
        }

        return [filenameNew, tagImg];
    }

    ////////////////////////////////////////////////
    // 获得保存到本地的图片
    function getSavedLocalImage(filename) {
        return saveImageToLocal(filename)[0];
    }
```