import Picker from "../lib/index"
describe('onlyCheck.test.js', function () {
    it('onlyCheck', function () {
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
        picker.check('f23iuh23bff2')
        expect(data).toEqual(
            {
                mode : 'check',
                checked: [
                    'f23iuh23bff2',
                    '3tufh23ifghuw'
                ],
                unchecked: [
                    'g24hg823hg232',
                    'g32igh2iughh3'
                ],
                type: 'some'
            }
        )
        // NOTE: 通过 onlyCheck 取消选中项，选中指定项
        picker.onlyCheck('g24hg823hg232')
        expect(data).toEqual(
            {
                mode : 'check',
                checked: [
                    'g24hg823hg232'
                ],
                unchecked: [
                    'f23iuh23bff2',
                    '3tufh23ifghuw',
                    'g32igh2iughh3'
                ],
                type: 'some'
            }
        )

        picker.onlyCheck('f23iuh23bff2')
        expect(data).toEqual(
            {
                mode : 'check',
                checked: [
                    'f23iuh23bff2'
                ],
                unchecked: [
                    '3tufh23ifghuw',
                    'g24hg823hg232',
                    'g32igh2iughh3'
                ],
                type: 'some'
            }
        )
    })
})
