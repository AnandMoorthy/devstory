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
        this.enableStoryHelper = this.enableStoryHelper.bind(this);
        this.disableStoryHelper = this.disableStoryHelper.bind(this);
        this.state = {
            openStoryList: false,
            activeCard: null,
            currentStory: null,
            storyHelper: false,
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
                "cnet_news",
                "medium"
            ]
        }
    }

    changeStory(event) {
        console.log("Calling Change Story");
        console.log(event.val);
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

    enableStoryHelper() {
        console.log("Enable Story Helper Module");
        this.setState({
            storyHelper: true
        })
    }

    disableStoryHelper() {
        console.log("Disable Story Helper Module");
        this.setState({
            storyHelper: false
        })
    }

    render () {
        let setting, storyHelper;
        if(this.state.storyHelper) {
            storyHelper =
            <div className={this.props.nightMode? "Card-settings Card-settings-nightmode" : "Card-settings Card-settings-daymode"}>
                <div className="Card-settings-more">More</div>
                <FaCog
                    className="Card-settings-cog"
                    onClick={ () => this.setState({
                        openStoryList: true,
                        currentStory: this.props.title
                    })}
                />
            </div>
        } else {
            storyHelper = '';
        }
        if (this.state.openStoryList) {
           setting = <div className="Card-inside-box">
                <div className="Card-dropdown-box">
                    <Dropdown 
                        options={this.state.currentStories}
                        placeholder="Change Story Domain"
                        value={this.state.currentStory}
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
            setting = <div className="Card-inside-box" onMouseEnter={this.enableStoryHelper} onMouseLeave={this.disableStoryHelper}>
            <div className="Card-title-box">
                <div className={this.props.nightMode? "Card-title Card-title-nightmode" : "Card-title Card-title-daymode"}>
                    {this.props.title.replace('_', '  ')}
                </div>
                {storyHelper}
            </div>
            <div className="Card-story-box">
                {this.props.data.map((item, i) => 
                <div 
                className={this.props.nightMode? "Card-story Card-story-nightmode" : "Card-story Card-story-daymode"}
                key={i}
                onClick={ ()=> window.open(item.link, "_blank")}
                >{item.title}</div>
                )}
            </div>
        </div>
        }
        return (
            <div className={this.props.nightMode? "Card-box Card-box-nightmode" : "Card-box Card-box-daymode"}>
                {setting}
            </div>
        )
    }
}