import React from 'react';
import './FooTouer.css';
import MyButton from "../Button/Button";
import ButtonComponent from "../Button/Button";


function FooTouer() {
    return (
        <>
            <div className="FooTouer">
                HelloWorld
            </div>
            {/*<Button name={"Hello button"} onClick={()=>alert(`Hi, I'm clicked :)))`)}/>*/}
            {ButtonComponent({name: "Hello button", onClick: (() => alert(`Hi, I'm clicked!`)),})}
        </>
    );
}

export default FooTouer;
