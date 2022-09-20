import type { GatsbyNode } from 'gatsby';
import { MdxNode } from './types';
export declare const createPages: GatsbyNode["createPages"];
export declare const createSchemaCustomization: GatsbyNode["createSchemaCustomization"];
export declare const unstable_shouldOnCreateNode: GatsbyNode["unstable_shouldOnCreateNode"];
export declare const onCreateNode: GatsbyNode<MdxNode>["onCreateNode"];
export declare const onCreateWebpackConfig: GatsbyNode["onCreateWebpackConfig"];
