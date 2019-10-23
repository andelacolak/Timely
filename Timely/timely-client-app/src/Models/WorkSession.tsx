import { Project } from "./Project"

export class WorkSession {

    id: number
    startDate: string
    endDate: string | null
    description: string | null
    projectId: number
    tags: Array<string> | null

constructor ( startDate: string, 
        projectId: number, 
        id: number = 0,
        endDate: string | null = null, 
        description: string | null = null , 
        tags: Array<string> | null = null){
    this.id = id
    this.startDate = startDate
    this.endDate = endDate
    this.description = description
    this.projectId = projectId
    this.tags = tags
}
}