import React from 'react';
import Draggable from 'react-draggable';

import PropTypes from 'prop-types';

import './Schema.css';

import { percentageRatio, shouldFullyOpen, shouldFullyClose, } from './Logic';

class Schema extends React.Component {
    constructor(props) {
        super(props);

        this.state = { 
            x: props.x,
            data: props.data,
            isVerticalHeader: props.isVerticalHeader, 
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

        if(shouldFullyOpen(x, xMax)) {
            x = -xMax;
        }

        if(shouldFullyClose(x, xMax)) {
            x = 0;
        }

        this.setState({
            x,
        });
    }

    onDrag = (e, ui) => {
        let { x, node } = ui;

        // Get the width of the slider
        const sliderWidth = node.firstElementChild.offsetWidth;

        // Fetch the width of the draggable, this means regardless of how far it comes out,
        // The following logic will still work
        const xMax = node.offsetWidth - sliderWidth;

        // The flipped value of the x axis is the width, could use Math.abs()
        const width = -x;

        node.parentElement.style.flexBasis = `${width}px`;

        // Check if the header should be vertical or not (if >50% of the sidebar is visible)
        const isVerticalHeader = percentageRatio(x, xMax) < 50;

        this.setState({
            isVerticalHeader,
        });
    }

    render() {
        return (
            <aside className="ts-schema-container">
                <Draggable
                    axis="x"
                    bounds={{left: -276, right: 0}}
                    onDrag={this.onDrag}
                >
                    <div className="d-flex flex-row bg-light border-left border-right" style={{width: '300px', position: 'absolute', right: '-276px', top: 0, bottom: 0, }}>
                        <div className="ts-schema-slide-handle d-flex justify-content-center">
                            <span className="align-self-center text-muted ">||</span>
                        </div>
                        <div className="border-left" style={{flexGrow: 1}}>
                            <div className={`ts-schema-header ${(this.state.isVerticalHeader ? "vertical" : "")}`}>
                                <h6 className="ml-2 mt-3">Database Schema</h6>
                            </div>
                            <div className="list-group list-group-flush">
                                {this.state.data.map((tableName, i) => <button className="list-group-item list-group-item-action" onClick={() => this.handleClick(tableName)} key={i}>{tableName}</button>)}
                            </div>
                        </div>
                    </div>
                </Draggable>
            </aside>
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
