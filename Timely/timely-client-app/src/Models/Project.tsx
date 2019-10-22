export class Project {
    id: number
    name: string
    note: string
    active: boolean

    constructor (id: number, name: string, note: string, active: boolean){
        this.id = id
        this.name = name
        this.note = note
        this.active = active
    }
}