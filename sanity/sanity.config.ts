/**
 * This configuration is used for the Sanity Studio deployed to sanity.studio
 */

import {visionTool} from '@sanity/vision'
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'

import {schema} from './schemas'
import {structure} from './structure'

export default defineConfig({
  name: 'Rixly_Studio',
  title: 'Rixly CMS',

  projectId: '9iae1qca',
  dataset: 'production',

  // Add and edit the content schema in the './schemas' folder
  schema,

  // Add and edit the structure builder in the './structure' file
  plugins: [
    structureTool({structure}),
    // Vision is a tool that lets you query your content with GROQ in the studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({defaultApiVersion: '2024-01-01'}),
  ],
})
