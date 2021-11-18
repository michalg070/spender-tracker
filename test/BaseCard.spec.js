import { mount } from '@vue/test-utils'
import BaseCard from '@/components/atoms/baseCard/BaseCard.vue'

const factory = (props) => {
  return mount(BaseCard, {
    propsData: {
      ...props,
    },
  })
}

describe('BaseCard.vue', () => {
  it('renders successfully', () => {
    factory()
  })

  it('displays proper title', () => {
    const title = 'Testowy tytuł'
    const wrapper = factory({ title: title })

    expect(wrapper.find('[data-base-card-title]').text()).toBe(title)
  })

  it('not render <p> when there is no title', () => {
    const wrapper = factory()

    expect(wrapper.find('[data-base-card-title]').exists()).toBe(false)
  })
})
