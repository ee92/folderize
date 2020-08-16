import * as vscode from 'vscode';
import {
	mkdirSync,
	readFileSync,
	writeFileSync,
	renameSync
} from 'fs';

import { Context, Option } from './types';
import { getOptions } from './options';
import { stringRegex, importRegex, firstEmptyLineRegex } from './regex';
import { formatIndexFile, formatImportPath, formatImportInComponent, formatImportComponent } from './format';

const createEmptyFolder = (c: Context) => {
	mkdirSync(c.folderPath);
};

const moveFileIntoFolder = (c: Context) => {
	renameSync(c.path, c.newPath);
};

const createIndexFile = (c: Context, o: Option[]) => {
	const indexPath = c.folderPath + '/index.' + c.filePath;
	const indexText = formatIndexFile(c.fileName);
	writeFileSync(indexPath, indexText);
};

const updateLocalImports = (c: Context, o: Option[]) => {
	const text = readFileSync(c.newPath, 'utf-8');
	let updatedText = text.replace(importRegex, (match) => {
		const newPath = match.replace(stringRegex, formatImportPath);
		return newPath;
	});

	o.forEach(option => {
		if (option.importInComponentName && option.createFile) {
			updatedText = updatedText.replace(firstEmptyLineRegex, () => {
				return formatImportInComponent(option.importInComponentName, option.createFile, c.fileName, c.filePath);
			});
		}
	})

	writeFileSync(c.newPath, updatedText);
};

const createOptionalFiles = (c: Context, o: Option[]) => {
	o.forEach((option: Option) => {
		if (option.createFile) {
			const name = option.createFile;
			const path = c.folderPath + '/' + name;

			const fileContent = option.importComponent ? formatImportComponent(c.fileName) : '';
			writeFileSync(path, fileContent);
		}
	});
};

const createFolder = (context: Context, options: Option[]) => {
	createEmptyFolder(context);
	createIndexFile(context, options);
	createOptionalFiles(context, options);
	moveFileIntoFolder(context);
	updateLocalImports(context, options);
};

const showOptions = (context: Context) => {
	return vscode.window.showQuickPick(
		getOptions(context),
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
	const folderPath = path.split('.').slice(0, -1).join('.');
	const fileName = folderPath.split('/').pop() || '';
	const newPath = folderPath + '/' + fileName + '.' + filePath;

	const context = {
		path,
		filePath,
		folderPath,
		fileName,
		newPath
	};

	showOptions(context).then((selectedOptions) => {
		if (selectedOptions) {
			createFolder(context, selectedOptions);
		}
	});
};