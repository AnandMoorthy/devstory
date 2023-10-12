import React from 'react';
import { FaCog, FaTimes, FaWindowMaximize } from "react-icons/fa";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import './Card.css';

export class Card extends React.Component {

    constructor(props) {
        super(props)
        this.changeStory = this.changeStory.bind(this);
        this.changeCategory = this.changeCategory.bind(this);
        this.fallBack = this.fallBack.bind(this);
        this.enableStoryHelper = this.enableStoryHelper.bind(this);
        this.disableStoryHelper = this.disableStoryHelper.bind(this);
        this.state = {
            openStoryList: false,
            activeCard: null,
            currentStory: null,
            storyHelper: false,
            availableCategories: [],
            availableStories: {},
            currentCategory: null,
            popUpData:[],
            popUpFlag: false,
            currentStories: [
                'Product Hunt', 
                'Tech Crunch', 
                'Hacker News', 
                'Mashable', 
                'Lifehacker',
                'Makeuseof', 
                'The Next Web', 
                'Reddit', 
                'Coin Desk',
                'Gizmodo',
                'CNET News',
                'Medium'
            ]
        }
    }

    async componentDidMount() {
        await this.loadLocalStorage();
    }

    async loadLocalStorage() {
        let currentStories, availableStories, availableCategories;
        currentStories = localStorage.getItem('currentStories');
        availableStories = localStorage.getItem('availableStories');
        availableCategories = localStorage.getItem('availableCategories');
        if(!availableCategories) {
            availableCategories = '';
        }
        this.setState({
            availableCategories: availableCategories.split(','),
            availableStories: JSON.parse(availableStories),
            currentStories: currentStories.split(',')
        });
    }

    changeStory(event) {
        this.setState({
            currentStory: event.value
        });
    }

    changeCategory(event) {
        let getIt = this.state.availableStories[event.value].sources;
        this.setState({
            currentCategory: event.value,
            currentStories: getIt,
            currentStory: getIt[0]
        });
    }

    fallBack(event) {
        this.props.updateFunction(event);
        this.setState({
            openStoryList: false
        });
    }

    enableStoryHelper() {
        this.setState({
            storyHelper: true
        })
    }

    disableStoryHelper() {
        this.setState({
            storyHelper: false
        })
    }

    render () {
        let setting, storyHelper;
        if(this.state.storyHelper) {
            storyHelper =
            <div className={this.props.nightMode? "Card-settings Card-settings-nightmode" : "Card-settings Card-settings-daymode"}>
                {/* <div className="Card-settings-more">More</div> */}
                <div title="Maximize">
                    <FaWindowMaximize
                        className="Card-settings-maximize"
                        onClick={() => {
                            this.setState({
                                popUpData: this.props, 
                                popUpFlag: true,
                                openStoryList: false,
                                storyHelper: false
                            });
                        }}
                    />
                </div>
                <div title="Setting">
                    <FaCog
                        className="Card-settings-cog"
                        onClick={ () => this.setState({
                            openStoryList: true,
                            currentStory: this.props.title
                        })}
                    />
                </div>
            </div>
        } else {
            storyHelper = '';
        }
        if (this.state.openStoryList) {
           setting = <div className="Card-inside-box">
                <div className="Card-dropdown-box">
                    <div className={this.props.nightMode? "Card-dropdown-lable-nightmode" : "Card-dropdown-lable-daymode"}>
                        Choose Category
                    </div>
                    <Dropdown
                        options={this.state.availableCategories}
                        placeholder="Change Story Category"
                        value={this.state.currentCategory}
                        className="Card-dropdown"
                        onChange={this.changeCategory}
                        key={this.props.id}
                        style={{ width: '100%' }}
                    />
                </div>
                <div className="Card-dropdown-box">
                    <div className={this.props.nightMode? "Card-dropdown-lable-nightmode" : "Card-dropdown-lable-daymode"}>
                        Choose Story
                    </div>
                    <Dropdown 
                        options={this.state.currentStories}
                        placeholder="Change Story Domain"
                        value={this.state.currentStory}
                        className="Card-dropdown"
                        onChange={this.changeStory}
                        key={this.props.key}
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
                    {
                        this.state.popUpFlag ? (
                            <div className="Background-mask">
                                <div className={this.props.nightMode ? 'Popup-box Popup-box-nightmode' : 'Popup-box Popup-box-daymode'}>
                                    <div className="Popup-header">
                                        <div>{this.state.popUpData.title}</div>
                                        <div className="Close-button">
                                            <FaTimes 
                                                onClick={() => {
                                                    this.setState({ popUpFlag: false })
                                                }}
                                            />
                                        </div>
                                    </div>
                                    {this.state.popUpData.data.map((item, i) => 
                                        <div 
                                            className={this.props.nightMode ? "Popup-story Popup-story-nightmode" : "Popup-story Popup-story-daymode"}
                                            key={i}
                                            onClick={ ()=> window.open(item.link, "_blank")}
                                        >
                                            {`${i+1}. ${item.title}`}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ) : null
                    }
                </div>
                {storyHelper}
            </div>
            <div className="Card-story-box">
                {this.props.data.slice(0,5).map((item, i) => 
                    <div 
                        className={this.props.nightMode? "Card-story Card-story-nightmode" : "Card-story Card-story-daymode"}
                        key={i}
                        onClick={ ()=> window.open(item.link, "_blank")}
                    >
                        {`${i+1}. ${item.title}`}
                    </div>
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