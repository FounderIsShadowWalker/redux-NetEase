import React, {Component} from 'react';
import tempo from '../plugin/temo';
import '../css/corousel.scss';

export default class Carousel extends Component{
    constructor(props){
        super(props);
    }

    // componentWillReceiveProps(nextState){
    //     console.log(nextState.albumList[0]['/api/v2/banner/get'].banners[0]);
    // }

    componentDidMount(){
        this.props.AlbumChange().then(()=>{

            var ul = document.querySelector('ul');
            var lis = document.querySelectorAll('li');
            var tabs = document.querySelectorAll('.tab');
            var button = document.querySelector('button');
            var item = 0;
            var clickFlag = false;
            var stop = true;
            var left = document.querySelector('.left');
            var right = document.querySelector('.right');

            ul.style.width = lis.length * lis[0].offsetWidth + 'px';

            function reset(){
                tabs.forEach(function (item, index) {
                    item.className = 'tab';
                });

                var lis = document.querySelectorAll('li');
                lis.forEach(function (item, index) {
                    index > 1 && (item.className = 'img');
                })
            }

            function counter(max) {
                var count = 0;
                return function next(times) {
                    if (stop) {
                        stop = false;
                        var lis = document.querySelectorAll('li');
                        lis[2].className = 'img li-2';
                        lis[1].className = 'img li-1';
                        tempo.buffer(ul, {marginLeft: -lis[0].offsetWidth}, function () {
                            item++;
                            item = item % tabs.length;
                            stop = true;
                            ul.style.marginLeft = '0px';
                            var newNode = lis[0].cloneNode(true);
                            ul.removeChild(lis[0]);
                            ul.appendChild(newNode);
                            reset();
                            tabs[item].className = 'tab active';
                            count++;
                            count === max ? (clickFlag = false) : next(times);
                        }, times);
                    }
                }
            }


            //只调用1次
            function prev(){
                if(stop){
                    var lis = document.querySelectorAll('li'), len = lis.length;
                    stop = false;
                    item --;
                    item < 0 && (item = tabs.length - 1);
                    var newNode = lis[len-1].cloneNode(true);
                    ul.removeChild(lis[len-1]);
                    ul.insertBefore(newNode, lis[0]);
                    ul.style.marginLeft =  -newNode.offsetWidth + 'px';

                    var lis = document.querySelectorAll('li');
                    lis[0].className = 'img li-1';
                    lis[1].className = 'img li-2';
                    lis[2].className = 'img li-3';
                    tempo.buffer(ul, {marginLeft: 0}, function () {
                        stop = true;
                        clickFlag = false;
                        reset();
                        tabs[item].className = 'tab active';
                    })
                }
            }

            setInterval(function () {
                var buffer = counter(1);
                if(!clickFlag) {
                    buffer(30);
                }
            }, 4000);

            left.onclick = function () {
                clickFlag = true;
                prev();
            }

            right.onclick = function () {
                clickFlag = true;
                var buffer = counter(1);
                buffer(30);
            }


            tabs.forEach(function (tab, index) {
                tab.onclick = function () {
                    clickFlag = true;
                    var moveLength = index < item ? index + tabs.length - item: index - item;
                    var buffer = counter(moveLength);
                    buffer(10);

                }
            })
        });
    }

    render(){
        return (
        <div>
            <div className="wrapper">
                <div className="left"></div>
                <div className="right"></div>
                <ul>
                    {
                         this.props.albumList[0] && this.props.albumList[0]['/api/v2/banner/get']
                            .banners.map((item, index) =>{
                                switch (index+1){
                                    case 1:
                                        return (<li key={index} className="img li-1">
                                                    <img src={item.imageUrl}/>
                                                </li>);
                                        break;
                                        case 2:
                                            return (<li key={index} className="img li-2">
                                                <img src={item.imageUrl}/>
                                            </li>);
                                        break;
                                        default:
                                            return (<li key={index} className="img">
                                                        <img src= {item.imageUrl}/>
                                                    </li>)
                                        break;
                                }
                         })
                    }
                </ul>
            </div>
            <div className="tabWrapper">
                <div className="tab active">
                </div>
                <div className="tab">
                </div>
                <div className="tab">
                </div>
                <div className="tab">
                </div>
                <div className="tab">
                </div>
                <div className="tab">
                </div>
            </div>

        </div>
        )
    }
}