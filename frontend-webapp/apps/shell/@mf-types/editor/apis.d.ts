
    export type RemoteKeys = 'editor/EditorApp';
    type PackageType<T> = T extends 'editor/EditorApp' ? typeof import('editor/EditorApp') :any;