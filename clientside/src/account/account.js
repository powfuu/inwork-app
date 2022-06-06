import React, { useEffect, useState } from 'react';
import { NativeModules, BackHandler, Alert } from 'react-native'
import * as e from './accountComponents'
import { MainView } from '../../defaultStyles';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useRoute } from '@react-navigation/native'
import { HOST } from '@env'
import axios from 'axios'
import non1 from '../../resources/projects.png'
import non2 from '../../resources/notfound.png'
import non3 from '../../resources/experience.png'
import non4 from '../../resources/nothing-to-show.png'

import {
    SkypeIndicator,
  } from 'react-native-indicators';

export default function Account({ navigation }){
    const props = useRoute().params;
    const [data,setData]=useState({
        banner:undefined,
        pic:undefined,
    });
    const [desc,setDesc]=useState('')
    const [ddtype,sddtype]=useState('')
    const [ddname,sddname]=useState('')
    const [tags,setTags]=useState([])
    const [hep,setHep]=useState([])
    const [links,setLinks]=useState([])
    const [languages,setLanguages]=useState([])
    const [starState, setStarState]=useState('star-outline')
    const [starVal, setStarVal]=useState()
    const [statusLoader, setStatusLoader]=useState(false)

    const requestMatch=async()=>{
        let apptoken = await AsyncStorage.getItem('@app:token')
        axios.post(`${HOST}/api/request-match`,{
            hrdemail: props.email,
            hrdtype: props.type
        }, {headers:{'Authorization':apptoken}}).then((req)=>{
            if(req.data.sendednewrequest){ 
            Alert.alert('Match request has been sended', `We'll send you soon a notification if the match request is accepted or declined.`) 
            }
            if(req.data.alreadysendedrequest){
            Alert.alert('Request match is in process!', `When account accepts or decline the request match we'll send you a notification. (if you don't send any match request you should check your notifications to see if you have the request match)`)
            }
            if(req.data.none){
            Alert.alert('You has already match with this account!', `Check your Chat list if you want to contact with this user!`)
            }
        })
    }
    const giveStar=async()=>{
        let apptoken = await AsyncStorage.getItem('@app:token')
        axios.post(`${HOST}/api/give-star`,
            {
                email:props.email,
                currentId:props.id,
                currentType:props.type
            },{ headers:{'authorization' : `${apptoken}`}}).then((req)=>{
                    if(req.data.pa_stars_updated === true){
                        setStarState('star')
                        }else{
                        setStarState('star-outline');
                        }    
                        setStarVal(req.data.counter)
            })
    }
    
    const accounthrd = async()=>{
let apptoken = await AsyncStorage.getItem('@app:token')
        BackHandler.addEventListener('hardwareBackPress', (e)=>{
    navigation.getParent()?.setOptions({ tabBarStyle: { display:'flex'} })
        });
    axios.post(`${HOST}/api/get-user-data-hrd`,
        {
            id:props.id,
            type:props.type[0].toLowerCase()
        })
    .then((req)=>{
        if(req.data.data){
            setData({
                pic:req.data.data.profile_pic,
                banner:req.data.data.profile_banner,
                stars:req.data.data.stars,
                email:req.data.data.email,
                profession:req.data.data.profession,
                location:req.data.data.location
            })
        axios.post(`${HOST}/api/remove-matchmaking`,{
            email:req.data.data.email,
            type:req.data.data.type
        })
            setStarVal(req.data.data.stars)
            axios.post(`${HOST}/api/set-search-trend`,{
                email:req.data.data.email,
                type:props.type[0].toLowerCase(),
            })
            axios.post(`${HOST}/api/get-star-state`,{
                email:req.data.data.email,
                type:props.type[0].toLowerCase()
            }, {headers:{'Authorization':`${apptoken}`}}).then((reqss)=>{
                if(reqss.data.ss){
                    reqss.data.ss === true ? setStarState('star') : setStarState('star-outline')
                }
            })
    if(props.type[0].toLowerCase()==='p'){
        sddname(`${req.data.data.name} ${req.data.data.lastname}`)
        sddtype('Personal')
    }
    if(props.type[0].toLowerCase()==='b'){
        sddname(`${req.data.data.name}`)
        sddtype('Business')
    }
            setDesc(req.data.data.biography.slice(0,255))
            //get links
            axios.post(`${HOST}/api/get-links`, {
                email:req.data.data.email
            }).then((reqlinks)=>{
                if(reqlinks.data.links){
                    setLinks(reqlinks.data.links)
                    // $('.links-div-content').fadeIn()
                }else if(reqlinks.data.emptylinks){
                    // $('.nolinks-div').fadeIn()
                }
            })
            //get languages
            axios.post(`${HOST}/api/get-languages`,{
                email:req.data.data.email
            }).then((reql)=>{
                if(reql.data.languages){
                    setLanguages(reql.data.languages)
                        // $('.languages-div-content').fadeIn();
                }else if(reql.data.emptylanguages){
                        // $('.nolanguages-div').fadeIn();
                }
            })
            //get tags
      axios.post(`${HOST}/api/get-tags`,{ 
          email:req.data.data.email 
        }).then((reqx)=>{
            if(props.type[0].toLowerCase()==='p'){
                // $('.personal-skills-t').fadeIn()
                // $('#notags-t').text('This user has not defined their skills!')
                // $('.experience-text').text('ABOUT ME | EXPERIENCE')
            }else if(props.type[0].toLowerCase()==='b'){
                // $('.experience-text').fadeIn()
                // $('.business-tags-t').fadeIn()
                // $('#notags-t').text('This business has not defined any tag!')
                // $('.experience-text').text('ABOUT US | PROJECTS')
            }
            if(reqx.data.tags){
                setTags(reqx.data.tags);
                // $('.tags-div').fadeIn();
            }else if(reqx.data.notags){
                // $('.notags-div').fadeIn();
            }
            axios.post(`${HOST}/api/get-experience`, {email:req.data.data.email}).
            then((reqy)=>{
                    setTimeout(()=>{
                    setStatusLoader(true)
                    },500)
                if(reqy.data.noexperience){
                    // $('.noexperience-div').fadeIn()
                }else if(reqy.data.experience){
                    setHep(reqy.data.experience);
                    // $('.experience-div').fadeIn()
                }
            })
        })
    }
    })

    }

useEffect(()=>{ 
    accounthrd()
    navigation.getParent()?.setOptions({ tabBarStyle: { display:'none'} })
        },[])

    if(statusLoader === true){
    return(
        <MainView>
            <e.AppScrollView overScrollMode="never">
            <e.AccountInitialSection> 
                {data.banner == "default-profile-banner.png" || data.banner == "default-business-banner.png" ? <e.Banner source={require("../.files/database/default-profile-banner.png")}/> : null}
                {data.pic == "default-profile-pic.png" || data.pic == "default-business-pic.png" ? <e.Pic source={require("../.files/database/default-profile-pic.png")}/> : null}
                <e.AccountType>{ddtype}</e.AccountType> 
                <e.AccountName>{ddname}</e.AccountName>
                 <e.AccountProfessionView> 
                   <e.AccountProfession>{data.profession}  {starVal >= 0 ? <e.AccountProfessionStar name="star" size={13} color="gold"/> : null} <e.StarVal>{starVal}</e.StarVal></e.AccountProfession> 
                 </e.AccountProfessionView> 
                 <e.AccountBiography>{desc} 
                 </e.AccountBiography> 
             </e.AccountInitialSection>  
             <e.AccountInteractivity>
                 <e.AddTouchable onPress={requestMatch}>
                     <e.RequestMatchText>Request Match</e.RequestMatchText>
                 </e.AddTouchable>
                 <e.AddTouchable onPress={giveStar}>
<e.ToggleStar name={starState} size={35} color="gold" />
                 </e.AddTouchable>
             </e.AccountInteractivity>
             <e.Section>
                 <e.AccountTagsTitleView>
                    <e.AccountTagsTitle>{ddtype === 'Personal' ? 'Skills' : 'Tags'}</e.AccountTagsTitle> 
                    <e.AccountTagsIc name="clear-all" color="rgb(100,100,100)" size={23}/>
                    <e.AccountTagsNumber>{tags.length}</e.AccountTagsNumber>
                 </e.AccountTagsTitleView>
                 {tags.length === 0 ? 
                 <e.NoSectionBody>
                     <e.NoText>This user has not defined their {ddtype === 'Personal' ? 'Skills' : 'Tags'}</e.NoText>
                     <e.NoSvg source={non1}/>
                 </e.NoSectionBody> :  
                 <e.SectionBody>
                   
                </e.SectionBody>}

                 <e.AccountTagsTitleView>
                    <e.SectionTitles>{ddtype === 'Personal' ? 'About me | Experience' : 'About Us | Projects'}</e.SectionTitles>
                 </e.AccountTagsTitleView>
                {hep.length === 0 ?
                <e.NoSectionBody>
                      <e.NoText>There's nothing to show here!</e.NoText>
                     <e.NoSvg source={non2}/> 
                </e.NoSectionBody> :
                 <e.SectionBody>
                    
                </e.SectionBody>}
                <e.AccountTagsTitleView>
                <e.SectionTitles>Languages | Location</e.SectionTitles>
                </e.AccountTagsTitleView>
                {languages.length === 0 ? <e.NoSectionBody>
                    <e.NoText>There's nothing to show here!</e.NoText>
                    <e.NoSvg source={non3}/>
                </e.NoSectionBody>
                : 
                <e.SectionBody>
                
                </e.SectionBody>}
                <e.AccountTagsTitleView>
                    <e.AccountTagsTitle>URL Links</e.AccountTagsTitle>
                </e.AccountTagsTitleView>
                <e.LinksView>
                {links.length === 0 ? <e.NoSectionBody>
                    <e.NoText>There's nothing to show here!</e.NoText>
                    <e.NoSvg source={non3}/>
                </e.NoSectionBody> :
                <e.SectionBody>
                
                </e.SectionBody>}
                </e.LinksView>
             </e.Section>
            </e.AppScrollView>
        </MainView>
    ) 
}else{
    //can put loader screen
     return <MainView>
        <SkypeIndicator color={'#000'}/>
     </MainView>
}
}
