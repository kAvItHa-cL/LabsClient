import {Deserializable} from "./deserializable.model";
import { RequestModel } from "./request.model";
import { DocumentModel } from "./document.model";
import { NotifyUserModel } from "./notify-user.model";

export class PrototypeModel implements Deserializable {

    request:RequestModel;    
    notifyUserList: NotifyUserModel[];
    documentList:DocumentModel[];
    approvedDocumentList:DocumentModel[];
    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }

}
