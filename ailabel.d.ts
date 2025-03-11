/**
 * version: 5.1.15
 * 3 years ago updated
 */
declare module "ailabel" {
  export const version: string;

  /**
   * 当前Map实例操作模式
   */
  // export const enum EMapMode {
  // 	PAN = "PAN", // 平移
  // 	BAN = "BAN", // 禁用视野缩放平移
  // 	POINT = "POINT", // 绘制点
  // 	CIRCLE = "CIRCLE", // 绘制圆
  // 	LINE = "LINE", // 绘制线
  // 	POLYLINE = "POLYLINE", // 绘制多段线
  // 	RECT = "RECT", // 绘制矩形
  // 	POLYGON = "POLYGON", // 绘制多边形
  // 	DRAWMASK = "DRAWMASK", // 绘制涂抹
  // 	CLEARMASK = "CLEARMASK", // 擦除涂抹
  // 	IMAGEMASK = "IMAGEMASK", // 绘制涂抹（Image形式）
  // }
  export type EMapMode = "PAN" | "BAN" | "POINT" | "CIRCLE" | "LINE" | "POLYLINE" | "RECT" | "POLYGON" | "DRAWMASK" | "CLEARMASK" | "IMAGEMASK" | "MARKER";

  /**
   * 事件监听器的事件类型
   */
  // export const enum EEventType {
  // 	BOUNDS_CHANGED = "boundsChanged", // 视野范围发生变化
  // 	FEATURE_SELECTED = "featureSelected", // 在绘制模式下双击feature触发选中
  // 	FEATURE_UNSELECTED = "featureUnselected", // 当模式切换或单击其他地方触发
  // 	DRAW_DONW = "drawDone", // 绘制结束时触发
  // 	FEATURE_UPDATED = "featureUpdated", // feature编辑完成触发
  // 	FEATURE_DELETED = "featureDeleted", // 目前只针对点双击选中右键触发
  // 	DRAGING = "draging", // 拖动feature(dblclick之后)
  // 	CLICK = "click", // 单击事件
  // 	DBL_CLICK = "dblClick", // 双击事件
  // 	MOUSE_DOWN = "mouseDown", // 鼠标按下
  // 	MOUSE_MOVE = "mouseMove", // 鼠标移动
  // 	MOUSE_UP = "mouseUp", // 鼠标抬起
  // 	MOUSE_OUT = "mouseOut", // 鼠标移出
  // 	MOUSE_OVER = "mouseOver", // 鼠标进入
  // }
  export type EEventType = "boundsChanged" | "featureSelected" | "featureUnselected" | "drawDone" | "featureUpdated" | "featureDeleted" | "draging" | "click" | "dblClick" | "mouseDown" | "mouseMove" | "mouseUp" | "mouseOut" | "mouseOver";

  /**
   * EEventType事件回调函数映射表
   */
  export interface EEventTypeCallbackMap {
    boundsChanged: () => void
    featureSelected: (feature: InstanceType<typeof Feature2>) => void
    featureUnselected: (feature: InstanceType<typeof Feature2>) => void
    drawDone: (mapMode: EMapMode, shape1, shape2?: any) => void
    featureUpdated: (feature: InstanceType<typeof Feature2>, shape) => void
    featureDeleted: (feature: InstanceType<typeof PointFeature2>) => void
    draging: (feature: InstanceType<typeof Feature2>, shape) => void
    click: (point: IBasePoint) => void
    dblClick: (point: IBasePoint) => void
    mouseDown: (point: IBasePoint) => void
    mouseMove: (point: IBasePoint) => void
    mouseUp: (point: IBasePoint) => void
    mouseOut: (point: IBasePoint) => void
    mouseOver: (point: IBasePoint) => void
  }

  /**
   * 事件拦截器的事件类型
   */
  // export const enum EEventSlotType {
  // 	DRAW_ACTIVE_POINT = "drawActivePoint", // 绘制高亮节点触发
  // 	DRAW_ACTIVE_MIDDLE_POINT = "drawActiveMiddlePoint", // 绘制高亮节点中间待添加节点触发
  // }
  export type EEventSlotType = "drawActivePoint" | "drawActiveMiddlePoint";

