import Picker from "../lib/index"
describe('check.test.js', function () {
    it('check', function () {
        let data
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
            onChange: function (stats) {
                data = stats
            }
        })
        /*
        NOTE: onChange 在 `new Picker` 时候会立即调用， onChange 返回一个统计信息，{checked:Array, unchecked:Array, type: String}
             type 可以是 globalAll all some empty globalSome pickerAll
        */
        expect(data).toEqual(
            {
                mode : 'check',
                checked: [

                ],
                unchecked: [
                    'f23iuh23bff2',
                    '3tufh23ifghuw',
                    'g24hg823hg232',
                    'g32igh2iughh3'
                ],
                type: 'empty'
            }
        )
        // NOTE: 可通过 check 选中某项，调用后 onChange会立即回调
        picker.check('3tufh23ifghuw')
        expect(data).toEqual(
            {
                mode : 'check',
                checked: [
                    '3tufh23ifghuw',
                ],
                unchecked: [
                    'f23iuh23bff2',
                    'g24hg823hg232',
                    'g32igh2iughh3'
                ],
                type: 'some'
            }
        )

        // NOTE: check 只会选中某些项，如果 stats.checked 中存在这一项，则数据不会做任何改变，但 onChange会被回调
        picker.check('3tufh23ifghuw')
        expect(data).toEqual(
            {
                mode : 'check',
                checked: [
                    '3tufh23ifghuw',
                ],
                unchecked: [
                    'f23iuh23bff2',
                    'g24hg823hg232',
                    'g32igh2iughh3'
                ],
                type: 'some'
            }
        )
        // NOTE: check() 可以传入数组
        picker.check(['f23iuh23bff2', 'g24hg823hg232', 'g32igh2iughh3'])
        expect(data).toEqual(
            {
                mode : 'check',
                checked: [
                    'f23iuh23bff2',
                    '3tufh23ifghuw',
                    'g24hg823hg232',
                    'g32igh2iughh3'
                ],
                unchecked: [],
                type: 'some'
            }
        )
    })
})
