import { View, Text, TextInput, Button, Image } from 'react-native';
import { Link } from 'react-router-native';
import { Formik, useField } from 'formik';
import { useState } from 'react';
import { useNavigate } from 'react-router-native';
import Nav from './Nav';

const FormikInputValue = ({ name, ...props }) => {
     const [field, meta, helpers] = useField(name);
     return (
          <>
               <TextInput
                    value={field.value}
                    onChangeText={(value) => helpers.setValue(value)}
                    style={{
                         backgroundColor: 'white',
                         borderRadius: 20,
                         width: '70%',
                         height: '10%',
                         fontSize: 35,
                         paddingLeft: 15,
                    }}
                    {...props}
               />
               {meta.error && <Text style={{ fontSize: 20 }}>{meta.error}</Text>}
          </>
     );
};

const roles = ['top', 'jungle', 'mid', 'adc', 'supp'];
const divisions = [
     'iron',
     'bronze',
     'silver',
     'gold',
     'platinum',
     'diamond',
     'master',
     'gran master',
     'challenger',
];

export default function FormLol() {
     const [error, setError] = useState({});
     const navigate = useNavigate();

     const initialValues = {
          role: '',
          division: '',
     };

     const validate = (values) => {
          const errors = {};

          if (!values.role) {
               errors.role = 'Role is required';
          } else if (!roles.includes(values.role.toLowerCase())) {
               errors.role = 'the possibles roles are Top, Jungle, Mid, ADC or Supp';
          }

          if (!values.division) {
               errors.division = 'Role is required';
          } else if (!divisions.includes(values.division.toLowerCase())) {
               errors.division =
                    'the possibles roles are iron, bronze, silver, gold, platinum, diamond, master, gran master or challenger';
          }

          setError(errors);
          return errors;
     };

     return (
          <View>
               <Formik
                    validate={validate}
                    initialValues={initialValues}
                    onSubmit={(values) => {
                         navigate('/playersLol');
                         console.log(values);
                    }}
               >
                    {({ handleChange, handleSubmit, values }) => {
                         return (
                              <View
                                   style={{
                                        height: '100%',
                                        alignItems: 'center',
                                        justifyContent: 'space-evenly',
                                   }}
                              >
                                   <Text
                                        style={{
                                             marginTop: -50,
                                             width: '80%',
                                             color: 'white',
                                             textAlign: 'center',
                                             fontSize: 45,
                                        }}
                                   >
                                        League of Legends
                                   </Text>
                                   <View
                                        style={{
                                             marginTop: -50,
                                             marginBottom: 20,
                                             height: 2,
                                             width: '90%',
                                             backgroundColor: '#98228C',
                                        }}
                                   ></View>
                                   <View
                                        style={{
                                             marginTop: -130,
                                        }}
                                   ></View>
                                   <FormikInputValue placeholder="Role" name="role" />
                                   <FormikInputValue placeholder="Division" name="division" />
                                   {Object.keys(error).length === 0 ? (
                                        <Button
                                             onPress={handleSubmit}
                                             title="Start"
                                             color="#98228C"
                                        />
                                   ) : (
                                        <></>
                                   )}
                                   <Link
                                        to="/selectgame"
                                        activeOpacity={1}
                                        underlayColor={''}
                                        style={{
                                             position: 'absolute',
                                             bottom: 80,
                                             left: 20,
                                             height: 45,
                                        }}
                                   >
                                        <Image
                                             source={require('../../assets/iconBack.png')}
                                             style={{ width: 50, height: 50 }}
                                        />
                                   </Link>
                              </View>
                         );
                    }}
               </Formik>
               <Nav />
          </View>
     );
}

{
     /* <View style={{height: "100%", alignItems: "center"}}>
     <Text style={{fontSize: 45, color: "white", marginTop: "10%"}}>League of Legends</Text>
     <View style={{width:"100%", alignItems:"center", height:"70%", justifyContent: 'space-evenly'}}>
     <View style={{width:"100%", alignItems:"center"}}>
     <Text style={{fontSize: 30, color: "white"}}>Role</Text>
     <TextInput onChangeText={handleChange} name="role" style={{backgroundColor: "white", borderRadius: 20, width: "70%", height: "27%"}}></TextInput>
     </View>
     <View style={{width:"100%", alignItems:"center"}}>
                        <Text style={{fontSize: 30, color: "white"}}>Division</Text>
                        <TextInput onChangeText={handleChange} name="division" style={{backgroundColor: "white", borderRadius: 20, width: "70%", height: "27%"}}></TextInput>
                    </View>
                    <Link onPress={handleSubmit} to="/" style={{backgroundColor: "#98228C", width: "50%", height: "10%", alignItems:"center", justifyContent:"center", borderRadius: 20}}>
                        <Text style={{fontSize: 30, color:"white"}}>Start</Text>
                    </Link>
                </View>
            </View> */
}
