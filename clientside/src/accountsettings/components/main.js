import React, { useEffect, useState } from 'react';
import { NativeModules, BackHandler } from 'react-native'
import * as e from '../accountsettingsComponents'
import { MainView, BasicText, AddTouchable } from '../../../defaultStyles';
import { HOST } from '@env'
import { useRoute } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
export default function AccountSettings({ navigation }){
    const [data,setData]=useState({
        banner:'default-profile-banner.png',
        pic:'default-profile-pic.png',
        type:'' 
    })
    const [settingsList] = useState([
        { 
            ic:'view-dashboard',
            title:'Preferences',
            desc:'Edit your platform content.',
            http:'Preferences',
         },
        { 
            ic:'tag',
            title:'st',
            desc:'st',
            http:'Skilltags',
         },
        { 
            ic:'book-account',
            title:'ep',
            desc:'ep',
            http:'Ep',
         },
        { 
            ic:'account-edit',
            title:'Information',
            desc:'Edit your information and photos.',
            http:'Information',
         },
        { 
            ic:'map-marker',
            title:'Languages & Location',
            desc:'Edit your account languages and location.',
            http:'Langloc',
         },
        { 
            ic:'link-variant',
            title:'Links',
            desc:'Share some URL Links to our platform.',
            http:'Links',
         }
    ])
    const getData = async() =>{
        let httpToken = await AsyncStorage.getItem('@app:token')
axios.post(`${HOST}/api/get-user-data`,
        {  }, { headers: {'Authorization': `${httpToken}`} }).then((req)=>{
            if(req.data.data){
                setData(req.data.data);
                }
    })

    }
    useEffect(()=>{ 
        getData()
     },[])
    return(
        <MainView>
            <e.TitleView>
                <e.TitleIc name="nut" size={27} color="#000"/>     
                <e.TitleText>Account</e.TitleText>
                <e.TitleLine></e.TitleLine>
             </e.TitleView>    
             <e.ListView>
                {
                    settingsList.map((prop, KEY)=>{ 
                        let ptitle, pdesc;
                        if(prop.title != 'st' && prop.title != 'ep'){ 
                            ptitle = prop.title;
                         }else{ 
                            if(prop.title === "st"){ 
                                if(data.type == 'personal'){
                                    ptitle = 'Skills'
                                }else if(data.type == 'business'){
                                    ptitle = 'Tags'
                                }
                             }else if(prop.title === 'ep'){ 
                                if(data.type == 'personal'){ 
                                    ptitle = 'Experience'
                                 }else if(data.type == 'business'){
                                    ptitle = 'Projects'
                                 }
                             }
                         }
                          if(prop.desc != 'st' && prop.desc != 'ep'){ 
                            pdesc = prop.desc;
                         }else{ 
                            if(prop.desc === "st"){ 
                                if(data.type == 'personal'){ 
                                    pdesc = 'Edit your Skills'
                                 }else if(data.type == 'business'){ 
                                    pdesc = 'Edit your Tags'
                                  }
                             }else if(prop.desc === 'ep'){ 
                                if(data.type == 'personal'){ 
                                    pdesc = 'Edit your Experience'
                                 }else if(data.type == 'business'){ 
                                    pdesc = 'Edit your Projects'
                                  }
                             }
                          }
                        return( 
                            <AddTouchable key={KEY} onPress={()=>{
                                navigation.navigate(prop.http)
                            }}>
                                <e.ListViewContent dis={prop.title != 'Preferences' ? "flex" : data.type === 'personal' ? "none" : "flex"}>
                                    <e.ListViewRow>
                                    <e.ListViewIc name={prop.ic} color="#444" size={24}/>
                                    <e.ListViewRowRight>
                                    <e.ListViewTitle>{ptitle}</e.ListViewTitle>

                                <e.ListViewDescription>{pdesc}</e.ListViewDescription>
</e.ListViewRowRight>
                                    </e.ListViewRow>
                                </e.ListViewContent>
                            </AddTouchable>
                         )
                     })
                }
             </e.ListView>
        </MainView>
    )
}
