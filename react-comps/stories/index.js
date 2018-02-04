import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
// import Button from '../components/Button';

const Button = (props) => {
    const {children, onClick} = props;
    return (
        <button {...props} >{children}</button>
    );
}

storiesOf('Button', module)
    .add('with text', () => (
        <Button onClick={action('clicked')}>Hello Button</Button>
    ))
    .add('with some emoji', () => (
        <Button onClick={action('clicked')}>😀 😎 👍 💯</Button>
    ));

import Card from './../components/Card'
storiesOf('Card', module)
    .add('default', () => (
        <Card />
    ))
    ;

import AudioRecorder from './../components/AudioRecorder'
storiesOf('AudioRecorder', module)
    .add('AudioRecorder', () => (
        <AudioRecorder />
    ))
    ;

