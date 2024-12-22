import $ from 'jquery'
import Post from '@model/post'
import json from '@assets/data.json'
import logo from '@assets/icon-square-big.png'

import React from 'react'
import { createRoot } from 'react-dom/client'

import '@css/style.css'
import './less/style.less'
import './sass/style.scss'
import './sass/style.sass'

const post = new Post('Webpack Post Title', logo)

$('pre').addClass('code').html(post.toString())

console.log('JSON:', json)

async function start() {
  return await new Promise((r) => setTimeout(() => r('Async done.'), 2000))
}

start().then((res) => console.log(res))

const container = document.getElementById('#root')
const root = createRoot(container)

const App = () => (
  <div class=" container">
    <h1>Webpack training</h1>
    <div class="logo" />
    <pre />
    <div class="less-demo">
      <h2>Less test</h2>
    </div>
    <div class="sass-demo">
      <h2>Sass test</h2>
    </div>
    <div class="scss-demo">
      <h2>Scss test</h2>
    </div>
  </div>
)

root.render(<App />)
