
    export type RemoteKeys = 'templates/TemplatesApp';
    type PackageType<T> = T extends 'templates/TemplatesApp' ? typeof import('templates/TemplatesApp') :any;