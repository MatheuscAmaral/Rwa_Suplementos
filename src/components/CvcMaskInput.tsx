import React from 'react';
import { Input } from './ui/input';
//@ts-ignore
import InputMask from 'react-input-mask';

interface CVCMaskedInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const CVCMaskedInput: React.FC<CVCMaskedInputProps> = ({
  value,
  onChange,
  placeholder = '***',
}) => {

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <InputMask mask="***" value={value} onChange={handleChange} >
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

export default CVCMaskedInput;
