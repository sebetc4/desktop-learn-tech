import { app } from 'electron'
import os from 'os'
import path from 'path'

// Redirects Chromium session data (Cache, GPUCache, Cookies, Local Storage…)
// from userData to XDG_CACHE_HOME so ~/.config/<name>/ only holds real config.
// Must be called before `app.whenReady()`.
export const configureXdgPaths = (): void => {
    if (process.platform !== 'linux') return

    const cacheHome = process.env.XDG_CACHE_HOME || path.join(os.homedir(), '.cache')
    app.setPath('sessionData', path.join(cacheHome, app.getName(), 'session'))
}

// Persistent application data (database, course icons).
// Linux: XDG_DATA_HOME (~/.local/share/<name>/); macOS/Windows: platform userData.
export const getAppDataPath = (): string => {
    if (process.platform === 'linux') {
        const dataHome = process.env.XDG_DATA_HOME || path.join(os.homedir(), '.local/share')
        return path.join(dataHome, app.getName())
    }
    return app.getPath('userData')
}
