import React, { FC, memo, useState } from 'react';
import InputBase from '@mui/material/InputBase';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

import styles from './ConverterInput.module.scss'
import { ICurrency, enumCurrency } from '~/types';

interface IValuesInput{
  currency: enumCurrency,
  number: string,
}

interface Props {
    listCurrency: ICurrency[],
    values: IValuesInput,
    indexInput: 'first' | 'second',
    changeHandler: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<enumCurrency>) => void,
}

const ConverterInput: FC<Props> = memo(({listCurrency, indexInput, values, changeHandler}) => {

  


  return (
    <div className={styles.controlBox}>
          <div className={styles.priceBox}>
            <InputBase
              sx={{flex: 1 }}
              type='number'
              value={values.number}
              name={`${indexInput}Number`}
              onChange={changeHandler}
            />
          </div>
          <div className={styles.currencyBox}>
          <Select
            classes={{
              select: styles.selectRoot,
            }}
            value={values.currency}
            name={`${indexInput}Currency`}
            onChange={changeHandler}
            IconComponent={() => (
              <div className={styles.directionIcon}>
                <svg focusable="false" xmlns="http://www.w3.org/2000/svg" width="8" height="14"><path d="M4 0l4 6H0l4-6zm0 14l4-6H0l4 6z"></path></svg>
              </div>
              
            )}
            sx={{
              width: '100%', 
              '.css-1d3z3hw-MuiOutlinedInput-notchedOutline': {
                border: 'none'
              }
            }}
            autoWidth
            label="Age"
            renderValue={(i) => (
              <div className={styles.selectedItem}>
                  <img height={18} width={18} src={listCurrency[listCurrency.findIndex(_i => _i.label == i)].image}/>
                  <span>{i}</span>
              </div>
            )}
          >
            {listCurrency.map((i) => (
              <MenuItem value={i.label} key={i.label}>
                  <img height={15} width={15} src={i.image} alt="" style={{marginRight: '5px'}}/>
                  <span>{i.label}</span>
              </MenuItem>
            ))}
            
          </Select>
          </div>

        </div>
  )
})

export default ConverterInput
