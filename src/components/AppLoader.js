import React from 'react';
import './AppLoader.css';
import { FaSpinner } from 'react-icons/fa';

export class AppLoader extends React.Component {
    render () {
        return (
            <div className="AppLoader">
                <div className="AppLoader-appname">
                    DevStory
                </div>
                <div className="AppLoader-gif">
                    <FaSpinner />
                </div>
            </div>
        )
    }
}