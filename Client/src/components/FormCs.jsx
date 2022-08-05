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

const ranks = ["silver", "nova", "master guardian", "sheriff", "eagle", "legendary eagle", "supreme", "global elite"]
const roles  = ["awper", "first entry", "second entry", "support", "second awper", "IGL", "any"]

export default function FormCs (){
    const [error, setError] = useState({})
    const navigate = useNavigate();
    
    const initialValues = {
        role: "",
        rank: "",
    }

    const validate = values => {
        const errors = {}

        if(!values.role){
            errors.role= "Role is required"
        } else if (!roles.includes(values.role.toLowerCase())){
            errors.role = "the possibles roles are awper, first entry, second entry, support or second awper"
        }

        if(!values.rank){
            errors.rank= "Role is required"
        } else if (!ranks.includes(values.rank.toLowerCase())){
            errors.rank = "the possibles roles are silver, nova, master guardian, sheriff, eagle, legendary eagle, supreme, global elite" 
        }
        setError(errors)
        return errors
    }

    return (
        <Formik validate={validate} initialValues={initialValues}  onSubmit={(values) => {
            navigate("/playersCS")
            console.log(values)
        }}>
            {({handleChange, handleSubmit, values})=> {
                return (
                <View style={{height: "100%", alignItems:"center", justifyContent:"space-evenly"}}>
                    <Text style={{fontSize: 45, color: "white"}}>Counter Strike</Text>
                    <FormikInputValue placeholder='Role' name="role"/>
                    <FormikInputValue placeholder='Rank' name="rank"/>
                    {
                        
                        Object.keys(error).length === 0 ?
                        <Button onPress={handleSubmit} title="Start" color="#98228C"/>
                        :
                        <></>
                    }
                    {/* <Link to="/" style={{backgroundColor:"grey", borderRadius: 10, height:30, justifyContent:"center"}}>
                        <Text>Ir a sala de chats</Text>
                    </Link> */}
                </View>
                )
            }}    
        </Formik>
    );
};