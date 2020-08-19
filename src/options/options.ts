import { parsePath } from './../utils/utils';
import * as vscode from 'vscode';
import { Context, Option } from '../types';
import { checkOptionType } from '../utils';
import { presets } from './presets';

const parseOption = (option: Option, c: Context) => {
	const parsedOption = { ...option };

	['description', 'createFile'].forEach(attribute => {
		if (!parsedOption[attribute]) return;

		parsedOption[attribute] = parsePath(parsedOption[attribute], c.fileName, c.filePath)
	})

	return parsedOption;
}

export const getOptions = (c: Context) => {
	const filesToGenerateConfig = <Object[]>vscode.workspace.getConfiguration('folderize')
		.get('optionalFilesToGenerate');

	console.log(filesToGenerateConfig);

	const selectedPresets = filesToGenerateConfig.filter(fileConfig => typeof fileConfig === 'string');
	const addedOptions = filesToGenerateConfig.filter(checkOptionType).map(option => parseOption(option, c));

	const presetOptions = presets.filter(({ id }) => selectedPresets.includes(id))
		.map(preset => parseOption(preset, c));

	const options = [...addedOptions];

	presetOptions.forEach(presetOption => {
		const existingOptionIndex = options.findIndex(option => option.id === presetOption.id);
		if (existingOptionIndex !== -1) {
			options[existingOptionIndex] = presetOption;
		} else {
			options.push(presetOption);
		}
	})

	return options;

};
