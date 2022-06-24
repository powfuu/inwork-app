import React, { useEffect, useState } from 'react';
import { NativeModules, BackHandler, Alert } from 'react-native'
import * as e from '../accountsettingsComponents'
import { MainView, BasicText, AddTouchable } from '../../../defaultStyles';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { HOST } from '@env'
import axios from 'axios'
export default function AccountSettings({ navigation }){
    const [data,setData]=useState({
        banner:'default-profile-banner.png',
        pic:'default-profile-pic.png',
        type:'' 
    })
    const [i1Status, seti1Status]=useState('rgb(225,225,225)')
    const [i2Status, seti2Status]=useState('rgb(225,225,225)')    
    const [i3Status, seti3Status]=useState('rgb(225,225,225)')    
    const [i4Status, seti4Status]=useState('rgb(225,225,225)')      
    const [i5Status, seti5Status]=useState('rgb(225,225,225)')
    const [i6Status, seti6Status]=useState('rgb(225,225,225)')    
    const [i1,setI1]=useState('')
    const [i2,setI2]=useState('')
    const [i3,setI3]=useState('')
    const [i4,setI4]=useState('')
    const [i5,setI5]=useState('')
    const [i6,setI6]=useState('')
    const [dsf1, setDsf1]=useState('ex. Android Developer');
    const [dsf2, setDsf2]=useState('ex. Ios Developer');
    const [dsf3, setDsf3]=useState('ex. Web Developer');
    const [dsk1, setDsk1]=useState('ex. Frontend Development');
    const [dsk2, setDsk2]=useState('ex. React.Js & React Native');
    const [dsk3, setDsk3]=useState('ex. Node.Js');

    const updatePreferences = () =>{
        axios.post(`${HOST}/api/update-preferences`, {
          email:data.email,
          sf1:i1,
          sf2:i2,
          sf3:i3,
          sk1:i4,
          sk2:i5,
          sk3:i6,
          name:data.name,
          location:data.location,
          biography:data.biography,
          profession:data.profession,
          pic:data.pic,
          banner:data.banner,
          id:data.id
        }).then((req)=>{
          if(req.data.updated){
            Alert.alert('Account Updated!', 'You has updated your preferences successfully, App will reload to update your preferences.', [{
                text:'Confirm & Restart',
                onPress: () => { NativeModules.DevSettings.reload() }
            }])
          }else if(req.data.notupdated){
            Alert.alert('Oops', 'Error while updating preferences.')
        }
        })
      }
       const getData = async() =>{
        let httpToken = await AsyncStorage.getItem('@app:token')
axios.post(`${HOST}/api/get-user-data`,
        {  }, { headers: {'Authorization': `${httpToken}`} }).then((req)=>{
            if(req.data.data){
                setData(req.data.data);
                axios.post(`${HOST}/api/get-preferences`, {
                    email:req.data.data.email
                  }).then((reqp)=>{
                    if(reqp.data.result){
                      if(reqp.data.result.searchingfor1.length >= 1){
                        setDsf1(reqp.data.result.searchingfor1)
                      }
                      if(reqp.data.result.searchingfor2.length >= 1){
                        setDsf2(reqp.data.result.searchingfor2)
                      }
                      if(reqp.data.result.searchingfor3.length >= 1){
                        setDsf3(reqp.data.result.searchingfor3)
                      }
                      if(reqp.data.result.searchingskill1.length >= 1){
                        setDsk1(reqp.data.result.searchingskill1)
                      }
                      if(reqp.data.result.searchingskill2.length >= 1){
                        setDsk2(reqp.data.result.searchingskill2)
                      }
                      if(reqp.data.result.searchingskill3.length >= 1){
                        setDsk3(reqp.data.result.searchingskill3)
                      }
                    }
                  })
                }
    })
    }
    useEffect(()=>{ 
        getData()
        BackHandler.addEventListener('hardwareBackPress', (e)=>{
                navigation.navigate('Main')
        });
     },[])
     
       return(
        <MainView>
            <e.TitleViewSection>
                <e.TitleSectionIc name="view-dashboard" color="black" size={26}/>
                <e.TitleSection>Preferences</e.TitleSection>
            </e.TitleViewSection>
            <e.SectionView mgtop={22} mgleft={20}>
                <e.SectionViewTitle>I'm Searching For</e.SectionViewTitle>
                <e.SectionViewDescription>Select at least 3 professions you want to search to your business (ex. Android Developer, Ios Developer, Web Developer) </e.SectionViewDescription>
                <e.SectionView mgtop={17} mgleft={0}>
                <e.SectionViewInput fg={i1Status}  onChangeText={(e)=> setI1(e)}onFocus={()=>seti1Status('#212121')} onBlur={()=> seti1Status('rgb(225,225,225)')} placeholder={dsf1}/>
                <e.SectionViewInput fg={i2Status} onChangeText={(e)=> setI2(e)} onFocus={()=>seti2Status('#212121')} onBlur={()=> seti2Status('rgb(225,225,225)')} placeholder={dsf2}/>
                <e.SectionViewInput fg={i3Status} onChangeText={(e)=> setI3(e)} onFocus={()=>seti3Status('#212121')} onBlur={()=> seti3Status('rgb(225,225,225)')} placeholder={dsf3}/>
                </e.SectionView>
                <e.SectionView mgtop={19} mgleft={0}>
            <e.SectionViewTitle>Skilled In</e.SectionViewTitle>
                <e.SectionViewDescription>Select at least 3 Skills (ex. Frontent Development, React.Js, React Native, Node.Js)</e.SectionViewDescription>
                <e.SectionView mgtop={19} mgleft={0}>
                <e.SectionViewInput fg={i4Status} onChangeText={(e)=> setI4(e)} onFocus={()=>seti4Status('#212121')} onBlur={()=> seti4Status('rgb(225,225,225)')} placeholder={dsk1}/>
                <e.SectionViewInput fg={i5Status} onChangeText={(e)=> setI5(e)} onFocus={()=>seti5Status('#212121')} onBlur={()=> seti5Status('rgb(225,225,225)')} placeholder={dsk2}/>
                <e.SectionViewInput fg={i6Status} onChangeText={(e)=> setI6(e)} onFocus={()=>seti6Status('#212121')} onBlur={()=> seti6Status('rgb(225,225,225)')} placeholder={dsk3}/>
                </e.SectionView>
                </e.SectionView>
            </e.SectionView>
            <e.CirclesView>
            <AddTouchable onPress={()=>{ 
                navigation.navigate('Main')
             }}>
                <e.CircleView bg="#212121">
                    <e.CircleIc name="keyboard-backspace" size={23} color="white"/>
                </e.CircleView>
            </AddTouchable>
            <AddTouchable onPress={updatePreferences}>
                <e.CircleView bg="dodgerblue">
                    <e.CircleIc name="check" size={23} color="white"/>
                </e.CircleView>
            </AddTouchable>
            </e.CirclesView>
        </MainView>
    )
}