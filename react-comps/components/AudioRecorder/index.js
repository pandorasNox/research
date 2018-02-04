import React, { Component } from 'react';
import styled from 'styled-components';

// class AudioRecorder extends Component {
//     state = {

//     };
// }

class AudioRecorder extends Component {

    state = {
        isGetUsermediaSupported: false,
        isRecording: false,
        // chunks: [],
        clips: [],
    };

    chunks = [];

    constructor(props) {
        super(props);
        const that = this;

        const isGetUsermediaSupported = (
            navigator &&
            navigator.mediaDevices &&
            navigator.mediaDevices.getUserMedia
        );

        this.state.isGetUsermediaSupported = isGetUsermediaSupported;

        isGetUsermediaSupported && this.askForMicrophonePermission();
        //  navigator.mediaDevices.getUserMedia(constraints).then(onSuccess, onError);

    }

    askForMicrophonePermission = () => {
        const that = this;
        // const {chunks} = this.state;

        navigator.mediaDevices.getUserMedia (
            { audio: true }
        )
        // Success callback
        .then(function(stream) {
            const mediaRecorder = new MediaRecorder(stream);
            let {chunks} = that;

            mediaRecorder.ondataavailable = function(e) {
                // const {chunks} = that.state;
                // console.log('onRecord ... ondataavailable');
                // const newChunks = chunks.slice(0);
                // newChunks.push(e.data);
                // that.setState({chunks:newChunks});
                const newChunks = chunks.slice(0);
                newChunks.push(e.data);
                chunks = newChunks;
            }

            mediaRecorder.onstop = function(e) {
                let runs = 0;
                // const intervall = setInterval(() => {
                    const {/*chunks,*/ clips} = that.state;
                    // console.log('mediaRecorder.onstop', chunks);
                    // if (chunks.length === 0 || runs === 10) {
                    //     runs++;
                    //     return;
                    // }

                    // clearInterval(intervall);

                    const clipName = prompt('Enter a name for your sound clip');

                    const blob = new Blob(chunks, { 'type' : 'audio/ogg; codecs=opus' });
                    // that.setState({chunks: []});
                    chunks = [];
                    const audioURL = window.URL.createObjectURL(blob);

                    const clip = {
                        name: clipName,
                        blob: blob,
                        audioURL: audioURL,
                    };

                    const newClips = clips.slice(0);
                    newClips.push(clip);

                    that.setState({clips: newClips})
                // }, 10);
            }

            that.state.mediaRecorder = mediaRecorder;
        })
        // Error callback
        .catch(function(err) {
            console.log('The following gUM error occured: ' + err);
            Promise.reject(err);
        });
    }

    onRecord = () => {
        const that = this;
        const {mediaRecorder, chunks, isRecording} = this.state;

        if (isRecording) {return;}

        mediaRecorder.start();

        that.setState({isRecording: true});
    };

    onStop = () => {
        const that = this;
        const {mediaRecorder, chunks, clips} = this.state;

        mediaRecorder.stop();

        that.setState({isRecording: false});
    };

    onDelete = (indexToDelete) => {
        const {clips} = this.state;

        const newClips = clips.slice(0);
        newClips.splice(indexToDelete, 1);

        this.setState({clips: newClips});
    };

    // deleteButton.onclick = function(e) {
    //     var evtTgt = e.target;
    //     evtTgt.parentNode.parentNode.removeChild(evtTgt.parentNode);
    // }
    
    render() {
        const {clips, isRecording} = this.state;
        const {className} = this.props;
        const {onRecord, onStop, onDelete} = this;
        return (
            <div className={className} style={{"border": "1px solid black"}} >
                <section className="visuals">
                    <canvas className="visualizer" height="60px" width="1000"></canvas>
                </section>
                <section className="main-controls">
                    <div id="buttons">
                    <button className="record" onClick={onRecord}
                        style={{backgroundColor: isRecording ? 'red': 'initial'}}
                    >
                        Record
                    </button>
                    <button className="stop" disabled="" onClick={onStop}>Stop</button>
                    </div>
                </section>
                <AudioPlayer {...{clips, onDelete}} />
            </div>
        )
    }
};

const AudioPlayer = ({clips, onDelete}) => {
    return (
        <section className="clips">
            {clips.map((clip, index) => {
                return (
                    <article key={clip.name} style={{"border": "1px solid black"}} className="clip">
                        <audio src={clip.audioURL} controls></audio>
                        <p>{clip.name}</p>
                        <button onClick={() => {onDelete(index)}} >Delete</button>
                    </article>
                );
            })}
            {/* <article style={{"border": "1px solid black"}} class="clip">
                <audio controls></audio>
                <p>your clip name</p>
                <button>Delete</button>
            </article> */}
        </section>
    );
}

const StyledAudioRecorder = styled(AudioRecorder)`
    /* .clips {
        box-shadow: inset 0 3px 4px rgba(0,0,0,0.7);
        background-color: rgba(0,0,0,0.1);
        height: calc(100% - 240px - 0.7rem);
        overflow: scroll;
    } */
`;

export default StyledAudioRecorder;
