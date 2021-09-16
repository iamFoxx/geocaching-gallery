(function ($) {
    //do stuff

    $(document).on('click', '.btn-download', function(event){
        let filename = $(this).closest("div").attr('data-href');
        let date = new Date();
        saveAs(filename, 'geocaching-adventure-2021-'+date.getTime()+'.png');
    })

})(jQuery);


const BASE_URL = '';
const API_URL = BASE_URL + '/api';
const container = document.getElementById('gallery');

fecthImages(API_URL)

function createNode(element) {
    return document.createElement(element);
}

function append(parent, el) {
    return parent.appendChild(el);
}

async function fecthImages(url) {

    await fetch(url)
        .then((resp) => resp.json())
        .then(function (data) {
            let images = data.images;
            return images.map(function (image, i) {
                let a = createNode('div');
                let img = createNode('img');
                let div = createNode('span');
                let span = createNode('span');
                let href = BASE_URL + '/' + image
                a.setAttribute('data-href', href)
                img.src = 'data:image/gif;base64,R0lGODdhAQABAPAAAMPDwwAAACwAAAAAAQABAAACAkQBADs=';
                img.setAttribute('data-src', href);
                img.classList.add('gallery-image', 'lazyload')
                a.classList.add('gallery-item')
                a.setAttribute('data-size', '1080x1080')
                a.setAttribute('data-index', i)
                span.classList.add('btn-download');
                div.classList.add('gallery-item-type')
                append(a, img);
                append(div, span);
                append(a, div);
                append(container, a);

            })

        }).then(function () {
            doGallery();
            $("img.lazyload").lazyload();
        })
        .catch(function (error) {
            console.log(error);
        });
}


function doGallery() {
    var $pswp = $('.pswp')[0];
    var image = [];
    $('.gallery').each(function () {
        var $pic = $(this),
            getItems = function () {
                var items = [];
                $pic.find('.gallery-item').each(function () {
                    var $href = $(this).attr('data-href'),
                        $size = $(this).data('size').split('x'),
                        $width = $size[0],
                        $height = $size[1];

                    var item = {
                        src: $href,
                        w: $width,
                        h: $height
                    }

                    items.push(item);
                });
                return items;
            }

        var items = getItems();

        $.each(items, function (index, value) {
            image[index] = new Image();
            image[index].src = value['src'];
        });

        $pic.on('click', '.gallery-image', function (event) {
            event.preventDefault();

            var $index = $(this).index();
            var options = {
                index: $index,
                bgOpacity: 0.9,
                shareEl: false,
                showHideOpacity: true
            }

            var lightBox = new PhotoSwipe($pswp, PhotoSwipeUI_Default, items, options);
            lightBox.init();
        });
    });
}

