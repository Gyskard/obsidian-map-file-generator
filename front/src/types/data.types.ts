export interface UrlData {
  name: string
  localisation: string
}

export interface Place extends UrlData {
  tags: Array<string>
}

export enum Status {
  Success,
  Failed
}

export interface Log {
  status: Status
  text: string
}
