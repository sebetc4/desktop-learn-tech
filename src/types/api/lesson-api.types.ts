import type {
    DownloadFileIPCHandlerParams,
    DownloadFileIPCHandlerReturn,
    GetCodeSnippetContentIPCHandlerParams,
    GetCodeSnippetContentIPCHandlerReturn,
    GetJSXLessonContentIPCHandlerParams,
    GetJSXLessonContentIPCHandlerReturn,
    GetLessonStoreDataIPCHandlerParams,
    GetLessonStoreDataIPCHandlerReturn
} from '../ipc'

export interface LessonAPI {
    getLessonStoreData: (
        params: GetLessonStoreDataIPCHandlerParams
    ) => GetLessonStoreDataIPCHandlerReturn
    getJSXContent: (
        params: GetJSXLessonContentIPCHandlerParams
    ) => GetJSXLessonContentIPCHandlerReturn
    getCodeSnippetContent: (
        params: GetCodeSnippetContentIPCHandlerParams
    ) => GetCodeSnippetContentIPCHandlerReturn
    downloadFile: (params: DownloadFileIPCHandlerParams) => DownloadFileIPCHandlerReturn
}
