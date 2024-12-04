import React from "react";
import { StyleSheet, Text, View, SectionList, TouchableOpacity, Image,Button,StatusBar } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome6";
import {Data} from './Data';


const Home = ({navigation}) => {

    const renderItem = ({ item,index,section }) => {
        return (
            <TouchableOpacity style={styles.opacityStyle} onPress={() => navigation.navigate('Edit',

                // Is used for Edit.js in route.params.grade at the the top where usestates arw

                // !!!Important.

                // Eg, moduleCredit:item.credit =>
                // moduleCredit is FOR edit.js, in route.params.moduleCredit
                // item.credit is FROM Data.js, in {code: 'C207', name: 'Database Systems',grade: 'B', credit: '4'},

                {index: index,
                    semester:section.title, // Semester
                    code:item.code,
                    name:item.name,
                    grade:item.grade,
                    moduleCredit:item.credit, //Taken and Transform data from .credit in Data.js to .moduleCredit


                })}>
                {/* Name on the left */}
                <Text style={styles.CodeStyle}>{item.code}</Text>

                {/* Image on the right */}
                <Text style={styles.textStyle}>{item.name}</Text>
                <Text style={styles.GradeStyle}>{item.grade}</Text>
                <Text style={styles.GradeStyle}>{item.credit}</Text>

            </TouchableOpacity>
        );
    };

    const renderSectionHeader = ({ section: { title, bgColor,ico,colo,outline } }) => (

        <View style={{ backgroundColor: bgColor, padding:10 }}>

            <Text style={[styles.headerText, styles[outline], {color: colo }]}>

                <Icon name={ico} size={20} color={colo}  />

                {title}</Text>

        </View>
    );

    return (
        <View style={{ marginBottom: 20, marginTop: 50 }}>
            <Text style={styles.title}>Scarlet & Violet - 151 Expansion Pack</Text>

            <Button title="Add Pokemon button" onPress={() => {navigation.navigate('Add')}}
            />


            <SectionList
                sections={Data}
                renderItem={renderItem}
                renderSectionHeader={renderSectionHeader}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    );
};


const styles = StyleSheet.create({
        headerText: {
            fontSize: 20,
            margin: 10,
            textAlign: "center",
            fontWeight: "bold",
        },
        opacityStyle: {
            flexDirection: 'row',  // Align name and image horizontally
            borderWidth: 1,
            padding: 10,
            marginVertical: 5,
            alignItems: 'center',  // Center the items vertically
        },
        CodeStyle: {
            fontSize: 15,
            textAlign: "left",
            flex: 2,  // Ensure the text occupies available space
        },
        textStyle: {
            fontSize: 15,
            marginRight: 29,  // Add space between name and image
            textAlign: "left",
            flex: 4,  // Ensure the text occupies available space
        },
        GradeStyle: {
            fontSize: 15,
            textAlign: "left",
            flex: 1,  // Ensure the text occupies available space
        },
        imageStyle: {
            width: 200,  // Adjust image size
            height: 300, // Adjust image size
            borderRadius: 5,
        },
        textOutline: {
            color: 'black', // Outline color
            fontWeight: 'bold',
            textShadowColor: 'black',
            textShadowOffset: {width: -1, height: 1}, // Shadow directions
            textShadowRadius: 1, // Spread of the shadow
        },

        title:{
            fontSize: 20,
            textAlign: "center",
            fontWeight: "bold",
            color: "#f3f3f4",
            padding:20,
            backgroundColor:"red"

        },
        textOutline2: {
            color: 'black', // Outline color
            fontWeight: 'bold',
            textShadowColor: 'black',
            textShadowOffset: {width: -1, height: 1}, // Shadow directions
            textShadowRadius: 1, // Spread of the shadow
        },
    }
);

export default Home;

