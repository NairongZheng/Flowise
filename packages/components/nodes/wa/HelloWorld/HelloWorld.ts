import { INode, INodeData, INodeParams } from '../../../src/Interface'

class HelloWorldNode implements INode {
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
        this.label = 'Hello World'
        this.name = 'helloWorld'
        this.type = 'Prompt'
        this.icon = 'helloworld.svg'
        this.category = 'wa'
        this.description = '输出 Hello World'
        this.inputs = [
            {
                label: 'Name',
                name: 'name',
                type: 'string',
                placeholder: '输入你的名字'
            }
        ]
        // this.outputs = [
        //     {
        //         label: 'Text',
        //         name: 'text',
        //         type: 'string'
        //     }
        // ]
        this.version = 1.0
        this.baseClasses = [this.type]
    }

    async run(nodeData: INodeData): Promise<string> {
        const name = nodeData.inputs?.name as string
        const ret = `Hello, ${name || 'World'}!`
        console.log('[HelloWorldNode] ret =', ret)
        return ret
    }
}

module.exports = { nodeClass: HelloWorldNode }
