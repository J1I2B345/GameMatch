import { useDispatch, useSelector } from 'react-redux';
import { addNews } from '../redux/actions/index.js';
import { Link, useNavigate } from 'react-router-native';
import { connect } from 'react-redux';
import {
     StyleSheet,
     Button,
     TextInput,
     View,
     Text,
     TouchableWithoutFeedback,
     Keyboard,
     SafeAreaView,
     ScrollView,
     Image,
} from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';

const reviewSchema = yup.object({
     description: yup.string().required().min(1),
});

const CreateNews = () => {
     const dispatch = useDispatch();
     const navigation = useNavigate();
     const user = useSelector((state) => state.games.userProfile);

     const submit = (values, actions) => {
          console.log(values);
          dispatch(addNews(values));
          navigation('/news');
     };

     return (
          <SafeAreaView style={styles.container}>
               <ScrollView>
                    <View style={styles.portada}>
                         <Formik
                              initialValues={{
                                   title: '',
                                   description: '',
                                   author: [
                                        {
                                             img: user.img,
                                             username: user.username,
                                        },
                                   ],
                              }}
                              validationSchema={reviewSchema}
                              onSubmit={submit}
                         >
                              {(formikProps) => (
                                   <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                                        <View style={styles.form_container}>
                                             <Text style={styles.title_input}>New Post</Text>
                                             <TextInput
                                                  style={styles.input}
                                                  placeholder="Title"
                                                  onChangeText={formikProps.handleChange('title')}
                                                  value={formikProps.values.title}
                                                  onBlur={formikProps.handleBlur('title')}
                                             />
                                             <View style={styles.relleno}></View>
                                             <TextInput
                                                  style={{
                                                       ...styles.input,
                                                       height: 90,
                                                  }}
                                                  placeholder="Description"
                                                  onChangeText={formikProps.handleChange(
                                                       'description'
                                                  )}
                                                  value={formikProps.values.description}
                                                  onBlur={formikProps.handleBlur('description')}
                                             />
                                             <View style={styles.relleno}></View>
                                             <View
                                                  style={{
                                                       flexDirection: 'row',
                                                       width: '100%',
                                                       alignItems: 'center',
                                                       justifyContent: 'center',
                                                  }}
                                             >
                                                  <Link
                                                       to="/news"
                                                       activeOpacity={1}
                                                       underlayColor={''}
                                                       style={{
                                                            marginRight: '74%',
                                                            alignItems: 'center',
                                                            width: 28,
                                                            height: 35,
                                                            backgroundColor: '#cf1500',
                                                            borderRadius: 2,
                                                       }}
                                                  >
                                                       <Text
                                                            style={{
                                                                 paddingTop: 6.5,
                                                                 fontSize: 16,
                                                            }}
                                                       >
                                                            ✘
                                                       </Text>
                                                  </Link>
                                                  <Button
                                                       style={styles.button}
                                                       title="✔"
                                                       onPress={formikProps.handleSubmit}
                                                  />
                                             </View>
                                        </View>
                                   </TouchableWithoutFeedback>
                              )}
                         </Formik>
                    </View>
               </ScrollView>
          </SafeAreaView>
     );
};
const styles = StyleSheet.create({
     container: {
          height: '100%',
          width: '100%',
          alignItems: 'center',
     },
     portada: {
          marginBottom: 50,
          flexDirection: 'row',
     },
     portada_text: {
          marginBottom: 30,
          width: '80%',
          color: 'white',
          textAlign: 'center',
          fontSize: 45,
     },
     form_container: {
          width: '100%',
          alignItems: 'center',
     },
     title_input: {
          marginBottom: 8,
          width: '52%',
          color: 'white',
          textAlign: 'center',
          fontSize: 30,
     },
     input: {
          borderWidth: 1,
          backgroundColor: '#fff',
          height: 38,
          width: '80%',
          fontSize: 15,
          borderRadius: 20,
          textAlign: 'center',
          padding: 4,
     },
     errorText: {
          color: 'crimson',
          fontWeight: 'bold',
          marginBottom: 10,
          marginTop: 6,
     },
     relleno: {
          color: 'crimson',
          fontWeight: 'bold',
          marginTop: 15,
     },
     button: {
          margin: 'auto',
          marginTop: 60,
          height: 40,
          width: '60%',
          alignItems: 'center',
          borderRadius: 10,
          border: 'none',
          backgroundColor: '#98228C',
     },
     button_text: {
          marginTop: 6,
          fontSize: 20,
          width: '100%',
          textAlign: 'center',
          color: 'white',
     },
});

export default CreateNews;
