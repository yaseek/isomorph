/* eslint-disable quote-props */

module.exports = {
    extends: './stylelint.rules',
    rules: {
        'indentation': 2,
        'number-leading-zero': 'never',
        //'rule-nested-empty-line-before': 'always-multi-line',
        //'rule-non-nested-empty-line-before': 'always',
        //'no-browser-hacks': true,
        'value-no-vendor-prefix': true,
        'property-no-vendor-prefix': true,
        'selector-no-vendor-prefix': true,
        //'no-underscore-dangle': [2, { 'allowAfterThis': true }]
    }
}
