/**
 * Calculate the percentage ratio of two numbers
 * 
 * @param {int} n 
 * @param {int} m 
 */
const percentageRatio = (n, m) => {
    n = Math.abs(n);
    m = Math.abs(m);

    return (n / m) * 100;
}

/**
 * Fully open the schema menu if the element is almost fully opened
 * 
 * @param {int} x - The current x position
 * @param {int} xMax - The max the x axis can reach
 */
const shouldFullyOpen = (x, xMax) => {
    return (percentageRatio(x, xMax) > 80);
};

/**
 * Fully close the schema menu if the element is almost fully closed
 * 
 * @param {int} x - The current x position
 * @param {int} xMax - The max the x axis can reach
 */
const shouldFullyClose = (x, xMax) => {
    return (percentageRatio(x, xMax) < 20);
};

export { percentageRatio, shouldFullyOpen, shouldFullyClose, };