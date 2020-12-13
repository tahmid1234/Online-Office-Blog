import React, { useState, useEffect } from 'react'
import ScreenHeader from '../shareable/ScreenHeader'
import {Text,Button,View,ActivityIndicator,FlatList} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getDataJSON, storeDataJSON } from "../Function/AsyncStorageFunction";
import NotificationList from '../shareable/NotificationList'


const NotificationScreenActivity=(props)=>{
 
  const [authorPostReactions, setAuthorPostReactions] = useState([]);
  const [loading,setLoading] = useState(false);
  const FindReactions=async()=>{
        let reactionList=await getDataJSON(props.currentUser.email+"Reaction")
        if(reactionList.length>0){
        setAuthorPostReactions(reactionList)
        setLoading(true)
        }
     
  }
  if(!loading)
  FindReactions()

    return(


       
        <View style={{ flex: 1}}>
        <View style={{marginBottom:20}}>
        <ScreenHeader props ={props} ></ScreenHeader>
        </View>
        {loading?
            <FlatList          
            data={authorPostReactions}
            extraData={authorPostReactions}           
            renderItem={function({ item } ){

              console.log(authorPostReactions.length+" post length")
             
              return (
                      <NotificationList
                        notificatiions={item} nav={props}
                      />
                      
                  
                 )
          }}
          
           
             />: <View style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator size="large" color="red" animating={true} />
      </View>}



      </View>
    

    )
}


export default NotificationScreenActivity