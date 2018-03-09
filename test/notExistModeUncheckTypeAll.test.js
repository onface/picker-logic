import Picker from "../lib/index"

const commonTestGetViewData = function () {
    return ['f23iuh23bff2', '3tufh23ifghuw', 'g24hg823hg232', 'g32igh2iughh3']
}
describe('notExistModeUncheckTypeAll.test.js', function () {
    it('notExistModeUncheckTypeAll', function () {
        var data
        var picker = new Picker({
            // NOTE: 配置 notExistModeUncheckTypeAll 为 false 则当 mode="uncheck" type="all" 时不自动转换为 mode="check" type="empty"
            // notExistModeUncheckTypeAll 默认为 true
            notExistModeUncheckTypeAll: false,
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
        // NOTE: notExistModeUncheckTypeAll:false 才会存在 mode="uncheck" type="all"
        expect(data).toEqual({
            mode: 'uncheck',
            checked: [],
            unchecked: [
                'f23iuh23bff2',
                '3tufh23ifghuw',
                'g24hg823hg232',
                'g32igh2iughh3'
            ],
            viewDataCheckedAll: false,
            type: 'some'
        })
    })
})
