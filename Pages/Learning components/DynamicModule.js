import ModuleSlide from './ModuleSlide';
import NavigationButtons from './NavigationButtons';
import CompletionSlide from './Completion';
import ExerciseSection from './Exercises';
import { SafeAreaView, View, Animated, Dimensions } from 'react-native';
import Swiper from 'react-native-swiper';
import LearningProgressHeader from '../../Components/LearningProgressHeader';
import { useRef, useState, useCallback } from 'react';
import { useNavigation, useTheme, useFocusEffect } from '@react-navigation/native';
import Parse from 'parse/react-native';
import Quiz from '../../Components/Quiz';
import KeyPoints from './KeyPoints';

export const DynamicModule = ({ route }) => {

    const [progress, setProgress] = useState(new Animated.Value(1));
    const navigation = useNavigation();
    const { module, subject, description, image, onNewCompletion } = route.params;
    const [intro1, setIntro1] = useState('');
    const [intro2, setIntro2] = useState('');
    const [intro3, setIntro3] = useState('');
    const [keyPoints, setKeyPoints] = useState([]);
    const [answer, setAnswers] = useState({});
    const [author, setAuthor] = useState('');
    const [book, setBook] = useState('');
    const swiperRef = useRef(null);
    const { colors } = useTheme();
    const moduleName = `${module.get('name')} ${module.get('subject')}`;
    const [expanded, setExpanded] = useState(-1);
    const { width, height } = Dimensions.get('window');
    const scaleFactor = Math.min(width / 375, height / 667);
    const [saved, setSaved] = useState({});
    const [notebookExercises, setNotebookExercises] = useState({});
    const quizText = 'Lad os tage en quiz for at hjælpe dig med at huske, hvad du har lært!';
    const [moduleDescription, setModuleDescription] = useState('');
    const [images, setImages] = useState([]);
    const imageMap = {
        confetti: require('../../Assets/images/icons/confetti.png'),
        'choice(1)': require('../../Assets/images/icons/choice(1).png'),
        'unstructured-data': require('../../Assets/images/icons/unstructured-data.png'),
        muscle: require('../../Assets/images/icons/muscle.png'),
        career: require('../../Assets/images/icons/career.png'),
        reset: require('../../Assets/images/icons/reset.png'),
        spa: require('../../Assets/images/icons/spa.png'),
        'thinking(2)': require('../../Assets/images/icons/thinking(2).png'),
        caution: require('../../Assets/images/icons/caution.png'),
        start: require('../../Assets/images/icons/start.png'),
        'clock(2)': require('../../Assets/images/icons/clock(2).png'),
        time: require('../../Assets/images/icons/time.png'),
        'success(1)': require('../../Assets/images/icons/success(1).png'),
        room: require('../../Assets/images/icons/room.png'),
        'time-management(1)': require('../../Assets/images/icons/time-management(1).png'),
        'calendar(1)': require('../../Assets/images/icons/calendar(1).png'),
        directions: require('../../Assets/images/icons/directions.png'),
        effort: require('../../Assets/images/icons/effort.png'),
        agenda: require('../../Assets/images/icons/agenda.png'),
        'customer-satisfaction': require('../../Assets/images/icons/customer-satisfaction.png'),
        expectation: require('../../Assets/images/icons/expectation.png'),
        'brain(1)': require('../../Assets/images/icons/brain(1).png'),
        'self-reflection': require('../../Assets/images/icons/self-reflection.png'),
        flask: require('../../Assets/images/icons/flask.png'),
        improve: require('../../Assets/images/icons/improve.png'),
        strategy: require('../../Assets/images/icons/strategy.png'),
        'daily-routine(1)': require('../../Assets/images/icons/daily-routine(1).png'),
        'positive-thinking': require('../../Assets/images/icons/positive-thinking.png'),
        specification: require('../../Assets/images/icons/specification.png'),
        headache: require('../../Assets/images/icons/headache.png'),
        'to-do-list': require('../../Assets/images/icons/to-do-list.png'),
        conversation: require('../../Assets/images/icons/conversation.png'),
        confusing: require('../../Assets/images/icons/confusing.png'),
        diamond: require('../../Assets/images/icons/diamond.png'),
        ear: require('../../Assets/images/icons/ear.png'),
        'relationship(1)': require('../../Assets/images/icons/relationship(1).png'),
        alzheimer: require('../../Assets/images/icons/alzheimer.png'),
        goal: require('../../Assets/images/icons/goal.png'),
        map: require('../../Assets/images/icons/map.png'),
        briefcase: require('../../Assets/images/icons/briefcase.png'),
        united: require('../../Assets/images/icons/united.png'),
        border: require('../../Assets/images/icons/border.png'),
        gender: require('../../Assets/images/icons/gender.png'),
        tired: require('../../Assets/images/icons/tired.png'),
        'psychology(2)': require('../../Assets/images/icons/psychology(2).png'),
        care: require('../../Assets/images/icons/care.png'),
        search: require('../../Assets/images/icons/search.png'),
        productivity: require('../../Assets/images/icons/productivity.png'),
        'goal(2)': require('../../Assets/images/icons/goal(2).png'),
        'self-growth': require('../../Assets/images/icons/self-growth.png'),
        fight: require('../../Assets/images/icons/fight.png'),
        'idea(2)': require('../../Assets/images/icons/idea(2).png'),
        'helping-hand': require('../../Assets/images/icons/helping-hand.png'),
        progress: require('../../Assets/images/icons/progress.png'),
        'think-out-of-the-box': require('../../Assets/images/icons/think-out-of-the-box.png'),
        medal: require('../../Assets/images/icons/medal.png'),
    };

    useFocusEffect(
        useCallback(() => {
            moduleContent();
        }, [])
    )

    const findExercises = () => {
        switch (module) {
            case 'Struktur og planlægning 1':
                [
                    { label: 'Alt eller intet' },
                    { label: 'Ignorer det gode' },
                    { label: 'Tænkefejl' },
                    { label: 'Gøre ting større end de er' },
                    { label: 'Spår fremtiden' },
                    { label: 'Følelses ræsonnement' },
                ]
                break;
            case 'Forstå AD(H)D hjernen 1':
                [
                    { label: 'test' },
                    { label: 'test' },
                ]
                break;
            default:
                break;
        }
    }

    const handleSlide = index => {
        Animated.parallel([
            Animated.timing(progress, {
                toValue: index + 1,
                duration: 2000,
                useNativeDriver: false,
            }),
        ]).start();
    };

    async function moduleContent() {
        let query = new Parse.Query('LearningModuleContent');
        query.contains('module', module.id);
        const Results = await query.find();
        setIntro1(Results[0].get('intro1'));
        setIntro2(Results[0].get('intro2'));
        setIntro3(Results[0].get('intro3'));
        setKeyPoints(Results[0].get('keyPoints'));
        setAuthor(Results[0].get('author'));
        setBook(Results[0].get('book'));
        setModuleDescription(Results[0].get('Description'));
        setImages(Results[0].get('images'));
        console.log(images);
    }

    async function handleCompletion() {
        const currentUser = await Parse.User.currentAsync();
        let query = new Parse.Query('Settings');
        query.contains('user', currentUser.id);
        const result = await query.first();

        const moduleName = `${module.get('name')} ${module.get('subject')}`;
        result.addUnique('modulesCompleted', moduleName);
        result.save();

        onNewCompletion();

        navigation.navigate('Module overview', {
            subject: subject,
            image: image,
            description: description,
        });
    }

    const handleAnswerChange = (exerciseName, answerText) => {
        setAnswers(prevAnswers => ({
            ...prevAnswers,
            [exerciseName]: answerText,
        }));
    };

    async function saveAnswer(moduleName, exerciseName, answerText) {
        const currentUser = await Parse.User.currentAsync();
        if (!currentUser) {
            return;
        }

        const ModuleAnswers = Parse.Object.extend('ModuleAnswers');
        const query = new Parse.Query(ModuleAnswers);

        query.equalTo('user', currentUser);
        query.equalTo('module', moduleName);
        let moduleAnswers = await query.first();

        if (!moduleAnswers) {
            moduleAnswers = new ModuleAnswers();
            moduleAnswers.set('user', currentUser);
            moduleAnswers.set('module', moduleName);
            moduleAnswers.set('answers', []);
        }

        const answers = moduleAnswers.get('answers');
        answers.push({
            exercise: exerciseName,
            answer: answerText,
        });
        moduleAnswers.set('answers', answers);

        try {
            await moduleAnswers.save();
            setSaved(prevSaved => ({
                ...prevSaved,
                [exerciseName]: true,
            }));
            console.log('Answer saved successfully!');
            console.log(moduleName, exerciseName, answerText);
        } catch (error) {
            console.error('Error while saving answer: ', error);
        }
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <LearningProgressHeader
                progress={progress}
                moduleLength={7}
                subject={subject}
                description={description}
                image={image}
            />
            <View style={{ flex: 8, backgroundColor: colors.light }}>
                <Swiper
                    loop={false}
                    showsPagination={false}
                    onIndexChanged={handleSlide}
                    scrollEnabled={false}
                    ref={swiperRef}>
                    <ModuleSlide
                        scaleFactor={scaleFactor}
                        colors={colors}
                        imageSource={imageMap[images[0]]}
                        markdownContent={moduleDescription}>
                        <NavigationButtons
                            scaleFactor={scaleFactor}
                            colors={colors}
                            onNext={() => swiperRef.current.scrollBy(1)}
                            onBack={() => swiperRef.current.scrollBy(-1)}
                        />
                    </ModuleSlide>
                    <ModuleSlide
                        scaleFactor={scaleFactor}
                        colors={colors}
                        imageSource={imageMap[images[1]]}
                        markdownContent={intro1}>
                        <NavigationButtons
                            scaleFactor={scaleFactor}
                            colors={colors}
                            onNext={() => swiperRef.current.scrollBy(1)}
                            onBack={() => swiperRef.current.scrollBy(-1)}
                        />
                    </ModuleSlide>
                    <ModuleSlide
                        scaleFactor={scaleFactor}
                        colors={colors}
                        imageSource={imageMap[images[2]]}
                        markdownContent={intro2}>
                        <NavigationButtons
                            scaleFactor={scaleFactor}
                            colors={colors}
                            onNext={() => swiperRef.current.scrollBy(1)}
                            onBack={() => swiperRef.current.scrollBy(-1)}
                        />
                    </ModuleSlide>
                    <ModuleSlide
                        scaleFactor={scaleFactor}
                        colors={colors}
                        imageSource={imageMap[images[3]]}
                        markdownContent={intro3}>
                        <NavigationButtons
                            scaleFactor={scaleFactor}
                            colors={colors}
                            onNext={() => swiperRef.current.scrollBy(1)}
                            onBack={() => swiperRef.current.scrollBy(-1)}
                        />
                    </ModuleSlide>
                    <ModuleSlide
                        scaleFactor={scaleFactor}
                        colors={colors}
                        imageSource={require('../../Assets/images/icons/choose.png')}
                        markdownContent={quizText}>
                        <Quiz
                            key={module.id}
                            subject={subject}
                            module={module.get('name')}
                            style={{ color: colors.darkText }}
                        />
                        <NavigationButtons
                            scaleFactor={scaleFactor}
                            colors={colors}
                            onNext={() => swiperRef.current.scrollBy(1)}
                            onBack={() => swiperRef.current.scrollBy(-1)}
                        />
                    </ModuleSlide>
                    <ModuleSlide
                        scaleFactor={scaleFactor}
                        colors={colors}
                        imageSource={require('../../Assets/images/icons/remember.png')}
                    >
                        <KeyPoints
                            keyPoints={keyPoints} />
                        <NavigationButtons
                            scaleFactor={scaleFactor}
                            colors={colors}
                            onNext={() => swiperRef.current.scrollBy(1)}
                            onBack={() => swiperRef.current.scrollBy(-1)}
                        />
                    </ModuleSlide>

                    {/* Completion Slide */}
                    <ModuleSlide scaleFactor={scaleFactor} colors={colors}>
                        <CompletionSlide
                            scaleFactor={scaleFactor}
                            colors={colors}
                            width={width}
                            book={book}
                            author={author}
                            onBack={() => swiperRef.current.scrollBy(-1)}
                            onComplete={handleCompletion}
                        />
                    </ModuleSlide>
                </Swiper>
            </View>
        </SafeAreaView>
    );
};

export default DynamicModule;