  /**
   * EEventSlotType事件回调函数映射表
   */
  interface EEventSlotTypeCallbackMap {
    drawActivePoint: (point: IPoint, overLayerInstance: any) => boolean
    drawActiveMiddlePoint: (point: IPoint, overLayerInstance: any) => boolean
  }

  export interface IMapOptions {
    zoom?: number // zoom	初始缩放级别
    center?: IPoint // 初始中心点坐标
    size?: ISize // 容器大小设置
    mode?: EMapMode // 当前操作模式
    refreshDelayWhenZooming?: boolean // 持续缩放是否延时刷新features（如滑轮缩放时），性能优化
    zoomWhenDrawing?: boolean // 绘制时可滑轮缩放
    panWhenDrawing?: boolean // 绘制时可到边界外自动平移
    featureCaptureWhenMove?: boolean // 绘制过程中是否开启‘双击选中’tip提示，耗费性能（会持续进行move捕捉判断）
    withHotKeys?: boolean // 快捷键开关
    zoomWheelRatio?: number // 鼠标滑轮缩放大小,取值区间[0, 10)，zoomWheelRatio越小，代表缩放速度越快，反之越慢
  }

  /**
   * 点坐标
   */
  export interface IPoint {
    x: number // x坐标
    y: number // y坐标
  }
  /**
   * 尺寸
   */
  export interface ISize {
    width: number // 宽
    height: number // 高
  }

  /**
   * 保留字段
   */
  export interface IObject {
    [key: string]: any
  }

  /**
   * 矩形图形信息
   */
  export interface IRectShape {
    x: number // 左上角坐标x
    y: number // 左上角坐标y
    width: number // 宽
    height: number // 高
  }

  /**
   * canvas样式：比如lineWidth/strokeStyle/fillStyle等
   */
  export interface IFeatureStyle {
    lineWidth?: number // 线宽
    strokeStyle?: string // 边框颜色
    fillStyle?: string // 填充色
    arrow?: boolean // 是否绘制箭头（只针对线段）
    stroke?: boolean // 是否闭合
    fill?: boolean // 是否填充
    [key: string]: any // 其他配置
  }

  export interface ICenterAndZoom {
    center: IPoint
    zoom: number
  }
  export interface IExportOption {
    layers: (TLayer[keyof TLayer])[] // 导出的图层list
    type: "base64" | "blob" // 导出数据形式
    format: "image/png" | "image/jpeg" // 图片格式
  }

  export interface IBasePoint {
    screen: IPoint // 屏幕坐标
    global: IPoint // 实际坐标
  }

  /**
   * 图片配置信息
   */
  export interface IImageInfo {
    src: string // 图片地址
    width: number // 图片宽度
    height: number // 图片高度
    crossOrigin?: boolean // 图片是否跨域，默认false，主要用于图片导出时使用, 要根据实际情况设置，当图片导出时，需要图片的responseHeader-CORS设置允许跨域
    position?: IPoint // 图片位置, 默认 {x: 0, y: 0}
    grid?: IGridInfo // 图片网格，默认 {columns: [], rows: []}
  }
  /**
   * 网格信息
   */
  export interface IGridInfo {
    columns?: IGridItemInfo[] // 列配置，默认[]
    rows?: IGridItemInfo[] // 行配置，默认[]
  }
  /**
   * 网格项信息
   */
  export interface IGridItemInfo {
    color?: string // 线颜色，默认#333333
    width?: number // 线宽，默认1
  }
  /**
   * 图层样式
   */
  export interface ILayerStyle {
    zIndex?: number // 层级，默认1
    opacity?: number // 透明的，默认1.0
  }

  /**
   * AILabel.Layer.Image图片图层事件类型
   */
  // export const enum ELayerImageEventType {
  //   LOAD_START = "loadStart", // 图片开始加载
  //   LOAD_END = "loadEnd", // 加载成功
  //   LOAD_ERROR = "loadError", // 加载失败
  // }
  export type ELayerImageEventType = "loadStart" | "loadEnd" | "loadError";

