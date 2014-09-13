/**
 * Created by khanhnh on 13/09/2014.
 */

Element.prototype.imageLoaded = function (cb){
    var images = this.querySelectorAll('img');
    var count = images.length;
    for (var i= 0, length = images.length; i < length; i++)
    {
        var image = new Image();
        image.onload = function(e){
            count --;
            if (count == 0) cb()
        }
        image.onerror = function(e){
            count --;
            if (count == 0) cb()
        }
        image.src = images[i].getAttribute('src');
    }
}

Element.prototype.gridify = function (args)
{
    var self = this;
    var args = args || {};
    var render = function()
    {
        self.style.position = 'relative';
        var items = self.querySelectorAll(args.srcNode),
            width = self.clientWidth,
            item_margin = parseInt(args.margin || 0),
            item_width = parseInt(args.max_width || args.width || 220),
            column_count = Math.floor(width/(item_width + item_margin)),
            left = (width % (item_width + item_margin)) / 2,
            columns = [];

        if (args.max_width)
        {
            item_width = (width - column_count * item_margin - item_margin)/column_count;
            left = item_margin/2;
        }

        for (var i = 0; i < column_count; i++)
        {
            columns.push(0);
        }

        for (var i= 0, length = items.length; i < length; i++)
        {
            var idx = columns.indexOf(Math.min.apply(Math, columns));
            items[i].setAttribute('style', 'width: ' + item_width + 'px; ' +
                'position: absolute; ' +
                'margin: ' + item_margin/2 + 'px; ' +
                'top: ' + (columns[idx] + item_margin/2) +'px; ' +
                'left: ' + ((item_width + item_margin) * idx + left) + 'px; ' +
                'transition: ' + (args.transition || 'all 0.5s ease'));

            columns[idx] += items[i].clientHeight + item_margin;
        }
    };
    this.imageLoaded(render);

    if (args.resizable)
    {
        if(window.attachEvent) {
            window.attachEvent('onresize', render);
        }
        else if(window.addEventListener) {
            window.addEventListener('resize', render, true);
        }

        self.addEventListener('DOMNodeRemoved', function(){
            if(window.detachEvent) {
                window.detachEvent('onresize', render);
            }
            else if(window.removeEventListener) {
                window.removeEventListener('resize', render);
            }
        })
    }
}
