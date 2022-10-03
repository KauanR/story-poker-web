import { Story } from './story'

export type QueueCtrl = {
    status: 'waiting' | 'active' | 'completed'
    story?: Story
}
