/*
 * @Author: Hong.Zhang
 * @Date: 2023-03-21 17:01:37
 * @Description:
 */
import React, { useState, useRef } from 'react';
import { message, Input, Tag } from 'antd';
import 'antd/es/message/style';
import 'antd/es/input/style';
import 'antd/es/tag/style';
import './index.css';

interface IInputWithTagProps {
  value?: any[];
  onChange?: (v: any[]) => void;
}

export default (props: IInputWithTagProps) => {
  const { value = [], onChange = () => {} } = props;
  const [valueInput, setValueInput] = useState('');
  const inputRef = useRef<any>(null);

  function pressEnter(e: any) {
    if (e.target.value) {
      onChange([...value, e.target.value]);
      setValueInput('');
    } else {
      message.error('No input text');
    }
    e.preventDefault();
  }

  function preventDefault(str: string, e: any) {
    e.preventDefault();
    onChange(value.filter((item) => item !== str));
  }

  function focus() {
    inputRef.current && inputRef.current.focus();
  }

  function handleChange(e: any) {
    let elm = e.target;
    setValueInput(elm.value);
  }

  function keyDown(e: any) {
    if (e.keyCode === 8 && !valueInput) {
      onChange(
        value.filter(function (v, i, ar) {
          return i !== ar.length - 1;
        }),
      );
    }
  }

  return (
    <div>
      <div onClick={focus} className='input-with-tag-container'>
        <ul className='input-with-tag-ul'>
          {value &&
            value.map((item, index) => (
              <li key={index} style={{ float: 'left', marginBottom: '8px' }}>
                <Tag closable onClose={(e: any) => preventDefault(item, e)}>
                  {item}
                </Tag>
              </li>
            ))}
          <li style={{ float: 'left' }}>
            <Input
              onKeyDown={keyDown}
              ref={inputRef}
              value={valueInput}
              className={'input-with-tag-input'}
              onPressEnter={pressEnter}
              onChange={handleChange}
            />
          </li>
        </ul>
      </div>
    </div>
  );
};
