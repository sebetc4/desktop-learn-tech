import eslintConfigPrettier from '@electron-toolkit/eslint-config-prettier'
import tseslint from '@electron-toolkit/eslint-config-ts'
import eslintPluginReact from 'eslint-plugin-react'
import eslintPluginReactHooks from 'eslint-plugin-react-hooks'
import eslintPluginReactRefresh from 'eslint-plugin-react-refresh'
import reactPackage from 'react/package.json' with { type: 'json' }

export default tseslint.config(
    { ignores: ['**/node_modules', '**/dist', '**/out'] },
    tseslint.configs.recommended,
    eslintPluginReact.configs.flat.recommended,
    eslintPluginReact.configs.flat['jsx-runtime'],
    {
        settings: {
            react: {
                // eslint-plugin-react cannot detect the version under ESLint 10
                version: reactPackage.version
            }
        }
    },
    {
        files: ['**/*.{ts,tsx}'],
        plugins: {
            'react-hooks': eslintPluginReactHooks,
            'react-refresh': eslintPluginReactRefresh
        },
        rules: {
            ...eslintPluginReactHooks.configs.recommended.rules,
            ...eslintPluginReactRefresh.configs.vite.rules,
            // React Compiler rules added by eslint-plugin-react-hooks 7, kept visible until the effects are refactored
            'react-hooks/set-state-in-effect': 'warn',
            'react-hooks/immutability': 'warn',
            '@typescript-eslint/explicit-function-return-type': 'off'
        }
    },
    eslintConfigPrettier
)
