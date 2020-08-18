export const presets = [
    // TESTS
    {
        'id': 'test',
        'label': 'Add test file',
        'description': '{fileName}.test.{ext}',
        'createFile': '{fileName}.test.{ext}',
        'importComponent': true
    },
    {
        'id': 'spec',
        'label': 'Add test file (spec)',
        'description': '{fileName}.spec.{ext}',
        'createFile': '{fileName}.spec.{ext}',
        'importComponent': true
    },
    // STYLES
    {
        'id': 'css_module',
        'label': 'Add CSS module',
        'description': '{fileName}.module.css',
        'createFile': '{fileName}.module.css',
        'importInComponentName': 'styles'
    },
    {
        'id': 'styles',
        'label': 'Add styles file',
        'description': '{fileName}.styles.{ext}',
        'createFile': '{fileName}.styles.{ext}',
        'importInComponentName': 'styles'
    },
];
