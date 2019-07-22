import {Context} from '../types';

export const getOptions = (c: Context) => {
	console.log('oh');
	return [
		{	
			'id': 'test',
			'label': 'Generate test file',
			'description': `${c.fileName}.test.${c.filePath}`,
			'createFile': `${c.fileName}.test.${c.filePath}`
		},
		{
			'id': 'css_module',
			'label': 'Generate CSS module',
			'description': `${c.fileName}.module.css`,
			'createFile': `${c.fileName}.module.css`
		},
		{
			'id': 'export_all',
			'label': 'Export multiple',
			'description': `export * from './${c.fileName}'`,
		}
	];
};