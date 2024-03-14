import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Index from '@/pages/index.vue'
import { NuxtLink } from 'nuxt'

describe('Index', () => {
  it('renders correctly', () => {
    // Provide a stub for RouterLink when mounting the component
    const wrapper = mount(Index, {
      global: {
        stubs: {
          RouterLink: true // This stubs RouterLink with a dummy component
        }
      }
    })
    
    // has h1
    expect(wrapper.find('h1').exists()).toBeTruthy()
    
    // has .teaser.lottery
    expect(wrapper.find('.teaser.lottery').exists()).toBeTruthy()
  })

  it('renders the link to eurojackpot', () => {
    // Provide a stub for RouterLink when mounting the component
    const wrapper = mount(Index, {
      global: {
        stubs: {
          RouterLink: true // This stubs RouterLink with a dummy component
        }
      }
    })
    // check if NuxtLink exists
    expect(wrapper.findComponent({ name: 'NuxtLink' }).exists()).toBeTruthy()

    // Check if NuxtLink to /eurojackpot exists
    const eurojackpotLink = wrapper.findComponent({ name: 'NuxtLink', props: { to: '/eurojackpot' } })
    expect(eurojackpotLink.exists()).toBeTruthy()
  })
})

