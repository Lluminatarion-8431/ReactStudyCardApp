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
            selectedCards: []


        };

        this.SelectCollection = this.SelectCollection.bind(this);
    }

    GetCollectionsLong() {
        axios({
            method: 'get',
            url: 'https://localhost:44393/api/collection',
            responseType: 'json'
        }).then((res) => {


        }).catch((err) => {
            console.log(err);
        })

    }


    async GetCollections() {
        let collections = [];
        let newTitles = [];
        const res = await axios.get(`https://localhost:44393/api/collection`)
            .then((res) => {
                console.log("It was successful and got :\n" + res.data);
                console.log(...res.data);
                collections = [...res.data];
                collections.map((col) => {
                    newTitles.push(col.title);
                });

                this.setState({
                    hasData: true,
                    collections: collections,
                    titles: newTitles
                });

                console.log("New Titles are: \n\n*********\n" + newTitles);
                console.log("Titles are: \n\n*********\n" + this.state.titles);
            })
            .catch((error) => {
                console.log('An error has occured.\n' + error);
            })
    }

    SelectCollection(id) {
        if (this.state.collections[id]) {
            let collectionCards = this.state.collections[id].cards;
            console.log("Collection Cards are: ");
            console.log(collectionCards);
            this.setState({
                selectedCollection: id,
                selectedCards: collectionCards
            });
        } else {
            console.log("Collections is empty.");
        }
    }


    componentDidMount() {
        this.GetCollections();
    }

    componentWillUnmount() {
    }

    render() {

        let displayCards = [];

        if (this.state.selectedCollection > -1) {
            let selectedCards = this.state.collections[this.state.selectedCollection].cards;

            return (
                <div className="container">

                    <StudyCards
                        cards={selectedCards}
                        onReturnToCollections={() => this.setState({selectedCollection: -1})}
                    />
                </div>
            );
        } else {
            return (
                <div className="container">

                    <DisplayCollections
                        collections={this.state.collections}
                        SelectCollection={(id) => this.SelectCollection(id)}
                    />
                </div>
            )
        }
    }
}

export default StudyApp;