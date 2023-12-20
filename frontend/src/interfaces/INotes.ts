export type TNote = 
{
 nid: string,
 title: string,
 description?: string,
 isCompleted: boolean,
 date: Date
}

export interface INote {
    user_notes: Array<TNote> | [] 
    uid?: string
}