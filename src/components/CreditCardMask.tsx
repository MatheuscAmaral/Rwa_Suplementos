import React from 'react';
import { Input } from './ui/input';
//@ts-ignore
import InputMask from 'react-input-mask';

interface CreditCardMaskedInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const CreditCardMaskedInput: React.FC<CreditCardMaskedInputProps> = ({
  value,
  onChange,
  placeholder = 'Digite o número do cartão...',
}) => {

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <InputMask mask="9999999999999999999" value={value} onChange={handleChange} >
      {(inputProps: any) => (
        <Input
          {...inputProps}
          className="col-span-3 text-sm"
          placeholder={placeholder}
        />
      )}
    </InputMask>
  );
};

export default CreditCardMaskedInput;
