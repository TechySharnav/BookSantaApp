import { createStackNavigator } from "react-navigation-stack";
import bookDonateScreen from "../screen/bookDonateScreen";
import receiverDetailsScreen from "../screen/receiverDetailsScreen";

const StackNavigator = createStackNavigator(
  {
    BookDonate: {
      screen: bookDonateScreen,
      navigationOptions: {
        headerShown: false,
      },
    },
    ReceiverDetails: {
      screen: receiverDetailsScreen,
      navigationOptions: {
        headerShown: false,
      },
    },
  },
  {
    initialRouteName: "BookDonate",
  }
);

export default StackNavigator;
