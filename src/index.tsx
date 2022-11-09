import React from 'react';
import ReactDOM from 'react-dom/client';
import { createServer, Model } from 'miragejs';
import { App } from './App';

createServer({
  models: {
    transaction: Model,
    category: Model,
    paymentType: Model,
  },
  seeds(server) {
    server.db.loadData({
      transactions: [
        {
          id: 1,
          title: 'Compras para casa',
          type: 'withdraw',
          amount: 250,
          category: {
            id: 1,
            name: 'Alimentação',
          },
          paymentType: {
            id: 1,
            name: 'Cartão de alimentação'
          },
          createdAt: new Date('2022-01-06 10:30:00')
        },
        {
          id: 2,
          title: 'Gasolina',
          type: 'withdraw',
          amount: 150,
          category: {
            id: 4,
            name: 'Combustível'
          },
          paymentType: {
            id: 1,
            name: 'Dinheiro'
          },
          createdAt: new Date('2022-02-06 12:30:00')
        },
        {
          id: 3,
          title: 'Desenvolvimento website',
          type: 'deposit',
          amount: 5000,
          category: {
            id: 5,
            name: 'Dev'
          },
          createdAt: new Date('2022-02-06 09:30:00')
        }
      ],
      categories: [
        {
          id: 1,
          name: 'Alimentação',
        },
        {
          id: 2,
          name: 'Transporte',
        },
        {
          id: 3,
          name: 'Moradia',
        },
        {
          id: 4,
          name: 'Combustível'
        },
        {
          id: 5,
          name: 'Dev'
        }
      ],
      paymentTypes: [
        {
          id: 1,
          name: 'Dinheiro',
        },
        {
          id: 2,
          name: 'Cartão de crédito',
        },
        {
          id: 3,
          name: 'Cartão de débito',
        },
        {
          id: 4,
          name: 'PIX',
        },
        {
          id: 5,
          name: 'Transferência bancária',
        },
        {
          id: 6,
          name: 'Cartão de alimentação',
        },
        {
          id: 7,
          name: 'Cartão de refeição',
        },
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

    this.get('/categories', () => {
      return this.schema.all('category');
    });

    this.get('/paymentTypes', () => {
      return this.schema.all('paymentType');
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
