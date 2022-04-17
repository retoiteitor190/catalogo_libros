import React, {useState, useEffect} from "react";
import { Text, View,Linking, Platform, Image, Button } from 'react-native';
import {styles} from "./Home.styles";
import ButtonComponent from "../../components/Button";
import i18n from "../../../localization/i18n";

import * as ImagePicker from 'expo-image-picker'

import {Amplify} from "aws-amplify"

export default function inicioScreen(){

  const [image,setImage]= useState(null);

  useEffect(async () =>{
    if (Platform.OS !=='web') {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Permisson denied');
      }
    }
  },[])

  const PickImage = async ()=>{
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect:[4,3],
      quality:1
    });
    console.log(result)
    if(!result.cancelled){
      setImage(result.uri)
    }
  }

  const showImagePicker = async () => {
    // Ask the user for the permission to access the media library 
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this appp to access your photos!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync();

    // Explore the result
    console.log(result);

    if (!result.cancelled) {
      setPickedImagePath(result.uri);
      console.log(result.uri);
    }
  }

  const openCamera = async () => {
    // Ask the user for the permission to access the camera
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this appp to access your camera!");
      return;
    }

    const result = await ImagePicker.launchCameraAsync();

    // Explore the result
    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
      console.log(result.uri);
    }
  }

  async function signOut(){
    try{
      await Amplify.Auth.signOut({gloobal:true});

    } catch(error)
    {
      console.log(error)
    }

  }

    return (
      <View style={styles.container}>
        <View style={styles.screen}>
          <ButtonComponent onPress={showImagePicker} title="Select an image" />

          <Button onPress={openCamera} title="Open camera" />
        </View>
        <Button title = "Choose Image" onPress="PickImage"> 
        {image && <Image source={{uri:image}} style={{
          width:200,
          height:200
        }} ></Image>}
        </Button>
        <Text style={{color:'red'}}
        onPress={()=>Linking.openURL("https://github.com/retoiteitor190/catalogo_libros.git")}>
        GitHub
        </Text>
      </View>
    )
  }