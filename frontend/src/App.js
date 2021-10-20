

import React, { useContext, useEffect } from 'react';
import './App.css';
import Dashboard from './components/Dashboard';
import WalletLogin from './components/WalletLogin';
import { appStore, onAppMount } from './state/app';


const App = () => {
  const { state, dispatch, update } = useContext(appStore);

  const { near, wallet, account, loading } = state;

  const onMount = () => {
    dispatch(onAppMount());
  };
  useEffect(onMount, []);

  if (loading) {
    return <div className="root">
      <h3>Working on it!</h3>
    </div>;
  }

  return (
    <div className="root">
      {(wallet && wallet.signedIn) ? <Dashboard {...{ wallet, account }} /> : <WalletLogin wallet={wallet} />}

    </div>
  );
};

export default App;