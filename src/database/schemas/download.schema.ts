import { lessons } from './lesson.schema'
import { sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const downloads = sqliteTable('downloads', {
    id: text().primaryKey().notNull(),
    fileName: text('file_name').notNull(),
    label: text().notNull(),
    lessonId: text('lesson_id')
        .notNull()
        .references(() => lessons.id, { onDelete: 'cascade', onUpdate: 'cascade' })
})
