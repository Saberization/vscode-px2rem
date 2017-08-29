'use strict';
Object.defineProperty(exports, "__esModule", {
    value: true
});

const vscode = require("vscode");
const processModule = require("./process");
const providerModule = require("./provider");
let options = null;

function activate(context) {
    options = vscode.workspace.getConfiguration('px2rem');
    
    const process = new processModule.Px2remProcess(options);
    let provider = new providerModule.Px2remProvider(process);
    const LANS = ['html', 'vue', 'css', 'less', 'scss', 'sass', 'stylus'];
    
    for(let lan of LANS) {
        let providerDisposable = vscode.languages.registerCompletionItemProvider(lan, provider);
        context.subscriptions.push(providerDisposable);
    }
    
    context.subscriptions.push(vscode.commands.registerTextEditorCommand('extension.px2rem', (textEditor, edit) => {
        const doc = textEditor.document;
        let selection = textEditor.selection;
        
        if(selection.isEmpty) {
            const start = new vscode.Position(0, 0);
            const end = new vscode.Position(doc.lineCount - 1, doc.lineAt(doc.lineCount - 1).text.length);
            selection = new vscode.Range(start, end);
        }
        
        let text = doc.getText(selection);
        textEditor.edit(builder => {
            builder.replace(selection, process.convertAll(text));
        });
        
    }));
    
}
exports.activate = activate;