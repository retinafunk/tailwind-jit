import {gsap} from 'gsap';
import {Draggable} from 'gsap/Draggable';

console.log('log from index.js 2 ');

const compareImageSlider = () => {

    gsap.registerPlugin(Draggable);

    const $comparisonSlider = document.querySelector('.comparison-slider-container'),
        $sliderLeft = $comparisonSlider.querySelector('.slider-left'),
        $handle = $comparisonSlider.querySelector('.handle'),
        $caption = $comparisonSlider.querySelector('.slider-caption'),
        $captionLeft = $comparisonSlider.querySelector('.slider-caption-left'),
        $captionRight = $comparisonSlider.querySelector('.slider-caption-right'),

        $comparisonSliderWidth = 1212,
        $comparisonSliderHeight = $comparisonSlider.offsetHeight,

        $startPosition = ($comparisonSliderWidth / 100) * 50,

        $btnExpandLeft = document.querySelector('.btn-expand-left'),
        $btnExpandCenter = document.querySelector('.btn-expand-center'),
        $btnExpandRight = document.querySelector('.btn-expand-right'),

        tl = new gsap.timeline({delay: 1});


    // set initial positioning

// tween
    tl.set($caption, {autoAlpha: 0, yPercent: -100}, 0);
    //tl.to($sliderLeft, {duration:0.7,width: $startPosition, ease: 'back.out(1.7)'}, 0);
   // tl.to($handle, {duration:0.7,x: $startPosition, ease: 'back.out(1.7)'}, 0);
    //.to($captionLeft, {duration:0.7,autoAlpha: 1, yPercent: 0, ease: 'back.out(3)'});

    // draggable
    Draggable.create($handle, {
        bounds: {
            minX: 0,
            minY: 0,
            maxX: $comparisonSliderWidth,
            maxY: $comparisonSliderHeight
        },
        type: 'x',
        edgeResistance: 1,
        throwProps: true,
        onDrag: onHandleDrag,
        onLockAxis: function () {
           /* const functionName = arguments.callee.name;
            console.log(functionName);*/
        }
    });

    function onHandleDrag() {
        console.log('drag', this)
        gsap.set($sliderLeft, {width: this.endX}, 0);

        // show/hide caption if you drag past the center of the container, towards left/right direction.
        if (this.endX >= (this.maxX / 2) && this.getDirection() === 'right') {
            showLeftCaption();
        }
        if (this.endX <= (this.maxX / 2) && this.getDirection() === 'left') {
            showRightCaption();
        }
    }

    function showLeftCaption() {
        gsap.to($captionLeft, 0.3, {autoAlpha: 1, yPercent: 0}, 0);
        gsap.to($captionRight, 0.3, {autoAlpha: 0, yPercent: -100}, 0);
    }

    function showRightCaption() {
        gsap.to($captionLeft, 0.3, {autoAlpha: 0, yPercent: -100}, 0);
        gsap.to($captionRight, 0.3, {autoAlpha: 1, yPercent: 0}, 0);
    }

    function showBothCaptions() {
        gsap.to($captionLeft, 0.3, {autoAlpha: 1, yPercent: 0}, 0);
        gsap.to($captionRight, 0.3, {autoAlpha: 1, yPercent: 0}, 0);
    }

    function slideHandleTo(_pos) {
        gsap.to($sliderLeft, 0.7, {width: ($comparisonSliderWidth / 100) * _pos, ease: 'power2.out'}, 0);
        gsap.to($handle, 0.7, {x: ($comparisonSliderWidth / 100) * _pos, ease:'power2.out'}, 0);
    }

    // CLICK HANDLERS

    $btnExpandLeft.addEventListener('click', function(){
        slideHandleTo(100);
        showLeftCaption();
    })

    $btnExpandCenter.addEventListener('click', function(){
        slideHandleTo(50);
        showBothCaptions();
    })

    $btnExpandRight.addEventListener('click', function(){
        slideHandleTo(0);
        showRightCaption();
    })

    // auto show

/*    tl.to({},{duration:100,onStart: () => {
            console.log('onStart');
            slideHandleTo(100);
        }});
    tl.to({},{duration:100,onComplete: () => {
            slideHandleTo(100);
        }});*/
    return true;
}


compareImageSlider();
