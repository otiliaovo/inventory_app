const records=[];

// --- main functions
// - add record
function addRecord(){
    const itemno = document.getElementById("itemno").value.trim()
        const gradename = document.getElementById("gradename").value.trim()
        const batchno = document.getElementById("batchno").value.trim()
        const qty = document.getElementById("qty").value.trim()
        const loca = document.getElementById("loca").value.trim()
    
    if (!itemno || !gradename || !batchno || !qty) 
    return alert('Please fill necessary fields');

    const newRecord = {itemno,gradename,batchno,qty,loca};
    const tbody = document.querySelector('#recordTable tbody');
    const editIndex = document.getElementById('addBtn').dataset.editIndex;
    
    if(editIndex !== undefined){
        // 更新记录
        records[editIndex] = newRecord;
        const row = tbody.querySelector(`tr[data-index='${editIndex}']`);
        row.cells[0].textContent = itemno;
        row.cells[1].textContent = gradename;
        row.cells[2].textContent = batchno;
        row.cells[3].textContent = qty;
        row.cells[4].textContent = loca;

        document.getElementById('addBtn').textContent = 'ADD';
        delete document.getElementById('addBtn').dataset.editIndex;
    } else {
        // 新增记录
        const index = records.length;
        records.push(newRecord);
        updateTable(newRecord, index);
    }

    document.getElementById('itemno').value = '';
    document.getElementById('gradename').value = '';
    document.getElementById('batchno').value = '';
    document.getElementById('qty').value = '';
    document.getElementById('loca').value = '';
}
// - update record table
function updateTable(record,index){
    const tbody = document.querySelector('#recordTable tbody');
    const row = document.createElement('tr');
    row.dataset.index = index;

    const td1 = document.createElement('td');
    td1.textContent = record.itemno;
    const td2 = document.createElement('td'); 
    td2.textContent = record.gradename;
    const td3 = document.createElement('td'); 
    td3.textContent = record.batchno;
    const td4 = document.createElement('td'); 
    td4.textContent = record.qty;
    const td5 = document.createElement('td'); 
    td5.textContent = record.loca;

    const tdActions = document.createElement('td');
    const editBtn = document.createElement('button');
    editBtn.textContent = "Edit";
    editBtn.classList.add('edit-btn');
    const delBtn = document.createElement('button');
    delBtn.textContent = "Delete";
    delBtn.classList.add('delete-btn');

    row.appendChild(td1);
    row.appendChild(td2);
    row.appendChild(td3);
    row.appendChild(td4);
    row.appendChild(td5);

    tdActions.appendChild(editBtn);
    tdActions.appendChild(delBtn);
    row.appendChild(tdActions);

    tbody.appendChild(row);

    editBtn.addEventListener('click',function(){
        document.getElementById('itemno').value = record.itemno;
        document.getElementById('gradename').value = record.gradename;
        document.getElementById('batchno').value = record.batchno;
        document.getElementById('qty').value = record.qty;
        document.getElementById('loca').value = record.loca;
        document.getElementById('addBtn').dataset.editIndex = index;
        document.getElementById('addBtn').textContent = 'Update';
    });

    delBtn.addEventListener('click',function(){
         if(confirm('Are you sure to delete this record?')){
            records.splice(index,1);
            tbody.removeChild(row);

            Array.from(tbody.querySelectorAll('tr')).forEach((tr,i) => {
                tr.dataset.index = i;
            });
         }
    });
};

// - export records to 
function exportcsv(){
    if (records.length === 0) return alert("No Records");
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Index,Material No,Gradename,Batch Number,Quantity/KG,Location\n"
    records.forEach((r,index) => {
        csvContent += `${index+1},${r.itemno},${r.gradename},${r.batchno},${r.qty},${r.loca}\n`;
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
function autocomplete(inputEl, dataList, onSelect) {
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
                if (onSelect) onSelect(match);
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
    const itemInput = document.getElementById('itemno');
    const gradeInput = document.getElementById('gradename');

    autocomplete(itemInput, materialList, (selectedItem) => {
        gradeInput.value = materialGradeMap[selectedItem] || '';
    });

    autocomplete(gradeInput, gradeList, (selectedGrade) => {
        itemInput.value = gradeMaterialMap[selectedGrade] || '';
    });

    document.getElementById('addBtn').addEventListener('click', addRecord);
    document.getElementById('exportBtn').addEventListener('click', exportcsv);
}

window.addEventListener('DOMContentLoaded', init);