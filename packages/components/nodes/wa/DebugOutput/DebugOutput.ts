import { INode, INodeData, INodeParams } from '../../../src/Interface'

class DebugOutput implements INode {
    label: string
    name: string
    type: string
    icon: string
    category: string
    description: string
    inputs: INodeParams[]
    outputs: INodeParams[]
    version: number
    baseClasses: string[]

    constructor() {
        this.label = 'Debug Output'
        this.name = 'debugOutput'
        this.type = 'Chain'
        this.icon = 'debugoutput.svg'
        this.category = 'wa'
        this.description = '用于调试输出任意文本'
        this.inputs = [
            {
                label: '文本输入',
                name: 'input',
                type: 'LocalChatModel',
            }
        ]
        this.outputs = [
            {
                label: 'Text',
                name: 'text',
                type: 'string'
            }
        ]
        this.version = 1.0
        this.baseClasses = [this.type]
    }

    async run(nodeData: INodeData): Promise<string> {
        const inputText = nodeData.inputs?.input
        console.log('[DebugOutput] 输出结果:', inputText)
        return typeof inputText === 'string' ? inputText : JSON.stringify(inputText)
    }
}

module.exports = { nodeClass: DebugOutput }
