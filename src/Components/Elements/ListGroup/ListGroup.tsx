import React from 'react';
import AdditionIcon from '../../../svgs/AdditionIcon';
import { ListGroupPropsType } from './ListGroupPropsType';
import { listContainer, text, line, icon } from './styles';

const ListGroup: React.FC<ListGroupPropsType> = ({ groupText, addIcon = true }) => {


  return (
    <div style={listContainer}>
      <span style={text}>{groupText}</span>
      <hr style={line} />
      {addIcon ? <i style={icon}>
        <AdditionIcon />
      </i> :
        null
      }

    </div>
  )
}
export default ListGroup;