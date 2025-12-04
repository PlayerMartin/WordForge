/** @type {import("prettier").Config} */
module.exports = {
	useTabs: true,
	tabWidth: 4,
	singleQuote: true,
	quoteProps: 'consistent',
	trailingComma: 'none',
	arrowParens: 'avoid',
	endOfLine: 'auto',

	plugins: ['prettier-plugin-tailwindcss']
};
