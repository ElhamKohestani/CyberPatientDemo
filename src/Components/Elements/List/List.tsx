import React, { useState } from 'react';
import { ListElementPropsType } from './ListElementPropsType';
import DragIcon from '../../../svgs/DragIcon';
import {listItem, dragIcon, textContainer, mainText, subText, numberInput} from './styles';


const List: React.FC<ListElementPropsType> = ({ MainText, SubText, Score }) => {
  return (
    <>
      <div style={listItem}>
        <div style={dragIcon}>
          <DragIcon />
        </div>
        <div style={textContainer}>
          <div style={mainText}>{MainText}</div>
          <div style={subText}>{SubText}</div>
        </div>
        <input type="number" onChange={() => {console.log("handle score input")}} style={numberInput} value={Score.toString()} />
      </div>
    </>
  )
}
export default List;