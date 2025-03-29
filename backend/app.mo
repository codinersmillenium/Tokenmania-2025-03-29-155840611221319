import Result "mo:base/Result";
import Nat "mo:base/Nat";
import Text "mo:base/Text";
import Principal "mo:base/Principal";
import Product "product";
import Transaction "transaction";
import SvcToken "token";
actor class BionMart() = this {
    private stable var productId : Nat = 2;
    private stable var trxId : Nat = 2;
    private stable var stableProduct : [Product.StableProduct] = [];
    private stable var stableTrx : [Transaction.StableTransaction] = [];
    private stable var stableToken : [SvcToken.StableToken] = [];
    private let dataProduct = Product.Product(productId, stableProduct, stableTrx);
    private let dataTrx = Transaction.Transaction(trxId, stableTrx);
    private let tokens = SvcToken.Token(stableToken);
    public query func tokenName() : async Text { "Heartbeat" };
    public query func tokenSymbol() : async Text { "HRBT" };
    public query({caller}) func balanceOf() : async Nat {
        return tokens.balanceOf(Principal.toText(caller))
	};
    public query ({caller}) func getProducts(id: Nat) : async Result.Result<[(Product.StableProduct, Int)], Text> {
        let data = dataProduct.getProduct(id, Principal.toText(caller));
        return #ok(data);
    };
    public shared ({ caller }) func createProducts(req : Product.StableProduct) : async Result.Result<Product.StableProduct, Text> {
        let data = dataProduct.createProduct(Principal.toText(caller), req);
        return #ok(data);
    };
    public query ({ caller }) func getTransaction() : async Result.Result<[Transaction.StableTransaction], Text> {
        return #ok(dataTrx.getTrx(Principal.toText(caller)));
    };
    public shared ({ caller }) func createTransaction(idProduct : Nat) : async Result.Result<Text, Text> {
        switch (dataProduct.hashProduct.get(Nat.toText(idProduct))) {
            case (?item) {
                var balanceMe = tokens.balanceOf(Principal.toText(caller));
                if (balanceMe < item.priceToken) {
                    return #ok("Insufficient Balance...");
                };
                let _data = dataTrx.createTrx(Principal.toText(caller), idProduct);
                tokens.balances.put(item.seller, (tokens.balanceOf(item.seller) + item.priceToken));
                tokens.balances.put(Principal.toText(caller), (balanceMe - item.priceToken));
                return #ok("Transaction Success...");
            };
            case (_) {
                return #ok("Transaction Failed...");
            };
        };
    };
    public shared func updateRating(id : Nat, rate : Int) : async Result.Result<Text, Text> {
        let _data = dataTrx.updateRating(id, rate);
        return #ok("Success");
    };
};