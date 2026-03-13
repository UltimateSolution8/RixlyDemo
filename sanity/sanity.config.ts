/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `/app` route
 */

import {visionTool} from '@sanity/vision'
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import {apiVersion} from './sanity.env'
import {schema} from './schemas'
import {structure} from './structure'

export default defineConfig({
  basePath: '/studio', // Mounts the Studio on the `/studio` route
  name: 'Rixly_Studio',
  title: 'Rixly CMS',

  projectId: process.env.SANITY_PROJECT_ID || 'your-project-id',
  dataset: process.env.SANITY_DATASET || 'production',

  // Add and edit the content schema in the './schemas' folder
  schema,

  // Add and edit the structure builder in the './structure' file
  plugins: [
    structureTool({structure}),
    // Vision is a tool that lets you query your content with GROQ in the studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({defaultApiVersion: apiVersion}),
  ],
})
