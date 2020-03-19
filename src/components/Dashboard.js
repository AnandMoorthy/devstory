import React from 'react';
import { Card } from './Card';
import { AppLoader } from './AppLoader';
import { Modal } from './Modal';
import { FaHeart, FaMoon, FaBitcoin, FaTimes, FaBars, FaSun } from "react-icons/fa";
import './Dashboard.css';

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
            time: new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }),
            currentStories: [
                'product_hunt', 
                'tech_crunch', 
                'hacker_news', 
                'mashable', 
                'lifehacker',
                'makeuseof', 
                'the_next_web', 
                'reddit', 
                'coin_desk'
            ]

        }
    }

    async updateCurrentStories(event) {
        let toUpdate, currentStoryList, currentIndex;
        event.preventDefault();
        toUpdate = event.target.id.split(',')
        console.log(toUpdate);
        currentStoryList = this.state.currentStories;
        currentIndex = parseInt(toUpdate[0], 10);
        console.log(currentStoryList, currentIndex);
        currentStoryList[currentIndex] = toUpdate[1] 
        console.log(currentStoryList);
        this.setState({ currentStories: currentStoryList});
        localStorage.setItem('currentStories', currentStoryList);
        await this.updateStories();
    }

    async updateStories() {
        fetch(`http://localhost:8000/dashboard/?data=${this.state.currentStories}`)
        .then(res => res.json())
        .then(
            (result) => {
                console.log("Az");
                result.data.forEach(story => {
                    this.setState({
                        [story.name]: story.data,
                    })
                });
                this.setState({
                    bitcoin: result.bitcoin || null,
                    storiesLoaded: true,
                    availableStories: result.available_stories
                });
                console.log("The state is", this.state);
            }, (err) => {
                console.log("Error?");
                console.log(err);
                this.setState({
                    error: 'This is the error'
                })
            }
        )
    }

    async setOrloadLocalStorage() {
        let localData, nightMode, availableStories;
        localData = localStorage.getItem('currentStories');
        nightMode = localStorage.getItem('nightMode');
        availableStories = localStorage.getItem('availableStories');
        if (!localData || !availableStories) {
            localStorage.setItem('currentStories', this.state.currentStories);
            localStorage.setItem('availableStories', this.state.availableStories);
            this.setState({
                currentStories: this.state.currentStories,
                nightMode: nightMode || false,
                availableStories: this.state.availableStories
            })
        } else {
            console.log("OUT");
            this.setState({
                currentStories: localData.split(','),
                nightMode: nightMode || false,
                availableStories: availableStories || {}
            })
        }
    }

    async componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(),
            1000
          );
        await this.updateStories();
        await this.setOrloadLocalStorage();
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
                <div className="Dashboard-header-settings-close">
                    <FaBars onClick={this.openSettings}/>
                </div>
                <div className="Dashboard-header-settings-about">
                    About
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
                                <div className="D-center-appname">
                                    DevStory
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
                        <div className="Dashboard-cards">
                            {this.state.currentStories.map((story, i) =>
                                <Card
                                data={this.state[story]? this.state[story].slice(0,5) : []}
                                title={story}
                                key={i}
                                id={i}
                                nightMode={this.state.nightMode}
                                updateFunction={this.updateCurrentStories}
                                />
                            )
                            }
                        </div>
                        <div className="Dashboard-footer">
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