import _const from '../const.js';

export default class AgendaEvent {
    constructor(evtId, evtCode, title, description, evtStart, evtEnd) {
        this.evtId = evtId;
        this.evtCode = evtCode;
        this.title = `[${_const.eventCodes[evtCode]}] ${title}`;
        this.description = description;
        this.evtStart = evtStart;
        this.evtEnd = evtEnd;
    }
}