import { downloads } from '@/database/schemas'

import { AutoSaveFunction, Download, DrizzleDB } from '@/types'

interface CreateDownloadParams {
    id: string
    fileName: string
    label: string
    lessonId: string
}

export class DownloadDatabaseManager {
    #db: DrizzleDB
    #autoSave: AutoSaveFunction

    constructor(db: DrizzleDB, autoSaveFunction: AutoSaveFunction) {
        this.#db = db
        this.#autoSave = autoSaveFunction
    }

    async create(data: CreateDownloadParams): Promise<Download> {
        return this.#autoSave(async () => {
            const result = await this.#db.insert(downloads).values(data).returning()
            return result[0]
        })
    }
}
