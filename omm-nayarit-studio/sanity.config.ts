import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import { schemaTypes } from "./schemas/SchemaTypes";

export default defineConfig({
  name: 'default',
  title: 'omm-nayarit',

  projectId: 'f16xj771',
  dataset: 'production',

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
