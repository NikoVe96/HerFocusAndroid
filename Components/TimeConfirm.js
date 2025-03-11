export const handleTimeConfirm = (date) => {
    const [time, setTime] = useState('');
    const [date, setDate] = useState(null);

    let minutes = date.getMinutes();
    let hours = date.getHours();

    if (minutes < 10) {
        minutes = '0' + date.getMinutes();
    }

    if (hours < 10) {
        hours = '0' + date.getHours();
    }

    setTime(hours
        + ':' + minutes);
    setDate(date);

    return (time, date)
};

export default handleTimeConfirm;