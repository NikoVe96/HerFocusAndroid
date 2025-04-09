const moduleConfig = {
    '1 Struktur og planlægning': {
        title: "Planlægning og strukturering af hverdagen",
        image: require('../../Assets/images/icons/schedule.png'),
        progressField: 'progress',
        exerciseRenderer: () => (<MyStrukturExercise />),
    },
    '1 Forstå AD(H)D hjernen': {
        title: "Forstå AD(H)D hjernen",
        image: require('../../Assets/images/icons/attention-deficit-hyperactivity-disorder.png'),
        progressField: 'progress',
        exerciseRenderer: () => (<MyADHDExercise />),
    },
};

export default moduleConfig;
