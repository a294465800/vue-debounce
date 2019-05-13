module.exports = {
	parser: '@typescript-eslint/parser',
	plugins: ['@typescript-eslint'],
	env: {
		browser: true,
		node: true
	},
	rules: {
		// @fixable 必须使用 === 或 !==，禁止使用 == 或 !=，与 null 比较时除外
		eqeqeq: [
			'error',
			'always',
			{
				null: 'ignore'
			}
		],
		// enable additional rules
		indent: ['error', 4],
		'linebreak-style': ['error', 'unix'],
		quotes: ['error', 'double'],
		semi: ['error', 'always'],

		// override default options for rules from base configurations
		'no-cond-assign': ['error', 'always'],

		// disable rules from base configurations
		'no-console': 'off'
	},
	parserOptions: {
		ecmaVersion: 6,
		sourceType: 'module',
		ecmaFeatures: {
			modules: true
		}
	}
};
