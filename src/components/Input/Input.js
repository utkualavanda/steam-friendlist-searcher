import React from 'react';
import Aux from '../../hoc/Auxiliary';
import Button from '../Button/Button';

const Input = (props) => {
    return (
        <Aux>
            <label>Enter the Id : </label>
            <input type="text" onChange={(event)=>props.steamId(event.target.value)}/>
            <Button onClick={props.changeId}>Search</Button>
        </Aux>
    )
}

export default Input;
