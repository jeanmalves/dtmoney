import { FormEvent, useState, useEffect } from 'react';

import Modal from 'react-modal';
import outcomeImg from '../../assets/outcome.svg';
import incomeImg from '../../assets/income.svg';
import closeImg from '../../assets/close.svg';
import { Container, RadioBox, TransactionTypeContainer } from './styles';
import { useTransactions } from '../../hooks/useTransactions';
import { api } from '../../services/api';
import Select from 'react-select';
export interface Taxonomy {
  id: number;
  name: string;
}
interface SelectOption {
  value: number;
  label: string;
}
interface NewTransactionModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

export function NewTransactionModal({ isOpen, onRequestClose }: NewTransactionModalProps) {
  const { createTransaction } = useTransactions();
  const [categoryOptions, setCategoryOptions] = useState<SelectOption[]>([]);
  const [paymentTypeOptions, setPaymentTypeOptions] = useState<SelectOption[]>([]);

  const [title, setTitle] = useState('');
  const [categoryOptionSelected, setCategoryOptionSelected] = useState<SelectOption | null>();
  const [paymentTypeOptionSelected, setPaymentTypeOptionSelected] = useState<SelectOption | null>();
  const [amount, setAmount] = useState(0);
  const [type, setType] = useState('deposit');

  useEffect(() => {
    api.get('/categories').then(response => {
      const categories = response.data.categories.map((category: Taxonomy) => {
        return {
          value: category.id,
          label: category.name
        }
      });

      setCategoryOptions(categories);
    });

    api.get('/paymentTypes').then(response => {
      const paymentTypes = response.data.paymentTypes.map((paymentType: Taxonomy) => {
        return {
          value: paymentType.id,
          label: paymentType.name
        }
      });

      setPaymentTypeOptions(paymentTypes);
    });
  }, []);

  async function handleCreateNewTransaction(event: FormEvent) {
    event.preventDefault();

    const category = {
      id: 0,
      name: ''
    };

    const paymentType = {
      id: 0,
      name: ''
    };

    if (categoryOptionSelected) {
      category.id = categoryOptionSelected.value
      category.name = categoryOptionSelected.label
    }

    if (paymentTypeOptionSelected) {
      paymentType.id = paymentTypeOptionSelected.value
      paymentType.name = paymentTypeOptionSelected.label
    }

    await createTransaction({
      title,
      amount,
      type,
      category,
      paymentType,
    });

    setTitle('');
    setAmount(0);
    setType('deposit');
    setCategoryOptionSelected(null);
    setPaymentTypeOptionSelected(null);

    onRequestClose();
  }

  const customStyles = {

    control: () => ({
      margin: "1rem 0",
      display: "flex",
      width: "100%",
      padding: "0 0.5rem",
      height: "4rem",
      alignItems: "center",
      borderRadius: "0.25rem",
      border: "1px solid #d7d7d7",
      background: "#e7e9ee",
      fontWeight: 400,
      fontSize: "1rem"
    })
  }
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <button
        type="button"
        onClick={onRequestClose}
        className="react-modal-close"
      >
        <img src={closeImg} alt="fechar modal" />
      </button>

      <Container onSubmit={handleCreateNewTransaction}>
        <h2>Cadastrar transação</h2>

        <input
          placeholder="Título"
          value={title}
          onChange={event => setTitle(event.target.value)}
        />
        <input
          type="number"
          placeholder="Valor"
          value={amount}
          onChange={event => setAmount(Number(event.target.value))}
        />

        <TransactionTypeContainer>
          <RadioBox
            type="button"
            onClick={() => setType('deposit')}
            isActive={type === 'deposit'}
            activeColor="green"
          >
            <img src={incomeImg} alt="Entrada" />
            <span>Entrada</span>
          </RadioBox>
          <RadioBox
            type="button"
            onClick={() => setType('withdraw')}
            isActive={type === 'withdraw'}
            activeColor="red"
          >
            <img src={outcomeImg} alt="Saída" />
            <span>Saída</span>
          </RadioBox>
        </TransactionTypeContainer>

        <Select
          placeholder="Escolha uma categoria"
          defaultValue={categoryOptionSelected}
          onChange={(selectedCategory) => setCategoryOptionSelected(selectedCategory)}
          options={categoryOptions}
          noOptionsMessage={() => "Categoria não encontrada."}
          styles={customStyles}
        />

        {
          type === 'withdraw' &&
          <Select
            placeholder="Escolha uma forma de pagamento"
            defaultValue={paymentTypeOptionSelected}
            onChange={(selectedPaymentType) => setPaymentTypeOptionSelected(selectedPaymentType)}
            options={paymentTypeOptions}
            noOptionsMessage={() => "forma de pagamento não encontrada."}
            styles={customStyles}
          />
        }

        <button type="submit">Cadastrar</button>
      </Container>
    </Modal>
  );
}