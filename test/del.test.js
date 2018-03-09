import Picker from "../lib/index"
describe('del', function () {
    it('del', function () {
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
            onChange: function (stats) {
                data = stats
            }
        })
        // NOTE: 用于删除某一项目， 一般是在用户点击删除某条数据时调用，删除所有数据请使用 picker.clear()
        picker.del('g24hg823hg232')
        expect(data).toEqual({
            mode: 'check',
            checked: [],
            unchecked: ['f23iuh23bff2','3tufh23ifghuw', 'g32igh2iughh3'],
            type: 'empty'
        })
        picker.check('3tufh23ifghuw')
        expect(data).toEqual({
            mode: 'check',
            checked: ['3tufh23ifghuw'],
            unchecked: ['f23iuh23bff2', 'g32igh2iughh3'],
            type: 'some'
        })
        picker.del('3tufh23ifghuw')
        expect(data).toEqual({
            mode: 'check',
            checked: [],
            unchecked: ['f23iuh23bff2', 'g32igh2iughh3'],
            type: 'empty'
        })
    })
})
