/**
 * Sanity Studio Component
 * 
 * This is the main Studio component that renders the Sanity Studio
 */

import {NextStudio} from 'next-sanity/studio'
import config from '../sanity.config'

export function Studio() {
  //  NextStudio will provide the client-side rendering for Sanity Studio
  return <NextStudio config={config} />
}
