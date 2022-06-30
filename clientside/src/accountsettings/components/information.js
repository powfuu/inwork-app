import React, { useEffect,useState, useRef } from 'react';
import { NativeModules, BackHandler, Alert } from 'react-native'
import * as e from '../accountsettingsComponents'
import { MainView, AddTouchable, SkilltagScrollView  } from '../../../defaultStyles';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { HOST } from '@env'
import axios from 'axios'
import * as ImagePicker from 'expo-image-picker'
import * as FileSystem from 'expo-file-system';
import nobanner from '../../.files/database/default-profile-banner.png'
import nopic from '../../.files/database/default-profile-pic.png'

export default function AccountSettings({navigation}) {
    const [data, setData] = useState({
        banner: 'default-profile-banner.png',
        pic: 'default-profile-pic.png',
        type: ''
    })
    const [i1, setI1] = useState('')
    const [i2, setI2] = useState('')
    const [i3, setI3] = useState('')
    const [i4, setI4] = useState('')
    const [i1Status, setIStatus1] = useState('rgb(235,235,235)')
    const [i2Status, setIStatus2] = useState('rgb(235,235,235)')
    const [i3Status, setIStatus3] = useState('rgb(235,235,235)')
    const [i4Status, setIStatus4] = useState('rgb(235,235,235)')
    const [namea,setName] =useState('')
    const [lastname, setLastname] =useState('')
    const [profession, setProfession] = useState('')
    const [businessName, setBusinessName] = useState('')
    const [description, setDescription] = useState('')
    const [nonBasePic, setNonBasePic] = useState('')
    const [nonBaseBanner, setNonBaseBanner] = useState('')
    const [base64pic, setBase64pic] = useState('')
    const [base64banner, setBase64banner] = useState('')

    const getData = async () => {
        let httpToken = await AsyncStorage.getItem('@app:token')
        axios.post(`${HOST}/api/get-user-data`,
            {}, {headers: {'Authorization': `${httpToken}`}}).then((req) => {
                if (req.data.data) {
                    setData(req.data.data);
                    setName(req.data.data.name.split(' ')[0])
                    setLastname(req.data.data.name.split(' ')[1])
                    setBusinessName(req.data.data.name)
                    setProfession(req.data.data.profession)
                    setDescription(req.data.data.biography)
                    //change == null to != null, this is just for testing porpouse
                    req.data.data.pic != null ? setBase64pic(req.data.data.pic) : null
                    req.data.data.banner != null ? setBase64banner(req.data.data.banner) : null
                }
            })
    }
    const checkFileSize = async (fileURI) => {
        const fileSizeInBytes = await FileSystem.getInfoAsync(fileURI);
        return fileSizeInBytes;
    };
    const handleChoosePic = async () => {
        let httpToken = await AsyncStorage.getItem('@app:token')
        //no permissions needed
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: false,
            aspect: [4, 3],
            quality: .3,
        });
            if (result.cancelled) {

            }else{
        const fileSize = await checkFileSize(result.uri);
        if (fileSize.size <= 75684) {
                setNonBasePic(result)
                const base64 = await FileSystem.readAsStringAsync(result.uri, {encoding: 'base64'});
                setBase64pic(`data:image/png;base64,${base64}`)
        } else {
            Alert.alert('Maximum file size reached', 'Your image has passed our file size limit!')
        }
    }
}
    const handleChooseBanner = async () => {
        let httpToken = await AsyncStorage.getItem('@app:token')
        //no permissions needed
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: false,
            aspect: [4, 3],
            quality: .3,
        });
            if (result.cancelled) {
            }else{
        const fileSize = await checkFileSize(result.uri);
if (fileSize.size <= 75684) {
                setNonBaseBanner(result)
                const base64 = await FileSystem.readAsStringAsync(result.uri, {encoding: 'base64'});
                setBase64banner(`data:image/png;base64,${base64}`)
}else{ 
    Alert.alert('Maximum file size reached', 'Your image has passed our file size limit!')
}}
    }
        const updateInformation = async() =>{
        let httpToken = await AsyncStorage.getItem('@app:token')
      axios.post(`${HOST}/api/update-account`, {
        name:i1,
        lastname:i2,
        profession:i3,
        type:data.type,
        email:data.email,
        biography:i4,
        businessName:i1
      }, { headers: {'Authorization': `${httpToken}`}}).then(async(req)=>{
        if(req.data.updatedtask){
Alert.alert('Profile has been updated successfully', 'only the written fields/images are updated.')
          await AsyncStorage.setItem('@app:token',req.data.updatedtask)
axios.post(`${HOST}/api/update-pic`,{
base64: base64pic
},
           {headers: {'Authorization': `${httpToken}`}}).then(async(req)=>{
            if(req.data.updatedPic){
          await AsyncStorage.setItem('@app:token',req.data.updatedPic)
               }
axios.post(`${HOST}/api/update-banner`, { 
base64: base64banner
},
              {headers: {'Authorization': `${httpToken}`}}).then(async(req)=>{
                if(req.data.updatedBanner){
          await AsyncStorage.setItem('@app:token',req.data.updatedBanner)
                    }
              })
          })
        
        }
      })
        }
    
   useEffect(()=>{ 
        getData()
        BackHandler.addEventListener('hardwareBackPress', ()=>{
        navigation.navigate('Main')
        });
    },[])

    return(
        <MainView>
            <e.TitleView>
                <e.TitleIc name="account-edit" size={27} color="#000"/>     
                <e.TitleText>Information</e.TitleText>
                <e.TitleLine></e.TitleLine>
            </e.TitleView>
                <e.PicturesView>
                    <e.PicturesViewTitle>Your profile pictures</e.PicturesViewTitle>
                    <AddTouchable onPress={handleChooseBanner}>
                    <e.PictureBanner source={ base64banner == '' && nonBaseBanner == '' ? nobanner : base64banner == '' && nonBaseBanner != '' ? nonBaseBanner  : { uri: base64banner } }/>
            </AddTouchable>
                    <AddTouchable onPress={handleChoosePic}>
                        <e.PicturePic source={ base64pic == '' && nonBasePic == '' ? nopic : base64pic == '' && nonBasePic != '' ? nonBasePic : { uri: base64pic } }/>
                    </AddTouchable>
                </e.PicturesView>
            <e.ScrollViewInformation overScrollMode="never">
                <e.InformationView> 
                    <e.FormView>
                        <e.InformationTitle>{data.type === "personal" ? "Name" : "Business Name"}</e.InformationTitle>
                        <e.InformationInput fg={i1Status} onChangeText={(e) => {setI1(e);}} onFocus={() => { setIStatus1('#212121')}} onBlur={() => { setIStatus1('rgb(235,235,235)') }} placeholder={data.type=="personal" ? namea : businessName}/>
                    </e.FormView>
                {   data.type === 'personal' ?
                    <e.FormView>
                        <e.InformationTitle>Last Name</e.InformationTitle>
                        <e.InformationInput fg={i2Status} onChangeText={(e) => {setI2(e);}} onFocus={() => { setIStatus2('#212121')}} onBlur={() => { setIStatus2('rgb(235,235,235)') }} placeholder={lastname} />
                    </e.FormView> : null
                }
                    <e.FormView>
                    <e.InformationTitle>{data.type == 'personal' ? 'Profession | Specialization' : 'Business Specialization'}</e.InformationTitle>
                    <e.InformationInput fg={i3Status} onChangeText={(e) => {setI3(e);}} onFocus={() => { setIStatus3('#212121')}} onBlur={() => { setIStatus3('rgb(235,235,235)') }} placeholder={profession} />
                    </e.FormView>
 <e.FormView>
                    <e.InformationTitle>Description</e.InformationTitle>
                    <e.InformationInput multiline={true} style={{height:80,textAlignVertical:'top', paddingTop:12}} fg={i4Status} onChangeText={(e) => {setI4(e);}} onFocus={() => { setIStatus4('#212121')}} onBlur={() => { setIStatus4('rgb(235,235,235)') }} placeholder={description} />
                    </e.FormView>

                </e.InformationView>
                        <e.CirclesView style={{marginTop:0}}>
            <AddTouchable onPress={()=>navigation.navigate('Main')}>
            <e.CircleView bg="#212121">
                    <e.CircleIc name="keyboard-backspace" size={23} color="white"/>
                </e.CircleView>
            </AddTouchable>
                    <AddTouchable onPress={updateInformation}>
                    <e.CircleView style={{ marginTop:0, alignSelf: 'center'}} bg="dodgerblue">
                    <e.CircleIc name="check" size={23} color="white"/>
                </e.CircleView>

                    </AddTouchable>
    </e.CirclesView>
        </e.ScrollViewInformation>
        </MainView>
    )
}
