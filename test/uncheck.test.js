import Picker from "../lib/index"
describe('uncheck', function () {
    it('uncheck', function () {
        var data
        var picker = new Picker({
            data: [
                {
                    id: 'f23iuh23bff2',
                    checked: true
                },
                {
                    id: '3tufh23ifghuw',
                    checked: false
                },
                {
                    id: 'g24hg823hg232',
                    checked: true
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
        expect(data).toEqual(
            {
                mode: 'check',
                checked: [
                    'f23iuh23bff2',
                    'g24hg823hg232'
                ],
                unchecked: [
                    '3tufh23ifghuw',
                    'g32igh2iughh3'
                ],
                type: 'some'
            }
        )
        // NOTE: 可通过 uncheck(id) 取消选中某项
        picker.uncheck('f23iuh23bff2')
        expect(data).toEqual(
            {
                mode: 'check',
                checked: [
                    "g24hg823hg232"
                ],
                unchecked: [
                    "f23iuh23bff2",
                    "3tufh23ifghuw",
                    "g32igh2iughh3"
                ],
                type:"some"
            }
        )
        picker.uncheck('g24hg823hg232')
        expect(data).toEqual(
            {
                mode: 'check',
                checked: [],
                unchecked: ['f23iuh23bff2', '3tufh23ifghuw', 'g24hg823hg232', 'g32igh2iughh3'],
                type: 'empty'
            }
        )
        picker.check(['f23iuh23bff2', '3tufh23ifghuw'])
        expect(data).toEqual(
            {
                mode: 'check',
                checked: ['f23iuh23bff2', '3tufh23ifghuw'],
                unchecked: [ 'g24hg823hg232', 'g32igh2iughh3'],
                type: 'some'
            }
        )
        // NOTE: uncheck(id) 也支持数组
        picker.uncheck(['f23iuh23bff2', '3tufh23ifghuw'])
        expect(data).toEqual(
            {
                mode: 'check',
                checked: [],
                unchecked: ['f23iuh23bff2', '3tufh23ifghuw', 'g24hg823hg232', 'g32igh2iughh3'],
                type: 'empty'
            }
        )
    })
})
