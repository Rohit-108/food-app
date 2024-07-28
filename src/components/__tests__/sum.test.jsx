import {sum} from "../sum.jsx"
 
test("Check sum of 2 positive numbers" ,() => {


    expect(sum(2,5)).toBe(5);
});