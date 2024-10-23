import React from 'react';
import { Provider } from 'react-redux';
import store from './src/redux/store'; // Adjust the path if necessary
import AppNavigation from './src/navigation/AppNavigation';
import Toast from "react-native-toast-message";

export default function App() {
    return (
        <Provider store={store}>
            <AppNavigation />
            <Toast ref={(ref) => Toast.setRef(ref)} />

        </Provider>
    );
}
