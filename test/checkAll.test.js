import Picker from "../lib/index"
const commonTestGetViewData = function () {
    return ['f23iuh23bff2', '3tufh23ifghuw', 'g24hg823hg232', 'g32igh2iughh3']
}
describe('checkAll', function () {
    it('checkAll', function () {
        var data
        var picker = new Picker({
            data: [
                {
                    id: 'f23iuh23bff2',
                    checked: false
                },
                {
                    id: '3tufh23ifghuw',
                    checked: false
                },
                {
                    id: 'g24hg823hg232',
                    checked: false
                },
                {
                    id: 'g32igh2iughh3',
                    checked: false
                }
            ],
            getDataCount: function () {
                return 4
            },
            // NOTE: getViewData 需要返回当前页面中显示数据的 id
            getViewData: commonTestGetViewData,
            onChange: function (stats) {
                data = stats
            }
        })
        expect(data).toEqual({
            mode: 'check',
            checked: [],
            unchecked: ['f23iuh23bff2','3tufh23ifghuw', 'g24hg823hg232', 'g32igh2iughh3'],
            viewDataCheckedAll: false,
            type: 'empty'
        })
        // NOTE: checkAll 用于选中所有数据，会使得 picker 进入反选模式
        picker.checkAll()
        expect(data).toEqual({
            mode: 'uncheck',
            checked: ['f23iuh23bff2','3tufh23ifghuw', 'g24hg823hg232', 'g32igh2iughh3'],
            unchecked: [],
            viewDataCheckedAll: true,
            type: 'empty'
        })
        picker.uncheck('3tufh23ifghuw')
        expect(data).toEqual({
            mode: 'uncheck',
            checked: ['f23iuh23bff2', 'g24hg823hg232', 'g32igh2iughh3'],
            unchecked: ['3tufh23ifghuw'],
            viewDataCheckedAll: false,
            type: 'some'
        })
        picker.uncheck(['f23iuh23bff2', 'g24hg823hg232', 'g32igh2iughh3'])
        expect(data).toEqual({
            mode: 'check',
            checked: [],
            unchecked: [
                'f23iuh23bff2',
                '3tufh23ifghuw',
                'g24hg823hg232',
                'g32igh2iughh3'
            ],
            viewDataCheckedAll: false,
            type: 'empty'
        })
    })
})
