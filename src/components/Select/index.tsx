import ReactSelect, { SingleValue } from 'react-select';

interface SelectOption {
  value: number;
  label: string;
}

interface SelectProps {
  options: SelectOption[];
  placeholder: string;
  onSelectedOption: (option: SingleValue<SelectOption>) => void;
  noOptionsFoundMessage: string;
}

export function Select({ options, placeholder, onSelectedOption, noOptionsFoundMessage }: SelectProps) {
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
    <ReactSelect
      placeholder={placeholder}
      onChange={onSelectedOption}
      options={options}
      noOptionsMessage={() => noOptionsFoundMessage}
      styles={customStyles}
    />
  )
}