"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws = require("ws");
const db_auction_1 = require("./db-auction");
function createBidServer(httpServer) {
    return new BidServer(httpServer);
}
exports.createBidServer = createBidServer;
class BidServer {
    constructor(server) {
        this.wsServer = new ws.Server({ server });
        this.wsServer.on('connection', (userSocket) => this.onConnection(userSocket));
    }
    onConnection(ws) {
        ws.on('message', (message) => this.onMessage(message));
        ws.on('error', (error) => this.onError(error));
        ws.on('close', () => this.onClose());
        console.log(`Connections count: ${this.wsServer.clients.size}`);
    }
    onMessage(message) {
        const bid = JSON.parse(message);
        db_auction_1.updateProductBidAmount(bid.productId, bid.price);
        // Broadcast the new bid
        this.wsServer.clients.forEach(ws => ws.send(JSON.stringify(bid)));
        console.log(`Bid ${bid.price} is placed on product ${bid.productId}`);
    }
    onClose() {
        console.log(`Connections count: ${this.wsServer.clients.size}`);
    }
    onError(error) {
        console.error(`WebSocket error: "${error.message}"`);
    }
}
exports.BidServer = BidServer;
