export type Context = {
   path: string,
   filePath: string,
   folderPath: string,
   fileName: string,
   newPath: string
};

export type Option = {
   id: string,
   label: string,
   description: string,
   createFile?: string,
};