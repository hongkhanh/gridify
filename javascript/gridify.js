/**
 * Created by khanhnh on 13/09/2014.
 */

Element.prototype.imageLoaded = function (cb){
    var images = this.querySelectorAll('img');
    var count = images.length;
    if (count == 0) cb();
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
Element.prototype.gridify = function (options)
{
    var self = this,
        options = options || {},
        indexOfSmallest = function (a) {
            var lowest = 0;
            for (var i = 1; i < a.length; i++) {
                if (a[i] < a[lowest]) lowest = i;
            }
            return lowest;
        },
        attachEvent = function(node, event, cb)
        {
            if (node.attachEvent)
                node.attachEvent('on'+event, cb);
            else if (node.addEventListener)
                node.addEventListener(event, cb);
        },
        detachEvent = function(node, event, cb)
        {
            if(node.detachEvent) {
                node.detachEvent('on'+event, cb);
            }
            else if(node.removeEventListener) {
                node.removeEventListener(event, render);
            }
        },
        render = function()
        {
            self.style.position = 'relative';
            var items = self.querySelectorAll(options.srcNode),
                transition = (options.transition || 'all 0.5s ease') + ', height 0, width 0',
                width = self.clientWidth,
                item_margin = parseInt(options.margin || 0),
                item_width = parseInt(options.max_width || options.width || 220),
                column_count = Math.floor(width/(item_width + item_margin)),
                left = (width % (item_width + item_margin)) / 2,
                columns = [];
            if (options.max_width)
            {
                column_count = Math.ceil(width/(item_width + item_margin));
                item_width = (width - column_count * item_margin - item_margin)/column_count;
                left = item_margin/2;
            }
            for (var i = 0; i < column_count; i++)
            {
                columns.push(0);
            }
            for (var i= 0, length = items.length; i < length; i++)
            {
                var idx = indexOfSmallest(columns);
                items[i].setAttribute('style', 'width: ' + item_width + 'px; ' +
                    'position: absolute; ' +
                    'margin: ' + item_margin/2 + 'px; ' +
                    'top: ' + (columns[idx] + item_margin/2) +'px; ' +
                    'left: ' + ((item_width + item_margin) * idx + left) + 'px; ' +
                    'transition: ' + transition);

                columns[idx] += items[i].clientHeight + item_margin;
            }
        };
    render();
    this.imageLoaded(function(){setTimeout(render, 200)});
    if (options.resizable)
    {
        attachEvent(window, 'resize', function(){
            render();
            if(options.max_width) setTimeout(render, 200);
        });
        attachEvent(self, 'DOMNodeRemoved', function(){
            detachEvent(window, 'resize', render);
        })
    }
}
