
export interface Transaction {
  senderId: number;
  receiverId: number;
  senderAccountNo: string;
  receiverAccountNo: string;
  amountSent: number;
}
