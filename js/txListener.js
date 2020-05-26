function TXListener(provider, prefix, transaction) {

    this.provider = provider;
    this.prefix = prefix;
    this.transaction = transaction;

    this.blockheight = null;
    this.confirmations = null;

}

TXListener.prototype.initListen = function(cb) {
    var self = this;
    var confirmations = 0;
    
    var listenTimer = setInterval(function() {
    
    	self.getTx(function(err, res) {
    	
    		if (res.confirmations)
    			confirmations = res.confirmations;
    		else
    			confirmations = 0;

            if (confirmations >= 6) {
              $("#progressbar").progressbar({value: 100});
              clearInterval(listenTimer);
              cb();
            };
            
            $("#progressbar").progressbar({value: ((100 / 6) * confirmations)});

            console.log('confirmations: ' + confirmations);
            
    	});
    
    
    }, 90000);

};

TXListener.prototype.getTx = function(cb) {

    var txid = this.transaction;

    $.getJSON(this.provider + this.prefix + "/gettransaction/"+txid, function( data ) {
        cb(null, data);
    });

};

TXListener.prototype.getBlock = function(hash, cb) {

    $.getJSON(this.provider + this.prefix + "/getblock/"+hash, function( data ) {
        cb(null, data);
    });

};
