/**
 * Structure Configuration
 * 
 * Defines the sidebar structure for Sanity Studio
 */

import type {StructureResolver} from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Blog')
    .items([
      // Post documents
      S.documentTypeListItem('post').title('Posts'),
      // Author documents
      S.documentTypeListItem('author').title('Authors'),
      // Category documents
      S.documentTypeListItem('category').title('Categories'),
    ])
