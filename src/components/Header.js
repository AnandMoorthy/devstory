import React from 'react';
import './Header.css';

export class Header extends React.Component {
    render () {
        return (
            <div className="Header">
                <div className="Header-content">
                    <div className="Header-logo">
                        DevStory
                    </div>
                </div>
            </div>
        )
    }
}