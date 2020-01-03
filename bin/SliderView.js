import { Container, Point } from "pixi.js";
import { SliderEventContext, SliderEventType } from "./SliderEvent";
import { SliderViewOption } from "./SliderViewOption";
/**
 * スライダー用クラスです
 *
 * 使用上の注意 :
 * オブジェクトのサイズの計測にgetBounds関数を使用しています。
 * shapeおよびContainerクラスでは、getBoundsの自動計測が効かない場合があります。
 * setBounds関数でサイズをあらかじめ与えてください。
 */
export class SliderView extends Container {
    /**
     * @param {SliderViewOption} option
     */
    constructor(option) {
        super();
        this._isHorizontal = true;
        this.dragStartPos = new Point();
        this.isDragging = false; // 現在スライド中か否か
        /**
         * スライダーのドラッグを開始する
         * @param {Object} e
         */
        this.startMove = (e) => {
            this.onPressedSliderButton(e);
        };
        /**
         * スライダーのドラッグ中の処理
         * @param e
         */
        this.moveSlider = (e) => {
            const evt = e;
            const mousePos = this.limitSliderButtonPosition(evt);
            this.updateParts(mousePos);
            this._rate = this.convertPixelToRate(mousePos);
            this.emit(SliderEventType.CHANGE, new SliderEventContext(this.rate));
        };
        /**
         * スライダーのドラッグ終了時の処理
         * @param	e
         */
        this.moveSliderFinish = (e) => {
            this.isDragging = false;
            this.removeListener("mousemove", this.moveSlider);
            this.removeListener("mouseup", this.moveSliderFinish);
            this.emit(SliderEventType.CHANGE_FINISH, new SliderEventContext(this.rate));
        };
        /**
         * このインスタンスを破棄する。
         * @param	e
         */
        this.dispose = (e) => {
            this.onDisposeFunction(e);
        };
        this.init(option);
        this.interactive = true;
    }
    get isHorizontal() {
        return this._isHorizontal;
    }
    /**
     * 初期化処理
     * @param {SliderViewOption} option
     */
    init(option) {
        option = SliderViewOption.init(option);
        this.base = option.base;
        this._bar = this.initBarAndMask(option.bar);
        this.slideButton = option.button;
        this._barMask = this.initBarAndMask(option.mask);
        if (this._bar && this._barMask)
            this._bar.mask = this._barMask;
        this._minPosition = option.minPosition;
        this._maxPosition = option.maxPosition;
        this._isHorizontal = option.isHorizontal;
        this._rate = option.rate;
        this.changeRate(this._rate);
    }
    addChildParts(obj) {
        if (!obj)
            return;
        if (obj.parent)
            obj.parent.removeChild(obj);
        this.addChild(obj);
    }
    /**
     * スライダーの位置を変更する
     * @param	rate	スライダーの位置 MIN 0.0 ~ MAX 100.0
     */
    changeRate(rate) {
        //ドラッグ中は外部からの操作を無視する。
        if (this.isDragging)
            return;
        this._rate = rate;
        const pos = this.convertRateToPixel(this._rate);
        this.updateParts(pos);
        this.emit(SliderEventType.CHANGE, new SliderEventContext(this.rate));
    }
    onPressedSliderButton(e) {
        this.isDragging = true;
        const target = e.currentTarget;
        const global = e.data.global;
        const localPos = this.toLocal(new Point(global.x, global.y));
        this.dragStartPos = new Point(localPos.x - target.x, localPos.y - target.y);
        this.on("mousemove", this.moveSlider);
        this.on("mouseup", this.moveSliderFinish);
        this.on("mouseupoutside", this.moveSliderFinish);
    }
    /**
     * スライダーボタンの位置を制限する関数
     * @return 制限で切り落とされたスライダーボタンの座標値
     */
    limitSliderButtonPosition(evt) {
        let mousePos = this.getMousePosition(this, evt);
        return SliderViewUtil.clamp(mousePos, this._maxPosition, this._minPosition);
    }
    /**
     * 各MCの位置、サイズをマウスポインタの位置に合わせて更新する
     * moveSliderの内部処理
     * @param	mousePos
     */
    updateParts(mousePos) {
        //バーマスクがなければ、バー自体を伸縮する
        if (this._bar && !this._barMask) {
            SliderViewUtil.setSize(this._bar, this._isHorizontal, Math.max(1.0, mousePos - this._minPosition));
        }
        //バーマスクがあれば、マスクを伸縮する。
        if (this._barMask) {
            SliderViewUtil.setSize(this._barMask, this._isHorizontal, mousePos - SliderViewUtil.getPosition(this._barMask, this._isHorizontal));
        }
        //ボタンの位置を更新する。
        if (this._slideButton) {
            SliderViewUtil.setPosition(this._slideButton, this._isHorizontal, mousePos);
        }
    }
    /**
     * スライダーの地をクリックした際の処理
     * その位置までスライダーをジャンプする
     * @param evt
     */
    onPressBase(evt) {
        this.dragStartPos = new Point();
        this.moveSlider(evt);
        this.emit(SliderEventType.CHANGE_FINISH, new SliderEventContext(this.rate));
    }
    /**
     * スライダーの割合から、スライダーの位置を取得する
     * @param	rate
     * @return
     */
    convertRateToPixel(rate) {
        return SliderViewUtil.convertRateToPixel(rate, this._maxPosition, this._minPosition);
    }
    /**
     * スライダーの座標から、スライダーの割合を取得する
     * @param	pixel
     * @return
     */
    convertPixelToRate(pixel) {
        return SliderViewUtil.convertPixelToRate(pixel, this._maxPosition, this._minPosition);
    }
    /**
     * ドラッグ中のマウス座標を取得する。
     * limitSliderButtonPosition内の処理。
     */
    getMousePosition(displayObj, evt) {
        const global = evt.data.global;
        const localPos = displayObj.toLocal(new Point(global.x, global.y));
        if (this._isHorizontal) {
            return localPos.x - this.dragStartPos.x;
        }
        else {
            return localPos.y - this.dragStartPos.y;
        }
    }
    set base(value) {
        if (!value)
            return;
        this._base = value;
        this._base.interactive = true;
        this._base.on("click", e => {
            this.onPressBase(e);
        });
        this.addChildParts(value);
    }
    initBarAndMask(value) {
        if (value == null)
            return;
        value.interactive = false;
        this.addChildParts(value);
        return value;
    }
    set slideButton(value) {
        if (!value)
            return;
        this._slideButton = value;
        this._slideButton.on("mousedown", this.startMove);
        this._slideButton.interactive = true;
        this.addChildParts(value);
    }
    get rate() {
        return this._rate;
    }
    /**
     * 全てのDisplayObjectとEventListenerを解除する。
     * @param {Event} e
     */
    onDisposeFunction(e) {
        this.removeAllListeners();
        this._base.removeAllListeners();
        this._slideButton.removeAllListeners();
        this.removeChildren();
    }
}
SliderView.MAX_RATE = 1.0;
export class SliderViewUtil {
    /**
     * スライダーの座標から、スライダーの割合を取得する
     */
    static convertPixelToRate(pixel, max, min) {
        let rate = ((pixel - min) / (max - min)) * SliderView.MAX_RATE;
        return SliderViewUtil.clamp(rate, SliderView.MAX_RATE, 0.0);
    }
    static convertRateToPixel(rate, max, min) {
        let pix = ((max - min) * rate) / SliderView.MAX_RATE + min;
        return SliderViewUtil.clamp(pix, max, min);
    }
    /**
     * ディスプレイオブジェクトからスクロール方向の座標値を取り出す
     * @return displayObjの座標値。単位ピクセル
     */
    static getPosition(displayObj, isHorizontal) {
        if (isHorizontal) {
            return displayObj.x;
        }
        else {
            return displayObj.y;
        }
    }
    /**
     * ディスプレイオブジェクトにスクロール方向の座標地を設定する
     */
    static setPosition(displayObj, isHorizontal, position) {
        if (!displayObj)
            return;
        if (isHorizontal) {
            displayObj.x = position;
        }
        else {
            displayObj.y = position;
        }
    }
    /**
     * スクロール方向の高さ、もしくは幅を取得する。単位ピクセル
     */
    static getSize(displayObj, isHorizontal) {
        const size = displayObj.getLocalBounds();
        if (isHorizontal) {
            return size.width * displayObj.scale.x;
        }
        else {
            return size.height * displayObj.scale.y;
        }
    }
    /**
     * スクロール方向の高さ、もしくは幅を設定する。単位は0.0 ~ 1.0の割合。
     */
    static setSize(displayObj, isHorizontal, amount) {
        const size = displayObj.getLocalBounds();
        if (isHorizontal) {
            displayObj.scale.x = amount / size.width;
        }
        else {
            displayObj.scale.y = amount / size.height;
        }
    }
    static clamp(num, max, min) {
        num = Math.max(num, min);
        num = Math.min(num, max);
        return num;
    }
}
