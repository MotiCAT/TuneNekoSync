const pad = (num: number): string => ('' + num).padStart(2, '0');
export function seconds_to_time(seconds: number): string {
	const hours = Math.floor(seconds / 3600);
	seconds %= 3600;
	const minutes = Math.floor(seconds / 60);
	seconds %= 60;
	return (hours ? `${hours}:${pad(minutes)}` : minutes) + `:${pad(seconds)}`;
}

export function format_count(count: number): string {
	const views = new Intl.NumberFormat('ja-JP', {
		notation: 'compact'
	}).format(BigInt(count));
	return views;
}
