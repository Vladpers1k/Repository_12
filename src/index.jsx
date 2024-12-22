import $ from 'jquery'
import Post from '@model/post'
import json from '@assets/data.json'
import logo from '@assets/icon-square-big.png'

import React, { useEffect } from 'react'
import { createRoot } from 'react-dom/client'

import '@css/style.css'
import './less/style.less'
import './sass/style.scss'
import './sass/style.sass'

const post = new Post('Webpack Post Title', logo)

const App = () => {
  useEffect(() => {
    $('pre').addClass('code').text(post.toString())
  }, [])

  return (
    <div className="container">
      <h1>Webpack training</h1>
      <div className="logo" />
      <pre />
      <div className="less-demo">
        <h2>Less test</h2>
      </div>
      <div className="sass-demo">
        <h2>Sass test</h2>
      </div>
      <div className="scss-demo">
        <h2>Scss test</h2>
      </div>
    </div>
  )
}

const container = document.getElementById('root')
const root = createRoot(container)

root.render(<App />)

console.log('JSON:', json)

async function start() {
  return await new Promise((resolve) => setTimeout(() => resolve('Async done.'), 2000))
}

start().then((res) => console.log(res))
