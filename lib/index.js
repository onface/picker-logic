import extend from "extend"
class Picker {
    static getDefaultSettings () {
        return {
            data: [],
            onChange: function (stats) {},
            getDataCount: function () {
                return Number.MAX_VALUE
            },
            notExistModeUncheckTypeAll: true
        }
    }
    constructor (settings) {
        const self = this
        settings = extend(true, Picker.getDefaultSettings(), settings)
        self.settings = settings
        self.data = self.settings.data
        self.mode = 'check' // "check" "uncheck"
        self.triggerChange()
    }
    _find = (id, handler, caller) => {
        const self = this
        self.data = self.data.map(function(item) {
            if (typeof item.id !== typeof id) {
                console.warn(`node_modules/picker-mode/lib/index.js _find: ${caller}(id) typeof id === "${typeof id}" | typeof data[index].id === ${typeof item.id}`)
            }
            if (item.id === id) {
                item = handler(item)
            }
            return item
        })
    }
    check = (id) => {
        const self = this
        if (typeof id === 'undefined') {
            throw new Error('node_modules/picker-mode/lib/index.js check: check(id) must have id')
        }
        if (!Array.isArray(id)) {
            id = [id]
        }
        id.forEach(function (id) {
            self._find(id, function check(item) {
                item.checked = true
                return item
            }, 'checked')
        })
        self.triggerChange('check')
    }
    uncheck = (id) => {
        const self = this
        if (typeof id === 'undefined') {
            throw new Error('node_modules/picker-mode/lib/index.js uncheck: check(id) must have id')
        }
        if (!Array.isArray(id)) {
            id = [id]
        }
        id.forEach(function (id) {
            self._find(id, function uncheck(item) {
                item.checked = false
                return item
            }, 'uncheck')
        })
        self.triggerChange('uncheck')
    }
    del = (id) => {
        const self = this
        if (typeof id === 'undefined') {
            throw new Error('node_modules/picker-mode/lib/index.js del: del(id) must have id')
        }
        if (!Array.isArray(id)) {
            id = [id]
        }
        id.forEach(function (id) {
            self.data = self.data.filter(function (item) {
                return item.id !== id
            })
        })
        self.triggerChange('del')
    }
    triggerChange (method) {
        const self = this
        let type
        let stats = {
            mode: null,
            checked: [],
            unchecked: []
        }
        let dataCount = self.settings.getDataCount()
        self.data.forEach(function (item) {
            if (item.checked) {
                stats.checked.push(item.id)
            }
            else {
                stats.unchecked.push(item.id)
            }
        })
        if (self.mode === 'check') {
            if (stats.checked.length === 0)  {
                type = 'empty'
            }
            else if (stats.checked.length >= dataCount) {
                type = 'all'
            }
            else {
                type = 'some'
            }
        }
        else {
            if (stats.unchecked.length === 0)  {
                type = 'empty'
            }
            else if (stats.unchecked.length >= dataCount) {
                type = 'all'
            }
            else {
                type = 'some'
            }
        }
        if (self.settings.notExistModeUncheckTypeAll) {
            if (self.mode === 'uncheck' && type === 'all') {
                self.mode = 'check'
                type = 'empty'
            }
        }
        if (typeof type === 'undefined') {
            throw new Error('node_modules/picker-mode/lib/index.js triggerChange: not match type,Please tell me https://github.com/fast-flow/picker-mode/issues/new')
        }
        if (typeof self.settings.getViewData === 'function') {
            let viewData = self.settings.getViewData()
            stats.viewDataCheckedAll = false
            if (viewData.length !== 0) {
                let viewDataCheckedCount = 0
                viewData.some(function (id) {
                    let unchecked = self.data.forEach(function (item) {
                        if (item.id === id && item.checked === true) {
                            viewDataCheckedCount++
                        }
                    })
                    return unchecked
                })
                if (viewDataCheckedCount === viewData.length) {
                    stats.viewDataCheckedAll = true
                }
            }
        }
        stats.mode = self.mode
        stats.type = type
        self.settings.onChange(stats, {
            data: self.data,
            mode: self.mode
        }, method)
    }
    checkAll = () => {
        const self = this
        self.mode = 'uncheck'
        self.data = self.data.map(function (item) {
            item.checked = true
            return item
        })
        self.triggerChange('checkAll')
    }
    uncheckAll = () => {
        const self = this
        self.mode = 'check'
        self.data = self.data.map(function (item) {
            item.checked = false
            return item
        })
        self.triggerChange('uncheckAll')
    }
    checkViewData = () => {
        const self = this
        let viewData = self.settings.getViewData()
        viewData.forEach(function (id) {
            self._find(id, function check(item) {
                item.checked = true
                return item
            }, 'checked')
        })
        self.triggerChange('checkViewData')
    }
    uncheckViewData = () => {
        const self = this
        let viewData = self.settings.getViewData()
        viewData.forEach(function (id) {
            self._find(id, function check(item) {
                item.checked = false
                return item
            }, 'checked')
        })
        self.triggerChange('uncheckViewData')
    }
    clear = () => {
        const self = this
        self.mode = 'check'
        self.data = []
        self.triggerChange('clear')
    }
    concat = (idArray) => {
        const self = this
        let dataID = self.data.map(function(item){
            return item.id
        })
        let newData = idArray.map(function (id) {
            if (dataID.indexOf(id) !== -1) {
                return false
            }
            else {
                let checked = self.mode !== 'check'
                return {
                    id: id,
                    checked: checked
                }
            }
        }).filter(function(item) {
            return item
        })
        self.data = self.data.concat(newData)
        self.triggerChange('concat')
    }
    onlyCheck = (idArray) => {
        const self = this
        if (!Array.isArray(idArray)) {
            idArray = [idArray]
        }
        self.data = self.data.map(function (item) {
            item.checked = (idArray.indexOf(item.id) !== -1)
            return item
        })
        self.triggerChange('onlyCheck')
    }
}
module.exports = Picker
export default Picker
