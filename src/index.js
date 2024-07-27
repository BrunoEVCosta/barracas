//const wp=require(".././webpack.config")
//console.log(wp)
import _ from 'lodash';
import Vue from 'vue/dist/vue.esm.browser';
import {VueSelect} from "vue-select";
const buildingblocks=require("@netbofia/buildingblocks")
import {easepick,DateTime,LockPlugin,RangePlugin} from '@easepick/bundle';


function insertScripts(names) {
    let collection=[]
    for(let name of names) {
        let element = document.createElement('script');
        element.src = "/webpack/"+name+".js"
        element.setAttribute("defer","true")
        document.body.appendChild(element)
    }
}
//let names=webpack.entry.map(pkg=>pkg.filename)
let names=["popper","bootstrap",
    "vue",

    //'easepick-css',

    'cookieconsent']
insertScripts(names);


window._ = _
window.Vue = Vue
window.VueSelect=VueSelect
//window.DateTime=DateTime
window.easepick=easepick={easepick,DateTime,RangePlugin,LockPlugin}
Object.keys(buildingblocks).forEach(key=>window[key]=buildingblocks[key])