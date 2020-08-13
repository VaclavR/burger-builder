module.exports = {
    'env': {
        'browser': true,
        'es2020': true
    },
    'extends': [
        'eslint:recommended',
        'plugin:react/recommended'
    ],
    'parserOptions': {
        'ecmaFeatures': {
            'jsx': true
        },
        'ecmaVersion': 11,
        'sourceType': 'module'
    },
    'parser': 'babel-eslint',
    'plugins': [
        'react'
    ],
    'rules': {
        'indent': [
            'error',
            4,
            {
                'SwitchCase': 1
            }
        ],
        'linebreak-style': [
            'error',
            'unix'
        ],
        'quotes': [
            'error',
            'single'
        ],
        'semi': [
            'error',
            'never'
        ],
        'no-var': 'error',
        'no-console': [
            'warn', { 'allow': ['warn']}
        ],
        'comma-spacing': [
            'error', {
                'before': false,
                'after': true
            }
        ],
        'array-bracket-spacing': [
            'error',
            'never',
            {
                'objectsInArrays': false,
                'arraysInArrays': false,
                'singleValue': false
            }
        ],
        // 'object-curly-spacing': [
        //     'error',
        //     'never',
        //     {
        //         'objectsInObjects': false,
        //         'arraysInObjects': false
        //     }
        // ],
        'space-before-function-paren': [
            'error',
            'never'
        ],
        'react/jsx-curly-spacing': [
            'error',
            {'when': 'never'}
        ],
        'react/jsx-tag-spacing': [
            'error',
            {'beforeSelfClosing': 'always'}
        ],
        'react/boolean-prop-naming': [
            'error', {}
        ],
        'jsx-quotes': [
            'error',
            'prefer-single'
        ]
    }
}
