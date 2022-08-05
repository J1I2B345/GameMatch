import { View, Text, TextInput, Button } from 'react-native';
import { Link } from 'react-router-native'
import { Formik, useField } from 'formik'
import { useState } from 'react';
import { useNavigate } from 'react-router-native';

const FormikInputValue = ({name, ...props }) => {
    const [field, meta, helpers] = useField(name)
    return (
        <>
            <TextInput value={field.value} onChangeText={value => helpers.setValue(value)} style={{backgroundColor: "white", borderRadius: 20, width: "70%", height: "10%", fontSize:35, paddingLeft:15}} {...props}/>
            {meta.error && <Text style={{fontSize: 20}}>{meta.error}</Text>}
        </>
    )
}

const ranks = ["copper","bronze","silver","gold","platinum","diamond","champion"]

export default function FormRainbow (){
    const [error, setError] = useState({})
    const navigate = useNavigate();

    const initialValues = {
        division: "",
    }

    const validate = values => {
        const errors = {}


        if(!values.division){
            errors.division= "Role is required"
        } else if (!ranks.includes(values.division.toLowerCase())){
            errors.division = "the divisions are copper, bronze, silver, gold, platinum, diamond, champion"
        }
        setError(errors)
        return errors
    }

    return (
        <Formik validate={validate} initialValues={initialValues}  onSubmit={(values) => {
            navigate("/")
            console.log(values)
        }}>
            {({handleChange, handleSubmit, values})=> {
                return (
                <View style={{height: "100%", alignItems:"center", justifyContent:"space-evenly"}}>
                    <Text style={{fontSize: 45, color: "white"}}>Rainbow six</Text>
                    <FormikInputValue placeholder='Division' name="division"/>
                    {
                        Object.keys(error).length === 0 ?
                        <Button onPress={handleSubmit} title="Start" color="#98228C"/>
                        :
                        <></>
                    }
                </View>
                )
            }}    
        </Formik>
    );
};