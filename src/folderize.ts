import * as vscode from 'vscode';
import {
   mkdirSync,
   readFileSync,
   writeFileSync,
   renameSync
} from 'fs';

import {Context, Option} from './types';
import {stringRegex, importRegex} from './regex';
import {options} from './options';
import {formatIndex, formatImportPath} from './format';

const createEmptyFolder = (c: Context) => {
	mkdirSync(c.folderPath);
};

const moveFileIntoFolder = (c: Context) => {
	renameSync(c.path, c.newPath);
};

const createIndexFile = (c: Context, o: Option[]) => {
	const exportAll = o.some(option => option.id === 'export_all');
	const indexPath = c.folderPath + '/index.' + c.filePath;
	const indexText = formatIndex(c.fileName, exportAll);
	console.log('index text: ', indexText);
	writeFileSync(indexPath, indexText);
};

const updateLocalImports = (path: string) => {
	const text = readFileSync(path, 'utf-8');
	const updatedText = text.replace(importRegex, (match) => {
		const newPath = match.replace(stringRegex, formatImportPath);
		return newPath;
	});
	writeFileSync(path, updatedText);
};

const createOptionalFiles = (c: Context, o: Option[]) => {
	o.forEach((option: Option) => {
		if (option.createFile) {
			const name = option.createFile;
			const path = c.folderPath + '/' + name;
			writeFileSync(path, '');
		}
	});
};

const createFolder = (context: Context, options: Option[]) => {
	createEmptyFolder(context);
	moveFileIntoFolder(context);
	createIndexFile(context, options);
	createOptionalFiles(context, options);
	updateLocalImports(context.newPath);
};

const showOptions = (context: Context) => {
	return vscode.window.showQuickPick(
		options(context),
		{
			placeHolder: 'generate additional files',
			canPickMany: true,
			ignoreFocusOut: false
		}
	);
};

export const init = (event: vscode.Uri) => {
	const path = event.fsPath;
	const filePath = path.split('.').pop() || '';
	const folderPath = path.split('.').slice(0,-1).join('.');
	const fileName = folderPath.split('/').pop() || '';
	const newPath = folderPath + '/' + fileName + '.' + filePath;

	const context = {
		path,
		filePath,
		folderPath,
		fileName,
		newPath
	};
	
   showOptions(context)
   .then((selectedOptions) => {
      if (selectedOptions === undefined) {
         return;
      }
      createFolder(context, selectedOptions);
   });
};