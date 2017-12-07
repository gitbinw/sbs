import React from 'react';

export const Episode = props => {
    return (
        <li className="slide"> 
            <div className="item">
                <span className="name">{props.name}</span>
                <img src={props.thumbnail} alt={props.name} /> 
                <span className="title">{props.title}</span>
                <span className="subtitle">{props.subtitle}</span>
            </div>
        </li>
    );
}