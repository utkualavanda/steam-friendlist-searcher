import React from 'react';
import Aux from '../../hoc/Auxiliary';

const Input = (props) => {
    return (
        <Aux>
            <label>Enter the Id : </label>
            <input type="text" onChange={(event)=>props.steamId(event.target.value)}/>
        </Aux>
    )
}

export default Input;
