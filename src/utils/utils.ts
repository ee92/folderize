import { Option } from './../types/types';

export const checkOptionType = (element: any): element is Option => {
    if (!element) return false;

    return ['id', 'label', 'description', 'createFile']
        .every(name => !!element[name] && typeof (element[name]) === 'string');
}

export const parsePath = (path: string, fileName: string, ext: string) => {
    return path.replace('{fileName}', fileName).replace('{ext}', ext);
}