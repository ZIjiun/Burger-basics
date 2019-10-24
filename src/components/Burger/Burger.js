import React from 'react';

import classes from './Burger.css';
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";

const burger = (props) => {
    // Object.keys 是由 js 原生提供的，他能夠將 Object 中的 key 取出來，
    // 並且回傳由所有的 key 組成的 array

    //將 ingredient object 的 key value 轉換成 burger ingredients 的 array
    let transfromIngredients = Object.keys(props.ingredients)
        .map(igKey => {
            return [...Array(props.ingredients[igKey])].map((_, i)=>{
                return <BurgerIngredient key={igKey + i} type={igKey} />
            })
        })
        // 將 return array 合併成一個 array
        .reduce((arr, el) => {
            return arr.concat(el);
        }, []);

    // 上面程式的另一種寫法
    // for (let key in props.ingredients) {
    //     for (let i = 0; i < props.ingredients[key]; i++) {
    //         transformedIngredients.push(<BurgerIngredient key={key + i} type={key} />);
    //     }
    // }

    if(transfromIngredients.length === 0) {
        transfromIngredients = <p>Please start adding ingredients!</p>
    }

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top"/>
            {transfromIngredients}
            <BurgerIngredient type="bread-bottom"/>
        </div>
    );
};

export default burger;