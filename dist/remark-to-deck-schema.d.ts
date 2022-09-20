import type { VFile } from 'vfile';
import { Options } from './types';
interface MdastNode {
    type: string;
    name: string;
    children: MdastNode[];
    attributes: MdastAttribute[];
}
interface MdastAttribute {
    type: string;
    name: string;
    value: MdastAttributeValue | string;
}
interface MdastAttributeValue {
    type: string;
    value: string;
}
/**
 * This gatsby remark plugin will transform markdownAST to our deck schema.
 * 1: regions of the mdast separated by `---` will be wrapped by `Slide` components, so that the
 *    root children are precisely the slides.
 * 2: `Fragment` blocks will be manipulated to have appropriate `index` data. If `index` is not
 *    specified for a given `Fragment`, its `index` will be updated to one larger than the running
 *    maximum.
 */
export default function remarkToDeckSchema(options: Partial<Options>): (markdownAST: MdastNode, vfile: VFile) => MdastNode | undefined;
export {};
