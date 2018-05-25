const blocker = 'error'
const critical = 'warning'
const major = 'warning'
const minor = 'warning'

const propertyMessage = 'Используйте семантическую палитру или палитру цветов из @sbol/lib.ui (возможно, цвет следует добавить в палитру, если он вычисляемый)'
const commentMessage = 'Нежелательные комментарии: TODOs; ' +
    'stylelint-disable на несколько правил; ' +
    'stylelint-disable для одного правила без комментария к причине отключения, ' +
    'пример правильного использования: "stylelint-disable-line some-rule, comment: Развернутый текст с обоснованием"'
const classMessage = 'В css принято писать классы в kebab-case (нельзя использовать camelCase)'
const indentationMessage = 'Разрешены отступы х2 и х4. Для использования x2 укажите в своем .stylelintrc.js правило \'indentation\': [2, { severity: ' + major + ' }]'

const noColorRegexp = [
    '/#[a-fA-F0-9]{3,8}/',
    '/rgba\\(\\d{0,3}, ?\\d{0,3}, ?\\d{0,3}, ?[.\\d]+\\)/',
    '/rgb\\(\\d{0,3}, ?\\d{0,3}, ?\\d{0,3}\\)/',
    '/color\\(.+\\)/',
    '/transparent/'
]
const preventColors = {
    '/color/': noColorRegexp,
    '/box-shadow/': noColorRegexp,
    '/background/': noColorRegexp,
    '/outline/': noColorRegexp,
    '/border/': noColorRegexp,
    '/fill/': noColorRegexp,
    '/^--/': noColorRegexp
}

const ruleMatch = '\\b\\w+\\b(-\\b\\w+\\b)*(?!-)'
const disableMatch = 'stylelint-disable(-line)?'
const startsWith = '/^'

const oneRuleComment = startsWith + disableMatch + ' ' + ruleMatch + '(?!, comment: .{10,})/'
const noMultiDisable = startsWith + disableMatch + ' ' + ruleMatch + '(, ' + ruleMatch + ')+[^:]/'

const blackLists = {
    'function-url-scheme-blacklist':            [["ftp", "/^http/"], { severity: blocker }],
    'selector-pseudo-class-blacklist':          ['/^nth-/', { severity: major }],
    'comment-word-blacklist':                   [['/^TODO/', oneRuleComment, noMultiDisable], { severity: major, message: commentMessage }],
    'declaration-property-value-blacklist':     [preventColors, { severity: major, message: propertyMessage }],
    'at-rule-blacklist':                        null,
    'media-feature-name-blacklist':             null,
    'selector-attribute-operator-blacklist':    null,
    'declaration-property-unit-blacklist':      null,
    'function-blacklist':                       null,
    'unit-blacklist':                           null,
    'property-blacklist':                       [['font', 'font-family'], { severity: major, message: 'Использование font-family в проектах запрещено' }],
}

const whiteLists = {
    'at-rule-whitelist':                        null,
    'selector-pseudo-class-whitelist':          null,
    'media-feature-name-whitelist':             null,
    'selector-attribute-operator-whitelist':    null,
    'declaration-property-unit-whitelist':      null,
    'declaration-property-value-whitelist':     null,
    'unit-whitelist':                           null,
    'function-url-scheme-whitelist':            null,
    'function-whitelist':                       null,
    'property-whitelist':                       null,
}

const beforeSpace = {
    'block-closing-brace-space-before':             ['always-single-line', { severity: critical }],
    'block-opening-brace-space-before':             ['always', { severity: critical }],
    'declaration-bang-space-before':                ['always', { severity: critical }],
    'media-feature-range-operator-space-before':    ['always', { severity: critical }],
    'declaration-block-semicolon-space-before':     ['never', { severity: critical }],
    'function-comma-space-before':                  ['never', { severity: critical }],
    'at-rule-semicolon-space-before':               ['never', { severity: critical }],
    'media-query-list-comma-space-before':          ['never', { severity: critical }],
    'selector-list-comma-space-before':             ['never', { severity: critical }],
    'media-feature-colon-space-before':             ['never', { severity: critical }],
    'selector-attribute-operator-space-before':     ['never', { severity: critical }],
    'selector-combinator-space-before':             ['always', { severity: major }],
    'value-list-comma-space-before':                ['never', { severity: major }],
    'declaration-colon-space-before':               ['never', { severity: major }],
}

