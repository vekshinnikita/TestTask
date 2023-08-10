import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

import { ICurrency, enumCurrency } from '~/types';

import styles from './Converter.module.scss'
import ConverterInput from '../ConverterInput/index';
import useIsMobile from '~/hooks/useIsMobile';
import { usePrice } from '~/adapters/price';
import { ITicker } from '~/types/api';
import { roundPrice } from '~/utils/roundPrice';


interface Ivalues{
  firstCurrency: enumCurrency,
  secondCurrency: enumCurrency,
  firstNumber: string,
  secondNumber: string,
}

const currency: ICurrency[] = [
  {
    label: enumCurrency.BTC,
    image: '/btc.png',
    fullname: 'Bitcoin',
  },
  {
    label: enumCurrency.USDT,
    image: '/usdt.png',
    fullname: 'Tether',
  },
  {
    label: enumCurrency.ETH,
    image: '/eth.png',
    fullname: 'Ethereum',
  }
]

const maxLength = 20


const Converter = () => {

  const isMobile = useIsMobile()

  const [ ticker, setTicker ] = useState<ITicker>(ITicker.ETHBTC)
  const [ isReverse, setIsReverse ] = useState<Boolean>(false)
  const [ date, setDate ] = useState<Date>(new Date())
  const { isLoading, coeff } = usePrice(ticker)
  const [ values, setValues ] = useState<Ivalues>({
    firstCurrency: enumCurrency.BTC,
    secondCurrency: enumCurrency.ETH,
    firstNumber: '1',
    secondNumber: '1',
  })

  const switchCurrency = (isDispatch: boolean) => {
    const newValues: Partial<Ivalues> = {}

    newValues['secondCurrency'] = values.firstCurrency
    newValues['firstCurrency'] = values.secondCurrency
    let number = roundPrice(!isReverse ? (1/Number(coeff)) * Number(values.firstNumber) : (Number(coeff) * Number(values.firstNumber)))
    newValues['secondNumber']= String(number)

    setIsReverse(!isReverse)
    if(isDispatch){
      setValues({
        ...values,
        ...newValues
      })
    } else {
      return newValues
    }
  }


  const changeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<enumCurrency>) => {

    let newValues = {
      ...values,
      [e.target.name]: e.target.value
    }
    
    // Проверка если пользователь выберет одинаковые валюты
    if(newValues.firstCurrency === newValues.secondCurrency){
      const switchedValues = switchCurrency(false)
      console.log(switchedValues)
      newValues = {
        ...newValues,
        ...switchedValues
      }
    }
    
    if(e.type === 'change'){
      //Меняются числа
      if(e.target.value.length > maxLength ){
        if( e.target.name === "firstNumber" ){
          newValues["firstNumber"] = e.target.value.substring(0,maxLength)
        } else {
          newValues["secondNumber"] = e.target.value.substring(0,maxLength)
        }
      }
        
      
      if(e.target.name === "firstNumber"){
        newValues.secondNumber = String(roundPrice(
          isReverse ? (1/Number(coeff)) * Number(newValues.firstNumber) : (Number(coeff) * Number(newValues.firstNumber))
          ))
      } else {
        newValues.firstNumber = String(roundPrice(
          !isReverse ? (1/Number(coeff)) * Number(newValues.secondNumber) : (Number(coeff) * Number(newValues.secondNumber)
        )))
      }
      
    } else {
      //Меняются валюты
      const tickerList = Object.keys(ITicker) as (keyof typeof ITicker)[]
      const index = tickerList.findIndex(i => i.includes(newValues.firstCurrency) && i.includes(newValues.secondCurrency))

      if (tickerList[index].indexOf(newValues.firstCurrency) == 0){
        setIsReverse(false)
      } else {
        setIsReverse(true)
      }
      setTicker(ITicker[tickerList[index]])
    }
    setValues(newValues);
  }


  useEffect(() => {
    if(coeff){
      const newValues = {
        ...values
      }
      newValues.secondNumber = String(roundPrice(
        isReverse ? (1/Number(coeff)) * Number(newValues.firstNumber) : (Number(coeff) * Number(newValues.firstNumber)
        )))

      setValues(newValues)
      setDate(new Date())
    }
  }, [coeff])


  return (
    <Paper 
      elevation={3}
      sx={{
        p: 2,
        borderRadius: '7px',
      }} >
      
      <div className={styles.blockConverter}>
      
        <ConverterInput 
          indexInput={'first'}
          listCurrency={currency}
          values={{
            currency: values.firstCurrency,
            number: values.firstNumber
          }}
          changeHandler={changeHandler}
          />
          
        {!isMobile && (
          <div className={styles.swapButton}>
            <IconButton type="button" disableRipple onClick={() => switchCurrency(true)}>
              <SwapHorizIcon />
            </IconButton>
          </div>
        )}

        <ConverterInput 
          indexInput={'second'}
          listCurrency={currency}
          values={{
            currency: values.secondCurrency,
            number: values.secondNumber
          }}
          changeHandler={changeHandler}
          />

      </div>

      <div className={styles.infoBlock}>
        <p className={styles.rate}>1 {currency.find(i => i.label === values.firstCurrency)?.fullname} = {isReverse ? roundPrice(1/Number(coeff)) : roundPrice(Number(coeff))} {currency.find(i => i.label === values.secondCurrency)?.fullname}</p>
        <p className={styles.infoLine}>Данные носят ознакомительный характер · {date.toLocaleString("ru-RU", {timeZone: "Europe/Moscow"})} МСК</p>
      </div>
    </Paper>
  );
}


export default Converter