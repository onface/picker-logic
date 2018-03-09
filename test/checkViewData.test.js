import Picker from "../lib/index"
const commonTestGetViewData = function () {
    return ['3tufh23ifghuw', 'g24hg823hg232', 'g32igh2iughh3']
}
describe('checkViewData.test.js', function () {
    it('checkViewData', function () {
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
    })
})