const afterSpace = {
    'media-feature-colon-space-after':          ['always', { severity: critical }],
    'media-feature-range-operator-space-after': ['always', { severity: critical }],
    'at-rule-name-space-after':                 ['always-single-line', { severity: critical }],
    'selector-list-comma-space-after':          ['always-single-line', { severity: critical }],
    'block-opening-brace-space-after':          ['always-single-line', { severity: critical }],
    'declaration-block-semicolon-space-after':  ['always-single-line', { severity: critical }],
    'selector-attribute-operator-space-after':  ['never', { severity: critical }],
    'declaration-bang-space-after':             ['never', { severity: critical }],
    'declaration-colon-space-after':            ['always-single-line', { severity: major }],
    'value-list-comma-space-after':             ['always-single-line', { severity: major }],
    'function-comma-space-after':               ['always-single-line', { severity: major }],
    'media-query-list-comma-space-after':       ['always-single-line', { severity: major }],
    'selector-combinator-space-after':          ['always', { severity: major }],
}

const beforeLine = {
    'media-query-list-comma-newline-before':        ['never-multi-line', { severity: critical }],
    'block-closing-brace-newline-before':           ['always-multi-line', { severity: critical }],
    'block-opening-brace-newline-before':           ['never-single-line', { severity: critical }],
    'function-comma-newline-before':                ['never-multi-line', { severity: critical }],
    'declaration-block-semicolon-newline-before':   ['never-multi-line', { severity: critical }],
    'block-closing-brace-empty-line-before':        ['never', { severity: critical }],
    'comment-empty-line-before':                    ['always', { except: ['first-nested'], ignore: ['stylelint-commands'], severity: major }],
    'declaration-empty-line-before':                ['always', { except: ['after-declaration', 'first-nested'], ignore: ['after-comment', 'inside-single-line-block'], severity: major }],
    'custom-property-empty-line-before':            ['always', { except: ['after-custom-property', 'first-nested'], ignore: ['after-comment', 'inside-single-line-block'], severity: major }],
    'at-rule-empty-line-before':                    ['always', { except: ['blockless-after-same-name-blockless', 'first-nested'], ignore: ['after-comment'], severity: major }],
    'rule-empty-line-before':                       ['always-multi-line', { except: ['first-nested'], ignore: ['after-comment'], severity: major }],
    'selector-list-comma-newline-before':           ['never-multi-line', { severity: major }],
    'value-list-comma-newline-before':              ['never-multi-line', { severity: major }],
}

const afterLine = {
    'declaration-block-semicolon-newline-after':    ['always', { severity: critical }],
    'function-whitespace-after':                    ['always', { severity: critical }],
    'at-rule-semicolon-newline-after':              ['always', { severity: critical }],
    'at-rule-name-newline-after':                   ['always-multi-line', { severity: critical }],
    'block-closing-brace-newline-after':            ['always-multi-line', { severity: critical }],
    'block-opening-brace-newline-after':            ['always-multi-line', { severity: critical }],
    'selector-list-comma-newline-after':            ['always', { severity: major }],
    'declaration-colon-newline-after':              ['always-multi-line', { severity: major }],
    'value-list-comma-newline-after':               ['always-multi-line', { severity: major }],
    'function-comma-newline-after':                 ['always-multi-line', { severity: major }],
    'media-query-list-comma-newline-after':         ['always-multi-line', { severity: major }],
}

const cases = {
    'at-rule-name-case':            ['lower', { severity: critical }],
    'selector-type-case':           ['lower', { severity: critical }],
    'media-feature-name-case':      ['lower', { severity: critical }],
    'selector-pseudo-element-case': ['lower', { severity: critical }],
    'selector-pseudo-class-case':   ['lower', { severity: critical }],
    'unit-case':                    ['lower', { severity: critical }],
    'value-keyword-case':           ['lower', { severity: critical }],
    'property-case':                ['lower', { severity: critical }],
    'function-name-case':           ['lower', { severity: critical }],
    'color-hex-case':               ['lower', { severity: major }],
}

const maxLimits = {
    'value-list-max-empty-lines':                       [0, { severity: critical }],
    'function-max-empty-lines':                         [0, { severity: critical }],
    'selector-max-empty-lines':                         [0, { severity: critical }],
    'number-max-precision':                             [2, { severity: critical }],
    'selector-max-specificity':                         ['1,4,2', { severity: major }],
    'declaration-block-single-line-max-declarations':   [1, { severity: major }],
    'selector-max-attribute':                           [2, { severity: major }],
    'selector-max-id':                                  [1, { severity: major }],
    'selector-max-type':                                [2, { severity: major }],
    'selector-max-universal':                           [0, { severity: blocker }],
    'max-empty-lines':                                  [1, { severity: major }],
    'max-line-length':                                  null,
    'max-nesting-depth':                                null,
    'selector-max-class':                               null,
    'selector-max-combinators':                         null,
    'selector-max-compound-selectors':                  null,
}

const vendorPrefixes = {
    'selector-no-vendor-prefix':            [true, { severity: major }],
    'value-no-vendor-prefix':               [true, { severity: major }],
    'property-no-vendor-prefix':            [true, { severity: major }],
    'media-feature-name-no-vendor-prefix':  null,
    'at-rule-no-vendor-prefix':             null,
}

