import { CardViewBase } from './cardview-common';
import { elevationProperty, rippleColorProperty } from 'nativescript-material-core/cssproperties';
import { backgroundInternalProperty, Color, Length, ViewBase } from 'tns-core-modules/ui/page/page';
import { ad } from 'tns-core-modules/utils/utils';

let MDCCardView: typeof android.support.design.card.MaterialCardView;
let BACKGROUND_DEFAULT_STATE_1: number[];
let BACKGROUND_DEFAULT_STATE_2: number[];
let BACKGROUND_SELECTED_STATE: number[];
let BACKGROUND_CHECKED_STATE: number[];
let BACKGROUND_FOCUSED_STATE: number[];
let BACKGROUND_DISABLED_STATE: number[];

const DEFAULT_STROKE_VALUE = -1;
function initMDCCardView() {
    if (!MDCCardView) {
        // if (android.os.Build.VERSION.SDK_INT >= 23) {
        MDCCardView = android.support.design.card.MaterialCardView;
        // } else {
        //     initializePreLollipopCardView()
        //     MDCCardView = PreLollipopCardView as any
        // }
        BACKGROUND_DEFAULT_STATE_1 = [android.R.attr.state_window_focused, android.R.attr.state_enabled];
        BACKGROUND_DEFAULT_STATE_2 = [android.R.attr.state_enabled];
        BACKGROUND_SELECTED_STATE = [android.R.attr.state_window_focused, android.R.attr.state_enabled, android.R.attr.state_pressed];

        BACKGROUND_CHECKED_STATE = [android.R.attr.state_window_focused, android.R.attr.state_enabled, android.R.attr.state_checked];
        BACKGROUND_FOCUSED_STATE = [android.R.attr.state_focused, android.R.attr.state_window_focused, android.R.attr.state_enabled];
        BACKGROUND_DISABLED_STATE = [-android.R.attr.state_enabled];
    }
}

// interface PreLollipopCardView extends android.support.design.card.MaterialCardView {
//     // tslint:disable-next-line:no-misused-new
//     new (context): PreLollipopCardView;
// }
// let PreLollipopCardView: PreLollipopCardView;

// function initializePreLollipopCardView() {
//     if (PreLollipopCardView) {
//         return;
//     }
//     class PreLollipopCardViewImpl extends android.support.design.card.MaterialCardView {
//         constructor(context) {
//             super(context);
//             return global.__native(this);
//         }
//         private mForeground;

//         private mSelfBounds = new android.graphics.Rect();

//         private mOverlayBounds = new android.graphics.Rect();

//         private mForegroundGravity = android.view.Gravity.FILL;

//         protected mForegroundInPadding = true;

//         mForegroundBoundsChanged = false;

//         /**
//          * Describes how the foreground is positioned.
//          *
//          * @return foreground gravity.
//          * @see #setForegroundGravity(int)
//          */
//         getForegroundGravity() {
//             return this.mForegroundGravity;
//         }

//         /**
//          * Describes how the foreground is positioned. Defaults to START and TOP.
//          *
//          * @param foregroundGravity See {@link android.view.Gravity}
//          * @see #getForegroundGravity()
//          */
//         setForegroundGravity(foregroundGravity) {
//             if (this.mForegroundGravity !== foregroundGravity) {
//                 if ((foregroundGravity & android.view.Gravity.RELATIVE_HORIZONTAL_GRAVITY_MASK) === 0) {
//                     foregroundGravity |= android.view.Gravity.START;
//                 }

//                 if ((foregroundGravity & android.view.Gravity.VERTICAL_GRAVITY_MASK) === 0) {
//                     foregroundGravity |= android.view.Gravity.TOP;
//                 }

//                 this.mForegroundGravity = foregroundGravity;

//                 if (this.mForegroundGravity === android.view.Gravity.FILL && this.mForeground != null) {
//                     const padding = new android.graphics.Rect();
//                     this.mForeground.getPadding(padding);
//                 }

//                 this.requestLayout();
//             }
//         }

//         verifyDrawable(who) {
//             return super.verifyDrawable(who) || who === this.mForeground;
//         }

//         jumpDrawablesToCurrentState() {
//             super.jumpDrawablesToCurrentState();
//             if (this.mForeground != null) {
//                 this.mForeground.jumpToCurrentState();
//             }
//         }