  /**
   * 图片图层
   */
  class ImageLayer2<T extends IObject> {
    /**
     * 创建图片图层
     * @param id 图层唯一标识
     * @param image 图片配置信息
     * @param props 属性信息
     * @param style 样式
     */
    constructor(id: string, image: IImageInfo, props?: T, style?: ILayerStyle);
    id: string;
    canvas: HTMLCanvasElement;
    canvasContext: CanvasRenderingContext2D;
    dom: HTMLElement;
    domId: string;
    grid: IGridInfo;
    image: HTMLImageElement;
    imageInfo: Required<IImageInfo>;
    imageSuccess: boolean;
    map: InstanceType<typeof Map>;
    position: { x: number, y: number };
    props: T;
    style: Required<ILayerStyle>;
    type: "IMAGE";
    eventsObServer: any;
    /**
     * 更新网格
     * @param gridInfo 网格配置，例如{columns: [{color: '#333'}], rows: [{color: '#666'}]}
     */
    updateGrid(gridInfo: IGridInfo): void;
    events: {
      /**
       * 事件监听
       * @param eventType 事件枚举类型
       * @param callback 回调函数
       */
      on: (
        eventType: ELayerImageEventType,
        callback: (url: string, instance: InstanceType<typeof ImageLayer2<T>>) => void
      ) => void
    };
  }

  export interface IFeatureAddOption {
    clear?: boolean // 添加feature是否清空当前layer上已存在的features
  }

  /**
   * 矢量图层 ==> 用于承载Feature.Point, Feature.Line, Feature.Polyline, Feature.Polygon, Feature.Rect, Feature.Circle等矢量要素的展示
   */
  class FeatureLayer2 {
    /**
     * @param id 唯一标识
     * @param props 属性信息
     * @param style 样式
     */
    constructor(id: string, props?: IObject, style?: ILayerStyle);
    /**
     * 添加矢量要素（Feature.Point, Feature.Line, Feature.Polyline, Feature.Polygon, Feature.Rect, Feature.Circle等）
     * @param feature 待添加feature
     * @param option 可选配置项
     */
    addFeature(feature: Feature2, option?: IFeatureAddOption): void;
    /**
     * 移除指定featureId的feature
     * @param targetFeatureId 待删除feature-id
     */
    removeFeatureById(targetFeatureId: string): void;
    /**
     * 获取指定featureId的feature，如果没有，则返回null
     * @param targetFeatureId featureID
     */
    getFeatureById(targetFeatureId: string): Feature2 | null;
    /**
     * 获取当前Layer.Feature上的所有features
     */
    getAllFeatures(): Feature2[];
    /**
     * 移出当前featureLayer上所有features
     */
    removeAllFeatures(): void;
    /**
     * 根据point获取捕捉到的features中第一个，如果没有则返回null
     * @param point targetPoint点
     */
    getTargetFeatureWithPoint(point: IPoint): Feature2 | null;
  }

  /**
   * 注记图层【注：此层为Map内置图层，不对外暴露二次开发进行实例】
   */
  class MarkerLayer2 {
    constructor();
    /**
     * 添加marker注记
     * @param marker 待添加marker
     * @param option 保留字段
     */
    addMarker(marker: Marker, option?: IObject);
    /**
     * 移除指定markerId的marker
     * @param targetMarkerId markerId
     */
    removeMarkerById(targetMarkerId: string);
    /**
     * 获取指定markerId的marker，如果没有，则返回null
     * @param targetMarkerId markerId
     */
    getMarkerById(targetMarkerId: string): Marker | null;
    /**
     * 获取Layer.Marker上的所有markers
     */
    getAllMarkers(): Marker[];
    /**
     * 移除所有markers
     */
    removeAllMarkers();
  }

  export interface ITextAddOption {
    clear?: boolean // 添加text是否清空当前layer上已存在的texts
  }

  /**
   * 文本图层 ===> 显示文本对象
   */
  class TextLayer2 {
    /**
     * 创建文本图层
     * @param id 唯一标识
     * @param props 属性信息
     * @param style 图层样式
     */
    constructor(id: string, props?: IObject, style?: ILayerStyle);
    /**
     * 添加text文本
     * @param text 待添加text
     * @param option 可选配置项
     */
    addText(text: Text, option?: ITextAddOption): void;
    /**
     * 移除指定textId的text
     * @param targetTextId 待删除的text-id
     */
    removeTextById(targetTextId: string): void;
    /**
     * 获取指定textId的text，如果没有，则返回null
     * @param targetTextId 待获取的text-id
     */
    getTextById(targetTextId: string): Text | null;
    /**
     * 获取Layer.Text上的所有texts对象
     */
    getAllTexts(): Text[];
    /**
     * 移除所有texts
     */
    removeAllTexts(): void;
  }

