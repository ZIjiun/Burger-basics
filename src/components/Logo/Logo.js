import React from 'react';

import burgerLogo from '../../assets/images/burger-logo.png';
// src 文件夾只是我們正在使用的資料夾，最後 webpack 會使用這些資料夾中的內容，
// 並且將它們打包在一起，並且創建輸出一個新的資料夾。
// 一旦當 app 發布後，所有經過優化的、編譯，和打包好的 assets，
// 都會被打包在同一個文件中，而 assets 文件夾的內容並不會發送到伺服器，
// 因此我們必須使用 import 來讓 webpack 知道我們實際上正在將圖片
// 導入我們的 js 中，而就跟 CSS 一樣，webpack 不會將我們的圖片
// 與 js 程式碼混合在一起，而 webpack 會以插件的方式或是特殊的模塊，
// 來處理這個圖片。
// webpack 混根據設定檔，將圖片複製倒目的地的文件夾中。

import classes from './Logo.css';

const logo = (props) => (
    <div className={classes.Logo} style={{height: props.height}}>
        <img src={burgerLogo} alt="MyBurger"/>
    </div>
);

export default logo;