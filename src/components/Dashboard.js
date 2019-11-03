import React from 'react';
import { Card } from './Card';
import { FaHeart, FaCoffee, FaRegSun, FaMoon, FaBitcoin } from "react-icons/fa";
import './Dashboard.css';

export class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.updateCurrentStories = this.updateCurrentStories.bind(this);
        this.state = {
            error: null,
            stories: [],
            storiesLoaded: false,
            nightMode: true,
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
                    storiesLoaded: true
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
        let localData;
        localData = localStorage.getItem('currentStories');
        if (!localData) {
            localStorage.setItem('currentStories', this.state.currentStories);
            this.setState({
                currentStories: this.state.currentStories
            })
        } else {
            this.setState({
                currentStories: localData.split(',')
            })
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

    async componentWillUnmount() {
        clearInterval(this.timerID);
        // await this.updateStories();
    }

    render () {
        let nightMode;
        if (this.state.nightMode) {
            nightMode=<div className="Dashboard-header-settings-sun">
                <FaRegSun />
            </div>
        } else {
            nightMode=<div className="Dashboard-header-settings-moon">
                <FaMoon />
            </div>
        }
        if (this.state.storiesLoaded) {
            return (
                <div className="Dashboard">
                    <div className="Dashboard-header">
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
                    <div className="Dashboard-cards">
                        {this.state.currentStories.map((story, i) =>
                            <Card
                            data={this.state[story] || []}
                            title={story}
                            key={i}
                            id={i}
                            updateFunction={this.updateCurrentStories}
                            />
                        )
                        }
                    </div>
                    <div className="Dashboard-footer">
                        <div className="Dashboard-love-box">
                            <div className="Dashboard-footer-text">
                                Made with
                            </div>
                            <div className="Dashboard-footer-icon">
                                <FaHeart />
                            </div>
                            <div className="Dashboard-footer-text">
                                in India
                            </div>
                        </div>
                    </div>
                </div>
            )
        } else {
            return (
                <div>
                    <h1>Loading...</h1>
                </div>
            )
        }
    }
}

// {this.state.stories(item => <Card data={item} name='Name is...' />)}