//         drawableStateChanged() {
//             super.drawableStateChanged();
//             if (this.mForeground != null && this.mForeground.isStateful()) {
//                 this.mForeground.setState(this.getDrawableState());
//             }
//         }

//         /**
//          * Supply a Drawable that is to be rendered on top of all of the child
//          * views in the frame layout.  Any padding in the Drawable will be taken
//          * into account by ensuring that the children are inset to be placed
//          * inside of the padding area.
//          *
//          * @param drawable The Drawable to be drawn on top of the children.
//          */
//         setForeground(drawable) {
//             if (this.mForeground !== drawable) {
//                 if (this.mForeground != null) {
//                     this.mForeground.setCallback(null);
//                     this.unscheduleDrawable(this.mForeground);
//                 }

//                 this.mForeground = drawable;

//                 if (drawable != null) {
//                     this.setWillNotDraw(false);
//                     drawable.setCallback(this);
//                     if (drawable.isStateful()) {
//                         drawable.setState(this.getDrawableState());
//                     }
//                     if (this.mForegroundGravity === android.view.Gravity.FILL) {
//                         const padding = new android.graphics.Rect();
//                         drawable.getPadding(padding);
//                     }
//                 } else {
//                     this.setWillNotDraw(true);
//                 }
//                 this.requestLayout();
//                 this.invalidate();
//             }
//         }

//         /**
//          * Returns the drawable used as the foreground of this FrameLayout. The
//          * foreground drawable, if non-null, is always drawn on top of the children.
//          *
//          * @return A Drawable or null if no foreground was set.
//          */
//         getForeground() {
//             return this.mForeground;
//         }

//         onLayout(changed: boolean, left, top, right, bottom) {
//             super.onLayout(changed, left, top, right, bottom);
//             this.mForegroundBoundsChanged = this.mForegroundBoundsChanged || changed;
//         }

//         onSizeChanged(w, h, oldw, oldh) {
//             super.onSizeChanged(w, h, oldw, oldh);
//             this.mForegroundBoundsChanged = true;
//         }

//         draw(canvas) {
//             super.draw(canvas);

//             if (this.mForeground != null) {
//                 const foreground = this.mForeground;

//                 if (this.mForegroundBoundsChanged) {
//                     this.mForegroundBoundsChanged = false;
//                     const selfBounds = this.mSelfBounds;
//                     const overlayBounds = this.mOverlayBounds;

//                     const w = this.getRight() - this.getLeft();
//                     const h = this.getBottom() - this.getTop();

//                     if (this.mForegroundInPadding) {
//                         selfBounds.set(0, 0, w, h);
//                     } else {
//                         selfBounds.set(this.getPaddingLeft(), this.getPaddingTop(), w - this.getPaddingRight(), h - this.getPaddingBottom());
//                     }

//                     android.view.Gravity.apply(this.mForegroundGravity, foreground.getIntrinsicWidth(), foreground.getIntrinsicHeight(), selfBounds, overlayBounds);
//                     foreground.setBounds(overlayBounds);
//                 }

//                 foreground.draw(canvas);
//             }
//         }

//         drawableHotspotChanged(x, y) {
//             super.drawableHotspotChanged(x, y);
//             if (this.mForeground != null) {
//                 this.mForeground.setHotspot(x, y);
//             }
//         }
//     }
//     PreLollipopCardView = PreLollipopCardViewImpl as any;
// }

interface ViewOutlineProvider extends android.view.ViewOutlineProvider {
    // tslint:disable-next-line:no-misused-new
    new (context): ViewOutlineProvider;
}
let ViewOutlineProvider: ViewOutlineProvider;

function initializeOutlineProvider() {
    if (ViewOutlineProvider) {
        return;
    }
    class OutlineProvider extends android.view.ViewOutlineProvider {
        constructor(private owner: WeakRef<CardView>) {
            super();
            return global.__native(this);
        }
        getOutline(view: android.view.View, outline: any) {
            const cardView = this.owner && this.owner.get();
            console.log('getOutline', cardView);
            if (cardView) {
                outline.setRoundRect(0, 0, view.getWidth(), view.getHeight(), cardView._borderRadius - cardView._strokeWidth);
            }
        }
    }
    ViewOutlineProvider = OutlineProvider as any;
}

