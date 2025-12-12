const records=[];

// --- main functions
// - add record
function addRecord(){
    const itemno = document.getElementById("itemno").value.trim()
        const gradename = document.getElementById("gradename").value.trim()
        const batchno = document.getElementById("batchno").value.trim()
        const qty = document.getElementById("qty").value.trim()
    
    if (!itemno || !gradename || !batchno || !qty) 
    return alert('Please fill all fields');

    const newRecord = {itemno,gradename,batchno,qty};
    records.push(newRecord)

    updateTable(newRecord)

    document.getElementById('itemno').value = '';
    document.getElementById('gradename').value = '';
    document.getElementById('batchno').value = '';
    document.getElementById('qty').value = '';
}
// - update record table
function updateTable(record){
    const tbody = document.querySelector('#recordTable tbody');
    const row = document.createElement('tr');

    const td1 = document.createElement('td');
    td1.textContent = record.itemno;
    const td2 = document.createElement('td'); 
    td2.textContent = record.gradename;
    const td3 = document.createElement('td'); 
    td3.textContent = record.batchno;
    const td4 = document.createElement('td'); 
    td4.textContent = record.qty;

    row.appendChild(td1);
    row.appendChild(td2);
    row.appendChild(td3);
    row.appendChild(td4);
    tbody.appendChild(row);
}

// - export records to 
function exportcsv(){
    if (records.length === 0) return alert("No Records");
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Material No,Gradename,Batch Number,Quantity/KG\n"
    records.forEach(r => {
        csvContent += `${r.itemno},${r.gradename},${r.batchno},${r.qty}\n`;
    });

// - click and download
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "inventory_records.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// --- research function
function autocomplete(inputEl, dataList) {
    const listEl = inputEl.nextElementSibling;
    if (!listEl) return;
    
    inputEl.addEventListener('input', function() {
        const value = this.value.toLowerCase();
        listEl.innerHTML = '';
        if (!value) return;

        const matches = dataList.filter(item => item.toLowerCase().includes(value)).slice(0,10);
        matches.forEach(match => {
            const div = document.createElement('div');
            div.textContent = match;
            div.addEventListener('click', function() {
                inputEl.value = match;
                listEl.innerHTML = '';
            });
            listEl.appendChild(div);
        });
    });

    document.addEventListener('click', function(e) {
        if (e.target !== inputEl) {
            listEl.innerHTML = '';
        }
    });
}

// --- initialize data
function init() {
    console.log("Init called");

    autocomplete(document.getElementById('itemno'), materialList);
    autocomplete(document.getElementById('gradename'), gradeList);

    document.getElementById('addBtn').addEventListener('click', addRecord);
    document.getElementById('exportBtn').addEventListener('click', exportcsv);
}

window.addEventListener('DOMContentLoaded', init);