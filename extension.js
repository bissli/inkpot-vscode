const vscode = require('vscode');

function activate(context) {
    // Set highlight extension settings when our theme is activated
    vscode.workspace.onDidChangeConfiguration(event => {
        if (event.affectsConfiguration('workbench.colorTheme')) {
            const config = vscode.workspace.getConfiguration();
            if (config.get('workbench.colorTheme') === 'Inkpot') {
                config.update('highlight.decorations', { rangeBehavior: 3 }, true);
                config.update('highlight.regexFlags', 'gim', true);
                config.update('highlight.minDelay', 5, true);
                config.update('highlight.maxMatches', 999, true);
                config.update('highlight.regexes', {
                    // String background
                    "(?<!\\w)(?:[frb])?(('''|\"\"\")((?:(?!\\2)[\\s\\S])*?)\\2|'([^'\\\\]|\\\\.)*'|\"([^\"\\\\]|\\\\.)*\")": {
                        "regexFlags": "gms",
                        "decorations": [
                            { "color": "#ffcd8b", "backgroundColor": "#404040" }
                        ]
                    },
                    // Character escapes like \n \t etc
                    "\\\\[a-z]": { "color": "#c080d0" },
                    // Git diff markers
                    "^\\+.*": { "color": "#ffffcd" },
                    "^-.*": { "color": "#ffffcd" },
                    "^@@.*@@": { "color": "#ffffcd" },
                    // Git conflict markers
                    "^<<<<<<<.*": { "color": "#ffffff" },
                    "^=======.*": { "color": "#ffffff" },
                    "^>>>>>>>.*": { "color": "#ffffff" }
                }, true);
            }
        }
    });
}

function deactivate() {}

module.exports = { activate, deactivate }
