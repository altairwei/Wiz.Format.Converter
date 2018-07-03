export { 
    WizExplorerApp, 
    WizExplorerWindow, 
    WizDatabase, 
    WizCommonUI, 
    WizConfirm, 
    WizAlert 
};

//TODO: 判断window.external是否为WizHtmlEditorApp
const WizExplorerApp = window.external;
const WizExplorerWindow = WizExplorerApp.Window;
const WizDatabase = WizExplorerApp.Database;
const WizCommonUI = WizExplorerApp.CreateWizObject("WizKMControls.WizCommonUI");

function WizAlert(msg) {
    WizExplorerWindow.ShowMessage(msg, "{p}", 0x00000040);
}

function WizConfirm(msg, title) {
    return WizExplorerWindow.ShowMessage(msg, title, 0x00000020 | 0x00000001) == 1;
}
