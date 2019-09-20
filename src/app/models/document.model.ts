import {Deserializable} from "./deserializable.model";

export class DocumentModel implements Deserializable {
  iD: number;
  fileType: string;
  blobValue:any;
  documentTypeID: number;
  requestID: number;
  description: string;
  uploadStatus: string;
  isActive: boolean;
  createdBy: number;
  createdDate: Date;
  modifiedBy: number;
  modifiedDate: Date;
  constructor(){
    this.blobValue="";
    this.description="";
    this.uploadStatus="";
  }
  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}