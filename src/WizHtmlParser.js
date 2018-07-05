/**
 * 基于WizCommonUI接口的HTML解析器
 */

import { WizCommonUI as objCommon } from './WizInterface';

//从HTML标记里面获得一个属性值。bstrHtmlTag：HTML标记内容；bstrTagAttributeName：属性名；返回值：属性值
objCommon.HtmlTagGetAttributeValue(bstrHtmlTag, bstrTagAttributeName);

//从HTML文字里面提取一个或者多个标记。bstrHtmlText：HTML文字；bstrTagName：HTML标记名；bstrTagAttributeName：HTML标记属性名；bstrTagAttributeValue：HTML标记属性值；返回值：所有符合条件的标记，类型为安全数组。如果在javascript里面使用，请参阅本文后面部分。
objCommon.HtmlExtractTags(bstrHtmlText, bstrTagName, bstrTagAttributeName, bstrTagAttributeValue);

//从HTML里面获得所有的链接。bstrHtmlText：HTML文字；bstrURL：HTML的URL；返回值：所有链接，类型为安全数组。如果在javascript里面使用，请参阅本文后面部分。
objCommon.HtmlEnumLinks(bstrHtmlText, bstrURL);

//从HTML文字里面，提取HTML正文。bstrHtmlText：HTML文字；bstrURL：HTML的URL；返回值：HTML正文
objCommon.HtmlGetContent(bstrHtmlText, bstrURL);

//从HTML里面提取指定的tag
objCommon.HtmlExtractTags2(bstrHtmlText, bstrTagName, bstrTagAttributeName, bstrTagAttributeValue);

//从HTML里面提取连接
objCommon.HtmlEnumLinks2(bstrHtmlText, bstrURL);