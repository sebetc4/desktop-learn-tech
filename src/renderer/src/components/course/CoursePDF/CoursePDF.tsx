import { protocolService } from '@/renderer/src/services'
import { useLessonStore } from '@/renderer/src/store/lesson.store'
import { Viewer, Worker } from '@react-pdf-viewer/core'
import '@react-pdf-viewer/core/lib/styles/index.css'
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout'
import '@react-pdf-viewer/default-layout/lib/styles/index.css'
import { type FC, useEffect, useState } from 'react'

const workerUrl = new URL('pdfjs-dist/build/pdf.worker.min.js', import.meta.url).href

const useThemeMode = (): 'light' | 'dark' => {
    const [isDark, setIsDark] = useState(
        () => window.matchMedia('(prefers-color-scheme: dark)').matches
    )

    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
        const handler = (e: MediaQueryListEvent) => setIsDark(e.matches)
        mediaQuery.addEventListener('change', handler)
        return () => mediaQuery.removeEventListener('change', handler)
    }, [])

    return isDark ? 'dark' : 'light'
}

interface CoursePDFProps {
    fileName: string
    height?: string
}

export const CoursePDF: FC<CoursePDFProps> = ({ fileName, height = '750px' }) => {
    const courseId = useLessonStore((state) => state.course?.id)
    const chapterId = useLessonStore((state) => state.chapter?.id)
    const lessonId = useLessonStore((state) => state.lesson?.id)
    const themeMode = useThemeMode()

    const defaultLayoutPluginInstance = defaultLayoutPlugin({
        toolbarPlugin: {
            getFilePlugin: { fileNameGenerator: () => fileName }
        }
    })

    if (!courseId || !chapterId || !lessonId) {
        console.error('CoursePDF: Missing courseId, chapterId, or lessonId')
        return null
    }

    const pdfUrl = protocolService.course.getPdfPath(courseId, chapterId, lessonId, fileName)

    return (
        <div style={{ height }}>
            <Worker workerUrl={workerUrl}>
                <Viewer
                    fileUrl={pdfUrl}
                    plugins={[defaultLayoutPluginInstance]}
                    theme={themeMode}
                />
            </Worker>
        </div>
    )
}
