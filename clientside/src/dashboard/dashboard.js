import React, { useEffect, useState } from 'react';
import { BackHandler,NativeModules,Alert } from 'react-native'
import * as e from './dashboardComponents'
import { MainViewApp } from '../../defaultStyles';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { HOST } from '@env'
import Logito from '../../resources/logo-inwork.png'
import axios from 'axios'

export default function Dashboard({navigation}){
    const [data,setData]=useState({
        banner:'default-profile-banner.png',
        pic:'default-profile-pic.png',
        type:''
    })
    const [prefs, setPrefs]=useState([])
    const [users, setUsers]=useState([])
    const [business, setBusiness]=useState([])

    const [preferencesPopupTitle, setPreferencesPopupTitle]=useState('')

    const getToken = async()=>{
        let httpToken = await AsyncStorage.getItem('@app:token')
axios.post(`${HOST}/api/get-user-data`,
        {  }, { headers: {'Authorization': `${httpToken}`} }).then((req)=>{
            if(req.data.data){
                setData(req.data.data);
        axios.post(`${HOST}/api/remove-matchmaking`,{
            email:req.data.data.email,
            type:req.data.data.type
        })
                if(req.data.data.type=='personal'){
                    setPreferencesPopupTitle('Business Interested on')
                    axios.post(`${HOST}/api/get-business-data`,{
                        myprofession:req.data.data.profession
                    }).then((reqbd)=>{
                        if(reqbd.data.b_em){
                            setBusiness(reqbd.data.b_em)
                        }else if(reqbd.data.nob_em){
                   Alert.alert('Error while searching for business!',`Nobody is searching for ${req.data.data.profession}, check if everything is correct! (remember using completed and correct words )`)
                }
                    })
                }
                if(req.data.data.type=='business'){
                setPreferencesPopupTitle('Recommended for you')
axios.post(`${HOST}/api/get-preferences-dashboard`,{
                        email:req.data.data.email
                    }).then((req2)=>{
                        if(req2.data.prefs){
                            setPrefs(req2.data.prefs)
        axios.post(`${HOST}/api/get-personal-users`,
                        {
                            email:req.data.data.email,
                            sf1:req2.data.prefs.searchingfor1,
                            sf2:req2.data.prefs.searchingfor2,
                            sf3:req2.data.prefs.searchingfor3
                        }).then((req_user)=>{
                            if(req_user.data.users){
                                setUsers(req_user.data.users);
                            }else if(req_user.data.nousers){
                            Alert.alert('Error while searching for personal', `Nobody match with your results... (remember using completed and correct words in your preferences)`)
                            }
                        })


                        }
                    })
                }
            }
        })
    }
    useEffect(() => {
        getToken()
       BackHandler.addEventListener('hardwareBackPress', (e)=>{
            return true;
        });
}, []);
return(
    <MainViewApp>
        <e.ScrollViewScene overScrollMode="never">
            <e.RowLogo>
      <e.LogoImg tintColor='dodgerblue' source={Logito}/>
  <e.PreferencesPopup>
            <e.SearchView>
            <e.SearchIc name="search" size={20} color="#666"/>
            <e.PreferencesPopupTitle>{preferencesPopupTitle}</e.PreferencesPopupTitle>
            </e.SearchView>
            { data.type != '' ? data.type === 'personal' ? <e.PreferencesPopupPreferences>#{data.profession}</e.PreferencesPopupPreferences> : <e.PreferencesPopupPreferencesPopup>
 <e.PreferencesPopupDescriptionView>
 </e.PreferencesPopupDescriptionView>

           </e.PreferencesPopupPreferencesPopup> : null }
        </e.PreferencesPopup>
</e.RowLogo>
        <e.AccountsContent>
            {data.type === 'personal' ?
            business.map((usr,KEY)=>{
                return(
                    <e.AccountCardContent key={KEY} onPress={()=>{
                        navigation.navigate('Account',
                        {
                           id:usr.id,
                           type:'business' 
                        })
                    }}>
                <e.AccountCard>
                    {usr.banner === 'default-business-banner.png' ? 
                    <e.AccountCardBanner source={require(`../.files/database/default-profile-banner.png`)} /> : null}
                    {usr.pic === 'default-business-pic.png' ? 
                    <e.AccountCardPic source={require(`../.files/database/default-profile-pic.png`)} /> : null}
                    <e.AccountCardProfession>{usr.profession}</e.AccountCardProfession>
                    <e.AccountCardName>{usr.fname}</e.AccountCardName>
                    <e.LocationView>
                    <e.LocationIc name="location-on" size={19} color="#000"/>
                    <e.AccountCardLocation>{usr.location}  {usr.ID} {usr.type}</e.AccountCardLocation>
                    </e.LocationView>
                </e.AccountCard>
                </e.AccountCardContent>
                )
            }) : users.map((usr,KEY)=>{
                return(
                 <e.AccountCardContent key={KEY} onPress={()=>{
                        navigation.navigate('Account', 
                        {
                           id:usr.ID,
                           type:usr.type 
                        })
                    }}>
                <e.AccountCard>
                    {usr.profile_banner === 'default-profile-banner.png' ? 
                    <e.AccountCardBanner source={require(`../.files/database/default-profile-banner.png`)} /> : null}
                    {usr.profile_pic === 'default-profile-pic.png' ? 
                    <e.AccountCardPic source={require(`../.files/database/default-profile-pic.png`)} /> : null}
                    <e.AccountCardProfession>{usr.profession}</e.AccountCardProfession>
                    <e.AccountCardName>{usr.name+' '+usr.lastname}</e.AccountCardName>
                    <e.LocationView>
                    <e.LocationIc name="location-on" size={19} color="#000"/>
                    <e.AccountCardLocation>{usr.location}</e.AccountCardLocation>
                    </e.LocationView>
                </e.AccountCard>
                </e.AccountCardContent>
                )
            })}
        </e.AccountsContent>
        </e.ScrollViewScene>
    </MainViewApp>
);
}
