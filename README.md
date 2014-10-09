gridify.js
=======
A lightweight script for creating a Pinterest-like grid using JQuery, pure javascript or YUI with image loaded

Features

- support images loaded event
- support window resize event
- support very long height item
- support dynamic item width
- support animation (CSS3 transition)

![ScreenShot](/screenshot.jpg)

# Usage

## Pure javascript

     window.onload = function(){
          var options =
          {
               srcNode: 'img',             // grid items (class, node)
               margin: '20px',             // margin in pixel, default: 0px
               width: '250px',             // grid item width in pixel, default: 220px
               max_width: '',              // dynamic gird item width if specified, (pixel)
               resizable: true,            // re-layout if window resize
               transition: 'all 0.5s ease' // support transition for CSS3, default: all 0.5s ease
          }
          document.querySelector('.grid').gridify(options);
     }

[Demo](http://cssdeck.com/labs/60n6c2ur)

## Jquery plugin

     $(window).load(function() {
          var options =
          {
               srcNode: 'img',             // grid items (class, node)
               margin: '20px',             // margin in pixel, default: 0px
               width: '250px',             // grid item width in pixel, default: 220px
               max_width: '',              // dynamic gird item width if specified, (pixel)
               resizable: true,            // re-layout if window resize
               transition: 'all 0.5s ease' // support transition for CSS3, default: all 0.5s ease
          }
          $('.grid').gridify(options);
     });
     
     // use with requirejs (new feature added on 9 Oct 2014)
     require.config({
         paths: {
             jquery: 'jquery-1.11.1.min',
             gridify: 'gridify'
         }
     });
     require( ["jquery", "gridify"],
         function($) {
             var options =
             {
                 srcNode: 'img',             // grid items (class, node)
                 margin: '20px',             // margin in pixel, default: 0px
                 width: '250px',             // grid item width in pixel, default: 220px
                 max_width: '',              // dynamic gird item width if specified, (pixel)
                 resizable: true,            // re-layout if window resize
                 transition: 'all 0.5s ease' // support transition for CSS3, default: all 0.5s ease
             }
             $('.grid').gridify(options);
         }
     );

[Demo](http://cssdeck.com/labs/wiu0xg4b)

## YUI plugin

     YUI().use('node', 'gridify', function(Y){
          var options =
          {
               srcNode: 'img',             // grid items (class, node)
               margin: '20px',             // margin in pixel, default: 0px
               width: '250px',             // grid item width in pixel, default: 220px
               max_width: '',              // dynamic gird item width if specified, (pixel)
               resizable: true,            // re-layout if window resize
               transition: 'all 0.5s ease' // support transition for CSS3, default: all 0.5s ease
          }
          Y.one('.grid').gridify(options);
     })

[Demo](http://cssdeck.com/labs/q2ylxqns)
