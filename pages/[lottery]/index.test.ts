import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import LotteryOverview from '@/pages/[lottery]/index.vue'

describe('LotteryOverview', () => {
  it('renders correctly', () => {
    // Provide a stub for RouterLink when mounting the component
    const wrapper = mount(LotteryOverview, {
      global: {
        stubs: {
          RouterLink: true // This stubs RouterLink with a dummy component
        }
      }
    })
    
    // has .teasers
    expect(wrapper.find('.teasers').exists()).toBeTruthy()
    
  }),

   it('renders 16 links to Lottery Draws', () => {
    // Provide a stub for RouterLink when mounting the component
    const wrapper = mount(LotteryOverview, {
      global: {
        stubs: {
          RouterLink: true // This stubs RouterLink with a dummy component
        }
      }
    })
 
    // check if there are 16 teasers
    expect(wrapper.findAll('.teaser').length).toBe(16)

  })
})
