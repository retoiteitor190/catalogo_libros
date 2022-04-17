import React, {useEffect, useState} from "react";
import { Text, View, TextInput } from "react-native";
import {styles} from "./AddLibro.styles";

import { list, create, onCreate } from "../../services/todos";
import ButtonComponent from "../../components/Button";
import i18n from"../../../localization/i18n";


export default function libroScreen(){
  const [todos, setTodos] = useState();

  const [todo, setTodo] = useState({titulo:"", autor:"", isbm:"",name:"",description:"",status:""})
async function listTodos(){
  const todosFetched = await list();
  if(todosFetched) setTodos(todosFetched);
} 
async function createTodo(titulo, autor, isbm, name,description, status ){
  const todoCreated = await create({titulo, autor, isbm,name,description,status});
  return todoCreated;
}
const addData = () => {
  createTodo(todo.titulo, todo.autor, todo.isbm, todo.name, todo.description,todo.status);
};

useEffect(() =>{
  listTodos();
  let subscription;
  (async function subscribe(){
    subscription = await onCreate(listTodos);

    })();
    return () => {
      subscription?.unsubscribe();
    };
}, []);

return (
      <View style={styles.container}>
        <Text>{i18n.t("Agregar libro")}</Text>

        <Text> {i18n.t("Titulo")}</Text>
        <TextInput
         onChangeText={(text)=>
          setTodo((current) =>({...current, titulo: text}))
      }
       style={{width:100, height:50, backgroundColor:"#faf0e6"}} 
       />



       <Text> {i18n.t("Autor")}</Text>
        <TextInput 
        onChangeText={(text)=>
          setTodo((current) =>({...current, autor: text}))
      }
         style={{width:100,height:50,backgroundColor:"#e8eaed",paddingHorizontal:10,marginVertical:10,}}/>

      <Text>{i18n.t("ISBN")}</Text>
         
      <TextInput
         onChangeText={(text)=>setTodo((current) =>({...current, isbm: text}))}style={{width:100, height:50, paddingHorizontal:10, 
           marginVertical:10, backgroundColor:"#faf0e6"}} />


      <Text> {i18n.t("Nombre")}</Text>

      <TextInput onChangeText={(text)=> setTodo((current)=>({...current,name:text}))}style={{width:100, height:50, paddingHorizontal:10, 
      marginVertical:10, backgroundColor:"#faf0e6"}} />
       
      <Text>{i18n.t("Descripción")}</Text>
      <TextInput onChangeText={(text)=> setTodo((current)=>({...current,description:text}))}style={{width:100, height:50, paddingHorizontal:10, 
      marginVertical:10, backgroundColor:"#faf0e6"}}/>
       
       
       <Text>{i18n.t("Estatus")}</Text>
       <TextInput onChangeText={(text)=> setTodo((current)=>({...current,status:text}))}style={{width:100, height:50, paddingHorizontal:10, 
      marginVertical:10, backgroundColor:"#faf0e6"}}/>
       
       
       
      
<ButtonComponent title="Create todo" onPress={addData}/>

      </View>
    );
  }

  