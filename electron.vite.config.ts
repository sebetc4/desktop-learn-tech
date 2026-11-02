import react from '@vitejs/plugin-react'
import { defineConfig } from 'electron-vite'
import { resolve } from 'path'

export default defineConfig({
    main: {
        resolve: {
            alias: {
                '@': resolve('src'),
                '@main': resolve('src/main'),
                '@preload': resolve('src/preload')
            }
        },
        build: {
            // check-disk-space is ESM-only and cannot be required from the CJS main bundle
            externalizeDeps: { exclude: ['check-disk-space'] },
            rolldownOptions: {
                output: {
                    manualChunks: undefined
                }
            }
        }
    },
    preload: {
        resolve: {
            alias: {
                '@': resolve('src'),
                '@main': resolve('src/main'),
                '@preload': resolve('src/preload')
            }
        }
    },
    renderer: {
        resolve: {
            alias: {
                '@': resolve('src'),
                '@renderer': resolve('src/renderer/src')
            }
        },
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: `
                        @use '@renderer/styles/lib' as *;
                        @use '@renderer/styles/utils' as *;
                    `
                }
            }
        },
        build: {
            rolldownOptions: {
                output: {
                    codeSplitting: {
                        groups: [
                            {
                                name: 'react-vendor',
                                test: /node_modules[\\/](react|react-dom|react-router-dom)[\\/]/
                            },
                            {
                                name: 'ui-vendor',
                                test: /node_modules[\\/](lucide-react|sonner)[\\/]/
                            },
                            {
                                name: 'form-vendor',
                                test: /node_modules[\\/](react-hook-form|@hookform[\\/]resolvers|yup)[\\/]/
                            }
                        ]
                    }
                }
            },
            chunkSizeWarningLimit: 1000
        },
        plugins: [react()]
    }
})
