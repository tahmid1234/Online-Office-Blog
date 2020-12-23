import React, { useState, useEffect } from "react";
import {View,StyleSheet,Button,ActivityIndicator,Text,FlatList,ScrollView} from 'react-native'
import {storeDataJSON, getDataJSON } from "../Function/AsyncStorageFunction";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {  Input } from "react-native-elements";
import {AuthContext} from '../provider/AuthProvider'
import {PostCard} from '../shareable/customCard'
import ScreenHeader from '../shareable/ScreenHeader'
import { FontAwesome, Feather, AntDesign ,Ionicons ,Fontisto,Entypo } from "@expo/vector-icons";
import PostList from '../shareable/PostList'
import * as firebase from 'firebase'
import "firebase/firestore";

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




const HomeScreenActivity=(props)=>{
    
  console.log(props)
  console.log("okayy")
  const [RecentPost, setRecentPost] = useState("");
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);


  const loadPosts = async () => {
    setLoading(true)
    firebase
      .firestore()
      .collection("posts")
      .orderBy("created_at", "desc")
      .onSnapshot((querySnapshot) => {
        let temp_posts = [];
        querySnapshot.forEach((doc) => {
          temp_posts.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setPosts(temp_posts);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        alert(error);
      });
    
  };
    
  useEffect(() => {
    loadPosts();
  }, []);

    
    
     
        
   
    return(

<AuthContext.Consumer>
        {(auth) => (

            

       <View style={{flex:1}}>
           <ScreenHeader props ={props} ></ScreenHeader>
           <PostCard>
       
           <Input
                

                inputStyle={{color:"white"}}
                
                
                placeholder="What's On Your Mind?"
                multiline={true}
                
                placeholderTextColor="white"
                
                leftIcon={<Entypo name="pencil" size={24} color="white" />}
                onChangeText={function (currentInput) {
                    setRecentPost(currentInput);
                }}
              />
              
              <View style={styles.buttonView}>
              
              <Button 
              borderRadius={9}
              color="#fc6a03"
              title="Post"
                titleStyle={{color:"white"}}
                onPress={function () {
                  setLoading(true)
                  console.log("dekhi")
                  console.log(auth.CurrentUser)
                   firebase.firestore().collection("posts").add({
                     userId:auth.CurrentUser.uid,
                     body:RecentPost,
                     author:auth.CurrentUser.displayName,
                     created_at:firebase.firestore.Timestamp.now(),
                     likes:[],
                     comments:[],
                   }).then(()=>{
                     setLoading(false)
                     alert("Post Created")

                   }).catch((error)=>{
                    setLoading(false)
                     alert(error)
                   })

                    }} />
             
              </View>
           </PostCard>
           
                 
            {loading?
            <FlatList
            
            data={posts}
            extraData={posts}
           
            renderItem={function({ item } ){
              //console.log("Render")
              //console.log(posts)

              console.log(posts.length+" post length"+item.data.body)
             
              return (
                  <Text>hello</Text>
                 //<PostList posts={item} nav={props} currentUser={auth.CurrentUser}/>
                 
                 )
          }}
          
           
             />: <View style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator size="large" color="red" animating={true} />
      </View>}
            
       
        </View>
         )}
         </AuthContext.Consumer>


    );
   
   
}

const styles=StyleSheet.create({
    buttonView:{
        marginLeft:30,
        marginRight:30,
        marginVertical:15,
        
       

        
    },

    inputStyle:{
        color:"white"
        
    }
}
);

export default HomeScreenActivity