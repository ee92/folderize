export const formatIndexFile = (name: string) => {
	return `export { default } from './${name}';\n`;
};

export const formatCssImport = (name: string) => {
	return `\nimport styles from './${name}.module.css'\n\n`;
};

export const formatImportPath = (s: string) => {
	const prefix = s.slice(1,3);
	switch(prefix) {
		case('./'):
			return s.substr(0,1) + '.' + s.substr(1);
		case('..'):
			return s.substr(0,1) + '../' + s.substr(1);
		default:
			return s;
	}
};