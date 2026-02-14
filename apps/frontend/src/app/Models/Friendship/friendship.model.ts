export interface FriendshipDTO {
  friendshipId: number;
  status: string;
  friendshipDate: Date;
  friend: {id: number, name: string, email: string}; 
}

export class FriendshipModel {
  constructor(
    public friendshipId: number,
    public status: string,
    public friendshipDate: Date,
    public friend: {id: number, name: string, email: string},
  ) {}

  static fromDTO(dto: FriendshipDTO | any): FriendshipModel {
    return new FriendshipModel(
      Number(dto.friendshipId),
      String(dto.status ?? ''),
      new Date(dto.friendshipDate ?? new Date()),
      dto.friend ?? undefined
    );
  }

  toDTO(): FriendshipDTO {
    const dto: FriendshipDTO = { 
      friendshipId: this.friendshipId, 
      status: this.status, 
      friendshipDate: this.friendshipDate, 
      friend: this.friend,
    };
    return dto;
  }
}