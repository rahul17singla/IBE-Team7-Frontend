export interface Promotion {
    promotionId: number;
    priceFactor: number;
    promotionTitle: string;
    promotionDescription: string;
    minimumNoOfDays: number;
}
export interface RoomDetails {
    date: string;
    roomId: number;
    roomTypeName: string;
    maxCapacity: number;
    area: number;
    singleBed: number;
    doubleBed: number;
    avgPrice: number;
    count: number;
    loading: "pending" | "succeeded" | "failed";
    promotionsDtoList: Promotion[];
}
