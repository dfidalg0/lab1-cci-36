/**
 * @type {import('eslint').Linter.Config}
 */
const config = {
    env: {
        browser: true,
        es2021: true
    },
    extends: 'eslint:recommended',
    parserOptions: {
        ecmaVersion: 12,
        sourceType: 'module'
    },
    rules: {
        'indent': [
            'error',
            4,
            { SwitchCase: 1 }
        ],
        'linebreak-style': [
            'error',
            'unix',
        ],
        'quotes': [
            'error',
            'single',
            { allowTemplateLiterals: true }
        ],
        'semi': [
            'error',
            'always',
        ],
        'eqeqeq': 'error',
        'no-var': 'error',
        'prefer-const': 'error',
        'no-case-declarations': 'off',
        'no-unsafe-optional-chaining': [
            'error',
            { disallowArithmeticOperators: true }
        ],
        'no-unreachable-loop': 'error',
        'dot-location': [
            'error',
            'property'
        ],
        'array-callback-return': 'error',
        'dot-notation': 'error',
    }
};

// eslint-disable-next-line no-undef
module.exports = config;