const noUnknown = {
    'property-no-unknown':                  [true, { ignoreProperties: ["composes"], severity: blocker }],
    'unit-no-unknown':                      [true, { severity: blocker }],
    'at-rule-no-unknown':                   [true, { severity: blocker }],
    'selector-type-no-unknown':             [true, { severity: blocker }],
    'selector-pseudo-element-no-unknown':   [true, { severity: critical }],
    'media-feature-name-no-unknown':        [true, { severity: critical }],
    'selector-pseudo-class-no-unknown':     [true, { ignorePseudoClasses: ['global'], severity: critical }],
}

const noRules = {
    'declaration-block-no-duplicate-properties':            [true, { ignore: ['consecutive-duplicates-with-different-values'], severity: critical }],
    'declaration-block-no-redundant-longhand-properties':   [false, { ignoreShorthands: ["flex"], severity: critical }],
    'function-calc-no-unspaced-operator':                   [true, { severity: critical }],
    'block-no-empty':                                       [true, { severity: blocker }],
    'color-no-invalid-hex':                                 [true, { severity: blocker }],
    'font-family-no-duplicate-names':                       [true, { severity: critical }],
    'function-linear-gradient-no-nonstandard-direction':    [true, { severity: blocker }],
    'string-no-newline':                                    [true, { severity: critical }],
    'keyframe-declaration-no-important':                    [true, { severity: blocker }],
    'declaration-block-no-shorthand-property-overrides':    [true, { severity: critical }],
    'no-duplicate-selectors':                               [true, { severity: critical }],
    'no-empty-source':                                      [true, { severity: blocker }],
    'no-extra-semicolons':                                  [true, { severity: critical }],
    'no-invalid-double-slash-comments':                     [true, { severity: blocker }],
    'no-unknown-animations':                                [true, { severity: blocker }],
    'function-url-no-scheme-relative':                      [true, { severity: blocker }],
    'declaration-no-important':                             [true, { severity: critical }],
    'selector-descendant-combinator-no-non-space':          [true, { severity: critical }],
    'number-no-trailing-zeros':                             [true, { severity: critical }],
    'shorthand-property-no-redundant-values':               [true, { severity: critical }],
    'comment-no-empty':                                     [true, { severity: major }],
    'selector-no-qualifying-type':                          [true, { severity: major }],
    'length-zero-no-unit':                                  [true, { severity: critical }],
    'no-eol-whitespace':                                    [true, { severity: major }],
    'no-missing-end-of-source-newline':                     [true, { severity: major }],
    'color-no-hex':                                         null,
    'no-descending-specificity':                            null, // postcss вложенность делает данное правило практически противоречивым
}

const insides = {
    'function-parentheses-space-inside':                ['never-single-line', { severity: critical }],
    'function-parentheses-newline-inside':              ['always-multi-line', { severity: major }],
    'selector-attribute-brackets-space-inside':         ['never', { severity: critical }],
    'selector-pseudo-class-parentheses-space-inside':   ['never', { severity: critical }],
    'media-feature-parentheses-space-inside':           ['never', { severity: critical }],
    'comment-whitespace-inside':                        ['always', { severity: major }],
}

const patterns = {
    'selector-class-pattern':   ['^([a-z][a-z0-9]*)(-[a-z0-9]+)*$', { resolveNestedSelectors: true, severity: critical, message: classMessage }], // kebab-case
    'selector-nested-pattern':  ['^(&[^a-zA-Z])?', { severity: critical, message: classMessage }], // not starting from &Letter
    'custom-media-pattern':     null,
    'selector-id-pattern':      null,
    'custom-property-pattern':  null,
}

const quotes = {
    'function-url-quotes':          ['always', { severity: critical }],
    'selector-attribute-quotes':    ['always', { severity: critical }],
    'font-family-name-quotes':      ['always-where-required', { severity: major }],
    'string-quotes':                ['single', { severity: major }],
}

const common = {
    'declaration-block-trailing-semicolon':     ['always', { severity: minor }], // кандидат на переключение для минификации итоговых стилей?
    'number-leading-zero':                      ['always', { severity: major }],
    'color-hex-length':                         ['long', { severity: major }],
    'selector-pseudo-element-colon-notation':   ['double', { severity: major }],
    'font-weight-notation':                     ['named-where-possible', { severity: major }],
    'indentation':                              [4, { severity: major, message: indentationMessage }],
    'time-min-milliseconds':                    [170, { severity: major }], // самая короткая анимация = 0.17s
    'color-named':                              ['never', { severity: major }],
}

module.exports = {
    rules: Object.assign({},
        whiteLists,
        blackLists,
        beforeSpace,
        beforeLine,
        afterSpace,
        afterLine,
        cases,
        maxLimits,
        vendorPrefixes,
        noUnknown,
        noRules,
        insides,
        patterns,
        quotes,
        common
    )
}
