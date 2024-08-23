import { Server } from "socket.io";
import { Bill } from "../models/bill.js"
let io: Server;

interface ConnectedUsers {
    [userId: string]: string;
}

const connectedUsers: ConnectedUsers = {};

export const initSocket = (server: any) => {
    io = new Server(server, {
        cors: {
            origin: "*",
        },
    });

    io.on("connection", (socket) => {
        const userId = socket.handshake.query.userId as string;
        console.log(`${userId ?? 'Unknown user'} connected!`);
        if (userId) {
            connectedUsers[userId] = socket.id;
        }

        socket.on("join_group", (groupId: string) => {
            socket.join(groupId);
            console.log(`User ${userId} joined group ${groupId}`);
        });

        socket.on("leave_group", (groupId: string) => {
            socket.leave(groupId);
            console.log(`User ${userId} left group ${groupId}`);
        });

        socket.on("edit_bill", async (billId: string) => {
            const bill = await Bill.findById(billId);
            if (bill) {
                io.to(bill.groupId.toString()).emit("bill_updated", bill);
            }
        });

        socket.on("disconnect", () => {
            const userId = socket.handshake.query.userId as string;
            console.log(`${userId ?? 'Unknown User'} disconnected!`);

            delete connectedUsers[userId];
        });
    });
};

export const notifyBillUpdate = async (updatedBill:any) => {
    const bill = await Bill.findById(updatedBill._id);
    if (bill) {
        io.to(bill.groupId.toString()).emit("bill_updated", bill);
    }
};

