Industrial IoT System for Tissue Packaging Sorting Integrated with ERP

Operational Technology (PLC Siemens S7-1200) integration to Information Technology (Odoo Enterprise Resource Planning) 
Using Industrial IoT Gateway (Siemens Simatic IOT2050)

From Odoo ERP to PLC : 
Get sorting target from all Manufacturing Orders with "Confirmed" and/or "In Progress" state (Calculation sorting target: Total quantity to produce - Total quantity produced)

From PLC to Odoo ERP:
- Automatic "Mark as Done" Manufacturing Order with "To Close" state every 5 second
- Update quantity produced in Manufacturing Order if detection result is good
- Update "Defect Tissue" product in Inventory if detection result is reject

Flow Odoo ERP
1. Create manufacturing order for example 100 tissue
2. API send sorting target to IIoT Gateway (Total quantity to produce from all manufacturing order with state "Confirmed" and "In Progress")
3. IIoT Gateway send sorting target to PLC
4. Tissue packaging sorting system running till get 100 Good Tissue
5. If QC Process decide Tissue Good, then Quantity Producing in manufacturing order +1
6. Else if QC Process decide Tissue Defect, then update stock "Defect Tissue" in inventory
7. After Quantity Producing in manufacturing order = 100, manufacturing order marked as done automatically and stock "Tissue" in inventory +100

Technical Specification : 
PLC : Siemens S7-1200
HMI : Siemens Simatic KTP700 Basic
IIoT Gateway : Siemens Simatic IOT2050
Inverter : Schneider ATV12
AC Motor : Nord 0,25 kW

IIoT Gateway Developed using Node-RED
API for Integrating PLC and Odoo ERP using Node.js with Library "odoo-xmlrpc"

Final Project by Eric Harjanto
1st Advisor : Handy Wicaksono, S.T., M.T., Ph. D.
2nd Advisor : Tonny Leonard, S.T., M.M.

Electrical Engineering Department
Faculty of Industrial Technology
Petra Christian University
