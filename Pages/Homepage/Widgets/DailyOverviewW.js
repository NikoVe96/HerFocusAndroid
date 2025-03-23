import { Text, View } from "react-native";
import { useTheme } from '@react-navigation/native';
import TaskProgress from "../../Structure components/TaskProgress";

function DailyOverviewW() {

    const { colors } = useTheme();

    return (
        <View style={{
            height: 200, padding: 10, backgroundColor: '#FFF6ED', elevation: 10, borderColor: colors.subButton, borderWidth: 1,
            borderRadius: 10
        }}>
            <TaskProgress />
        </View>
    );

}

export default DailyOverviewW;