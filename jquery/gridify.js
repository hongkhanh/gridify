/**
 * Created by khanhnh on 13/09/2014.
 */

$.fn.extend({
    imageLoaded: function(cb)
    {
        var images = $(this).find('img');
        var count = images.length;
        if (count == 0) cb();
        images.each(function(i, image){
            var image = new Image();
            image.onload = function(e){
                count --;
                if (count == 0) cb()
            }
            image.onerror = function(e){
                count --;
                if (count == 0) cb()
            }
            image.src = $(image).attr('src');
        })
    },
    gridify: function(options) {
        var $this = $(this),
            options = options || {},
            render = function()
            {
                $this.css('position', 'relative');
                var items = $this.find(options.srcNode),
                    transition = (options.transition || 'all 0.5s ease') + ', height 0, width 0',
                    width = $this.innerWidth(),
                    item_margin = parseInt(options.margin || 0),
                    item_width = parseInt(options.max_width || options.width || 220),
                    column_count = Math.max(Math.floor(width/(item_width + item_margin)),1),
                    left = column_count == 1 ? -item_margin/2 : (width % (item_width + item_margin)) / 2,
                    columns = [];

                if (options.max_width) {
                    column_count = Math.ceil(width/(item_width + item_margin));
                    item_width = (width - column_count * item_margin - item_margin)/column_count;
                    left = item_margin/2;
                }

                for (var i = 0; i < column_count; i++) {
                    columns.push(0);
                }

                items.each(function(i, item) {
                    var $item = $(item),
                        idx = $.inArray(Math.min.apply(Math, columns), columns);

                    $item.css({
                        width: item_width,
                        position: 'absolute',
                        margin: item_margin/2,
                        top: columns[idx] + item_margin/2,
                        left: (item_width + item_margin) * idx + left,
                        transition: options.transition || 'all 0.5s ease'
                    });
                    columns[idx] += $item.innerHeight() + item_margin;
                });
            };
        render();
        $this.imageLoaded(function(){setTimeout(render, 200)});
        if (options.resizable) {
            var resize =  $(window).on("resize", function(){
                render();
                if(options.max_width) setTimeout(render, 200);
            });
            $this.on('remove', resize.unbind);
        }
    }
});
