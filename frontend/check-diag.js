const ts = require('typescript');
const path = require('path');

const configPath = ts.findConfigFile('./', ts.sys.fileExists, 'tsconfig.json');
const configFile = ts.readConfigFile(configPath, ts.sys.readFile);
const parsedConfig = ts.parseJsonConfigFileContent(configFile.config, ts.sys, './');

const program = ts.createProgram(parsedConfig.fileNames, parsedConfig.options);

const allFiles = parsedConfig.fileNames;
allFiles.forEach(file => {
  const sourceFile = program.getSourceFile(file);
  if (!sourceFile) return;
  const diagnostics = ts.getPreEmitDiagnostics(program, sourceFile);
  if (diagnostics.length > 0) {
    console.log(`=== Diagnostics for ${path.relative('.', file)} (${diagnostics.length} problems) ===`);
    diagnostics.forEach(d => {
      const pos = d.file ? d.file.getLineAndCharacterOfPosition(d.start) : { line: 0, character: 0 };
      const message = ts.flattenDiagnosticMessageText(d.messageText, '\n');
      console.log(`  Line ${pos.line + 1}:${pos.character + 1} - ${message}`);
    });
  }
});
