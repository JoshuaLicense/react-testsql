import React from 'react';
import ReactDOM from 'react-dom';

import { percentageRatio, shouldFullyOpen, shouldFullyClose, } from './Logic';

it('opens the schema menu when above 80% open', () => {
    expect(shouldFullyOpen(81, 100)).toBe(true);
    expect(shouldFullyOpen(-270, -276)).toBe(true);

    expect(shouldFullyOpen(10, 100)).toBe(false);
});

it('closes the schema menu when below 20% open', () => {
    expect(shouldFullyClose(19, 100)).toBe(true);
    expect(shouldFullyClose(-15, -276)).toBe(true);

    expect(shouldFullyClose(90, 100)).toBe(false);
});
