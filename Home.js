import React from "react";
import {StyleSheet, Text, View, SectionList, TouchableOpacity, Image, Button, StatusBar, Alert} from "react-native";
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

    const renderSectionHeader = ({ section: { title, bgColor, colo, index } }) => {// remove receiving prop of ico and outline
        const gpa = parseFloat( calculateGPAPerSem(index)); // Converts GPA into a number for comparison
        const smile='smile'; //added default values for ico (if this line is place under const selectedIcon, it can't access it)
        const frown='frown';
        const selectedIcon = gpa < 2.0 ? frown : smile; // conditional icon selection (ternary operator)
        return (
            <View style={{ backgroundColor: bgColor, padding: 10 }}>
                <View style={{flexDirection:'row',justifyContent: 'space-between', alignItems: 'center', marginRight:10}}>
                    <Text
                    style={[styles.headerText, { color: colo }]}//removed outline, styles[outline]
                >
                    {title}
                    </Text>
                    <Icon style={styles.textOutline} name={selectedIcon} size={20} color={colo} />

                </View>
                <Text style={{ color: colo }}>GPA: {gpa}</Text>
            </View>
        );
    };

    const calculateGPAPerSem = (semesterIndex) => {
        let totalCredits = 0;
        let totalGradePoints = 0;

        const semesterData = Data[semesterIndex];

        if (semesterData && semesterData.data) {
            semesterData.data.forEach(item => {
                if (item && item.grade && item.credit) {
                    let gradePoint = -1;

                    if (item.grade === 'A') gradePoint = 4;
                    else if (item.grade === 'B+') gradePoint = 3.5;
                    else if (item.grade === 'B') gradePoint = 3;
                    else if (item.grade === 'C+') gradePoint = 2.5;
                    else if (item.grade === 'C') gradePoint = 2;
                    else if (item.grade === 'D+') gradePoint = 1.5;
                    else if (item.grade === 'D') gradePoint = 1;
                    else if (item.grade === 'E') gradePoint = 0.5;
                    else if (item.grade === 'F') gradePoint = 0;

                    if (gradePoint !== -1) {
                        totalCredits += parseInt(item.credit, 10);
                        totalGradePoints += gradePoint * parseInt(item.credit, 10);
                    }
                }
            });
        }

        return totalCredits === 0 ? 0 : (totalGradePoints / totalCredits).toFixed(2);
    };



    const calculateGPA = () => {
        let totalCredits = 0;
        let totalGradePoints = 0;

        Data.forEach(section => {
            section.data.forEach(item => {
                // Ensure item exists and has required properties
                if (item && item.grade && item.credit) {
                    let gradePoint = -1;

                    // Map grades to grade points
                    if (item.grade === 'A') gradePoint = 4;
                    else if (item.grade === 'B+') gradePoint = 3.5;
                    else if (item.grade === 'B') gradePoint = 3;
                    else if (item.grade === 'C+') gradePoint = 2.5;
                    else if (item.grade === 'C') gradePoint = 2;
                    else if (item.grade === 'D+') gradePoint = 1.5;
                    else if (item.grade === 'D') gradePoint = 1;
                    else if (item.grade === 'E') gradePoint = 0.5;
                    else if (item.grade === 'F') gradePoint = 0;

                    // Accumulate grade points and credits
                    if (gradePoint !== -1) {
                        totalCredits += parseInt(item.credit, 10);
                        //hello it's me Jason, parseInt turns string into integer basically
                        //eg.
                        // console.log(parseInt('123'));
                        //123 (default base-10)

                        // Radix is just the type you want it to convert to
                        // eg. console.log(parseInt('ff', 16));
                        // // 255 (lower-case hexadecimal)

                        totalGradePoints += gradePoint * parseInt(item.credit, 10);
                    }
                }
            });
        });

        // Calculate GPA (ternary operation)
        // (if total credit =0, then returns 0 to avoid dividing by zero)
        // else do (totalGradePoints / totalCredits) to 2 decimal place
        return totalCredits === 0 ? 0 : (totalGradePoints / totalCredits).toFixed(2);
    };

    return (
        <View style={{ marginBottom: 137, marginTop: 50 }}>
            <Text style={styles.title}>Modules GPA Calculator</Text>

            <Button title="Add Modules" onPress={() => {navigation.navigate('Add')}}
            />


            <SectionList
                sections={Data.map((section, index) => ({
                    ...section,
                    index,
                }))}
                renderItem={renderItem}
                renderSectionHeader={renderSectionHeader}
                keyExtractor={(item, index) => index.toString()}
            />
            {/*Calculate GPA*/}
            {/*Calculate GPA*/}
            <Button
                title="Calculate"
                onPress={() => {
                    const GPA = calculateGPA();
                    Alert.alert("GPA Calculation", `Your average GPA is: ${GPA}`, [{ text: "OK" }]);
                }}
            />
        </View>
    );
};


const styles = StyleSheet.create({
        headerText: {
            fontSize: 20,
            // margin: 10,
            textAlign: "left",
            fontWeight: "bold"
        },
        opacityStyle: {
            flexDirection: 'row',  // Align name and image horizontally
            borderWidth: 1,
            padding: 10,
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

        title:{
            fontSize: 20,
            textAlign: "center",
            fontWeight: "bold",
            color: "#f3f3f4",
            padding:20,
            backgroundColor:"red"

        },

        textOutline: {
            color: 'black', // Default text color
            fontWeight: 'bold',
            textShadowColor: 'black',
            textShadowRadius: 2, // Spread of the shadow
        },
        textOutline2: {
            color: 'black', // Default text color
            fontWeight: 'bold',
            textShadowColor: 'black',
            textShadowOffset: {width: -1, height: 1}, // Shadow directions
            textShadowRadius: 1, // Spread of the shadow
        },
    }
);

export default Home;

