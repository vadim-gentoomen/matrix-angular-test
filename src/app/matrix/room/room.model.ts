export interface CreateRoomSubmit {
  creation_content?: any;
  initial_state?: StateEvent[];
  invite?: string[];
  invite_3pid?: Invite3pid[];
  is_direct?: boolean;
  name?: string;
  preset?: string;
  room_alias_name?: string;
  topic?: string;
  visibility?: string;
}

export interface StateEvent {
  content?: string;
  state_key?: string;
  type?: string;
}

export interface Invite3pid {
  address: string;    // The invitee's third party identifier.
  id_server: string;  // The hostname+port of the identity server which should be used for third party identifier lookups. ,
  medium: string;     // The kind of address being passed in the address field, for example email.
}

export class Room {
  roomId: string;
  roomAlias: string;

  constructor(obj?: any) {
    this.roomId = obj && obj.room_id || null;
    this.roomAlias = obj && obj.room_alias || null;
  }
}
