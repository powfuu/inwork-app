import React, { useState, useEffect, useRef } from 'react';
import { NativeModules, BackHandler, Alert } from 'react-native'
import * as e from '../accountsettingsComponents'
import { MainView, BasicText, AddTouchable, SkilltagScrollView } from '../../../defaultStyles';
import projectsvg from '../../../resources/projects.png'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { HOST } from '@env'
import axios from 'axios'
import {
    SkypeIndicator,
  } from 'react-native-indicators';
export default function AccountSettings({ navigation }){
    const input = useRef(0)
    const [data,setData]=useState({
        banner:'default-profile-banner.png',
        pic:'default-profile-pic.png',
        type:'' 
    })
    const [loaded,setLoaded]=useState(false)
    const [tags,setTags]=useState([])
   const [iStatus,setIStatus]=useState('rgb(210,210,210)')
   const [i,setI]=useState('')
const getData = async() =>{
        let httpToken = await AsyncStorage.getItem('@app:token')
axios.post(`${HOST}/api/get-user-data`,
        {  }, { headers: {'Authorization': `${httpToken}`} }).then((req)=>{
            if(req.data.data){
                setData(req.data.data);
                axios.post(`${HOST}/api/get-tags`, { 
                    email:req.data.data.email
                 }).then((reqt)=>{
if(reqt.data.tags){ 
setTags(reqt.data.tags)
}
                 })
                }
    })
    }
const updateSkills = () =>{
    var format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
        if(i.length >= 1 && !format.test(i)){
axios.post(`${HOST}/api/update-tags`,{
        email:data.email,
        skill:i[0].toUpperCase()+i.slice(1),
        type:data.type
      }).then((req)=>{
        if(req.data.updatedTags){
            input.current.clear()
            setI('')
            setTags(tags => [...tags, { tag: `${i}` }]);
        }
      })
        }else{
            Alert.alert('Oops','Error, fields are empty or have special characters.')
        }
    }


   useEffect(()=>{ 
        getData()
 BackHandler.addEventListener('hardwareBackPress', (e)=>{
                navigation.navigate('Main')
        });
        setTimeout(()=>{
         setLoaded(true)
        }, 800)
    },[])

    return(
        <MainView>
{loaded === false ? <e.LoaderView>
        <SkypeIndicator color={'#000'}/>
     </e.LoaderView> : null}  
        <e.TitleViewSection>
            <e.TitleSectionIc name="tag" color="black" size={26}/>
            <e.TitleSection>{data.type === 'business' ? 'Tags' : 'Skills'}</e.TitleSection>
        </e.TitleViewSection>
        <e.SectionView mgtop={24} mgleft={20}>
            <e.SectionViewInputHash ref={input} fg={iStatus} onChangeText={(event)=>{
                            setI(event)
                    }} onFocus={()=>setIStatus('#212121')} onBlur={()=>setIStatus('rgb(210,210,210)')} placeholder={data.type === "business" ? `#Tag` : `#Skill`}/>
        <AddTouchable onPress={updateSkills}>
        <e.AddHashButton>
{data.type === 'business' ? 'Add Tag' : 'Add Skill'}
        </e.AddHashButton>
        </AddTouchable>
 
        {
        loaded === true ? tags.length >= 1 ? <e.SectionView mgtop={24} mgleft={0}>
            <e.SectionViewRow mgtop={-25} mgleft={0}>
                <e.SectionViewRowIc name="clear-all" color="black" size={26}/>
                <e.SectionViewRowTitle>{tags.length}</e.SectionViewRowTitle>
            </e.SectionViewRow>
            <SkilltagScrollView overScrollMode="never" height={65} mtop={33} mleft={0}>
                {tags.slice(0).reverse().map((skt, KEY)=>{
                    return(
                        <e.SkilltagsView key={KEY}>
                            <e.SkilltagItem>#{skt.tag}</e.SkilltagItem>
                            <AddTouchable onPress={(e)=>{
               Alert.alert(
                    `Are you sure you want to remove #${skt.tag}?`,
                    "you cand add it again on any time.",
                    [
                      {
                        text: "Cancel",
                        style: "cancel"
                      },
                      { text: "OK", onPress: () => {
              setTags(tags.filter(tags => tags.id !== skt.id));
              axios.post(`${HOST}/api/remove-tag`,{
                email:skt.email,
                id:skt.id
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
        </e.SectionView>
    : <e.EmptySectionView>
        <e.EmptySectionImg resizeMode="contain" source={projectsvg}/>
        <e.EmptySectionTitle>You have not update any { data.type === 'business' ? "Tag" : "Skill" }.</e.EmptySectionTitle>
       </e.EmptySectionView> : null
            }
{loaded === true ? <e.CirclesViewCustom mtop={5}>
            <AddTouchable onPress={()=>navigation.navigate('Main')}>
            <e.CircleView bg="#212121">
                    <e.CircleIc name="keyboard-backspace" size={23} color="white"/>
                </e.CircleView>
            </AddTouchable>
</e.CirclesViewCustom> : null}

        </e.SectionView>
    
        </MainView>
    )
}
