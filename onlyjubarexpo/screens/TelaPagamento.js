import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';

// Importar aqui as bibliotecas necessárias para integração com as APIs (ex: axios, fetch)

const PaymentScreen = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);

  const handleSelectPlan = (plan) => {
    setSelectedPlan(plan);
  };

  const handlePayment = async () => {
    if (selectedPlan === null) {
      alert("Por favor, selecione um plano primeiro.");
      return;
    }

    // Lógica para integração com a API correspondente ao plano selecionado (Mercado Pago, Stripe, PagSeguro)
    try {
      // Código para iniciar o processo de pagamento
      // Exemplo: 
      // await iniciarProcessoDePagamento(selectedPlan);
      alert(`Pagamento realizado com sucesso para o plano ${selectedPlan}!`);
    } catch (error) {
      alert("Ocorreu um erro ao processar o pagamento. Por favor, tente novamente mais tarde.");
      console.error(error);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Selecione um plano:</Text>
      <Button title="FREE" onPress={() => handleSelectPlan('FREE')} />
      <Button title="PREMIUM MENSAL" onPress={() => handleSelectPlan('PREMIUM MENSAL')} />
      <Button title="PREMIUM ANUAL" onPress={() => handleSelectPlan('PREMIUM ANUAL')} />

      {selectedPlan && (
        <View style={{ marginTop: 20 }}>
          <Text>Você selecionou o plano: {selectedPlan}</Text>
          <Button title="Realizar Pagamento" onPress={handlePayment} />
        </View>
      )}
    </View>
  );
};

export default PaymentScreen;