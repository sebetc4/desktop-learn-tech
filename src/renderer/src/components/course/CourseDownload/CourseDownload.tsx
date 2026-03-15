import styles from './CourseDownload.module.scss'
import { useLessonStore } from '@/renderer/src/store/lesson.store'
import { Download } from 'lucide-react'
import { type FC } from 'react'

interface CourseDownloadProps {
    fileName: string
    label?: string
}

export const CourseDownload: FC<CourseDownloadProps> = ({ fileName, label }) => {
    const courseId = useLessonStore((state) => state.course?.id)
    const chapterId = useLessonStore((state) => state.chapter?.id)
    const lessonId = useLessonStore((state) => state.lesson?.id)

    if (!courseId || !chapterId || !lessonId) {
        console.error('CourseDownload: Missing courseId, chapterId, or lessonId')
        return null
    }

    const handleDownload = async () => {
        await window.api.lesson.downloadFile({ courseId, chapterId, lessonId, fileName })
    }

    return (
        <button className={styles.download} onClick={handleDownload}>
            <Download className={styles.icon} size={18} />
            <span>{label || fileName}</span>
        </button>
    )
}
