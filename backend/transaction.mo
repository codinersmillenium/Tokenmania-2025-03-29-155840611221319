import HashMap "mo:base/HashMap";
import Nat "mo:base/Nat";
import Text "mo:base/Text";
import Buffer "mo:base/Buffer";
import Time "mo:base/Time";
module {
    public type StableTransaction = {
        id : Nat;
        idProduct : Nat;
        buyer : Text;
        date : Int;
        rating : Int; // 0 - 5
    };
    public class Transaction(trxId : Nat, dataTrx : [StableTransaction]) {
        public let hashTrx = HashMap.HashMap<Text, StableTransaction>(dataTrx.size(), Text.equal, Text.hash);
        public var nextId = trxId;
        public func getNextId() : Nat {
            let id = nextId;
            nextId += 1;
            id;
        };
        public func getTrx(caller : Text) : [StableTransaction] {
            let data = Buffer.Buffer<StableTransaction>(0);
            for (value in hashTrx.vals()) {
                if (value.buyer == caller) {
                    data.add(value);
                };
            };
            Buffer.toArray(data);
        };
        private func postTrx(id : Nat, principal : Text, idProduct : Nat, date : Int, rate : Int) : StableTransaction {
            let post : StableTransaction = {
                id = id;
                idProduct = idProduct;
                buyer = principal;
                date = date;
                rating = rate;
            };
            post;
        };
        public func createTrx(principal : Text, idProduct : Nat) : StableTransaction {
            let now = Time.now();
            let post = postTrx(getNextId(), principal, idProduct, ((now / 1_000_000_000) / 86400 * 86400), 0);
            hashTrx.put(Nat.toText(post.id), post);
            post;
        };
        public func updateRating(id : Nat, rate : Int) : Text {
            switch (hashTrx.get(Nat.toText(id))) {
                case (?data) {
                    let post = postTrx(data.id, data.buyer, data.idProduct, data.date, rate);
                    hashTrx.put(Nat.toText(post.id), post);
                    return "Success";
                };
                case null {
                    return "Transaction Not Valid";
                };
            };
        };
    };
};