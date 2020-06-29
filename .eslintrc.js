module.exports = {
    env: {
        browser: true,
        es2020: true
    },
    extends: [
        'plugin:react/recommended',
        'standard'
    ],
    parserOptions: {
        ecmaFeatures: {
            jsx: true
        },
        ecmaVersion: 11,
        sourceType: 'module'
    },
    parser: 'babel-eslint',
    plugins: [
        'react'
    ],
    rules: {
        indent: ['error', 4, { SwitchCase: 1 }],
        'no-var': 'error',
        'space-before-function-paren': ['error', 'never']
    }
}
