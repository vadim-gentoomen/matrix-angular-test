export class PublicRoom {
  canonical_alias: string;
  name: string;
  world_readable: boolean;
  topic: string;
  num_joined_members: number;
  avatar_url: string;
  room_id: string;
  guest_can_join: boolean;
  aliases: string[];

  constructor(obj?: any) {
    this.canonical_alias = obj && obj.canonical_alias || null;
    this.name = obj && obj.name || null;
    this.world_readable = obj && obj.world_readable || null;
    this.topic = obj && obj.topic || null;
    this.num_joined_members = obj && obj.num_joined_members || null;
    this.avatar_url = obj && obj.avatar_url || null;
    this.room_id = obj && obj.room_id || null;
    this.guest_can_join = obj && obj.guest_can_join || null;
    this.aliases = obj && obj.aliases || null;
  }
}
