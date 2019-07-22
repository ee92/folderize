export const formatIndexFile = (name: string, exportAll: boolean) => {
	if (exportAll) {
		return `export * from './${name}';`;
	}
	return `import ${name} from './${name}';\n\nexport default ${name};`;
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