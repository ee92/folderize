import {Context} from '../types';

export const getOptions = (c: Context) => {
	return [
		{	
			'id': 'test',
			'label': 'Add test file',
			'description': `${c.fileName}.test.${c.filePath}`,
			'createFile': `${c.fileName}.test.${c.filePath}`
		},
		{
			'id': 'css_module',
			'label': 'Add CSS module',
			'description': `${c.fileName}.module.css`,
			'createFile': `${c.fileName}.module.css`
		}
	];
};