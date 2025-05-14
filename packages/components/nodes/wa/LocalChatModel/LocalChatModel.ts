import { INode, INodeData, INodeParams } from '../../../src/Interface'
import { apiUtils } from '../apiUtils'

class LocalChatModel implements INode {
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
        this.label = 'Local ChatModel'
        this.name = 'localChatModel'
        this.type = 'LocalChatModel'
        this.icon = 'localchatmodel.svg'
        this.category = 'wa'
        this.description = 'local chat model'
        this.inputs = [
            {
                label: 'url',
                name: 'url',
                type: 'options',
                options: [
                    {label: 'http://localhost:8000', name: 'http://localhost:8000'}
                ],
                default: 'http://localhost:8000'
            },
            {
                label: 'route',
                name: 'route',
                type: 'options',
                placeholder: 'Select a route',
                options: [
                    {label: 'simple_ret', name: 'simple_ret'},
                    {label: 'run_workflow', name: 'run_workflow'}
                ],
                default: 'simple_ret'
            },
            {
                label: 'prompt',
                name: 'prompt',
                type: 'Prompt',
                // optional: true
            }
        ]
        // this.outputs = [
        //     {
        //         label: 'Result',
        //         name: 'result',
        //         type: 'string',
        //     }
        // ]
        this.version = 1.0
        this.baseClasses = [this.type]
    }

    async run(nodeData: INodeData): Promise<any> {
        const apiBaseUrl = nodeData.inputs?.url as string
        const route = nodeData.inputs?.route as string
        const prompt = nodeData.inputs?.prompt as string
        
        console.log('[LocalChatModel] prompt =', prompt)

        // Basic validation
        if (!apiBaseUrl) {
            throw new Error('API Base URL is required')
        }
        
        if (!route || route.trim() === '') {
            throw new Error('route is required')
        }
        
        // Decompose plot
        const requestData = { prompt }
        const decomposeResult = await apiUtils.makeRequest(route, 'POST', apiBaseUrl, requestData)
        
        const taskCount = decomposeResult.task_decomposition?.tasks?.length || 0
        
        return {
            ...decomposeResult,
            apiBaseUrl,
            taskCount,
            message: `Plot decomposed into ${taskCount} tasks successfully`
        }
    }
}

module.exports = { nodeClass: LocalChatModel }
