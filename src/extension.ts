import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	let disposable = vscode.commands.registerCommand('convertXPathToCss.convert', () => {
		const editor = vscode.window.activeTextEditor;
		if (!editor) {
			vscode.window.showInformationMessage('No editor is active');
			return;
		}

		const selection = editor.selection;
		const text = editor.document.getText(selection);

		try {
			const cssSelector = convertXPathToCss(text);
			editor.edit(editBuilder => {
				editBuilder.replace(selection, cssSelector);
			});
		} catch (e) {
			if (e instanceof Error) {
				vscode.window.showErrorMessage('Error converting XPath to CSS: ' + e.message);
			} else {
				// Gestione dell'errore quando non si tratta di un oggetto Error
				vscode.window.showErrorMessage('An unknown error occurred');
			}
		}
	});

	context.subscriptions.push(disposable);
}

export function deactivate() { }

function convertXPathToCss(xpath: string): string {
	// Conversione semplice: implementa qui la logica di conversione.
	// Questo è solo un esempio e non funzionerà per tutti gli XPath.
	let css = xpath
		.replace(/^\//, '')
		.replace(/\[(\d+?)\]/g, ':nth-of-type($1)')
		.replace(/\/\//g, ' ')
		.replace(/\//g, ' > ')
		.replace(/@/g, '')
		.replace(/\[contains\((.*?),\s?'(.*?)'\)\]/g, '$1*="$2"')
		.replace(/\[(.*?)=(.*?)\]/g, '[$1="$2"]');

	// Altri casi complessi dovrebbero essere gestiti qui.
	// ...

	return css;
}
