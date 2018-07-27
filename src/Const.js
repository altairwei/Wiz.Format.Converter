import { WizExplorerApp as objApp } from './WizInterface';

const pluginPath = objApp.GetPluginPathByScriptFileName('dc_global.js')

const CONST = {
    PluginPath: pluginPath,
    ParamsDialogPath: pluginPath + 'dist/ParamsDialog.html'
    
}

export default CONST;