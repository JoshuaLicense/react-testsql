import React from 'react';
import Draggable from 'react-draggable';

import PropTypes from 'prop-types';

import './Schema.css';

import { percentageRatio, shouldFullyOpen, shouldFullyClose, } from './Logic';

class Schema extends React.Component {
    constructor(props) {
        super(props);

        const isLargeScreen = (window.innerWidth > 768);

        this.state = { 
            x: (isLargeScreen ? -276 : 0),
            isVerticalHeader: !isLargeScreen, 
        };
    }

    handleClick = (tableName) => {
        this.props.clickHandler(tableName)
    }

    onStop = (e, ui) => {
        let { x, node } = ui;

        // Get the width of the slider
        const sliderWidth = node.firstElementChild.offsetWidth;

        // Fetch the width of the draggable, this means regardless of how far it comes out,
        // The following logic will still work
        const xMax = node.offsetWidth - sliderWidth;
        
        // In onStop aswell as drag to allow the flex-basis to fix itself after some rough dragging 
        node.parentElement.style.flexBasis = `${-x}px`;

        // Evaluate if the schema section should fully open or close
        if(shouldFullyOpen(x, xMax)) {
            x = -xMax;
        } else if(shouldFullyClose(x, xMax)) {
            x = 0;
        }

        this.setState({
            x,
        });
    }

    onDrag = (e, ui) => {
        let { x, node } = ui;

        if(x === this.state.x) return;

        // Get the width of the slider
        const sliderWidth = node.firstElementChild.offsetWidth;

        // Fetch the width of the draggable, this means regardless of how far it comes out,
        // The following logic will still work
        const xMax = node.offsetWidth - sliderWidth;

        // The flipped value of the x axis is the width, could use Math.abs()
        node.parentElement.style.flexBasis = `${-x}px`;

        // Check if the header should be vertical or not (if >50% of the sidebar is visible)
        const isVerticalHeader = percentageRatio(x, xMax) < 50;

        this.setState({
            isVerticalHeader,
        });
    }

    render() {
        return (
            <Draggable
            axis="x"
            handle=".ts-schema-slide-handle"
            defaultPosition={{ x: this.state.x, y: 0 }}
            bounds={{left: -276, right: 0}}
            onDrag={this.onDrag}
            onStop={this.onStop}>
                <div className="ts-schema d-flex flex-row bg-light border-left border-right">
                    <div className="ts-schema-slide-handle d-flex justify-content-center">
                        <span className="align-self-center text-muted ">||</span>
                    </div>
                    <div className="border-left" style={{flexGrow: 1}}>
                        <div className={`ts-schema-header${(this.state.isVerticalHeader ? " vertical" : "")}`}>
                            <h6 className="ml-2 mt-3">Database Schema</h6>
                        </div>
                        <div className="list-group list-group-flush">
                            {this.props.data.map((tableName, i) => <button className="list-group-item list-group-item-action" onClick={() => this.handleClick(tableName)} key={i}>{tableName}</button>)}
                        </div>
                    </div>
                </div>
            </Draggable>
        );
    }
}

Schema.defaultProps = {
    x: 0,
    data: [],
    isVerticalHeader: true,
};

Schema.propTypes = {
    x: PropTypes.number,
    data: PropTypes.array,
    clickHandler: PropTypes.func,
};

export default Schema;
