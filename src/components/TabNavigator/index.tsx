import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeContainer from "../../pages/Home";
import MediaListContainer from "../../pages/MediaList";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeContainer} />
      <Tab.Screen name="Media List" component={MediaListContainer} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
