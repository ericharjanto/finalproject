const express = require('express');
const bodyParser = require('body-parser');
const app = express();
var Odoo = require('odoo-xmlrpc');

app.use(bodyParser.json());

var odoo = new Odoo({
    url: '',
    port: '8069',
    db: '',
    username: '',
    password: ''
});

odoo.connect(function (err) {
    if (err) { return console.log(err); }
    console.log('Connected to Odoo server.');
    
    app.post('/api/qc/good', (req, res)=>{
        var inParams = [];
        inParams.push([['product_id', '=', 37],['state', '=', 'progress']]);
        var params = [];
        params.push(inParams);
        odoo.execute_kw('mrp.production', 'search', params, function (err, value) {
            if (err) { return console.log(err); }
            if(value != ''){
                var inParams = [];
                inParams.push(value); //ids
                var params = [];
                params.push(inParams);
                odoo.execute_kw('mrp.production', 'read', params, function (err2, value2) {
                    if (err2) { return console.log(err2); }
                    var current_qty_producing = value2[0].qty_producing;
                    current_qty_producing++;
                    var inParams = [];
                    inParams.push([value2[0].id]); //id to update
                    inParams.push({'qty_producing': current_qty_producing});
                    var params = [];
                    params.push(inParams);
                    odoo.execute_kw('mrp.production', 'write', params, function (err3, value3) {
                        if (err3) { return console.log(err3); }
                        console.log('Result: ', value3);
                        res.send(value3);
                    });
                });
            }
            else{
                var inParams = [];
                inParams.push([['product_id', '=', 37],['state', '=', 'confirmed']]);
                var params = [];
                params.push(inParams);
                odoo.execute_kw('mrp.production', 'search', params, function (err2, value2) {
                    if (err2) { return console.log(err2); }
                    if(value2 != ''){
                        var inParams = [];
                        inParams.push(value2); //ids
                        var params = [];
                        params.push(inParams);
                        odoo.execute_kw('mrp.production', 'read', params, function (err3, value3) {
                            if (err3) { return console.log(err3); }
                            var current_qty_producing = value3[0].qty_producing;
                            current_qty_producing++;
                            var inParams = [];
                            inParams.push([value3[0].id]); //id to update
                            inParams.push({'qty_producing': current_qty_producing});
                            var params = [];
                            params.push(inParams);
                            odoo.execute_kw('mrp.production', 'write', params, function (err4, value4) {
                                if (err4) { return console.log(err4); }
                                console.log('Result: ', value4);
                                res.send(value4);
                            });
                        });
                    }                
                });
            }
        });
    });

    app.post('/api/qc/reject', (req, res)=>{
        var current_stock = 0;
        var inParams = [];
        inParams.push([['product_id', '=', 38],['inventory_quantity', '!=', null]]);
        var params = [];
        params.push(inParams);
        odoo.execute_kw('stock.quant', 'search', params, function (err, value) {
            if (err) { return console.log(err); }
            var inParams = [];
            inParams.push(value); //ids
            var params = [];
            params.push(inParams);
            odoo.execute_kw('stock.quant', 'read', params, function (err2, value2) {
                if (err2) { return console.log(err2); }
                current_stock = value2[0].quantity;
                current_stock++;
                var inParams = [];
                inParams.push([value2[0].id]); //id to update
                inParams.push({'quantity': current_stock});
                var params = [];
                params.push(inParams);
                odoo.execute_kw('stock.quant', 'write', params, function (err3, value3) {
                    if (err3) { return console.log(err3); }
                    console.log('Result: ', value3);
                    res.send(value3);
                });
            });
        });
    });
});

app.listen(8070,()=>{
    console.log('Server Running on Port 8070');
});