export class CardView extends CardViewBase {
    nativeViewProtected: android.support.design.card.MaterialCardView;

    fgDrawable: android.graphics.drawable.GradientDrawable;
    rippleDrawable: android.graphics.drawable.StateListDrawable | android.graphics.drawable.RippleDrawable;
    rippleShape: android.graphics.drawable.ShapeDrawable;
    _strokeWidth = 0;
    _borderRadius = 0;

    get android(): android.support.design.card.MaterialCardView {
        return this.nativeView;
    }

    private createStateListAnimator(view: android.view.View) {
        const elevation = android.support.v4.view.ViewCompat.getElevation(view);
        const translationZ = android.support.v4.view.ViewCompat.getTranslationZ(view);
        console.log('createStateListAnimator', elevation, translationZ);
        const elevationSelected = elevation * 2;
        const translationSelectedZ = translationZ + 6;
        const animationDuration = 100;
        const listAnimator = new android.animation.StateListAnimator();
        let animators = new java.util.ArrayList<android.animation.Animator>();
        let set = new android.animation.AnimatorSet();
        let animator = android.animation.ObjectAnimator.ofFloat(view, 'translationZ', [translationSelectedZ]);
        animators.add(animator);
        animator = android.animation.ObjectAnimator.ofFloat(view, 'elevation', [elevationSelected]);
        // animator.setDuration(0)
        animators.add(animator);
        set.playTogether(animators);
        set.setDuration(animationDuration);
        listAnimator.addState(BACKGROUND_SELECTED_STATE, set);

        animators.clear();
        set = new android.animation.AnimatorSet();
        animator = android.animation.ObjectAnimator.ofFloat(view, 'translationZ', [translationSelectedZ]);
        // animator.setDuration(animationDuration)
        animators.add(animator);
        animator = android.animation.ObjectAnimator.ofFloat(view, 'elevation', [elevationSelected]);
        // animator.setDuration(0)
        animators.add(animator);
        set.playTogether(animators);
        set.setDuration(animationDuration);
        listAnimator.addState(BACKGROUND_FOCUSED_STATE, set);

        animators.clear();
        set = new android.animation.AnimatorSet();
        animator = android.animation.ObjectAnimator.ofFloat(view, 'translationZ', [translationZ]);
        // animator.setDuration(animationDuration)
        // animator.setStartDelay(animationDuration)
        animators.add(animator);
        animator = android.animation.ObjectAnimator.ofFloat(view, 'elevation', [elevation]);
        // animator.setDuration(0)
        animators.add(animator);
        set.playTogether(animators);
        set.setDuration(animationDuration);
        set.setStartDelay(animationDuration);
        listAnimator.addState(BACKGROUND_DEFAULT_STATE_2, set);

        animators.clear();
        set = new android.animation.AnimatorSet();
        animator = android.animation.ObjectAnimator.ofFloat(view, 'translationZ', [translationZ]);
        // animator.setDuration(0)
        animators.add(animator);
        animator = android.animation.ObjectAnimator.ofFloat(view, 'elevation', [elevation]);
        animator.setDuration(0);
        animators.add(animator);
        set.playTogether(animators);
        set.setDuration(animationDuration);
        set.setStartDelay(animationDuration);
        listAnimator.addState([], set);

        view.setStateListAnimator(listAnimator);
    }

    public createNativeView() {
        initMDCCardView();
        initializeOutlineProvider();
        const view = new MDCCardView(this._context);
        if (android.os.Build.VERSION.SDK_INT >= 21) {
            this.createStateListAnimator(view);
        }
        view.setClickable(this.isUserInteractionEnabled);

        // store the default radius
        this._borderRadius = view.getRadius();

        // set the view outline
        view.setClipToOutline(false);
        const contentView = view.getChildAt(0) || view;
        contentView.setClipToOutline(true);
        contentView.setOutlineProvider(new ViewOutlineProvider(new WeakRef(this)));
        this.createForegroundDrawable(view, this.style.borderWidth, this.style.borderColor as any);
        return view;
    }
    createForegroundShape(radius) {
        const radii = Array.create('float', 8);
        java.util.Arrays.fill(radii, radius);
        const shape = new android.graphics.drawable.shapes.RoundRectShape(radii, null, null);
        const shapeDrawable = new android.graphics.drawable.ShapeDrawable(shape);
        return shapeDrawable;
    }
    private getAttrColor(context: android.content.Context, name: string) {
        const ta = context.obtainStyledAttributes([ad.resources.getId(':attr/' + name)]);
        const color = ta.getColor(0, 0);
        ta.recycle();
        return color;
    }

