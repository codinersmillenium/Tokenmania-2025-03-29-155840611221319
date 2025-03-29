import Iter "mo:base/Iter";
import HashMap "mo:base/HashMap";
import Nat "mo:base/Nat";
import Text "mo:base/Text";
module {
    public type StableToken = (
        Text,
        Nat
    );
    public func toStable(tokens : Token) : [StableToken] {
        Iter.toArray(tokens.balances.entries());
    };
    public class Token(
        data : [StableToken]
    ) {
        public let balances = HashMap.HashMap<Text, /* Address owner. */ Nat, /* Amount of tokens. */>(data.size(), Text.equal, Text.hash);
        public func balanceOf(owner : Text) : Nat {
            switch (balances.get(owner)) {
                case (null) { 10000 };
                case (?balance) { balance };
            };
        };
        public func putBalance(principal : Text, token : Nat) {
            balances.put(principal, token);
        };
    };
};