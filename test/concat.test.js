import Picker from "../lib/index"
const commonTestGetViewData = function () {
    return ['3tufh23ifghuw', 'g24hg823hg232', 'g32igh2iughh3']
}
describe('concat.test.js', function () {
    it('concat', function () {
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
            getViewData: commonTestGetViewData,
            onChange: function (stats) {
                data = stats
            }
        })
        picker.checkViewData()
        expect(data).toEqual(
            {
                mode : 'check',
                checked: [
                    '3tufh23ifghuw',
                    'g24hg823hg232',
                    'g32igh2iughh3'
                ],
                unchecked: [
                    'f23iuh23bff2'
                ],
                viewDataCheckedAll: true,
                type: 'some'
            }
        )
        picker.concat(['zeh283gfwef'])
        expect(data).toEqual(
            {
                mode : 'check',
                checked: [
                    '3tufh23ifghuw',
                    'g24hg823hg232',
                    'g32igh2iughh3'
                ],
                unchecked: [
                    'f23iuh23bff2',
                    'zeh283gfwef'
                ],
                viewDataCheckedAll: true,
                type: 'some'
            }
        )
        picker.concat(['2348hv8wege3'])
        expect(data).toEqual(
            {
                mode : 'check',
                checked: [
                    '3tufh23ifghuw',
                    'g24hg823hg232',
                    'g32igh2iughh3'
                ],
                unchecked: [
                    'f23iuh23bff2',
                    'zeh283gfwef',
                    '2348hv8wege3'
                ],
                viewDataCheckedAll: true,
                type: 'some'
            }
        )
        picker.checkAll()
        expect(data).toEqual(
            {
                mode : 'uncheck',
                checked: [
                    'f23iuh23bff2',
                    '3tufh23ifghuw',
                    'g24hg823hg232',
                    'g32igh2iughh3',
                    'zeh283gfwef',
                    '2348hv8wege3'
                ],
                unchecked: [],
                viewDataCheckedAll: true,
                type: 'empty'
            }
        )
        picker.concat(['jwefguy23bgfyuogqw', 't4fgw3uygvqtuwy3fv', '9wfuygw2euyfgweyf'])
        expect(data).toEqual(
            {
                mode : 'uncheck',
                checked: [
                    'f23iuh23bff2',
                    '3tufh23ifghuw',
                    'g24hg823hg232',
                    'g32igh2iughh3',
                    'zeh283gfwef',
                    '2348hv8wege3',
                    'jwefguy23bgfyuogqw',
                    't4fgw3uygvqtuwy3fv',
                    '9wfuygw2euyfgweyf'
                ],
                unchecked: [],
                viewDataCheckedAll: true,
                type: 'empty'
            }
        )
        picker.concat(['jwefguy23bgfyuogqw', 't4fgw3uygvqtuwy3fv', 'l23fgi823hf'])
        expect(data).toEqual(
            {
                mode : 'uncheck',
                checked: [
                    'f23iuh23bff2',
                    '3tufh23ifghuw',
                    'g24hg823hg232',
                    'g32igh2iughh3',
                    'zeh283gfwef',
                    '2348hv8wege3',
                    'jwefguy23bgfyuogqw',
                    't4fgw3uygvqtuwy3fv',
                    '9wfuygw2euyfgweyf',
                    'l23fgi823hf'
                ],
                unchecked: [],
                viewDataCheckedAll: true,
                type: 'empty'
            }
        )

    })
})
