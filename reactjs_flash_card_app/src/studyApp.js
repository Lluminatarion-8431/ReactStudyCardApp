import React from 'react';
import axios from 'axios';
import StudyCards from './StudyCards';
import CardData from './CardData';
import { render } from 'react-dom';

function DisplayCollections(props) {
    return (
        <div className="row justify-content-between">
            {props.collections.map((collection, index) => (
                <CollectionCard
                title={collection.title}
                cardCount={collection.cards.length}
                buttonClick={(id) => props.SelectCollection(id)}
                index={index}
                key={index}
                />
            ))}

        </div>
    );
}

function CollectionCard(props) {
    return (
        <div className={"card col-3 m-1"}>
            <div className={"card-body"}>
                <h2 className={"card-title"}>{props.title}</h2>
                <h4 className={"card-subtitle mb-2 text-muted"}>Number of Cards {props.cardCount}</h4>

            <button
                className={"btn btn-primary"}
                onClick={() => props.buttonClick(props.index)}
            >Select</button>
            </div>
        </div>
    );
}

class StudyApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasData: false,
            collections: [],
            selectedCollection: -1,
            titles: [],
            selectedCards:[]
        };

        this.selectCollection = this.SelectCollection.bind(this);
    }

    GetCollectionsLong(){
        axios({
            method: 'get',
            url: 'https://localhost:44393/api/collection',
            responseType: 'json'
        }).then((res) => {
            
        }).catch((err) => {
            console.log(err);
        })
    }
}

