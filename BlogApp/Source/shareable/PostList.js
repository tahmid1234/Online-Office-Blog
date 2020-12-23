import React , { useState, useEffect }  from 'react'
import {View,Button,Flatlist,Text,ActivityIndicator,StyleSheet,TouchableOpacity} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {PostCard} from '../shareable/customCard'
import { getDataJSON, storeDataJSON } from "../Function/AsyncStorageFunction";
import { Zocial } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons'; 



const PostList =(props)=>{
   
    const posts=props.posts
    const nav=props.nav
    const currUser=props.currentUser
  

    const [Name, setName] = useState("");
    const [iconName,setIconName]=useState("hearto")
    const [loading, setLoading] = useState(true);
    const [likeCount,setLikeCount]=useState(0)
    const [commentCount,setCommentCount]=useState(0)
    const [comments,setComments]= useState([]);
    
   
    const [authorPostReactions, setAuthorPostReactions] = useState([]);
    const [liker, setLikers] = useState([]);

    let dateObj=new Date(posts.data.created_at.seconds*1000)
    console.log(dateObj.toUTCString())
    dateObj=""+dateObj.toUTCString()

    
    
    let postDate=dateObj.substr(0,dateObj.length-13)
  
    if(loading){
    return(
        
       
       <PostCard>
           
           <Zocial name="statusnet" size={24} color="#fc6a03"  style={styles.iconStyle} />
           <Text style={styles.authorNameStyle}>{posts.data.author}</Text>
           <Text style={styles.dateStyle}>{postDate}</Text>
           <Text style={styles.postBodyStyle}>{posts.data.body}</Text>
          
           <FontAwesome name="comment-o" size={27} color="#fc6a03"  style={styles.commentStyle}
           onPress={function(){
            nav.navigation.navigate("IndivialPost",  {posts,Name,comments,likeCount,commentCount,authorPostReactions,currUser} );
           
            console.log("commento")
            console.log(likeCount+" pera nai"+ commentCount)
           }}/>

          
           <AntDesign name={iconName} size={24} color="#fc4601"  style={styles.likeStyle} 
           onPress ={function(){
            setIconName("heart")
            //console.log(authorPostReactions.length+" length")
           // console.log(liker)
            let a=likeCount+1
            let authorPostCurrentReaction={postId:posts.key,reactor:currUser,status:"like"}
            authorPostReactions.push(authorPostCurrentReaction)
            storeDataJSON(posts.Email+"Reaction",authorPostReactions)
            liker.push(currUser)
            setLikeCount(a)
            storeDataJSON(posts.key+"likes",liker)
           
            
            
           }}/>
          
        <Text style={styles.likeTextStyle} >{likeCount} Likes</Text>
        <Text style={styles.commentTextStyle}>{commentCount} Comments</Text>
          
   
           

       </PostCard>
    )
    }
    else{
        return(
            <View style={{ flex: 1, justifyContent: "center" }}>
            <ActivityIndicator size="large" color="red" animating={true} />
          </View>
        )
    }
}

const styles=StyleSheet.create({
    iconStyle:{
        
        position:'absolute',
        right:10,
        top:10,
       
        
        
       

        
    },
    commentStyle:{
        position:'absolute',
        bottom:1,
        right:10,
        marginBottom:0,
        
    },
    authorNameStyle:{
        fontFamily:'serif',
        fontSize:18,
        color:"#fc6a03",
        marginBottom:5,
    },
    dateStyle:{
        
        marginBottom:5,
        color:"#fc6a03",
        fontSize:10,
        fontStyle:"italic"
    },
    postBodyStyle:{
        fontFamily:'serif',
        marginBottom:10,
        color:"#fc6a03",
        fontSize:15,
        
    },
    likeStyle:{
        marginBottom:3,
        bottom:0,
        width:36,
        left:0
    },
   
    likeTextStyle:{
        marginBottom:3,
        fontSize:14,
        fontFamily:'serif',
        color:"#fc6a03",
        
        width:60,
        left:30,
        position:"absolute",
        bottom:0
    },
    commentTextStyle:{
        marginBottom:3,
        fontSize:14,
        fontFamily:'serif',
        color:"#fc6a03",
        
        width:90,
        right:36,
        position:"absolute",
        bottom:0
    },

  
}
);

export default PostList