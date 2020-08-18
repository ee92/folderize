import { parsePath } from './../utils/utils';

export const formatIndexFile = (name: string) => {
	return `export { default } from './${name}';\n`;
};

export const formatImportInComponent = (importName: string, path: string, name: string, ext: string, fileIsEmpty: boolean) => {
	const importText = `import ${importName} from './${parsePath(path, name, ext)}'\n`;
	return fileIsEmpty ? importText : `\n${importText}\n`;
};

export const formatImportComponent = (name: string) => {
	return `import ${name} from './${name}';\n`;
};

export const formatImportPath = (s: string) => {
	const prefix = s.slice(1, 3);
	switch (prefix) {
		case ('./'):
			return s.substr(0, 1) + '.' + s.substr(1);
		case ('..'):
			return s.substr(0, 1) + '../' + s.substr(1);
		default:
			return s;
	}
};