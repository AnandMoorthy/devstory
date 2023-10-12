import React from 'react';
import { Card } from './Card';
import { AppLoader } from './AppLoader';
import { FaHeart, FaMoon, FaBitcoin, FaBars, FaSun } from "react-icons/fa";
import './Dashboard.css';
import logo from '../DevStory.svg';

import result from './data.json';

window.$availableCategories = 'This is the available Cats';

export class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.updateCurrentStories = this.updateCurrentStories.bind(this);
        this.openSettings = this.openSettings.bind(this);
        this.nightMode = this.nightMode.bind(this);
        this.state = {
            error: null,
            stories: [],
            openSettings: true,
            storiesLoaded: false,
            availableStories: {},
            nightMode: false,
            availableCategories: [],
            time: new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }),
            chromeExtensionLink: 'https://chrome.google.com/webstore/detail/devstory/dggekjoedccjighabcakmobiifmohfjd',
            firefoxExtensionLink: 'https://addons.mozilla.org/en-US/firefox/addon/devstory/',
            currentStories: [
                'The Next Web',
                'Tech Crunch',
                'Product Hunt',
                'Hacker News',
                'Mashable',
                'Lifehacker',
                'Makeuseof',
                'Reddit',
                'Coin Desk'
            ]

        }
    }

    async updateCurrentStories(event) {
        let toUpdate, currentStoryList, currentIndex;
        event.preventDefault();
        toUpdate = event.target.id.split(',')
        currentStoryList = this.state.currentStories;
        currentIndex = parseInt(toUpdate[0], 10);
        currentStoryList[currentIndex] = toUpdate[1] 
        this.setState({ currentStories: currentStoryList});
        localStorage.setItem('currentStories', currentStoryList);
        await this.updateStories();
    }

    // async updateStories() {
    //     fetch(`https://api.devstory.tech/dashboard/?data=${this.state.currentStories}`)
    //     .then(res => res.json())
    //     .then(
    //         (result) => {
    //             result.data.forEach(story => {
    //                 this.setState({
    //                     [story.name]: story.data,
    //                 })
    //             });
    //             let availableCategories = [];
    //             if(result.available_stories) {
    //                 availableCategories = Object.keys(result.available_stories);
    //             }
    //             localStorage.setItem('availableStories', JSON.stringify(result.available_stories));
    //             localStorage.setItem('availableCategories', availableCategories);
    //             this.setState({
    //                 bitcoin: result.bitcoin || null,
    //                 storiesLoaded: true,
    //                 availableStories: result.available_stories,
    //                 availableCategories: availableCategories
    //             });
    //         }, (err) => {
    //             console.log("Error?");
    //             console.log(err);
    //             this.setState({
    //                 error: 'This is the error'
    //             });
    //         }
    //     )
    // }

    async updateStories() {
        result.data.forEach(story => {
            this.setState({
                [story.name]: story.data,
            })
        });
        let availableCategories = [];
        if(result.available_stories) {
            availableCategories = Object.keys(result.available_stories);
        }
        localStorage.setItem('availableStories', JSON.stringify(result.available_stories));
        localStorage.setItem('availableCategories', availableCategories);
        this.setState({
            bitcoin: result.bitcoin || null,
            storiesLoaded: true,
            availableStories: result.available_stories,
            availableCategories: availableCategories
        });
    }

    async setOrloadLocalStorage() {
        let localData, nightMode, availableStories, availableCategories;
        localData = localStorage.getItem('currentStories');
        nightMode = localStorage.getItem('nightMode');
        availableStories = localStorage.getItem('availableStories');
        availableCategories = localStorage.getItem('availableCategories');
        nightMode = nightMode || false;
        if (!localData) {
            localStorage.setItem('currentStories', this.state.currentStories);
            this.setState({
                currentStories: this.state.currentStories,
                nightMode: JSON.parse(nightMode)
            });
        } else {
            this.setState({
                currentStories: localData.split(','),
                nightMode: JSON.parse(nightMode),
                availableStories: availableStories || {},
                availableCategories: availableCategories
            });
        }
    }

    async componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(),
            1000
          );
        await this.setOrloadLocalStorage();
        await this.updateStories();
    }

    tick() {
        this.setState({
          time: new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
        });
      }
    
    openSettings() {
        // this.setState({
        //     openSettings: !this.state.openSettings
        // })
    }

    async componentWillUnmount() {
        clearInterval(this.timerID);
        // await this.updateStories();
    }

    nightMode() {
        localStorage.setItem('nightMode', !this.state.nightMode);
        this.setState({
            nightMode: !this.state.nightMode
        });
    }

    render () {
        let settings;
        if (this.state.openSettings) {
            settings = 
            <div className="Dashboard-header-open-settings">
                <div className="Dashboard-header">
                    <div
                        className="Dashboard-header-settings-about"
                        onClick={ ()=> window.open("https://devstory.tech/about", "_blank")}
                    >
                        About
                    </div>
                    <div
                        className="Dashboard-header-settings-extension"
                        >
                        <div>
                            Extension
                        </div>
                        <div className="Dashboard-header-settings-extension-content">
                            <div
                                className="Dashboard-header-extension-content-list"
                                onClick={ ()=> window.open(this.state.firefoxExtensionLink, "_blank")}
                            >
                                Firefox
                            </div>
                            <div
                                className="Dashboard-header-extension-content-list"
                                onClick={ ()=> window.open(this.state.chromeExtensionLink, "_blank")}
                            >
                                Chrome
                            </div>
                        </div>
                    </div>
                </div>
                <div className={this.state.nightMode? "Dashboard-header-settings-icon Dashboard-header-settings-icon-sun" : "Dashboard-header-settings-icon Dashboard-header-settings-icon-moon"}>
                    {this.state.nightMode? <FaSun onClick={this.nightMode}/> : <FaMoon onClick={this.nightMode}/>}
                </div>
            </div>
        } else {
            settings = <FaBars onClick={this.openSettings}/>
        }
        if (this.state.storiesLoaded) {
            return (
                <div className={this.state.nightMode? "App-nightmode": "App-daymode"}>
                    <div className="Dashboard">
                        <div className="D-header">
                            <div className="D-left">
                                <div className="Dashboard-header-settings">
                                    {settings}
                                </div>
                            </div>
                            <div className="D-center">
                                <div>
                                    <img src={logo} width={80} alt="DevStory Logo"/>
                                </div>
                            </div>
                            <div className="D-right">
                                <div className="Dashboard-header-time">
                                    {this.state.time}
                                </div>
                                <div className="Dashboard-header-bitcoin-logo">
                                    <FaBitcoin />
                                </div>
                                <div className="Dashboard-header-bitcoin-price">
                                    ${this.state.bitcoin}
                                </div>
                            </div>
                        </div>
                        <div className={this.state.nightMode? "Dashboard-cards-nightmode": "Dashboard-cards-daymode"}>
                            {this.state.currentStories.map((story, i) =>
                                <Card
                                    data={this.state[story]? this.state[story] : []}
                                    title={story}
                                    key={i}
                                    id={i}
                                    nightMode={this.state.nightMode}
                                    updateFunction={this.updateCurrentStories}
                                />
                            )
                            }
                        </div>
                        <div className={this.state.nightMode ? "Dashboard-footer-nightmode" : "Dashboard-footer-daymode"}>
                            <div className="Dashboard-love-box">
                                <div className={this.state.nightMode? "Dashboard-footer-text-nightmode": "Dashboard-footer-text-daymode"}>
                                    Made with 3000
                                </div>
                                <div className="Dashboard-footer-icon">
                                    <FaHeart />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        } else {
            return (
                <AppLoader />
            )
        }
    }
}

// {this.state.stories(item => <Card data={item} name='Name is...' />)}