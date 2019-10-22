import { Project } from "./Project"

export class WorkSession {

    startDate: string
    endDate: string | null
    description: string | null
    //project: Project
    projectId: number
    tags: Array<string> | null

constructor (startDate: string, 
        projectId: number, 
        endDate: string | null = null, 
        description: string | null = null , 
        tags: Array<string> | null = null){
   this.startDate = startDate
   this.endDate = endDate
   this.description = description
   this.projectId = projectId
   this.tags = tags
}
}