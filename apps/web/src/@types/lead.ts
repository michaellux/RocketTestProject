export interface LeadResponse {
  _page: number
  _links: {
    self: {
      href: string
    }
  }
  _embedded: {
    leads: RawLead[]
  }
}

export interface RawLead {
  "id": number
  "name": string
  "price": number
  "responsible_user_id": number
  "group_id": number
  "status_id": number
  "pipeline_id": number
  "loss_reason_id": number | null
  "source_id": number | null
  "created_by": number
  "updated_by": number
  "created_at": number
  "updated_at": number
  "closed_at": number
  "closest_task_at": number | null
  "is_deleted": boolean
  "custom_fields_values": Array<any> | null
  "score": number | null
  "account_id": number
  "labor_cost": number
  "is_price_modified_by_robot": boolean
  "_links": object
  "_embedded": object
}

export interface Lead {
  "id": number
  "name": string
  "price": number
  "status": Status
  "responsibleUser": User
  "createdDate": string
}

export interface User {
  id: number
  name: string
  email: string
  lang: string
  rights: object
}

export interface Status {
  id: number
  name: string
  pipeline_id: number
  color: string
}
