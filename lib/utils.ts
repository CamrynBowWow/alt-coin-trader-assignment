export function getStatusStyles(status: ProductStatus) {
	switch (status) {
		case 'active':
			return 'bg-green-100 text-green-700';
		case 'pending':
			return 'bg-yellow-100 text-yellow-700';
		case 'inactive':
			return 'bg-gray-100 text-gray-700';
		default:
			return 'bg-gray-100 text-gray-700';
	}
}

export function formatDate(dateString: string): string {
	return dateFormatter.format(new Date(dateString));
}

const dateFormatter = new Intl.DateTimeFormat('en-ZA', {
	timeZone: 'Africa/Johannesburg',
	month: 'short',
	day: 'numeric',
	year: 'numeric',
});
