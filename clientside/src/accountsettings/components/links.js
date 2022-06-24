import React, { useEffect,useState, useRef } from 'react';
import { NativeModules, BackHandler, Alert } from 'react-native'
import * as e from '../accountsettingsComponents'
import { MainView, AddTouchable, SkilltagScrollView } from '../../../defaultStyles';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { HOST } from '@env'
import axios from 'axios'
export default function AccountSettings({ navigation }){
    const [data,setData]=useState({
        banner:'default-profile-banner.png',
        pic:'default-profile-pic.png',
        type:'' 
    })
    const [iStatus, setIStatus] = useState('rgb(235,235,235)')
    const [I,setI] = useState('')
    const input = useRef(0)
    const [links,setLinks] = useState([])
    const [loaded,setLoaded] = useState(false)

    const updateLinks = () =>{
        if(I.length >= 3){
        axios.post(`${HOST}/api/add-links`,{
            email:data.email,
            link:I
        }).then((req)=>{
            if(req.data.added){
                setLinks(links => [...links, { link: `${I}` }])
                        setI('')
                        input.current.clear()
            }
        })
        }else{
            Alert.alert('Oops', 'Link URL is too short!')
        }
    }
    const getData = async() =>{
            let httpToken = await AsyncStorage.getItem('@app:token')
    axios.post(`${HOST}/api/get-user-data`,
            {  }, { headers: {'Authorization': `${httpToken}`} }).then((req)=>{
                if(req.data.data){
                    setData(req.data.data);
                //get links
                axios.post(`${HOST}/api/get-links`, {
                    email:req.data.data.email
                }).then((reqlinks) => {
                    if (reqlinks.data.links) {
                        setLinks(reqlinks.data.links)
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
        setTimeout(()=>{
         setLoaded(true)
        }, 800)
    },[])

    return(
        <MainView>
            <e.TitleView>
                <e.TitleIc name="link-variant" size={27} color="#000"/>     
                <e.TitleText>Links</e.TitleText>
                <e.TitleLine></e.TitleLine>
             </e.TitleView>    
             <e.SectionView mgtop={14} mgleft={24}>
                 <e.LinksTitle>How to use your Links?</e.LinksTitle>
                 <e.LinksDescription>Using Links can be very usefull, you can share your CV, Business Website/Portfolio, Youtube Channels, Facebook & Instagram and LinkedIn accounts to get more information about you.</e.LinksDescription>
                 <e.SectionView mgtop={16} mgleft={0}>
            <e.SectionViewInputHash ref={input} fg={iStatus} onChangeText={(event)=>{
                            setI(event)
                    }} onFocus={()=>setIStatus('#212121')} onBlur={()=>setIStatus('rgb(210,210,210)')} placeholder="URL"/>
        <AddTouchable onPress={updateLinks}>
        <e.AddHashButton>
            Add Link
        </e.AddHashButton>
        </AddTouchable>
        </e.SectionView>
            </e.SectionView>
            <SkilltagScrollView overScrollMode="never" height={0} mtop={38} mleft={20}>
                {links.slice(0).reverse().map((http, KEY)=>{
                    let httplink;
                    if(http.link.length >= 40){
                        httplink = http.link.slice(0, 40)+"...";
                    }else{
                        httplink = http.link;
                    }
                    return(
                        <e.SkilltagsView key={KEY}>
                            <e.SkilltagItem style={{color:'dodgerblue',textDecorationLine:'underline'}}>{httplink}</e.SkilltagItem>
                            <AddTouchable onPress={()=>{
               Alert.alert(
                    `Are you sure you want to remove ${http.link} from your Links list?`,
                    "you cand add it again on any time.",
                    [
                      {
                        text: "Cancel",
                        style: "cancel"
                      },
                      { text: "OK", onPress: () => {
              setLinks(links.filter(links => links.id !== http.id));
              axios.post(`${HOST}/api/remove-link`,{
                email:http.email,
                id:http.id
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
        </MainView>
    )
}
