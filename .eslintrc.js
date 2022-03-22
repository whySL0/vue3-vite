module.exports = {
    extends: ['plugin:vue/vue3-essential', 'airbnb-base'],
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
    },
    plugins: ['vue'],
    rules: {
        // 自己配置的规则
        indent: [2, 4],
        'no-unused-vars': [2, {
            vars: 'all', // "local",允许声明未使用变量
            args: 'all', // 检查所有参数
        }],
        "import/no-absolute-path": [0], // 关闭不能使用绝对路径导入模块
    },
    "import/resolver": {
        "alias": {
            "map": [
                ["@", "./src"],
                ["views/", "./src/views/"],
            ],
            "extensions": [".ts", ".js", ".jsx", ".json", ".vue"],
        },
    },
    overrides: [{
        files: ['*.vue'],
        rules: {
            // 这里写覆盖vue文件的规则
            'no-unused-vars': [0]
        },
    }, ],
};