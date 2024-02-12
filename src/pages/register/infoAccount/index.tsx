import logo from "../../../assets/rwalogo2.png"

import * as React from 'react';

import { Link } from "react-router-dom";

import { useState } from "react";

import { Input } from '@/components/ui/input';

import { FaAddressCard } from "react-icons/fa";
import { FaUserSecret } from "react-icons/fa6";

import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import VideoLabelIcon from '@mui/icons-material/VideoLabel';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import { StepIconProps } from '@mui/material/StepIcon';


const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
    backgroundColor:
        'rgb(8, 48, 230)',
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
        backgroundColor:
        'rgb(8, 48, 230)',
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 4,
    border: 0,
    backgroundColor:
      theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
    borderRadius: 1,
  },
}));

const ColorlibStepIconRoot = styled('div')<{
  ownerState: { completed?: boolean; active?: boolean };
}>(({ theme, ownerState }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
  zIndex: 1,
  color: '#fff',
  width: 40,
  height: 40,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  ...(ownerState.active && {
    backgroundColor:
        'rgb(8, 48, 230)',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  }),
  ...(ownerState.completed && {
    backgroundColor:
      'rgb(8, 48, 230)',
  }),
}));

function ColorlibStepIcon(props: StepIconProps) {
  const { active, completed, className } = props;

  const icons: { [index: string]: React.ReactElement } = {
    1: <FaUserSecret fontSize={18}/>,
    2: <FaAddressCard fontSize={18}/>,
    3: <VideoLabelIcon />,
  };

  return (
    <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}

const steps = ['Cadastro', 'Informações adicionais', 'Create an ad'];

export function InfoAccount() {

    const [step, setStep] = useState(Number);

    const verifySectionInfo = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setStep((step) => step + 1);
    }

    return (
            <div className="flex flex-col justify-center mx-auto items-center mt-10 mb-10">
                <Link to={"/"}>
                    <img src={logo} alt="logo" className="w-16"/>            
                </Link>

                <Stack spacing={4} className="w-full max-w-5xl mt-10">
                    <Stepper alternativeLabel activeStep={step} connector={<ColorlibConnector />}>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel StepIconComponent={ColorlibStepIcon}>
                                    <p className="text-xs font-sans font-semibold ">{label}</p>
                                </StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                </Stack>

                    <form onSubmit={(e) => verifySectionInfo(e)} className="flex flex-col gap-7 w-full max-w-3xl mt-20 px-10">
                        { 
                            step == 0 ?  (
                                <section className="grid grid-cols-1 md:grid-cols-2 gap-7">
                                    <div className='w-full text-sm text-gray-600'>
                                        <label htmlFor="user" className='ml-1'>Nome completo *</label>
                                        <Input placeholder='Digite seu nome completo' type='text' id='user' className='text-xs mt-2' required/>
                                    </div>

                                    <div className='w-full text-sm text-gray-600'>
                                        <label htmlFor="password" className='ml-1'>Senha *</label>
                                        <Input placeholder='Digite sua senha' type='password' id='password' className='text-xs mt-2' required/>
                                    </div>

                                    <div className='w-full text-sm text-gray-600'>
                                        <label htmlFor="password" className='ml-1'>Confirmar senha *</label>
                                        <Input placeholder='Digite sua senha novamente' type='password' id='password' className='text-xs mt-2' required/>
                                    </div>
                                </section>
                            ) : (
                                <>
                                    <div className='w-full text-sm text-gray-600'>
                                        <label htmlFor="cep" className='ml-1'>CEP *</label>
                                        <Input placeholder='Digite o cep' type='number' id='cep' className='text-xs mt-2' required/>
                                    </div>

                                    <section className="grid grid-cols-1 md:grid-cols-2 gap-7">
                                        <div className='w-full text-sm text-gray-600'>
                                            <label htmlFor="rua" className='ml-1'>Rua *</label>
                                            <Input placeholder='Digite o nome da sua rua' type='text' id='rua' className='text-xs mt-2' required/>
                                        </div>

                                        <div className='w-full text-sm text-gray-600'>
                                            <label htmlFor="number" className='ml-1'>Número *</label>
                                            <Input placeholder='Digite o número da residência' type='number' id='number' className='text-xs mt-2' required/>
                                        </div>

                                        <div className='w-full text-sm text-gray-600'>
                                            <label htmlFor="cep" className='ml-1'>Bairro *</label>
                                            <Input placeholder='Digite o nome do bairro' type='text' id='bairro' className='text-xs mt-2' required/>
                                        </div>

                                        <div className='w-full text-sm text-gray-600'>
                                            <label htmlFor="cidade" className='ml-1'>Cidade *</label>
                                            <Input placeholder='Digite o nome da cidade' type='text' id='cidade' className='text-xs mt-2' required/>
                                        </div>

                                        <div className='w-full text-sm text-gray-600'>
                                            <label htmlFor="estado" className='ml-1'>Estado *</label>
                                            <Input placeholder='Digite o nome do estado' type='text' id='estado' className='text-xs mt-2' required/>
                                        </div>
                                    </section>                                
                                </>
                        )
                    }
                    
                    <button className=" w-full bg-blue-800 p-2 rounded-lg text-white hover:bg-blue-700 transition-all">
                        Próximo
                    </button>
                </form>
            </div>
    );
}
