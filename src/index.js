import React from 'react'
import { useState } from 'react'
import PrevisaoItem from './components/PrevisaoTempo'
import { 
    Button,
    FlatList, 
    StyleSheet, 
    Text, 
    TextInput,
    View 
  } from 'react-native';

  export default function App() {
// A variável cidade vem do input
//Capturar cidade digitada pelo usuário
const [cidade, setCidade] = useState('');
const [previsoes, setPrevisoes] = useState([])
const capturarCidade = (cidade) =>{
    setCidade(cidade)
}

//Trocar o espaco por +
cidade = cidade.split(' ').join('+')


const obterPrevisoes = () => {
    const endpoint = 'https://api.openweathermap.org/data/2.5/weather?q={city}&appid={chave}&units=metric'
    fetch(endpoint)
    .then(resposta => {
        return resposta.json()
    })
    .then (dados => {
        setPrevisoes(dados['list'])
    })

}

return (
    <View style={styles.containerView}>
      <View style={styles.entradaView}>
        <TextInput 
          style={styles.cidadeTextInput}
          placeholder="Digite o nome de uma cidade"
          value={cidade}
          onChangeText={capturarCidade}
        />
        <Button 
          title="OK"
          onPress={obterPrevisoes}
        />
      </View>
      <View style={{alignItems: 'center'}}>
        <FlatList 
          data={previsoes}
          renderItem={p => (
            <PrevisaoItem previsao={p.item}/>
          )}
        />
      </View>
    </View>
  );
  }

  const styles = StyleSheet.create({
    containerView: {
      padding: 40
    },
    entradaView: {
      marginBottom: 8
     },
    cidadeTextInput: {
      padding: 12,
      borderBottomColor: '#FF9800',
      borderBottomWidth: 2,
      marginBottom: 4
    }
   });