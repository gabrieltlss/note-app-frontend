function captalizeStatus(status: string) {
    return status[0].toUpperCase() + status.slice(1);
}

function formatDate(date: string) {
    const now = new Date(date);
    const localDate = now.toLocaleDateString();
    const localTime = now.toLocaleTimeString();
    return `${localDate} às ${localTime}`;
}

export { captalizeStatus, formatDate };