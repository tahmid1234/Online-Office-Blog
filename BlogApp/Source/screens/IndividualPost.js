import React , { useState, useEffect }  from 'react'
import {Text,Button,View,StyleSheet,TextInput,FlatList} from 'react-native'
import ScreenHeader from '../shareable/ScreenHeader'
import {PostCard} from '../shareable/customCard'
import { MaterialCommunityIcons,Entypo } from '@expo/vector-icons';
import {  Input } from "react-native-elements";
import { FontAwesome ,AntDesign} from '@expo/vector-icons';
import { storeDataJSON,removeData } from "../Function/AsyncStorageFunction";
import CommentList from '../shareable/CommentList'

const months={
    0:"January",
    1:"February",
    2:"March",
    3:"April",
    4:"May",
    5:"June",
    6:"July",
    7:"August",
    8:"September",
    9:"October",
    10:"November",
    11:"December",
}

const IndividualPostScreen=(props)=>{
    console.log(props)
    const post=props.route.params.posts
    const authorName=props.route.params.Name
    const currentUser=props.route.params.currUser
    const [commentsCount,setCommentCount]=useState(props.route.params.commentCount)
    //const {likeCount,setLikeCount}=useState(0)
    const [likeCount,setLikeCount]=useState(props.route.params.likeCount)
    const[comments,setComments]=useState(props.route.params.comments)
    const [currentInputText,setCurrentInputText]=useState("")
    const [authorPostReactions, setAuthorPostReactions] = useState(props.route.params.authorPostReactions);
    
    console.log(props.route.params.likeCount+"authe "+likeCount)
    //setCommentCount(props.route.params.commentCount)
    return(
    
      <View style={styles.containerStyle}>  
           <ScreenHeader props ={props} ></ScreenHeader>
           <PostCard>
          
           <Entypo name="man" size={24} color="#c08401"  style={{width:20}}/>
           <Text style={styles.authorTextSTyle}>{authorName}</Text>
            <Text style={styles.dateStyle}>{post.postDate}</Text>
           <Text style={styles.postBodyStyle}>{post.postText}</Text>
           <AntDesign name="heart" size={24} color="#fc4601"  style={styles.likeStyle} />
           <FontAwesome name="comment-o" size={27} color="#fc6a03"  style={styles.commentStyle}/>
           <Text style={styles.likeTextStyle} >{likeCount} Likes</Text>
           <Text style={styles.commentTextStyle}>{commentsCount} Comments</Text>
           </PostCard>

           <Input
              

                inputStyle={{color:"white"}}
                
                
                placeholder="Write your comment!"
                multiline={true}
                
                placeholderTextColor="white"
                
                inputContainerStyle={styles.inputStyle}
                leftIcon={<Entypo name="pencil" size={24} color="white" />}
                onChangeText={function (currentInput) {
                   setCurrentInputText(currentInput)
                }}
              />
             <AntDesign name="checkcircle" size={30} color="#fc6a03" style={{marginHorizontal:180,marginBottom:20}}
             onPress={function(){
                let authorPostCurrentReaction={postId:post.key,reactor:currentUser,status:"comment",commentBody:currentInputText}
                authorPostReactions.push(authorPostCurrentReaction)
                let month=new Date().getMonth()
                let recentComment={commenter:currentUser,commentBody:currentInputText,commentDate:new Date().getDate()+' '+months[month]+','+new Date().getFullYear(),key:commentsCount}
                comments.reverse()
                comments.push(recentComment)
                
                storeDataJSON(post.key+"Comment",comments)
                storeDataJSON(post.Email+"Reaction",authorPostReactions)
                console.log(post.Email+" "+post.key)
                console.log(comments)
                setCommentCount(comments.length)
                comments.reverse()

             }}
             />

             <FlatList
                data={comments}
                extraData={comments}
                renderItem={function({ item } ){
                    return(
                        <CommentList comment={item} />
                    )
                }}


            />
      </View>
    )
}

const styles=StyleSheet.create({
    authorTextSTyle:{
        left:29,
        position:"absolute",
        fontFamily:'serif',
        fontSize:23,
        color:"#c08401",
        marginBottom:5
    },
    dateStyle:{
        
        marginBottom:5,
        color:"#c08401",
        fontSize:10,
        fontStyle:'italic',
        marginTop:7
    },
    postBodyStyle:{
        fontFamily:'serif',
        marginBottom:10,
        color:"#c08401",
        fontSize:19,
        
    },
    inputStyle:{

        color:"#c08401",
        borderColor:"#c08401",
        marginHorizontal:20,
        marginTop:10,
    },
    containerStyle:{
        flex:1
        , 
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
   
    commentStyle:{
        position:'absolute',
        bottom:1,
        right:10,
        marginBottom:0,
        
    },
    likeStyle:{
        marginBottom:3,
        bottom:0,
        width:36,
        left:0
    },
})

export default IndividualPostScreen