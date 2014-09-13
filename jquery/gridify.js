/**
 * Created by khanhnh on 13/09/2014.
 */

$.fn.extend({
    imageLoaded: function(cb)
    {
        var images = $(this).find('img');
        var count = images.length;

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
            options = options || {};

        var render = function()
        {
            $this.css('position', 'relative');
            var items = $this.find(options.srcNode),
                width = $this.innerWidth(),
                item_margin = parseInt(options.margin || 0),
                item_width = parseInt(options.max_width || options.width || 220),
                column_count = Math.floor(width/(item_width + item_margin)),
                left = (width % (item_width + item_margin) - item_margin) / 2,
                columns = [];

            if (options.max_width) {
                item_width = (width - column_count * item_margin - item_margin)/column_count;
                left = item_margin/2;
            }

            for (var i = 0; i < column_count; i++) {
                columns.push(0);
            }

            items.each(function(i, item) {
                var $item = $(item),
                    idx = columns.indexOf(Math.min.apply(Math, columns));

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
        $this.imageLoaded(render);

        if (options.resizable) {
            var resize =  $(window).on("resize", render);
            $this.on('remove', resize.unbind);
        }
    }
});
