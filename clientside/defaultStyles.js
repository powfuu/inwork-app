import styled from 'styled-components'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Text,View,Dimensions} from 'react-native'
export const MainView = styled(SafeAreaView)` 
height: 100%;
background:white;
`
export const Inwork = styled(Text)` 
color:#23ff3e;
`
export const Debug = styled(Text)`
color:red;
font-size:18px;
`