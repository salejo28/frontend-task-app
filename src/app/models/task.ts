export class Task{

    constructor (id = 0, title = '', description = '') {
        this.id = id;
        this.title = title;
        this.description = description;
    }

    id?: number
    title?: string
    description?: string
    created_at?: Date
}