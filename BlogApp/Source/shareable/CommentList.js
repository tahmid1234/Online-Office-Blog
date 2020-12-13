import React , { useState, useEffect }  from 'react'
import {View,Button,Flatlist,Text,ActivityIndicator,StyleSheet,TouchableOpacity} from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {CommentCard} from '../shareable/customCard'

const CommentList=(props)=>{
    const comment=props.comment
    const commenter=comment.commenter
    const commentBody=comment.commentBody
    const date=comment.commentDate
    console.log(commentBody+" laal")
    return(
        <View>
             <MaterialCommunityIcons name="human-greeting" size={36} color="#fc6a03" style={styles.iconStyle}/>
           
        <CommentCard>
           
            <Text style={styles.CommenterStyle}>{commenter.name}</Text>
           
           
           
            <Text style={styles.postBodeStyle}>{commentBody} </Text>
            <Text style={styles.dateStyle}> {date} </Text>

        </CommentCard>
        </View>
    )
}

const styles= StyleSheet.create({
        CommenterStyle:{
            fontSize:11,
            
            left:5,
            fontFamily:'serif',
            color:"#fc6a03",
           

        },
        iconStyle:{
            
            width:30,
            position:"absolute"

            
        },
        postBodeStyle:{
            color:"#fc6a03",
            fontFamily:'serif',
            fontSize:16,
            left:7
            
        },
        dateStyle:{
        
            marginBottom:5,
            color:"#c08401",
            fontSize:10,
            fontStyle:'italic',
            marginTop:7
        },

        
        

})

export default CommentList