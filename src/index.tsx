import React from 'react';
import ReactDOM from 'react-dom/client';
import { createServer, Model } from 'miragejs';
import { App } from './App';

createServer({
  models: {
    transaction: Model
  },
  seeds(server) {
    server.db.loadData({
      transactions: [
        {
          id: 1,
          title: 'Compras para casa',
          type: 'withdraw',
          amount: 250,
          category: 'Alimentação',
          createdAt: new Date('2022-01-06 10:30:00')
        },
        {
          id: 2,
          title: 'Gasolina',
          type: 'withdraw',
          amount: 150,
          category: 'Combustível',
          createdAt: new Date('2022-02-06 12:30:00')
        },
        {
          id: 3,
          title: 'Desenvolvimento website',
          type: 'deposit',
          amount: 5000,
          category: 'Dev',
          createdAt: new Date('2022-02-06 09:30:00')
        }
      ]
    })
  },
  routes() {
    this.namespace = 'api';

    this.get('/transactions', () => {
      return this.schema.all('transaction');
    });

    this.post('/transactions', (schema, request) => {
      const data = JSON.parse(request.requestBody);

      return schema.create('transaction', data);
    });
  }
});


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
