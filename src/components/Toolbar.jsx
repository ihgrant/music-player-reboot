// @flow
import React from 'react';
import classNames from 'classnames';

export default function Toolbar(props: {
    children: ?React$Children,
    ptType: 'header' | 'footer',
    style: Object,
    title: ?string
} = { ptType: 'header', style: {} }) {
    const classes = classNames({
        toolbar: true,
        'toolbar-header': props.ptType !== 'footer',
        'toolbar-footer': props.ptType === 'footer'
    });
    const title = props.title ? <h1 className="title">{props.title}</h1> : null;

    if (props.ptType === 'footer') {
        return (
            <footer className={classes} style={props.style}>
                {title}
                {props.children}
            </footer>
        );
    }
    return (
        <header className={classes} style={props.style}>
            {title}
            {props.children}
        </header>
    );
}
