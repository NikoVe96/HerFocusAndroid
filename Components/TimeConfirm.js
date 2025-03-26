import React, { useState, useEffect, useFocusEffect, useCallback } from 'react';

export const handleTimeConfirm = (date) => {
    const [time, setTime] = useState('');

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

    return (time)
};

export default handleTimeConfirm;