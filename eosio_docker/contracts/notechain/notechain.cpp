#include <eosiolib/eosio.hpp>
#include <eosiolib/print.hpp>
using namespace eosio;
using namespace std;

class notechain : public eosio::contract {
public:
  using contract::contract;
  string name;

  /// @abi action
  bool signalsharing( account_name _requestee, uint64_t _price ) {
    require_auth( _requestee );

    // Check whether the user has already signalled that they are willing to share data
    for(auto& item: _datasharing) {
      if(_datasharing.requestee == _requestee) {
        return false;
      }
    }

    else {

      _datasharing.emplace(get_self(), [&](auto& p) {
        p.requestee = _requestee;
        p.price = _price;
      });

      return true;
    }
  }

  /// @abi action
  void stopsharing( account_name _requestee ) {
    require_auth( user );


  }

  /// @abi action
  void acknowledgerequest( account_name user, account_name requestor ) {
    require_auth( user );

    // removes the requestor from the dataSharing structure so the front end does not repeat polling
  }

  /// @abi action
  bool requestdata( account_name from, account_name source, string url ) {
     // if source is

    return true;
  }

private:
  struct datasharing {
    account_name  requestee;        // the EOS account that has shown willingness to share data
    uint64_t      data_price;       // the price specified by the owner

    // primary key
    account_name primary_key() const { return requestee; }
  };

  struct request {
    uint64_t      id;               // the id of the request
    account_name  requestor;        // the account requesting data
    account_name  requestee;        // the account of the owner of the data
    string        url;              // the url where the user needs to send their data
    bool          filled;           // whether the request has been fulfilled

    // primary key
    uint64_t primary_key() const { return id; }

  };

  // local instances of the multi indexes
  datasharing _datasharing;
  request _requestors;



};

EOSIO_ABI( notechain, (update)(signalsharing)(stopsharing)(acknowledgerequest)(requestdata) )
