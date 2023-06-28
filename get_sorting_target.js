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

    app.get('/api/target_sorting', (req, res)=>{
        var sorting_target = 0;
        var inParams = [];
        inParams.push([['product_id', '=', 37],['state', '=', 'progress']]);
        var params = [];
        params.push(inParams);
        odoo.execute_kw('mrp.production', 'search', params, function (err, value) {
            if (err) { return console.log(err); }
            if(value == ''){
                var inParams = [];
                inParams.push([['product_id', '=', 37],['state', '=', 'confirmed']]);
                var params = [];
                params.push(inParams);
                odoo.execute_kw('mrp.production', 'search', params, function (err2, value2) {
                    if (err2) { return console.log(err2); }
                    if(value2 == ''){
                        sorting_target = 0;
                        res.send(''+sorting_target+'');
                    }
                    else{
                        var inParams = [];
                        inParams.push(value2); //ids
                        var params = [];
                        params.push(inParams);
                        odoo.execute_kw('mrp.production', 'read', params, function (err3, value3) {
                            if (err3) { return console.log(err3); }
                            for(let i=0; i<value3.length; i++){
                                sorting_target += value3[i].product_qty;
                            }
                            res.send(''+sorting_target+'');
                        });
                    }            
                });
            }
            else{
                var inParams = [];
                inParams.push(value); //ids
                var params = [];
                params.push(inParams);
                odoo.execute_kw('mrp.production', 'read', params, function (err2, value2) {
                    if (err2) { return console.log(err2); }
                    for(let i=0; i<value2.length; i++){
                        sorting_target += (value2[i].product_qty - value2[i].qty_producing);
                    }
                    var inParams = [];
                    inParams.push([['product_id', '=', 37],['state', '=', 'confirmed']]);
                    var params = [];
                    params.push(inParams);
                    odoo.execute_kw('mrp.production', 'search', params, function (err3, value3) {
                        if (err3) { return console.log(err3); }
                        if(value3 != ''){
                            var inParams = [];
                            inParams.push(value3); //ids
                            var params = [];
                            params.push(inParams);
                            odoo.execute_kw('mrp.production', 'read', params, function (err4, value4) {
                                if (err4) { return console.log(err4); }
                                for(let i=0; i<value4.length; i++){
                                    sorting_target += value4[i].product_qty;
                                }
                                res.send(''+sorting_target+'');
                            });
                        }
                        else{
                            res.send(''+sorting_target+'');
                        }           
                    });
                });
            }
        });
    });

    app.post('/api/mark_done', (req, res)=>{
        var inParams = [];
        inParams.push([['product_id', '=', 37],['state', '=', 'to_close']]);
        var params = [];
        params.push(inParams);
        odoo.execute_kw('mrp.production', 'search', params, function (err, value) {
            if (err) { return console.log(err); }
            var inParams = [];
            inParams.push(value); //ids
            var params = [];
            params.push(inParams);
            odoo.execute_kw('mrp.production', 'read', params, function (err2, value2) {
                if (err2) { return console.log(err2); }
                for(let i=0; i<value2.length; i++){
                    var inParams = [];
                    inParams.push([value2[i].id]); //id to update
                    var params = [];
                    params.push(inParams);
                    odoo.execute_kw('mrp.production', 'button_mark_done', params, function (err3, value3) {
                        if (err3) { return console.log(err3); }
                        console.log('Result: ', value3);
                    });
                    res.send('true');
                }
            });
        });
    });
});

app.listen(8071,()=>{
    console.log('Server Running on Port 8071');
});
