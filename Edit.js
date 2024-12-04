import React, { useState } from 'react';
import { Data } from './Data';
import { TextInput, View, Text, Button,Alert } from 'react-native';
import RNPickerSelect from "react-native-picker-select";

const Edit = ({ navigation, route }) => {
    const [MCode, setMCode] = useState(route.params.code); //
    const [name, setName] = useState(route.params.name); //
    const [Grade, setGrade] = useState(route.params.grade|| null);
    const [ModuleCredit, setModuleCredit] = useState(route.params.moduleCredit); //Taken from Home.js (moduleCredit)
    const [Semester, setSemester] = useState(route.params.semester|| null);


    return (
        <View style={{ padding: 10, marginTop: 50 }}>

            {/* Module Code input (Unable to verify if name matches the number)(Unless I have the whole datasheet of 151 name,img,num,type */}

            <View style={{ padding: 10 }}>
                <Text style={{ fontWeight: 'bold' }}>Module Code:</Text>

                <TextInput
                    value={MCode}
                    style={{ borderWidth: 1}}
                    onChangeText={(text) => setMCode(text)}
                    maxLength={5}
                />
            </View>



            {/* Module Name input */}

            <View style={{ padding: 10 }}>
                <Text style={{ fontWeight: 'bold' }}>Module Name</Text>
                <TextInput
                    value={name}
                    style={{ borderWidth: 1}}
                    onChangeText={(text) => setName(text)}
                />
            </View>

            {/* Module Grade input */}
            <View style={{padding: 10}}>
                <Text style={{fontWeight:'bold'}}>Grade:</Text>
                <RNPickerSelect
                    value={Grade}
                    onValueChange={(value) => setGrade(value)}
                    items={[
                        {label: "A", value: "A"},
                        {label: "B+", value: "B+"},
                        {label: "B", value: "B"},
                        {label: "C+", value: "C+"},
                        {label: "C", value: "C"},
                        {label: "D+", value: "D+"},
                        {label: "D", value: "D"},
                        {label: "E", value: "E"},
                        {label: "F", value: "F"}
                    ]}
                />
            </View>

            {/* Module Credit input */}

            <View style={{ padding: 10 }}>
                <Text style={{ fontWeight: 'bold' }}>Module Credit</Text>
                <TextInput
                    value={ModuleCredit}
                    style={{ borderWidth: 1}}
                    onChangeText={(text) => setModuleCredit(text)}
                />

            </View>




            {/*Too annoying to fix*/}
            {/*/!*Semester Type selection input*!/*/}
            {/*<View style={{padding: 10}}>*/}
            {/*    <Text style={{fontWeight:'bold'}}>Semester:</Text>*/}
            {/*    <RNPickerSelect*/}
            {/*        value={Semester}*/}
            {/*        onValueChange={(value) => setSemester(value)}*/}
            {/*        items={[*/}
            {/*            {label: "Y1 Sem1", value: "Y1 Sem1"},*/}
            {/*            {label: "Y1 Sem2", value: "Y1 Sem2"},*/}

            {/*            {label: "Y2 Sem1", value: "Y2 Sem1"},*/}
            {/*            {label: 'Y2 Sem2', value: 'Y2 Sem2'},*/}

            {/*            {label: "Y3 Sem1", value: "Y3 Sem1"},*/}
            {/*            {label: "Y3 Sem2", value: "Y3 Sem2"},*/}


            {/*        ]}*/}
            {/*    />*/}
            {/*</View>*/}





            {/* BUTTONS */}
            <View style={{ padding: 10,flexDirection: 'row', justifyContent: 'space-between' }}>

                {/* SAVE BUTTON */}
                <View style={{flex:1, margin: 10}}>
                    <Button title="SAVE"
                            onPress={() => {
                                if (route.params.semester !== Semester) {
                                    let oldIndexNum = 0;
                                    let newIndexNum = 0;

                                    if (route.params.semester === 'Y1 Sem2') {
                                        oldIndexNum = 1;
                                    } else if (route.params.semester === 'Y2 Sem1') {
                                        oldIndexNum = 2;
                                    } else if (route.params.semester === 'Y2 Sem2') {
                                        oldIndexNum = 3;
                                    } else if (route.params.semester === 'Y3 Sem1') {
                                        oldIndexNum = 4;
                                    } else if (route.params.semester === 'Y3 Sem2') {
                                        oldIndexNum = 5;
                                    }

                                    if (Semester === 'Y1 Sem2') {
                                        newIndexNum = 1;
                                    } else if (Semester === 'Y2 Sem1') {
                                        newIndexNum = 2;
                                    } else if (Semester === 'Y2 Sem2') {
                                        newIndexNum = 3;
                                    } else if (Semester === 'Y3 Sem1') {
                                        newIndexNum = 4;
                                    } else if (Semester === 'Y3 Sem2') {
                                        newIndexNum = 5;
                                    }

                                    // Remove from old semester
                                    Data[oldIndexNum].data.splice(route.params.index, 1);

                                    // Add to new semester
                                    if (!Data[newIndexNum]) {
                                        Data[newIndexNum] = { title: Semester, data: [] };
                                    }
                                    Data[newIndexNum].data.push({
                                        code: MCode,
                                        name: name,
                                        grade: Grade,
                                        credit: ModuleCredit,
                                    });
                                } else {
                                    // Update module in the same semester
                                    let indexNum = 0;

                                    if (Semester === 'Y1 Sem2') {
                                        indexNum = 1;
                                    } else if (Semester === 'Y2 Sem1') {
                                        indexNum = 2;
                                    } else if (Semester === 'Y2 Sem2') {
                                        indexNum = 3;
                                    } else if (Semester === 'Y3 Sem1') {
                                        indexNum = 4;
                                    } else if (Semester === 'Y3 Sem2') {
                                        indexNum = 5;
                                    }

                                    Data[indexNum].data[route.params.index].code = MCode;
                                    Data[indexNum].data[route.params.index].name = name;
                                    Data[indexNum].data[route.params.index].grade = Grade;
                                    Data[indexNum].data[route.params.index].credit = ModuleCredit;
                                }


                                // let indexNum=0
                                // if (Semester === 'Y1 Sem2') {
                                //     indexNum = 1;
                                //
                                // } else if (Semester === 'Y2 Sem1') {
                                //     indexNum = 2;
                                //
                                // } else if (Semester === 'Y2 Sem2') {
                                //     indexNum = 3;
                                //
                                // } else if (Semester === 'Y3 Sem1') {
                                //     indexNum = 4;
                                //
                                // } else if (Semester === 'Y3 Sem2') {
                                //     indexNum = 5;
                                // }
                                //
                                // if (!Data[indexNum] || !Data[indexNum].data[route.params.index]) {
                                //     alert("Invalid data reference. Please check your semester and module details.");
                                //     return;
                                // }
                                //
                                // if (route.params.semester !== Semester) {
                                //     // Remove from old semester
                                //     Data[indexNum].data.splice(route.params.index, 1);
                                //
                                //     // Add to new semester
                                //     if (!Data[indexNum]) {
                                //         Data[indexNum] = { title: Semester, data: [] };
                                //     }
                                //     Data[indexNum].data.push(updatedModule);
                                // } else {
                                //     // Update module in the same semester
                                //     Data[currentSemesterIndex].data[route.params.index] = updatedModule;
                                // }
                                //
                                //
                                // // Data to put in Data.js, make sure to refference correctly for eg. .credit (correct)  .moduleCredit (incorrect)
                                // Data[indexNum].data[route.params.index].code = MCode;
                                // Data[indexNum].data[route.params.index].name = name;
                                // Data[indexNum].data[route.params.index].grade = Grade;
                                // Data[indexNum].data[route.params.index].credit = ModuleCredit;

                                navigation.navigate('Home');
                            }}/>
                </View>

                {/* DELETE BUTTON */}
                <View style={{flex:1, margin: 10}}>
                    <Button title="DELETE"
                            onPress={() => {
                                let indexNum=0
                                if (Semester === 'Y1 Sem2') {
                                    indexNum = 1;

                                } else if (Semester === 'Y2 Sem1') {
                                    indexNum = 2;

                                } else if (Semester === 'Y2 Sem2') {
                                    indexNum = 3;

                                } else if (Semester === 'Y3 Sem1') {
                                    indexNum = 4;

                                } else if (Semester === 'Y3 Sem2') {
                                    indexNum = 5;
                                }
                                Alert.alert("Are you sure?", '',
                                    [{text:'Yes', onPress: () => {
                                            Data[indexNum].data.splice(route.params.index, 1);
                                            navigation.navigate('Home');
                                        }},
                                        {text: 'No'}])
                            }}
                    />
                </View>

            </View>




        </View>
    );
};
//Delete and add if route.params.index is equal to Semester usestate
// if route.params.semester != Semester => Data[indexNum].data.splice(route.params.index, 1);
// Data[indexNum].data[route.params.index].code = MCode;
// Data[indexNum].data[route.params.index].name = name;
// Data[indexNum].data[route.params.index].grade = Grade;
// Data[indexNum].data[route.params.index].credit = ModuleCredit;

export default Edit;
