import React from 'react'
import { SearchBoxPropsType } from './SearchBoxPropsType'
import DragIcon from '../../../svgs/DragIcon'
import { icon, dragicon, searchbox, input, searchicon, placeholderStyles } from './styles';

const SearchBox: React.FC<SearchBoxPropsType> = ({handleInputChange}) => {
 
    return (
        <div style={searchbox}>
            <div style={{...icon, ...dragicon}}>
                <DragIcon height='22' width='22' />
            </div>
            <input type="text" style={{...input, ...placeholderStyles['::placeholder']}} placeholder="Hinted search text" onChange={handleInputChange} />
            <div style={{ ...icon, ...searchicon }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                    <path d="M20 20l-4-4"></path>
                    <circle cx="10" cy="10" r="8"></circle>
                </svg>
            </div>
        </div>
    )
}
export default SearchBox;
