export const numberFormatter = (value) => {
	// Helper parameters
	var dl = 2;
	var ts = ',';
	var ds = '.';

	// The regex
	var re = '\\d(?=(\\d{3})+' + (dl > 0 ? '\\D' : '$') + ')';

	// Formats the number with the decimals
	var num = value.toFixed(Math.max(0, ~~dl));

	// Returns the formatted number
	return (ds ? num.replace('.', ds) : num).replace(
		new RegExp(re, 'g'),
		'$&' + ts,
	);
};
