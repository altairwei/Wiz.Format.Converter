import { WizExplorerApp as objApp, WizExplorerWindow as objWindow } from './WizInterface';

const pluginPath = objApp.GetPluginPathByScriptFileName('dc_global.js');
const curDoc = objWindow.CurrentDocument;
objWindow.ShowHtmlDialogEx(false, '另存为 Markdown', pluginPath + 'dist/SaveToMarkdown.html', 400, 350, '', [curDoc], null);