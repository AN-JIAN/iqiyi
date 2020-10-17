! function($) {

    class lunbo {
        constructor() {
            this.lunbo = $('.lunbo');
            this.piclist = $('.lunbo ul li');
            this.btnlist = $('.lunbo ol li');
            this.leftarrow = $('.arrows-l');
            this.rightarrow = $('.arrows-r');
            this.index = 0;
            this.timer = null;
        }
        init() { //1.鼠标移入轮播图，显示左右箭头，反之隐藏。
            let that = this;
            this.lunbo.hover(function() {
                that.leftarrow.show();
                that.rightarrow.show();
                // 5. 鼠标移入，轮播停止
                clearInterval(that.timer)
            }, function() {
                that.leftarrow.hide();
                that.rightarrow.hide();
                // 继续轮播
                this.timer = window.setInterval(function() {
                    that.rightarrowclick();
                }, 2000)
            });
            //2.点击对应的圆点，给圆点添加类名，其他的隐藏。
            this.btnlist.on('click', function() {
                that.index = $(this).index();
                that.tabswitch();
            });
            //3.点击左右箭头进行图片切换
            this.rightarrow.on('click', function() {
                that.rightarrowclick();
            });
            this.leftarrow.on('click', function() {
                that.leftarrowclick();
            });
            // 4.自动轮播
            this.timer = window.setInterval(function() {
                that.rightarrowclick();
            }, 2000)
        }
        tabswitch() {
            this.btnlist.eq(this.index).addClass('active').siblings().removeClass('active');
            this.piclist.eq(this.index).stop(true).animate({
                opacity: 1
            }).siblings().stop(true).animate({
                opacity: 0
            });
        }
        rightarrowclick() {
            this.index++;
            if (this.index > this.btnlist.size() - 1) {
                this.index = 0;
            }
            this.tabswitch();
        }

        leftarrowclick() {
            this.index--;
            if (this.index < 0) {
                this.index = this.btnlist.size() - 1;
            }
            this.tabswitch();
        }

    }
    new lunbo().init()
        // 渲染数据
    $.ajax({
        url: "http://10.31.163.218/IQIYI%20mall/php/piclist.php",
        dataType: 'json'
    }).done(function(data) {
        console.log(data);
        var str = '';
        $.each(data, function(index, value) {
            str += ` <li>
            <a href="#">
                <img src="${value.url}" alt="">
            </a>
            <div class="product-box">
                <a href="#">${value.title}</a>
               
                <p class="product-title-box1">
                    <em>￥${value.price}</em>
                    <span>已售：${value.sailnumber}</span>
                </p>
            </div>

        </li>`;
        })
        $('.product').append(str)
    })
}(jQuery);