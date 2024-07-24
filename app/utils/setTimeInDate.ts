export default function setTimeInDate(date: any, time: string) {
	const [hours, minutes] = time.split(':');
	const newDate = new Date(date);
	newDate.setHours(Number(hours));
	newDate.setMinutes(Number(minutes));
	return newDate;
}
