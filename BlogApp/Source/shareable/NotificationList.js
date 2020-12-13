import React , { useState, useEffect }  from 'react'
import {View,Button,Flatlist,Text,ActivityIndicator,StyleSheet,TouchableOpacity} from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {NotificationCard} from '../shareable/customCard'
import { FontAwesome } from '@expo/vector-icons';



const NotificationList=(props)=>{
    console.log("Notificationssss")
    const notification=props.notificatiions
    const nav=props.nav
    const [iconName,setIconName]=useState("heart")
    const [statement ,setStatement]=useState("liked your post")
    const [check,setCheck]=useState(false)
    console.log(notification.status)
   

    const checkNotificationStatus=()=>{

        if(notification.status==="comment"){
        setIconName("comments")
        setStatement("commented on your post")
        }
        
        setCheck(true)

    }
    console.log(notification.reactor.email);
    
    if(!check)
    checkNotificationStatus()
    return(
        <View>
            
           
            <NotificationCard>
            <Text style={{width:60}}>a</Text>
            <FontAwesome name={iconName} size={20} color="#fc6a03"  />
                <Text style={styles.commenter}>{notification.reactor.name} </Text>
                <Text></Text>
                <Text style = {styles.stateMentStyle}>{statement} </Text>
            </NotificationCard>
        </View>
       
    )
}

const styles= StyleSheet.create({

    stateMentStyle:{
        fontSize:15,
        marginTop:20,
        left:150,
        fontFamily:'serif',
        color:"#c08401",
        position:"absolute"
       

    },
    iconStyle:{
        
        width:30,
        position:"absolute",


        
    },
    commenter:{
        fontSize:18,
        marginTop:16,
        left:27,
        fontFamily:'serif',
        color:"#fc6a03" ,
        position:"absolute"
    }
  

    
    

})
export default NotificationList
