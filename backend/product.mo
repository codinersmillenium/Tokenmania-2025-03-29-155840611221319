import HashMap "mo:base/HashMap";
import Nat "mo:base/Nat";
import Text "mo:base/Text";
import Buffer "mo:base/Buffer";
import Transaction "transaction";
module {
    public type StableProduct = {
        id : Nat;
        name : Text;
        description : Text;
        imgProduct : Text;
        priceToken : Nat;
        urlVideoDoc : Text;
        urlAccess : Text;
        accessKey : Text;
        category : Int; // 1: API, 2: Model AI, 3: Data Set AI
        seller : Text;
    };
    public class Product(productId : Nat, dataProduct : [StableProduct], dataTrx : [Transaction.StableTransaction]) {
        public let hashProduct = HashMap.HashMap<Text, StableProduct>(dataProduct.size(), Text.equal, Text.hash);
        public var nextId = productId;
        public func getNextId() : Nat {
            let id = nextId;
            nextId += 1;
            id;
        };
        private func getRating(id : Nat) : Int {
            let hashTrx = HashMap.HashMap<Text, Transaction.StableTransaction>(dataTrx.size(), Text.equal, Text.hash);
            var rate : Int = 0;
            var sum : Int = 0;
            for (value in hashTrx.vals()) {
                if (value.idProduct == id) {
                    rate += value.rating;
                    sum += 1;
                };
            };
            if (sum == 0) {
                return 0;
            };
            rate / sum;
        };
        public func getProduct(id : Nat, caller : Text) : [(StableProduct, Int)] {
            let data = Buffer.Buffer<(StableProduct, Int)>(0);
            for (value in hashProduct.vals()) {
                if ((id == 1 or value.id == id) or value.seller == caller) {
                    data.add((value, getRating(id)));
                };
            };
            Buffer.toArray(data);
        };
        public func createProduct(principal : Text, req : StableProduct) : StableProduct {
            let post = {
                id = getNextId();
                name = req.name;
                description = req.description;
                imgProduct = req.imgProduct;
                priceToken = req.priceToken;
                urlVideoDoc = req.urlVideoDoc;
                urlAccess = req.urlAccess;
                accessKey = req.accessKey;
                category = req.category;
                seller = principal;
            };
            hashProduct.put(Nat.toText(post.id), post);
            post;
        };
    };
};