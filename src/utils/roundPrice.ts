export const roundPrice = (number: number) => {
    if (number > 1){
        return number.toFixed(2)
    } else {
        return number.toFixed(6)
    }

}