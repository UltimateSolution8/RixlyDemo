/**
 * Schema Index
 * 
 * This file exports all the schema types for Sanity Studio
 * Import and add your custom schema types here
 */

import {type SchemaTypeDefinition} from 'sanity'
import {author} from './author'
import {category} from './category'
import {post} from './post'

export const schema: {types: SchemaTypeDefinition[]} = {
  types: [author, category, post],
}
