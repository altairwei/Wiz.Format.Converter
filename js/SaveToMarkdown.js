var objApp = window.external;
var objDatabase = objApp.Database;
var objWindow = objApp.Window;
var objCommon = objApp.CreateWizObject("WizKMControls.WizCommonUI");
var pluginPath = objApp.GetPluginPathByScriptFileName("sm_global.js");

function WizAlert(msg) {
    objWindow.ShowMessage(msg, "{p}", 0x00000040);
}

function WizConfirm(msg) {
    return objWindow.ShowMessage(msg, "{p}", 0x00000020 | 0x00000001) == 1;
}

////////////////////////////////////////////////
// 保存图片到本地临时目录 from Wiz.Editor.md
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

// 处理带图片内容 from Wiz.Editor.md
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

(function(){
    const isMarkdown = objWindow.CurrentDocument.IsMarkdown();
    const docTitle = objWindow.CurrentDocument.Title;
    const ValidCharSet = ['unicode','utf-8']
    if (!isMarkdown) {
        WizAlert('该文档非Markdown');
        return false;
    }
    const filePath = objCommon.SelectWindowsFolder('请选择要保存到的文件夹');
    const fileName = objCommon.InputBox('请输入文件名', '', docTitle);
    const charset = objCommon.InputBox('请输入数字以选择相应的编码！', `选项：\n[0]. unicode\n[1]. utf-8`, '0');
    const text = objWindow.CurrentDocument.GetText(0);
    if (filePath && fileName && charset) {
        objCommon.SaveTextToFile(filePath + fileName, text, ValidCharSet[charset]);
    }
})()
