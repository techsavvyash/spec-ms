import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { checkDuplicacy, checkName, insertSchema } from 'src/specifications/queries/queries';
import { GenericFunction } from '../genericFunction';

@Injectable()
export class EventService {
    constructor(private dbService: DatabaseService, private specService: GenericFunction) {
    }
    async createEvent(speceventDTO) {
        let dbColumns = []
        let newObj = this.specService.convertKeysToLowerCase(speceventDTO);
        if (speceventDTO?.event_name.toLowerCase() == "") {
            return { "code": 400, "message": "Event Name cannot be empty" };
        }
        const resultDname = await this.dbService.executeQuery(checkName('event_name', "event"), [speceventDTO?.event_name.toLowerCase()]);
        if (resultDname.length > 0) {
            return { "code": 400, "message": "Event Name already exists" };
        }
        else {
            let values = newObj?.input?.properties?.event;
            const result = await this.dbService.executeQuery(checkDuplicacy(['event_name', 'event_data'], 'event', ['event_data', 'input', 'properties', 'event']), [JSON.stringify(values)]);
            if (result.length == 0) {
                const insertResult = await this.dbService.executeQuery(insertSchema(['event_name', 'event_data'], 'event'), [2, speceventDTO.event_name.toLowerCase(), newObj]);
                if (insertResult[0].pid) {
                    return { "code": 200, "message": "Event Spec Created Successfully", "event_name": speceventDTO.event_name, "pid": insertResult[0].pid };

                }
                else {
                    console.log("duplicate event");
                    return { "code": 400, "message": "Duplicate events not allowed" }
                }
            }
        }
    }
}