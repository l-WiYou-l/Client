import {makeAutoObservable} from "mobx";

export default class ClothesStore {
    constructor() {
        this._types = []
        this._brands = []
        this._clothes1 = []
        this._orders = []
        this._selectedType = {}
        this._selectedBrand = {}
        this._selectedOrder = {}
        this._page = 1
        this._totalCount = 0
        this._limit = 8
        makeAutoObservable(this)
    }

    setTypes(types) {
        this._types = types
    }
    setBrands(brands) {
        this._brands = brands
    }
    setClothes1(clothes1) {
        this._clothes1 = clothes1
    }

    setSelectedType(type) {
        this.setPage(1)
        this._selectedType = type
    }
    setSelectedBrand(brand) {
        this.setPage(1)
        this._selectedBrand = brand
    }
    setPage(page) {
        this._page = page
    }
    setTotalCount(count) {
        this._totalCount = count
    }
    setOrder(order){
        this._orders = order
    }

    get types() {
        return this._types
    }
    get brands() {
        return this._brands
    }
    get clothes1() {
        return this._clothes1
    }
    get selectedType() {
        return this._selectedType
    }
    get selectedBrand() {
        return this._selectedBrand
    }
    get totalCount() {
        return this._totalCount
    }
    get page() {
        return this._page
    }
    get limit() {
        return this._limit
    }
    get selectedOrder() {
        return this._selectedOrder
    }
}
