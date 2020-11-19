import React from 'react';
import './bootstrap.min.css';

const CardData = (props) => {

    return (
        <div className={"card col-3 m-1"}>
            <div className={"card-body"}>
                <h5 className={"card-title"}>{props.currentCardNumber}/{props.numOfCards}</h5>
                <h1 className={"card-subtitle mb-2 text-muted"}>{props.cardDisplay}</h1>

                <p>{props.def}</p>
                <button className={"flipCardBtn"} onClick={props.ClickHandler(props.index)} >Reveal</button>
                {/* <button className={"btn-block"} >I know it!</button>
                <button className={"btn-block"}>I Don't know it...</button> */}
            </div>
        </div>
    );
}

export default CardData;
