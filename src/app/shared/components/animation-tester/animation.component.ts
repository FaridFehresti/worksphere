import { MatDialog } from '@angular/material/dialog';
import { bounceInAnimation, bounceInDownAnimation, bounceInLeftAnimation, bounceInRightAnimation, bounceInUpAnimation, bounceInUpOnEnterAnimation } from '../../@animations/bouncing-entrances';
import { bounceAnimation, flashAnimation, headShakeAnimation, heartBeatAnimation, jelloAnimation, pulseAnimation, rubberBandAnimation, shakeAnimation, swingAnimation, tadaAnimation, wobbleAnimation } from '../../@animations/attention-seekers';
import { bounceOutAnimation, bounceOutDownAnimation, bounceOutLeftAnimation, bounceOutRightAnimation, bounceOutUpAnimation } from '../../@animations/bouncing-exits';
import { fadeInAnimation, fadeInDownAnimation, fadeInDownBigAnimation, fadeInLeftAnimation, fadeInLeftBigAnimation, fadeInRightAnimation, fadeInRightBigAnimation, fadeInUpAnimation, fadeInUpBigAnimation } from '../../@animations/fading-entrances';
import {
    fadeOutAnimation,
    fadeOutDownAnimation,
    fadeOutDownBigAnimation,
    fadeOutLeftAnimation,
    fadeOutLeftBigAnimation,
    fadeOutRightAnimation,
    fadeOutRightBigAnimation,
    fadeOutUpAnimation,
    fadeOutUpBigAnimation,
} from '../../@animations/fading-exits';
import { flipAnimation, flipInXAnimation, flipInYAnimation, flipOutXAnimation, flipOutYAnimation } from '../../@animations/flippers';
import { lightSpeedInAnimation, lightSpeedOutAnimation } from '../../@animations/light-speed';
import { rotateInAnimation, rotateInDownLeftAnimation, rotateInDownRightAnimation, rotateInUpLeftAnimation, rotateInUpRightAnimation } from '../../@animations/rotating-entrances';
import { rotateOutAnimation, rotateOutDownLeftAnimation, rotateOutDownRightAnimation, rotateOutUpLeftAnimation, rotateOutUpRightAnimation } from '../../@animations/rotating-exits';
import { slideInDownAnimation, slideInLeftAnimation, slideInRightAnimation, slideInUpAnimation } from '../../@animations/sliding-entrances';
import { slideOutDownAnimation, slideOutLeftAnimation, slideOutRightAnimation, slideOutUpAnimation } from '../../@animations/sliding-exits';
import { zoomInAnimation, zoomInDownAnimation, zoomInLeftAnimation, zoomInRightAnimation, zoomInUpAnimation } from '../../@animations/zooming-entrances';
import { zoomOutAnimation, zoomOutDownAnimation, zoomOutLeftAnimation, zoomOutRightAnimation, zoomOutUpAnimation } from '../../@animations/zooming-exits';
import { hingeAnimation, jackInTheBoxAnimation, rollInAnimation, rollOutAnimation } from '../../@animations/specials';
import { collapseAnimation, collapseHorizontallyAnimation, hueRotateAnimation, rotateAnimation } from '../../@animations/other';
import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'app-animation',
    templateUrl: './animation.component.html',
    standalone: true,
    imports: [MatFormFieldModule, MatSelectModule,CommonModule,MatButtonModule],
    styleUrls: ['./animation.component.less'],
    animations: [
        bounceInUpOnEnterAnimation({ anchor: 'enter1' }),
        bounceInUpOnEnterAnimation({ anchor: 'enter2', delay: 100 }),
        bounceInUpOnEnterAnimation({ anchor: 'enter3', delay: 200 }),
        bounceAnimation(),
        flashAnimation(),
        pulseAnimation({ anchor: 'pulse' }),
        rubberBandAnimation(),
        shakeAnimation(),
        swingAnimation(),
        tadaAnimation(),
        wobbleAnimation(),
        jelloAnimation(),
        heartBeatAnimation(),
        headShakeAnimation(),
        bounceInAnimation(),
        bounceInDownAnimation(),
        bounceInLeftAnimation(),
        bounceInRightAnimation(),
        bounceInUpAnimation(),
        bounceOutAnimation(),
        bounceOutDownAnimation(),
        bounceOutLeftAnimation(),
        bounceOutRightAnimation(),
        bounceOutUpAnimation(),
        fadeInAnimation(),
        fadeInDownAnimation(),
        fadeInDownBigAnimation(),
        fadeInLeftAnimation(),
        fadeInLeftBigAnimation(),
        fadeInRightAnimation(),
        fadeInRightBigAnimation(),
        fadeInUpAnimation(),
        fadeInUpBigAnimation(),
        fadeOutAnimation(),
        fadeOutDownAnimation(),
        fadeOutDownBigAnimation(),
        fadeOutLeftAnimation(),
        fadeOutLeftBigAnimation(),
        fadeOutRightAnimation(),
        fadeOutRightBigAnimation(),
        fadeOutUpAnimation(),
        fadeOutUpBigAnimation(),
        flipAnimation(),
        flipInXAnimation(),
        flipInYAnimation(),
        flipOutXAnimation(),
        flipOutYAnimation(),
        lightSpeedInAnimation(),
        lightSpeedOutAnimation(),
        rotateInAnimation(),
        rotateInDownLeftAnimation(),
        rotateInDownRightAnimation(),
        rotateInUpLeftAnimation(),
        rotateInUpRightAnimation(),
        rotateOutAnimation(),
        rotateOutDownLeftAnimation(),
        rotateOutDownRightAnimation(),
        rotateOutUpLeftAnimation(),
        rotateOutUpRightAnimation(),
        slideInDownAnimation(),
        slideInLeftAnimation(),
        slideInRightAnimation(),
        slideInUpAnimation(),
        slideOutDownAnimation(),
        slideOutLeftAnimation(),
        slideOutRightAnimation(),
        slideOutUpAnimation(),
        zoomInAnimation(),
        zoomInDownAnimation(),
        zoomInLeftAnimation(),
        zoomInRightAnimation(),
        zoomInUpAnimation(),
        zoomOutAnimation(),
        zoomOutDownAnimation(),
        zoomOutLeftAnimation(),
        zoomOutRightAnimation(),
        zoomOutUpAnimation(),
        hingeAnimation(),
        jackInTheBoxAnimation(),
        rollInAnimation(),
        rollOutAnimation(),
        // other
        collapseAnimation(),
        collapseHorizontallyAnimation(),
        rotateAnimation(),
        rotateAnimation({ anchor: 'rotate90', degrees: 90 }),
        hueRotateAnimation(),
        hueRotateAnimation({ anchor: 'hueButton', duration: 20000 }),
    ],
})
export class AnimationTesterComponent {
    selectedAnimation: string | null = null;
    generatedCode: string = '<div @animationName></div>';
    options = [
        {
            label: 'Attention Seekers',
            animations: ['bounce', 'flash', 'pulse', 'rubberBand', 'shake', 'swing', 'tada', 'wobble', 'jello', 'heartBeat', 'headShake'],
        },
        {
            label: 'Bouncing Entrances',
            animations: ['bounceIn', 'bounceInDown', 'bounceInLeft', 'bounceInRight', 'bounceInUp'],
        },
        {
            label: 'Bouncing Exits',
            animations: ['bounceOut', 'bounceOutDown', 'bounceOutLeft', 'bounceOutRight', 'bounceOutUp'],
        },
        {
            label: 'Fading Entrances',
            animations: ['fadeIn', 'fadeInDown', 'fadeInDownBig', 'fadeInLeft', 'fadeInLeftBig', 'fadeInRight', 'fadeInRightBig', 'fadeInUp', 'fadeInUpBig'],
        },
        {
            label: 'Fading Exits',
            animations: ['fadeOut', 'fadeOutDown', 'fadeOutDownBig', 'fadeOutLeft', 'fadeOutLeftBig', 'fadeOutRight', 'fadeOutRightBig', 'fadeOutUp', 'fadeOutUpBig'],
        },
        {
            label: 'Flippers',
            animations: ['flip', 'flipInX', 'flipInY', 'flipOutX', 'flipOutY'],
        },
        {
            label: 'Lightspeed',
            animations: ['lightSpeedIn', 'lightSpeedOut'],
        },
        {
            label: 'Rotating Entrances',
            animations: ['rotateIn', 'rotateInDownLeft', 'rotateInDownRight', 'rotateInUpLeft', 'rotateInUpRight'],
        },
        {
            label: 'Rotating Exits',
            animations: ['rotateOut', 'rotateOutDownLeft', 'rotateOutDownRight', 'rotateOutUpLeft', 'rotateOutUpRight'],
        },
        {
            label: 'Sliding Entrances',
            animations: ['slideInUp', 'slideInDown', 'slideInLeft', 'slideInRight'],
        },
        {
            label: 'Sliding Exits',
            animations: ['slideOutUp', 'slideOutDown', 'slideOutLeft', 'slideOutRight'],
        },
        {
            label: 'Zoom Entrances',
            animations: ['zoomIn', 'zoomInDown', 'zoomInLeft', 'zoomInRight', 'zoomInUp'],
        },
        {
            label: 'Zoom Exits',
            animations: ['zoomOut', 'zoomOutDown', 'zoomOutLeft', 'zoomOutRight', 'zoomOutUp'],
        },
        {
            label: 'Specials',
            animations: ['hinge', 'jackInTheBox', 'rollIn', 'rollOut'],
        },
        {
            label: 'Other',
            animations: ['collapse', 'collapseHorizontally', 'rotate', 'rotate90', 'rotate720', 'hueRotate'],
        },
    ];
    animation = 'rubberBand';
    animationState = false;
    animationWithState = false;
    hueBtnState = false;
    isVisible: boolean = false;
    

    constructor(private dialog: MatDialog) {}


    closeCodeModal() {
        this.dialog.closeAll();
    }
    selectAnimation(value:MatSelectChange) {
        this.selectedAnimation = value.value
    }
    animate() {
        this.animationState = false;
        setTimeout(() => {
            this.animationState = true;
            this.animationWithState = !this.animationWithState;
        }, 1);
    }
}
