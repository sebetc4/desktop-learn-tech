import styles from './DownloadSection.module.scss'
import { Button } from '@/renderer/src/components'
import { useLessonStore } from '@/renderer/src/store'
import { Download } from 'lucide-react'

export const DownloadSection = () => {
    const courseId = useLessonStore((state) => state.course?.id)
    const chapterId = useLessonStore((state) => state.chapter?.id)
    const lessonId = useLessonStore((state) => state.lesson?.id)
    const downloads = useLessonStore((state) => state.lesson!.downloads)

    const handleDownload = async (fileName: string) => {
        if (!courseId || !chapterId || !lessonId) return
        await window.api.lesson.downloadFile({ courseId, chapterId, lessonId, fileName })
    }

    return (
        <section className={styles.section}>
            <h2 className={styles.title}>Téléchargements</h2>
            <div className={styles.list}>
                {downloads.map((dl) => (
                    <div key={dl.id} className={styles.item}>
                        <Download className={styles.icon} />
                        <span className={styles.label}>{dl.label}</span>
                        <Button
                            variant="outlined"
                            icon={<Download size={16} />}
                            onClick={() => handleDownload(dl.fileName)}
                        >
                            Télécharger
                        </Button>
                    </div>
                ))}
            </div>
        </section>
    )
}
