import React from 'react';

function DisplayCardFront(props) {
    return (
        <div className={"card mx-auto"}>
            <div className={"card-body"}>
                <h4 className={"card-subtitle mb-2 text-muted"}>{props.index}/{props.cardCount}</h4>
                <div className="card-title">
                    <span>{props.word}</span>
                </div>
                <button
                    className={"btn btn-primary"}
                    onClick={() => props.flipClick()}
                >Flip Card</button>
            </div>
        </div>
    );
}

function DisplayCardBack(props) {
    return (
        <div className={"card mx-auto"}>
            <div className={"card-body"}>
                <h4 className={"card-subtitle mb-2 text-muted"}>{props.index}/{props.cardCount}</h4>
                <div className="card-body">
                    <p>{props.def}</p>
                </div>
                <button
                    className={"btn btn-primary"}
                    onClick={() => {
                        if (props.index === props.cardCount) {
                            props.returnToCollectionsClick();
                        } else {
                            props.nextCardClick()
                        }
                    }
                    }
                >{props.index === props.cardCount ? 'Return to Collections' :  'Next Card'}</button>
            </div>
        </div>
    );
}


class StudyCards extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cards: props.cards,
            numberOfCards: 0,
            studyIndex: 0,
            IsWordDisplay: true
        }
    }

    FlipCard() {
        this.setState({
            IsWordDisplay: false
        })
    }

    NextCard() {
        let index = this.state.studyIndex + 1;
        this.setState({
            IsWordDisplay: true,
            studyIndex: index
        })
        console.log(this.state.studyIndex);
    }

    
    ReturnToRecollections() {
        this.props.onReturnToCollections();
    }

    componentDidMount() {

    }

    componentWillUnmount() {
    }

    render() {
        let numberOfCards = this.state.cards.length;
        let index = this.state.studyIndex;
        let displayIndex = this.state.studyIndex + 1;

        if (this.state.IsWordDisplay) {
            let currentWord = this.state.cards[index].word;
            return (
                <DisplayCardFront
                    word={currentWord}
                    index={displayIndex}
                    flipClick={() => this.FlipCard()}
                />
            );
        } else {
            let currentDef = this.state.cards[index].definition;
            return (
                <DisplayCardBack
                    def={currentDef}
                    index={displayIndex}
                    cardCount={numberOfCards}
                    nextCardClick={() => this.ReturnToRecollections()}
                />
            );
        }
    }
}

export default StudyCards;