    getCardRippleColor() {
        const color = this.style['rippleColor'] ? this.style['rippleColor'] : new Color(this.getAttrColor(this._context, 'colorControlHighlight'));
        return color.android;
    }
    createForegroundDrawable(view: android.support.design.card.MaterialCardView, strokeWidth, strokeColor: Color) {
        this.fgDrawable = new android.graphics.drawable.GradientDrawable();
        const radius = view.getRadius();
        this.fgDrawable.setCornerRadius(radius);

        // In order to set a stroke, a size and color both need to be set. We default to a zero-width
        // width size, but won't set a default color. This prevents drawing a stroke that blends in with
        // the card but that could affect card spacing.
        if (strokeColor && strokeColor.android !== DEFAULT_STROKE_VALUE) {
            this.fgDrawable.setStroke(strokeWidth, strokeColor.android);
        }

        this.rippleShape = this.createForegroundShape(radius);
        const rippleColor = this.getCardRippleColor();
        if (android.os.Build.VERSION.SDK_INT >= 22) {
            //noinspection NewApi
            this.rippleDrawable = new android.graphics.drawable.RippleDrawable(android.content.res.ColorStateList.valueOf(rippleColor), null, this.rippleShape);
        } else {
            this.rippleDrawable = new android.graphics.drawable.StateListDrawable();
            // const foregroundShape = this.createForegroundShape(this._borderRadius);
            this.rippleShape.getPaint().setColor(rippleColor);
            this.rippleDrawable.addState([android.R.attr.state_pressed], this.rippleShape);
            // this.rippleDrawable = this.createCompatRippleDrawable(this.getCardRippleColor());
            // view.setForeground(this.createCompatRippleDrawable(this.getRippleColor(this.style['rippleColor'])));
        }
        const result = Array.create(android.graphics.drawable.Drawable, 2);
        result[0] = this.rippleDrawable;
        result[1] = this.fgDrawable;
        view.setForeground(new android.graphics.drawable.LayerDrawable(result));
    }

    updateBorderRadius(radius) {
        this._borderRadius = radius;
        this.fgDrawable.setCornerRadius(this._borderRadius); // for the foreground drawable
        const radii = Array.create('float', 8);
        java.util.Arrays.fill(radii, this._borderRadius);
        this.rippleShape.setShape(new android.graphics.drawable.shapes.RoundRectShape(radii, null, null)); // for the ripple drawable
    }
    [backgroundInternalProperty.setNative](value: any) {
        if (this.nativeViewProtected) {
            if (value instanceof android.graphics.drawable.Drawable) {
                this.nativeViewProtected.setBackgroundDrawable(value);
            } else {
                this._strokeWidth = value.borderTopWidth;
                if (value.color) {
                    this.nativeViewProtected.setCardBackgroundColor(value.color.android);
                }
                if (value.borderTopColor && value.borderTopColor.android !== DEFAULT_STROKE_VALUE) {
                    this.fgDrawable.setStroke(this._strokeWidth, value.borderTopColor.android);
                }

                if (this._borderRadius !== value.borderTopLeftRadius) {
                    this.updateBorderRadius(value.borderTopLeftRadius);
                }
            }
        }
    }

    [elevationProperty.setNative](value: number) {
        if (!this.nativeViewProtected) {
            return;
        }
        android.support.v4.view.ViewCompat.setElevation(this.nativeViewProtected, value);
        if (android.os.Build.VERSION.SDK_INT >= 21) {
            this.createStateListAnimator(this.nativeViewProtected);
        }
    }
    [rippleColorProperty.setNative](color: Color) {
        const rippleColor = color ? color.android : -1;
        if (android.os.Build.VERSION.SDK_INT >= 22) {
            (this.rippleDrawable as android.graphics.drawable.RippleDrawable).setColor(android.content.res.ColorStateList.valueOf(rippleColor));
        } else {
            this.rippleShape.getPaint().setColor(rippleColor);
        }
    }
}
