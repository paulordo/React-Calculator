import React, { useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

// Componente principal da calculadora
const App = () => {
  // Dois estados: um para o que o usuário digita e outro para o resultado
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');

  // Função que lida com os cliques dos botões
  const handlePress = (value) => {
    if (value === '=') { // Se o usuário clicou no botão de igual
      try {
        // Tenta calcular a expressão usando eval()
        setResult(eval(input).toString());
      } catch (error) {
        // Se der erro na conta, mostra 'Erro'?
        setResult('Erro');
      }
    } else if (value === 'C') { // Se o usuário clicou em 'C', limpa tudo
      setInput('');
      setResult('');
    } else if (value === '⌫') { // Se o usuário clicou no botão de apagar
      setInput(input.slice(0, -1)); // Remove o último caractere
    } else if (value === '( )') {
        // Verifica se precisa abrir ou fechar parênteses
        const openParentheses = (input.match(/\(/g) || []).length;
        const closeParentheses = (input.match(/\)/g) || []).length;
  
        if (openParentheses === closeParentheses || /[\+\-\*\/\(]$/.test(input)) {
          setInput(input + '('); // Adiciona um abre parênteses se for necessário
        } else {
          setInput(input + ')'); // Caso contrário, adiciona um fecha parênteses
        }
    } else {
      // Qualquer outro botão clicado é adicionado ao input
      setInput(input + value);
    }
  };

  // Botões que vão aparecer na calculadora, organizados por linhas
  const buttons = [
    ['C', '( )', '%', '/'],
    ['7', '8', '9', '*'],
    ['4', '5', '6', '-'],
    ['1', '2', '3', '+'],
    ['0', '.', '⌫', '=']
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Área que mostra o input e o resultado */}
      <View style={styles.display}>
        <Text style={styles.input}>{input}</Text>
        <Text style={styles.result}>{result}</Text>
      </View>

      {/* Área dos botões */}
      <View style={styles.buttons}>
        {buttons.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((button) => (
              <TouchableOpacity
                key={button}
                style={[styles.button,
                  button === 'C' ? styles.clearButton :
                  button === '( )' || button === '%' || button === '⌫' || button === '/' || button === '*' || button === '-' || button === '+' ? styles.operatorButton :
                  button === '=' ? styles.equalsButton : styles.numberButton
                ]}
                onPress={() => handlePress(button)}
              >
                <Text style={styles.buttonText}>{button}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
};

// Estilos da calculadora
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    justifyContent: 'center',
  },
  display: {
    backgroundColor: '#1E1E1E',
    padding: 20,
    borderRadius: 12,
    margin: 20,
    alignItems: 'flex-end',
  },
  input: {
    fontSize: 40,
    color: '#BB86FC',
  },
  result: {
    fontSize: 40,
    color: '#03DAC6',
    marginTop: 10,
  },
  buttons: {
    paddingHorizontal: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  button: {
    padding: 20,
    borderRadius: 12,
    minWidth: 70,
    alignItems: 'center',
  },
  operatorButton: {
    backgroundColor: '#4400E0',
  },
  clearButton: {
    backgroundColor: '#D32F2F',
  },
  numberButton: {
    backgroundColor: '#333333',
  },
  equalsButton: {
    backgroundColor: '#00C853',
  },
  buttonText: {
    color: '#fff',
    fontSize: 32,
  },
});

export default App;
