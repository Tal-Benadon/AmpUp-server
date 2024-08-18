export type CardType = 'streak2' | 'streak4'

export default interface IStoreItem {
    _id?: string;
    name: string;
    description: string;
    image: string;
    coins: number;
    daysToExpiry: number;
    expiryDay: Date;
    quantity: number;
    isActive: boolean;
    cardType?: CardType;
    isAction: boolean;
}