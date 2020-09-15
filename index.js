/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

const images = { 
    getImage: (value) => {
        if(value == "empty_ico")
            return images.empty_ico;
        if(value == "uncheck_ico")
            return images.uncheck_ico;
        if(value == "check_ico")    
            return images.check_ico;
        if(value == "cross_ico")    
            return images.cross_ico;
        if(value == "plus_ico")    
            return images.plus_ico;
        if(value == "white_plus_ico")    
            return images.white_plus_ico;
        if(value == "cross_ico")
            return images.cross_ico; 
        if(value == null)
            return images.empty_ico;
        if(value == false)
            return images.uncheck_ico;
        if(value == true)    
            return images.check_ico;
        if(value == "bibi")    
            return images.bibi;
         if(value == "white_arrow")    
            return images.white_arrow;
        if(value == "checking_ico")    
            return images.checking_ico;
        else
            return images.missing_texture;
    },
    white_plus_ico: require("./ico/white_plus_ico.png"),
    check_ico: require("./ico/check_ico.png"),
    cross_ico: require("./ico/cross_ico.png"),
    empty_ico: require("./ico/empty_ico.png"),
    plus_ico: require("./ico/plus_ico.png"),
    uncheck_ico: require("./ico/uncheck_ico.png"), 
    missing_texture: require("./ico/missing_texture.png"),
    bibi: require("./ico/bibi.png"),
    white_arrow: require("./ico/white_arrow.png"),
    checking_ico: require("./ico/checking_ico.png"),
}
export default images; 

AppRegistry.registerComponent(appName, () => App);
