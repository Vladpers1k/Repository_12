import $ from 'jquery'
import Post from '@model/post'
import json from '@assets/data.json'
import logo from '@assets/icon-square-big.png'

import '@css/style.css'
import './less/style.less'
import './sass/style.scss'
import './sass/style.sass'

const post = new Post('Webpack Post Title', logo)

$('pre').addClass('code').html(post.toString())

console.log('JSON:', json)
