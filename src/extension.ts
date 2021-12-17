// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "labelcase" is now active!');

	let convertToLabel = vscode.commands.registerCommand('labelcase.convertToLabel', ()=>{
		const {activeTextEditor: textEditor, showInformationMessage: msg} = vscode.window;
		const {showTextDocument: dextDocument} = vscode.window;
		textEditor?.edit(editBuilder=>{
			textEditor?.selections.forEach(selection => {
				console.log(selection);
				const originText = textEditor.document.getText(selection);
				const newText = '{{"_' + originText.toUpperCase().replace(' ', '_') + '_" | translate }}';
				// vscode.TextEdit.replace(selection, newText);
				editBuilder.replace(selection, newText );
				msg('finish');
			});
			
		});
	});
	context.subscriptions.push(convertToLabel);
}

// this method is called when your extension is deactivated
export function deactivate() {}
