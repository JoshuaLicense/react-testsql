import React from 'react';
import Draggable from 'react-draggable';

import PropTypes from 'prop-types';

import Table from './Table';

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

        this.onStop = this.onStop.bind(this);
        this.onDrag = this.onDrag.bind(this);
    }

    handleClick = (tableName) => {
        this.props.clickHandler(tableName)
    }

    onStop(e, ui) {
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

    onDrag(e, ui) {
        let { x, node } = ui;

        // Get the width of the slider
        const sliderWidth = node.firstElementChild.offsetWidth;

        // Fetch the width of the draggable, this means regardless of how far it comes out,
        // The following logic will still work
        const xMax = node.offsetWidth - sliderWidth;

        console.log(node.previousSibling, node.offsetWidth, x, node.parentElement.style.flex = '0 0 100px');

        // Check if the header should be vertical or not (if >50% of the sidebar is visible)
        const isVerticalHeader = percentageRatio(x, xMax) < 50;

        this.setState({
            isVerticalHeader,
        });
    }

    render() {
        const { x, } = this.state;

        return (
            <aside>
                <Draggable
                    axis="x"
                    bounds={{left: 0, right: 276}}
                    onDrag={this.onDrag}
                >
                    <div className="d-flex flex-row bg-light border-left border-right" style={{width: '300px', position: 'absolute', right: '-276px'}}>
                        <div className="ts-schema-slide-handle d-flex justify-content-center">
                            <span className="align-self-center text-muted ">||</span>
                        </div>
                        <div className="border-left" style={{flexGrow: 1}}>
                            <div className={`ts-schema-header ${(this.state.isVerticalHeader ? "vertical" : "")}`}>
                                <h6 className="ml-2 mt-3">Database Schema</h6>
                            </div>
                            <div className="list-group list-group-flush">
                                {this.state.data.map((tableName, i) => <Table clickHandler={this.handleClick} name={tableName} key={i} /> )}
                            </div>
                        </div>
                    </div>
                </Draggable>
            </aside>
        );
    }
}

/*<div className="ts--schema d-flex flex-row bg-light border-left border-right">
                        <div className="ts-schema-slide-handle d-flex justify-content-center">
                            <span className="align-self-center text-muted ">||</span>
                        </div>
                        <div className="border-left" style={{flexGrow: 1}}>
                            <div className={`ts-schema-header ${(this.state.isVerticalHeader ? "vertical" : "")}`}>
                                <h6 className="ml-2 mt-3">Database Schema</h6>
                            </div>
                            <div className="list-group list-group-flush">
                                {this.state.data.map((tableName, i) => <Table clickHandler={this.handleClick} name={tableName} key={i} /> )}
                            </div>
                        </div>
                    </div>*/

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
