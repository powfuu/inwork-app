import React, { useEffect,useState, useRef } from 'react';
import { NativeModules, BackHandler, Alert } from 'react-native'
import * as e from '../accountsettingsComponents'
import { MainView, AddTouchable, SkilltagScrollView  } from '../../../defaultStyles';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { HOST } from '@env'
import axios from 'axios'
import nopic from '../../../resources/nopic.png'
import * as ImagePicker from 'expo-image-picker'
import * as FileSystem from 'expo-file-system';
export default function AccountSettings({navigation}) {
    const [data, setData] = useState({
        banner: 'default-profile-banner.png',
        pic: 'default-profile-pic.png',
        type: ''
    })
    const i1ref = useRef(0)
    const i2ref = useRef(0)
    const [i1Status, seti1Status] = useState('rgb(235,235,235)')
    const [i2Status, seti2Status] = useState('rgb(235,235,235)')
    const [image, setImage] = useState(null)
    const [hep, setHep] = useState([])
    const [experienceTitle, setExperienceTitle] = useState('')
    const [experienceDescription, setExperienceDescription] = useState('')
    const [base64i, setBase64] = useState('')
    const [changed, setChanged] = useState(false)
    const getData = async () => {
        let httpToken = await AsyncStorage.getItem('@app:token')
        axios.post(`${HOST}/api/get-user-data`,
            {}, {headers: {'Authorization': `${httpToken}`}}).then((req) => {
                if (req.data.data) {
                    setData(req.data.data);
                    axios.post(`${HOST}/api/get-experience`, {email: req.data.data.email}).
                        then((reqy) => {
                            if (reqy.data.experience) {
                                setHep(reqy.data.experience);
                            }
                        })
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
        } else {
            const fileSize = await checkFileSize(result.uri);
            if (fileSize.size <= 75684) {
            setImage(result);
            const base64 = await FileSystem.readAsStringAsync(result.uri, {encoding: 'base64'});
            setBase64(`data:image/png;base64,${base64}`)
        }else {
            Alert.alert('Maximum file size reached', 'Your image has passed our file size limit!')
        }
    }
}
    const updateExperience = async()=>{
        let httpToken = await AsyncStorage.getItem('@app:token')
      axios.post(`${HOST}/api/update-experience`, {
        email:data.email,
        experienceTitle:experienceTitle,
        experienceDescription:experienceDescription
      }).then(async(req)=>{
        if(req.data.experience){
            i1ref.current.clear()
            i2ref.current.clear()
            setImage(null)
            setExperienceTitle('')
            setExperienceDescription('')
            setBase64('')
            setHep(hep=> [...hep, { 
                experience_title:experienceTitle,
                experience_description:experienceDescription,
                blobimg:base64i,
                imagetmp:image
}])
if(image != null){ 
//update-experience-logo api
await axios.post(`${HOST}/api/update-experience-logo`, { base64:`${base64i}`, image:image.uri }, { headers: { Authorization: `${httpToken}` } })
}
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
                <e.TitleIc name="book-account" size={27} color="#000"/>     
                <e.TitleText>{data.type === "personal" ? "Experience" : "Projects"}</e.TitleText>
                <e.TitleLine></e.TitleLine>
            </e.TitleView>
            <e.SectionView style={{alignItems: "center"}} mgtop={18} mgleft={0}>
                <AddTouchable onPress={handleChoosePic}>
                <e.EpImage source={image != null ? image : nopic}/>
                </AddTouchable>
                <e.EpInputTitle ref={i1ref} onChangeText={(e)=>{ setExperienceTitle(e) }} fg={i1Status} onFocus={() =>{ seti1Status('#212121') }} onBlur={() =>{ seti1Status('rgb(235,235,235)')}} placeholder={data.type != "personal" ? "Project Title" : "Experience Title"}/>
                <e.EpInputDescription ref={i2ref} onChangeText={(e)=>{ setExperienceDescription(e) }} fg={i2Status} onFocus={() =>{ seti2Status('#212121') }} onBlur={() =>{ seti2Status('rgb(235,235,235)')}} multiline={true} placeholder="Description" />
            </e.SectionView>
            <AddTouchable onPress={updateExperience}>
            <e.CircleView style={{alignSelf:'flex-end', marginRight:45, marginTop:20}} bg="#212121">
                <e.Plus>+</e.Plus>
                </e.CircleView>
            </AddTouchable>
            <SkilltagScrollView overScrollMode="never" style={{marginLeft:20}} mtop={24} mleft={0} height={25}>
                {hep.slice(0).reverse().map((skt,KEY)=>{ 
                    return( 
                        <e.SkilltagsView key={KEY}>
                            <e.EpRow>
                                <e.SectionView mgtop={0} mgleft={0}>
                                    <e.EpImg source={skt.experience_logo === "nologo.png" || skt.experience_logo === null ? nopic : skt.imagetmp === undefined || skt.imagetmp === null ? { uri:skt.blobimg } : skt.imagetmp} />
                                </e.SectionView>
                                <e.SectionView mgtop={0} mgleft={0}>
                            <e.SkilltagItem style={{fontSize:16}}>{ skt.experience_title === "" ? "Empty Title" : skt.experience_title }</e.SkilltagItem>
                            <e.SkilltagItem style={{fontSize:12.5, marginTop:3, color:'#999',width:'82%'}}>{ skt.experience_description === "" ? "Empty Description" : skt.experience_description }</e.SkilltagItem>
                                </e.SectionView>
                            </e.EpRow>
                            <AddTouchable onPress={(e)=>{
               Alert.alert(
                    `Are you sure you want to remove ${skt.experience_title}?`,
                    "you cand add it again on any time.",
                    [
                      {
                        text: "Cancel",
                        style: "cancel"
                      },
                      { text: "OK", onPress: () => {
              setHep(hep.filter(hep => hep.id !== skt.id));
              axios.post(`${HOST}/api/remove-experience`,{
                email:skt.email,
                id:skt.id
              });
                      } }
                    ])
                            }}>
                            <e.RemoveSkilltag name="trash-can" size={27} style={{marginTop:2}} color="#ff4040"/>
                            </AddTouchable>
                        </e.SkilltagsView>
                    )
                })}
            </SkilltagScrollView>
<e.CirclesViewCustom mtop={20} style={{marginBottom:25}}>
            <AddTouchable onPress={()=>navigation.navigate('Main')}>
            <e.CircleView bg="#212121">
                    <e.CircleIc name="keyboard-backspace" size={23} color="white"/>
                </e.CircleView>
            </AddTouchable>
            </e.CirclesViewCustom>
        </MainView>
    )
}
