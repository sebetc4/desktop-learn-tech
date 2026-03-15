import { FolderService } from '../services'
import { LessonService } from '../services/lesson/lesson.service'
import { pathService } from '../services/path/path.service'
import { IPC } from '@/constants'
import { app, dialog, ipcMain } from 'electron'
import fs from 'fs/promises'
import path from 'path'

import type {
    DownloadFileIPCHandlerParams,
    GetCodeSnippetContentIPCHandlerParams,
    GetJSXLessonContentIPCHandlerParams,
    GetLessonStoreDataIPCHandlerParams,
    GetLessonStoreDataIPCHandlerReturn
} from '@/types'

export const registerLessonIpcHandlers = (
    lessonService: LessonService,
    folderService: FolderService
) => {
    ipcMain.handle(
        IPC.LESSON.GET_DATA,
        async (
            _event,
            params: GetLessonStoreDataIPCHandlerParams
        ): GetLessonStoreDataIPCHandlerReturn => {
            try {
                const data = await lessonService.getLessonStoreData(params)
                return {
                    success: true,
                    data,
                    message: 'Lesson retrieved successfully'
                }
            } catch (error) {
                console.error('Error during import course:', error)
                return {
                    success: false,
                    message: `Error retrieving lesson: ${error instanceof Error ? error.message : 'Unknown error'}`
                }
            }
        }
    )

    ipcMain.handle(
        IPC.LESSON.GET_JSX_CONTENT,
        async (_event, params: GetJSXLessonContentIPCHandlerParams) => {
            try {
                const jsxPath = pathService.getJsxPath(params)
                const fullJsxPath = folderService.getPathFromFolder(jsxPath)

                try {
                    await fs.access(fullJsxPath)
                } catch {
                    throw new Error(`JSX file not found: ${jsxPath}`)
                }

                const jsxContent = await fs.readFile(fullJsxPath, 'utf-8')
                const dependencies = {}
                return {
                    success: true,
                    data: {
                        jsxContent,
                        dependencies
                    },
                    message: 'Navigation element retrieved successfully'
                }
            } catch (error) {
                console.error('Error loading JSX content:', error)
                return {
                    success: false,
                    message: `Error loading JSX content: ${error instanceof Error ? error.message : 'Unknown error'}`
                }
            }
        }
    )

    ipcMain.handle(
        IPC.LESSON.GET_CODE_SNIPPET_CONTENT,
        async (_event, params: GetCodeSnippetContentIPCHandlerParams) => {
            try {
                const codeSnippetPath = pathService.getCodeSnippetPath(params)
                const fullPath = folderService.getPathFromFolder(codeSnippetPath)

                try {
                    await fs.access(fullPath)
                } catch {
                    throw new Error(`Code file not found: ${codeSnippetPath}`)
                }

                const content = await fs.readFile(fullPath, 'utf-8')
                return {
                    success: true,
                    data: { content },
                    message: 'Code content retrieved successfully'
                }
            } catch (error) {
                console.error('Error loading code content:', error)
                return {
                    success: false,
                    message: `Error loading code content: ${error instanceof Error ? error.message : 'Unknown error'}`
                }
            }
        }
    )

    ipcMain.handle(
        IPC.LESSON.DOWNLOAD_FILE,
        async (_event, params: DownloadFileIPCHandlerParams) => {
            try {
                const downloadPath = pathService.getDownloadPath(params)
                const fullPath = folderService.getPathFromFolder(downloadPath)

                const coursesRootPath = folderService.rootPath
                if (!coursesRootPath || !fullPath.startsWith(coursesRootPath)) {
                    return {
                        success: false,
                        message: 'Access denied: invalid file path'
                    }
                }

                try {
                    await fs.access(fullPath)
                } catch {
                    return {
                        success: false,
                        message: `File not found: ${params.fileName}`
                    }
                }

                const { canceled, filePath } = await dialog.showSaveDialog({
                    defaultPath: path.join(
                        app.getPath('downloads'),
                        params.fileName
                    ),
                    properties: ['createDirectory']
                })

                if (canceled || !filePath) {
                    return {
                        success: true,
                        message: 'Download cancelled by user'
                    }
                }

                await fs.copyFile(fullPath, filePath)

                return {
                    success: true,
                    message: 'File downloaded successfully'
                }
            } catch (error) {
                console.error('Error downloading file:', error)
                return {
                    success: false,
                    message: `Error downloading file: ${error instanceof Error ? error.message : 'Unknown error'}`
                }
            }
        }
    )
}