  /**
   * 涂抹图层
   */
  class MaskLayer2 {
    /**
     * 创建涂抹图层
     * @param id 唯一标识
     * @param props 属性信息
     * @param style 图层样式
     */
    constructor(id: string, props?: IObject, style?: ILayerStyle);
    /**
     * 添加Action，此处我们把绘制【DrawAction】/擦除【ClearAction】/数据回显【ImageAction】定义为action
     * @param action 待添加Action
     * @param option 保留字段-可选配置项
     */
    addAction(action: Action2, option?: IObject): void;
    /**
     * 移除指定action
     * @param targetActionId 待删除action-id
     */
    removeActionById(targetActionId: string): void;
    /**
     * 移除所有actions
     */
    removeAllActions(): void;
    /**
     * 获取Layer.Mask上的所有actions
     */
    getAllActions(): Action2[];
    /**
     * 根据分类获取分类分类rle数据, 截取某个范围的rle数据
     * @param bounds 矩形范围
     */
    getRleData(bounds: IRectShape): any;
  }

  /**
   * 图层类接口
   */
  export const Layer: {
    readonly Image: typeof ImageLayer2
    readonly Feature: typeof FeatureLayer2
    readonly Text: typeof TextLayer2
    readonly Mask: typeof MaskLayer2
  };
  export type TLayer = typeof Layer;

  // 矢量图层配置信息
  export interface IFeatureShape { }

  /**
   * 矢量图形基类
   * Feature.Point, Feature.Line, Feature.Polyline, Feature.Polygon, Feature.Rect, Feature.Circle等子类的基类
   */
  class Feature2 {
    static defaultStyle: {
      fillStyle: string
      lineWidth: number
      opacity: number
      strokeStyle: string
    };

    static moveStep: number;
    /**
     * 改变矢量要素shape信息
     * @param shape 待更新的图形shape信息
     */
    updateShape(shape: IFeatureShape): void;
    /**
     * 设置feature样式
     * @param style 待更新的图形style
     * @param option 保留字段-可选配置项
     */
    setStyle(style: IFeatureStyle, option?: IObject): void;
    /**
     * 判断point是否捕捉到当前feature
     * @param point 捕捉点
     */
    captureWithPoint(point: IPoint): boolean;
  }

  /**
   * 点的图形信息
   */
  export interface IPointShape extends IFeatureShape {
    x: number // 坐标x
    y: number // 坐标y
    // r 和 sr 【sr与r只会存在一个，如果同时存在，r优先级高】
    r?: number // 半径（实际坐标系半径，会伴随放大缩小变化）
    sr?: number // 半径（屏幕坐标系半径，不会伴随放大缩小变化）
  }

  /**
   * 矢量要素==>点
   */
  class PointFeature2<T extends IObject> extends Feature2 {
    static defaultOption: {
      active: boolean
    };

    /**
     * @param id 唯一标识
     * @param shape 空间信息
     * @param props 属性信息
     * @param style 样式
     * @param option 保留字段可选配置项
     */
    constructor(
      id: string,
      shape: IPointShape,
      props?: T,
      style?: IFeatureStyle,
      option?: IObject
    );
    id: string;
    layer: InstanceType<typeof FeatureLayer2>;
    option: { active: boolean };
    props: T;
    shape: IPointShape;
    style: IFeatureStyle;
    type: "POINT";
  }

