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




            {/*Semester Type selection input*/}
            <View style={{padding: 10}}>
                <Text style={{fontWeight:'bold'}}>Semester:</Text>
                <RNPickerSelect
                    value={Semester}
                    onValueChange={setSemester}
                    items={[
                        {label: "Y1 Sem1", value: "Y1 Sem1"},
                        {label: "Y1 Sem2", value: "Y1 Sem2"},

                        {label: "Y2 Sem1", value: "Y2 Sem1"},
                        {label: 'Y2 Sem2', value: 'Y2 Sem2'},

                        {label: "Y3 Sem1", value: "Y3 Sem1"},
                        {label: "Y3 Sem2", value: "Y3 Sem2"},
                    ]}
                />
            </View>





            {/* BUTTONS */}
            <View style={{ padding: 10,flexDirection: 'row', justifyContent: 'space-between' }}>

                {/* SAVE BUTTON */}
                <View style={{flex:1, margin: 10}}>
                    <Button title="SAVE"
                            onPress={() => {
                                if (route.params.semester !== Semester) { //If there is a change in semester No.
                                    let oldIndexNum = 0;
                                    let newIndexNum = 0;

                                    // Set the old semester
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
                                    // set the new semester
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
                                    // If the semester slot hasn’t been made yet, make it now.
                                    if (!Data[newIndexNum]) {  // Check if the semester slot doesn't exist; if not, create it
                                        Data[newIndexNum] = { title: Semester, data: [] };// Initialize the slot with the semester title and an empty data array
                                    }
                                    Data[newIndexNum].data.push({ // Add the new module's data to the semester's data array
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


export default Edit;



//ChatGPT more cleaner ver.
//import React, { useState } from "react";
// import { Data } from "./Data";
// import { TextInput, View, Text, Button, Alert } from "react-native";
// import RNPickerSelect from "react-native-picker-select";
//
// const Edit = ({ navigation, route }) => {
//     const [MCode, setMCode] = useState(route.params.code);
//     const [name, setName] = useState(route.params.name);
//     const [Grade, setGrade] = useState(route.params.grade || null);
//     const [ModuleCredit, setModuleCredit] = useState(route.params.moduleCredit);
//     const [Semester, setSemester] = useState(route.params.semester || null);
//
//     const getSemesterIndex = (semester) => {
//         const semesterMap = {
//             "Y1 Sem2": 1,
//             "Y2 Sem1": 2,
//             "Y2 Sem2": 3,
//             "Y3 Sem1": 4,
//             "Y3 Sem2": 5,
//         };
//         return semesterMap[semester] || 0;
//     };
//
//     const updateData = () => {
//         const updatedModule = { code: MCode, name, grade: Grade, credit: ModuleCredit };
//         const oldIndexNum = getSemesterIndex(route.params.semester);
//         const newIndexNum = getSemesterIndex(Semester);
//
//         // Remove from old semester
//         Data[oldIndexNum]?.data.splice(route.params.index, 1);
//
//         // Add to new semester
//         if (!Data[newIndexNum]) {
//             Data[newIndexNum] = { title: Semester, data: [] };
//         }
//         Data[newIndexNum].data.push(updatedModule);
//     };
//
//     return (
//         <View style={{ padding: 10, marginTop: 50 }}>
//             {/* Module Code */}
//             <View style={{ padding: 10 }}>
//                 <Text style={{ fontWeight: "bold" }}>Module Code:</Text>
//                 <TextInput
//                     value={MCode}
//                     style={{ borderWidth: 1 }}
//                     onChangeText={setMCode}
//                     maxLength={5}
//                 />
//             </View>
//
//             {/* Module Name */}
//             <View style={{ padding: 10 }}>
//                 <Text style={{ fontWeight: "bold" }}>Module Name:</Text>
//                 <TextInput
//                     value={name}
//                     style={{ borderWidth: 1 }}
//                     onChangeText={setName}
//                 />
//             </View>
//
//             {/* Grade */}
//             <View style={{ padding: 10 }}>
//                 <Text style={{ fontWeight: "bold" }}>Grade:</Text>
//                 <RNPickerSelect
//                     value={Grade}
//                     onValueChange={setGrade}
//                     items={[
//                         { label: "A", value: "A" },
//                         { label: "B+", value: "B+" },
//                         { label: "B", value: "B" },
//                         { label: "C+", value: "C+" },
//                         { label: "C", value: "C" },
//                         { label: "D+", value: "D+" },
//                         { label: "D", value: "D" },
//                         { label: "E", value: "E" },
//                         { label: "F", value: "F" },
//                     ]}
//                 />
//             </View>
//
//             {/* Module Credit */}
//             <View style={{ padding: 10 }}>
//                 <Text style={{ fontWeight: "bold" }}>Module Credit:</Text>
//                 <TextInput
//                     value={ModuleCredit}
//                     style={{ borderWidth: 1 }}
//                     onChangeText={setModuleCredit}
//                 />
//             </View>
//
//             {/* Semester */}
//             <View style={{ padding: 10 }}>
//                 <Text style={{ fontWeight: "bold" }}>Semester:</Text>
//                 <RNPickerSelect
//                     value={Semester}
//                     onValueChange={setSemester}
//                     items={[
//                         { label: "Y1 Sem1", value: "Y1 Sem1" },
//                         { label: "Y1 Sem2", value: "Y1 Sem2" },
//                         { label: "Y2 Sem1", value: "Y2 Sem1" },
//                         { label: "Y2 Sem2", value: "Y2 Sem2" },
//                         { label: "Y3 Sem1", value: "Y3 Sem1" },
//                         { label: "Y3 Sem2", value: "Y3 Sem2" },
//                     ]}
//                 />
//             </View>
//
//             {/* Buttons */}
//             <View style={{ padding: 10, flexDirection: "row", justifyContent: "space-between" }}>
//                 <Button
//                     title="SAVE"
//                     onPress={() => {
//                         updateData();
//                         navigation.navigate("Home");
//                     }}
//                 />
//                 <Button
//                     title="DELETE"
//                     onPress={() =>
//                         Alert.alert("Are you sure?", "", [
//                             {
//                                 text: "Yes",
//                                 onPress: () => {
//                                     const indexNum = getSemesterIndex(Semester);
//                                     Data[indexNum]?.data.splice(route.params.index, 1);
//                                     navigation.navigate("Home");
//                                 },
//                             },
//                             { text: "No" },
//                         ])
//                     }
//                 />
//             </View>
//         </View>
//     );
// };
//
// export default Edit;