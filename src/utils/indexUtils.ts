function formatDate(date: string) {
    const now = new Date(date);
    const localDate = now.toLocaleDateString();
    const localTime = now.toLocaleTimeString();
    return `${localDate} às ${localTime}`;
}

export { formatDate };