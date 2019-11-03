import React from 'react';
import { FaCog } from "react-icons/fa";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import './Card.css';

export class Card extends React.Component {

    constructor(props) {
        super(props)
        this.changeStory = this.changeStory.bind(this);
        this.fallBack = this.fallBack.bind(this);
        this.state = {
            openStoryList: false,
            activeCard: null,
            currentStory: null,
            currentStories: [
                "product_hunt",
                "coin_desk",
                "hacker_news",
                "tech_crunch",
                "reddit",
                "the_next_web",
                "mashable",
                "gizmodo",
                "lifehacker",
                "makeuseof",
            ]
        }
    }

    changeStory(event) {
        console.log("Calling Change Story");
        console.log(event.value);
        this.setState({
            currentStory: event.value
        });
    }

    fallBack(event) {
        this.props.updateFunction(event);
        this.setState({
            openStoryList: false
        });
    }

    render () {
        let setting;
        if (this.state.openStoryList) {
           setting = <div className="Card-inside-box">
                <div className="Card-dropdown-box">
                    <Dropdown 
                        options={this.state.currentStories}
                        placeholder="Change Story Domain"
                        value={this.props.title}
                        className="Card-dropdown"
                        onChange={this.changeStory}
                        key={this.props.title}
                    />
                </div>
                <div className="Card-dropdown-save">
                    <div 
                        className="Card-dropdown-save-button"
                        onClick={this.fallBack}
                        id={this.props.id+','+this.state.currentStory}
                    >
                        Save
                    </div>
               </div>
               </div>;
        } else {
            setting = <div className="Card-inside-box">
            <div className="Card-title-box">
                <div className={`Card-title ${this.props.title}`}>
                    {this.props.title.replace('_', '  ')}
                </div>
                <div className="Card-settings">
                    <FaCog
                        onClick={ () => this.setState({
                            openStoryList: true
                        })}
                    />
                </div>
            </div>
            <div className="Card-story-box">
                {this.props.data.map((item, i) => 
                <div 
                className="Card-story"
                key={i}
                onClick={ ()=> window.open(item.link, "_blank")}
                >{item.title}</div>
                )}
            </div>
        </div>
        }
        return (
            <div className="Card-box">
                {setting}
            </div>
        )
    }
}