  /**
   * 线的图形信息
   */
  export interface ILineShape extends IFeatureShape {
    start: IPoint // 起点
    end: IPoint // 终点
    width?: number // 线宽（实际坐标系宽）；如果不设置，将会取style-lineWidth绘制
  }
  /**
   * 矢量要素==>线
   */
  class LineFeature2<T extends IObject> extends Feature2 {
    /**
     * @param id 唯一标识
     * @param shape 空间信息
     * @param props 属性信息
     * @param style 样式
     */
    constructor(
      id: string,
      shape: ILineShape,
      props?: T,
      style?: IFeatureStyle
    );
    id: string;
    layer: InstanceType<typeof FeatureLayer2>;
    props: T;
    shape: ILineShape;
    style: IFeatureStyle;
    type: "LINE";
    /***
     * 获取线宽
     */
    getLineWidth(): number;
  }
  /**
   * 多线段的图形信息
   */
  export interface IPolylineShape extends IFeatureShape {
    points: IPoint[] // 多段线节点集合
    width?: number // 线宽（实际坐标系宽）；如果不设置，将会取style-lineWidth绘制
  }
  /**
   * 矢量要素==>多线段
   */
  class PolylineFeature2<T extends IObject> extends Feature2 {
    /**
     * @param id 唯一标识
     * @param shape 空间信息
     * @param props 属性信息
     * @param style 样式
     */
    constructor(
      id: string,
      shape: IPolylineShape,
      props?: T,
      style?: IFeatureStyle
    );
    id: string;
    layer: InstanceType<typeof FeatureLayer2>;
    props: T;
    shape: IPolylineShape;
    style: IFeatureStyle;
    type: "POLYLINE";
  }
  /**
   * 矢量要素==>矩形
   */
  class RectFeature2<T extends IObject> extends Feature2 {
    /**
     * @param id 唯一标识
     * @param shape 空间信息
     * @param props 属性信息
     * @param style 样式
     */
    constructor(
      id: string,
      shape: IRectShape,
      props?: T,
      style?: IFeatureStyle
    );
    id: string;
    layer: InstanceType<typeof FeatureLayer2>;
    props: T;
    shape: IRectShape;
    style: IFeatureStyle;
    type: "RECT";
    /**
     * 获取矩形四个顶点坐标集合
     */
    getPoints(): IPoint[];
  }
  /**
   * 多边形的图形信息
   */
  export interface IPolygonShape extends IFeatureShape {
    points: IPoint[] // 多边形顶点集合
    inner?: [] // 保留字段
  }
  /**
   * 矢量要素==>多边形
   */
  class PolygonFeature2<T extends IObject> extends Feature2 {
    /**
     * @param id 唯一标识
     * @param shape 空间信息
     * @param props props	属性信息
     * @param style 样式
     */
    constructor(
      id: string,
      shape: IPolygonShape,
      props?: T,
      style?: IFeatureStyle
    );
    id: string;
    layer: InstanceType<typeof FeatureLayer2>;
    props: T;
    shape: IPolygonShape;
    style: IFeatureStyle;
    type: "POLYGON";
  }
  /**
   * 圆的图形信息
   */
  export interface ICircleShape extends IFeatureShape {
    cx: number // 坐标x
    cy: number // 坐标y
    // r 和 sr 【sr与r只会存在一个，如果同时存在，r优先级高】
    r?: number // 半径（实际坐标系半径，会伴随放大缩小变化）
    sr?: number // 半径（屏幕坐标系半径，不会伴随放大缩小变化）
  }
  /**
   * 矢量要素==>圆
   */
  class CircleFeature2<T extends IObject> extends Feature2 {
    /**
     * @param id 唯一标识
     * @param shape 空间信息
     * @param props 属性信息
     * @param style 样式
     */
    constructor(
      id: string,
      shape: ICircleShape,
      props?: T,
      style?: IFeatureStyle
    );
    id: string;
    layer: InstanceType<typeof FeatureLayer2>;
    option: { active: boolean };
    props: T;
    shape: ICircleShape;
    style: IFeatureStyle;
    type: "CIRCLE";

    /**
     * 文档中没有这个API
     */
    getSubType(): string;
    /**
     * 文档中没有这个API
     */
    getEdgePoints(): IPoint[];
  }

  /**
   * 矢量图形类对象
   */
  export const Feature: {
    readonly Base: typeof Feature2
    readonly Point: typeof PointFeature2
    readonly Line: typeof LineFeature2
    readonly Polyline: typeof PolylineFeature2
    readonly Rect: typeof RectFeature2
    readonly Polygon: typeof PolygonFeature2
    readonly Circle: typeof CircleFeature2
  };

  /**
   * Action.Draw, Action.Clear, Action.Image等子类的基类
   */
  class Action2 {
    static defaultStyle: {
      fillStyle: string
      lineWidth: number
      opacity: number
      strokeStyle: string
    };
  }

