import React from 'react'
import { buttonStyle } from './styles';
import { ButtonPropsType } from './ButtonPropsType';

const Button: React.FC<ButtonPropsType> = ({ Text }) => {
    return (
        <div>
            <button style={buttonStyle}>{Text}</button>
        </div>
    )
}

export default Button;
