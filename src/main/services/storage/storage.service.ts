import { IconStorageManager } from './managers'
import { getAppDataPath } from '@main/utils'

export class StorageService {
    #storagePath: string

    #iconManager: IconStorageManager

    get icon() {
        return this.#iconManager
    }

    constructor() {
        this.#storagePath = getAppDataPath()
        this.#iconManager = new IconStorageManager(this.#storagePath)
    }
}
