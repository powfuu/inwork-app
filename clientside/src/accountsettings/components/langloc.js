import React, { useEffect,useState, useRef } from 'react';
import { NativeModules, BackHandler, Alert } from 'react-native'
import * as e from '../accountsettingsComponents'
import { MainView, AddTouchable, SkilltagScrollView  } from '../../../defaultStyles';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { HOST } from '@env'
import axios from 'axios'

export default function AccountSettings({ navigation }){
const options = [
"Beginner",
"Advanced",
"Native"
  ];
    const ival = useRef(0)
    const [rb,setRb]=useState("Beginner")
    const [data,setData]=useState({
        banner:'default-profile-banner.png',
        pic:'default-profile-pic.png',
        type:'' 
    })
    const [l1,setl1]=useState('')
    const [l2,setl2]=useState('')
    const [l1Status, setl1Status]=useState('rgb(235,235,235)')
    const [l2Status, setl2Status]=useState('rgb(235,235,235)')
    const [getl1,setgetl1]=useState('')
    const [getl2,setgetl2]=useState('')
    const l1ref = useRef(0)
    const l2ref = useRef(0)
    const [il, setil]=useState('rgb(225,225,225)')
    const [ilVal, setIlVal]=useState('')
    const [lang,setLang]=useState([])

  function setSelectedOption(selectedOption){
    setRb(selectedOption)
  }
    const updateLocation = async() =>{
        let location = l1 + ', ' + l2;
        let httpToken = await AsyncStorage.getItem('@app:token')
        if(l1.length >=2, l2.length >=2){
        axios.post(`${HOST}/api/update-location`,{
            location:location
        },{
            headers: {'Authorization': `${httpToken}`}
        }).then(async(req)=>{
            if(req.data.locationupdated){
                await AsyncStorage.setItem('@app:token',req.data.locationupdated)
                setgetl1(l1)
                setgetl2(l2)
                setl2('')
                setl1('')
                l1ref.current.clear()
                l2ref.current.clear()
                l1ref.current.blur()
                l2ref.current.blur()
            }
        })
        }else{
            Alert.alert('Oops','Your location fields are empty or maybe are too short!')
        }
    }
    const addlanguage = () =>{
        if(ilVal.length >=1){
            axios.post(`${HOST}/api/add-language`,{
                email:data.email,
                language:ilVal,
                language_skill:rb
            }).then((req)=>{
                if(req.data.result){
                    setLang(lang=> [...lang, { language: ilVal, language_skill: rb }])
                    setRb('Beginner')
                    setIlVal('')
                    ival.current.clear()
                }
            })
        }else if(ilVal.length === 0){
Alert.alert('Oops...', 'Language field is empty!')
        }
    }
    const getData = async() =>{
            let httpToken = await AsyncStorage.getItem('@app:token')
    axios.post(`${HOST}/api/get-user-data`,
            {  }, { headers: {'Authorization': `${httpToken}`} }).then((req)=>{
                if(req.data.data){
                    setData(req.data.data);
                    setgetl1(req.data.data.location.split(', ')[0])
                    setgetl2(req.data.data.location.split(', ')[1])
                //get links
                axios.post(`${HOST}/api/get-links`, {
                    email:req.data.data.email
                }).then((reqlinks) => {
                    if (reqlinks.data.links) {
                        setLinks(reqlinks.data.links)
                    }
                })
                //get languages
                axios.post(`${HOST}/api/get-languages`,{
                    email:req.data.data.email
                }).then((reql)=>{
                    if(reql.data.languages){
                        setLang(reql.data.languages)
                    }
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
                <e.TitleIc name="map-marker" size={27} color="#000"/>     
                <e.TitleText>Languages & Location</e.TitleText>
                <e.TitleLine></e.TitleLine>
             </e.TitleView>    
             <e.SectionView mgtop={22} mgleft={20} style={{borderBottomWidth:1,borderBottomColor:'rgb(235,235,235)',paddingBottom:10}}>
                     <e.LocatedText>Located in</e.LocatedText>
                 <e.LocatedView>
                     <e.LocatedInput ref={l1ref} fg={l1Status} onFocus={()=>{ setl1Status('#212121') }} onBlur={()=>{ setl1Status('rgb(235,235,235)') }} onChangeText={(e)=>{
                     setl1(e)
                     }} placeholder={getl1}/>
                     <e.Locatedcomma>,</e.Locatedcomma>
                     <e.LocatedInput ref={l2ref}  fg={l2Status} onFocus={()=>{ setl2Status('#212121') }} onBlur={()=>{ setl2Status('rgb(235,235,235)') }} onChangeText={(e)=>{
                     setl2(e)
                     }} placeholder={getl2}/>
                 </e.LocatedView>
                 <AddTouchable onPress={updateLocation}>
                 <e.UpdateLocationButton>
                     Update Location
                </e.UpdateLocationButton>
             </AddTouchable>
             </e.SectionView>
             
             <e.SectionView mgtop={18} mgleft={18}>
                 <e.SectionViewRow mgtop={0} mgleft={0}>
                 <e.InputLanguage ref={ival} fg={il} onChangeText={(e)=>{
                 setIlVal(e)
                 }} onFocus={()=>{ setil('#212121') }} onBlur={()=>{ setil('rgb(225,225,225)') }} placeholder="ex. English"/>
                     <AddTouchable onPress={addlanguage}>
                     <e.AddLanguageButton>+</e.AddLanguageButton>
                 </AddTouchable>
                 </e.SectionViewRow>
                 <e.SectionView mgtop={22} mgleft={-30} style={{flexDirection:'row', alignItems: 'center', justifyContent: 'center'}}>
                 {options.map((op,key)=>{
        const style = rb === op ? { backgroundColor:'#212121',color:'white' } : { color:'black' };
                 return( 
                 <AddTouchable key={key} onPress={()=>setSelectedOption(op)}>
                 <e.Rbt style={style}>{op}</e.Rbt>
                 </AddTouchable>
                 )
                 })}
                 </e.SectionView>
             <SkilltagScrollView style={{paddingTop:10}} overScrollMode="never" mtop={33} mleft={0} height={43}>
                 {lang.map((lan,KEY)=>{
                 return(
                        <e.SkilltagsView key={KEY}>
                            <e.SkilltagItem style={{fontSize:16}}>{lan.language}</e.SkilltagItem>
                            <e.SkilltagItem style={{fontSize:12.5, marginTop:3, color:'#999'}}>{lan.language_skill}</e.SkilltagItem>
                            <AddTouchable onPress={()=>{
               Alert.alert(
                    `Are you sure you want to remove ${lan.language} from your Languages list?`,
                    "you cand add it again on any time.",
                    [
                      {
                        text: "Cancel",
                        style: "cancel"
                      },
                      { text: "OK", onPress: () => {
              setLang(lang.filter(lang=> lang.id !== lan.id));
              axios.post(`${HOST}/api/remove-language`,{
                email:lan.email,
                id:lan.id
              });
                      } }
                    ])
                            }}>
                            <e.RemoveSkilltag name="trash-can" size={25} color="#ff4040"/>
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
             </e.SectionView>
        </MainView>
    )
}