  export interface IDrawActionShape {
    points: IPoint[] // 多段线节点集合
    width?: number // 线宽（实际坐标系宽）；如果不设置，将会取style-lineWidth绘制涂抹
  }
  /**
   * 涂抹对象
   * 众所周知，涂抹/擦除的动作分为down->move->up，实际上绘制的就是一条具有宽度的具有多个点的多段线
   */
  class DrawActionFeature2 extends Action2 {
    /**
     * @param id 唯一标识
     * @param category 当前action类型
     * @param shape 空间信息
     * @param props 属性信息
     * @param style 样式
     */
    constructor(
      id: string,
      category: string,
      shape: IDrawActionShape,
      props?: IObject,
      style?: IFeatureStyle
    );
    /**
     * 设置action样式【除Action.Image】
     * @param style action样式
     * @param option 保留字段
     */
    setStyle(style: IFeatureStyle, option?: IObject): void;
  }
  /**
   * 涂抹擦除对象
   * 众所周知，涂抹/擦除的动作分为down->move->up，实际上绘制的就是一条具有宽度的具有多个点的多段线
   */
  class ClearActionFeature2 extends Action2 {
    /**
     * @param id 唯一标识
     * @param shape 空间信息
     * @param props 属性信息
     * @param style 样式
     */
    constructor(
      id: string,
      shape: IDrawActionShape,
      props?: IObject,
      style?: IFeatureStyle
    );
  }
  /**
   * 涂抹数据的回显时，如果返回rle数据，前端需要需要进行像素级处理，此时相当耗性能
   * 此对象的设计就是为了既能满足涂抹数据的回显，又能尽可能最大的优化性能而产生；
   * 对后端要求：需要按照把每一个分类涂抹rle数据生成图片指定大小的二值.png图片
   */
  class ImageActionFeature2 extends Action2 {
    static defaultImageInfo: IImageInfo;
    /**
     * @param id 唯一标识
     * @param category 当前action类型
     * @param image 图片信息
     * @param props 属性信息
     * @param style 样式
     */
    constructor(
      id: string,
      category: string,
      image: IImageInfo,
      props?: IObject,
      style?: IFeatureStyle
    );
    drawImage(): void;
    updateImage(): void;
  }

  /**
   * 涂抹对象
   */
  export const Mask: {
    readonly Draw: typeof DrawActionFeature2
    readonly Clear: typeof ClearActionFeature2
    readonly Image: typeof ImageActionFeature2
  };

  /**
   * 注记marker对象配置信息
   */
  export interface IMarkerInfo {
    src: string // icon路径
    position: IPoint // 位置信息
    offset?: IPoint // 偏移量（屏幕坐标），默认{x: 0, y: 0}
  }

  type EMarkerEventType =
    | "click" // 单击事件
    | "mouseDown" // mouseDown事件
    | "mouseUp" // mouseUp事件
    | "mouseOver" // 鼠标移入
    | "mouseOut" // 鼠标移出
    | "dragStart" // 拖拽前
    | "dragging" // 拖拽前
    | "dragEnd" // 拖拽结束（会返回拖拽后的最新位置信息）
    | "rightClick"; // 右键单击

  /**
   * 注记marker对象
   */
  export class Marker {
    static defaultMarkerInfo: IMarkerInfo;
    constructor(
      id: string, // 唯一标识
      marker: IMarkerInfo, // marker信息
      props?: IObject, // 属性信息
      option?: IObject // 保留字段
    );
    /**
     * 启用marker可拖拽【默认不可拖拽】
     */
    enableDragging(): void;
    /**
     * 禁用marker可拖拽【默认不可拖拽】
     */
    disableDragging(): void;
    /**
     * 更新marker的位置
     * @param position 位置信息
     */
    updatePosition(position: IPoint);
    events: {
      /**
       * 事件监听
       * @param eventType 事件枚举类型
       * @param callback 回调函数
       */
      on: (
        eventType: EMarkerEventType,
        callback: (instance: InstanceType<typeof Marker>) => void
      ) => void
    };
  }

  /**
   * 文本对象配置信息
   */
  export interface ITextInfo {
    text: string // text文字
    position: IPoint // 位置信息
    offset?: IPoint // 偏移量（屏幕坐标）， 默认{x: 0, y: 0}
  }
  /**
   * 文字样式
   */
  export interface ITextStyle extends IFeatureStyle {
    background?: boolean // 是否展示文字背景
    fontColor?: string // 字体颜色
  }
  /**
   * text文本对象
   */
  export class Text {
    static defaultStyle: ITextStyle;
    static defaultTextInfo: ITextInfo;
    /**
     * 创建text文本对象
     * @param id 唯一标识
     * @param text text信息
     * @param props 属性信息
     * @param style 样式信息
     */
    constructor(
      id: string,
      text: ITextInfo,
      props?: IObject,
      style?: ITextStyle
    );
    /**
     * 更新text的位置
     * @param position 位置信息
     */
    updatePosition(position: IPoint): void;
    /**
     * 更新text的文本
     * @param text 待更新文本
     */
    updateText(text: string): void;
  }

