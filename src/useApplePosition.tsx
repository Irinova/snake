import React, { useState } from "react";

function randomIntFromInterval(min: number, max: number) { // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export const useApplePosition = ( length: number ) => {

    const [ applePosition, changeApplePosition ] = useState(randomIntFromInterval(0, length - 1));

    const setApplePosition = () => {
        changeApplePosition(randomIntFromInterval(0, length - 1))
    }

    return [applePosition, setApplePosition]

}
