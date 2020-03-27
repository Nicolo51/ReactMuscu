/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

const images = { 
    check_ico: require("./ico/check_ico.png"),
    cross_ico: require("./ico/cross_ico.png"),
    empty_ico: require("./ico/empty_ico.png"),
    plus_ico: require("./ico/plus_ico.png"),
    uncheck_ico: require("./ico/uncheck_ico.png"), 
}
export default images; 

AppRegistry.registerComponent(appName, () => App);