  export class Util {
    private constructor();
    static EventUtil: {
      /**
       * 获取鼠标左右键index
       * @param event
       */
      getButtonIndex: (event: MouseEvent) => number
      /**
       * 获取鼠标移动的方向（例如：判断鼠标在拖拽、平移或绘制时的移动方向）
       * @param dom
       * @param event
       */
      getMouseDirection: (dom: HTMLElement, event: MouseEvent) => void
    };

    static MathUtil: {
      /**
       * 获取两点之间的中心点
       * @param start 开始点
       * @param end 结束点
       */
      getMiddlePoint: (start: IPoint, end: IPoint) => IPoint
      /**
       * 计算两点之间的距离
       * @param start 开始点
       * @param end 结束点
       */
      distance: (start: IPoint, end: IPoint) => number
      distancePoint2Line: (pt: IPoint, point1: IPoint, point2: IPoint) => unknown
      pointInPoint: (point1: IPoint, point2: IPoint) => boolean
      pointInPolygon: (point: IPoint, points: IPoint[]) => boolean
      pointInPolyline: (point: IPoint, points: IPoint[]) => boolean
    };
  }

  // 导出 Map 类
  export class Map {
    constructor(domId: string, mapOptions?: IMapOptions);
    /**
     * AILabel.Map实例设置当前模式
     * @param mode 操作模式
     */
    setMode(mode: EMapMode): void;
    /**
     * AILabel.Map实例设置滑轮缩放比例, 取值区间[0, 10)
     * @param value 缩放比例
     */
    setZoomWheelRatio(value: number): void;
    /**
     * AILabel.Map设置绘制过程中的样式
     * @param drawingStyle 样式配置
     */
    setDrawingStyle(drawingStyle: IFeatureStyle): void;
    /**
     * AILabel.Map设置编辑时拖拽对象的绘制颜色
     * @param color 例如: gMap.setEditingColor('#000');
     */
    setEditingColor(color: string): void;
    /**
     * AILabel.Map设置绘制过程中提示文字开启【默认开启】
     */
    enableDrawingTip(): void;
    /**
     * AILabel.Map设置绘制过程中提示文字关闭
     */
    disableDrawingTip(): void;
    /**
     * AILabel.Map设置绘制过程中十字丝开启
     */
    enableDrawingCrosshair(): void;
    /**
     * AILabel.Map设置绘制过程中十字丝关闭
     */
    disableDrawingCrosshair(): void;
    /**
     * AILabel.Map设置快捷键开启
     */
    enableHotKeys(): void;
    /**
     * AILabel.Map设置快捷键关闭
     */
    disableHotKeys(): void;
    /**
     * 开启绘制时的鼠标滑轮缩放
     */
    enableZoomWhenDrawing(): void;
    /**
     * 禁用绘制时的鼠标滑轮缩放
     */
    disableZoomWhenDrawing(): void;
    /**
     * 开启绘制时鼠标达到边界外自动平移
     */
    enablePanWhenDrawing(): void;
    /**
     * 禁用绘制时鼠标达到边界外自动平移
     */
    disablePanWhenDrawing(): void;
    /**
     * 获取传入容器的大小
     * @returns ISize, 容器大小, 例如：{ width: 100, height: 100 }
     */
    getSize(): ISize;
    /**
     * 获取当前缩放比例 (containerWidth / zoom)
     * @param zoom 缩放值
     * @returns 缩放比例
     */
    getScale(zoom?: number): number;
    /**
     * 设置中心点（即容器的中心点对应的实际坐标的中心点）
     * @param center 中心点，例如：{ x: 100, y: 100 }
     * @returns 当前AILabel.Map实例
     */
    setCenter(center: IPoint): InstanceType<typeof Map>;
    /**
     * 获取中心点（即容器的中心点对应的实际坐标的中心点）
     * @returns IPoint中心点坐标, 例如：{ x: 100, y: 100 }
     */
    getCenter(): IPoint;
    /**
     * 获取屏幕中心点坐标（即containerWidth/2, containerHeight/2）
     * @returns 屏幕中心点坐标, 例如：{ x: 100, y: 100 }
     */
    getScreenCenter(): IPoint;
    /**
     * 获取视野范围
     * @returns IRectShape {x: number, y: number, width: number, height: number}
     */
    getBounds(): IRectShape;
    /**
     * 定位并缩放到指定位置
     * @param option ICenterAndZoom，例如：{center: {x,y}, zoom: 1000}
     * @returns 当前AILabel.Map实例
     */
    centerAndZoom(option: ICenterAndZoom): Map;
    /**
     * 放大
     */
    zoomIn(): void;
    /**
     * 缩小
     */
    zoomOut(): void;
    /**
     * 添加Layer至当前Map实例
     * @param layer 待添加图层
     */
    addLayer(layer: InstanceType<TLayer[keyof TLayer]>): void;
    /**
     * 删除指定layerId的图layer
     * @param targetLayerId 待删除的图层ID
     */
    removeLayerById(targetLayerId: string): void;
    /**
     * 删除所有layers【内置图层除外】
     */
    removeAllLayers(): void;
    /**
     * 获取当前map实例上的所有layer
     * @returns Layer图层数组
     */
    getLayers(): Array<InstanceType<TLayer[keyof TLayer]>>;
    /**
     * 刷新map
     */
    refresh(): void;
    /**
     * 重设map大小，可以指定size大小或者不传入(会自动获取dom-size大小进行重设)
     * @param size 指定size大小，例如：{width: 100, height: 100}，不传则会自动获取dom-size大小进行重设
     */
    resize(size?: ISize);
    /**
     * 设置map当前的待编辑feature，最多只会存在一个activeFeature
     * @param feature 待编辑feature，传入null则表示取消编辑，需要配合gMap.events.on('featureSelected')使用
     */
    setActiveFeature(feature: Feature2 | null): void;
    /**
     * 获取当前activeFeature
     */
    getActiveFeature(): Feature2 | null;
    /**
     * 获取命中的矢量Feature对象，没有命中，则返回null
     * @param globalPoint 例如：{ x: 100, y: 100 }
     */
    getTargetFeatureWithPoint(globalPoint: IPoint): Feature2 | null;
    /**
     * 屏幕坐标转实际坐标
     * @param screenPoint 待转换的屏幕坐标
     * @returns IPoint 转换后的实际坐标
     */
    transformScreenToGlobal(screenPoint: IPoint): IPoint;
    /**
     * 实际坐标转屏幕坐标
     * @param globalPoint 待转换的实际坐标
     * @returns IPoint 转换后的屏幕坐标
     */
    transformGlobalToScreen(globalPoint: IPoint): IPoint;
    /**
     * AILabel.Map将layers导出为图片（支持导出text/image/feature/mask等图层，“图片不能跨域”）
     * @param bounds 导出视野范围
     * @param option 其他可选项配置
     */
    exportLayersToImage(bounds: IRectShape, option?: IExportOption): void;
    /**
     * 销毁AILabel.Map实例【如果在切换实例时最好要将上一次实例进行destroy】
     */
    destroy(): void;
    events: {
      /**
       * 事件监听器
       * @param eventType 事件枚举类型
       * @param callback 回调函数，对应EEventTypeCallbackMap映射表
       */
      on: <T extends EEventType>(
        eventType: T,
        callback: EEventTypeCallbackMap[T]
      ) => void
    };

    slots: {
      /**
       * 事件拦截器
       * @param eventType 时间枚举类型
       * @param callback callback 返回 false，会阻断后续流程
       */
      on: <T extends EEventSlotType>(
        eventType: T,
        callback: EEventSlotTypeCallbackMap[T]
      ) => void
    };

    markerLayer: InstanceType<typeof MarkerLayer2>;
  }

  // 顶层 AILabel 接口
  interface AILabel {
    readonly version: string
    readonly Map: typeof Map
    readonly Layer: typeof Layer
    readonly Feature: typeof Feature
    readonly Mask: typeof Mask
    readonly Marker: typeof Marker
    readonly Text: typeof Text
    readonly Util: typeof Util
  }
  const ailabel: AILabel;
  export default ailabel;

}
