Operational Technology (PLC Siemens S7-1200) integration to Information Technology (Odoo Enterprise Resource Planning) 
Using Industrial IoT Gateway (Siemens Simatic IOT2050)

API Built using Node.js with Library "odoo-xmlrpc"

Flow Odoo ERP
1. Create manufacturing order for example 100 tissue
2. API send sorting target to IIoT Gateway (Total quantity to produce from all manufacturing order with state "Confirmed" and "In Progress")
3. IIoT Gateway send sorting target to PLC
4. Tissue packaging sorting system running till get 100 Good Tissue
5. If QC Process decide Tissue Good, then Quantity Producing in manufacturing order +1
6. Else if QC Process decide Tissue Defect, then update stock "Defect Tissue" in inventory
7. After Quantity Producing in manufacturing order = 100, manufacturing order marked as done automatically and stock "Tissue" in inventory +100
