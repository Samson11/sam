import React, { Component } from 'react';
import { Rnd } from 'react-rnd';
const { ipcRenderer } = window.require('electron');

const style = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: 'solid 2px #3a38d2',
    margin: '5px'
};

class Cropper extends Component {
    constructor(props) {
        super(props);
        this.state = {
            width: '500px',
            height: '500px',
            x: (window.screen.width / 2) - 250,
            y: (window.screen.height / 2) - 250
        };
    }

    render() {
        const snip = (state, e) => {
            this.getMainInstance().webContents.send('snip', state);
            this.destroyCurrentWindow(null);
        }

        const destroySnipView = (e) => {
            this.getMainInstance().webContents.send('cancelled');
            this.destroyCurrentWindow(null);
        }

        return (
            <Rnd
                style={style}
                size={{ width: this.state.width, height: this.state.height }}
                position={{ x: this.state.x, y: this.state.y }}
                onDragStop={(e, d) => {
                    this.setState({ x: d.x, y: d.y })
                }}
                onResize={(e, direction, ref, delta, position) => {
                    this.setState({
                        width: ref.style.width,
                        height: ref.style.height,
                        x: position.x,
                        y: position.y
                    });
                }}
                bounds={'parent'}
            >
                <div className="rnd-controls">
                    <button
                        className="btn btn-primary"
                        onClick={snip}
                    >Capture</button>
                    <button
                        onClick={destroySnipView}
                        className="btn btn-primary"
                    >Cancel</button>
                </div>
            </Rnd>
        )
    }
}

export default Cropper;
