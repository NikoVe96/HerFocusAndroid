import ModuleSlide from './ModuleSlide';
import NavigationButtons from './NavigationButtons';
import CompletionSlide from './Completion';
import ExerciseSection from './Exercises';
import { SafeAreaView, View } from 'react-native';
import Swiper from 'react-native-swiper';

export const DynamicModule = ({ route }) => {
    // (Keep your state and functions as needed)
    // Instead of a huge switch-case, your slides can be composed like this:

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

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <LearningProgressHeader
                progress={progress}
                moduleLength={moduleLength}
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
                    {/* Intro Slide */}
                    <ModuleSlide
                        scaleFactor={scaleFactor}
                        colors={colors}
                        imageSource={require('../../Assets/images/LearningFirst.png')}
                        markdownContent={intro1}>
                        <NavigationButtons
                            scaleFactor={scaleFactor}
                            colors={colors}
                            onNext={() => swiperRef.current.scrollBy(1)}
                            onBack={() => swiperRef.current.scrollBy(-1)}
                        />
                    </ModuleSlide>
                    {/* Repeat with other slides */}
                    {/* Exercise Slide Example */}
                    <ModuleSlide
                        scaleFactor={scaleFactor}
                        colors={colors}
                        imageSource={require('../../Assets/images/LearningFourth.png')}>
                        <ExerciseSection
                            sectionTitle={moduleName}
                            exercises={findExercises(subject)}
                            answers={answer}
                            onAnswerChange={handleAnswerChange}
                            onSaveAnswer={(label) => saveAnswer(moduleName, label, answer[label])}
                            savedFlags={saved}
                            scaleFactor={scaleFactor}
                            colors={colors}
                        />
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