import React from 'react'
import { LineChart, YAxis, Grid } from 'react-native-svg-charts'
import { View, Text } from 'react-native'

import Header from './Header.js'; 
import StyleElements from './StyleElements.js';


class Stats extends React.PureComponent {

    static navigationOptions = {
        title: 'Train Screen',
        headerStyle: {
            backgroundColor: "#E1E3DD",
            textAlign: 'center',
        },
        header: props =>
            <Header style={StyleElements.header}/>
    }


    render(){


       

        const poids = [ 60, 60, 65, 65, 70, 70, 70, 75];  // tabeau des poids sur 2 mois

 
        const contentInset = { top: 20, bottom: 20 }
 
        return (

        <View>
            <View style={{ height: 200, flexDirection: 'row' }}>
                    <YAxis
                        data={ poids }
                        contentInset={ contentInset }
                        svg={{
                            fill: '#d32f2f',
                            fontSize: 12,
                        }}
                        numberOfTicks={ 10 }
                        formatLabel={ value => `${value}Kg` }
                    />
                    <LineChart
                        style={{ flex: 1, marginLeft: 10 }}
                        data={ poids }
                        svg={{ stroke: 'rgb(211, 41, 41)' }}
                        contentInset={ contentInset }
                    >
                        <Grid/>
                    </LineChart>
                </View>
                <View style={{ flex: 1, marginHorizontal: 100}}>
                    <Text style={{ fontSize: 25, textAlign: 'auto', fontWeight: 'bold'}}>
                        RM : 80kg 
                    </Text>
                    <Text style={{ fontSize: 25, textAlign: 'auto', fontWeight: 'bold'}}>
                        Nom Exercice
                    </Text>
                </View> 

                <View style={{borderWidth:0, flex: 1, marginTop: 80, marginLeft: 5}}> 
                 <View style={{ width: 350,height: 40, backgroundColor: '#d32f2f'}}>
                     <Text style={{ textAlignVertical: 'center', color : '#fff1f1', fontWeight: 'bold', fontSize: 20}}>
                         Historique : 
                     </Text>

                 </View>
                         <View style={{ flex: 1, flexDirection: 'row'}}>

                            <View style={{ height: 25, width: 120, borderRightWidth: 1}}>
                                <Text style={{ textAlign: 'auto',fontSize: 20}}>
                                    jj/mm/aa
                                </Text>
                            </View> 
                            <View style={{ height: 25, width: 120, borderRightWidth: 1}}>
                                <Text style={{ textAlign: 'auto',fontSize: 20}}>
                                    poids
                                </Text>

                            </View>
                            <View style={{ height: 25, width: 110}}>
                                <Text style={{ textAlign: 'auto',fontSize: 20}}>
                                    reps
                                </Text>

                            </View>
                     
                         </View>

            </View>


        </View>  
        )
     }
 
}


export default Stats;
