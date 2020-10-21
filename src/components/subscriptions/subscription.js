import React from 'react';
import Header from '../header/header';
import { usePaystackPayment } from 'react-paystack';

const config = {
  reference: (new Date()).getTime(),
  email: "user@example.com",
  amount: 20000,
  publicKey: 'pk_test_f01a75b1c3dc6a0b27e42ef5de74fa4b032449bc',
};

const PaystackHookExample = () => {
  const initializePayment = usePaystackPayment(config);
    return (
      <div>
        <button onClick={() => initializePayment()}>Paystack Hooks Implementation</button>
      </div>
  );
};

const Subscription = () => {
  const componentProps = {
    ...config,
    text: 'Paystack Button Implementation',
    onSuccess: () => null,
    onClose: () => null
  };

    return (
      <div>
        <Header title="Subscriptions" />
        <PaystackHookExample />
    </div>
  );
}

export default Subscription;
