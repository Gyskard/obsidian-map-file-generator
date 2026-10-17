export interface UrlData {
  name: string
  latitude: string
  longitude: string
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
