import React, { useEffect,useState } from 'react';
import { NativeModules, BackHandler } from 'react-native'
import * as e from './menuComponents'
import { MainView,AddTouchable } from '../../defaultStyles';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { HOST } from '@env'
import axios from 'axios'
export default function Menu({ navigation }){
    const [matches,setMatches]=useState([])
    const [tokn, setTokn]=useState('')
    const [Explorer] = useState([
        {
            title:'Search for match',
            IcName:'search',
            type:'Ionicons'
            ,tintColor: 'white'
            ,backgroundColor:'#212121'
            ,foregroundColor:'white'
            ,http:'SearchMatch'
        },
        {
            title:'Bookmarks',
            IcName:'bookmarks',
            type:'Ionicons'
            ,tintColor: 'dodgerblue'
            ,backgroundColor:'white'
            ,foregroundColor:'#444'
            ,http:'Bookmarks'
        },
        {
            title:'Privacity and Security',
            IcName:'lock',
            type:'FontAwesome'
            ,tintColor: '#71c55b'
            ,backgroundColor:'white'
            ,foregroundColor:'#444'
            ,http:'PrivacitySecurity'
        },
        {
            title:'Account',
            IcName:'settings-sharp',
            type:'Ionicons'
            ,tintColor: '#999'
            ,backgroundColor:'white'
            ,foregroundColor:'#444'
            ,http:'AccountSettings'
        },
    ])
 const rmToken = async()=>{
        await AsyncStorage.clear() 
        NativeModules.DevSettings.reload()
    } 
    const getMatches = async()=>{
             let apptoken = await AsyncStorage.getItem('@app:token')
             setTokn(apptoken)
            const interval = setInterval(() => { 
        axios.post(`${HOST}/api/get-matches-randomized`,{},{headers:{'authorization':apptoken}}).then((req)=>{
          if(req.data.matches)
          {
            setMatches(req.data.matches);
          }
        })
      }, 1000)
    }
    useEffect(()=>{
      getMatches() 
    BackHandler.addEventListener('hardwareBackPress', (e)=>{
    navigation.getParent()?.setOptions({ tabBarStyle: { display:'flex'} })
    return false;
        });
    }, [])
    return(
        <MainView style={{backgroundColor: 'rgb(245,245,245)'}}>
        <e.MenuView>
            <e.MenuTitleView>
            <e.MenuIc name="clear-all" color="rgb(50,50,50)" size={25}/>
            <e.MenuTitle>Menu</e.MenuTitle>
            </e.MenuTitleView>

            <AddTouchable onPress={()=>{
                navigation.navigate('Account')
            }}> 
            <e.ProfileView>
                <e.ProfileImage source={require(`../.files/database/default-profile-pic.png`)}/>
                <e.ProfileTextSide>
                <e.ProfileName>Name Lastname</e.ProfileName>
                <e.ProfileText>View Profile</e.ProfileText>
                </e.ProfileTextSide>
            </e.ProfileView>
</AddTouchable>

                    <e.EmptyShortcutsTitle>Last Recent Matches</e.EmptyShortcutsTitle>
                {matches.length === 0 ? <e.EmptyShorcutsView pemlomchim='column'>
                    <e.EmptyShortcutsText>You do not have any match yet.</e.EmptyShortcutsText>
                </e.EmptyShorcutsView> :
                 <e.ShortcutsView pemlomchim='row'>
                    {matches.map((props, key)=>{
                        return(
                            <AddTouchable key={key} onPress={()=>{
                                navigation.navigate('HrdAccount', {
                                       id:props.usr1id,
                                       type:props.usr1type
                        })}}>
                           <e.Shortcut>
                            <e.ShortcutText>{props.usr1fname}</e.ShortcutText>
                           </e.Shortcut> 
                            </AddTouchable>
                        )
                    })}
                    </e.ShortcutsView>}
                    <e.EmptyShortcutsTitle>Explore</e.EmptyShortcutsTitle>
                    <e.AllShortcutsView>
                        {Explorer.map((ex,KEY)=>{
                            return(
                                <AddTouchable key={KEY} onPress={()=>{
                                navigation.navigate(ex.http)

                            }}>
                                <e.AllShorcut bgColor={ex.backgroundColor} >
                                    {ex.type === 'FontAwesome' ?  
                                    <e.QMSFAIc color={ex.tintColor} name={ex.IcName} size={23} /> : 
                                    <e.QMSIIIc color={ex.tintColor} name={ex.IcName} size={23} /> }
                                    <e.AllShortcutText color={ex.foregroundColor}>{ex.title}</e.AllShortcutText>
                                </e.AllShorcut>
                                </AddTouchable>
                            )
                        })}
                    </e.AllShortcutsView>
     </e.MenuView>
   <e.Signout onPress={rmToken}>
            <e.SignoutText>Log Out</e.SignoutText>
        </e.Signout>

        </MainView>
    )
}