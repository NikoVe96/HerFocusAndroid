import Parse from 'parse/react-native';

export async function getDayEvents(day, userId) {
    const taskQuery = new Parse.Query('Task');
    const eventQuery = new Parse.Query('Events');
    const routineQuery = new Parse.Query('Routine');

    taskQuery.equalTo('user', { __type: 'Pointer', className: '_User', objectId: userId });
    taskQuery.equalTo('date', day);
    taskQuery.ascending('startTime');

    eventQuery.equalTo('user', { __type: 'Pointer', className: '_User', objectId: userId });
    eventQuery.equalTo('date', day);
    eventQuery.notEqualTo('allDay', true);
    eventQuery.ascending('startTime');

    routineQuery.equalTo('user', { __type: 'Pointer', className: '_User', objectId: userId });
    routineQuery.equalTo('calendarDate', day);
    routineQuery.ascending('startTime');

    const [tasks, events, routines] = await Promise.all([
        taskQuery.find(),
        eventQuery.find(),
        routineQuery.find(),
    ]);

    const allEvents = tasks.concat(events, routines).sort((a, b) => {
        const aTime = a.get('startTime');
        const bTime = b.get('startTime');
        if (aTime < bTime) return -1;
        if (aTime > bTime) return 1;
        return 0;
    });

    return { tasks, events, routines, allEvents };
}

export async function getAllDayEvents(day, userId) {
    const query = new Parse.Query('Events');
    query.equalTo('allDay', true);
    query.equalTo('date', day);
    query.equalTo('user', { __type: 'Pointer', className: '_User', objectId: userId });
    return await query.find();
}