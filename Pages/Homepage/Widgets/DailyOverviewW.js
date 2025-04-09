import { Text, View } from "react-native";
import { useTheme } from '@react-navigation/native';
import TaskProgress from "../../Structure components/TaskProgress";
import TaskSorter from "../../Structure components/TaskSorter";

function DailyOverviewW({ completeTask }) {

    const { colors } = useTheme();
    const today = new Date();

    return (
        <View style={{
            backgroundColor: colors.light, elevation: 10, borderColor: colors.middle, borderWidth: 1,
            borderRadius: 10
        }}>
            <TaskSorter
                date={today}
                completeTask={completeTask} />
        </View>
    );

}

export default DailyOverviewW;