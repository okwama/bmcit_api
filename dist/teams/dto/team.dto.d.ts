export declare class CreateTeamDto {
    name: string;
    description?: string;
    commanderId?: number;
    memberIds?: number[];
}
export declare class UpdateTeamDto {
    name?: string;
    description?: string;
    commanderId?: number;
    memberIds?: number[];
}
export declare class CreateStaffDto {
    [key: string]: any;
}
