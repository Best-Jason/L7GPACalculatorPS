import React, {useState} from 'react'
import {Data} from "./Data";
import {TextInput, View, Text, Button} from "react-native";
import RNPickerSelect from 'react-native-picker-select';

const Add = ({navigation}) => {
    const [ModuleCode, setModuleCode] = useState('')
    const [ModuleName, setModuleName] = useState('');

    const [Semester, setSemester] = useState('Y1 Sem1');
    const [Grade, setGrade] = useState('A');

    const [ModuleCredit, setModuleCredit] = useState('');



    return (




        <View style={{padding: 10, marginTop: 50}}>


            {/*TextBox*/}
            {/*TextBox*/}
            {/*TextBox*/}





            {/*Module code input*/}
            <View style={{padding: 10}}>
                <Text style={{fontWeight:'bold'}}>Module Code:</Text>
                <TextInput style={{borderWidth: 1}}
                           onChangeText={(text)=> setModuleCode(text)}
                           maxLength={5}  //Restrict to max of 5 index

                />
            </View>



            {/*Module Name input*/}
            <View style={{padding: 10}}>
                <Text style={{fontWeight:'bold'}}>Module Name:</Text>
                <TextInput style={{borderWidth: 1}}
                           onChangeText={(text)=> setModuleName(text)}


                />
            </View>



            {/*Picker-Select Input*/}
            {/*Picker-Select Input*/}
            {/*Picker-Select Input*/}



            {/*Semester Type selection input*/}
            <View style={{padding: 10}}>
                <Text style={{fontWeight:'bold'}}>Semester:</Text>
                <RNPickerSelect
                    value={Semester}
                    onValueChange={(value) => setSemester(value)}
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


            {/*Grade Type selection input*/}
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


            {/*InputBox*/}
            {/*InputBox*/}
            {/*InputBox*/}

            {/*Module cred input*/}
            <View style={{padding: 10}}>
                <Text style={{fontWeight:'bold'}}>Module Credit: </Text>
                <TextInput style={{borderWidth: 1}}
                           onChangeText={(text)=> setModuleCredit(text)}
                           maxLength={2}  //Restrict to max of 2 digits
                />
            </View>







            {/*Submit*/}
            {/*Submit*/}
            {/*Submit*/}
            {/*Submit*/}






            {/*Submitting all the info from input boxes above*/}
            <Button title="SUBMIT"
                    onPress={() => {
                        if (!ModuleCode || !ModuleName || !Grade || !ModuleCredit) {
                            alert("Please fill in all fields.");
                            return;
                        }
                        const entry = {
                            code: ModuleCode,
                            name: ModuleName,
                            grade: Grade,
                            credit: ModuleCredit
                        };
                        let indexNum=0;


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

                        Data[indexNum].data.push(entry);
                        navigation.navigate('Home');
                    }}/>
        </View>
    );
};
export default Add;
