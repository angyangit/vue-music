module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    "space-before-function-paren": ["error", {
      "anonymous": "always",
      "named": "never",
      "asyncArrow": "always"
    }],
    'indent': 0,
    'object-curly-spacing': ["error", "never"],
    "no-console": 'off',
    "quotes": [1, "single"],//引号类型
    "spaced-comment": 0,//注释风格不要有空格什么的
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
